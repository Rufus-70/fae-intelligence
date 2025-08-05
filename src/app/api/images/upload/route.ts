// src/app/api/images/upload/route.ts
import { NextResponse } from 'next/server'
import { StorageService } from '@/lib/storage'
import { auth } from '@/lib/firebase-admin' // Using firebase-admin for auth checks

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Optional: Authenticate the user
    // This is a basic example. You might have more robust authentication.
    const authToken = request.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authToken) {
        // For now, we'll allow unauthenticated uploads for simplicity in the editor
        // but in a production app, you'd want to enforce auth.
        console.warn('⚠️ No auth token provided for image upload. Allowing for editor simplicity.')
    }

    // Use a generic or temporary post ID for now
    const postId = formData.get('postId') as string || 'temp-editor-post'

    const validation = StorageService.validateImageFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const downloadURL = await StorageService.uploadBlogImage(file, postId)

    return NextResponse.json({ url: downloadURL })
  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
