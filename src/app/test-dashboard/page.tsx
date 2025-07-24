'use client'

import { useState, useEffect } from 'react'
import { businessIntelligence } from '@/lib/faes-web/businessIntelligence'

export default function TestDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    console.log('🧪 TEST: Starting to load business metrics...')
    try {
      const data = await businessIntelligence.getBusinessMetrics()
      console.log('🧪 TEST: Received data:', data)
      setMetrics(data)
      setLoading(false)
    } catch (err) {
      console.error('🧪 TEST: Error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🧪 Dashboard Test Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Business Intelligence Status</h2>
          
          {loading && (
            <div className="text-blue-600">
              ⏳ Loading business metrics...
            </div>
          )}
          
          {error && (
            <div className="text-red-600">
              ❌ Error: {error}
            </div>
          )}
          
          {metrics && (
            <div className="space-y-4">
              <div className="text-green-600">
                ✅ Successfully loaded business metrics!
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <div className="text-2xl font-bold text-blue-800">{metrics.totalFiles}</div>
                  <div className="text-sm text-blue-600">Total Files</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-2xl font-bold text-green-800">{metrics.totalAnalyses}</div>
                  <div className="text-sm text-green-600">Analyses</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded">
                  <div className="text-2xl font-bold text-purple-800">
                    {(metrics.averageFileSize / 1024).toFixed(1)}KB
                  </div>
                  <div className="text-sm text-purple-600">Avg Size</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded">
                  <div className="text-2xl font-bold text-orange-800">
                    {Object.keys(metrics.filesByCategory).length}
                  </div>
                  <div className="text-sm text-orange-600">Categories</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Categories:</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(metrics.filesByCategory, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Files:</h3>
                {metrics.recentActivity && metrics.recentActivity.length > 0 ? (
                  <div className="space-y-2">
                    {metrics.recentActivity.map((file: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="font-medium">{file.fileName}</div>
                        <div className="text-sm text-gray-600">
                          {file.businessCategory} | {file.documentType} | {file.smb_relevance} relevance
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No files found</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2">🔍 Testing Instructions:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Check browser console for detailed logs</li>
            <li>2. If you see data above, the business intelligence is working</li>
            <li>3. If metrics show your JSON file, the integration is successful</li>
            <li>4. If this works, the main dashboard should work too</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
