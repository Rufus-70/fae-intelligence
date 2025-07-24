'use client'
// src/components/upload/FileUpload.tsx
// Real file upload component that connects to faes-web Firebase

import { useState, useCallback } from 'react'
import { Upload, FileText, Image, AlertCircle, CheckCircle, Clock, Database } from 'lucide-react'
import { storage, db } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import config from '@/lib/config'

interface UploadedFile {
  id: string
  file: File
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  downloadURL?: string
  firestoreId?: string
  error?: string
}

interface FileUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export default function FileUpload({ 
  onUploadComplete, 
  maxFiles = 10,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif']
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🔍 File input triggered')
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      console.log('📁 Files selected:', selectedFiles.map(f => f.name))
      handleFiles(selectedFiles)
    } else {
      console.log('⚠️ No files selected')
    }
  }, [])

  const handleFiles = async (fileList: File[]) => {
    if (isUploading) return
    
    console.log('🔧 Upload Debug Info:')
    console.log('- Demo mode:', config.isDemoMode)
    console.log('- Faes-web integration:', config.enableFaesWebIntegration)
    console.log('- Firebase config:', config.faesWeb)
    
    // Check file limits
    if (files.length + fileList.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])
    setIsUploading(true)

    // Process files one by one
    for (const uploadFile of newFiles) {
      await processFile(uploadFile)
    }

    setIsUploading(false)
    
    if (onUploadComplete) {
      onUploadComplete(files.filter(f => f.status === 'completed'))
    }
  }

  const processFile = async (uploadFile: UploadedFile) => {
    console.log('📁 Processing file:', uploadFile.file.name)
    
    try {
      // Step 1: Upload to Firebase Storage (use faes-web expected path format)
      const userId = 'anonymous' // TODO: Replace with actual user ID when auth is implemented
      const fileId = Date.now().toString()
      const storagePath = `uploads/${userId}/${fileId}/${uploadFile.file.name}`
      const storageRef = ref(storage, storagePath)
      
      console.log(`📋 Uploading to path: ${storagePath}`)
      console.log('🔧 Storage reference created, attempting upload...')
      
      // Update progress during upload
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, progress: 25 } : f
      ))

      const snapshot = await uploadBytes(storageRef, uploadFile.file)
      
      console.log('✅ File uploaded to storage successfully')
      console.log('Storage snapshot:', { name: snapshot.ref.name, fullPath: snapshot.ref.fullPath })
      
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, progress: 50 } : f
      ))

      // Step 2: Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, progress: 75, downloadURL } : f
      ))

      // Step 3: Save file metadata to Firestore (using fileId as document ID)
      const fileDoc = {
        fileName: uploadFile.file.name,
        contentType: uploadFile.file.type,
        sizeBytes: uploadFile.file.size,
        downloadURL,
        storagePath: snapshot.ref.fullPath,
        uploadedAt: serverTimestamp(),
        userId: userId,
        status: 'uploaded'
      }
      
      console.log(`📋 Creating Firestore document with ID: ${fileId}`)
      console.log('Document data:', fileDoc)
      
      // Use setDoc with specific document ID instead of addDoc
      const docRef = doc(db, 'files', fileId)
      await setDoc(docRef, fileDoc)
      
      console.log('✅ Firestore document created successfully')
      
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { 
          ...f, 
          progress: 100, 
          status: 'processing',
          firestoreId: fileId 
        } : f
      ))

      // Step 4: Analysis will be triggered automatically by Firestore trigger
      console.log(`File uploaded successfully. Analysis will be triggered automatically for fileId: ${fileId}`)
      
      // Wait a moment for the trigger to process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, status: 'completed' } : f
      ))
      
    } catch (error) {
      console.error('Upload failed:', error)
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { 
          ...f, 
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        } : f
      ))
    }
  }

  // Analysis is now handled automatically by faes-web Firebase Functions
  // No need for manual simulation - the backend triggers will process files

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-8 w-8 text-blue-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const clearFiles = () => {
    setFiles([])
  }

  return (
    <div className="w-full">
      {/* Connection Status */}
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              <strong>TESTING MODE:</strong> Using main Firebase (permissions working)
            </span>
          </div>
        </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-cyan-500 bg-cyan-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isUploading ? 'Uploading...' : 'Drop files here or click to upload'}
        </h3>
        <p className="text-gray-600 mb-4">
          Upload to main Firebase for testing ({maxFiles} files max)
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          disabled={isUploading}
          className="hidden"
          id="real-file-upload"
          ref={(input) => {
            if (input) {
              console.log('🔧 File input element ready')
            }
          }}
        />
        <label htmlFor="real-file-upload">
          <button 
            type="button"
            disabled={isUploading}
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault()
              console.log('💆 Choose Files button clicked')
              const input = document.getElementById('real-file-upload') as HTMLInputElement
              if (input) {
                console.log('🔍 Triggering file input click')
                input.click()
              } else {
                console.error('❌ File input not found')
              }
            }}
          >
            {isUploading ? 'Uploading...' : 'Choose Files'}
          </button>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Files ({files.length})
            </h3>
            <button
              onClick={clearFiles}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {files.map((uploadFile) => (
              <div key={uploadFile.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(uploadFile.file)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {uploadFile.file.name}
                      </h4>
                      {getStatusIcon(uploadFile.status)}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Size: {(uploadFile.file.size / 1024).toFixed(1)} KB</p>
                      <p>Type: {uploadFile.file.type}</p>
                      <p className="capitalize">
                        Status: {uploadFile.status.replace('_', ' ')}
                      </p>
                      {uploadFile.firestoreId && (
                        <p className="text-xs font-mono">
                          ID: {uploadFile.firestoreId}
                        </p>
                      )}
                    </div>
                    
                    {uploadFile.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2 w-full">
                          <div 
                            className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Uploading {uploadFile.progress}%
                        </p>
                      </div>
                    )}

                    {uploadFile.status === 'processing' && (
                      <div className="mt-2">
                        <p className="text-sm text-yellow-600">
                          🤖 Analyzing with AI...
                        </p>
                      </div>
                    )}

                    {uploadFile.status === 'completed' && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">
                          ✅ Upload complete! File saved to Firebase.
                        </p>
                      </div>
                    )}

                    {uploadFile.status === 'error' && (
                      <div className="mt-2">
                        <p className="text-sm text-red-600">
                          ❌ Error: {uploadFile.error}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          🔥 Testing Mode - Main Firebase
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Files uploaded to main Firebase Storage (working permissions)</li>
          <li>• File metadata saved to main 'files' collection</li>
          <li>• Manual analysis creation needed to test integration</li>
          <li>• Integration service will detect analyses and create knowledge chunks</li>
        </ul>
      </div>
    </div>
  )
}
