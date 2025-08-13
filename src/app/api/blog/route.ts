// src/app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface BlogPostData {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  author: {
    id: string
    name: string
    email: string
  }
  category: string
  tags: string[]
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  viewCount: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
  }
}

const DRAFT_DIR = 'docs/03-SITE-STRUCTURE/blogs/Draft'
const PUBLISHED_DIR = 'docs/03-SITE-STRUCTURE/blogs/Published'
const ARCHIVED_DIR = 'docs/03-SITE-STRUCTURE/blogs/Archived'

// Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const data: BlogPostData = await request.json()
    
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }

    // Set timestamps
    const now = new Date()
    data.createdAt = now.toISOString()
    data.updatedAt = now.toISOString()
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = now.toISOString()
    }

    // Determine target directory
    let targetDir: string
    switch (data.status) {
      case 'published':
        targetDir = PUBLISHED_DIR
        break
      case 'archived':
        targetDir = ARCHIVED_DIR
        break
      default:
        targetDir = DRAFT_DIR
    }

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Create markdown content with YAML frontmatter
    const markdownContent = createMarkdownContent(data)
    
    // Write the file
    const filename = `${data.slug}.md`
    const filePath = path.join(targetDir, filename)
    fs.writeFileSync(filePath, markdownContent, 'utf8')
    
    // Regenerate blog content
    try {
      await execAsync('npm run generate-blog')
    } catch (error) {
      console.error('Error regenerating blog content:', error)
      // Don't fail the request if regeneration fails
    }
    
    return NextResponse.json({ 
      success: true, 
      id: data.slug,
      message: `Blog post created successfully: ${filePath}` 
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

// Update an existing blog post
export async function PUT(request: NextRequest) {
  try {
    const data: BlogPostData = await request.json()
    
    if (!data.id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Update timestamp
    data.updatedAt = new Date().toISOString()
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date().toISOString()
    }

    // Determine target directory
    let targetDir: string
    switch (data.status) {
      case 'published':
        targetDir = PUBLISHED_DIR
        break
      case 'archived':
        targetDir = ARCHIVED_DIR
        break
      default:
        targetDir = DRAFT_DIR
    }

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Create markdown content with YAML frontmatter
    const markdownContent = createMarkdownContent(data)
    
    // Write the file
    const filename = `${data.slug}.md`
    const filePath = path.join(targetDir, filename)
    fs.writeFileSync(filePath, markdownContent, 'utf8')
    
    // Regenerate blog content
    try {
      await execAsync('npm run generate-blog')
    } catch (error) {
      console.error('Error regenerating blog content:', error)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Blog post updated successfully: ${filePath}` 
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status') || 'draft'
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Determine directory based on status
    let targetDir: string
    switch (status) {
      case 'published':
        targetDir = PUBLISHED_DIR
        break
      case 'archived':
        targetDir = ARCHIVED_DIR
        break
      default:
        targetDir = DRAFT_DIR
    }

    const filename = `${id}.md`
    const filePath = path.join(targetDir, filename)
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      
      // Regenerate blog content
      try {
        await execAsync('npm run generate-blog')
      } catch (error) {
        console.error('Error regenerating blog content:', error)
      }
      
      return NextResponse.json({ 
        success: true, 
        message: `Blog post deleted successfully: ${filePath}` 
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}

// Helper function to create markdown content with YAML frontmatter
function createMarkdownContent(post: BlogPostData): string {
  const frontmatter = {
    title: post.title,
    excerpt: post.excerpt,
    status: post.status,
    featured: post.featured,
    author: post.author,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    seo: post.seo
  }

  const yamlFrontmatter = `---\n${Object.entries(frontmatter)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(item => `  - ${item}`).join('\n')}`
      }
      if (typeof value === 'object' && value !== null) {
        return `${key}:\n${Object.entries(value)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => `  ${k}: ${v}`)
          .join('\n')}`
      }
      return `${key}: ${value}`
    })
    .join('\n')}\n---\n\n`

  return yamlFrontmatter + post.content
}
