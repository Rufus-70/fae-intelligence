import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Eye, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import blogContent from '@/lib/blog-content.json'

// Get all posts from generated content
const STATIC_POSTS = blogContent.posts.reduce((acc: any, post: any) => {
  acc[post.slug] = post
  return acc
}, {})

export async function generateStaticParams() {
  // Get all published posts for static generation
  const publishedPosts = blogContent.posts.filter((post: any) => post.status === 'published')
  return publishedPosts.map((post: any) => ({
    slug: post.slug
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = STATIC_POSTS[slug as keyof typeof STATIC_POSTS]

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const formatDate = (date: any) => {
    // Handle both Date objects and date strings
    let dateObj: Date
    if (date instanceof Date) {
      dateObj = date
    } else if (typeof date === 'string') {
      dateObj = new Date(date)
    } else if (date && typeof date === 'object' && date.toDate) {
      // Handle Firebase Timestamp objects
      dateObj = date.toDate()
    } else {
      return 'Unknown date'
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date'
    }
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <Container>
          <div className="mb-8">
            <Button asChild variant="outline" size="sm" className="mb-6 bg-white text-slate-900 hover:bg-gray-100">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-cyan-100 text-cyan-800">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-6 max-w-3xl">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount} views</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
                  .replace(/^\- (.+)$/gm, '<li class="text-gray-700 mb-2">$1</li>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                  .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg shadow-md my-6" />')
                  .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4">')
                  .replace(/^(.+)$/gm, '<p class="text-gray-700 mb-4">$1</p>')
              }} />
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your AI Journey?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get personalized guidance and hands-on support to transform your business processes.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                  <Link href="/consultation">
                    Schedule Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/ai-readiness-assessment">
                    Take AI Readiness Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
