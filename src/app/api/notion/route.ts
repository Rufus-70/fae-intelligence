import { NextRequest, NextResponse } from 'next/server'

// Helper function to convert unhyphenated UUID to hyphenated UUID
function formatNotionUUID(uuid: string): string {
  // Remove any existing hyphens and ensure it's exactly 32 characters
  const cleanUUID = uuid.replace(/-/g, '');
  
  if (cleanUUID.length !== 32) {
    throw new Error('Invalid UUID format: must be exactly 32 characters');
  }
  
  // Insert hyphens in the standard UUID format: 8-4-4-4-12
  return `${cleanUUID.slice(0, 8)}-${cleanUUID.slice(8, 12)}-${cleanUUID.slice(12, 16)}-${cleanUUID.slice(16, 20)}-${cleanUUID.slice(20, 32)}`;
}

export async function GET(request: NextRequest) {
  try {
    // Get Notion configuration from query params or headers
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('apiKey') || request.headers.get('x-notion-api-key')
    const databaseId = searchParams.get('databaseId') || request.headers.get('x-notion-database-id')
    const fetchContent = searchParams.get('fetchContent') === 'true'
    
    if (!apiKey || !databaseId) {
      return NextResponse.json(
        { error: 'Missing Notion API key or database ID' },
        { status: 400 }
      )
    }

    // Convert unhyphenated UUID to hyphenated UUID for Notion API
    const formattedDatabaseId = formatNotionUUID(databaseId);
    console.log(`🔍 Converting database ID: ${databaseId} → ${formattedDatabaseId}`);

    // Fetch posts from Notion database
    const response = await fetch(`https://api.notion.com/v1/databases/${formattedDatabaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Get all posts for now - we can filter on the frontend
        // The complex filter was causing property type validation errors
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending'
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Notion API error response:', errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid Notion API key. Please check your API key (should start with "ntn_", "int_", or "sk_") and make sure it has the correct permissions.');
      } else if (response.status === 404) {
        throw new Error('Notion database not found. Please check your database ID and make sure the API key has access to it.');
      } else {
        throw new Error(`Notion API error: ${response.status} - ${errorText}`)
      }
    }

    const data = await response.json()
    
    // Transform Notion data to blog post format
    const posts = await Promise.all(data.results.map(async (page: any) => {
      const properties = page.properties
      
      // Debug: Log available properties
      console.log('🔍 Available Notion properties:', Object.keys(properties))
      console.log('🔍 Status property:', properties.Status)
      console.log('🔍 Categories property:', properties.Categories)
      console.log('🔍 tags property:', properties.tags)
      
      let content = ''
      
      // Fetch full page content if requested
      if (fetchContent) {
        try {
          const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Notion-Version': '2022-06-28',
            }
          })
          
          if (contentResponse.ok) {
            const contentData = await contentResponse.json()
            content = convertNotionBlocksToMarkdown(contentData.results)
          }
        } catch (error) {
          console.error('Error fetching page content:', error)
        }
      }
      
      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
        status: properties.Status?.select?.name || 'draft',
        category: properties.Categories?.select?.name || '',
        tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
        publishedDate: properties['Published Date']?.date?.start || page.created_time,
        content: content || page.url, // Use fetched content or fallback to URL
        slug: properties.Title?.title?.[0]?.plain_text?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
        notionUrl: page.url
      }
    }))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Notion API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to fetch posts from Notion: ${errorMessage}` },
      { status: 500 }
    )
  }
}

