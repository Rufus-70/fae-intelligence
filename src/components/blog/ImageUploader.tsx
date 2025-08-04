// components/blog/ImageUploader.tsx
'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, Eye, Copy, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  label?: string
  multiple?: boolean
  showPreview?: boolean
  acceptFormats?: string[]
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
  label = "Upload Image",
  multiple = false,
  showPreview = true,
  acceptFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type
    if (!acceptFormats.includes(file.type)) {
      alert(`Please select a valid image format: ${acceptFormats.map(f => f.split('/')[1]).join(', ')}`)
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    setUploading(true)
    
    try {
      // Convert to base64 for immediate preview
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        onChange(base64String)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const copyImageUrl = () => {
    if (value) {
      navigator.clipboard.writeText(value)
      alert('Image URL copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptFormats.join(',')}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {uploading ? 'Uploading...' : 'Drop your image here, or click to browse'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PNG, JPG, WebP or GIF (max 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {value && showPreview && (
        <div className="space-y-3">
          <div className="relative group">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(value, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={copyImageUrl}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {onRemove && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={onRemove}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Image URL */}
          <div className="flex items-center space-x-2 text-xs">
            <ImageIcon className="h-4 w-4 text-gray-400" />
            <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 truncate">
              {value.substring(0, 60)}...
            </code>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={copyImageUrl}
            >
              Copy URL
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
