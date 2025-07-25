'use client' // Assuming this is still a client component

import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react' // Import useState and useEffect
import { BlogService } from '@/lib/blog' // Import your BlogService
import { BlogPost } from '@/types/blog' // Import your BlogPost type

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Fetch published posts from your BlogService
        // You might want to get all posts or paginate here
        const result = await BlogService.getPublishedPosts({ limit: 100 }); // Adjust limit as needed
        setBlogPosts(result.posts); // Assuming result has a 'posts' array
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <Container className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading blog posts...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16 text-center text-red-600">
        <p>{error}</p>
      </Container>
    );
  }

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
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Using post.category or post.tags if applicable from BlogPost type */}
                      {post.category && (
                        <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                          {post.category}
                        </Badge>
                      )}
                      {post.tags && post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl hover:text-cyan-500 transition-colors">
                      {/* Use post.slug if available and preferred over post.id */}
                      <Link href={`/blog/${post.slug || post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author.name}</span> {/* Assuming author is an object now */}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {post.publishedAt ?
                            (post.publishedAt as unknown as Timestamp).toDate().toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) :
                            'Unknown Date'}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600">No blog posts found.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
