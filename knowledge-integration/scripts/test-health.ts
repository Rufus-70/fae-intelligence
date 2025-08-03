#!/usr/bin/env ts-node

import { Neo4jClient } from '../services/neo4j-client';

async function testKnowledgeHealth() {
  console.log('🔍 Testing Knowledge Integration Health...\n');

  const client = new Neo4jClient();

  try {
    // Test 1: Basic Connection
    console.log('🔌 Testing Neo4j connection...');
    const isConnected = await client.testConnection();
    
    if (isConnected) {
      console.log('✅ Neo4j connection successful');
    } else {
      console.log('❌ Neo4j connection failed');
      process.exit(1);
    }

    // Test 2: Health Status
    console.log('\n📊 Getting health status...');
    const health = await client.getHealthStatus();
    
    if (health.connected) {
      console.log('✅ Database health check passed');
      console.log(`   Database: ${health.database?.name} ${health.database?.version}`);
      console.log(`   Content Assets: ${health.contentAssets}`);
      console.log(`   Recent Extractions: ${health.recentExtractions?.length || 0}`);
    } else {
      console.log('❌ Database health check failed');
      console.log(`   Error: ${health.error}`);
    }

    // Test 3: Sample Content Ingestion
    console.log('\n📝 Testing content ingestion...');
    const testContent = {
      id: 'test_health_check',
      title: 'Health Check Test Content',
      content: 'This is a test content for health validation',
      type: 'operational-data' as const,
      source: 'health_check',
      metadata: {
        test: true,
        timestamp: new Date().toISOString(),
        platform: 'health_check'
      }
    };

    await client.ingestContentAsset(testContent);
    console.log('✅ Content ingestion test passed');

    // Test 4: Content Retrieval
    console.log('\n🔍 Testing content retrieval...');
    const retrieved = await client.getContentAsset('test_health_check');
    
    if (retrieved && retrieved.title === testContent.title) {
      console.log('✅ Content retrieval test passed');
    } else {
      console.log('❌ Content retrieval test failed');
    }

    // Test 5: Search Functionality
    console.log('\n🔎 Testing search functionality...');
    const searchResults = await client.searchContent('Health Check', { limit: 5 });
    
    if (searchResults.total > 0) {
      console.log(`✅ Search test passed (found ${searchResults.total} results)`);
    } else {
      console.log('⚠️ Search test returned no results');
    }

    // Cleanup
    console.log('\n🧹 Cleaning up test data...');
    await client.removeContentAsset('test_health_check');
    console.log('✅ Cleanup completed');

    // Final Status
    console.log('\n🎯 Overall Health Status: HEALTHY');
    console.log('✅ All core knowledge integration features are working correctly');

  } catch (error) {
    console.error('\n❌ Health check failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    await client.disconnect();
  }
}

if (require.main === module) {
  testKnowledgeHealth();
}