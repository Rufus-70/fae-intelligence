// Core blog engine for HTML blog system
class BlogEngine {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 10;
        this.currentCategory = null;
        this.currentTag = null;
        this.searchTerm = '';
        this.posts = [];
        this.categories = [];
        this.tags = [];
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        this.showLoading();
        
        try {
            // Load initial data
            await this.loadCategories();
            await this.loadPosts();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Hide loading screen
            this.hideLoading();
            
            console.log('Blog engine initialized successfully');
        } catch (error) {
            console.error('Error initializing blog engine:', error);
            this.showError('Failed to load blog content');
        }
    }

    showLoading() {
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }

    showError(message) {
        const errorHtml = `
            <div class="error-container">
                <div class="error-content">
                    <h2>Oops! Something went wrong</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-button">Try Again</button>
                </div>
            </div>
        `;
        document.getElementById('blogContainer').innerHTML = errorHtml;
        this.hideLoading();
    }

    async loadCategories() {
        try {
            // Try Firebase first, fallback to demo data
            try {
                this.categories = await window.firebaseClient.getCategories();
                if (this.categories.length === 0 && window.demoData) {
                    this.categories = window.demoData.categories;
                }
            } catch (error) {
                console.log('⚠️  Using demo categories:', error.message);
                this.categories = window.demoData ? window.demoData.categories : [];
            }
            
            this.renderFooterCategories();
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async loadPosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        
        try {
            let posts = [];
            
            // Try to load from Firebase first
            try {
                if (this.searchTerm) {
                    posts = await window.firebaseClient.searchPosts(this.searchTerm, this.postsPerPage);
                } else {
                    posts = await window.firebaseClient.getPublishedPosts(
                        this.postsPerPage,
                        this.currentCategory,
                        this.currentTag
                    );
                }
                
                // If Firebase returns empty results, fall back to demo data
                if (posts.length === 0 && window.demoData) {
                    console.log('📊 Using demo data - Firebase collection might be empty');
                    posts = this.filterDemoData(window.demoData.posts);
                }
            } catch (firebaseError) {
                console.log('⚠️  Firebase unavailable, using demo data:', firebaseError.message);
                // Fall back to demo data
                if (window.demoData) {
                    posts = this.filterDemoData(window.demoData.posts);
                } else {
                    throw new Error('No data source available');
                }
            }
            
            this.posts = posts;
            this.renderPosts();
            this.renderPagination();
            
        } catch (error) {
            console.error('Error loading posts:', error);
            this.showError('Failed to load blog posts');
        } finally {
            this.isLoading = false;
        }
    }

    filterDemoData(demoPosts) {
        let filteredPosts = [...demoPosts];
        
        // Apply category filter
        if (this.currentCategory) {
            filteredPosts = filteredPosts.filter(post => post.category === this.currentCategory);
        }
        
        // Apply tag filter
        if (this.currentTag) {
            filteredPosts = filteredPosts.filter(post => 
                post.tags && post.tags.includes(this.currentTag)
            );
        }
        
        // Apply search filter
        if (this.searchTerm) {
            const searchTermLower = this.searchTerm.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTermLower) ||
                post.excerpt.toLowerCase().includes(searchTermLower) ||
                post.content.toLowerCase().includes(searchTermLower) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
            );
        }
        
        // Apply limit
        return filteredPosts.slice(0, this.postsPerPage);
    }

    renderPosts() {
        const container = document.getElementById('blogContainer');
        
        if (this.posts.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <h2>No posts found</h2>
                    <p>Try adjusting your search or browse our categories.</p>
                </div>
            `;
            return;
        }

        const postsHtml = this.posts.map(post => this.createPostCard(post)).join('');
        
        container.innerHTML = `
            <div class="posts-header">
                <h1>
                    ${this.getPageTitle()}
                    <span class="posts-count">(${this.posts.length} posts)</span>
                </h1>
                ${this.createFilterBadges()}
            </div>
            <div class="posts-grid">
                ${postsHtml}
            </div>
        `;
    }

    createPostCard(post) {
        const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const readingTime = this.calculateReadingTime(post.content);
        
        return `
            <article class="post-card" data-post-id="${post.id}">
                ${post.featuredImage ? `
                    <div class="post-image">
                        <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
                        ${post.featured ? '<span class="featured-badge">Featured</span>' : ''}
                    </div>
                ` : ''}
                
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-category">${post.category || 'General'}</span>
                        <span class="post-date">${publishDate}</span>
                        <span class="reading-time">${readingTime} min read</span>
                    </div>
                    
                    <h2 class="post-title">
                        <a href="/post/${post.slug}/" class="post-link">${post.title}</a>
                    </h2>
                    
                    <p class="post-excerpt">${post.excerpt}</p>
                    
                    <div class="post-tags">
                        ${post.tags ? post.tags.map(tag => `
                            <span class="tag" data-tag="${tag}">${tag}</span>
                        `).join('') : ''}
                    </div>
                    
                    <div class="post-actions">
                        <a href="/post/${post.slug}/" class="read-more-btn">Read More</a>
                        <div class="post-engagement">
                            <span class="view-count">${post.viewCount || 0} views</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    }

    getPageTitle() {
        if (this.searchTerm) {
            return `Search Results for "${this.searchTerm}"`;
        } else if (this.currentCategory) {
            return `${this.currentCategory} Articles`;
        } else if (this.currentTag) {
            return `Posts tagged with "${this.currentTag}"`;
        } else {
            return 'Latest Articles';
        }
    }

    createFilterBadges() {
        const badges = [];
        
        if (this.currentCategory) {
            badges.push(`
                <span class="filter-badge">
                    Category: ${this.currentCategory}
                    <button onclick="blogEngine.clearCategoryFilter()" class="remove-filter">×</button>
                </span>
            `);
        }
        
        if (this.currentTag) {
            badges.push(`
                <span class="filter-badge">
                    Tag: ${this.currentTag}
                    <button onclick="blogEngine.clearTagFilter()" class="remove-filter">×</button>
                </span>
            `);
        }
        
        if (this.searchTerm) {
            badges.push(`
                <span class="filter-badge">
                    Search: ${this.searchTerm}
                    <button onclick="blogEngine.clearSearch()" class="remove-filter">×</button>
                </span>
            `);
        }
        
        return badges.length > 0 ? `<div class="filter-badges">${badges.join('')}</div>` : '';
    }

    renderPagination() {
        const container = document.getElementById('pagination');
        // For now, simple "Load More" button
        // In a real implementation, you'd implement proper pagination with Firebase cursors
        
        if (this.posts.length >= this.postsPerPage) {
            container.innerHTML = `
                <button class="load-more-btn" onclick="blogEngine.loadMorePosts()">
                    Load More Posts
                </button>
            `;
        } else {
            container.innerHTML = '';
        }
    }

    renderFooterCategories() {
        const container = document.getElementById('footerCategories');
        const categoriesHtml = this.categories.map(category => `
            <li><a href="#" data-category="${category.slug}">${category.name}</a></li>
        `).join('');
        
        container.innerHTML = categoriesHtml;
    }

    setupEventListeners() {
        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        const searchSubmit = document.getElementById('searchSubmit');

        searchToggle.addEventListener('click', () => {
            const isVisible = searchBar.style.display === 'block';
            searchBar.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                searchInput.focus();
            }
        });

        searchSubmit.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Category and tag filters
        document.addEventListener('click', (e) => {
            if (e.target.dataset.category) {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            }
            
            if (e.target.dataset.tag) {
                e.preventDefault();
                this.filterByTag(e.target.dataset.tag);
            }
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSignup(e);
        });
    }

    async performSearch() {
        const searchInput = document.getElementById('searchInput');
        this.searchTerm = searchInput.value.trim();
        
        if (this.searchTerm) {
            this.currentPage = 1;
            await this.loadPosts();
        }
    }

    async filterByCategory(category) {
        this.currentCategory = category;
        this.currentTag = null;
        this.searchTerm = '';
        this.currentPage = 1;
        await this.loadPosts();
    }

    async filterByTag(tag) {
        this.currentTag = tag;
        this.currentCategory = null;
        this.searchTerm = '';
        this.currentPage = 1;
        await this.loadPosts();
    }

    async clearCategoryFilter() {
        this.currentCategory = null;
        await this.loadPosts();
    }

    async clearTagFilter() {
        this.currentTag = null;
        await this.loadPosts();
    }

    async clearSearch() {
        this.searchTerm = '';
        document.getElementById('searchInput').value = '';
        await this.loadPosts();
    }

    async loadMorePosts() {
        this.postsPerPage += 10;
        await this.loadPosts();
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    handleNewsletterSignup(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would integrate with your newsletter service
        console.log('Newsletter signup:', email);
        
        // Show success message
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            e.target.reset();
        }, 3000);
    }
}

// Initialize the blog engine when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogEngine = new BlogEngine();
});

// Apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}
