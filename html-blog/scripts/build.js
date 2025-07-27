// Build script for HTML blog
const fs = require('fs').promises;
const path = require('path');

class HTMLBlogBuilder {
    constructor() {
        this.buildDir = path.join(__dirname, '../build');
        this.outputDir = path.join(this.buildDir, 'generated-posts');
        this.templatesDir = path.join(__dirname, '../templates');
    }

    async init() {
        console.log('🚀 Starting HTML Blog Build Process...');
        
        try {
            // Ensure build directories exist
            await this.ensureDirectories();
            
            // Load Firebase data
            console.log('📡 Fetching data from Firebase...');
            const data = await this.fetchFirebaseData();
            
            // Generate static HTML files
            console.log('🔨 Generating static HTML files...');
            await this.generateStaticFiles(data);
            
            // Copy assets
            console.log('📦 Copying assets...');
            await this.copyAssets();
            
            // Generate sitemap
            console.log('🗺️  Generating sitemap...');
            await this.generateSitemap(data.posts);
            
            // Generate RSS feed
            console.log('📰 Generating RSS feed...');
            await this.generateRSSFeed(data.posts);
            
            console.log('✅ Build completed successfully!');
            
        } catch (error) {
            console.error('❌ Build failed:', error);
            process.exit(1);
        }
    }

    async ensureDirectories() {
        const dirs = [
            this.buildDir,
            this.outputDir,
            path.join(this.buildDir, 'assets'),
            path.join(this.buildDir, 'assets/css'),
            path.join(this.buildDir, 'assets/js'),
            path.join(this.buildDir, 'assets/images')
        ];

        for (const dir of dirs) {
            try {
                await fs.mkdir(dir, { recursive: true });
            } catch (error) {
                if (error.code !== 'EEXIST') throw error;
            }
        }
    }

    async fetchFirebaseData() {
        // Mock data for now - in real implementation, this would fetch from Firebase
        return {
            posts: [
                {
                    id: '1',
                    title: 'Getting Started with AI Automation',
                    slug: 'getting-started-ai-automation',
                    excerpt: 'Learn the fundamentals of implementing AI automation in your business processes.',
                    content: `# Getting Started with AI Automation

AI automation is transforming how businesses operate. In this comprehensive guide, we'll explore the fundamentals of implementing AI automation in your business processes.

## What is AI Automation?

AI automation combines artificial intelligence with process automation to create systems that can learn, adapt, and make decisions with minimal human intervention.

### Key Benefits:
- Increased efficiency
- Reduced errors
- Cost savings
- 24/7 operation
- Scalability

## Getting Started

1. **Assess Your Current Processes**
2. **Identify Automation Opportunities**
3. **Choose the Right Tools**
4. **Start Small and Scale**

Contact Fae Intelligence to learn how we can help you implement AI automation in your business.`,
                    category: 'ai-tools',
                    tags: ['ai', 'automation', 'business'],
                    status: 'published',
                    featured: true,
                    createdAt: new Date('2025-01-15'),
                    updatedAt: new Date('2025-01-15'),
                    viewCount: 245,
                    author: {
                        name: 'Fae Intelligence Team',
                        avatar: '/assets/images/fae-logo.png'
                    },
                    seo: {
                        metaTitle: 'Getting Started with AI Automation | Fae Intelligence',
                        metaDescription: 'Learn the fundamentals of implementing AI automation in your business processes with our comprehensive guide.',
                        focusKeyword: 'AI automation'
                    }
                },
                {
                    id: '2',
                    title: '5 AI Tools Every Small Business Needs',
                    slug: '5-ai-tools-small-business-needs',
                    excerpt: 'Discover cost-effective AI solutions that can transform your small business operations.',
                    content: `# 5 AI Tools Every Small Business Needs

Small businesses can leverage AI tools to compete with larger organizations. Here are 5 essential AI tools that can transform your operations.

## 1. Customer Service Chatbots

Automate customer support with intelligent chatbots that can handle common inquiries 24/7.

## 2. Content Generation Tools

Create marketing content, blog posts, and social media updates with AI-powered writing assistants.

## 3. Data Analytics Platforms

Gain insights from your business data with AI-driven analytics tools.

## 4. Email Marketing Automation

Personalize email campaigns and optimize send times with AI.

## 5. Inventory Management Systems

Predict demand and optimize stock levels with AI-powered forecasting.

Ready to implement these tools? Contact Fae Intelligence for personalized recommendations.`,
                    category: 'business-automation',
                    tags: ['ai-tools', 'small-business', 'automation'],
                    status: 'published',
                    featured: false,
                    createdAt: new Date('2025-01-10'),
                    updatedAt: new Date('2025-01-10'),
                    viewCount: 189,
                    author: {
                        name: 'Fae Intelligence Team',
                        avatar: '/assets/images/fae-logo.png'
                    },
                    seo: {
                        metaTitle: '5 AI Tools Every Small Business Needs | Fae Intelligence',
                        metaDescription: 'Discover cost-effective AI solutions that can transform your small business operations and help you compete.',
                        focusKeyword: 'AI tools small business'
                    }
                }
            ],
            categories: [
                {
                    id: 'ai-tools',
                    name: 'AI Tools',
                    slug: 'ai-tools',
                    description: 'Latest AI software and applications'
                },
                {
                    id: 'business-automation',
                    name: 'Business Automation',
                    slug: 'business-automation',
                    description: 'Automation solutions for business processes'
                }
            ],
            tags: [
                { id: 'ai', name: 'AI', slug: 'ai' },
                { id: 'automation', name: 'Automation', slug: 'automation' },
                { id: 'business', name: 'Business', slug: 'business' },
                { id: 'ai-tools', name: 'AI Tools', slug: 'ai-tools' },
                { id: 'small-business', name: 'Small Business', slug: 'small-business' }
            ]
        };
    }