// Helper function to convert Notion blocks to Markdown
function convertNotionBlocksToMarkdown(blocks: any[]): string {
  return blocks.map(block => {
    const blockType = block.type
    
    switch (blockType) {
      case 'paragraph':
        return convertRichTextToMarkdown(block.paragraph.rich_text) + '\n\n'
      
      case 'heading_1':
        return '# ' + convertRichTextToMarkdown(block.heading_1.rich_text) + '\n\n'
      
      case 'heading_2':
        return '## ' + convertRichTextToMarkdown(block.heading_2.rich_text) + '\n\n'
      
      case 'heading_3':
        return '### ' + convertRichTextToMarkdown(block.heading_3.rich_text) + '\n\n'
      
      case 'bulleted_list_item':
        return '- ' + convertRichTextToMarkdown(block.bulleted_list_item.rich_text) + '\n'
      
      case 'numbered_list_item':
        return '1. ' + convertRichTextToMarkdown(block.numbered_list_item.rich_text) + '\n'
      
      case 'quote':
        return '> ' + convertRichTextToMarkdown(block.quote.rich_text) + '\n\n'
      
      case 'code':
        const language = block.code.language || 'text'
        return '```' + language + '\n' + convertRichTextToMarkdown(block.code.rich_text) + '\n```\n\n'
      
      case 'image':
        const caption = block.image.caption?.[0]?.plain_text || ''
        let imageUrl = ''
        
        // Handle different image types
        if (block.image.external?.url) {
          imageUrl = block.image.external.url
        } else if (block.image.file?.url) {
          imageUrl = block.image.file.url
        } else if (block.image.type === 'file' && block.image.file?.url) {
          imageUrl = block.image.file.url
        }
        
        // Ensure image URL is accessible
        if (imageUrl) {
          // Convert Notion's temporary URLs to permanent ones if possible
          if (imageUrl.includes('secure.notion-static.com')) {
            // This is a Notion static file - should be accessible
            console.log('🔍 Found Notion image:', imageUrl)
          }
          
          return `![${caption || 'Image'}](${imageUrl})\n\n`
        } else {
          console.log('⚠️ Image block found but no URL:', block.image)
          return `![${caption || 'Image'}](image-placeholder.png)\n\n`
        }
      
      case 'divider':
        return '---\n\n'
      
      case 'table_of_contents':
        return '<!-- Table of Contents -->\n\n'
      
      case 'callout':
        const calloutIcon = block.callout.icon?.emoji || '💡'
        const calloutText = convertRichTextToMarkdown(block.callout.rich_text)
        return `> ${calloutIcon} **${calloutText}**\n\n`
      
      case 'toggle':
        const toggleText = convertRichTextToMarkdown(block.toggle.rich_text)
        return `<details>\n<summary>${toggleText}</summary>\n\n<!-- Toggle content would go here -->\n\n</details>\n\n`
      
      default:
        return ''
    }
  }).join('')
}

// Convert Notion rich text to markdown with formatting
function convertRichTextToMarkdown(richText: any[]): string {
  return richText.map(text => {
    let content = text.plain_text
    
    // Apply annotations
    if (text.annotations?.bold) {
      content = `**${content}**`
    }
    if (text.annotations?.italic) {
      content = `*${content}*`
    }
    if (text.annotations?.strikethrough) {
      content = `~~${content}~~`
    }
    if (text.annotations?.code) {
      content = `\`${content}\``
    }
    
    // Handle links
    if (text.href) {
      content = `[${content}](${text.href})`
    }
    
    return content
  }).join('')
}

// Test endpoint to verify Notion API key and create new posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, action, postData, databaseId } = body
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 })
    }

    // Handle different actions
    if (action === 'create' && postData && databaseId) {
      // Create new post in Notion
      return await createNotionPost(apiKey, databaseId, postData)
    } else {
      // Test the API key by getting user info
      return await testNotionAPIKey(apiKey)
    }
  } catch (error) {
    console.error('Notion API POST error:', error)
    return NextResponse.json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Test Notion API key
async function testNotionAPIKey(apiKey: string) {
  const response = await fetch('https://api.notion.com/v1/users/me', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Notion-Version': '2022-06-28'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Notion API test error response:', errorText)
    
    if (response.status === 401) {
      return NextResponse.json({ 
        error: 'Invalid Notion API key. Please check your API key and make sure it has the correct permissions.',
        details: errorText
      }, { status: 401 })
    } else {
      return NextResponse.json({ 
        error: `Notion API error: ${response.status}`,
        details: errorText
      }, { status: response.status })
    }
  }

  const userData = await response.json()
  return NextResponse.json({ 
    success: true, 
    message: 'API key is valid!',
    user: {
      id: userData.id,
      name: userData.name,
      type: userData.type
    }
  })
}

