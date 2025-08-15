'use client';

import { useEffect, useState } from 'react';

export default function BlogCraftPage() {
  const [showPreview, setShowPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [existingPosts, setExistingPosts] = useState<any[]>([])
  const [showPostSelector, setShowPostSelector] = useState(false)
  const [showNotionSetup, setShowNotionSetup] = useState(false);
  const [notionApiKey, setNotionApiKey] = useState('');
  const [notionDatabaseId, setNotionDatabaseId] = useState('');
  const [notionSetupComplete, setNotionSetupComplete] = useState(false);
  const [notionPosts, setNotionPosts] = useState([]);
  const [loadingNotion, setLoadingNotion] = useState(false);

  // Initialize word count when editor loads
  useEffect(() => {
    const initializeWordCount = () => {
      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
      const wordCountElement = document.getElementById('wordCount');
      if (contentInput && wordCountElement) {
        const wordCount = contentInput.value.split(/\s+/).filter(word => word.length > 0).length;
        wordCountElement.textContent = `${wordCount} words`;
      }
    };

    // Load Notion credentials from localStorage
    const loadNotionCredentials = () => {
      try {
        const savedApiKey = localStorage.getItem('notionApiKey');
        const savedDatabaseId = localStorage.getItem('notionDatabaseId');
        const savedSetupComplete = localStorage.getItem('notionSetupComplete');
        
        console.log('🔍 Loading from localStorage:', { 
          savedApiKey: savedApiKey ? savedApiKey.substring(0, 10) + '...' : 'none',
          savedDatabaseId,
          savedSetupComplete 
        });
        
        if (savedApiKey) setNotionApiKey(savedApiKey);
        if (savedDatabaseId) setNotionDatabaseId(savedDatabaseId);
        if (savedSetupComplete === 'true') setNotionSetupComplete(true);
        
        console.log('✅ Loaded Notion credentials from localStorage');
      } catch (error) {
        console.error('❌ Error loading Notion credentials:', error);
      }
    };

    loadNotionCredentials();
    initializeWordCount();
  }, []);

  // Save Notion credentials to localStorage when they change
  useEffect(() => {
    if (notionApiKey || notionDatabaseId) {
      try {
        localStorage.setItem('notionApiKey', notionApiKey);
        localStorage.setItem('notionDatabaseId', notionDatabaseId);
        localStorage.setItem('notionSetupComplete', notionSetupComplete.toString());
        console.log('💾 Saved Notion credentials to localStorage');
      } catch (error) {
        console.error('❌ Error saving Notion credentials:', error);
      }
    }
  }, [notionApiKey, notionDatabaseId, notionSetupComplete]);

  // Add escape key handler for modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showNotionSetup) {
        setShowNotionSetup(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showNotionSetup]);

  // Test Notion connection
  const testNotionConnection = async () => {
    if (!notionApiKey || !notionDatabaseId) {
      alert('Please enter both API Key and Database ID first');
      return;
    }

    setLoadingNotion(true);
    try {
      const response = await fetch(`/api/notion?apiKey=${encodeURIComponent(notionApiKey)}&databaseId=${encodeURIComponent(notionDatabaseId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotionPosts(data.posts || []);
        setNotionSetupComplete(true);
        alert('✅ Notion connection successful! Found ' + (data.posts?.length || 0) + ' posts.');
      } else {
        const errorData = await response.json();
        console.error('❌ Notion connection test failed:', errorData);
        alert(`❌ Notion connection failed: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Error testing Notion connection:', error);
      alert('❌ Failed to test Notion connection. Check console for details.');
    } finally {
      setLoadingNotion(false);
    }
  };

  // Simple test function to check Notion API
  const testNotionAPI = async () => {
    if (!notionApiKey || !notionDatabaseId) {
      alert('Please configure Notion integration first');
      return;
    }

    setLoadingNotion(true);
    try {
      console.log('🧪 Testing Notion API with:', { 
        apiKey: notionApiKey.substring(0, 10) + '...', 
        databaseId: notionDatabaseId,
        databaseIdLength: notionDatabaseId.length,
        databaseIdFirstChars: notionDatabaseId.substring(0, 8)
      });
      
      const response = await fetch(`/api/notion?apiKey=${encodeURIComponent(notionApiKey)}&databaseId=${encodeURIComponent(notionDatabaseId)}`);
      
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API test successful:', data);
        alert(`✅ Notion API test successful! Found ${data.posts?.length || 0} posts.`);
      } else {
        const errorText = await response.text();
        console.error('❌ API test failed:', errorText);
        alert('❌ Notion API test failed: ' + errorText);
      }
    } catch (error) {
      console.error('❌ API test error:', error);
      alert('❌ Notion API test error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingNotion(false);
    }
  };

  // Clear Notion credentials
  const clearNotionCredentials = () => {
    setNotionApiKey('');
    setNotionDatabaseId('');
    setNotionSetupComplete(false);
    setNotionPosts([]);
    localStorage.removeItem('notionApiKey');
    localStorage.removeItem('notionDatabaseId');
    localStorage.removeItem('notionSetupComplete');
    alert('🗑️ Notion credentials cleared');
  };

  // Sync Notion posts to local blog system
  const syncNotionPosts = async () => {
    if (!notionApiKey || !notionDatabaseId) {
      alert('Please configure Notion integration first');
      return;
    }

    setLoadingNotion(true);
    try {
      const response = await fetch('/api/notion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: notionApiKey,
          databaseId: notionDatabaseId
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`✅ ${data.message}\n\nSynced posts:\n${data.results.map((r: any) => 
          `${r.status === 'success' ? '✅' : '❌'} ${r.title}`
        ).join('\n')}`);
        
        // Refresh the existing posts list
        const postsResponse = await fetch('/api/blog-content');
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setExistingPosts(postsData.posts || []);
        }
      } else {
        const error = await response.text();
        alert('❌ Sync failed: ' + error);
      }
    } catch (error) {
      console.error('Sync error:', error);
      alert('❌ Sync failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingNotion(false);
    }
  };

  // Listen for custom preview event from toolbar
  useEffect(() => {
    const handlePreviewEvent = () => {
      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
      const titleInput = document.getElementById('postTitle') as HTMLInputElement;
      if (contentInput && titleInput) {
        setPreviewContent(contentInput.value);
        setPreviewTitle(titleInput.value || 'Preview');
        setShowPreview(true);
      }
    };

    const handleNotionSetupEvent = () => {
      setShowNotionSetup(true);
    };

    const handleSyncEvent = () => {
      // Call sync function with current state values
      if (notionApiKey && notionDatabaseId) {
        syncNotionPosts();
      } else {
        alert('Please configure Notion integration first');
      }
    };

    window.addEventListener('showPreview', handlePreviewEvent);
    window.addEventListener('showNotionSetup', handleNotionSetupEvent);
    window.addEventListener('syncNotionPosts', handleSyncEvent);
    
    return () => {
      window.removeEventListener('showPreview', handlePreviewEvent);
      window.removeEventListener('showNotionSetup', handleNotionSetupEvent);
      window.removeEventListener('syncNotionPosts', handleSyncEvent);
    };
  }, []);

  useEffect(() => {
    console.log('🚀 BlogCraft page mounting, loading resources...');
    
    // Make word count initialization available globally
    (window as any).initializeBlogCraftWordCount = () => {
      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
      const wordCountElement = document.getElementById('wordCount');
      if (contentInput && wordCountElement) {
        const wordCount = contentInput.value.split(/\s+/).filter(word => word.length > 0).length;
        wordCountElement.textContent = `${wordCount} words`;
      }
    };
    
    // Load existing posts for editing
    const loadExistingPosts = async () => {
      try {
        const response = await fetch('/api/blog-content');
        const data = await response.json();
        setExistingPosts(data.posts || []);
      } catch (error) {
        console.error('Error loading existing posts:', error);
      }
    };
    
    loadExistingPosts();
    
    // Check if scripts are already loaded to prevent duplicates
    const isScriptLoaded = (src: string) => {
      return document.querySelector(`script[src="${src}"]`) !== null;
    };
    
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        // Don't load if already present
        if (isScriptLoaded(src)) {
          console.log(`📦 Script already loaded: ${src}`);
          resolve(src);
          return;
        }
        
        console.log(`📦 Loading script: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log(`✅ Script loaded: ${src}`);
          resolve(src);
        };
        script.onerror = (error) => {
          console.error(`❌ Script failed to load: ${src}`, error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    };

    const loadStyle = (href: string) => {
      // Don't load if already present
      if (document.querySelector(`link[href="${href}"]`)) {
        console.log(`🎨 Stylesheet already loaded: ${href}`);
        return;
      }
      
      console.log(`🎨 Loading stylesheet: ${href}`);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => console.log(`✅ Stylesheet loaded: ${href}`);
      link.onerror = (error) => console.error(`❌ Stylesheet failed to load: ${href}`, error);
      document.head.appendChild(link);
    };

    // Load BlogCraft resources
    loadStyle('/blogcraft/style.css');
    
    loadScript('/blogcraft/app.js')
      .then(() => {
        console.log('📋 BlogCraft app.js loaded, now loading integration...');
        // Load the Fae Intelligence integration after BlogCraft loads
        return loadScript('/blogcraft/fae-integration.js');
      })
      .then(() => {
        console.log('🔗 Integration script loaded successfully');
        console.log('🎉 BlogCraft is ready! Check the dashboard for your blog posts.');
        
        // Force BlogCraft to initialize after a short delay
        setTimeout(() => {
          console.log('🔧 Forcing BlogCraft initialization...');
          if ((window as any).initializeBlogCraft) {
            console.log('✅ Calling window.initializeBlogCraft()...');
            (window as any).initializeBlogCraft();
          } else {
            console.log('⚠️ BlogCraft initialization function not found, trying manual init...');
            // Try to manually trigger the initialization
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
          }
        }, 1000);
        
        // Also try to initialize after a longer delay as backup
        setTimeout(() => {
          console.log('🔄 Backup initialization attempt...');
          if ((window as any).initializeBlogCraft) {
            (window as any).initializeBlogCraft();
          }
        }, 2000);
      })
      .catch((error) => {
        console.error('💥 Error loading BlogCraft resources:', error);
        console.log('⚠️ BlogCraft may not function properly. Check browser console for details.');
      });
    
    // Cleanup function
    return () => {
      // Remove event listeners if needed
      console.log('🧹 Cleaning up BlogCraft resources...');
    };
  }, []);

  // Test Notion API key only (without database)
  const testNotionAPIKey = async () => {
    if (!notionApiKey) {
      alert('Please enter your Notion API key first');
      return;
    }

    setLoadingNotion(true);
    try {
      console.log('🧪 Testing Notion API key only...');
      
      const response = await fetch('/api/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: notionApiKey })
      });
      
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API key test successful:', data);
        alert(`✅ Notion API key is valid!\n\nUser: ${data.user.name}\nType: ${data.user.type}`);
      } else {
        const errorText = await response.text();
        console.error('❌ API key test failed:', errorText);
        alert('❌ Notion API key test failed: ' + errorText);
      }
    } catch (error) {
      console.error('❌ API key test error:', error);
      alert('❌ Notion API key test error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingNotion(false);
    }
  };

  // Render markdown to HTML with Notion-style formatting
  const renderMarkdownToHTML = (markdown: string) => {
    if (!markdown) return '';
    
    return markdown
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-800">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-800">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Images with Notion-style formatting
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-6"><img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md border border-gray-200" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\';" /><div class="hidden text-center text-sm text-gray-500 mt-2">🖼️ Image: $1</div></div>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="text-gray-700 mb-2 flex items-start"><span class="mr-2 mt-1">•</span>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="text-gray-700 mb-2 flex items-start"><span class="mr-2 mt-1 text-gray-500">$1.</span>$2</li>')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">$1</blockquote>')
      
      // Horizontal rules
      .replace(/^---$/gim, '<hr class="my-6 border-gray-300">')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
      .replace(/<p class="text-gray-700 leading-relaxed mb-4"><\/p>/g, '')
      
      // Clean up empty paragraphs
      .replace(/<p class="text-gray-700 leading-relaxed mb-4"><\/p>/g, '')
      .replace(/<p class="text-gray-700 leading-relaxed mb-4">\s*<\/p>/g, '');
  };

  return (
    <div id="blogcraft-container">
      {/* Header Navigation - Fixed to stay visible */}
      <header className="header" id="blogcraftHeader">
        <div className="header-content">
          <div className="logo" style={{ maxWidth: '200px', maxHeight: '3rem', overflow: 'hidden' }}>
            <h1 style={{ fontSize: '1.2rem', margin: 0, lineHeight: '1.2', maxHeight: '1.5rem', overflow: 'hidden', fontWeight: 'bold' }}>
              Fae Intelligence BlogCraft
            </h1>
            <span className="logo-tagline" style={{ fontSize: '0.8rem', display: 'block', marginTop: '0.2rem', lineHeight: '1', maxHeight: '1rem', overflow: 'hidden', color: '#6b7280' }}>
              Professional Blog Creation
            </span>
          </div>
          <nav className="nav-main" id="blogcraftNav">
            <button className="nav-item active" data-view="dashboard" id="nav-dashboard">
              <span className="nav-icon">📊</span>
              Dashboard
            </button>
            <button className="nav-item" data-view="editor" id="nav-editor">
              <span className="nav-icon">✏️</span>
              Editor
            </button>
            <button className="nav-item" data-view="media" id="nav-media">
              <span className="nav-icon">🖼️</span>
              Media
            </button>
            <button className="nav-item" data-view="templates" id="nav-templates">
              <span className="nav-icon">📄</span>
              Templates
            </button>
            <button className="nav-item" data-view="themes" id="nav-themes">
              <span className="nav-icon">🎨</span>
              Themes
            </button>
            <button className="nav-item" data-view="seo" id="nav-seo">
              <span className="nav-icon">🔍</span>
              SEO
            </button>
            <button className="nav-item" data-view="settings" id="nav-settings">
              <span className="nav-icon">⚙️</span>
              Settings
            </button>
          </nav>
          <div className="header-actions" id="blogcraftActions">
            <button className="btn btn--primary" id="quickStartBtn">Quick Start</button>
            <button 
              className="btn btn--outline" 
              id="previewBtn"
              onClick={() => {
                console.log('🔍 Preview button clicked!');
                // Get content from the editor if available
                const editorContent = (document.getElementById('postContent') as HTMLTextAreaElement)?.value || '';
                const titleInput = (document.getElementById('postTitle') as HTMLInputElement)?.value || 'Untitled Post';
                
                if (editorContent.trim()) {
                  setPreviewTitle(titleInput);
                  setPreviewContent(editorContent);
                  setShowPreview(true);
                } else {
                  alert('Please add some content to preview first.');
                }
              }}
            >
              Preview
            </button>
            <button 
              className="btn btn--outline" 
              onClick={() => {
                console.log('🧪 Test button clicked from React!');
                if ((window as any).initializeBlogCraft) {
                  console.log('✅ Calling initializeBlogCraft...');
                  (window as any).initializeBlogCraft();
                } else {
                  console.log('❌ initializeBlogCraft not found');
                }
                
                // Check BlogCraft status
                if ((window as any).getBlogCraftStatus) {
                  const status = (window as any).getBlogCraftStatus();
                  console.log('📊 BlogCraft Status:', status);
                }
              }}
            >
              🧪 Test Init
            </button>
            <button 
              className="btn btn--outline" 
              onClick={() => {
                console.log('🔍 Debug: Checking DOM elements...');
                const buttons = document.querySelectorAll('button');
                console.log(`Found ${buttons.length} buttons on page`);
                
                // Check for specific BlogCraft elements
                const navItems = document.querySelectorAll('.nav-item');
                const views = document.querySelectorAll('.view');
                console.log(`Nav items: ${navItems.length}, Views: ${views.length}`);
                
                // Check if BlogCraft is running
                if ((window as any).blogCraftInitialized) {
                  console.log('✅ BlogCraft is initialized');
                } else {
                  console.log('❌ BlogCraft is NOT initialized');
                }
              }}
            >
              🔍 Debug DOM
            </button>
            <button 
              className="btn btn--outline" 
              onClick={() => {
                console.log('🔒 Forcing header visibility...');
                if ((window as any).ensureHeaderVisible) {
                  (window as any).ensureHeaderVisible();
                } else {
                  console.log('❌ ensureHeaderVisible function not found');
                }
              }}
            >
              🔒 Fix Header
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard View */}
        <div id="dashboard" className="view active">
          <div className="dashboard-header">
            <h2>📊 BlogCraft Dashboard</h2>
            <p>Manage your blog content, track performance, and create amazing posts</p>
            <div className="dashboard-nav-links">
              <a href="/" className="nav-link-main">🏠 Main Site</a>
              <a href="/blog" className="nav-link-main">📝 Blog</a>
              <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
              <a href="/resources" className="nav-link-main">📚 Resources</a>
            </div>
            
            {/* Direct Notion Test Button */}
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: notionSetupComplete ? '#f0fdf4' : '#eff6ff', border: `2px solid ${notionSetupComplete ? '#22c55e' : '#3b82f6'}`, borderRadius: '8px' }}>
              <h3 style={{ color: notionSetupComplete ? '#166534' : '#1e40af', marginBottom: '0.5rem' }}>
                {notionSetupComplete ? '✅ Notion Integration Active' : '🚀 Try Notion Integration'}
              </h3>
              <p style={{ color: notionSetupComplete ? '#166534' : '#1e40af', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {notionSetupComplete 
                  ? `Connected to Notion database with ${notionPosts.length} posts. Your credentials are saved!`
                  : 'Create beautiful blogs in Notion\'s intuitive interface - no markdown syntax needed!'
                }
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    console.log('🎯 Direct Notion button clicked!');
                    setShowNotionSetup(true);
                  }}
                  style={{
                    backgroundColor: notionSetupComplete ? '#22c55e' : '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = notionSetupComplete ? '#16a34a' : '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = notionSetupComplete ? '#22c55e' : '#3b82f6'}
                >
                  {notionSetupComplete ? '⚙️ Manage Notion' : '📝 Setup Notion Editor'}
                </button>
                                 {notionSetupComplete && (
                   <>
                     <button
                       onClick={() => {
                         const notionUrl = `https://www.notion.so/${notionDatabaseId.replace('https://www.notion.so/', '')}`;
                         window.open(notionUrl, '_blank');
                       }}
                       style={{
                         backgroundColor: '#f59e0b',
                         color: 'white',
                         padding: '0.75rem 1.5rem',
                         borderRadius: '6px',
                         border: 'none',
                         fontSize: '1rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         transition: 'background-color 0.2s'
                       }}
                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                     >
                       📝 Open Notion
                     </button>
                     <button
                       onClick={syncNotionPosts}
                       disabled={loadingNotion}
                       style={{
                         backgroundColor: loadingNotion ? '#6b7280' : '#22c55e',
                         color: 'white',
                         padding: '0.75rem 1.5rem',
                         borderRadius: '6px',
                         border: 'none',
                         fontSize: '1rem',
                         fontWeight: '600',
                         cursor: loadingNotion ? 'not-allowed' : 'pointer',
                         transition: 'background-color 0.2s'
                       }}
                       onMouseOver={(e) => !loadingNotion && (e.currentTarget.style.backgroundColor = '#16a34a')}
                       onMouseOut={(e) => !loadingNotion && (e.currentTarget.style.backgroundColor = '#22c55e')}
                     >
                       {loadingNotion ? '🔄 Syncing...' : '🔄 Sync Posts'}
                     </button>
                   </>
                 )}
              </div>
            </div>
          </div>
          <div className="dashboard-grid">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h3 id="totalPosts">0</h3>
                  <p>Total Posts</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👀</div>
                <div className="stat-content">
                  <h3 id="totalViews">0</h3>
                  <p>Total Views</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h3 id="avgSeoScore">0</h3>
                  <p>Avg SEO Score</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3 id="publishedPosts">0</h3>
                  <p>Published</p>
                </div>
              </div>
            </div>

            <div className="content-sections">
              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Recent Posts</h2>
                </div>
                <div className="posts-table">
                  <div className="table-header">
                    <div className="table-row">
                      <div className="table-cell">Title</div>
                      <div className="table-cell">Status</div>
                      <div className="table-cell">Date</div>
                      <div className="table-cell">Views</div>
                      <div className="table-cell">SEO</div>
                      <div className="table-cell">Actions</div>
                    </div>
                  </div>
                  <div className="table-body" id="postsTableBody">
                    {/* Posts will be populated by JavaScript */}
                  </div>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                  <p className="text-sm text-gray-600">Choose how you want to create your next blog post</p>
                </div>
                <div className="quick-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', padding: '1rem' }}>
                  <button className="quick-action-btn" data-action="newPost" style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div className="action-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
                    <div className="action-content">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Create New Post</h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Start writing a new blog post</p>
                    </div>
                  </button>
                  
                  <button 
                    className="quick-action-btn" 
                    data-action="notionEditor" 
                    style={{ 
                      border: '2px solid #3b82f6', 
                      borderRadius: '8px', 
                      padding: '1rem', 
                      textAlign: 'left', 
                      transition: 'all 0.2s',
                      backgroundColor: '#eff6ff',
                      position: 'relative'
                    }}
                    onClick={() => {
                      console.log('🎯 Notion button clicked!');
                      setShowNotionSetup(true);
                    }}
                  >
                    <div className="action-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                    <div className="action-content">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1e40af' }}>Notion Editor</h4>
                      <p style={{ fontSize: '0.9rem', color: '#1e40af' }}>Create blogs in Notion (Recommended)</p>
                      <div style={{ 
                        position: 'absolute', 
                        top: '0.5rem', 
                        right: '0.5rem', 
                        backgroundColor: '#3b82f6', 
                        color: 'white', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        NEW
                      </div>
                    </div>
                  </button>
                  
                  <button className="quick-action-btn" data-action="importContent" style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div className="action-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📥</div>
                    <div className="action-content">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Import Content</h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Import from markdown or other sources</p>
                    </div>
                  </button>
                  
                  <button className="quick-action-btn" data-action="manageSeo" style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div className="action-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                    <div className="action-content">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>SEO Optimization</h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Optimize your content for search</p>
                    </div>
                  </button>
                  
                  <button className="quick-action-btn" data-action="syncMarkdown" style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>🔄</span>
                      <div>
                        <div style={{ fontWeight: '600', color: '#374151' }}>Sync Posts</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sync content from Notion</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="quick-action-btn" data-action="notionLayout" style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>🎨</span>
                      <div>
                        <div style={{ fontWeight: '600', color: '#374151' }}>Notion Layout</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>See rich formatting preview</div>
                      </div>
                    </div>
                  </button>
                </div>
                
                {/* Debug Info */}
                <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '0.8rem' }}>
                  <p><strong>Debug:</strong> Notion button should be visible above. If you can't see it, check the browser console for errors.</p>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Notion Integration</h2>
                  <p className="text-sm text-gray-600">Connect and sync with your Notion database</p>
                </div>
                
                {!notionSetupComplete ? (
                  <div className="notion-setup-prompt p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">📝</span>
                      <div>
                        <h3 className="font-semibold text-blue-800">Set up Notion Integration</h3>
                        <p className="text-sm text-blue-700">Connect your Notion database to sync blog posts</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowNotionSetup(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      🔗 Connect Notion
                    </button>
                  </div>
                ) : (
                  <div className="notion-status p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h3 className="font-semibold text-green-800">Notion Connected!</h3>
                        <p className="text-sm text-green-700">Your Notion database is connected and ready to sync</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          // Trigger Notion sync
                          const event = new CustomEvent('syncNotionPosts');
                          document.dispatchEvent(event);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        🔄 Sync Posts
                      </button>
                      <button 
                        onClick={() => setShowNotionSetup(true)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        ⚙️ Settings
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        {/* Editor View */}
        <div id="editor" className="view">
          <div className="editor-container">
            <div className="editor-header">
              <h2>✏️ Create New Blog Post</h2>
              <div className="editor-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
              <div className="editor-meta">
                <input type="text" id="postTitle" placeholder="Enter your post title..." className="title-input" />
                <div className="meta-fields">
                  <input type="text" id="postExcerpt" placeholder="Brief excerpt..." className="excerpt-input" />
                  <select id="postCategory" className="category-select">
                    <option value="">Select Category</option>
                    <option value="ai-strategy">AI Strategy</option>
                    <option value="business-automation">Business Automation</option>
                    <option value="digital-transformation">Digital Transformation</option>
                    <option value="industry-insights">Industry Insights</option>
                  </select>
                  <input type="text" id="postTags" placeholder="Tags (comma separated)" className="tags-input" />
                </div>
              </div>
            </div>
            
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button className="toolbar-btn" data-action="bold" title="Bold"><strong>B</strong></button>
                <button className="toolbar-btn" data-action="italic" title="Italic"><em>I</em></button>
                <button className="toolbar-btn" data-action="heading" title="Heading">H</button>
                <button className="toolbar-btn" data-action="link" title="Link">🔗</button>
                <button className="toolbar-btn" data-action="image" title="Image">🖼️</button>
                <button className="toolbar-btn" data-action="code" title="Code">{'</>'}</button>
              </div>
              <div className="toolbar-group">
                <button className="toolbar-btn" data-action="preview" title="Preview">👁️</button>
                <button className="toolbar-btn" data-action="wordCount" title="Word Count">📊</button>
              </div>
            </div>
            
            <div className="editor-content">
              <textarea id="postContent" className="content-editor" placeholder="Start writing your amazing blog post here...&#10;&#10;Tips:&#10;• Use clear headings and subheadings&#10;• Include relevant examples and case studies&#10;• Add bullet points for easy reading&#10;• Optimize for your target audience"></textarea>
            </div>
            
            <div className="editor-footer">
              <div className="editor-stats">
                <span id="wordCount">0 words</span>
                <span id="readTime">0 min read</span>
              </div>
              <div className="editor-actions">
                <button 
                  className="btn btn--outline" 
                  onClick={() => {
                    // Populate with sample content for testing
                    const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                    const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                    const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                    
                    if (titleInput && contentInput && excerptInput) {
                      titleInput.value = "The Real Path to AI: Skip the Coding, Start Solving Problems";
                      excerptInput.value = "For business leaders, getting a computer science degree is not the best way to get into AI. Here's the real path to success.";
                      contentInput.value = `### **The Real Path to AI: Skip the Coding, Start Solving Problems**

Is getting a computer science degree the best way to get into AI? For business leaders, that advice is so misguided it makes questionable decisions look like strategic planning.

If you're looking at the rise of artificial intelligence and thinking, "I need to learn programming to get into this field," it's time to reframe. Decades of experience solving real-world business challenges reveal a different truth: you're looking at this completely backwards.

AI is a vast landscape, but the real value for most businesses isn't in building the technology—it's in *applying* it. Your operational knowledge, industry expertise, and understanding of day-to-day challenges are your most significant competitive advantages.

Instead of diving into coding courses, here are five proven approaches for business leaders to drive immediate impact with **AI implementation for SMBs**.

---

### **1. Become the AI Champion Your Organization Needs**

Most companies aren't waiting for better AI; they're waiting for a leader to show them how to use what's already available. Many organizations are stuck in analysis paralysis, looking to overburdened IT departments for direction.

Start by observing your current processes with fresh eyes. Where do your teams spend repetitive hours? What tasks require the same decision-making patterns over and over? You don't need to be a technologist to spot these opportunities; you need to be a business expert.

**💡 Real-World Examples:**
- A Pacific Northwest dental practice **reduced appointment scheduling time by 60%** using an AI-powered scheduling assistant.
- A regional distributor streamlined vendor communications by **automating routine purchase order follow-ups**.
- A services firm **cut proposal writing time in half** while improving quality and consistency.

### **2. Leverage Your Industry Expertise**

Your years of hands-on experience are not a limitation; they are your secret weapon. Every sector has unique challenges, workflows, and unspoken problems that only insiders truly understand.

Begin with a simple question: "What would happen if this routine task could be done in half the time with greater accuracy?" As you explore AI within your familiar systems, you'll see patterns others miss.

The most successful AI implementations don't come from programmers trying to understand business. They come from business experts who learn how to leverage the right tools.

---

**Ready to get started? This is just the beginning of your AI journey!**`;

                      // Update word count
                      const wordCount = contentInput.value.split(/\s+/).filter(word => word.length > 0).length;
                      const wordCountElement = document.getElementById('wordCount');
                      if (wordCountElement) {
                        wordCountElement.textContent = `${wordCount} words`;
                      }
                      
                      console.log('✅ Sample content loaded!');
                    }
                  }}
                >
                  📝 Load Sample Post
                </button>
                <button 
                  className="btn btn--outline" 
                  onClick={() => setShowPostSelector(true)}
                >
                  📚 Load Existing Post
                </button>
                <button className="btn btn--outline" id="saveDraftBtn">💾 Save Draft</button>
                <button className="btn btn--primary" id="publishBtn">🚀 Publish Post</button>
                
                {/* UUID Filename Display */}
                <div id="uuidDisplay" className="hidden mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="text-sm text-blue-800">
                    <strong>📁 File will be saved as:</strong>
                    <div id="uuidFilename" className="font-mono text-xs mt-1 p-2 bg-white border rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media View */}
        <div id="media" className="view">
          <div className="media-container">
            <div className="media-header">
              <h2>🖼️ Media Library</h2>
              <div className="media-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            {/* Enhanced Media Upload Section */}
            <div className="media-upload-section mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">📤 Upload New Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Upload</label>
                  <input 
                    type="file" 
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                📤 Upload Media
              </button>
            </div>
            
            <div className="media-filters">
              <select className="media-filter">
                <option value="all">All Media</option>
                <option value="images">Images</option>
                <option value="videos">Videos</option>
                <option value="documents">Documents</option>
              </select>
              <input type="text" placeholder="Search media..." className="media-search" />
            </div>
            
            {/* Enhanced Media Grid */}
            <div className="media-grid">
              <div className="media-item">
                <div className="media-preview">
                  <img src="/blogcraft/assets/images/placeholder.svg" alt="Placeholder" />
                </div>
                <div className="media-info">
                  <span className="media-name">Sample Image</span>
                  <span className="media-size">2.1 MB</span>
                </div>
              </div>
              <div className="media-item">
                <div className="media-preview">
                  <div className="media-placeholder">📄</div>
                </div>
                <div className="media-info">
                  <span className="media-name">Document.pdf</span>
                  <span className="media-size">1.8 MB</span>
                </div>
              </div>
            </div>
            
            {/* Notion Media Integration */}
            <div className="notion-media-section mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">🔄 Notion Media Sync</h3>
              <p className="text-sm text-blue-700 mb-4">
                Sync media files from your Notion database to use in BlogCraft. This will import all images and files from your Notion posts.
              </p>
              <button 
                onClick={() => {
                  if (notionSetupComplete) {
                    alert('🔄 Syncing media from Notion... This will import all images and files from your Notion posts.');
                  } else {
                    alert('⚠️ Please set up Notion integration first to sync media files.');
                  }
                }}
                disabled={!notionSetupComplete}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                🔄 Sync Notion Media
              </button>
            </div>
            
            <div className="media-upload-area">
              <div className="upload-zone">
                <span className="upload-icon">📤</span>
                <p>Drag and drop files here or click to browse</p>
                <button className="btn btn--outline">Choose Files</button>
              </div>
            </div>
          </div>
        </div>

        <div id="templates" className="view">
          <div className="templates-container">
            <div className="templates-header">
              <h2>📄 Blog Templates</h2>
              <p>Choose from professional templates to speed up your content creation</p>
              <div className="templates-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            <div className="templates-grid">
              <div className="template-card">
                <div className="template-preview">
                  <div className="template-thumbnail">📊</div>
                </div>
                <div className="template-info">
                  <h3>Business Report</h3>
                  <p>Professional template for business insights and analysis</p>
                  <div className="template-tags">
                    <span className="tag">Business</span>
                    <span className="tag">Professional</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('📄 Loading Business Report template...');
                      const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                      const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                      
                      if (titleInput && contentInput && excerptInput) {
                        titleInput.value = "Business Report Template";
                        excerptInput.value = "Professional business insights and analysis template";
                        contentInput.value = `# Business Report Template

## Executive Summary
Brief overview of key findings and recommendations.

## Introduction
Background and context for the report.

## Key Findings
- Finding 1
- Finding 2
- Finding 3

## Analysis
Detailed analysis of the findings.

## Recommendations
- Recommendation 1
- Recommendation 2
- Recommendation 3

## Conclusion
Summary and next steps.

---
*Generated using BlogCraft Business Report Template*`;

                        // Switch to editor view
                        const editorView = document.getElementById('editor');
                        const dashboardView = document.getElementById('dashboard');
                        if (editorView && dashboardView) {
                          dashboardView.classList.remove('active');
                          editorView.classList.add('active');
                          
                          // Update navigation
                          document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                          });
                          const editorNav = document.getElementById('nav-editor');
                          if (editorNav) editorNav.classList.add('active');
                        }
                        
                        alert('✅ Business Report template loaded! Switch to Editor to customize.');
                      }
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="template-card">
                <div className="template-preview">
                  <div className="template-thumbnail">🚀</div>
                </div>
                <div className="template-info">
                  <h3>How-To Guide</h3>
                  <p>Step-by-step tutorial template with clear instructions</p>
                  <div className="template-tags">
                    <span className="tag">Tutorial</span>
                    <span className="tag">Step-by-step</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('📄 Loading How-To Guide template...');
                      const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                      const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                      
                      if (titleInput && contentInput && excerptInput) {
                        titleInput.value = "How-To Guide Template";
                        excerptInput.value = "Step-by-step tutorial template with clear instructions";
                        contentInput.value = `# How-To Guide Template

## What You'll Learn
Brief description of what this guide will teach you.

## Prerequisites
- Requirement 1
- Requirement 2
- Requirement 3

## Step 1: Getting Started
Detailed instructions for the first step.

## Step 2: Core Process
Detailed instructions for the main process.

## Step 3: Finalization
How to complete and verify the process.

## Troubleshooting
Common issues and solutions.

## Summary
Recap of what was accomplished.

---
*Generated using BlogCraft How-To Guide Template*`;

                        // Switch to editor view
                        const editorView = document.getElementById('editor');
                        const dashboardView = document.getElementById('dashboard');
                        if (editorView && dashboardView) {
                          dashboardView.classList.remove('active');
                          editorView.classList.add('active');
                          
                          // Update navigation
                          document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                          });
                          const editorNav = document.getElementById('nav-editor');
                          if (editorNav) editorNav.classList.add('active');
                        }
                        
                        alert('✅ How-To Guide template loaded! Switch to Editor to customize.');
                      }
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="template-card">
                <div className="template-preview">
                  <div className="template-thumbnail">💡</div>
                </div>
                <div className="template-info">
                  <h3>Industry Insights</h3>
                  <p>Template for sharing industry knowledge and trends</p>
                  <div className="template-tags">
                    <span className="tag">Industry</span>
                    <span className="tag">Trends</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('📄 Loading Industry Insights template...');
                      const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                      const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                      
                      if (titleInput && contentInput && excerptInput) {
                        titleInput.value = "Industry Insights Template";
                        excerptInput.value = "Template for sharing industry knowledge and trends";
                        contentInput.value = `# Industry Insights Template

## Industry Overview
Current state and key players in the industry.

## Emerging Trends
- Trend 1: Description and impact
- Trend 2: Description and impact
- Trend 3: Description and impact

## Market Analysis
Data-driven insights about the market.

## Future Outlook
Predictions and recommendations for the future.

## Key Takeaways
- Takeaway 1
- Takeaway 2
- Takeaway 3

## Conclusion
Summary of insights and next steps.

---
*Generated using BlogCraft Industry Insights Template*`;

                        // Switch to editor view
                        const editorView = document.getElementById('editor');
                        const dashboardView = document.getElementById('dashboard');
                        if (editorView && dashboardView) {
                          dashboardView.classList.remove('active');
                          editorView.classList.add('active');
                          
                          // Update navigation
                          document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                          });
                          const editorNav = document.getElementById('nav-editor');
                          if (editorNav) editorNav.classList.add('active');
                        }
                        
                        alert('✅ Industry Insights template loaded! Switch to Editor to customize.');
                      }
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="template-card">
                <div className="template-preview">
                  <div className="template-thumbnail">🎯</div>
                </div>
                <div className="template-info">
                  <h3>Case Study</h3>
                  <p>Template for showcasing successful projects and results</p>
                  <div className="template-tags">
                    <span className="tag">Case Study</span>
                    <span className="tag">Results</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('📄 Loading Case Study template...');
                      const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                      const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                      const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                      
                      if (titleInput && contentInput && excerptInput) {
                        titleInput.value = "Case Study Template";
                        excerptInput.value = "Template for showcasing successful projects and results";
                        contentInput.value = `# Case Study Template

## Project Overview
Brief description of the project or initiative.

## Challenge
The problem or challenge that needed to be solved.

## Solution
How the challenge was addressed and what was implemented.

## Implementation
Step-by-step process of how the solution was deployed.

## Results
Quantifiable outcomes and achievements.

## Lessons Learned
Key insights and takeaways from the project.

## Conclusion
Summary of success and future recommendations.

---
*Generated using BlogCraft Case Study Template*`;

                        // Switch to editor view
                        const editorView = document.getElementById('editor');
                        const dashboardView = document.getElementById('dashboard');
                        if (editorView && dashboardView) {
                          dashboardView.classList.remove('active');
                          editorView.classList.add('active');
                          
                          // Update navigation
                          document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                          });
                          const editorNav = document.getElementById('nav-editor');
                          if (editorNav) editorNav.classList.add('active');
                        }
                        
                        alert('✅ Case Study template loaded! Switch to Editor to customize.');
                      }
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="themes" className="view">
          <div className="themes-container">
            <div className="themes-header">
              <h2>🎨 Blog Themes</h2>
              <p>Customize the look and feel of your blog with professional themes</p>
              <div className="themes-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            <div className="themes-grid">
              <div className="theme-card active">
                <div className="theme-preview">
                  <div className="theme-thumbnail">🏢</div>
                  <div className="theme-status">Active</div>
                </div>
                <div className="theme-info">
                  <h3>Professional Business</h3>
                  <p>Clean, corporate design perfect for business blogs</p>
                  <div className="theme-features">
                    <span className="feature">Responsive</span>
                    <span className="feature">SEO Optimized</span>
                    <span className="feature">Fast Loading</span>
                  </div>
                  <button 
                    className="btn btn--outline"
                    onClick={() => {
                      alert('🎨 Professional Business theme is already active!');
                    }}
                  >
                    Customize
                  </button>
                </div>
              </div>
              
              <div className="theme-card">
                <div className="theme-preview">
                  <div className="theme-thumbnail">🚀</div>
                </div>
                <div className="theme-info">
                  <h3>Modern Tech</h3>
                  <p>Contemporary design for technology and innovation blogs</p>
                  <div className="theme-features">
                    <span className="feature">Dark Mode</span>
                    <span className="feature">Code Highlighting</span>
                    <span className="feature">Interactive</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('🎨 Activating Modern Tech theme...');
                      
                      // Update active theme
                      document.querySelectorAll('.theme-card').forEach(card => {
                        card.classList.remove('active');
                      });
                      const themeCard = document.querySelector('.theme-card:nth-child(2)');
                      if (themeCard) themeCard.classList.add('active');
                      
                      // Update theme status
                      const statusElement = themeCard?.querySelector('.theme-status');
                      if (statusElement) statusElement.textContent = 'Active';
                      
                      // Update button text
                      const button = themeCard?.querySelector('button');
                      if (button) {
                        button.textContent = 'Customize';
                        button.className = 'btn btn--outline';
                      }
                      
                      // Update previous active theme
                      const previousActive = document.querySelector('.theme-card:first-child');
                      if (previousActive) {
                        previousActive.classList.remove('active');
                        const prevStatus = previousActive.querySelector('.theme-status');
                        if (prevStatus) prevStatus.textContent = '';
                        const prevButton = previousActive.querySelector('button');
                        if (prevButton) {
                          prevButton.textContent = 'Activate';
                          prevButton.className = 'btn btn--primary';
                        }
                      }
                      
                      alert('✅ Modern Tech theme activated! Your blog now has a contemporary tech-focused design.');
                    }}
                  >
                    Activate
                  </button>
                </div>
              </div>
              
              <div className="theme-card">
                <div className="theme-preview">
                  <div className="theme-thumbnail">🌱</div>
                </div>
                <div className="theme-info">
                  <h3>Minimalist</h3>
                  <p>Simple, elegant design focused on content</p>
                  <div className="theme-features">
                    <span className="feature">Clean Typography</span>
                    <span className="feature">White Space</span>
                    <span className="feature">Fast</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('🎨 Activating Minimalist theme...');
                      
                      // Update active theme
                      document.querySelectorAll('.theme-card').forEach(card => {
                        card.classList.remove('active');
                      });
                      const themeCard = document.querySelector('.theme-card:nth-child(3)');
                      if (themeCard) themeCard.classList.add('active');
                      
                      // Update theme status
                      const statusElement = themeCard?.querySelector('.theme-status');
                      if (statusElement) statusElement.textContent = 'Active';
                      
                      // Update button text
                      const button = themeCard?.querySelector('button');
                      if (button) {
                        button.textContent = 'Customize';
                        button.className = 'btn btn--outline';
                      }
                      
                      // Update previous active theme
                      const previousActive = document.querySelector('.theme-card.active:not(:nth-child(3))');
                      if (previousActive) {
                        previousActive.classList.remove('active');
                        const prevStatus = previousActive.querySelector('.theme-status');
                        if (prevStatus) prevStatus.textContent = '';
                        const prevButton = previousActive.querySelector('button');
                        if (prevButton) {
                          prevButton.textContent = 'Activate';
                          prevButton.className = 'btn btn--primary';
                        }
                      }
                      
                      alert('✅ Minimalist theme activated! Your blog now has a clean, content-focused design.');
                    }}
                  >
                    Activate
                  </button>
                </div>
              </div>
              
              <div className="theme-card">
                <div className="theme-preview">
                  <div className="theme-thumbnail">🎭</div>
                </div>
                <div className="theme-info">
                  <h3>Creative Portfolio</h3>
                  <p>Artistic design for creative professionals</p>
                  <div className="theme-features">
                    <span className="feature">Visual Focus</span>
                    <span className="feature">Gallery Support</span>
                    <span className="feature">Creative</span>
                  </div>
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      console.log('🎨 Activating Creative Portfolio theme...');
                      
                      // Update active theme
                      document.querySelectorAll('.theme-card').forEach(card => {
                        card.classList.remove('active');
                      });
                      const themeCard = document.querySelector('.theme-card:nth-child(4)');
                      if (themeCard) themeCard.classList.add('active');
                      
                      // Update theme status
                      const statusElement = themeCard?.querySelector('.theme-status');
                      if (statusElement) statusElement.textContent = 'Active';
                      
                      // Update button text
                      const button = themeCard?.querySelector('button');
                      if (button) {
                        button.textContent = 'Customize';
                        button.className = 'btn btn--outline';
                      }
                      
                      // Update previous active theme
                      const previousActive = document.querySelector('.theme-card.active:not(:nth-child(4))');
                      if (previousActive) {
                        previousActive.classList.remove('active');
                        const prevStatus = previousActive.querySelector('.theme-status');
                        if (prevStatus) prevStatus.textContent = '';
                        const prevButton = previousActive.querySelector('button');
                        if (prevButton) {
                          prevButton.textContent = 'Activate';
                          prevButton.className = 'btn btn--primary';
                        }
                      }
                      
                      alert('✅ Creative Portfolio theme activated! Your blog now has an artistic, creative design.');
                    }}
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="seo" className="view">
          <div className="seo-container">
            <div className="seo-header">
              <h2>🔍 SEO Optimization</h2>
              <p>Optimize your blog posts for search engines and better visibility</p>
              <div className="seo-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            <div className="seo-tools-grid">
              <div className="seo-tool-card">
                <div className="tool-header">
                  <h3>📝 Keyword Analysis</h3>
                  <span className="tool-status">Ready</span>
                </div>
                <div className="tool-content">
                  <input type="text" placeholder="Enter your main keyword..." className="keyword-input" />
                  <div className="keyword-suggestions">
                    <span className="suggestion">AI automation</span>
                    <span className="suggestion">business efficiency</span>
                    <span className="suggestion">digital transformation</span>
                  </div>
                  <button className="btn btn--primary">Analyze Keywords</button>
                </div>
              </div>
              
              <div className="seo-tool-card">
                <div className="tool-header">
                  <h3>📊 Content Score</h3>
                  <span className="tool-status score-good">85/100</span>
                </div>
                <div className="tool-content">
                  <div className="score-breakdown">
                    <div className="score-item good">
                      <span>Title Length</span>
                      <span>✅ Good</span>
                    </div>
                    <div className="score-item good">
                      <span>Meta Description</span>
                      <span>✅ Good</span>
                    </div>
                    <div className="score-item warning">
                      <span>Image Alt Tags</span>
                      <span>⚠️ Needs Work</span>
                    </div>
                    <div className="score-item good">
                      <span>Internal Links</span>
                      <span>✅ Good</span>
                    </div>
                  </div>
                  <button className="btn btn--outline">View Details</button>
                </div>
              </div>
              
              <div className="seo-tool-card">
                <div className="tool-header">
                  <h3>🚀 Performance</h3>
                  <span className="tool-status">Analyzing...</span>
                </div>
                <div className="tool-content">
                  <div className="performance-metrics">
                    <div className="metric">
                      <span className="metric-label">Page Speed</span>
                      <span className="metric-value">2.1s</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Mobile Score</span>
                      <span className="metric-value">92/100</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Accessibility</span>
                      <span className="metric-value">88/100</span>
                    </div>
                  </div>
                  <button className="btn btn--outline">Run Test</button>
                </div>
              </div>
              
              <div className="seo-tool-card">
                <div className="tool-header">
                  <h3>📈 Rank Tracker</h3>
                  <span className="tool-status">Tracking 5 keywords</span>
                </div>
                <div className="tool-content">
                  <div className="ranking-keywords">
                    <div className="keyword-rank">
                      <span>AI automation</span>
                      <span className="rank">#12</span>
                    </div>
                    <div className="keyword-rank">
                      <span>business efficiency</span>
                      <span className="rank">#8</span>
                    </div>
                    <div className="keyword-rank">
                      <span>digital transformation</span>
                      <span className="rank">#15</span>
                    </div>
                  </div>
                  <button className="btn btn--outline">View Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="settings" className="view">
          <div className="settings-container">
            <div className="settings-header">
              <h2>⚙️ BlogCraft Settings</h2>
              <p>Configure your blog preferences and integration settings</p>
              <div className="settings-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            <div className="settings-sections">
              <div className="settings-section">
                <h3>📝 Blog Configuration</h3>
                <div className="setting-group">
                  <label htmlFor="blogTitle">Blog Title</label>
                  <input type="text" id="blogTitle" defaultValue="Fae Intelligence Blog" className="setting-input" />
                </div>
                <div className="setting-group">
                  <label htmlFor="blogDescription">Blog Description</label>
                  <textarea id="blogDescription" defaultValue="Professional insights on AI, business automation, and digital transformation" className="setting-textarea"></textarea>
                </div>
                <div className="setting-group">
                  <label htmlFor="blogLanguage">Language</label>
                  <select id="blogLanguage" className="setting-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>🔗 Integrations</h3>
                <div className="setting-group">
                  <label className="setting-checkbox">
                    <input type="checkbox" id="enableMarkdownSync" defaultChecked />
                    <span>Enable Markdown Sync</span>
                  </label>
                </div>
                <div className="setting-group">
                  <label className="setting-checkbox">
                    <input type="checkbox" id="enableAutoSave" defaultChecked />
                    <span>Auto-save drafts</span>
                  </label>
                </div>
                <div className="setting-group">
                  <label className="setting-checkbox">
                    <input type="checkbox" id="enableSeoAnalysis" defaultChecked />
                    <span>SEO analysis on publish</span>
                  </label>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>📊 Publishing</h3>
                <div className="setting-group">
                  <label htmlFor="defaultCategory">Default Category</label>
                  <select id="defaultCategory" className="setting-select">
                    <option value="ai-strategy">AI Strategy</option>
                    <option value="business-automation">Business Automation</option>
                    <option value="digital-transformation">Digital Transformation</option>
                  </select>
                </div>
                <div className="setting-group">
                  <label htmlFor="defaultTags">Default Tags</label>
                  <input type="text" id="defaultTags" defaultValue="AI, Business, Technology" className="setting-input" />
                </div>
                <div className="setting-group">
                  <label className="setting-checkbox">
                    <input type="checkbox" id="requireReview" />
                    <span>Require review before publishing</span>
                  </label>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>🎨 Appearance</h3>
                <div className="setting-group">
                  <label htmlFor="defaultTheme">Default Theme</label>
                  <select id="defaultTheme" className="setting-select">
                    <option value="professional-business">Professional Business</option>
                    <option value="modern-tech">Modern Tech</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>
                <div className="setting-group">
                  <label htmlFor="postsPerPage">Posts per Page</label>
                  <select id="postsPerPage" className="setting-select" defaultValue="10">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="settings-actions">
              <button className="btn btn--outline">Reset to Defaults</button>
              <button className="btn btn--primary">Save Settings</button>
            </div>
          </div>
        </div>

        {/* Notion-Style Layout Preview */}
        <div id="notionLayout" className="view">
          <div className="notion-container">
            <div className="notion-header">
              <h2>📝 Notion-Style Layout</h2>
              <p>See how your content will look with rich Notion formatting</p>
              <div className="notion-nav-links">
                <a href="/" className="nav-link-main">🏠 Main Site</a>
                <a href="/blog" className="nav-link-main">📝 Blog</a>
                <a href="/dashboard" className="nav-link-main">⚙️ Dashboard</a>
                <a href="/resources" className="nav-link-main">📚 Resources</a>
              </div>
            </div>
            
            <div className="notion-content">
              <div className="notion-block notion-heading-1">
                <h1>🚀 Welcome to Notion-Style BlogCraft</h1>
              </div>
              
              <div className="notion-block notion-paragraph">
                <p>This is how your content will look with <strong>rich Notion formatting</strong>. You can use:</p>
              </div>
              
              <div className="notion-block notion-heading-2">
                <h2>✨ Rich Text Formatting</h2>
              </div>
              
              <div className="notion-block notion-paragraph">
                <ul>
                  <li><strong>Bold text</strong> for emphasis</li>
                  <li><em>Italic text</em> for subtle emphasis</li>
                  <li><code>Inline code</code> for technical terms</li>
                  <li><a href="#" className="notion-link">Links</a> to external resources</li>
                </ul>
              </div>
              
              <div className="notion-block notion-heading-2">
                <h2>📚 Content Blocks</h2>
              </div>
              
              <div className="notion-block notion-paragraph">
                <p>Create structured content with:</p>
              </div>
              
              <div className="notion-block notion-bullet-list">
                <ul>
                  <li>Bullet points for lists</li>
                  <li>Numbered lists for steps</li>
                  <li>Code blocks for examples</li>
                  <li>Images with captions</li>
                </ul>
              </div>
              
              <div className="notion-block notion-code">
                <div className="code-header">
                  <span className="code-language">javascript</span>
                </div>
                <pre><code>{`function createNotionPost() {
  return "Rich, formatted content!";
}`}</code></pre>
              </div>
              
              <div className="notion-block notion-callout">
                <div className="callout-icon">💡</div>
                <div className="callout-content">
                  <p><strong>Pro Tip:</strong> Use the toolbar in the editor to apply formatting as you write!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals and overlays will be added by JavaScript */}
      <div id="modalContainer"></div>

      {/* Enhanced Preview Modal with Notion-Style View */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">📝 Preview: {previewTitle}</h2>
                <p className="text-sm text-gray-600 mt-1">Notion-style preview of your blog post</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content - Notion-Style Blog View */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="notion-container p-8">
                <div className="notion-content">
                  {/* Title */}
                  <div className="notion-block notion-heading-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{previewTitle}</h1>
                  </div>
                  
                  {/* Content with Markdown Rendering */}
                  <div 
                    className="notion-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownToHTML(previewContent)
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Word Count:</span> {previewContent.split(/\s+/).filter(word => word.length > 0).length} words
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    // Copy content to clipboard
                    navigator.clipboard.writeText(previewContent);
                    alert('Content copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📋 Copy Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Selector Modal */}
      {showPostSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Load Existing Post</h2>
              <button
                onClick={() => setShowPostSelector(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {existingPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No existing posts found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {existingPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        // Load the post into the editor
                        const titleInput = document.getElementById('postTitle') as HTMLInputElement;
                        const contentInput = document.getElementById('postContent') as HTMLTextAreaElement;
                        const excerptInput = document.getElementById('postExcerpt') as HTMLInputElement;
                        
                        if (titleInput && contentInput && excerptInput) {
                          titleInput.value = post.title || '';
                          excerptInput.value = post.excerpt || '';
                          contentInput.value = post.content || '';
                          
                          // Update word count
                          const wordCount = contentInput.value.split(/\s+/).filter(word => word.length > 0).length;
                          const wordCountElement = document.getElementById('wordCount');
                          if (wordCountElement) {
                            wordCountElement.textContent = `${wordCount} words`;
                          }
                          
                          // Switch to editor view
                          const editorView = document.getElementById('editor');
                          const dashboardView = document.getElementById('dashboard');
                          if (editorView && dashboardView) {
                            dashboardView.classList.remove('active');
                            editorView.classList.add('active');
                            
                            // Update navigation
                            document.querySelectorAll('.nav-item').forEach(item => {
                              item.classList.remove('active');
                            });
                            const editorNav = document.getElementById('nav-editor');
                            if (editorNav) editorNav.classList.add('active');
                          }
                          
                          setShowPostSelector(false);
                          alert(`✅ Loaded "${post.title}" into editor!`);
                        }
                      }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        {post.createdAt && (
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPostSelector(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notion Setup Modal */}
      {showNotionSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-900">🚀 Notion Blog Editor Setup</h2>
              <button
                onClick={() => setShowNotionSetup(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Quick Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowNotionSetup(false)}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  ✕ Close
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Why Notion Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">✨ Why Use Notion for Blog Creation?</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• 🎨 Beautiful, intuitive interface - no markdown syntax needed</li>
                    <li>• 📝 Rich text editing with real-time collaboration</li>
                    <li>• 🖼️ Drag & drop images, videos, and embeds</li>
                    <li>• 📱 Mobile-friendly editing anywhere</li>
                    <li>• 🔄 Automatic sync to your website</li>
                    <li>• 📊 Database views to organize posts by status, category, etc.</li>
                  </ul>
                </div>

                {/* Setup Instructions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">🔧 Setup Instructions</h3>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 1: Create Notion Integration</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        <li>Go to <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.notion.so/my-integrations</a></li>
                        <li>Click "New integration"</li>
                        <li>Name it "Fae Intelligence Blog Editor"</li>
                        <li>Select your workspace</li>
                        <li>Copy the "Internal Integration Token" (starts with "ntn_", "int_", or "sk_")</li>
                      </ol>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 2: Create Blog Database</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        <li>Create a new page in Notion</li>
                        <li>Type "/database" and select "Table - Full page"</li>
                        <li>Name it "Blog Posts"</li>
                        <li>Add these properties:</li>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li><strong>Title</strong> (Title property)</li>
                          <li><strong>Status</strong> (Select: Draft, Published)</li>
                          <li><strong>Category</strong> (Select: AI Strategy, Business Automation, etc.)</li>
                          <li><strong>Excerpt</strong> (Text property)</li>
                          <li><strong>Tags</strong> (Multi-select)</li>
                          <li><strong>Published Date</strong> (Date property)</li>
                        </ul>
                        <li>Copy the database URL and extract the ID (the part after the last dash, or just paste the full URL and we'll extract it automatically)</li>
                      </ol>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 3: Configure Integration</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notion API Key (Internal Integration Token)
                          </label>
                          <input
                            type="password"
                            value={notionApiKey}
                            onChange={(e) => setNotionApiKey(e.target.value)}
                            placeholder="ntn_..., int_..., or sk_..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Database ID
                          </label>
                          <input
                            type="text"
                            value={notionDatabaseId}
                            onChange={(e) => {
                              // Clean the input to remove any full URLs and query parameters
                              let cleanId = e.target.value
                                .replace('https://www.notion.so/', '')
                                .replace('https://notion.so/', '');
                              
                              // Remove query parameters (everything after ?)
                              if (cleanId.includes('?')) {
                                cleanId = cleanId.split('?')[0];
                              }
                              
                              // Remove any trailing slashes
                              cleanId = cleanId.replace(/\/$/, '');
                              
                              console.log('🔍 Database ID cleaning:', {
                                original: e.target.value,
                                cleaned: cleanId,
                                length: cleanId.length
                              });
                              
                              setNotionDatabaseId(cleanId);
                            }}
                            placeholder="24f6b6417ac18074be14fedfce5ad776"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            💡 Just paste the ID part (e.g., 24f6b6417ac18074be14fedfce5ad776) or the full URL - we'll clean it automatically
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            🔑 API Key should start with "ntn_" (Notion), "int_" (Internal), or "sk_" (Secret Key)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                {notionSetupComplete && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">✅ Notion Integration Active</h3>
                    <div className="text-green-800 space-y-2 text-sm">
                      <p><strong>API Key:</strong> {notionApiKey ? '✅ Configured' : '❌ Missing'}</p>
                      <p><strong>Database ID:</strong> {notionDatabaseId ? '✅ Configured' : '❌ Missing'}</p>
                      <p><strong>Connection Status:</strong> ✅ Connected</p>
                      {notionPosts.length > 0 && (
                        <p><strong>Posts Found:</strong> {notionPosts.length} posts in your Notion database</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">🎯 Once Setup, You Can:</h3>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Create beautiful blog posts in Notion's intuitive interface</li>
                    <li>• Use rich formatting, tables, callouts, and media</li>
                    <li>• Collaborate with team members in real-time</li>
                    <li>• Automatically sync posts to your website</li>
                    <li>• Manage your entire blog from Notion</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Modal Footer - Fixed at bottom */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 flex-shrink-0 bg-white">
              <div className="text-sm text-gray-500">
                <p>💡 <strong>Pro Tip:</strong> Your credentials are saved locally and will persist between sessions!</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearNotionCredentials}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                >
                  🗑️ Clear Credentials
                </button>
                <button
                  onClick={() => setShowNotionSetup(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={testNotionAPIKey}
                  disabled={loadingNotion || !notionApiKey}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingNotion ? '🔄 Testing...' : '🔑 Test API Key Only'}
                </button>
                <button
                  onClick={testNotionAPI}
                  disabled={loadingNotion || !notionApiKey || !notionDatabaseId}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingNotion ? '🔄 Testing...' : '🧪 Test API'}
                </button>
                <button
                  onClick={testNotionConnection}
                  disabled={loadingNotion || !notionApiKey || !notionDatabaseId}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingNotion ? '🔄 Testing...' : '🔗 Test Connection'}
                </button>
                <button
                  onClick={syncNotionPosts}
                  disabled={loadingNotion || !notionApiKey || !notionDatabaseId}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingNotion ? '🔄 Syncing...' : '🔄 Sync Posts'}
                </button>
                <button
                  onClick={() => {
                    if (notionApiKey && notionDatabaseId) {
                      setShowNotionSetup(false);
                      
                      // Open Notion database
                      let cleanDatabaseId = notionDatabaseId
                        .replace('https://www.notion.so/', '')
                        .replace('https://notion.so/', '');
                      
                      // Remove query parameters
                      if (cleanDatabaseId.includes('?')) {
                        cleanDatabaseId = cleanDatabaseId.split('?')[0];
                      }
                      
                      const notionUrl = `https://www.notion.so/${cleanDatabaseId}`;
                      window.open(notionUrl, '_blank');
                      
                      alert('✅ Opening Notion! Your credentials are saved and will be remembered.');
                    } else {
                      alert('Please enter both the API key and database ID first.');
                    }
                  }}
                  disabled={!notionApiKey || !notionDatabaseId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🚀 Open Notion Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Section - Remove this after fixing UI issues */}
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', border: '2px solid #d1d5db', borderRadius: '8px' }}>
        <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>🔧 UI Debug Info</h3>
        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          <p><strong>Header Logo:</strong> Should be visible above with "Fae Intelligence BlogCraft"</p>
          <p><strong>Navigation:</strong> Should show Dashboard, Editor, Media, Templates, Themes, SEO, Settings</p>
          <p><strong>Quick Actions:</strong> Should show 5 action buttons including Notion Editor</p>
          <p><strong>Stats Cards:</strong> Should show Total Posts, Total Views, Avg SEO Score, Published</p>
          <p><strong>Recent Posts Table:</strong> Should show a table with existing blog posts</p>
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <p><strong>Debug:</strong> Notion button should be visible above. If you can't see it, check the browser console for errors.</p>
        </div>
      </div>
    </div>
  );
}
