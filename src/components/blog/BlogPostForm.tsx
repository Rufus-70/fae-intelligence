// src/components/blog/BlogPostForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogService } from '@/lib/blog'
import { BlogPost, BlogPostFormData, BlogCategory, BlogTag, BlogBlock } from '@/types/blog'
import { useRouter } from 'next/navigation'
import { Save, Eye, Globe, FileText, Tag, Folder, Upload, Edit, List } from 'lucide-react'
import MarkdownEditor from './MarkdownEditor'
import VisualEditor from './VisualEditor'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

interface BlogPostFormProps {
  initialData?: BlogPost
  mode: 'create' | 'edit'
}

export default function BlogPostForm({ initialData, mode }: BlogPostFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [editorMode, setEditorMode] = useState<'markdown' | 'visual'>('markdown')
  const [blocks, setBlocks] = useState<BlogBlock[]>([])
  
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    status: initialData?.status || 'draft',
    featured: initialData?.featured || false,
    seo: {
      metaTitle: initialData?.seo?.metaTitle || '',
      metaDescription: initialData?.seo?.metaDescription || '',
      focusKeyword: initialData?.seo?.focusKeyword || ''
    }
  })

  const [newTag, setNewTag] = useState('')
  const [showSEO, setShowSEO] = useState(false)

  const parseMarkdownToBlocks = (markdown: string): BlogBlock[] => {
    const processor = unified().use(remarkParse).use(remarkGfm)
    const tree = processor.parse(markdown)

    return tree.children.map((node, index) => {
      let type: BlogBlock['type'] = 'paragraph'
      let content = ''
      const attributes: BlogBlock['attributes'] = {}

      switch (node.type) {
        case 'heading':
          type = 'heading'
          attributes.level = node.depth
          content = node.children.map((c: any) => c.value).join('')
          break
        case 'list':
          type = 'list'
          attributes.ordered = node.ordered
          attributes.items = node.children.map((listItem: any) =>
            listItem.children.map((p: any) => p.children.map((t: any) => t.value).join('')).join('\n')
          )
          content = attributes.items.join('\n')
          break
        case 'code':
          type = 'code'
          attributes.language = node.lang || undefined
          content = node.value
          break
        case 'blockquote':
          type = 'quote'
          content = node.children.map((p: any) => p.children.map((t: any) => t.value).join('')).join('\n')
          break
        default:
          type = 'paragraph'
          content = node.children.map((c: any) => c.value).join('')
      }

      return {
        id: `block-${index}-${new Date().getTime()}`,
        type,
        content,
        attributes
      }
    })
  }

  const blocksToMarkdown = (blocks: BlogBlock[]): string => {
    return blocks.map(block => {
      switch (block.type) {
        case 'heading':
          return `${'#'.repeat(block.attributes?.level || 1)} ${block.content}`
        case 'list':
          return block.attributes?.items?.map((item, index) =>
            `${block.attributes?.ordered ? `${index + 1}.` : '-'} ${item}`
          ).join('\n') || ''
        case 'code':
          return `\`\`\`${block.attributes?.language || ''}\n${block.content}\n\`\`\``
        case 'quote':
          return `> ${block.content}`
        default:
          return block.content
      }
    }).join('\n\n')
  }

  const handleToggleEditor = () => {
    if (editorMode === 'markdown') {
      setBlocks(parseMarkdownToBlocks(formData.content))
      setEditorMode('visual')
    } else {
      setFormData(prev => ({ ...prev, content: blocksToMarkdown(blocks) }))
      setEditorMode('markdown')
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  const fetchCategories = async () => {
    try {
      const categoriesData = await BlogService.getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const tagsData = await BlogService.getTags()
      setTags(tagsData)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const handleSubmit = async (publishNow = false) => {
    if (!user || !formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      // First prepare the data with proper types
      const baseData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        featured: formData.featured,
        seo: formData.seo,
        status: publishNow ? 'published' as const : formData.status,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        viewCount: 0,
        author: {
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Admin',
          email: user.email || ''
        }
      }

      // Only include featuredImage if it has a value (Firebase doesn't allow undefined)
      const postData = formData.featuredImage && typeof formData.featuredImage === 'string' && formData.featuredImage.trim() !== ''
        ? { ...baseData, featuredImage: formData.featuredImage }
        : baseData

      if (editorMode === 'visual') {
        postData.contentJson = JSON.stringify(blocks)
        postData.content = blocksToMarkdown(blocks)
      }

      if (mode === 'create') {
        const postId = await BlogService.createPost(postData)
        router.push(`/dashboard/blog/edit/${postId}`)
      } else if (initialData) {
        await BlogService.updatePost(initialData.id, postData)
        router.push('/dashboard/blog')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTag = async () => {
    if (!newTag.trim() || formData.tags.includes(newTag.trim())) return

    const tagName = newTag.trim()
    
    // Add to form data
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagName]
    }))

    // Create tag if it doesn't exist
    if (!tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
      try {
        await BlogService.createTag(tagName)
        await fetchTags() // Refresh tags list
      } catch (error) {
        console.error('Error creating tag:', error)
      }
    }

    setNewTag('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const generateSlug = (title: string) => {
    return BlogService.generateSlug(title)
  }

  const handleImportTemplate = async () => {
    try {
      const response = await fetch('/blog-content-template.json')
      const templateData = await response.json()
      
      // Use the main blog post template
      const template = templateData.blogPostTemplate
      
      setFormData(prev => ({
        ...prev,
        title: template.title,
        excerpt: template.excerpt,
        content: template.content,
        category: template.category,
        tags: template.tags,
        status: template.status,
        featured: template.featured,
        seo: {
          metaTitle: template.seo.metaTitle,
          metaDescription: template.seo.metaDescription,
          focusKeyword: template.seo.focusKeyword
        }
      }))
      
      alert('Template imported successfully!')
    } catch (error) {
      console.error('Error importing template:', error)
      alert('Failed to import template. Make sure blog-content-template.json exists in the public folder.')
    }
  }

  const handleImportFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        let rawText = e.target?.result as string
        
        // Comprehensive cleanup of common formatting issues
        // Remove markdown code block markers and language identifiers
        rawText = rawText.replace(/^```[a-zA-Z]*\s*/gm, '').replace(/\s*```$/gm, '')
        rawText = rawText.replace(/^~~~[a-zA-Z]*\s*/gm, '').replace(/\s*~~~$/gm, '')
        
        // Remove standalone language identifiers like "json" on its own line
        rawText = rawText.replace(/^(json|JSON)\s*$/gm, '')
        rawText = rawText.replace(/^(json|JSON)\s*\n/gm, '')
        
        // Remove common prefixes like "Of course.", "Here's", "Sure!", etc.
        rawText = rawText.replace(/^(Of course[.,!]?|Here's[^{]*|Sure[.,!]?|Certainly[.,!]?)\s*/gmi, '')
        
        // Remove any leading text before the first { (more aggressive)
        const firstBrace = rawText.indexOf('{')
        if (firstBrace > 0) {
          rawText = rawText.substring(firstBrace)
        }
        
        // Remove any trailing text after the last } (more aggressive)
        const lastBrace = rawText.lastIndexOf('}')
        if (lastBrace >= 0) {
          rawText = rawText.substring(0, lastBrace + 1)
        }
        
        // Clean up extra whitespace and newlines
        rawText = rawText.trim()
        
        // Parse the cleaned JSON
        const jsonData = JSON.parse(rawText)
        
        // Support multiple JSON structures
        const template = jsonData.blogPostTemplate || jsonData
        
        // Handle different field name variations
        const content = template.content || template.content_markdown || ''
        const category = Array.isArray(template.category) ? template.category[0].toLowerCase().replace(/\s+/g, '-') : (template.category || '')
        const tags = Array.isArray(template.tags) ? template.tags.map((tag: string) => tag.toLowerCase().replace(/\s+/g, '-')) : (template.tags || [])
        const featured = template.featured !== undefined ? template.featured : (template.is_featured || false)
        
        // Handle SEO metadata variations
        const seoData = template.seo || template.seo_metadata || {}
        
        setFormData(prev => ({
          ...prev,
          title: template.title || '',
          excerpt: template.excerpt || '',
          content: content,
          category: category,
          tags: tags,
          status: template.status || 'draft',
          featured: featured,
          seo: {
            metaTitle: seoData.metaTitle || seoData.meta_title || '',
            metaDescription: seoData.metaDescription || seoData.meta_description || '',
            focusKeyword: seoData.focusKeyword || seoData.focus_keyword || ''
          }
        }))
        
        alert('JSON data imported successfully!')
      } catch (error) {
        console.error('Error parsing JSON:', error)
        alert('Invalid JSON file. Please check the file format.')
      }
    }
    reader.readAsText(file)
    
    // Reset input
    event.target.value = ''
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === 'create' ? 'Create New Post' : 'Edit Post'}
          </h1>
          <p className="text-gray-600">
            {formData.title ? `Slug: ${generateSlug(formData.title)}` : 'Enter a title to see the URL slug'}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          
          {mode === 'create' && (
            <>
              <Button
                variant="outline"
                onClick={handleImportTemplate}
                disabled={loading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Template
              </Button>
              
              <label className="inline-flex">
                <Button
                  variant="outline"
                  disabled={loading}
                  asChild
                >
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Import JSON
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFromFile}
                  className="hidden"
                />
              </label>
            </>
          )}
          
          <Button
            variant="outline"
            onClick={() => handleSubmit(false)}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button
            onClick={() => handleSubmit(true)}
            disabled={loading}
          >
            <Globe className="mr-2 h-4 w-4" />
            {loading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <h1>{formData.title || 'Untitled Post'}</h1>
              <p className="lead text-gray-600">{formData.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Post Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter post title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="outline"
                      onClick={handleToggleEditor}
                    >
                      {editorMode === 'markdown' ? (
                        <>
                          <List className="mr-2 h-4 w-4" />
                          Visual Editor
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Markdown Editor
                        </>
                      )}
                    </Button>
                  </div>
                  {editorMode === 'markdown' ? (
                    <MarkdownEditor
                      value={formData.content}
                      onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      placeholder="Write your post content in Markdown..."
                    />
                  ) : (
                    <VisualEditor
                      blocks={blocks}
                      onChange={setBlocks}
                    />
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {editorMode === 'markdown'
                      ? 'Use Markdown for formatting. The content will be converted to styled HTML when displayed.'
                      : 'Drag and drop blocks to reorder them.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowSEO(!showSEO)}
                >
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    SEO Settings
                    <span className="ml-auto text-sm">
                    {showSEO ? '−' : '+'}
                  </span>
                </CardTitle>
                </div>
              </CardHeader>
              {showSEO && (
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo.metaTitle}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value }
                      }))}
                      placeholder="SEO title (defaults to post title)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.seo.metaDescription}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value }
                      }))}
                      placeholder="SEO description (defaults to excerpt)"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      value={formData.seo.focusKeyword}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, focusKeyword: e.target.value }
                      }))}
                      placeholder="Primary keyword for this post"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      status: e.target.value as 'draft' | 'published' 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      featured: e.target.checked 
                    }))}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Post
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2 h-5 w-5" />
                  Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <Button onClick={handleAddTag} size="sm">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-cyan-100 text-cyan-800"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-cyan-600 hover:text-cyan-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  <p className="font-medium mb-1">Available tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {tags.filter(tag => !formData.tags.includes(tag.name)).map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, tag.name]
                        }))}
                        className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}