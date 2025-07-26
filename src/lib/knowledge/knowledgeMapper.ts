// src/lib/knowledge/knowledgeMapper.ts
export interface KnowledgeChunk {
  id: string
  content: string
  metadata: {
    chunkIndex: number
    totalChunks: number
    wordCount: number
    concepts: string[]
    keywords: string[]
    category: string
    subcategory?: string
    confidenceScore: number
    pageNumber?: number
    section?: string
  }
  embedding?: number[]
  relationships: {
    similarChunks: string[]
    relatedConcepts: string[]
  }
}

export interface DocumentKnowledge {
  id: string
  fileName: string
  originalFileId: string
  contentType: string
  chunks: KnowledgeChunk[]
  summary: string
  keyTopics: string[]
  businessValue: string
  implementationComplexity: 'low' | 'medium' | 'high'
  targetAudience: string[]
  extractedAt: Date
}

// Based on Fae Intelligence Knowledge Hub structure
export const FAE_INTELLIGENCE_CATEGORIES = {
  'project-management': {
    name: 'Project Management',
    description: 'Project plans, timelines, task tracking, and organizational documents',
    subcategories: ['project-plans', 'task-tracking', 'timelines', 'organization-structure']
  },
  'business-strategy': {
    name: 'Business Strategy',
    description: 'Business plans, competitive analysis, strategic goals and positioning',
    subcategories: ['business-plans', 'competitive-analysis', 'strategic-goals', 'market-positioning']
  },
  'curriculum-development': {
    name: 'Curriculum Development',
    description: 'Training materials, workshop curricula, and educational content',
    subcategories: ['ai-kickstart-curriculum', 'operational-ai-excellence', 'workshop-materials']
  },
  'marketing-sales': {
    name: 'Marketing & Sales',
    description: 'Marketing strategies, sales materials, pricing, and promotional content',
    subcategories: ['marketing-strategy', 'website-content', 'pricing-strategy', 'sales-materials']
  },
  'operations-legal': {
    name: 'Operations & Legal',
    description: 'Operational procedures, legal documents, compliance, and business setup',
    subcategories: ['business-formation', 'legal-compliance', 'operational-procedures']
  },
  'financials': {
    name: 'Financials',
    description: 'Financial projections, budgets, cost analysis, and revenue models',
    subcategories: ['financial-projections', 'budget-planning', 'cost-analysis']
  },
  'technology': {
    name: 'Technology',
    description: 'Web development, online presence, technical documentation, and digital tools',
    subcategories: ['web-development', 'technical-documentation', 'ai-tools']
  },
  'client-engagements': {
    name: 'Client Engagements',
    description: 'Client projects, case studies, success stories, and engagement documentation',
    subcategories: ['client-projects', 'case-studies', 'success-stories']
  },
  'manufacturing-knowledge': {
    name: 'Manufacturing Knowledge',
    description: 'Manufacturing processes, industry best practices, and domain expertise',
    subcategories: ['manufacturing-processes', 'quality-control', 'lean-manufacturing']
  },
  'ai-applications': {
    name: 'AI Applications',
    description: 'Specific AI use cases, tools, and applications for manufacturing',
    subcategories: ['predictive-maintenance', 'quality-inspection', 'process-optimization']
  },
  'research-insights': {
    name: 'Research & Insights',
    description: 'Market research, industry trends, and analytical insights',
    subcategories: ['market-research', 'industry-trends', 'competitor-analysis']
  }
}

export class KnowledgeMapper {
  private static readonly CHUNK_SIZE = 1000
  private static readonly CHUNK_OVERLAP = 200
  
