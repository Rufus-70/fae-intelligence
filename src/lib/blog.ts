// src/lib/blog.ts
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit, 
  startAfter,
  increment,
  serverTimestamp,
  DocumentSnapshot,
  QueryConstraint
} from 'firebase/firestore'
import { db } from './firebase'
import { BlogPost, BlogCategory, BlogTag, BlogListOptions, BlogFilters } from '@/types/blog'
import config from './config'

export class BlogService {
  private static readonly POSTS_COLLECTION = 'blog_posts'
  private static readonly CATEGORIES_COLLECTION = 'blog_categories'
  private static readonly TAGS_COLLECTION = 'blog_tags'

  // Utility function to generate URL-friendly slugs
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim('-') // Remove leading/trailing hyphens
  }

  // Create a new blog post
  static async createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const postData = {
        ...data,
        slug: this.generateSlug(data.title),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        viewCount: 0
      }

      const docRef = await addDoc(collection(db, this.POSTS_COLLECTION), postData)
      return docRef.id
    } catch (error) {
      console.error('Error creating blog post:', error)
      throw new Error('Failed to create blog post')
    }
  }

  // Update an existing blog post
  static async updatePost(id: string, data: Partial<BlogPost>): Promise<void> {
    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      }

      // Update slug if title changed
      if (data.title) {
        updateData.slug = this.generateSlug(data.title)
      }

      await updateDoc(doc(db, this.POSTS_COLLECTION, id), updateData)
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw new Error('Failed to update blog post')
    }
  }

  // Delete a blog post
  static async deletePost(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.POSTS_COLLECTION, id))
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw new Error('Failed to delete blog post')
    }
  }

  // Get a single blog post by ID
  static async getPost(id: string): Promise<BlogPost | null> {
    try {
      const docSnap = await getDoc(doc(db, this.POSTS_COLLECTION, id))
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BlogPost
      }
      
      return null
    } catch (error) {
      console.error('Error fetching blog post:', error)
      throw new Error('Failed to fetch blog post')
    }
  }

  // Get a blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, this.POSTS_COLLECTION),
        where('slug', '==', slug),
        where('status', '==', 'published')
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...doc.data() } as BlogPost
      }
      
      return null
    } catch (error) {
      console.error('Error fetching blog post by slug:', error)
      throw new Error('Failed to fetch blog post')
    }
  }

  // Get blog posts with filtering and pagination
  static async getPosts(options: BlogListOptions = {}): Promise<{
    posts: BlogPost[]
    hasMore: boolean
    total?: number
  }> {
    try {
      const {
        limit: queryLimit = 10,
        orderBy: orderField = 'createdAt',
        orderDirection = 'desc',
        filters = {}
      } = options

      const constraints: QueryConstraint[] = []

      // Apply filters
      if (filters.status) {
        constraints.push(where('status', '==', filters.status))
      }
      
      if (filters.category) {
        constraints.push(where('category', '==', filters.category))
      }
      
      if (filters.tag) {
        constraints.push(where('tags', 'array-contains', filters.tag))
      }
      
      if (filters.author) {
        constraints.push(where('author.id', '==', filters.author))
      }

      // Add ordering and limit
      constraints.push(orderBy(orderField, orderDirection))
      constraints.push(firestoreLimit(queryLimit + 1)) // Fetch one extra to check for more

      const q = query(collection(db, this.POSTS_COLLECTION), ...constraints)
      const querySnapshot = await getDocs(q)

      const posts = querySnapshot.docs.slice(0, queryLimit).map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[]

      const hasMore = querySnapshot.docs.length > queryLimit

      return { posts, hasMore }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      throw new Error('Failed to fetch blog posts')
    }
  }

  // Get published posts for public display
  static async getPublishedPosts(options: BlogListOptions = {}): Promise<{
    posts: BlogPost[]
    hasMore: boolean
  }> {
    // Return demo data if in demo mode
    if (config.blog.enableDemoData) {
      const demoPosts = this.getDemoFeaturedPosts(options.limit || 10)
      return {
        posts: demoPosts,
        hasMore: false
      }
    }

    try {
      const publishedOptions = {
        ...options,
        filters: {
          ...options.filters,
          status: 'published' as const
        }
      }
      
      return this.getPosts(publishedOptions)
    } catch (error) {
      console.error('Error fetching published posts:', error)
      // Fallback to demo posts on error
      const demoPosts = this.getDemoFeaturedPosts(options.limit || 10)
      return {
        posts: demoPosts,
        hasMore: false
      }
    }
  }

  // Get featured posts
  static async getFeaturedPosts(limitCount = 3): Promise<BlogPost[]> {
    // Return demo data if in demo mode
    if (config.blog.enableDemoData) {
      return this.getDemoFeaturedPosts(limitCount)
    }

    try {
      const q = query(
        collection(db, this.POSTS_COLLECTION),
        where('status', '==', 'published'),
        where('featured', '==', true),
        orderBy('publishedAt', 'desc'),
        firestoreLimit(limitCount)
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[]
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      // Fallback to demo data on error
      return this.getDemoFeaturedPosts(limitCount)
    }
  }

  // Demo featured posts for development
  private static getDemoFeaturedPosts(limitCount: number): BlogPost[] {
    const demoPosts: BlogPost[] = [
      {
        id: 'demo-1',
        title: 'Getting Started with AI in Manufacturing',
        slug: 'getting-started-ai-manufacturing',
        excerpt: 'Learn the fundamentals of implementing AI solutions in manufacturing environments with practical examples and real-world case studies.',
        content: '',
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com',
          avatar: '/images/richard-snyder.png'
        },
        category: 'AI Fundamentals',
        tags: ['AI', 'Manufacturing', 'Getting Started'],
        publishedAt: new Date('2025-06-15'),
        createdAt: new Date('2025-06-10'),
        updatedAt: new Date('2025-06-15'),
        viewCount: 245,
        readingTime: 8
      },
      {
        id: 'demo-2',
        title: 'Predictive Maintenance with Low-Cost AI Tools',
        slug: 'predictive-maintenance-low-cost-ai',
        excerpt: 'Discover how to implement predictive maintenance using accessible AI tools without breaking the budget.',
        content: '',
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com',
          avatar: '/images/richard-snyder.png'
        },
        category: 'Predictive Maintenance',
        tags: ['Predictive Maintenance', 'AI Tools', 'Cost-Effective'],
        publishedAt: new Date('2025-06-12'),
        createdAt: new Date('2025-06-08'),
        updatedAt: new Date('2025-06-12'),
        viewCount: 189,
        readingTime: 12
      },
      {
        id: 'demo-3',
        title: 'Quality Control Automation: A Step-by-Step Guide',
        slug: 'quality-control-automation-guide',
        excerpt: 'Transform your quality control processes with automated inspection systems using computer vision and machine learning.',
        content: '',
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com',
          avatar: '/images/richard-snyder.png'
        },
        category: 'Quality Control',
        tags: ['Quality Control', 'Automation', 'Computer Vision'],
        publishedAt: new Date('2025-06-10'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-10'),
        viewCount: 167,
        readingTime: 15
      }
    ]
    
    return demoPosts.slice(0, limitCount)
  }

  // Publish a post
  static async publishPost(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, this.POSTS_COLLECTION, id), {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error publishing post:', error)
      throw new Error('Failed to publish post')
    }
  }

  // Unpublish a post
  static async unpublishPost(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, this.POSTS_COLLECTION, id), {
        status: 'draft',
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error unpublishing post:', error)
      throw new Error('Failed to unpublish post')
    }
  }

  // Increment view count
  static async incrementViewCount(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, this.POSTS_COLLECTION, id), {
        viewCount: increment(1)
      })
    } catch (error) {
      console.error('Error incrementing view count:', error)
      // Don't throw error for view count - it's not critical
    }
  }

  // Search posts
  static async searchPosts(searchTerm: string, limitCount = 10): Promise<BlogPost[]> {
    try {
      // Note: This is a basic implementation. For production, consider using 
      // Algolia or another search service for full-text search
      const q = query(
        collection(db, this.POSTS_COLLECTION),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        firestoreLimit(50) // Get more to filter client-side
      )
      
      const querySnapshot = await getDocs(q)
      const allPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[]

      // Filter client-side for title/excerpt matches
      const searchLower = searchTerm.toLowerCase()
      return allPosts
        .filter(post => 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
        .slice(0, limitCount)
    } catch (error) {
      console.error('Error searching posts:', error)
      throw new Error('Failed to search posts')
    }
  }

  // Category management
  static async getCategories(): Promise<BlogCategory[]> {
    try {
      const q = query(
        collection(db, this.CATEGORIES_COLLECTION),
        orderBy('name', 'asc')
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogCategory[]
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }
  }

  static async createCategory(data: Omit<BlogCategory, 'id' | 'createdAt' | 'postCount'>): Promise<string> {
    try {
      const categoryData = {
        ...data,
        slug: this.generateSlug(data.name),
        postCount: 0,
        createdAt: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, this.CATEGORIES_COLLECTION), categoryData)
      return docRef.id
    } catch (error) {
      console.error('Error creating category:', error)
      throw new Error('Failed to create category')
    }
  }

  // Tag management
  static async getTags(): Promise<BlogTag[]> {
    try {
      const q = query(
        collection(db, this.TAGS_COLLECTION),
        orderBy('name', 'asc')
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogTag[]
    } catch (error) {
      console.error('Error fetching tags:', error)
      throw new Error('Failed to fetch tags')
    }
  }

  static async createTag(name: string): Promise<string> {
    try {
      const tagData = {
        name,
        slug: this.generateSlug(name),
        postCount: 0,
        createdAt: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, this.TAGS_COLLECTION), tagData)
      return docRef.id
    } catch (error) {
      console.error('Error creating tag:', error)
      throw new Error('Failed to create tag')
    }
  }
}