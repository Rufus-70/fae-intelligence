// Debug script to check blog posts
import { BlogService } from './src/lib/blog.ts'

async function checkBlogPosts() {
  try {
    console.log('Checking blog posts...')
    
    // Get all posts
    const result = await BlogService.getPosts({ limit: 10 })
    console.log('Total posts found:', result.posts.length)
    
    result.posts.forEach(post => {
      console.log(`- ${post.title} (slug: ${post.slug}, status: ${post.status})`)
    })
    
    // Try to get a specific post by slug
    if (result.posts.length > 0) {
      const firstPost = result.posts[0]
      console.log(`\nTrying to fetch post by slug: ${firstPost.slug}`)
      const postBySlug = await BlogService.getPostBySlug(firstPost.slug)
      console.log('Post found by slug:', postBySlug ? 'YES' : 'NO')
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

checkBlogPosts()
