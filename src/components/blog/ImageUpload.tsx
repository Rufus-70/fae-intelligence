'use client'

import { useState, useRef } from 'react'
import { StorageService } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void
  onImageRemoved: () => void
  currentImage?: string
  postId: string
  type?: 'featured' | 'content'
}

export default function ImageUpload({
  onImageUploaded,
  onImageRemoved,
  currentImage,
  postId,
  type = 'content'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    const validation = StorageService.validateImageFile(file)
    
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    setUploading(true)
    
    try {
      let imageUrl: string
      
      if (type === 'featured') {
        imageUrl = await StorageService.uploadFeaturedImage(file, postId)
      } else {
        imageUrl = await StorageService.uploadBlogImage(file, postId)
      }
      
      onImageUploaded(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    }
  }

  const handleRemoveImage = async () => {
    if (currentImage) {
      try {
        await StorageService.deleteImage(currentImage)
        onImageRemoved()
      } catch (error) {
        console.error('Error removing image:', error)
        // Still remove from UI even if storage deletion fails
        onImageRemoved()
      }
    }
  }

  if (currentImage) {
    return (
      <div className="relative inline-block">
        <img
          src={currentImage}
          alt="Uploaded image"
          className="max-w-full h-auto rounded-lg shadow-md"
          style={{ maxHeight: type === 'featured' ? '200px' : '300px' }}
        />
        <button
          onClick={handleRemoveImage}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-colors
        ${dragOver ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300'}
        ${uploading ? 'opacity-50 pointer-events-none' : 'hover:border-gray-400'}
      `}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      
      <p className="text-gray-600 mb-4">
        {uploading ? 'Uploading...' : 'Drag and drop an image here, or click to select'}
      </p>
      
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="mr-2 h-4 w-4" />
        {uploading ? 'Uploading...' : 'Select Image'}
      </Button>
      
      <p className="text-xs text-gray-500 mt-2">
        Supports JPEG, PNG, GIF, WebP (max 5MB)
      </p>
    </div>
  )
}
