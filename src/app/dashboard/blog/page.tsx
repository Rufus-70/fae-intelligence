// src/app/dashboard/blog/page.tsx - Blog Admin Dashboard
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MarkdownBlogService, MarkdownBlogPost } from '@/lib/markdown-blog-service'
import { 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  FileText,
  Search,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function BlogDashboard() {
  const [posts, setPosts] = useState<MarkdownBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch all posts (including drafts) for admin view
      const result = await MarkdownBlogService.getPosts({ 
        limit: 50,
        orderBy: 'updatedAt',
        orderDirection: 'desc',
        filters: statusFilter !== 'all' ? { status: statusFilter } : undefined
      })
      
      setPosts(result.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      await MarkdownBlogService.deletePost(postId)
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'Unknown date'
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
        </div>
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
          <Link href="/blogcraft">
            <Plus className="h-4 w-4 mr-2" />
            New Post (BlogCraft)
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-cyan-600">{stats.featured}</p>
              </div>
              <Eye className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Blog Posts ({filteredPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first blog post.'}
              </p>
              <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                <Link href="/blogcraft">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post (BlogCraft)
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        {post.featured && (
                          <Badge variant="outline" className="text-cyan-600 border-cyan-600">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{typeof post.author === 'string' ? post.author : post.author.name}</span>
                          </div>
                        )}
                        {post.category && (
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.status === 'published' && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href="/blogcraft">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit (BlogCraft)
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
