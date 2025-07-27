// src/app/blog/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { BlogService } from '@/lib/blog'
import { BlogPost, BlogCategory } from '@/types/blog'
import { Search, Filter, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SimpleBlogCard from '@/components/blog/SimpleBlogCard'
import Image from 'next/image'

export const dynamic = 'force-static'

export default function PublicBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const fetchBlogData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch featured posts
      const featured = await BlogService.getFeaturedPosts(2)
      setFeaturedPosts(featured)
      
      // Fetch categories
      const categoriesData = await BlogService.getCategories()
      setCategories(categoriesData)
      
      // Fetch regular posts
      const filters = selectedCategory ? { category: selectedCategory } : {}
      const result = await BlogService.getPublishedPosts({
        limit: 12,
        orderBy: 'publishedAt',
        orderDirection: 'desc',
        filters
      })
      
      setPosts(result.posts)
      
    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchBlogData()
  }, [fetchBlogData])

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchBlogData()
      return
    }

    try {
      const searchResults = await BlogService.searchPosts(searchTerm)
      setPosts(searchResults)
    } catch (error) {
      console.error('Error searching posts:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Section className="py-20">
          <Container>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Fae Intelligence Logo */}
            <div className="flex items-center justify-center mb-8">
              <Image 
                src="/assets/fae-logo.png" 
                alt="Fae Intelligence Logo" 
                width={60} 
                height={60}
                className="rounded-xl mr-4 bg-white p-2"
                priority
              />
              <div className="text-left">
                <h2 className="text-2xl font-bold">Fae Intelligence</h2>
                <p className="text-cyan-100">AI Made Practical</p>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              AI Intelligence Blog
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Insights, tutorials, and updates on artificial intelligence, manufacturing technology, and business transformation.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 border-0 focus:ring-4 focus:ring-white/20 text-lg"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg"
                  className="bg-white text-cyan-600 hover:bg-gray-100 px-8"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Categories Filter */}
      <Section className="py-8 bg-white border-b">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by category:</span>
            </div>
            
            <Button
              variant={!selectedCategory ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All Posts
            </Button>
            
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.postCount}
                </Badge>
              </Button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !selectedCategory && !searchTerm && (
        <Section className="py-16">
          <Container>
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-6 w-6 text-cyan-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map(post => (
                <SimpleBlogCard 
                  key={post.id} 
                  post={post} 
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Regular Posts */}
      <Section className="py-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory ? `${selectedCategory} Articles` : 'Latest Articles'}
            </h2>
            <p className="text-gray-600">
              {searchTerm ? `Search results for "${searchTerm}"` : 'Discover insights and practical knowledge'}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <SimpleBlogCard 
                  key={post.id} 
                  post={post} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No articles match your search for "${searchTerm}"`
                    : selectedCategory 
                    ? `No articles in the "${selectedCategory}" category yet`
                    : "No articles have been published yet"
                  }
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('')
                    }}
                    variant="outline"
                  >
                    View All Articles
                  </Button>
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
