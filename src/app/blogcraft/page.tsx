'use client';

import { useEffect } from 'react';

export default function BlogCraftPage() {
  useEffect(() => {
    console.log('🚀 BlogCraft page mounting, loading resources...');
    
    // Load the BlogCraft scripts and styles
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
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
      console.log(`🎨 Loading stylesheet: ${href}`);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => console.log(`✅ Stylesheet loaded: ${href}`);
      link.onerror = (error) => console.error(`❌ Stylesheet failed: ${href}`, error);
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
      })
      .catch((error) => {
        console.error('💥 Error loading BlogCraft resources:', error);
      });
  }, []);

  return (
    <div id="blogcraft-container">
      {/* Header Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>Fae Intelligence BlogCraft</h1>
            <span className="logo-tagline">Professional Blog Creation</span>
          </div>
          <nav className="nav-main">
            <button className="nav-item active" data-view="dashboard">
              <span className="nav-icon">📊</span>
              Dashboard
            </button>
            <button className="nav-item" data-view="editor">
              <span className="nav-icon">✏️</span>
              Editor
            </button>
            <button className="nav-item" data-view="media">
              <span className="nav-icon">🖼️</span>
              Media
            </button>
            <button className="nav-item" data-view="templates">
              <span className="nav-icon">📄</span>
              Templates
            </button>
            <button className="nav-item" data-view="themes">
              <span className="nav-icon">🎨</span>
              Themes
            </button>
            <button className="nav-item" data-view="seo">
              <span className="nav-icon">🔍</span>
              SEO
            </button>
            <button className="nav-item" data-view="settings">
              <span className="nav-icon">⚙️</span>
              Settings
            </button>
          </nav>
          <div className="header-actions">
            <button className="btn btn--primary" id="quickStartBtn">Quick Start</button>
            <button className="btn btn--outline" id="previewBtn">Preview</button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard View */}
        <div id="dashboardView" className="view active">
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
                  <div className="section-actions">
                    <button className="btn btn--small btn--outline" id="newPostBtn">+ New Post</button>
                  </div>
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
                </div>
                <div className="quick-actions">
                  <button className="quick-action-btn" data-action="newPost">
                    <div className="action-icon">✏️</div>
                    <div className="action-content">
                      <h4>Create New Post</h4>
                      <p>Start writing a new blog post</p>
                    </div>
                  </button>
                  <button className="quick-action-btn" data-action="importContent">
                    <div className="action-icon">📥</div>
                    <div className="action-content">
                      <h4>Import Content</h4>
                      <p>Import from markdown or other sources</p>
                    </div>
                  </button>
                  <button className="quick-action-btn" data-action="manageSeo">
                    <div className="action-icon">🔍</div>
                    <div className="action-content">
                      <h4>SEO Optimization</h4>
                      <p>Optimize your content for search</p>
                    </div>
                  </button>
                  <button className="quick-action-btn" data-action="syncMarkdown">
                    <div className="action-icon">🔄</div>
                    <div className="action-content">
                      <h4>Sync Markdown</h4>
                      <p>Sync with your markdown files</p>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Editor View */}
        <div id="editorView" className="view">
          <div className="editor-container">
            <div className="editor-header">
              <input type="text" id="postTitle" placeholder="Enter post title..." className="title-input" />
              <div className="editor-actions">
                <button className="btn btn--outline" id="saveDraftBtn">Save Draft</button>
                <button className="btn btn--primary" id="publishBtn">Publish</button>
              </div>
            </div>
            <div className="editor-content">
              <div className="editor-toolbar">
                <button className="toolbar-btn" data-action="bold"><strong>B</strong></button>
                <button className="toolbar-btn" data-action="italic"><em>I</em></button>
                <button className="toolbar-btn" data-action="heading">H</button>
                <button className="toolbar-btn" data-action="link">🔗</button>
                <button className="toolbar-btn" data-action="image">🖼️</button>
                <button className="toolbar-btn" data-action="code">{'</>'}</button>
              </div>
              <textarea id="postContent" className="content-editor" placeholder="Start writing your post..."></textarea>
            </div>
          </div>
        </div>

        {/* Other views will be populated by JavaScript */}
        <div id="mediaView" className="view">
          <h2>Media Library</h2>
          <p>Media management coming soon...</p>
        </div>

        <div id="templatesView" className="view">
          <h2>Templates</h2>
          <p>Template selection coming soon...</p>
        </div>

        <div id="themesView" className="view">
          <h2>Themes</h2>
          <p>Theme customization coming soon...</p>
        </div>

        <div id="seoView" className="view">
          <h2>SEO Tools</h2>
          <p>SEO optimization tools coming soon...</p>
        </div>

        <div id="settingsView" className="view">
          <h2>Settings</h2>
          <p>Settings panel coming soon...</p>
        </div>
      </main>

      {/* Modals and overlays will be added by JavaScript */}
      <div id="modalContainer"></div>
    </div>
  );
}
