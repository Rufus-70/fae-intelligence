// Firebase Integration for Visual Editor - PRODUCTION
// Strategy: Visual Editor → Firebase → Website
// Updated: 2025-08-03 with authentication

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Production Firebase Configuration - Using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID_DEV,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Auto-authenticate for development
const ensureAuthenticated = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ User authenticated:', user.uid);
        unsubscribe();
        resolve(user);
      } else {
        console.log('🔐 Signing in anonymously...');
        signInAnonymously(auth)
          .then((result) => {
            console.log('✅ Anonymous sign-in successful:', result.user.uid);
            unsubscribe();
            resolve(result.user);
          })
          .catch((error) => {
            console.error('❌ Authentication failed:', error);
            unsubscribe();
            reject(error);
          });
      }
    });
  });
};

// Visual Editor Blog Post Functions with Authentication
export const saveBlogPost = async (postData) => {
  try {
    // Ensure user is authenticated
    await ensureAuthenticated();
    
    const slug = generateSlug(postData.title);
    const blogPost = {
      title: postData.title || 'Untitled Post',
      slug: slug,
      content: postData.content || '',
      excerpt: postData.excerpt || generateExcerpt(postData.content),
      status: postData.status || 'draft',
      author: postData.author || 'Fae Intelligence',
      created_at: new Date(),
      updated_at: new Date(),
      published_at: postData.status === 'published' ? new Date() : null,
      featured_image: postData.featured_image || null,
      seo: {
        meta_description: postData.meta_description || '',
        meta_keywords: postData.meta_keywords || [],
        og_title: postData.og_title || postData.title,
        og_description: postData.og_description || postData.excerpt,
        og_image: postData.og_image || ''
      },
      analytics: {
        view_count: 0,
        last_viewed: null
      },
      visual_editor_data: {
        blocks: postData.blocks || [],
        layout_settings: postData.layoutSettings || {}
      }
    };

    const docRef = await addDoc(collection(db, 'blog_posts'), blogPost);
    console.log('✅ Blog post saved to faeintelligence:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving blog post to faeintelligence:', error);
    throw error;
  }
};

export const updateBlogPost = async (postId, updates) => {
  try {
    // Ensure user is authenticated
    await ensureAuthenticated();
    
    const postRef = doc(db, 'blog_posts', postId);
    await updateDoc(postRef, {
      ...updates,
      updated_at: new Date()
    });
    console.log('✅ Blog post updated in faeintelligence:', postId);
  } catch (error) {
    console.error('❌ Error updating blog post in faeintelligence:', error);
    throw error;
  }
};

export const publishBlogPost = async (postId) => {
  try {
    // Ensure user is authenticated
    await ensureAuthenticated();
    
    const postRef = doc(db, 'blog_posts', postId);
    await updateDoc(postRef, {
      status: 'published',
      published_at: new Date(),
      updated_at: new Date()
    });
    console.log('✅ Blog post published in faeintelligence:', postId);
  } catch (error) {
    console.error('❌ Error publishing blog post in faeintelligence:', error);
    throw error;
  }
};

export const getBlogPosts = async (status = null) => {
  try {
    let q = collection(db, 'blog_posts');
    if (status) {
      q = query(q, where('status', '==', status));
    }
    q = query(q, orderBy('created_at', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error('❌ Error getting blog posts from faeintelligence:', error);
    throw error;
  }
};

export const uploadImage = async (file, postId = null) => {
  try {
    // Ensure user is authenticated
    await ensureAuthenticated();
    
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const folder = postId ? `blog-posts/${postId}` : 'blog-images';
    const storageRef = ref(storage, `${folder}/${filename}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('✅ Image uploaded to faeintelligence storage:', downloadURL);
    return {
      url: downloadURL,
      filename: filename,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('❌ Error uploading image to faeintelligence:', error);
    throw error;
  }
};

// Utility functions
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

const generateExcerpt = (content, maxLength = 160) => {
  if (!content) return '';
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength) + '...'
    : textContent;
};

// Export Firebase services and functions
export { db, auth, storage, analytics, ensureAuthenticated };
export default app;
