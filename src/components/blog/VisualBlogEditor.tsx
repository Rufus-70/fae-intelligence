'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Edit, Palette, FileText, ExternalLink, RefreshCw } from 'lucide-react'
import MarkdownEditor from './MarkdownEditor'

interface VisualBlogEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  title?: string
}

export default function VisualBlogEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content in Markdown...",
  title = "Untitled Post"
}: VisualBlogEditorProps) {
  const [editorMode, setEditorMode] = useState<'markdown' | 'visual'>('markdown')
  const [visualEditorWindow, setVisualEditorWindow] = useState<Window | null>(null)
  const [isVisualEditorOpen, setIsVisualEditorOpen] = useState(false)
  const editorCheckInterval = useRef<NodeJS.Timeout>()

  const openVisualEditor = () => {
    // Construct the visual editor URL
    const baseUrl = window.location.origin
    const editorPort = '8086' // Visual editor runs on this port
    const editorUrl = `${baseUrl.replace(/:\d+/, '')}:${editorPort}/visual-editor.html`
    
    console.log('🚀 Opening visual editor at:', editorUrl)
    
    // Open the visual editor in a new window
    const editorWindow = window.open(
      editorUrl, 
      'visual-editor', 
      'width=1400,height=900,scrollbars=yes,resizable=yes,menubar=no,toolbar=no'
    )
    
    if (editorWindow) {
      setVisualEditorWindow(editorWindow)
      setIsVisualEditorOpen(true)
      
      // Wait for the editor to load and send the current content
      const checkEditorReady = setInterval(() => {
        try {
          if (editorWindow.document && editorWindow.document.readyState === 'complete') {
            clearInterval(checkEditorReady)
            
            // Send current content to the visual editor
            setTimeout(() => {
              editorWindow.postMessage({
                type: 'LOAD_CONTENT',
                content: value,
                title: title
              }, '*')
              console.log('📤 Content sent to visual editor')
            }, 1000) // Small delay to ensure editor is fully loaded
          }
        } catch (e) {
          // Cross-origin restrictions - editor not ready yet
          console.log('⏳ Waiting for visual editor to load...')
        }
      }, 500)
      
      // Clean up if editor fails to load after 10 seconds
      setTimeout(() => {
        clearInterval(checkEditorReady)
      }, 10000)
      
      // Listen for content updates from the visual editor
      const handleMessage = (event: MessageEvent) => {
        if (event.source === editorWindow && event.data.type === 'UPDATE_CONTENT') {
          console.log('📥 Received content update from visual editor')
          onChange(event.data.content)
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      // Monitor when the editor window is closed
      editorCheckInterval.current = setInterval(() => {
        if (editorWindow.closed) {
          console.log('🔄 Visual editor window closed')
          clearInterval(editorCheckInterval.current!)
          setVisualEditorWindow(null)
          setIsVisualEditorOpen(false)
          window.removeEventListener('message', handleMessage)
        }
      }, 1000)
      
    } else {
      alert('Please allow pop-ups to use the Visual Editor. You may need to disable your pop-up blocker for this site.')
    }
  }

  const sendContentToVisualEditor = () => {
    if (visualEditorWindow && !visualEditorWindow.closed) {
      visualEditorWindow.postMessage({
        type: 'LOAD_CONTENT',
        content: value,
        title: title
      }, '*')
      console.log('🔄 Content synchronized to visual editor')
    }
  }

  const focusVisualEditor = () => {
    if (visualEditorWindow && !visualEditorWindow.closed) {
      visualEditorWindow.focus()
    } else {
      openVisualEditor()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (editorCheckInterval.current) {
        clearInterval(editorCheckInterval.current)
      }
      if (visualEditorWindow && !visualEditorWindow.closed) {
        visualEditorWindow.close()
      }
    }
  }, [visualEditorWindow])

  return (
    <div className="space-y-4">
      {/* Editor Mode Toggle */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Editor
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <Button
                  variant={editorMode === 'markdown' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setEditorMode('markdown')}
                  className="rounded-none"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Markdown
                </Button>
                <Button
                  variant={editorMode === 'visual' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setEditorMode('visual')}
                  className="rounded-none"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Visual
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {editorMode === 'markdown' ? (
            <MarkdownEditor
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          ) : (
            <div className="space-y-4">
              {/* Visual Editor Interface */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Visual Block Editor
                </h3>
                <p className="text-gray-600 mb-6">
                  Use the advanced visual editor with drag-and-drop blocks, 
                  properties panel, and real-time preview capabilities.
                </p>
                
                <div className="flex justify-center gap-3">
                  {!isVisualEditorOpen ? (
                    <Button 
                      onClick={openVisualEditor}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Visual Editor
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={focusVisualEditor}
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Focus Editor
                      </Button>
                      <Button 
                        onClick={sendContentToVisualEditor}
                        variant="outline"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Content
                      </Button>
                    </>
                  )}
                </div>
                
                {isVisualEditorOpen && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      ✅ Visual Editor is open. Changes will automatically sync back to this form.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Markdown Preview/Fallback */}
              <div className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Markdown Source</span>
                  <span className="text-xs text-gray-500">
                    This will update automatically when you edit in the Visual Editor
                  </span>
                </div>
                <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-64 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Visual Editor Status */}
      {isVisualEditorOpen && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-900">
                Visual Editor Active
              </span>
              <span className="text-sm text-purple-700">
                - Changes will sync automatically
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}