  static async processDocument(
    fileName: string,
    content: string,
    fileMetadata: {
      fileId: string
      contentType: string
      category?: string
      tags?: string[]
      description?: string
      priority?: string
    }
  ): Promise<DocumentKnowledge> {
    const textContent = await this.extractTextContent(content, fileMetadata.contentType)
    const chunks = this.createChunks(textContent, fileName)
    const enrichedChunks = await Promise.all(
      chunks.map(chunk => this.enrichChunk(chunk, fileMetadata))
    )
    
    return {
      id: `knowledge_${fileMetadata.fileId}`,
      fileName,
      originalFileId: fileMetadata.fileId,
      contentType: fileMetadata.contentType,
      chunks: enrichedChunks,
      summary: this.generateSummary(textContent),
      keyTopics: this.extractKeyTopics(textContent),
      businessValue: this.assessBusinessValue(textContent, fileMetadata),
      implementationComplexity: this.assessComplexity(textContent),
      targetAudience: this.identifyTargetAudience(textContent, fileMetadata),
      extractedAt: new Date()
    }
  }

  private static async extractTextContent(content: string, contentType: string): Promise<string> {
    switch (contentType) {
      case 'text/plain':
      case 'text/csv':
        return content
      case 'application/json':
        try {
          const parsed = JSON.parse(content)
          return JSON.stringify(parsed, null, 2)
        } catch {
          return content
        }
      default:
        return content
    }
  }

  private static createChunks(content: string, fileName: string): KnowledgeChunk[] {
    const words = content.split(/\s+/)
    const chunks: KnowledgeChunk[] = []
    let chunkIndex = 0
    let startIndex = 0
    
    while (startIndex < words.length) {
      const endIndex = Math.min(startIndex + this.CHUNK_SIZE, words.length)
      const chunkWords = words.slice(startIndex, endIndex)
      const chunkContent = chunkWords.join(' ')
      
      chunks.push({
        id: `${fileName}_chunk_${chunkIndex}`,
        content: chunkContent,
        metadata: {
          chunkIndex,
          totalChunks: Math.ceil(words.length / this.CHUNK_SIZE),
          wordCount: chunkWords.length,
          concepts: [],
          keywords: [],
          category: 'general',
          confidenceScore: 0
        },
        relationships: {
          similarChunks: [],
          relatedConcepts: []
        }
      })
      
      chunkIndex++
      startIndex = endIndex - this.CHUNK_OVERLAP
      if (startIndex >= words.length) break
    }
    
    return chunks
  }

  private static async enrichChunk(
    chunk: KnowledgeChunk, 
    fileMetadata: { category?: string; tags?: string[] }
  ): Promise<KnowledgeChunk> {
    chunk.metadata.keywords = this.extractKeywords(chunk.content)
    chunk.metadata.concepts = this.extractConcepts(chunk.content)
    
    const classification = this.classifyChunk(chunk.content, fileMetadata)
    chunk.metadata.category = classification.category
    chunk.metadata.subcategory = classification.subcategory
    chunk.metadata.confidenceScore = classification.confidence
    chunk.metadata.section = this.detectSection(chunk.content)
    
    return chunk
  }

  private static extractKeywords(content: string): string[] {
    const terms = [
      'manufacturing', 'production', 'quality', 'process', 'efficiency',
      'artificial intelligence', 'machine learning', 'ai', 'automation',
      'strategy', 'revenue', 'training', 'workshop', 'curriculum'
    ]
    
    const lowerContent = content.toLowerCase()
    return terms.filter(term => lowerContent.includes(term.toLowerCase())).slice(0, 10)
  }

  private static extractConcepts(content: string): string[] {
    const concepts: string[] = []
    const patterns = [
      /(?:implement|implementing)\s+([a-zA-Z\s]+?)(?:\.|,|;|$)/gi,
      /(?:improve|improving)\s+([a-zA-Z\s]+?)(?:\.|,|;|$)/gi
    ]
    
    patterns.forEach(pattern => {
      const matches = content.matchAll(pattern)
      for (const match of matches) {
        if (match[1] && match[1].trim().length > 3) {
          concepts.push(match[1].trim().toLowerCase())
        }
      }
    })
    
    return [...new Set(concepts)].slice(0, 5)
  }

