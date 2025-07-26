'use client'

import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { BlogService } from '@/lib/blog'
import { BlogPost } from '@/types/blog'
import { Calendar, User, Eye, Tag, ArrowLeft, Share2, MessageSquare, Search } from 'lucide-react' // Import Lucide icons
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import ReactMarkdown from 'react-markdown' // Import ReactMarkdown
import remarkGfm from 'remark-gfm' // Import remarkGfm for GitHub Flavored Markdown

// Custom components to render Markdown elements
const MarkdownComponents: any = {
  h1: ({ ...props }: any) => <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
  h2: ({ children, ...props }: any) => {
    // Custom logic to inject icons based on heading text
    const textContent = Array.isArray(children) ? children.join('') : children;
    let Icon = null;
    if (textContent.includes("ChatGPT Data Analysis")) { // Changed ' to "
      Icon = MessageSquare;
    } else if (textContent.includes("Gemini in Google Sheets")) { // Changed ' to "
      Icon = Search; // Using Search for Google Gemini for illustrative purposes
    }

    return (
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-6 mb-3 flex items-center" {...props}>
        {Icon && <Icon className="mr-2 h-6 w-6 text-cyan-600 flex-shrink-0" />} {/* Render icon if found */}
        {children}
      </h2>
    );
  },
  h3: ({ ...props }: any) => <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-2" {...props} />,
  p: ({ ...props }: any) => <p className="text-base text-gray-700 leading-relaxed mb-4" {...props} />,
  ul: ({ ...props }: any) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
  ol: ({ ...props }: any) => <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />,
  li: ({ ...props }: any) => <li className="text-gray-700" {...props} />,
  a: ({ ...props }: any) => <a className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,

  blockquote: ({ children, ...props }: any) => {
    return (
      <blockquote className="border-l-4 pl-4 py-2 my-6 border-gray-300 bg-gray-50 text-gray-600" {...props}>
        {children}
      </blockquote>
    );
  },
};
  // Optionally, add custom components for images, tables, etc. if needed
  // img: ({ node, ...props }) => <Image {...props} width={props.width || 800} height={props.height || 400} className="w-full h-auto object-cover rounded-lg my-6" />,


export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      setLoading(true)

      // Fetch the post
      const postData = await BlogService.getPostBySlug(slug) // IMPORTANT: BlogService.getPostBySlug must return raw markdown in postData.content

      if (postData) {
        setPost(postData)

        // Increment view count
        await BlogService.incrementViewCount(postData.id)

        // Fetch related posts (same category)
        const relatedResult = await BlogService.getPublishedPosts({
          limit: 3,
          filters: {
            category: postData.category
          }
        })

        // Filter out current post from related posts
        const filteredRelated = relatedResult.posts.filter(p => p.id !== postData.id)
        setRelatedPosts(filteredRelated)

      } else {
        setError("Post not found") // Changed ' to "
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError("Failed to load post") // Changed ' to "
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp?.toDate) return "Unknown date" // Changed ' to "
    return timestamp.toDate().toLocaleDateString("en-US", { // Changed ' to "
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        alert("URL copied to clipboard!") // Changed ' to "
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("URL copied to clipboard!") // Changed ' to "
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

  if (error || !post) {
    return (
      <Container>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Post Not Found"} {/* Changed ' to " */}
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist or has been removed. {/* Changed ' to &apos; */}
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-4">
        <Container>
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">
              Blog
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 truncate">
              {post.title}
            </span>
          </nav>
        </Container>
      </section>

      {/* Article */}
      <article className="py-12 bg-white">
        <Container className="max-w-4xl"> {/* You might try max-w-3xl or max-w-2xl for narrower content */}
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge className="bg-cyan-100 text-cyan-800">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>

                </div>

                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>{post.viewCount || 0} views</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1000} // Example width, adjust as needed
                height={600} // Example height, adjust as needed
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {/* Using ReactMarkdown to render the content */}
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Founder of Fae Intelligence | 30+ Years Manufacturing Excellence
                </p>
                <p className="text-gray-700 text-sm">
                  Richard brings over three decades of hands-on manufacturing experience to help SMBs
                  implement practical AI solutions that deliver immediate, measurable results.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <Badge className="bg-cyan-100 text-cyan-800 mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-cyan-600 transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-cyan-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Manufacturing with AI?</h2>
            <p className="text-cyan-100 mb-6">
              Let&apos;s discuss how Fae Intelligence can help your team implement practical AI solutions.
            </p>
            <Link href="/consultation">
              <Button variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Your Free Consultation
              </Button>
            </Link>
          </div>
        </Container>
      </article>
    </>
  )
}

