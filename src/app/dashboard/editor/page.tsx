'use client';

import { useState } from 'react';

export default function EditorPage() {
  const [editorMode, setEditorMode] = useState<'visual' | 'markdown'>('visual');
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  const handleIframeLoad = () => {
    console.log('✅ Visual editor loaded from /visual-editor.html');
    setIsEditorLoaded(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FAE Intelligence Content Editor</h1>
            <p className="text-sm text-gray-600">Professional visual and markdown editing</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => window.open('/visual-editor.html', '_blank')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🚀 Open Full Editor
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {!isEditorLoaded && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading Visual Editor from /visual-editor.html...</p>
            </div>
          </div>
        )}

        <div className={`h-full ${!isEditorLoaded ? 'hidden' : ''}`}>
          <iframe 
            src="/visual-editor.html"
            className="w-full h-full border-0"
            title="FAE Intelligence Visual Editor"
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          />
        </div>
      </div>
    </div>
  );
}
