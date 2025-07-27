// src/components/blog/EnhancedBlogCard.tsx
'use client'

import { BlogPost } from '@/types/blog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface EnhancedBlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
}

export default function EnhancedBlogCard({ post, variant = 'default' }: EnhancedBlogCardProps) {
  const formatDate = (timestamp: { toDate?: () => Date } | null | undefined) => {
    if (!timestamp?.toDate) return 'Unknown date'
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="relative">
          {post.featuredImage && (
            <div className="relative h-64 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <Badge className="absolute top-4 left-4 bg-cyan-500 text-white font-semibold">
            Featured
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{getReadingTime(post.content)} min read</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt || truncateText(post.content.replace(/<[^>]*>/g, ''), 150)}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-100 text-cyan-800">
                {post.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount}</span>
              </div>
            </div>

            <Button asChild variant="outline" className="group-hover:bg-cyan-500 group-hover:text-white transition-all">
              <Link href={`/blog/${post.slug}`}>
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-cyan-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {post.featuredImage && (
              <div className="flex-shrink-0">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                <span>{getReadingTime(post.content)} min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
                >
                  Read →
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-cyan-300 overflow-hidden">
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2 mb-3">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col h-full">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt || truncateText(post.content.replace(/<[^>]*>/g, ''), 120)}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-cyan-100 text-cyan-800">
              {post.category}
            </Badge>
            {post.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{getReadingTime(post.content)} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount}</span>
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="group-hover:bg-cyan-500 group-hover:text-white transition-all">
              <Link href={`/blog/${post.slug}`}>
                Read More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
