// src/app/test-upload/page.tsx
'use client'

import { Container } from '@/components/layout/Container'
import FileUpload from '@/components/upload/FileUpload'
import config from '@/lib/config'

export default function TestUploadPage() {
  const handleUploadComplete = (files: any[]) => {
    console.log('Upload completed:', files)
    // Could trigger dashboard refresh here
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real File Upload Test</h1>
          <p className="text-gray-600">
            Upload files directly to your faes-web Firebase project for AI analysis
          </p>
          
          {/* Configuration Status */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border ${config.isDemoMode ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
              <h3 className="font-medium text-sm mb-1">Mode</h3>
              <p className={`text-xs ${config.isDemoMode ? 'text-yellow-800' : 'text-green-800'}`}>
                {config.isDemoMode ? '🎭 Demo Mode' : '🔥 Production Mode'}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-sm mb-1">Target Project</h3>
              <p className="text-xs text-blue-800 font-mono">
                {config.faesWeb.projectId}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${config.enableFaesWebIntegration ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="font-medium text-sm mb-1">Integration</h3>
              <p className={`text-xs ${config.enableFaesWebIntegration ? 'text-green-800' : 'text-red-800'}`}>
                {config.enableFaesWebIntegration ? '✅ Enabled' : '❌ Disabled'}
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-medium text-sm mb-1">Emulator Status</h3>
              <p className="text-xs text-orange-800">
                🔧 Check http://localhost:4000
              </p>
            </div>
          </div>
        </div>

        {/* Real Upload Component */}
        <FileUpload 
          onUploadComplete={handleUploadComplete}
          maxFiles={5}
          acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif']}
        />

        {/* Expected Collections Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Expected Firebase Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">files</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><code className="bg-gray-100 px-1 rounded">fileName</code> - Original filename</p>
                <p><code className="bg-gray-100 px-1 rounded">contentType</code> - MIME type</p>
                <p><code className="bg-gray-100 px-1 rounded">sizeBytes</code> - File size</p>
                <p><code className="bg-gray-100 px-1 rounded">downloadURL</code> - Storage URL</p>
                <p><code className="bg-gray-100 px-1 rounded">uploadedAt</code> - Timestamp</p>
                <p><code className="bg-gray-100 px-1 rounded">userId</code> - User identifier</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">analyses</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><code className="bg-gray-100 px-1 rounded">fileId</code> - Reference to file</p>
                <p><code className="bg-gray-100 px-1 rounded">analysisType</code> - Analysis method</p>
                <p><code className="bg-gray-100 px-1 rounded">data.document_type</code> - Document classification</p>
                <p><code className="bg-gray-100 px-1 rounded">data.business_category</code> - Business area</p>
                <p><code className="bg-gray-100 px-1 rounded">data.smb_relevance</code> - AI relevance score</p>
                <p><code className="bg-gray-100 px-1 rounded">generatedAt</code> - Analysis timestamp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-8 bg-cyan-50 border border-cyan-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-900 mb-4">
            🧪 Testing Instructions
          </h2>
          
          <div className="space-y-4 text-cyan-800">
            <div>
              <h3 className="font-medium mb-2">1. Upload Test Files</h3>
              <p className="text-sm">
                Try uploading files with descriptive names like "invoice_2024.pdf", "operations_manual.docx", 
                or "marketing_strategy.jpg" to test the intelligent classification system.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">2. Check Firebase Console</h3>
              <p className="text-sm">
                After upload, check your Firebase console to see the new documents in the 'files' and 'analyses' collections.
                The analysis will be generated automatically and should appear within a few seconds.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">3. Verify Dashboard Integration</h3>
              <p className="text-sm">
                Go to the <a href="/dashboard" className="underline hover:no-underline">Dashboard</a> to see 
                if your uploaded files appear in the business intelligence metrics. The system should detect 
                new data and update the charts accordingly.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">4. Test Different File Types</h3>
              <p className="text-sm">
                Upload various file types (PDFs, images, documents) to see how the system handles different 
                content types and applies appropriate analysis methods (visual vs text analysis).
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-4">
            🔧 Troubleshooting
          </h2>
          
          <div className="space-y-3 text-red-800 text-sm">
            <div>
              <strong>Upload fails with permission error:</strong>
              <p>Check Firebase Storage rules and ensure the service account has write permissions.</p>
            </div>
            
            <div>
              <strong>Files upload but don't appear in collections:</strong>
              <p>Verify Firestore rules allow writes to 'files' and 'analyses' collections.</p>
            </div>
            
            <div>
              <strong>Dashboard doesn't show new files:</strong>
              <p>The business intelligence service may be in demo mode. Check the configuration in the browser console.</p>
            </div>
            
            <div>
              <strong>Analysis fails to generate:</strong>
              <p>Check the browser console for errors. The analysis simulation should complete within 2-3 seconds.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
