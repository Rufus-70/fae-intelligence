// src/components/blog/BlogEditClient.tsx - Client component for editing blog posts
'use client'

import { useEffect, useState } from 'react'
import BlogPostForm from './BlogPostForm'
import { Container } from '@/components/layout/Container'
import { MarkdownBlogService, MarkdownBlogPost } from '@/lib/markdown-blog-service'

interface BlogEditClientProps {
  postId: string
}

export default function BlogEditClient({ postId }: BlogEditClientProps) {
  const [post, setPost] = useState<MarkdownBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const fetchedPost = await MarkdownBlogService.getPost(postId)
        if (fetchedPost) {
          setPost(fetchedPost)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      </Container>
    )
  }

  if (error || !post) {
    return (
      <Container>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Blog post not found'}
          </h2>
          <p className="text-gray-600">
            The blog post you're trying to edit could not be loaded.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <BlogPostForm mode="edit" initialData={post} />
    </Container>
  )
}
