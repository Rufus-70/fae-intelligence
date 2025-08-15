#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Blog source directories
const BLOG_DIRS = {
  draft: 'docs/03-SITE-STRUCTURE/blogs/Draft',
  published: 'docs/03-SITE-STRUCTURE/blogs/Published',
  archived: 'docs/03-SITE-STRUCTURE/blogs/Archived'
};

// Output file
const OUTPUT_FILE = 'src/lib/blog-content.json';

// Blog post interface
const blogPostSchema = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  status: 'draft', // draft, published, archived
  featured: false,
  author: {
    id: 'richard-snyder',
    name: 'Richard Snyder',
    email: 'richard@faeintelligence.com'
  },
  category: 'AI Strategy',
  tags: [],
  publishedAt: null,
  createdAt: null,
  updatedAt: null,
  viewCount: 0
};

function generateSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractBlogContent(markdownContent) {
  // Method 1: Look for content boundary markers
  const startMarker = '<!-- BLOG_CONTENT_START -->';
  const endMarker = '<!-- BLOG_CONTENT_END -->';
  
  if (markdownContent.includes(startMarker) && markdownContent.includes(endMarker)) {
    const startIndex = markdownContent.indexOf(startMarker) + startMarker.length;
    const endIndex = markdownContent.indexOf(endMarker);
    return markdownContent.substring(startIndex, endIndex).trim();
  }
  
  // Method 2: Look for "(Start of Blog Post Content)" and "(End of Blog Post Content)" markers  
  const startPattern = /\*\*\(Start of Blog Post Content\)\*\*/;
  const endPattern = /\*\*\(End of Blog Post Content\)\*\*/;
  
  const startMatch = markdownContent.match(startPattern);
  const endMatch = markdownContent.match(endPattern);
  
  // Debug: Let's also try simpler string search
  const simpleStart = markdownContent.indexOf('**(Start of Blog Post Content)**');
  const simpleEnd = markdownContent.indexOf('**(End of Blog Post Content)**');
  
  if (simpleStart !== -1 && simpleEnd !== -1) {
    const startIndex = simpleStart + '**(Start of Blog Post Content)**'.length;
    const endIndex = simpleEnd;
    return markdownContent.substring(startIndex, endIndex).trim();
  }
  
  if (startMatch && endMatch) {
    const startIndex = startMatch.index + startMatch[0].length;
    const endIndex = endMatch.index;
    return markdownContent.substring(startIndex, endIndex).trim();
  }
  
  // Method 3: Stop at first major section break (for existing content)
  const sectionBreaks = [
    /\*\*\*[\s]*\n/,
    /###[\s]*\*\*Internal Notes/i,
    /###[\s]*\*\*SEO & Content Strategy/i,
    /###[\s]*\*\*Editor's Summary/i,
    /PROMPT\s+\d+\s*#+/i
  ];
  
  for (const breakPattern of sectionBreaks) {
    const match = markdownContent.match(breakPattern);
    if (match) {
      return markdownContent.substring(0, match.index).trim();
    }
  }
  
  // Fallback: For standard blog posts, return the full content
  // Only truncate if it's extremely long (more than 20,000 characters)
  if (markdownContent.length > 20000) {
    console.log(`⚠️  Content very long, truncating to 20,000 characters`);
    return markdownContent.substring(0, 20000) + '...';
  }
  
  return markdownContent;
}

function extractMetadata(filePath, content, status) {
  const { data, content: markdownContent } = matter(content);
  const filename = path.basename(filePath, '.md');
  const slug = generateSlug(filename);
  
  // Extract only the blog content (not metadata, notes, etc.)
  const blogContent = extractBlogContent(markdownContent);
  
  // Get file stats for dates
  const stats = fs.statSync(filePath);
  
  return {
    id: slug,
    title: data.title || filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: slug,
    excerpt: data.excerpt || data.description || blogContent.substring(0, 200) + '...',
    content: blogContent,
    status: status,
    featured: data.featured || false,
    author: {
      id: data.author?.id || 'richard-snyder',
      name: data.author?.name || 'Richard Snyder',
      email: data.author?.email || 'richard@faeintelligence.com'
    },
    category: data.category || 'AI Strategy',
    tags: data.tags || [],
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : (status === 'published' ? stats.mtime : null),
    createdAt: data.createdAt ? new Date(data.createdAt) : stats.birthtime,
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : stats.mtime,
    viewCount: 0
  };
}

function processBlogDirectory(dirPath, status) {
  const posts = [];
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist, skipping...`);
    return posts;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(dirPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const post = extractMetadata(filePath, content, status);
        posts.push(post);
        console.log(`✅ Processed: ${file} -> ${post.slug}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
  }
  
  return posts;
}

function generateBlogContent() {
  console.log('🚀 Starting blog content generation...');
  
  const allPosts = [];
  
  // Process each blog directory
  for (const [status, dirPath] of Object.entries(BLOG_DIRS)) {
    console.log(`\n📁 Processing ${status} posts from: ${dirPath}`);
    const posts = processBlogDirectory(dirPath, status);
    allPosts.push(...posts);
  }
  
  // Sort posts by date (newest first)
  allPosts.sort((a, b) => {
    const dateA = a.publishedAt || a.createdAt;
    const dateB = b.publishedAt || b.createdAt;
    return new Date(dateB) - new Date(dateA);
  });
  
  // Generate categories
  const categoryMap = new Map();
  allPosts.forEach(post => {
    if (post.status === 'published') {
      const existing = categoryMap.get(post.category) || { count: 0, posts: [] };
      existing.count++;
      existing.posts.push(post);
      categoryMap.set(post.category, existing);
    }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: `${name} articles and guides`,
    postCount: data.count,
    createdAt: new Date()
  }));
  
  const blogContent = {
    posts: allPosts,
    categories: categories,
    generatedAt: new Date().toISOString(),
    totalPosts: allPosts.length,
    publishedPosts: allPosts.filter(p => p.status === 'published').length,
    draftPosts: allPosts.filter(p => p.status === 'draft').length,
    archivedPosts: allPosts.filter(p => p.status === 'archived').length
  };
  
  // Write to output file
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(blogContent, null, 2));
  
  console.log(`\n🎉 Blog content generation complete!`);
  console.log(`📊 Total posts: ${blogContent.totalPosts}`);
  console.log(`✅ Published: ${blogContent.publishedPosts}`);
  console.log(`📝 Drafts: ${blogContent.draftPosts}`);
  console.log(`📦 Archived: ${blogContent.archivedPosts}`);
  console.log(`📁 Categories: ${blogContent.categories.length}`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);
  
  return blogContent;
}

// Run if called directly
if (require.main === module) {
  try {
    generateBlogContent();
  } catch (error) {
    console.error('❌ Error generating blog content:', error);
    process.exit(1);
  }
}

module.exports = { generateBlogContent };
