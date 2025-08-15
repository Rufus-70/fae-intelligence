// src/app/dashboard/editor/page.tsx - ARCHIVED: Use BlogCraft instead
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'

export default function DashboardEditor() {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Editor Archived
          </CardTitle>
          <p className="text-gray-600 mt-2">
            This editor has been replaced with BlogCraft - our new professional blog creation platform.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">✨ What's New in BlogCraft:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Professional templates and themes</li>
              <li>• Real-time preview functionality</li>
              <li>• Advanced SEO optimization tools</li>
              <li>• Media library management</li>
              <li>• Markdown sync with your existing content</li>
            </ul>
          </div>
          
          <div className="text-center space-y-4">
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              <Link href="/blogcraft">
                <FileText className="h-5 w-5 mr-2" />
                Open BlogCraft
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            
            <div className="text-sm text-gray-500">
              <p>Your existing blog posts and content are automatically available in BlogCraft.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
