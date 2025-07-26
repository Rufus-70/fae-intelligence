'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react'
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function DebugIntegrationPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const log = (message: string, data?: any) => {
    console.log(message, data)
    setResults(prev => [...prev, { message, data, timestamp: new Date() }])
  }

  const manuallyCreateAnalysis = async () => {
    setTesting(true)
    setResults([])
    
    try {
      log('🔍 Checking for existing uploaded files...')
      
      // Get the latest uploaded file
      const filesQuery = query(
        collection(db, 'files'),
        where('status', '==', 'uploaded')
      )
      const filesSnapshot = await getDocs(filesQuery)
      
      if (filesSnapshot.empty) {
        log('❌ No uploaded files found. Upload a file first!')
        return
      }
      
      const latestFile = filesSnapshot.docs[0]
      const fileData = latestFile.data()
      log('✅ Found uploaded file:', fileData)
      
      // Manually create the analysis that faes-web should have created
      log('🤖 Manually creating analysis for integration test...')
      
      const analysisData = {
        fileId: latestFile.id,
        userId: fileData.userId,
        generatedAt: serverTimestamp(),
        analysisType: 'document_analysis',
        status: 'completed',
        data: {
          summary: `Manual test analysis of ${fileData.fileName}: This document contains business-relevant content for manufacturing operations.`,
          file_name_processed: fileData.fileName,
          content_type: fileData.contentType,
          size_bytes: fileData.sizeBytes,
          document_type: 'business_document',
          business_category: 'operations',
          smb_relevance: 'high',
          full_text_annotation: `Sample extracted text from ${fileData.fileName}. This would contain OCR or text extraction results from the uploaded document. Key topics include: manufacturing processes, quality control, operational efficiency, AI implementation strategies, and business improvements. The document discusses practical applications of artificial intelligence in small and medium-sized manufacturing businesses.`
        }
      }
      
      log('📊 Creating analysis document...')
      const analysisRef = await addDoc(collection(db, 'analyses'), analysisData)
      log('✅ Analysis created successfully!', { analysisId: analysisRef.id })
      
      log('⏳ Waiting for integration service to detect analysis...')
      log('🔍 Watch console for integration service logs...')
      
      // Wait for integration service to process
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      log('✅ Manual analysis creation complete!')
      log('📋 Check Firestore for new documents in knowledge and knowledge_base collections')
      
    } catch (error) {
      log('❌ Error creating manual analysis:', error)
      console.error('Manual analysis error:', error)
    } finally {
      setTesting(false)
    }
  }

  const checkKnowledgeChunks = async () => {
    try {
      log('🔍 Checking for knowledge chunks...')
      
      const knowledgeSnapshot = await getDocs(collection(db, 'knowledge'))
      const knowledgeBaseSnapshot = await getDocs(collection(db, 'knowledge_base'))
      
      log(`📊 Found ${knowledgeSnapshot.size} knowledge chunks`)
      log(`📋 Found ${knowledgeBaseSnapshot.size} knowledge base documents`)
      
      if (knowledgeSnapshot.size > 0) {
        const latestChunk = knowledgeSnapshot.docs[0].data()
        log('✅ Latest knowledge chunk:', latestChunk)
      }
      
    } catch (error) {
      log('❌ Error checking knowledge chunks:', error)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integration Debug</h1>
        <p className="text-gray-600">
          Debug the faes-web → knowledge chunking integration pipeline
        </p>
      </div>

      <div className="space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Files Uploaded</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Check files collection in Firestore</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Analyses Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Should be auto-created by faes-web</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Knowledge Chunks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Created by integration service</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Test Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={manuallyCreateAnalysis}
                disabled={testing}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>{testing ? 'Creating Analysis...' : 'Manually Create Analysis'}</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={checkKnowledgeChunks}
              >
                Check Knowledge Chunks
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p><strong>Steps to test:</strong></p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Upload a file first (if you haven&apos;t already)</li>
                <li>Click &quot;Manually Create Analysis&quot; to simulate faes-web backend</li>
                <li>Watch console for integration service logs</li>
                <li>Check Firestore for new knowledge chunks</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {result.message.includes('✅') && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {result.message.includes('❌') && <AlertCircle className="h-4 w-4 text-red-500" />}
                      {!result.message.includes('✅') && !result.message.includes('❌') && 
                        <Clock className="h-4 w-4 text-blue-500" />
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}