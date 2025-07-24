// src/app/blog/page.tsx - Updated dynamic blog listing
'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlogService } from '@/lib/blog'
import { BlogPost, BlogCategory } from '@/types/blog'
import { Calendar, User, ArrowRight, Search, Filter, Clock } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      
      // Fetch featured posts
      const featured = await BlogService.getFeaturedPosts(3)
      setFeaturedPosts(featured)
      
      // Fetch categories
      const categoriesData = await BlogService.getCategories()
      setCategories(categoriesData)
      
      // Fetch regular posts
      await fetchPosts()
      
    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const filters = selectedCategory ? { category: selectedCategory } : {}
      
      const result = await BlogService.getPublishedPosts({
        limit: 12,
        orderBy: 'publishedAt',
        orderDirection: 'desc',
        filters
      })
      
      setPosts(result.posts)
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchPosts()
      return
    }

    try {
      const searchResults = await BlogService.searchPosts(searchTerm)
      setPosts(searchResults)
      setHasMore(false)
    } catch (error) {
      console.error('Error searching posts:', error)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return 'Unknown date'
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const PostCard = ({ post }: { post: BlogPost }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className="bg-cyan-100 text-cyan-800">
            {post.category}
          </Badge>
          {post.featured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl hover:text-cyan-500 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
        >
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      </Container>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Practical AI Insights for Manufacturing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world strategies, actionable insights, and proven approaches to implementing 
              AI in small and medium manufacturing businesses.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <Button onClick={handleSearch} variant="outline">
                Search
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name} ({category.postCount})
                  </option>
                ))}
              </select>
              
              {(searchTerm || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    fetchPosts()
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Posts Found</h2>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for new content about practical AI in manufacturing."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    fetchPosts()
                  }}
                >
                  View All Posts
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {hasMore && (
                <div className="text-center mt-12">
                  <Button onClick={fetchPosts} variant="outline" size="lg">
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with AI Manufacturing Insights
            </h2>
            <p className="text-cyan-100 mb-8">
              Get practical tips, case studies, and actionable strategies delivered to your inbox. 
              No hype, just real-world solutions for manufacturing professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-cyan-300"
              />
              <Button className="bg-white text-cyan-500 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

// firestore.rules - Security Rules for Blog System
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - for storing user roles and metadata
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Blog posts - public read for published, admin write
    match /blog_posts/{postId} {
      // Anyone can read published posts
      allow read: if resource.data.status == 'published';
      
      // Only authenticated admins can read all posts and write
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      
      // Ensure required fields on create/update
      allow create: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' &&
        request.resource.data.keys().hasAll(['title', 'content', 'author', 'status']) &&
        request.resource.data.author.id == request.auth.uid;
      
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' &&
        request.resource.data.author.id == resource.data.author.id;
    }
    
    // Blog categories - public read, admin write
    match /blog_categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Blog tags - public read, admin write
    match /blog_tags/{tagId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // File uploads for blog images
    match /uploads/{uploadId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
*/

// firebase/storage.rules - Storage Rules for Blog Images
/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Blog images - public read, admin write
    match /blog_images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Featured images for blog posts
    match /blog_featured/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // General uploads folder
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
*/