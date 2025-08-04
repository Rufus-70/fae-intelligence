const admin = require('firebase-admin');
const fs = require('fs');

// Initialize with your service account
const serviceAccount = require('../faes-web-firebase-adminsdk-fbsvc-ac7f230796.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'faes-web'
});

const db = admin.firestore();
const auth = admin.auth();

async function discoverData() {
  const report = {
    timestamp: new Date().toISOString(),
    firestore: {},
    auth: {},
    summary: {}
  };

  console.log('🔍 Discovering faes-web data...\n');

  try {
    // Discover Firestore collections
    console.log('📁 Scanning Firestore collections...');
    const collections = await db.listCollections();
    
    for (const collection of collections) {
      const colName = collection.id;
      console.log(`  📂 Collection: ${colName}`);
      
      const snapshot = await collection.limit(5).get();
      const docs = [];
      
      snapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          data: doc.data(),
          fields: Object.keys(doc.data())
        });
      });
      
      report.firestore[colName] = {
        totalDocs: snapshot.size,
        sampleDocs: docs,
        fields: docs.length > 0 ? [...new Set(docs.flatMap(d => d.fields))] : []
      };
      
      console.log(`    📄 Documents: ${snapshot.size}, Fields: ${report.firestore[colName].fields.join(', ')}`);
    }

    // Discover Auth users  
    console.log('\n👥 Scanning Auth users...');
    const authResult = await auth.listUsers(10);
    report.auth = {
      totalUsers: authResult.users.length,
      sampleUsers: authResult.users.map(user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        creationTime: user.metadata.creationTime,
        providers: user.providerData.map(p => p.providerId)
      }))
    };
    
    console.log(`    👤 Total users sampled: ${authResult.users.length}`);

    // Generate summary
    report.summary = {
      totalCollections: Object.keys(report.firestore).length,
      totalUsers: report.auth.totalUsers,
      estimatedComplexity: calculateComplexity(report)
    };

    // Save report
    const reportPath = `./faes-web-discovery-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n✅ Discovery complete! Report saved to: ${reportPath}`);
    console.log('\n📊 SUMMARY:');
    console.log(`   Collections: ${report.summary.totalCollections}`);
    console.log(`   Users: ${report.summary.totalUsers}`);
    console.log(`   Migration Complexity: ${report.summary.estimatedComplexity}`);

    return report;

  } catch (error) {
    console.error('❌ Error during discovery:', error);
    throw error;
  }
}

function calculateComplexity(report) {
  const collections = Object.keys(report.firestore).length;
  const users = report.auth.totalUsers;
  
  if (collections <= 5 && users <= 10) return 'LOW';
  if (collections <= 15 && users <= 100) return 'MEDIUM';
  return 'HIGH';
}

// Run discovery
discoverData().then(() => {
  console.log('\n🎯 Next steps: Review the generated report to plan migration strategy.');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
