// src/app/dashboard/files/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { Tag, Plus, Trash2, Hash, FileText, Folder, Eye, Download } from 'lucide-react'
import FileUpload from '@/components/files/FileUpload'

interface FileData {
  id: string
  fileName: string
  uploadedAt: any
  status: string
  analysisId?: string
  userId: string
  contentType?: string
  size?: number
  category?: string
  tags?: string[]
  description?: string
  priority?: string
}

interface AnalysisData {
  id: string
  data: any
  createdAt: any
  updatedAt: any
}

export default function FilesPage() {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [loadingAnalysis, setLoadingAnalysis] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    if (!user) return

    const filesQuery = query(
      collection(db, 'files'),
      orderBy('uploadedAt', 'desc')
    )

    const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
      const filesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FileData[]
      
      setFiles(filesData)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching files:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  const handleFileUploaded = () => {
    setShowUpload(false)
    // Files will automatically refresh due to the onSnapshot listener
  }

  const handleViewAnalysis = async (file: FileData) => {
    if (!file.analysisId) {
      alert('No analysis available for this file')
      return
    }

    setSelectedFile(file)
    setLoadingAnalysis(true)

    try {
      const analysisRef = doc(db, 'analyses', file.analysisId)
      const analysisSnap = await getDoc(analysisRef)
      
      if (analysisSnap.exists()) {
        setAnalysisData({
          id: analysisSnap.id,
          ...analysisSnap.data()
        } as AnalysisData)
      } else {
        alert('Analysis data not found')
      }
    } catch (error) {
      console.error('Error fetching analysis:', error)
      alert('Error loading analysis data')
    } finally {
      setLoadingAnalysis(false)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
      case 'complete':
        return 'bg-green-100 text-green-800'
      case 'processing':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'uploaded':
        return 'bg-blue-100 text-blue-800'
      case 'error':
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const exportAnalysis = () => {
    if (!selectedFile || !analysisData) return

    const dataStr = JSON.stringify(analysisData.data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `analysis_${selectedFile.fileName}_${new Date().toISOString().slice(0,10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Files</h1>
          <p className="text-gray-600">
            Manage and analyze your uploaded files
          </p>
        </div>
        <Button 
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>{showUpload ? 'Hide Upload' : 'Upload File'}</span>
        </Button>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <FileUpload onFileUploaded={handleFileUploaded} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Files
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Processed
            </CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.status?.toLowerCase() === 'processed').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Processing
            </CardTitle>
            <FileText className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.status?.toLowerCase() === 'processing').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              With Analysis
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.analysisId).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Files</CardTitle>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No files uploaded yet</p>
              <Button 
                onClick={() => setShowUpload(true)}
                className="mt-4"
                variant="outline"
              >
                Upload your first file
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">File Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tags</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Upload Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <span className="font-medium">{file.fileName}</span>
                            {file.description && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{file.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {file.category ? (
                          <Badge className="bg-blue-100 text-blue-800 border-0">
                            <Folder className="h-3 w-3 mr-1" />
                            {file.category}
                          </Badge>
                        ) : (
                          <span className="text-gray-400 text-sm">No category</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {file.tags && file.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {file.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800 border-0 text-xs">
                                <Hash className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {file.tags.length > 2 && (
                              <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                                +{file.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No tags</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(file.status || 'unknown')} border-0`}>
                          {file.status || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`border-0 ${
                          file.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          file.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          file.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {file.priority || 'medium'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatDate(file.uploadedAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {file.analysisId && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewAnalysis(file)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Analysis
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Modal */}
      {selectedFile && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Analysis: {selectedFile.fileName}</CardTitle>
              <div className="flex space-x-2">
                {analysisData && (
                  <Button size="sm" onClick={exportAnalysis}>
                    <Download className="h-4 w-4 mr-1" />
                    Export JSON
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => setSelectedFile(null)}>
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingAnalysis ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              </div>
            ) : analysisData ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Analysis Results</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(analysisData.data, null, 2)}
                  </pre>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Analysis created: {formatDate(analysisData.createdAt)}</p>
                  {analysisData.updatedAt && (
                    <p>Last updated: {formatDate(analysisData.updatedAt)}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No analysis data available</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
