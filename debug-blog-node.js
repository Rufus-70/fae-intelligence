// Node.js debug script to check blog posts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUIVyQam00tPEH0AcLFlaDcT9XSoxr-h0",
  authDomain: "faes-web.firebaseapp.com",
  projectId: "faes-web",
  storageBucket: "faes-web.firebasestorage.app",
  messagingSenderId: "837345805064",
  appId: "1:837345805064:web:0e4a42b4ada04d72dee2bd",
  measurementId: "G-R4LHD76YKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkBlogPosts() {
  try {
    console.log('🔍 Checking blog posts in Firebase...\n');
    
    // Get all blog posts
    const postsRef = collection(db, 'blog_posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Total posts found: ${querySnapshot.docs.length}\n`);
    
    if (querySnapshot.docs.length === 0) {
      console.log('ℹ️  No blog posts found in the database.');
      console.log('💡 Would you like me to create some sample blog posts?');
      return;
    }
    
    querySnapshot.docs.forEach((doc, index) => {
      const post = doc.data();
      console.log(`${index + 1}. ${post.title || 'Untitled'}`);
      console.log(`   📝 Slug: ${post.slug || 'no-slug'}`);
      console.log(`   📋 Status: ${post.status || 'unknown'}`);
      console.log(`   📅 Created: ${post.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}`);
      console.log(`   🏷️  Category: ${post.category || 'uncategorized'}`);
      console.log(`   🔖 Tags: ${post.tags ? post.tags.join(', ') : 'none'}`);
      console.log('');
    });
    
    // Test getting published posts specifically
    console.log('🌐 Checking published posts...');
    const publishedQuery = query(
      postsRef, 
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const publishedSnapshot = await getDocs(publishedQuery);
    console.log(`✅ Published posts: ${publishedSnapshot.docs.length}`);
    
    // Test getting featured posts
    console.log('⭐ Checking featured posts...');
    const featuredQuery = query(
      postsRef,
      where('featured', '==', true),
      where('status', '==', 'published'),
      limit(3)
    );
    const featuredSnapshot = await getDocs(featuredQuery);
    console.log(`🌟 Featured posts: ${featuredSnapshot.docs.length}`);
    
    if (publishedSnapshot.docs.length > 0) {
      console.log('\n🎯 HTML blog is ready to display these posts!');
    }
    
  } catch (error) {
    console.error('❌ Error checking blog posts:', error);
    console.log('\n🔧 Possible issues:');
    console.log('   - Firestore rules might need adjustment');
    console.log('   - Collection name might be different');
    console.log('   - Network connectivity issues');
  }
}

checkBlogPosts();
