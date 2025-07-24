'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, PlayCircle } from 'lucide-react'
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function QuickTestPage() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<string>('')

  const createDirectAnalysisTest = async () => {
    setTesting(true)
    setResult('🔄 Creating direct analysis test...')
    
    try {
      // Create a test analysis directly without needing an uploaded file
      setResult('🤖 Creating test analysis to trigger integration...')
      const analysisData = {
        fileId: 'test_file_' + Date.now(),
        userId: 'test_user',
        generatedAt: serverTimestamp(),
        analysisType: 'document_analysis',
        status: 'completed',
        data: {
          summary: 'Test analysis for integration pipeline: Manufacturing operations and AI strategy document.',
          file_name_processed: 'test_manufacturing_ai_doc.pdf',
          content_type: 'application/pdf',
          size_bytes: 15000,
          document_type: 'business_document',
          business_category: 'operations',
          smb_relevance: 'high',
          full_text_annotation: 'Test document content discussing manufacturing efficiency, AI implementation strategies, predictive maintenance systems, quality control processes, and operational optimization for small and medium manufacturing businesses. This document covers best practices for implementing AI tools in manufacturing environments.'
        }
      }
      
      const analysisRef = await addDoc(collection(db, 'analyses'), analysisData)
      setResult('✅ Test analysis created! Integration service should now process it into knowledge chunks.')
      
      // Wait and check for knowledge chunks
      setTimeout(async () => {
        const knowledgeSnapshot = await getDocs(collection(db, 'knowledge'))
        const knowledgeBaseSnapshot = await getDocs(collection(db, 'knowledge_base'))
        setResult(prev => prev + `\n\n📊 Current status:\n- Knowledge chunks: ${knowledgeSnapshot.size}\n- Knowledge base docs: ${knowledgeBaseSnapshot.size}\n\nCheck browser console for integration logs!`)
      }, 3000)
      
    } catch (error) {
      setResult(`❌ Error: ${error}`)
      console.error('Direct test error:', error)
    } finally {
      setTesting(false)
    }
  }

  const createAnalysisForLatestFile = async () => {
    setTesting(true)
    setResult('🔄 Starting test...')
    
    try {
      // Get files with uploaded status (no ordering to avoid index requirement)
      setResult('📁 Looking for uploaded files...')
      const filesQuery = query(
        collection(db, 'files'),
        where('status', '==', 'uploaded'),
        limit(5)
      )
      const filesSnapshot = await getDocs(filesQuery)
      
      if (filesSnapshot.empty) {
        setResult('❌ No uploaded files found. Upload a file first!')
        return
      }
      
      // Get the first available file
      const availableFile = filesSnapshot.docs[0]
      const fileData = availableFile.data()
      setResult(`✅ Found file: ${fileData.fileName} (${filesSnapshot.docs.length} total files)`)
      
      // Create analysis to trigger integration
      setResult('🤖 Creating analysis to trigger integration...')
      const analysisData = {
        fileId: availableFile.id,
        userId: fileData.userId,
        generatedAt: serverTimestamp(),
        analysisType: 'document_analysis',
        status: 'completed',
        data: {
          summary: `Test analysis of ${fileData.fileName}: Business document with manufacturing and AI content.`,
          file_name_processed: fileData.fileName,
          content_type: fileData.contentType,
          size_bytes: fileData.sizeBytes || 0,
          document_type: 'business_document',
          business_category: 'operations',
          smb_relevance: 'high',
          full_text_annotation: `Sample text content for ${fileData.fileName}. This document discusses manufacturing processes, quality control, operational efficiency, AI implementation strategies, predictive maintenance, and business process improvements for small and medium manufacturing businesses.`
        }
      }
      
      const analysisRef = await addDoc(collection(db, 'analyses'), analysisData)
      setResult('✅ Analysis created! Integration service should now process it into knowledge chunks.')
      
      // Wait and check for knowledge chunks
      setTimeout(async () => {
        const knowledgeSnapshot = await getDocs(collection(db, 'knowledge'))
        const knowledgeBaseSnapshot = await getDocs(collection(db, 'knowledge_base'))
        setResult(prev => prev + `\n\n📊 Current status:\n- Knowledge chunks: ${knowledgeSnapshot.size}\n- Knowledge base docs: ${knowledgeBaseSnapshot.size}\n\nCheck browser console for integration logs!`)
      }, 3000)
      
    } catch (error) {
      setResult(`❌ Error: ${error}`)
      console.error('Test error:', error)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlayCircle className="h-5 w-5" />
            <span>Quick Integration Test</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>What this does:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Finds your latest uploaded file</li>
              <li>Creates an analysis record (simulating faes-web backend)</li>
              <li>Integration service detects it and creates knowledge chunks</li>
              <li>Shows results in console and Firestore</li>
            </ol>
          </div>
          
          <Button 
            onClick={createAnalysisForLatestFile}
            disabled={testing}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>{testing ? 'Testing Integration...' : 'Test Integration Now'}</span>
          </Button>
          
          {result && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">{result}</pre>
            </div>
          )}
          
          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
            <p><strong>Note:</strong> Make sure you've uploaded a file first, then run this test to see the complete integration pipeline in action.</p>
          </div>
          
          <Button 
            onClick={createDirectAnalysisTest}
            disabled={testing}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Direct Analysis Test (No File Required)</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}