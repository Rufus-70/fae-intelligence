'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BlogPostForm from '@/components/blog/BlogPostForm'
import { Container } from '@/components/layout/Container'
import { BlogService } from '@/lib/blog'
import { BlogPost } from '@/types/blog'

export default function EditBlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string)
    }
  }, [params.id])

  const fetchPost = async (id: string) => {
    try {
      setLoading(true)
      const postData = await BlogService.getPost(id)
      
      if (postData) {
        setPost(postData)
      } else {
        setError('Post not found')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      {post && <BlogPostForm mode="edit" initialData={post} />}
    </Container>
  )
}
