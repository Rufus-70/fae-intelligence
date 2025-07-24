// src/lib/storage.ts - File upload service
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

export class StorageService {
  private static readonly BLOG_IMAGES_PATH = 'blog_images'
  private static readonly FEATURED_IMAGES_PATH = 'blog_featured'
  private static readonly FILES_PATH = 'files'

  // Upload blog content image
  static async uploadBlogImage(file: File, postId: string): Promise<string> {
    try {
      const fileName = `${postId}_${Date.now()}_${file.name}`
      const imageRef = ref(storage, `${this.BLOG_IMAGES_PATH}/${fileName}`)
      
      const snapshot = await uploadBytes(imageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return downloadURL
    } catch (error) {
      console.error('Error uploading blog image:', error)
      throw new Error('Failed to upload image')
    }
  }

  // Upload featured image for blog post
  static async uploadFeaturedImage(file: File, postId: string): Promise<string> {
    try {
      const fileName = `featured_${postId}_${Date.now()}_${file.name}`
      const imageRef = ref(storage, `${this.FEATURED_IMAGES_PATH}/${fileName}`)
      
      const snapshot = await uploadBytes(imageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return downloadURL
    } catch (error) {
      console.error('Error uploading featured image:', error)
      throw new Error('Failed to upload featured image')
    }
  }

  // Upload general file for processing (owner-only access)
  static async uploadFile(file: File, userId: string): Promise<string> {
    try {
      // Generate a unique file ID
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Use organized nested structure for owner files
      const storagePath = `files/${userId}/${fileId}/${file.name}`
      const fileRef = ref(storage, storagePath)
      
      console.log(`📤 Uploading file (owner-only): ${storagePath}`)
      
      const snapshot = await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      console.log(`✅ Owner file uploaded successfully: ${downloadURL}`)
      return downloadURL
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error('Failed to upload file')
    }
  }

  // Delete image from storage
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw new Error('Failed to delete image')
    }
  }

  // Validate image file
  static validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image file size must be less than 5MB'
      }
    }

    return { valid: true }
  }

  // Validate general file
  static validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024 // 50MB
    const allowedTypes = [
      'text/plain', 'text/csv', 'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/json',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please select a valid file type (TXT, CSV, PDF, Excel, Word, JSON)'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 50MB'
      }
    }

    return { valid: true }
  }
}
