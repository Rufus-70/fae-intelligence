// src/app/blog/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { BlogService } from '@/lib/blog'
import { BlogPost, BlogCategory } from '@/types/blog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Calendar, User, Eye, Tag, ArrowRight, BookOpen, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const fetchBlogData = useCallback(async () => {
    try {
      console.log('🚀 Starting to fetch blog data...')
      
      // Fetch published posts
      console.log('📝 Fetching published posts...')
      const publishedResult = await BlogService.getPublishedPosts({ limit: 20 })
      setPosts(publishedResult.posts)
      console.log('✅ Published posts fetched:', publishedResult.posts.length)
      
      // Fetch featured posts
      console.log('📝 Fetching featured posts...')
      const featured = await BlogService.getFeaturedPosts(6)
      setFeaturedPosts(featured)
      console.log('✅ Featured posts fetched:', featured.length)
      
      // Fetch categories
      console.log('📝 Fetching categories...')
      const cats = await BlogService.getCategories()
      setCategories(cats)
      console.log('✅ Categories fetched:', cats.length)
      
    } catch (error) {
      console.error('❌ Error fetching blog data:', error)
      // Fallback to demo data on error
      console.log('🔄 Using fallback demo data due to error')
      const demoPosts = [
        {
          id: 'demo-1',
          title: 'Getting Started with AI in Manufacturing',
          slug: 'getting-started-ai-manufacturing',
          excerpt: 'Learn the fundamentals of implementing AI solutions in manufacturing environments with practical examples and real-world case studies.',
          content: '',
          status: 'published' as const,
          featured: true,
          author: { id: 'richard-snyder', name: 'Richard Snyder', email: 'richard@faeintelligence.com' },
          category: 'AI Fundamentals',
          tags: ['AI', 'Manufacturing', 'Getting Started'],
          seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
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
          content: '',
          status: 'published' as const,
          featured: true,
          author: { id: 'richard-snyder', name: 'Richard Snyder', email: 'richard@faeintelligence.com' },
          category: 'Predictive Maintenance',
          tags: ['Predictive Maintenance', 'AI Tools', 'Cost-Effective'],
          seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
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
          content: '',
          status: 'published' as const,
          featured: true,
          author: { id: 'richard-snyder', name: 'Richard Snyder', email: 'richard@faeintelligence.com' },
          category: 'Quality Control',
          tags: ['Quality Control', 'Automation', 'Computer Vision'],
          seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
          publishedAt: Timestamp.fromDate(new Date('2025-06-10')),
          createdAt: Timestamp.fromDate(new Date('2025-06-05')),
          updatedAt: Timestamp.fromDate(new Date('2025-06-10')),
          viewCount: 167
        }
      ]
      setPosts(demoPosts)
      setFeaturedPosts(demoPosts)
      setCategories([
        { 
          id: 'ai-fundamentals', 
          name: 'AI Fundamentals', 
          slug: 'ai-fundamentals',
          description: 'Core concepts and getting started guides', 
          postCount: 5,
          createdAt: Timestamp.fromDate(new Date('2025-06-01'))
        },
        { 
          id: 'predictive-maintenance', 
          name: 'Predictive Maintenance', 
          slug: 'predictive-maintenance',
          description: 'AI-powered maintenance strategies', 
          postCount: 3,
          createdAt: Timestamp.fromDate(new Date('2025-06-01'))
        },
        { 
          id: 'quality-control', 
          name: 'Quality Control', 
          slug: 'quality-control',
          description: 'Automation and inspection solutions', 
          postCount: 2,
          createdAt: Timestamp.fromDate(new Date('2025-06-01'))
        }
      ])
    } finally {
      console.log('🏁 Setting loading to false')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogData()
  }, [fetchBlogData])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    try {
      const searchResults = await BlogService.searchPosts(searchTerm)
      setPosts(searchResults)
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleCategoryFilter = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(categoryId)
    }
  }

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    : posts

  const formatDate = (timestamp: { toDate?: () => Date } | null | undefined) => {
    if (!timestamp?.toDate) return 'Unknown date'
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <Section className="py-20">
        <Container>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI Intelligence Blog
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover practical insights, real-world case studies, and actionable strategies for implementing AI in your manufacturing operations. Learn from 30+ years of operational excellence.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 text-gray-900"
                />
                <Button onClick={handleSearch} variant="primary">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Start your AI journey with these essential guides and case studies from industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-cyan-500" />
                    <Badge className="bg-cyan-100 text-cyan-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-cyan-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{post.viewCount}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find articles tailored to your specific interests and needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`h-full cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-cyan-500' : ''
                }`}
                onClick={() => handleCategoryFilter(category.id)}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant="outline">{category.postCount} articles</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{category.description}</p>
                    <div className="text-sm text-gray-500">
                      {posts.filter(post => 
                        post.category.toLowerCase().includes(category.name.toLowerCase())
                      ).length} posts available
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Posts Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              All Articles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Browse our complete collection of AI insights and practical guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-cyan-500" />
                    <Badge className="bg-gray-100 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-cyan-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{post.viewCount}</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `No articles match "${searchTerm}"` : 'No articles in this category'}
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }} variant="outline">
                View All Articles
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Implement AI in Your Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get personalized guidance and hands-on support to transform your manufacturing processes with practical AI solutions.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/training" variant="secondary" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                View Training Options
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
