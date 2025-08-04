import React, { useState, useRef } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface BlogEditorViewProps {
  onClose?: () => void;
}

export const BlogEditorView: React.FC<BlogEditorViewProps> = ({ onClose }) => {
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const editorIframeRef = useRef<HTMLIFrameElement>(null);

  const createNewPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'New Blog Post',
      content: '# New Blog Post\n\nStart writing your content here...',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentPost(newPost);
    setPosts(prev => [...prev, newPost]);
  };

  const savePost = () => {
    if (currentPost) {
      setPosts(prev => 
        prev.map(post => 
          post.id === currentPost.id 
            ? { ...currentPost, updatedAt: new Date().toISOString() }
            : post
        )
      );
      console.log('Post saved:', currentPost);
    }
  };

  const openVisualEditor = () => {
    // Open the visual editor in a new window/tab
    const editorUrl = window.location.origin.replace(':5173', ':8085') + '/visual-editor.html';
    const editorWindow = window.open(editorUrl, 'visual-editor', 'width=1400,height=900,scrollbars=yes,resizable=yes');
    
    if (editorWindow) {
      // Send current post content to editor when it loads
      const checkEditor = setInterval(() => {
        try {
          if (editorWindow.document && editorWindow.document.readyState === 'complete') {
            clearInterval(checkEditor);
            
            // Send current content to the editor
            if (currentPost) {
              editorWindow.postMessage({
                type: 'LOAD_CONTENT',
                content: currentPost.content,
                title: currentPost.title
              }, '*');
            }
          }
        } catch (e) {
          // Cross-origin access might be restricted
          console.log('Editor window not ready yet...');
        }
      }, 500);

      // Listen for content updates from the editor
      const handleMessage = (event: MessageEvent) => {
        if (event.source === editorWindow && event.data.type === 'UPDATE_CONTENT') {
          if (currentPost) {
            setCurrentPost(prev => prev ? {
              ...prev,
              content: event.data.content,
              updatedAt: new Date().toISOString()
            } : prev);
          }
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Clean up when editor window closes
      const checkClosed = setInterval(() => {
        if (editorWindow.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);
    } else {
      alert('Please allow pop-ups to use the visual editor');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">📝 Blog Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={createNewPost}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Post
          </button>
          {currentPost && (
            <>
              <button
                onClick={openVisualEditor}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                🎨 Visual Editor
              </button>
              <button
                onClick={savePost}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                💾 Save
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Posts List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">📚 Posts</h3>
          <div className="space-y-2">
            {posts.map(post => (
              <div
                key={post.id}
                onClick={() => setCurrentPost(post)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentPost?.id === post.id 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-medium text-sm truncate">{post.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {post.status} • {new Date(post.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-8">
                No posts yet.<br />
                Click "New Post" to get started!
              </div>
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3">
          {currentPost ? (
            <div className="space-y-4">
              {/* Post Title */}
              <input
                type="text"
                value={currentPost.title}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, title: e.target.value} : prev)}
                className="w-full text-xl font-bold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
                placeholder="Enter post title..."
              />

              {/* Status and Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <select
                  value={currentPost.status}
                  onChange={(e) => setCurrentPost(prev => prev ? {...prev, status: e.target.value as 'draft' | 'published'} : prev)}
                  className="border rounded px-2 py-1"
                >
                  <option value="draft">📝 Draft</option>
                  <option value="published">🌐 Published</option>
                </select>
                <span>Created: {new Date(currentPost.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(currentPost.updatedAt).toLocaleString()}</span>
              </div>

              {/* Content Editor */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">📄 Markdown Content</span>
                  <button
                    onClick={openVisualEditor}
                    className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                  >
                    🎨 Switch to Visual Editor
                  </button>
                </div>
                <textarea
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost(prev => prev ? {...prev, content: e.target.value} : prev)}
                  className="w-full h-96 p-4 font-mono text-sm border-none resize-none focus:outline-none"
                  placeholder="Write your blog post content in Markdown..."
                />
              </div>

              {/* Preview */}
              {currentPost.content && (
                <div className="border rounded-lg">
                  <div className="bg-gray-50 p-2 border-b">
                    <span className="text-sm font-medium">👁️ Preview</span>
                  </div>
                  <div className="p-4 prose max-w-none">
                    <div dangerouslySetInnerHTML={{
                      __html: currentPost.content
                        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n/g, '<br />')
                    }} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No post selected</h3>
                <p className="text-gray-500 mb-4">Select a post from the list or create a new one to get started.</p>
                <button
                  onClick={createNewPost}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};