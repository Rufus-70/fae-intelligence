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
  QueryConstraint,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { BlogPost, BlogCategory, BlogTag, BlogListOptions, BlogFilters } from '@/types/blog'
import { blogConfig } from './config'

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
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
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
    console.log('🔍 BlogService.getPostBySlug called with slug:', slug)
    console.log('🔍 blogConfig.enableDemoData:', blogConfig.enableDemoData)
    
    // Return demo data if in demo mode
    if (blogConfig.enableDemoData) {
      console.log('✅ Using demo data for getPostBySlug')
      const demoPosts = this.getDemoFeaturedPosts(10) // Get all demo posts
      const demoPost = demoPosts.find(post => post.slug === slug)
      if (demoPost) {
        console.log('✅ Found demo post:', demoPost.title)
        return demoPost
      }
      console.log('❌ No demo post found for slug:', slug)
      return null
    }
    
    try {
      console.log('🌐 Attempting to fetch from Firestore...')
      const q = query(
        collection(db, this.POSTS_COLLECTION),
        where('slug', '==', slug),
        where('status', '==', 'published')
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        console.log('✅ Post found in Firestore:', doc.data().title)
        return { id: doc.id, ...doc.data() } as BlogPost
      }
      
      console.log('❌ No post found in Firestore for slug:', slug)
      return null
    } catch (error) {
      console.error('❌ Error fetching blog post by slug:', error)
      console.log('🔄 Falling back to demo data due to error')
      
      // Fallback to demo data on error
      const demoPosts = this.getDemoFeaturedPosts(10)
      const demoPost = demoPosts.find(post => post.slug === slug)
      if (demoPost) {
        console.log('✅ Found fallback demo post:', demoPost.title)
        return demoPost
      }
      
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
    console.log('🔍 BlogService.getPublishedPosts called with options:', options)
    console.log('🔍 blogConfig.enableDemoData:', blogConfig.enableDemoData)
    
    // Return demo data if in demo mode
    if (blogConfig.enableDemoData) {
      console.log('✅ Using demo data for published posts')
      const demoPosts = this.getDemoFeaturedPosts(options.limit || 10)
      console.log('📝 Demo posts loaded:', demoPosts.length)
      return {
        posts: demoPosts,
        hasMore: false
      }
    }

    try {
      console.log('🌐 Attempting to fetch from Firestore...')
      
      // Try the simple query first
      try {
        const q = query(
          collection(db, this.POSTS_COLLECTION),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          firestoreLimit(options.limit || 10)
        )
        
        const querySnapshot = await getDocs(q)
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        console.log('📝 Firestore published posts loaded:', posts.length)
        return {
          posts,
          hasMore: false
        }
      } catch (indexError) {
        console.log('⚠️ Index not ready, fetching all posts and filtering...')
        
        // Fallback: fetch all posts and filter in JavaScript
        const q = query(
          collection(db, this.POSTS_COLLECTION),
          firestoreLimit(50) // Limit to avoid huge fetches
        )
        
        const querySnapshot = await getDocs(q)
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        // Filter published posts and sort by creation date
        const publishedPosts = allPosts
          .filter(post => post.status === 'published')
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.seconds || 0
            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.seconds || 0
            return bTime - aTime
          })
          .slice(0, options.limit || 10)
        
        console.log('📝 Firestore published posts loaded (fallback):', publishedPosts.length)
        return {
          posts: publishedPosts,
          hasMore: false
        }
      }
    } catch (error) {
      console.error('❌ Error fetching published posts:', error)
      // Fallback to demo posts on error
      console.log('🔄 Falling back to demo posts due to error')
      const demoPosts = this.getDemoFeaturedPosts(options.limit || 10)
      return {
        posts: demoPosts,
        hasMore: false
      }
    }
  }

  // Get featured posts
  static async getFeaturedPosts(limitCount = 3): Promise<BlogPost[]> {
    console.log('🔍 BlogService.getFeaturedPosts called with limit:', limitCount)
    console.log('🔍 blogConfig.enableDemoData:', blogConfig.enableDemoData)
    
    // Return demo data if in demo mode
    if (blogConfig.enableDemoData) {
      console.log('✅ Using demo data for featured posts')
      const demoPosts = this.getDemoFeaturedPosts(limitCount)
      console.log('📝 Demo featured posts loaded:', demoPosts.length)
      return demoPosts
    }

    try {
      console.log('🌐 Attempting to fetch featured posts from Firestore...')
      
      // First try to get posts with featured flag
      let q = query(
        collection(db, this.POSTS_COLLECTION),
        where('status', '==', 'published'),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      )
      
      try {
        const querySnapshot = await getDocs(q)
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        if (posts.length > 0) {
          console.log('📝 Firestore featured posts loaded:', posts.length)
          return posts
        }
      } catch (featuredError) {
        console.log('⚠️ Featured query failed, trying simple published posts...')
      }
      
      // Fallback: get any published posts ordered by creation date
      try {
        q = query(
          collection(db, this.POSTS_COLLECTION),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          firestoreLimit(limitCount)
        )
        
        const querySnapshot = await getDocs(q)
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        console.log('📝 Firestore published posts loaded (fallback):', posts.length)
        return posts
      } catch (fallbackError) {
        console.log('⚠️ All queries failed, fetching all posts and filtering...')
        
        // Final fallback: fetch all posts and filter in JavaScript
        const q = query(
          collection(db, this.POSTS_COLLECTION),
          firestoreLimit(50)
        )
        
        const querySnapshot = await getDocs(q)
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        // Filter published posts and sort by creation date
        const publishedPosts = allPosts
          .filter(post => post.status === 'published')
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.seconds || 0
            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.seconds || 0
            return bTime - aTime
          })
          .slice(0, limitCount)
        
        console.log('📝 Firestore published posts loaded (final fallback):', publishedPosts.length)
        return publishedPosts
      }
    } catch (error) {
      console.error('❌ Error fetching featured posts:', error)
      // Fallback to demo data on error
      console.log('🔄 Falling back to demo featured posts due to error')
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
        content: `# Getting Started with AI in Manufacturing

## Introduction

Artificial Intelligence is transforming the manufacturing industry at an unprecedented pace. From predictive maintenance to quality control, AI solutions are helping manufacturers increase efficiency, reduce costs, and improve product quality.

## Why AI in Manufacturing?

The manufacturing sector faces several challenges that AI can help address:

- **Predictive Maintenance**: Prevent equipment failures before they happen
- **Quality Control**: Detect defects with computer vision and machine learning
- **Supply Chain Optimization**: Streamline inventory and logistics
- **Energy Efficiency**: Optimize energy consumption and reduce costs

## Getting Started Steps

### 1. Assess Your Current State

Before implementing AI, evaluate your current processes:
- Identify pain points and inefficiencies
- Document existing data sources
- Assess team readiness and skills

### 2. Start Small

Begin with pilot projects that have:
- Clear, measurable objectives
- Limited scope and risk
- High potential for quick wins

### 3. Choose the Right Tools

Select AI tools that match your needs:
- **Low-Cost Options**: Google Cloud AutoML, Azure Cognitive Services
- **Open Source**: TensorFlow, PyTorch, Scikit-learn
- **Specialized Manufacturing**: Siemens Mindsphere, GE Predix

## Real-World Examples

### Case Study: Predictive Maintenance

A mid-sized manufacturer implemented vibration sensors and AI analysis to predict equipment failures. Results:
- 40% reduction in unplanned downtime
- 25% increase in equipment lifespan
- ROI achieved in 6 months

### Case Study: Quality Control

Using computer vision for defect detection:
- 95% accuracy in defect identification
- 60% reduction in quality control time
- Improved customer satisfaction

## Next Steps

Ready to get started? Consider these resources:
- Join industry forums and communities
- Attend AI manufacturing conferences
- Partner with technology consultants
- Start with a small pilot project

Remember, the journey to AI adoption is a marathon, not a sprint. Start small, learn fast, and scale gradually.`,
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com'
        },
        category: 'AI Fundamentals',
        tags: ['AI', 'Manufacturing', 'Getting Started'],
        seo: {
          metaTitle: 'Getting Started with AI in Manufacturing',
          metaDescription: 'Learn the fundamentals of implementing AI solutions in manufacturing environments with practical examples and real-world case studies.',
          focusKeyword: 'AI manufacturing'
        },
        publishedAt: Timestamp.fromDate(new Date('2025-06-15')),
        createdAt: Timestamp.fromDate(new Date('2025-06-10')),
        updatedAt: Timestamp.fromDate(new Date('2025-06-15')),
        viewCount: 245
      },
      {
        id: 'demo-2',
        title: 'Predictive Maintenance with Low-Cost AI Tools',
        slug: 'predictive-maintenance-low-cost-ai',
        excerpt: 'Discover how to implement predictive maintenance using accessible AI tools without breaking the budget.',
        content: `# Predictive Maintenance with Low-Cost AI Tools

## Introduction

Predictive maintenance is revolutionizing how manufacturers approach equipment maintenance. By using AI to predict when equipment will fail, you can schedule maintenance proactively, reducing downtime and costs.

## What is Predictive Maintenance?

Predictive maintenance uses data from sensors and AI algorithms to predict equipment failures before they happen. Unlike reactive maintenance (fixing things when they break) or preventive maintenance (scheduled maintenance), predictive maintenance is data-driven and cost-effective.

## Low-Cost AI Tools for Predictive Maintenance

### 1. Google Cloud AutoML

**Cost**: Pay-per-use, typically $20-100 per month for small datasets
**Features**:
- No coding required
- Automatic model training
- Easy integration with existing systems

**Best for**: Beginners, small to medium manufacturers

### 2. Azure Machine Learning

**Cost**: Free tier available, then $1-10 per hour for compute
**Features**:
- Drag-and-drop interface
- Built-in algorithms
- Good documentation and support

**Best for**: Microsoft ecosystem users

### 3. Open Source Solutions

**Cost**: Free (but requires technical expertise)
**Tools**:
- TensorFlow
- Scikit-learn
- Python with pandas and numpy

**Best for**: Companies with data science expertise

## Implementation Steps

### Step 1: Data Collection

Start with existing data sources:
- Equipment maintenance logs
- Sensor readings (temperature, vibration, pressure)
- Production data
- Historical failure records

### Step 2: Data Preparation

Clean and organize your data:
- Remove duplicates and errors
- Normalize sensor readings
- Create features (e.g., rolling averages, trends)

### Step 3: Model Training

Train your AI model:
- Split data into training and testing sets
- Choose appropriate algorithms
- Validate model performance

### Step 4: Deployment

Integrate with your maintenance system:
- Set up alerts for predicted failures
- Schedule maintenance based on predictions
- Monitor model performance

## Real-World Example

A small manufacturer implemented predictive maintenance using Google Cloud AutoML:

**Before**: 15% unplanned downtime, $50,000 annual maintenance costs
**After**: 5% unplanned downtime, $30,000 annual maintenance costs
**ROI**: 40% reduction in maintenance costs, paid for itself in 8 months

## Getting Started

1. **Assess your data**: What equipment data do you already collect?
2. **Choose a tool**: Start with cloud-based solutions if you're new to AI
3. **Start small**: Begin with one critical piece of equipment
4. **Measure results**: Track downtime, maintenance costs, and ROI

## Conclusion

Predictive maintenance doesn't have to be expensive or complex. With the right tools and approach, even small manufacturers can implement AI-powered maintenance strategies that save money and improve efficiency.

Start today with a simple pilot project, and you'll be amazed at the results you can achieve with low-cost AI tools.`,
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com'
        },
        category: 'Predictive Maintenance',
        tags: ['Predictive Maintenance', 'AI Tools', 'Cost-Effective'],
        seo: {
          metaTitle: 'Predictive Maintenance with Low-Cost AI Tools',
          metaDescription: 'Discover how to implement predictive maintenance using accessible AI tools and IoT sensors without breaking the budget.',
          focusKeyword: 'predictive maintenance AI'
        },
        publishedAt: Timestamp.fromDate(new Date('2025-06-12')),
        createdAt: Timestamp.fromDate(new Date('2025-06-08')),
        updatedAt: Timestamp.fromDate(new Date('2025-06-12')),
        viewCount: 189
      },
      {
        id: 'demo-3',
        title: 'Quality Control Automation: A Step-by-Step Guide',
        slug: 'quality-control-automation-guide',
        excerpt: 'Transform your quality control processes with automated inspection systems using computer vision and machine learning.',
        content: `# Quality Control Automation: A Step-by-Step Guide

## Introduction

Quality control is critical for manufacturing success, but manual inspection is time-consuming, expensive, and prone to human error. AI-powered automation can transform your quality control processes, providing consistent, accurate, and cost-effective inspection.

## Why Automate Quality Control?

### Benefits of AI-Powered Quality Control

- **Consistency**: 24/7 operation without fatigue or variation
- **Accuracy**: Higher detection rates than human inspectors
- **Speed**: Process thousands of items per minute
- **Cost Savings**: Reduce labor costs and scrap rates
- **Data Insights**: Collect detailed quality metrics for continuous improvement

### Challenges of Manual Quality Control

- Human inspectors get tired and make mistakes
- Inconsistent standards across shifts
- Limited throughput during peak production
- Difficulty detecting subtle defects
- High training and turnover costs

## AI Technologies for Quality Control

### 1. Computer Vision

Computer vision uses cameras and AI to "see" and analyze products:
- **Defect Detection**: Identify scratches, dents, color variations
- **Dimensional Analysis**: Measure parts to exact specifications
- **Surface Inspection**: Detect surface imperfections and contamination
- **Assembly Verification**: Ensure all components are present and correctly positioned

### 2. Machine Learning

Machine learning algorithms learn from examples:
- **Supervised Learning**: Train on labeled defect examples
- **Unsupervised Learning**: Detect anomalies without prior examples
- **Deep Learning**: Use neural networks for complex pattern recognition

### 3. IoT Sensors

Internet of Things sensors provide real-time data:
- **Temperature Sensors**: Monitor thermal conditions
- **Vibration Sensors**: Detect equipment issues
- **Pressure Sensors**: Ensure proper assembly pressure
- **Flow Sensors**: Monitor material flow rates

## Implementation Steps

### Phase 1: Assessment and Planning

1. **Audit Current Processes**
   - Map existing quality control workflows
   - Identify pain points and bottlenecks
   - Document defect types and frequencies
   - Assess data collection capabilities

2. **Define Requirements**
   - Set quality standards and tolerances
   - Determine inspection speed requirements
   - Identify critical quality parameters
   - Establish ROI targets

3. **Technology Selection**
   - Choose appropriate AI tools and platforms
   - Select hardware (cameras, sensors, lighting)
   - Evaluate integration requirements
   - Consider scalability and maintenance

### Phase 2: Pilot Implementation

1. **Start Small**
   - Choose one product line or process
   - Implement basic defect detection
   - Validate accuracy and reliability
   - Measure performance improvements

2. **Data Collection**
   - Install cameras and sensors
   - Collect training data (good and defective samples)
   - Label and organize training data
   - Establish baseline quality metrics

3. **Model Training**
   - Train AI models on your specific data
   - Validate model performance
   - Fine-tune detection parameters
   - Test with real production samples

### Phase 3: Full Deployment

1. **System Integration**
   - Connect AI systems to production lines
   - Integrate with existing quality management systems
   - Set up alerts and notifications
   - Establish escalation procedures

2. **Training and Change Management**
   - Train operators on new systems
   - Update standard operating procedures
   - Communicate benefits and expectations
   - Address concerns and resistance

3. **Monitoring and Optimization**
   - Track system performance metrics
   - Monitor false positive/negative rates
   - Optimize detection parameters
   - Plan continuous improvement initiatives

## Real-World Example

A mid-sized automotive parts manufacturer implemented AI quality control:

**Before**: 15% defect rate, 8 inspectors per shift, $200,000 annual quality costs
**After**: 3% defect rate, 2 inspectors per shift, $80,000 annual quality costs
**ROI**: 60% reduction in quality costs, paid for itself in 14 months

## Getting Started

1. **Assess your current quality control processes**
2. **Identify one process that would benefit from automation**
3. **Start with a simple pilot project**
4. **Measure results and expand gradually**

## Conclusion

AI-powered quality control automation is no longer just for large manufacturers. With the right approach and tools, companies of all sizes can implement intelligent quality control systems that improve product quality, reduce costs, and increase competitiveness.

The key is to start small, learn fast, and scale gradually. Your first AI quality control system doesn't have to be perfect—it just needs to be better than what you have today.`,
        status: 'published',
        featured: true,
        author: {
          id: 'richard-snyder',
          name: 'Richard Snyder',
          email: 'richard@faeintelligence.com'
        },
        category: 'Quality Control',
        tags: ['Quality Control', 'Automation', 'Computer Vision'],
        seo: {
          metaTitle: 'Quality Control Automation: A Step-by-Step Guide',
          metaDescription: 'Transform your quality control processes with AI-powered automation, computer vision, and smart sensors for consistent results.',
          focusKeyword: 'quality control automation'
        },
        publishedAt: Timestamp.fromDate(new Date('2025-06-10')),
        createdAt: Timestamp.fromDate(new Date('2025-06-05')),
        updatedAt: Timestamp.fromDate(new Date('2025-06-10')),
        viewCount: 167
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
    console.log('🔍 BlogService.getCategories called')
    
    try {
      console.log('🌐 Attempting to fetch categories from Firestore...')
      const q = query(
        collection(db, this.CATEGORIES_COLLECTION),
        orderBy('name', 'asc')
      )
      
      const querySnapshot = await getDocs(q)
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogCategory[]
      
      console.log('📝 Firestore categories loaded:', categories.length)
      return categories
    } catch (error) {
      console.error('❌ Error fetching categories:', error)
      // Fallback to demo categories on error
      console.log('🔄 Falling back to demo categories due to error')
      const demoCategories = this.getDemoCategories()
      console.log('📝 Demo categories loaded:', demoCategories.length)
      return demoCategories
    }
  }

  // Demo categories for development
  private static getDemoCategories(): BlogCategory[] {
    return [
      {
        id: 'demo-cat-1',
        name: 'AI Fundamentals',
        slug: 'ai-fundamentals',
        description: 'Core concepts and principles of artificial intelligence',
        postCount: 1,
        createdAt: Timestamp.fromDate(new Date('2025-06-01'))
      },
      {
        id: 'demo-cat-2',
        name: 'Predictive Maintenance',
        slug: 'predictive-maintenance',
        description: 'AI-powered maintenance strategies and tools',
        postCount: 1,
        createdAt: Timestamp.fromDate(new Date('2025-06-01'))
      },
      {
        id: 'demo-cat-3',
        name: 'Quality Control',
        slug: 'quality-control',
        description: 'Automated quality assurance and inspection systems',
        postCount: 1,
        createdAt: Timestamp.fromDate(new Date('2025-06-01'))
      }
    ]
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