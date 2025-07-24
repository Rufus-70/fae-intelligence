'use client'

import { useState, useEffect } from 'react'
import { businessIntelligence } from '@/lib/faes-web/businessIntelligence'

export default function TestDashboardDirectPage() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    console.log('🧪 DIRECT TEST: Loading business metrics...')
    try {
      const data = await businessIntelligence.getBusinessMetrics()
      console.log('🧪 DIRECT TEST: Success!', data)
      setMetrics(data)
    } catch (error) {
      console.error('🧪 DIRECT TEST: Error:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">🧪 Direct Dashboard Test</h1>
        <div className="text-blue-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">🧪 Direct Dashboard Test</h1>
      
      {metrics ? (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              ✅ SUCCESS! Business Intelligence Working
            </h2>
            <p className="text-green-700">
              Found {metrics.totalFiles} files with real business intelligence
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalFiles}</div>
              <div className="text-sm text-gray-600">Total Files</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-2xl font-bold text-green-600">{metrics.totalAnalyses}</div>
              <div className="text-sm text-gray-600">Analyses</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-2xl font-bold text-purple-600">
                {(metrics.averageFileSize / 1024).toFixed(1)}KB
              </div>
              <div className="text-sm text-gray-600">Avg Size</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-2xl font-bold text-orange-600">
                {Object.keys(metrics.filesByCategory).length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>

          {/* Business Categories */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Business Categories</h3>
            <div className="space-y-2">
              {Object.entries(metrics.filesByCategory).map(([category, count]: [string, any]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize">{category}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {count} files
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Recent Files</h3>
            {metrics.recentActivity && metrics.recentActivity.length > 0 ? (
              <div className="space-y-3">
                {metrics.recentActivity.map((file: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="font-medium">{file.fileName}</div>
                    <div className="text-sm text-gray-600">
                      Category: <span className="font-medium">{file.businessCategory}</span> | 
                      Type: <span className="font-medium">{file.documentType}</span> | 
                      Relevance: <span className={`font-medium ${
                        file.smb_relevance === 'high' ? 'text-green-600' :
                        file.smb_relevance === 'medium' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {file.smb_relevance}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {file.uploadedAt?.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No recent activity</div>
            )}
          </div>

          {/* Business Insights */}
          <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-900 mb-4">🚀 AI Business Insights</h3>
            {metrics.businessInsights && metrics.businessInsights.length > 0 ? (
              <div className="space-y-2">
                {metrics.businessInsights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-cyan-800">{insight}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cyan-700">No insights available yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h2 className="text-xl font-semibold text-red-800 mb-2">❌ No Data Available</h2>
          <p className="text-red-700">Check console for error details</p>
        </div>
      )}
    </div>
  )
}
