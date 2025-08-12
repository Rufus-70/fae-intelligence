'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { MarkdownBlogService } from '@/lib/markdown-blog'
import { MarkdownBlogPost } from '@/lib/markdown-blog'
import { ArrowLeft, Calendar, User, Eye, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostClientProps {
  slug: string
}

export function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<MarkdownBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching post with slug:', slug)
        
        // Get post by slug
        const postData = await MarkdownBlogService.getPostBySlug(slug)
        
        console.log('Post data received:', postData)
        
        if (!postData) {
          console.log('No post found for slug:', slug)
          setError(`Post not found for slug: ${slug}`)
          return
        }

        setPost(postData)
        
        // Note: View count increment not implemented for markdown posts
        // Could be implemented with local storage or simple file updates
        
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(`Failed to load post: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'Unknown date'
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Simple markdown to HTML converter
  const markdownToHtml = (markdown: string) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mb-4 mt-8 text-gray-900">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-6 mt-10 text-gray-900">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-8 mt-12 text-gray-900">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-600 hover:text-cyan-800 underline">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>')
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

  if (error || !post) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {error || 'Post Not Found'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild variant="primary">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Back to Blog Button */}
      <Section className="py-4 border-b border-gray-200">
        <Container>
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </Container>
      </Section>

      {/* Blog Post Content */}
      <Section className="py-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              {/* Title and Logo Row */}
              <div className="flex items-start justify-between gap-8 mb-6">
                {/* Title - Takes up 3/4 width */}
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {post.title}
                  </h1>
                </div>
                
                {/* Logo - Takes up 1/4 width */}
                <div className="flex-shrink-0 w-48">
                  <div className="flex items-center bg-white rounded-xl shadow-md px-4 py-3 border border-gray-100">
                    <Image 
                      src="/assets/fae-logo.png" 
                      alt="Fae Intelligence Logo" 
                      width={32} 
                      height={32}
                      className="rounded-lg mr-3"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Fae Intelligence</div>
                      <div className="text-xs text-gray-500">AI Made Practical</div>
                    </div>
                  </div>
                </div>
              </div>

              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>{post.viewCount} views</span>
                </div>
              </div>

              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Badge className="bg-cyan-100 text-cyan-800 px-4 py-2 text-base font-medium">
                  {post.category}
                </Badge>
                
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-gray-600 border-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-gray-200 mb-12" />
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: markdownToHtml(post.content)
                }}
              />
            </div>
          </article>
        </Container>
      </Section>
    </>
  )
}
