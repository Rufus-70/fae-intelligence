// src/components/blog/SimpleBlogCard.tsx
'use client'

import { BlogPost } from '@/types/blog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'

interface SimpleBlogCardProps {
  post: BlogPost
}

export default function SimpleBlogCard({ post }: SimpleBlogCardProps) {
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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className="bg-cyan-100 text-cyan-800">
            {post.category}
          </Badge>
          {post.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <CardTitle className="text-xl line-clamp-2">
          {post.title}
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || truncateText(post.content.replace(/<[^>]*>/g, ''), 120)}
        </p>

        <div className="flex items-center justify-between">
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

          <Button asChild variant="outline" size="sm">
            <Link href={`/blog/${post.slug}`}>
              Read More
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
