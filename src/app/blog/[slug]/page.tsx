import { BlogPostClient } from '@/components/blog/BlogPostClient'
import { BlogService } from '@/lib/blog'

export async function generateStaticParams() {
  try {
    // Fetch all published blog posts from the database
    const result = await BlogService.getPosts({ 
      limit: 100, // Adjust as needed
      orderBy: 'publishedAt',
      orderDirection: 'desc'
    })
    
    // Return the slugs for static generation
    return result.posts
      .filter(post => post.slug) // Ensure slug exists
      .map(post => ({
        slug: post.slug
      }))
  } catch (error) {
    console.error('Error fetching blog posts for static generation:', error)
    // Return fallback slugs if database fetch fails
    return [
      { slug: '5-free-ai-tools-small-manufacturers' },
      { slug: 'getting-started-with-ai' },
      { slug: 'digital-transformation-guide' },
      { slug: 'ai-automation-benefits' },
      { slug: 'from-gut-feel-to-smart-moves' },
    ]
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  return (
    <div className="min-h-screen bg-white">
      <BlogPostClient slug={slug} />
    </div>
  )
}
