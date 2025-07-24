// src/types/blog.ts
import { Timestamp } from 'firebase/firestore'

export interface BlogPost {
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
  publishedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
  viewCount: number
  featured: boolean
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
  createdAt: Timestamp
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  postCount: number
  createdAt: Timestamp
}

export interface BlogPostFormData {
  title: string
  excerpt: string
  content: string
  featuredImage?: File | string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  featured: boolean
  seo: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
  }
}

export interface BlogFilters {
  status?: BlogPost['status']
  category?: string
  tag?: string
  author?: string
  dateFrom?: Date
  dateTo?: Date
  searchTerm?: string
}

export interface BlogListOptions {
  limit?: number
  offset?: number
  orderBy?: 'createdAt' | 'publishedAt' | 'updatedAt' | 'viewCount'
  orderDirection?: 'asc' | 'desc'
  filters?: BlogFilters
}