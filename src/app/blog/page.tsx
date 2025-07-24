import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 'welcome-to-fae-intelligence',
    title: 'Welcome to Fae Intelligence',
    excerpt: 'Introducing practical AI solutions for manufacturing excellence',
    author: 'Richard Snyder',
    date: '2025-06-11',
    tags: ['AI', 'Manufacturing', 'Introduction']
  },
  {
    id: 'practical-ai-tools-for-manufacturers',
    title: 'Practical AI Tools Every Manufacturer Should Know',
    excerpt: 'Discover free and low-cost AI tools that can immediately impact your operations',
    author: 'Richard Snyder',
    date: '2025-06-10',
    tags: ['AI Tools', 'Manufacturing', 'Productivity']
  },
  {
    id: 'overcoming-ai-resistance-in-manufacturing',
    title: 'Overcoming AI Resistance in Manufacturing Teams',
    excerpt: 'Strategies for getting your team excited about AI instead of fearful',
    author: 'Richard Snyder',
    date: '2025-06-08',
    tags: ['Change Management', 'AI Adoption', 'Leadership']
  }
]

export default function BlogPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Fae Intelligence Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Practical insights on implementing AI in manufacturing. Real-world strategies from 30+ years of operational experience.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl hover:text-cyan-500 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
