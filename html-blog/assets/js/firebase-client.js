// Firebase client configuration for HTML blog
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// Firebase configuration (actual Fae Intelligence config)
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

class FirebaseClient {
    constructor() {
        this.db = db;
        this.postsCollection = 'blog_posts';
        this.categoriesCollection = 'blog_categories';
        this.tagsCollection = 'blog_tags';
    }

    // Get published blog posts
    async getPublishedPosts(limitCount = 10, categoryFilter = null, tagFilter = null) {
        try {
            let constraints = [
                where('status', '==', 'published'),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            ];

            if (categoryFilter) {
                constraints.splice(1, 0, where('category', '==', categoryFilter));
            }

            if (tagFilter) {
                constraints.splice(1, 0, where('tags', 'array-contains', tagFilter));
            }

            const q = query(collection(this.db, this.postsCollection), ...constraints);
            const querySnapshot = await getDocs(q);
            
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
            }));
        } catch (error) {
            console.error('Error fetching published posts:', error);
            return [];
        }
    }

    // Get single post by slug
    async getPostBySlug(slug) {
        try {
            const q = query(
                collection(this.db, this.postsCollection),
                where('slug', '==', slug),
                where('status', '==', 'published')
            );
            
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
                    updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
                };
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching post by slug:', error);
            return null;
        }
    }

    // Get featured posts
    async getFeaturedPosts(limitCount = 3) {
        try {
            const q = query(
                collection(this.db, this.postsCollection),
                where('status', '==', 'published'),
                where('featured', '==', true),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            
            const querySnapshot = await getDocs(q);
            
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
            }));
        } catch (error) {
            console.error('Error fetching featured posts:', error);
            return [];
        }
    }

    // Get categories
    async getCategories() {
        try {
            const querySnapshot = await getDocs(collection(this.db, this.categoriesCollection));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    // Get tags
    async getTags() {
        try {
            const querySnapshot = await getDocs(collection(this.db, this.tagsCollection));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching tags:', error);
            return [];
        }
    }

    // Search posts
    async searchPosts(searchTerm, limitCount = 10) {
        try {
            // Note: This is a basic search. For better search, consider using Algolia or similar
            const q = query(
                collection(this.db, this.postsCollection),
                where('status', '==', 'published'),
                orderBy('createdAt', 'desc'),
                limit(limitCount * 2) // Get more to filter on client side
            );
            
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
            }));

            // Client-side filtering for now
            const searchTermLower = searchTerm.toLowerCase();
            return posts.filter(post => 
                post.title.toLowerCase().includes(searchTermLower) ||
                post.excerpt.toLowerCase().includes(searchTermLower) ||
                post.content.toLowerCase().includes(searchTermLower) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
            ).slice(0, limitCount);
        } catch (error) {
            console.error('Error searching posts:', error);
            return [];
        }
    }
}

// Export the FirebaseClient class
window.FirebaseClient = FirebaseClient;

// Create global instance
window.firebaseClient = new FirebaseClient();