  private static classifyChunk(
    content: string, 
    fileMetadata: { category?: string }
  ): { category: string; subcategory?: string; confidence: number } {
    const lowerContent = content.toLowerCase()
    
    if (fileMetadata.category) {
      const category = Object.keys(FAE_INTELLIGENCE_CATEGORIES).find(key => 
        (FAE_INTELLIGENCE_CATEGORIES as any)[key].name.toLowerCase().includes(fileMetadata.category!.toLowerCase())
      )
      if (category) return { category, confidence: 0.8 }
    }
    
    const classifications = [
      {
        category: 'curriculum-development',
        keywords: ['training', 'workshop', 'curriculum', 'module'],
        confidence: 0.9
      },
      {
        category: 'ai-applications',
        keywords: ['predictive maintenance', 'condition monitoring'],
        confidence: 0.95
      },
      {
        category: 'manufacturing-knowledge',
        keywords: ['quality control', 'inspection', 'defects'],
        confidence: 0.9
      }
    ]
    
    let bestMatch = { category: 'general', confidence: 0 }
    
    classifications.forEach(classification => {
      const score = classification.keywords.reduce((acc, keyword) => {
        return acc + (lowerContent.includes(keyword) ? 1 : 0)
      }, 0) / classification.keywords.length
      
      if (score * classification.confidence > bestMatch.confidence) {
        bestMatch = { category: classification.category, confidence: score * classification.confidence }
      }
    })
    
    return bestMatch
  }

  private static detectSection(content: string): string | undefined {
    const patterns = [/^#\s+(.+)$/m, /^\d+\.\s+(.+)$/m]
    for (const pattern of patterns) {
      const match = content.match(pattern)
      if (match) return match[1]?.trim()
    }
    return undefined
  }

  private static generateSummary(content: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const summary = sentences.slice(0, 3).join('. ')
    return summary.length > 300 ? summary.substring(0, 297) + '...' : summary
  }

  private static extractKeyTopics(content: string): string[] {
    const patterns = [
      /(?:topic|subject):\s*([^.\n]+)/gi,
      /(?:covers|discusses)\s+([^.\n,]+)/gi
    ]
    
    const topics: string[] = []
    patterns.forEach(pattern => {
      const matches = content.matchAll(pattern)
      for (const match of matches) {
        if (match[1]) topics.push(match[1].trim())
      }
    })
    
    return [...new Set(topics)].slice(0, 5)
  }

  private static assessBusinessValue(content: string, fileMetadata: { priority?: string }): string {
    if (fileMetadata.priority === 'critical') return 'Critical business impact'
    if (fileMetadata.priority === 'high') return 'High business value'
    
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes('revenue')) return 'High financial impact'
    if (lowerContent.includes('efficiency')) return 'Operational improvement potential'
    if (lowerContent.includes('training')) return 'Knowledge and capability building'
    
    return 'Standard business value'
  }

  private static assessComplexity(content: string): 'low' | 'medium' | 'high' {
    const lowerContent = content.toLowerCase()
    const highTerms = ['algorithm', 'programming', 'api']
    const mediumTerms = ['implementation', 'configuration', 'automation']
    
    const highScore = highTerms.reduce((acc, term) => acc + (lowerContent.includes(term) ? 1 : 0), 0)
    const mediumScore = mediumTerms.reduce((acc, term) => acc + (lowerContent.includes(term) ? 1 : 0), 0)
    
    if (highScore >= 2) return 'high'
    if (mediumScore >= 2 || highScore >= 1) return 'medium'
    return 'low'
  }

  private static identifyTargetAudience(content: string, fileMetadata: { tags?: string[] }): string[] {
    const lowerContent = content.toLowerCase()
    const audienceMap = {
      'operations-managers': ['operations manager', 'plant manager'],
      'quality-professionals': ['quality', 'qc', 'qa'],
      'executives': ['ceo', 'vp', 'director', 'executive'],
      'general-workforce': ['employee', 'worker', 'staff']
    }
    
    const audiences: string[] = []
    Object.entries(audienceMap).forEach(([audience, keywords]) => {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        audiences.push(audience)
      }
    })
    
    return audiences.length > 0 ? audiences : ['general-workforce']
  }
}