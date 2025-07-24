// TEST: Simple integration test that simulates the faes-web pipeline using main Firebase

'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Database } from 'lucide-react'
import { storage, db } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Container } from '@/components/layout/Container'

export default function TestIntegrationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const simulateFaesWebPipeline = async (file: File) => {
    const log = (message: string, data?: any) => {
      console.log(message, data)
      setResults(prev => [...prev, { message, data, timestamp: new Date() }])
    }

    try {
      setUploading(true)
      log('🔄 Starting faes-web simulation pipeline...')

      // Step 1: Upload to main Firebase Storage (simulating faes-web)
      const fileId = Date.now().toString()
      const userId = 'test-user'
      const storagePath = `uploads/${userId}/${fileId}/${file.name}`
      const storageRef = ref(storage, storagePath)
      
      log('📤 Uploading file to Firebase Storage...', { path: storagePath })
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      log('✅ File uploaded successfully', { downloadURL })

      // Step 2: Create file record (simulating faes-web files collection)
      const fileDoc = {
        fileName: file.name,
        contentType: file.type,
        sizeBytes: file.size,
        downloadURL,
        storagePath: snapshot.ref.fullPath,
        uploadedAt: serverTimestamp(),
        userId,
        status: 'uploaded'
      }
      
      log('📝 Creating file record in Firestore...')
      const fileDocRef = doc(db, 'files', fileId)
      await setDoc(fileDocRef, fileDoc)
      log('✅ File record created', { fileId })

      // Step 3: Simulate AI analysis (what faes-web would do)
      log('🤖 Simulating AI analysis...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time
      
      const analysisData = {
        fileId,
        userId,
        generatedAt: serverTimestamp(),
        analysisType: 'document_analysis',
        status: 'completed',
        data: {
          summary: `Analysis of ${file.name}: This document contains business-relevant content for manufacturing operations.`,
          file_name_processed: file.name,
          content_type: file.type,
          size_bytes: file.size,
          document_type: 'business_document',
          business_category: 'operations',
          smb_relevance: 'high',
          full_text_annotation: `Sample extracted text from ${file.name}. This would contain OCR or text extraction results from the uploaded document. Key topics include: manufacturing processes, quality control, operational efficiency, and business improvements.`
        }
      }

      log('📊 Creating analysis record...')
      const analysisRef = await addDoc(collection(db, 'analyses'), analysisData)
      log('✅ Analysis created successfully', { analysisId: analysisRef.id })

      // Step 4: Integration service should now detect this and create knowledge chunks
      log('⏳ Waiting for integration service to process analysis...')
      log('🔍 Check console for integration service logs starting with "🧠 Processing analysis"')
      
      // Give the integration service time to process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      log('✅ Pipeline simulation complete! Check Firestore for knowledge chunks.')
      
    } catch (error) {
      log('❌ Error in pipeline simulation:', error)
      console.error('Pipeline error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResults([])
    }
  }

  const handleUpload = () => {
    if (file) {
      simulateFaesWebPipeline(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integration Test</h1>
          <p className="text-gray-600">
            Test the complete faes-web → knowledge chunking pipeline using main Firebase
          </p>
        </div>

        {/* Status */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              <strong>Testing Mode:</strong> Using main Firebase to simulate faes-web pipeline
            </span>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Select File</h2>
          
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
          />
          
          {file && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>{uploading ? 'Testing Pipeline...' : 'Test Integration Pipeline'}</span>
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pipeline Results</h2>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {result.message.includes('✅') && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {result.message.includes('❌') && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {!result.message.includes('✅') && !result.message.includes('❌') && 
                      <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{result.message}</p>
                    {result.data && (
                      <pre className="text-xs text-gray-600 mt-1 bg-white p-2 rounded border overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-medium text-yellow-900 mb-2">What to expect:</h3>
          <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
            <li>File uploads to main Firebase Storage</li>
            <li>File record created in 'files' collection</li>
            <li>AI analysis simulated and saved to 'analyses' collection</li>
            <li>Integration service detects completed analysis</li>
            <li>Knowledge chunks created in 'knowledge' collection</li>
            <li>Document record created in 'knowledge_base' collection</li>
          </ol>
          <p className="text-sm text-yellow-700 mt-2">
            Check browser console for integration service logs!
          </p>
        </div>
      </Container>
    </div>
  )
}