    async generateStaticFiles(data) {
        // Generate main blog index
        await this.generateBlogIndex(data);
        
        // Generate individual post pages
        for (const post of data.posts) {
            await this.generatePostPage(post);
        }
        
        // Generate category pages
        for (const category of data.categories) {
            await this.generateCategoryPage(category, data.posts);
        }
    }

    async generateBlogIndex(data) {
        const template = await this.loadTemplate('blog-index.html');
        
        const html = template
            .replace(/{{title}}/g, 'Fae Intelligence Blog')
            .replace(/{{description}}/g, 'AI and automation insights for modern businesses')
            .replace(/{{keywords}}/g, 'AI, automation, business intelligence, technology')
            .replace(/{{url}}/g, 'https://yourdomain.com/blog')
            .replace(/{{image}}/g, 'https://yourdomain.com/assets/images/fae-og-image.png')
            .replace(/{{siteUrl}}/g, 'https://yourdomain.com');

        await fs.writeFile(path.join(this.buildDir, 'index.html'), html);
    }

    async generatePostPage(post) {
        const template = await this.loadTemplate('post-template.html');
        
        // Format dates
        const publishedDate = post.createdAt.toISOString();
        const publishedDateFormatted = post.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const modifiedDate = post.updatedAt ? post.updatedAt.toISOString() : publishedDate;
        
        // Process content
        const postContentHtml = this.markdownToHtml(post.content);
        const postImage = post.featuredImage || 'https://yourdomain.com/assets/images/fae-og-image.png';
        const postUrl = `https://yourdomain.com/post/${post.slug}/`;
        
        // Create tags array and string
        const postTagsArray = post.tags || [];
        const postTags = postTagsArray.join(', ');
        
        let html = template
            .replace(/{{postTitle}}/g, post.title)
            .replace(/{{postExcerpt}}/g, post.excerpt || '')
            .replace(/{{postTags}}/g, postTags)
            .replace(/{{postUrl}}/g, postUrl)
            .replace(/{{postImage}}/g, postImage)
            .replace(/{{authorName}}/g, post.author?.name || 'Fae Intelligence Team')
            .replace(/{{publishedDate}}/g, publishedDate)
            .replace(/{{publishedDateFormatted}}/g, publishedDateFormatted)
            .replace(/{{modifiedDate}}/g, modifiedDate)
            .replace(/{{postContentHtml}}/g, postContentHtml)
            .replace(/{{postCategory}}/g, post.category || 'General')
            .replace(/{{viewCount}}/g, post.viewCount || 0)
            .replace(/{{siteUrl}}/g, 'https://yourdomain.com');

        // Handle conditional tags section
        if (postTagsArray.length > 0) {
            const tagsHtml = postTagsArray.map(tag => `<span class="tag-badge">${tag}</span>`).join('');
            html = html.replace(/{{#if postTagsArray}}[\s\S]*?{{\/if}}/g, 
                html.match(/{{#if postTagsArray}}([\s\S]*?){{\/if}}/)[1]
                    .replace(/{{#each postTagsArray}}[\s\S]*?{{\/each}}/g, tagsHtml)
            );
        } else {
            html = html.replace(/{{#if postTagsArray}}[\s\S]*?{{\/if}}/g, '');
        }
        
        // Handle conditional excerpt
        if (post.excerpt) {
            html = html.replace(/{{#if postExcerpt}}[\s\S]*?{{\/if}}/g, 
                html.match(/{{#if postExcerpt}}([\s\S]*?){{\/if}}/)?.[1] || ''
            );
        } else {
            html = html.replace(/{{#if postExcerpt}}[\s\S]*?{{\/if}}/g, '');
        }

        // Create post directory and write file
        const postDir = path.join(this.outputDir, 'post', post.slug);
        await fs.mkdir(postDir, { recursive: true });
        await fs.writeFile(path.join(postDir, 'index.html'), html);
        
        console.log(`✅ Generated post page: /post/${post.slug}/`);
    }

    async generateCategoryPage(category, posts) {
        const categoryPosts = posts.filter(post => post.category === category.slug);
        const template = await this.loadTemplate('category-template.html');
        
        const html = template
            .replace(/{{title}}/g, `${category.name} | Fae Intelligence Blog`)
            .replace(/{{description}}/g, category.description)
            .replace(/{{categoryName}}/g, category.name)
            .replace(/{{categoryDescription}}/g, category.description)
            .replace(/{{postsCount}}/g, categoryPosts.length.toString());

        const categoryDir = path.join(this.buildDir, 'category', category.slug);
        await fs.mkdir(categoryDir, { recursive: true });
        await fs.writeFile(path.join(categoryDir, 'index.html'), html);
    }

    async copyAssets() {
        const sourceDirs = [
            { src: path.join(__dirname, '../assets'), dest: path.join(this.buildDir, 'assets') }
        ];

        for (const { src, dest } of sourceDirs) {
            await this.copyDirectory(src, dest);
        }
    }

    async copyDirectory(src, dest) {
        try {
            await fs.mkdir(dest, { recursive: true });
            const items = await fs.readdir(src);
            
            for (const item of items) {
                const srcPath = path.join(src, item);
                const destPath = path.join(dest, item);
                const stat = await fs.stat(srcPath);
                
                if (stat.isDirectory()) {
                    await this.copyDirectory(srcPath, destPath);
                } else {
                    await fs.copyFile(srcPath, destPath);
                }
            }
        } catch (error) {
            console.warn(`Warning: Could not copy ${src} to ${dest}:`, error.message);
        }
    }

    async generateSitemap(posts) {
        const urls = [
            'https://yourdomain.com/blog',
            ...posts.map(post => `https://yourdomain.com/post/${post.slug}`)
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

        await fs.writeFile(path.join(this.buildDir, 'sitemap.xml'), sitemap);
    }

    async generateRSSFeed(posts) {
        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Fae Intelligence Blog</title>
    <description>AI and automation insights for modern businesses</description>
    <link>https://yourdomain.com/blog</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
${posts.map(post => `    <item>
      <title>${post.title}</title>
      <description>${post.excerpt}</description>
      <link>https://yourdomain.com/post/${post.slug}</link>
      <guid>https://yourdomain.com/post/${post.slug}</guid>
      <pubDate>${post.createdAt.toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

        await fs.writeFile(path.join(this.buildDir, 'feed.xml'), rss);
    }

    async loadTemplate(templateName) {
        try {
            return await fs.readFile(path.join(this.templatesDir, templateName), 'utf-8');
        } catch (error) {
            // Return basic template if file doesn't exist
            return await this.getDefaultTemplate(templateName);
        }
    }

    async getDefaultTemplate(templateName) {
        if (templateName === 'post-template.html') {
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{description}}">
    <link rel="stylesheet" href="/assets/css/blog.css">
</head>
<body>
    <div class="post-container">
        <header class="post-header">
            <h1>{{postTitle}}</h1>
            <div class="post-meta">
                <span>{{postDate}}</span>
                <span>{{readingTime}} min read</span>
                <span>Category: {{postCategory}}</span>
            </div>
        </header>
        <main class="post-content">
            {{postContent}}
        </main>
        <footer class="post-footer">
            <div class="post-tags">{{postTags}}</div>
            <div class="author-info">
                <img src="{{authorAvatar}}" alt="{{authorName}}">
                <span>By {{authorName}}</span>
            </div>
        </footer>
    </div>
</body>
</html>`;
        }
        
        return '<!DOCTYPE html><html><head><title>{{title}}</title></head><body>{{content}}</body></html>';
    }

    markdownToHtml(markdown) {
        // Basic markdown to HTML conversion
        return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^(.*)$/gim, '<p>$1</p>')
            .replace(/<p><h/gim, '<h')
            .replace(/<\/h([1-6])><\/p>/gim, '</h$1>');
    }

    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    }
}

// Run the build process
if (require.main === module) {
    const builder = new HTMLBlogBuilder();
    builder.init();
}

module.exports = HTMLBlogBuilder;
