import { NextResponse } from 'next/server'
import blogContent from '@/lib/blog-content.json'

export async function GET() {
  try {
    return NextResponse.json(blogContent)
  } catch (error) {
    console.error('Error loading blog content:', error)
    return NextResponse.json(
      { error: 'Failed to load blog content' },
      { status: 500 }
    )
  }
}
