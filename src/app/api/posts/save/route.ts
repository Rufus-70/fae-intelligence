import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🔥 API: Saving post to Firebase:', body);
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Prepare post data for Firebase
    const postData = {
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
      content: body.content,
      htmlContent: body.htmlContent || body.content,
      status: body.status || 'draft',
      featured: body.featured || false,
      author: {
        id: 'fae-intelligence',
        name: body.author || 'Fae Intelligence',
        email: 'admin@faeintelligence.com'
      },
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      tags: body.tags || ['ai', 'automation'],
      category: body.category || 'ai-automation',
      viewCount: 0,
      seo: {
        metaTitle: body.title,
        metaDescription: body.excerpt || body.content.substring(0, 150) + '...',
        focusKeyword: 'ai automation'
      }
    };
    
    console.log('📊 API: Prepared post data:', postData);
    
    // Save to Firebase using BlogService
    const postId = await BlogService.createPost(postData);
    
    console.log('✅ API: Post saved to Firebase with ID:', postId);
    
    return NextResponse.json({
      success: true,
      id: postId,
      message: 'Post saved successfully'
    });
    
  } catch (error) {
    console.error('❌ API: Error saving post:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


