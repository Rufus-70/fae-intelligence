import { NextRequest, NextResponse } from 'next/server';
import { ReactContentExtractor } from '../../../../knowledge-integration/extractors/react-parser';
import { Neo4jClient } from '../../../../knowledge-integration/services/neo4j-client';
import * as path from 'path';

let reactExtractor: ReactContentExtractor | null = null;
let neo4jClient: Neo4jClient | null = null;

function getServices() {
  if (!neo4jClient) {
    neo4jClient = new Neo4jClient();
  }
  
  if (!reactExtractor) {
    const projectRoot = process.cwd();
    const srcDir = path.join(projectRoot, 'src');
    
    reactExtractor = new ReactContentExtractor(srcDir, neo4jClient, {
      includePatterns: ['**/*.{tsx,jsx}'],
      excludePatterns: [
        '**/node_modules/**',
        '**/build/**',
        '**/dist/**',
        '**/.next/**',
        '**/out/**'
      ]
    });
  }
  
  return { reactExtractor, neo4jClient };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const { reactExtractor, neo4jClient } = getServices();

    switch (action) {
      case 'status':
        return await handleStatusRequest(reactExtractor);
      
      case 'stats':
        return await handleStatsRequest(reactExtractor);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('React content API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    const { reactExtractor, neo4jClient } = getServices();

    switch (action) {
      case 'extract':
        return await handleExtractionRequest(reactExtractor);
      
      case 'search':
        return await handleSearchRequest(neo4jClient, params);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('React content API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

async function handleStatusRequest(extractor: ReactContentExtractor) {
  const stats = await extractor.getExtractionStats();
  
  return NextResponse.json({
    service: 'react-content-extractor',
    status: 'operational',
    lastExtraction: stats?.lastExtraction,
    totalFiles: stats?.totalFiles || 0,
    extractedComponents: stats?.extractedComponents || 0
  });
}

async function handleStatsRequest(extractor: ReactContentExtractor) {
  const stats = await extractor.getExtractionStats();
  return NextResponse.json(stats || {});
}

async function handleExtractionRequest(extractor: ReactContentExtractor) {
  // Start extraction in background
  const extractionPromise = extractor.extractFromDirectory();
  
  // Return immediate response
  return NextResponse.json({
    message: 'React content extraction started',
    extractionId: `react_${Date.now()}`,
    status: 'in_progress'
  });
}

async function handleSearchRequest(client: Neo4jClient, params: any) {
  const { query, filters } = params;
  
  if (!query) {
    return NextResponse.json({ error: 'Search query required' }, { status: 400 });
  }

  const searchFilters = {
    ...filters,
    source: 'react_component'
  };

  const results = await client.searchContent(query, searchFilters);
  
  return NextResponse.json({
    query,
    results: results.items,
    total: results.total,
    filters: searchFilters
  });
}