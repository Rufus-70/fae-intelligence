// src/app/api/blog/save/route.ts
import { NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog'
import { auth } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, content } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // In a real app, you'd get the author from the authenticated user
    const author = {
      id: 'admin-user',
      name: 'Admin User',
      email: 'admin@example.com'
    }

    let postId = id

    if (postId) {
      // Update existing post
      await BlogService.updatePost(postId, { title, content })
    } else {
      // Create new post
      const newPostData = {
        title,
        content,
        excerpt: content.substring(0, 150), // Simple excerpt generation
        status: 'draft' as const,
        author,
        category: 'Uncategorized',
        tags: [],
        featured: false,
        seo: {
          metaTitle: title,
          metaDescription: content.substring(0, 160),
          focusKeyword: ''
        }
      }
      postId = await BlogService.createPost(newPostData)
    }

    return NextResponse.json({ id: postId })
  } catch (error) {
    console.error('Error saving blog post:', error)
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 })
  }
}
