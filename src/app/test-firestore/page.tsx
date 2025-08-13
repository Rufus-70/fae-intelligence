'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import config from '@/lib/config'

export default function TestFirestorePage() {
  const [results, setResults] = useState<any>({
    config: null,
    files: [],
    error: null,
    loading: true
  })

  useEffect(() => {
    testFirestore()
  }, [])

  const testFirestore = async () => {
    console.log('🔥 FIRESTORE TEST: Starting...')
    
    try {
      // First, check the configuration
      const configInfo = {
        isDemoMode: config.appConfig?.demoMode || false,
        enableFaesWebIntegration: config.appConfig.enableFaesWebIntegration,
        faesWebProjectId: 'N/A',
        mainFirebaseProject: db.app.options.projectId
      }
      
      console.log('📋 Config check:', configInfo)
      
      // Try to read files from the main Firebase (same as uploads)
      console.log('🔍 Attempting to read files from main Firebase...')
      const filesQuery = query(
        collection(db, 'files'),
        orderBy('uploadedAt', 'desc'),
        limit(10)
      )
      
      const filesSnapshot = await getDocs(filesQuery)
      console.log(`📁 Found ${filesSnapshot.docs.length} files in main Firebase`)
      
      const files = filesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('📄 Files data:', files)
      
      setResults({
        config: configInfo,
        files: files,
        error: null,
        loading: false
      })
      
    } catch (error) {
      console.error('❌ Firestore test error:', error)
      setResults({
        config: null,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🔥 Firestore Connection Test</h1>
        
        {results.loading && (
          <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-4">
            ⏳ Testing Firestore connection...
          </div>
        )}
        
        {results.error && (
          <div className="bg-red-50 p-4 rounded border border-red-200 mb-4">
            <h3 className="font-medium text-red-800 mb-2">❌ Connection Error</h3>
            <pre className="text-red-700 text-sm">{results.error}</pre>
          </div>
        )}
        
        {results.config && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">📋 Configuration Status</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Demo Mode:</strong> {results.config.isDemoMode ? '🎭 YES' : '🔥 NO'}
              </div>
              <div>
                <strong>Faes-Web Integration:</strong> {results.config.enableFaesWebIntegration ? '✅ YES' : '❌ NO'}
              </div>
              <div>
                <strong>Target Project:</strong> {results.config.faesWebProjectId}
              </div>
              <div>
                <strong>Actual Project:</strong> {results.config.mainFirebaseProject}
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">📁 Files in Firestore</h2>
          
          {results.files && results.files.length > 0 ? (
            <div>
              <div className="text-green-600 mb-4">
                ✅ Found {results.files.length} files in database
              </div>
              
              <div className="space-y-4">
                {results.files.map((file: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded p-4">
                    <div className="font-medium text-lg">{file.fileName}</div>
                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                      <div><strong>Content Type:</strong> {file.contentType}</div>
                      <div><strong>Size:</strong> {file.size} bytes</div>
                      <div><strong>User ID:</strong> {file.userId}</div>
                      <div><strong>Status:</strong> {file.status}</div>
                      <div><strong>Uploaded:</strong> {file.uploadedAt?.toDate?.()?.toLocaleString() || 'Unknown'}</div>
                    </div>
                    
                    <details className="mt-3">
                      <summary className="cursor-pointer text-blue-600 text-sm">Show Full Data</summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
                        {JSON.stringify(file, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-yellow-600">
              ⚠️ No files found in Firestore
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">🔍 Debugging Info</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div>• This test reads directly from the same Firebase as uploads</div>
            <div>• Check console for detailed logs</div>
            <div>• If files appear here, business intelligence should work</div>
            <div>• If no files, the upload process may not be working</div>
          </div>
        </div>
      </div>
    </div>
  )
}
