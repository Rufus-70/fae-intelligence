import { NextRequest, NextResponse } from 'next/server';
import { Neo4jClient } from '../../../../knowledge-integration/services/neo4j-client';

let neo4jClient: Neo4jClient | null = null;

function getNeo4jClient(): Neo4jClient {
  if (!neo4jClient) {
    neo4jClient = new Neo4jClient();
  }
  return neo4jClient;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'status';

    const client = getNeo4jClient();

    switch (action) {
      case 'status':
        return await handleHealthStatus(client);
      
      case 'test-connection':
        return await handleConnectionTest(client);
      
      case 'content-stats':
        return await handleContentStats(client);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Knowledge health API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : String(error),
        connected: false
      },
      { status: 500 }
    );
  }
}

async function handleHealthStatus(client: Neo4jClient) {
  const health = await client.getHealthStatus();
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    service: 'knowledge-integration',
    ...health
  });
}

async function handleConnectionTest(client: Neo4jClient) {
  const isConnected = await client.testConnection();
  
  return NextResponse.json({
    connected: isConnected,
    timestamp: new Date().toISOString(),
    message: isConnected ? 'Connection successful' : 'Connection failed'
  });
}

async function handleContentStats(client: Neo4jClient) {
  try {
    const reactMeta = await client.getExtractionMetadata('react');
    const firebaseMeta = await client.getExtractionMetadata('firebase');
    
    return NextResponse.json({
      extractionMetadata: {
        react: reactMeta || { platform: 'react', status: 'not_run' },
        firebase: firebaseMeta || { platform: 'firebase', status: 'not_run' }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get content stats', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}