# Blog Content Templates

This folder contains JSON templates that can be imported into the blog creation form to quickly populate content.

## Available Templates

### 1. blog-content-template.json
A comprehensive template with a complete blog post about "5 Free AI Tools Every Small Manufacturer Should Know About". This includes:
- Full professional content (~3000 words)
- SEO optimization
- Multiple categories and tags
- Additional template examples
- Categories and tags data for reference

### 2. simple-blog-template.json
A basic template structure that you can easily customize:
- Simple placeholder content
- Basic SEO fields
- Standard blog structure
- Easy to modify for any topic

## How to Use

### Method 1: Import Template Button
1. Go to Dashboard → Blog → Create New Post
2. Click "Import Template" to load the comprehensive AI tools template
3. Modify the content as needed
4. Save as draft or publish

### Method 2: Import JSON File
1. Download and customize either template file
2. Go to Dashboard → Blog → Create New Post  
3. Click "Import JSON" and select your customized file
4. The form will be populated with your data

### Method 3: Manual Copy/Paste
1. Open the JSON file in a text editor
2. Copy the content you want to use
3. Manually paste into the blog form fields

## Customizing Templates

### JSON Structure
```json
{
  "title": "Your blog post title",
  "excerpt": "Brief summary (under 160 chars for SEO)",
  "content": "Full markdown content of your post",
  "category": "category-slug",
  "tags": ["tag1", "tag2", "tag3"],
  "status": "draft" or "published",
  "featured": true or false,
  "seo": {
    "metaTitle": "SEO title (under 60 chars)",
    "metaDescription": "SEO description (under 160 chars)",
    "focusKeyword": "main keyword for SEO"
  }
}
```

### Available Categories
- ai-tools
- automation
- training
- maintenance
- quality-control
- industry-trends
- case-studies
- general

### Content Writing Tips
1. **Markdown Formatting**: Use markdown syntax for formatting
2. **Headings**: Use # for H1, ## for H2, etc.
3. **Code Blocks**: Use ```language for code syntax highlighting
4. **Callouts**: Use > **Note:** for highlighted information
5. **Lists**: Use - for bullet points, 1. for numbered lists

### SEO Best Practices
- **Title**: Under 60 characters, include main keyword
- **Meta Description**: Under 160 characters, compelling summary
- **Focus Keyword**: 1-3 words that represent the main topic
- **Content**: Use focus keyword naturally throughout content
- **Headings**: Include variations of keywords in H2/H3 tags

## Examples

### Manufacturing Blog Post
Use the comprehensive template for manufacturing/AI content, or customize the simple template with manufacturing-specific content.

### General Business Post
Start with simple-blog-template.json and customize for your business topic.

### Technical Tutorial
Modify the content structure to include step-by-step instructions, code examples, and technical details.

## Need Help?

If you need assistance customizing templates or have questions about the blog system, refer to the documentation or contact support.
