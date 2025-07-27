// src/components/blog/BlogPostViewer.tsx
'use client'

import { BlogPost } from '@/types/blog'
import { Calendar, User, Eye, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostViewerProps {
  post: BlogPost
  format?: 'html' | 'markdown'
}

export default function BlogPostViewer({ post, format = 'html' }: BlogPostViewerProps) {
  const formatDate = (timestamp: { toDate?: () => Date } | null | undefined) => {
    if (!timestamp?.toDate) return 'Unknown date'
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Enhanced markdown to HTML converter
  const markdownToHtml = (markdown: string) => {
    return markdown
      // Headers with better styling
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mb-6 mt-8 text-gray-900 border-b-2 border-cyan-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-6 mt-10 text-gray-900 border-b-2 border-cyan-300 pb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-8 mt-12 text-gray-900 border-b-4 border-cyan-500 pb-4">$1</h1>')
      
      // Text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code blocks with syntax highlighting
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto mb-6 shadow-lg"><code class="text-sm font-mono">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-cyan-50 text-cyan-800 px-3 py-1 rounded-md text-sm font-mono border border-cyan-200">$1</code>')
      
      // Links with hover effects
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-600 hover:text-cyan-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium">$1</a>')
      
      // Lists with better spacing
      .replace(/^\* (.+)$/gm, '<li class="mb-3 flex items-start"><span class="text-cyan-500 mr-3 mt-2">•</span><span>$1</span></li>')
      .replace(/(<li class="mb-3 flex items-start">.*<\/li>)/g, '<ul class="mb-6 space-y-2 ml-4">$1</ul>')
      
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-cyan-500 bg-cyan-50 pl-6 py-4 mb-6 italic text-gray-700 rounded-r-lg">$1</blockquote>')
      
      // Paragraphs with proper spacing
      .replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 leading-relaxed">')
      .replace(/^(.+)$/, '<p class="mb-6 text-gray-700 leading-relaxed">$1</p>')
  }

  const renderContent = () => {
    if (format === 'markdown') {
      return (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      )
    } else {
      return (
        <div 
          className="prose prose-lg max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )
    }
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="mb-12">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

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
              />
              <div>
                <div className="text-sm font-bold text-gray-900">Fae Intelligence</div>
                <div className="text-xs text-gray-500">AI Made Practical</div>
              </div>
            </div>
          </div>
        </div>

        {/* Excerpt */}
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
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-12" />
      </header>

      {/* Content */}
      <div className="mb-12">
        {renderContent()}
      </div>

      {/* Fae Intelligence Footer Branding */}
      <footer className="border-t border-gray-200 pt-8 mt-12">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/assets/fae-logo.png" 
              alt="Fae Intelligence Logo" 
              width={48} 
              height={48}
              className="rounded-lg mr-4"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900">Fae Intelligence</h3>
              <p className="text-gray-600">AI Made Practical for Manufacturing</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Empowering manufacturing teams with practical AI solutions. Over 30 years of operational 
            excellence meets cutting-edge AI technology to transform your business operations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/resources" 
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              Explore Resources
            </Link>
            <Link 
              href="/blog" 
              className="bg-white text-cyan-600 px-6 py-3 rounded-lg border border-cyan-200 hover:bg-cyan-50 transition-colors font-medium"
            >
              More Articles
            </Link>
          </div>
        </div>
      </footer>

      {/* Global styles for blog content */}
      <style jsx global>{`
        .blog-content h1 {
          @apply text-4xl font-bold mb-8 mt-12 text-gray-900 border-b-4 border-cyan-500 pb-4;
        }
        .blog-content h2 {
          @apply text-3xl font-bold mb-6 mt-10 text-gray-900 border-b-2 border-cyan-300 pb-3;
        }
        .blog-content h3 {
          @apply text-2xl font-semibold mb-6 mt-8 text-gray-900 border-b-2 border-cyan-200 pb-2;
        }
        .blog-content p {
          @apply mb-6 text-gray-700 leading-relaxed text-lg;
        }
        .blog-content ul, .blog-content ol {
          @apply mb-6 ml-6 space-y-3;
        }
        .blog-content li {
          @apply text-gray-700 leading-relaxed;
        }
        .blog-content ul li {
          @apply list-disc;
        }
        .blog-content ol li {
          @apply list-decimal;
        }
        .blog-content a {
          @apply text-cyan-600 hover:text-cyan-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium;
        }
        .blog-content img {
          @apply rounded-lg shadow-lg mb-6 max-w-full h-auto;
        }
        .blog-content blockquote {
          @apply border-l-4 border-cyan-500 bg-cyan-50 pl-6 py-4 mb-6 italic text-gray-700 rounded-r-lg;
        }
        .blog-content code {
          @apply bg-cyan-50 text-cyan-800 px-3 py-1 rounded-md text-sm font-mono border border-cyan-200;
        }
        .blog-content pre {
          @apply bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto mb-6 shadow-lg;
        }
        .blog-content pre code {
          @apply bg-transparent text-green-400 p-0 border-0 text-sm font-mono;
        }
        .blog-content table {
          @apply w-full mb-6 border-collapse border border-gray-300 rounded-lg overflow-hidden;
        }
        .blog-content th, .blog-content td {
          @apply border border-gray-300 px-4 py-3 text-left;
        }
        .blog-content th {
          @apply bg-gray-100 font-semibold text-gray-900;
        }
      `}</style>
    </article>
  )
}
