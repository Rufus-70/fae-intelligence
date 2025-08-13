// src/lib/markdown-blog-service.ts
// Service for managing blog posts as local markdown files via API

// Local interfaces for markdown-based blog system (no Firebase dependencies)
export interface LocalBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: {
    id: string
    name: string
    email: string
  }
  tags: string[]
  category: string
  status: 'draft' | 'published' | 'archived'
  seo: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
  }
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  viewCount: number
  featured: boolean
}

export interface LocalBlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
  createdAt: Date
}

export interface LocalBlogTag {
  id: string
  name: string
  slug: string
  postCount: number
  createdAt: Date
}

export interface MarkdownBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  author: {
    id: string
    name: string
    email: string
  }
  category: string
  tags: string[]
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  viewCount: number
  seo: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
  }
}

export interface MarkdownBlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
  createdAt: Date
}

export class MarkdownBlogService {
  private static readonly API_BASE = '/api/blog'

  // Create a new blog post
  static async createPost(data: Omit<LocalBlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          viewCount: 0
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to create blog post: ${response.statusText}`)
      }

      const result = await response.json()
      return result.id
    } catch (error) {
      console.error('Error creating blog post:', error)
      throw new Error('Failed to create blog post')
    }
  }

  // Update an existing blog post
  static async updatePost(id: string, data: Partial<LocalBlogPost>): Promise<void> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          id
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to update blog post: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw new Error('Failed to update blog post')
    }
  }

  // Delete a blog post
  static async deletePost(id: string): Promise<void> {
    try {
      // Get existing post to know which directory it's in
      const existingPost = await this.getPost(id)
      if (!existingPost) {
        throw new Error('Post not found')
      }

      const response = await fetch(`${this.API_BASE}?id=${id}&status=${existingPost.status}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`Failed to delete blog post: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw new Error('Failed to delete blog post')
    }
  }

  // Get a single blog post by ID
  static async getPost(id: string): Promise<MarkdownBlogPost | null> {
    try {
      const allPosts = await this.getAllPosts()
      return allPosts.find(post => post.id === id) || null
    } catch (error) {
      console.error('Error fetching blog post:', error)
      return null
    }
  }

  // Get all blog posts
  static async getAllPosts(): Promise<MarkdownBlogPost[]> {
    try {
      // Import the generated blog content
      const blogContent = await import('./blog-content.json')
      const posts = blogContent.posts || []
      
      // Transform the data to match MarkdownBlogPost interface
      return posts.map((post: any) => ({
        ...post,
        status: post.status as 'draft' | 'published' | 'archived',
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        seo: post.seo || {
          metaTitle: post.title,
          metaDescription: post.excerpt,
          focusKeyword: ''
        }
      }))
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
  }

  // Get posts with filtering
  static async getPosts(options: {
    limit?: number
    orderBy?: string
    orderDirection?: 'asc' | 'desc'
    filters?: { status?: string }
  } = {}): Promise<{ posts: MarkdownBlogPost[], hasMore: boolean }> {
    try {
      let posts = await this.getAllPosts()

      // Apply status filter
      if (options.filters?.status && options.filters.status !== 'all') {
        posts = posts.filter(post => post.status === options.filters!.status)
      }

      // Apply sorting
      if (options.orderBy) {
        posts.sort((a, b) => {
          const aValue = a[options.orderBy as keyof MarkdownBlogPost]
          const bValue = b[options.orderBy as keyof MarkdownBlogPost]
          
          if (aValue instanceof Date && bValue instanceof Date) {
            return options.orderDirection === 'desc' 
              ? bValue.getTime() - aValue.getTime()
              : aValue.getTime() - bValue.getTime()
          }
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return options.orderDirection === 'desc'
              ? bValue.localeCompare(aValue)
              : aValue.localeCompare(bValue)
          }
          
          return 0
        })
      }

      // Apply limit
      if (options.limit) {
        const limitedPosts = posts.slice(0, options.limit)
        return {
          posts: limitedPosts,
          hasMore: posts.length > options.limit
        }
      }

      return { posts, hasMore: false }
    } catch (error) {
      console.error('Error fetching posts:', error)
      return { posts: [], hasMore: false }
    }
  }

  // Get categories
  static async getCategories(): Promise<LocalBlogCategory[]> {
    try {
      const blogContent = await import('./blog-content.json')
      const categories = blogContent.categories || []
      
      // Transform the data to match LocalBlogCategory interface
      return categories.map((category: any) => ({
        ...category,
        createdAt: new Date(category.createdAt)
      }))
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Get tags
  static async getTags(): Promise<LocalBlogTag[]> {
    try {
      const allPosts = await this.getAllPosts()
      const tagSet = new Set<string>()
      
      allPosts.forEach(post => {
        post.tags.forEach(tag => tagSet.add(tag))
      })
      
      return Array.from(tagSet).map(tag => ({
        id: tag.toLowerCase().replace(/\s+/g, '-'),
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
        postCount: 0,
        createdAt: new Date()
      }))
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  }

  // Utility function to generate URL-friendly slugs
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }
}
