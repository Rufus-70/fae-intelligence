import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export interface ProcessedMarkdown {
  content: string;
  metadata: Record<string, any>;
  excerpt?: string;
  readingTime: number;
}

export async function processMarkdown(markdownContent: string): Promise<ProcessedMarkdown> {
  // Parse frontmatter
  const { data: metadata, content } = matter(markdownContent);
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkHtml, { sanitize: false })
    .use(rehypeRaw) // Allow raw HTML
    .use(rehypeHighlight) // Syntax highlighting
    .process(content);

  // Calculate reading time (average 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Generate excerpt (first 150 characters)
  const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

  return {
    content: processedContent.toString(),
    metadata,
    excerpt,
    readingTime
  };
}

export function extractFrontmatter(markdownContent: string) {
  return matter(markdownContent);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  
  return result.toString();
}