// Create new post in Notion
async function createNotionPost(apiKey: string, databaseId: string, postData: any) {
  try {
    // Format the database ID
    const formattedDatabaseId = formatNotionUUID(databaseId)
    
    // Generate a UUID for the post
    const postUuid = crypto.randomUUID()
    
    // Create rich content blocks from markdown
    const contentBlocks = convertMarkdownToNotionBlocks(postData.content)
    
    // Create the page in Notion
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: formattedDatabaseId },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: postData.title
                }
              }
            ]
          },
          'Status': {
            select: {
              name: postData.status || 'Draft'
            }
          },
          'Excerpt': {
            rich_text: [
              {
                text: {
                  content: postData.excerpt || ''
                }
              }
            ]
          },
          'Published Date': {
            date: {
              start: postData.publishedDate || new Date().toISOString().split('T')[0]
            }
          }
        },
        children: contentBlocks
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Notion create post error:', errorText)
      return NextResponse.json({ 
        error: `Failed to create post in Notion: ${response.status}`,
        details: errorText
      }, { status: response.status })
    }

    const createdPage = await response.json()
    return NextResponse.json({ 
      success: true, 
      message: 'Post created in Notion successfully!',
      pageId: createdPage.id,
      url: createdPage.url,
      uuid: postUuid
    })
  } catch (error) {
    console.error('Error creating Notion post:', error)
    return NextResponse.json({ 
      error: 'Failed to create post in Notion',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Convert markdown to Notion blocks for rich content
function convertMarkdownToNotionBlocks(markdown: string): any[] {
  const lines = markdown.split('\n')
  const blocks: any[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) continue
    
    // Headings
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{
            type: 'text',
            text: { content: line.substring(2) }
          }]
        }
      })
    } else if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{
            type: 'text',
            text: { content: line.substring(3) }
          }]
        }
      })
    } else if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{
            type: 'text',
            text: { content: line.substring(4) }
          }]
        }
      })
    }
    // Lists
    else if (line.startsWith('- ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{
            type: 'text',
            text: { content: line.substring(2) }
          }]
        }
      })
    } else if (line.startsWith('1. ')) {
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: [{
            type: 'text',
            text: { content: line.substring(3) }
          }]
        }
      })
    }
    // Code blocks
    else if (line.startsWith('```')) {
      const codeContent = []
      i++ // Skip the opening ```
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeContent.push(lines[i])
        i++
      }
      blocks.push({
        object: 'block',
        type: 'code',
        code: {
          rich_text: [{
            type: 'text',
            text: { content: codeContent.join('\n') }
          }],
          language: 'markdown'
        }
      })
    }
    // Images
    else if (line.match(/!\[([^\]]*)\]\(([^)]+)\)/)) {
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (match) {
        blocks.push({
          object: 'block',
          type: 'image',
          image: {
            type: 'external',
            external: {
              url: match[2]
            }
          }
        })
      }
    }
    // Links
    else if (line.match(/\[([^\]]+)\]\(([^)]+)\)/)) {
      const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (match) {
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: { content: match[1] },
              href: match[2]
            }]
          }
        })
      }
    }
    // Bold and italic text
    else if (line.includes('**') || line.includes('*')) {
      const richText = parseInlineFormatting(line)
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: richText }
      })
    }
    // Regular paragraphs
    else {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: line }
          }]
        }
      })
    }
  }
  
  return blocks
}

