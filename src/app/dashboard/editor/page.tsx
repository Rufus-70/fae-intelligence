'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function EditorPage() {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    console.log('✅ Visual editor loaded from /visual-editor.html');
    setIsEditorLoaded(true);
  };

  const handleSave = () => {
    if (iframeRef.current) {
      setIsSaving(true);
      iframeRef.current.contentWindow?.postMessage({ action: 'getContent' }, '*');
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/images/upload', formData);
      const { url } = response.data;

      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({ action: 'insertImage', payload: { url } }, '*');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error display to user
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      console.log('Parent received message:', event.data);
      const { data } = event;

      if (data.event === 'editorLoaded') {
        console.log('Editor loaded message received.');
        setIsEditorLoaded(true);
      } else if (data.event === 'contentReady') {
        console.log('Content ready message received. Saving post...');
        const { html } = data.payload;
        try {
          await axios.post('/api/posts/save', { title, content: html });
          console.log('Post saved successfully.');
        } catch (error) {
          console.error('Error saving post:', error);
        } finally {
          setIsSaving(false);
        }
      } else if (data.event === 'imageUploadRequested') {
        console.log('Image upload requested message received.');
        const { file } = data.payload;
        handleImageUpload(file);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [title]); // Add title to dependency array to ensure it's up-to-date

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Post Title"
              className="text-2xl font-bold text-gray-900 border-none focus:ring-0 p-0"
            />
            <p className="text-sm text-gray-600">Professional visual and markdown editing</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg ${isSaving ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Post'}
            </button>
            <button
              onClick={() => window.open('/visual-editor.html', '_blank')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            ref={iframeRef}
            src="/visual-editor.html"
            className="w-full h-full border-0"
            title="FAE Intelligence Visual Editor"
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-top-navigation"
          />
        </div>
      </div>
    </div>
  );
}
