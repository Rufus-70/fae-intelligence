// src/app/blog/page.tsx
'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  // Static blog posts for testing
  const posts = [
    {
      id: 'ai-readiness-assessment-guide',
      title: 'AI Readiness Assessment: Your Complete Guide to Digital Transformation',
      slug: 'ai-readiness-assessment-guide',
      excerpt: 'Evaluate your organization\'s readiness for AI implementation with our comprehensive assessment framework. Identify gaps, opportunities, and create a roadmap for success.',
      category: 'AI Strategy',
      tags: ['AI Readiness', 'Digital Transformation', 'Assessment'],
      author: { name: 'Richard Snyder' },
      viewCount: 0,
      featured: true
    },
    {
      id: 'practical-ai-implementation-guide',
      title: 'Practical AI Implementation: From Theory to Real-World Results',
      slug: 'practical-ai-implementation-guide',
      excerpt: 'Learn the proven strategies for implementing AI solutions that deliver measurable business results. Avoid common pitfalls and accelerate your AI journey with practical, actionable guidance.',
      category: 'AI Implementation',
      tags: ['AI Implementation', 'Practical Guide', 'Best Practices'],
      author: { name: 'Richard Snyder' },
      viewCount: 0,
      featured: true
    }
  ]

  const categories = [
    { 
      id: 'ai-strategy', 
      name: 'AI Strategy', 
      description: 'Strategic planning and assessment for AI initiatives',
      postCount: 1
    },
    { 
      id: 'ai-implementation', 
      name: 'AI Implementation', 
      description: 'Practical implementation guides and best practices',
      postCount: 1
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI Intelligence Blog
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover practical insights, real-world case studies, and actionable strategies for implementing AI across all industries. Learn from 30+ years of operational excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Start your AI journey with these essential guides and case studies from industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-cyan-500" />
                    <Badge className="bg-cyan-100 text-cyan-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-cyan-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{post.viewCount}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find articles tailored to your specific interests and needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant="outline">{category.postCount} articles</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{category.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Posts Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              All Articles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Browse our complete collection of AI insights and practical guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-cyan-500" />
                    <Badge className="bg-gray-100 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-cyan-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-500 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Implement AI in Your Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get personalized guidance and hands-on support to transform your business processes with practical AI solutions.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-cyan-500 hover:bg-gray-100">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/training" variant="secondary" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                View Training Options
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