// Parse inline formatting (bold, italic, code)
function parseInlineFormatting(text: string): any[] {
  const richText: any[] = []
  let currentText = ''
  let i = 0
  
  while (i < text.length) {
    if (text.substring(i, i + 2) === '**') {
      if (currentText) {
        richText.push({
          type: 'text',
          text: { content: currentText }
        })
        currentText = ''
      }
      i += 2
      let boldText = ''
      while (i < text.length && text.substring(i, i + 2) !== '**') {
        boldText += text[i]
        i++
      }
      if (i < text.length) {
        richText.push({
          type: 'text',
          text: { content: boldText },
          annotations: { bold: true }
        })
        i += 2
      }
    } else if (text[i] === '*') {
      if (currentText) {
        richText.push({
          type: 'text',
          text: { content: currentText }
        })
        currentText = ''
      }
      i++
      let italicText = ''
      while (i < text.length && text[i] !== '*') {
        italicText += text[i]
        i++
      }
      if (i < text.length) {
        richText.push({
          type: 'text',
          text: { content: italicText },
          annotations: { italic: true }
        })
        i++
      }
    } else if (text[i] === '`') {
      if (currentText) {
        richText.push({
          type: 'text',
          text: { content: currentText }
        })
        currentText = ''
      }
      i++
      let codeText = ''
      while (i < text.length && text[i] !== '`') {
        codeText += text[i]
        i++
      }
      if (i < text.length) {
        richText.push({
          type: 'text',
          text: { content: codeText },
          annotations: { code: true }
        })
        i++
      }
    } else {
      currentText += text[i]
      i++
    }
  }
  
  if (currentText) {
    richText.push({
      type: 'text',
      text: { content: currentText }
    })
  }
  
  return richText
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, databaseId } = body
    
    if (!apiKey || !databaseId) {
      return NextResponse.json(
        { error: 'Missing Notion API key or database ID' },
        { status: 400 }
      )
    }

    // Convert unhyphenated UUID to hyphenated UUID for Notion API
    const formattedDatabaseId = formatNotionUUID(databaseId);
    console.log(`🔍 Converting database ID for sync: ${databaseId} → ${formattedDatabaseId}`);

    // First, fetch all published posts from Notion with full content
    const notionResponse = await fetch(`https://api.notion.com/v1/databases/${formattedDatabaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Get all posts for now - we can filter on the frontend
        // The complex filter was causing property type validation errors
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending'
          }
        ]
      })
    })

    if (!notionResponse.ok) {
      throw new Error(`Notion API error: ${notionResponse.status}`)
    }

    const notionData = await notionResponse.json()
    
    // Process each post and create markdown files
    const syncResults = []
    
    for (const page of notionData.results) {
      try {
        const properties = page.properties
        const title = properties.Title?.title?.[0]?.plain_text || 'Untitled'
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        
        // Fetch full page content
        const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Notion-Version': '2022-06-28',
          }
        })
        
        let content = ''
        if (contentResponse.ok) {
          const contentData = await contentResponse.json()
          content = convertNotionBlocksToMarkdown(contentData.results)
        }
        
        // Create markdown post data
        const postData = {
          title: title,
          excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
          content: content,
          status: 'published',
          category: properties.Categories?.select?.name || 'Uncategorized',
          tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
          publishedDate: properties['Published Date']?.date?.start || new Date().toISOString(),
          notionId: page.id,
          notionUrl: page.url
        }
        
        // Generate a slug from the title
        const postSlug = postData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        
        // Create UUID-based filename like Notion
        const postUuid = crypto.randomUUID()
        const filename = `${postUuid}_${postSlug}.md`
        
        // Save to local blog system
        const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: postSlug, // Use clean slug, not filename
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            status: postData.status,
            category: postData.category,
            tags: postData.tags,
            publishedDate: postData.publishedDate,
            notionId: postData.notionId, // Store Notion ID for reference
            notionUrl: postData.notionUrl
          })
        })
        
        if (saveResponse.ok) {
          syncResults.push({
            title,
            status: 'success',
            slug
          })
        } else {
          syncResults.push({
            title,
            status: 'error',
            error: await saveResponse.text()
          })
        }
        
      } catch (error) {
        console.error('Error processing post:', error)
        syncResults.push({
          title: 'Unknown',
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Synced ${syncResults.filter(r => r.status === 'success').length} posts`,
      results: syncResults
    })
    
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync posts from Notion' },
      { status: 500 }
    )
  }
}

