#!/usr/bin/env node

const neo4j = require('neo4j-driver');

async function testNeo4jConnection() {
  console.log('🔍 Testing Neo4j connection...\n');

  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
  const username = process.env.NEO4J_USERNAME || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'fae_intelligence_2024';

  console.log(`📡 Connecting to: ${uri}`);
  console.log(`👤 Username: ${username}`);

  let driver;
  try {
    // Create driver
    driver = neo4j.driver(
      uri,
      neo4j.auth.basic(username, password),
      {
        maxConnectionPoolSize: 10,
        connectionAcquisitionTimeout: 30000,
        disableLosslessIntegers: true
      }
    );

    // Test basic connection
    console.log('🔌 Testing basic connectivity...');
    const session = driver.session();
    
    try {
      const result = await session.run('RETURN 1 as test');
      const value = result.records[0].get('test');
      
      if (value === 1) {
        console.log('✅ Neo4j connection successful!');
        
        // Test database info
        const dbResult = await session.run('CALL dbms.components() YIELD name, versions, edition RETURN name, versions[0] as version, edition');
        if (dbResult.records.length > 0) {
          const record = dbResult.records[0];
          console.log(`📊 Database: ${record.get('name')} ${record.get('version')} (${record.get('edition')})`);
        }
        
        // Test content assets count
        const countResult = await session.run('MATCH (c:ContentAsset) RETURN count(c) as totalContent');
        const contentCount = countResult.records[0].get('totalContent');
        console.log(`📚 Content Assets: ${contentCount}`);
        
        console.log('\n🎉 Neo4j is ready for knowledge integration!');
        console.log('🌐 Browser: http://localhost:7474');
        console.log('🔍 Dashboard: http://localhost:3000/knowledge');
        
      } else {
        console.log('❌ Unexpected response from Neo4j');
      }
    } finally {
      await session.close();
    }

  } catch (error) {
    console.error('❌ Neo4j connection failed:', error.message);
    
    if (error.code === 'ServiceUnavailable') {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check if Neo4j container is running: docker ps | grep neo4j');
      console.log('2. Check logs: docker logs fae-intelligence-neo4j');
      console.log('3. Wait a bit longer for startup (can take 30-60 seconds)');
    } else if (error.code === 'Neo.ClientError.Security.Unauthorized') {
      console.log('\n💡 Authentication issue - check credentials in .env.local');
    }
    
    process.exit(1);
  } finally {
    if (driver) {
      await driver.close();
    }
  }
}

if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });
  testNeo4jConnection();
}