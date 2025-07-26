// src/lib/services/FaesWebIntegrationService.ts
// Integration service to bridge faes-web processing with fae-intelligence knowledge system

import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface FaesWebAnalysis {
  id: string
  fileId: string
  fileName: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  analysisType: string
  result?: any
  createdAt: any
  updatedAt: any
  [key: string]: any
}

interface KnowledgeChunk {
  id?: string
  fileId: string
  fileName: string
  chunkIndex: number
  content: string
  contentType: 'text' | 'ocr' | 'analysis' | 'metadata'
  wordCount: number
  embedding?: number[]
  metadata: {
    source: 'faes-web'
    analysisType: string
    confidence?: number
    businessRelevance?: string
    aiReadiness?: string
    [key: string]: any
  }
  tags: string[]
  category?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  createdAt: any
  updatedAt: any
}

class FaesWebIntegrationService {
  private unsubscribeListeners: (() => void)[] = []

  /**
   * Start listening for completed faes-web analyses and process them into knowledge chunks
   */
  startKnowledgeProcessingListener(): () => void {
    console.log('🔗 Starting faes-web integration service...')
    
    // Listen for completed analyses
    const analysesQuery = query(
      collection(db, 'analyses'),
      where('status', '==', 'completed'),
      orderBy('updatedAt', 'desc')
    )

    const unsubscribe = onSnapshot(analysesQuery, async (snapshot) => {
      console.log(`📊 Found ${snapshot.docs.length} completed analyses`)
      
      for (const docChange of snapshot.docChanges()) {
        if (docChange.type === 'added' || docChange.type === 'modified') {
          const analysis = {
            id: docChange.doc.id,
            ...docChange.doc.data()
          } as FaesWebAnalysis

          console.log(`🔍 Processing analysis for file: ${analysis.fileName}`)
          await this.processAnalysisIntoKnowledge(analysis)
        }
      }
    }, (error) => {
      console.error('❌ Error listening to analyses:', error)
    })

    this.unsubscribeListeners.push(unsubscribe)
    return unsubscribe
  }

  /**
   * Process a completed faes-web analysis into searchable knowledge chunks
   */
  private async processAnalysisIntoKnowledge(analysis: FaesWebAnalysis): Promise<void> {
    try {
      console.log(`🧠 Creating knowledge chunks for analysis: ${analysis.id}`)

      // Check if we already processed this analysis
      const existingChunks = await getDocs(
        query(
          collection(db, 'knowledge'),
          where('metadata.analysisId', '==', analysis.id)
        )
      )

      if (existingChunks.docs.length > 0) {
        console.log(`✅ Knowledge chunks already exist for analysis ${analysis.id}`)
        return
      }

      const chunks: Omit<KnowledgeChunk, 'id'>[] = []

      // Extract different types of content from the analysis
      if (analysis.result) {
        // 1. Text content chunks
        if (analysis.result.textContent) {
          const textChunks = this.createTextChunks(
            analysis.result.textContent,
            analysis,
            'text'
          )
          chunks.push(...textChunks)
        }

        // 2. OCR content chunks  
        if (analysis.result.ocrText) {
          const ocrChunks = this.createTextChunks(
            analysis.result.ocrText,
            analysis,
            'ocr'
          )
          chunks.push(...ocrChunks)
        }

        // 3. Analysis insights chunk
        if (analysis.result.analysis || analysis.result.insights) {
          const analysisContent = JSON.stringify({
            analysis: analysis.result.analysis,
            insights: analysis.result.insights,
            businessIntelligence: analysis.result.businessIntelligence
          }, null, 2)

          chunks.push(this.createAnalysisChunk(analysisContent, analysis))
        }

        // 4. Metadata chunk
        const metadataContent = this.createMetadataContent(analysis)
        chunks.push(this.createMetadataChunk(metadataContent, analysis))
      }

      // Save all chunks to Firestore
      console.log(`💾 Saving ${chunks.length} knowledge chunks...`)
      for (const chunk of chunks) {
        await addDoc(collection(db, 'knowledge'), {
          ...chunk,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }

      console.log(`✅ Successfully created ${chunks.length} knowledge chunks for ${analysis.fileName}`)
      
      // Update the analysis to mark it as processed for knowledge
      await updateDoc(doc(db, 'analyses', analysis.id), {
        knowledgeProcessed: true,
        knowledgeProcessedAt: serverTimestamp()
      })

    } catch (error) {
      console.error(`❌ Error processing analysis ${analysis.id} into knowledge:`, error)
    }
  }

  /**
   * Split text content into searchable chunks
   */
  private createTextChunks(
    text: string, 
    analysis: FaesWebAnalysis, 
    contentType: 'text' | 'ocr'
  ): Omit<KnowledgeChunk, 'id'>[] {
    const chunks: Omit<KnowledgeChunk, 'id'>[] = []
    const maxChunkSize = 500 // words per chunk
    const words = text.split(/\s+/)
    
    for (let i = 0; i < words.length; i += maxChunkSize) {
      const chunkWords = words.slice(i, i + maxChunkSize)
      const chunkContent = chunkWords.join(' ')
      
      if (chunkContent.trim().length > 0) {
        chunks.push({
          fileId: analysis.fileId,
          fileName: analysis.fileName,
          chunkIndex: Math.floor(i / maxChunkSize),
          content: chunkContent,
          contentType,
          wordCount: chunkWords.length,
          metadata: {
            source: 'faes-web',
            analysisType: analysis.analysisType,
            analysisId: analysis.id,
            businessRelevance: this.assessBusinessRelevance(chunkContent),
            aiReadiness: this.assessAIReadiness(chunkContent)
          },
          tags: this.extractTags(chunkContent),
          category: this.determineCategory(chunkContent),
          priority: this.determinePriority(analysis, chunkContent),
          userId: analysis.userId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }
    }

    return chunks
  }

  /**
   * Create a chunk for analysis insights and intelligence
   */
  private createAnalysisChunk(content: string, analysis: FaesWebAnalysis): Omit<KnowledgeChunk, 'id'> {
    return {
      fileId: analysis.fileId,
      fileName: analysis.fileName,
      chunkIndex: 0,
      content,
      contentType: 'analysis',
      wordCount: content.split(/\s+/).length,
      metadata: {
        source: 'faes-web',
        analysisType: analysis.analysisType,
        analysisId: analysis.id,
        businessRelevance: 'high',
        aiReadiness: 'ready'
      },
      tags: ['analysis', 'insights', 'ai-generated'],
      category: 'business-intelligence',
      priority: 'high',
      userId: analysis.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  }

  /**
   * Create a chunk for file metadata and processing info
   */
  private createMetadataChunk(content: string, analysis: FaesWebAnalysis): Omit<KnowledgeChunk, 'id'> {
    return {
      fileId: analysis.fileId,
      fileName: analysis.fileName,
      chunkIndex: 0,
      content,
      contentType: 'metadata',
      wordCount: content.split(/\s+/).length,
      metadata: {
        source: 'faes-web',
        analysisType: analysis.analysisType,
        analysisId: analysis.id,
        businessRelevance: 'medium',
        aiReadiness: 'ready'
      },
      tags: ['metadata', 'file-info'],
      category: 'system',
      priority: 'low',
      userId: analysis.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  }

  /**
   * Create metadata content string
   */
  private createMetadataContent(analysis: FaesWebAnalysis): string {
    const metadata = {
      fileName: analysis.fileName,
      fileId: analysis.fileId,
      analysisType: analysis.analysisType,
      processedAt: analysis.updatedAt,
      status: analysis.status,
      fileType: analysis.contentType || 'unknown',
      processingDuration: analysis.processingDuration || 'unknown'
    }

    return `File Metadata and Processing Information:
${Object.entries(metadata)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

This file was processed through the faes-web AI analysis pipeline and contains business-relevant information suitable for manufacturing industry applications.`
  }

  /**
   * Assess business relevance of content
   */
  private assessBusinessRelevance(content: string): string {
    const businessTerms = [
      'manufacturing', 'production', 'quality', 'process', 'efficiency',
      'cost', 'revenue', 'profit', 'operation', 'workflow', 'automation',
      'improvement', 'optimization', 'metrics', 'kpi', 'performance'
    ]

    const matches = businessTerms.filter(term => 
      content.toLowerCase().includes(term.toLowerCase())
    ).length

    if (matches >= 5) return 'high'
    if (matches >= 2) return 'medium'
    return 'low'
  }

  /**
   * Assess AI readiness of content
   */
  private assessAIReadiness(content: string): string {
    const aiTerms = [
      'data', 'analysis', 'pattern', 'trend', 'prediction', 'model',
      'algorithm', 'machine learning', 'ai', 'artificial intelligence',
      'automation', 'digital', 'technology', 'insight', 'analytics'
    ]

    const matches = aiTerms.filter(term => 
      content.toLowerCase().includes(term.toLowerCase())
    ).length

    if (matches >= 3) return 'ready'
    if (matches >= 1) return 'partial'
    return 'needs-development'
  }

  /**
   * Extract relevant tags from content
   */
  private extractTags(content: string): string[] {
    const tagMap: { [key: string]: string[] } = {
      'manufacturing': ['production', 'assembly', 'fabrication', 'manufacturing'],
      'quality': ['quality', 'defect', 'inspection', 'standard', 'compliance'],
      'process': ['process', 'workflow', 'procedure', 'method', 'technique'],
      'data': ['data', 'information', 'record', 'database', 'analytics'],
      'improvement': ['improvement', 'optimization', 'enhancement', 'efficiency'],
      'cost': ['cost', 'expense', 'budget', 'financial', 'revenue'],
      'technology': ['technology', 'digital', 'software', 'system', 'automation']
    }

    const extractedTags: string[] = []
    const lowerContent = content.toLowerCase()

    for (const [category, terms] of Object.entries(tagMap)) {
      if (terms.some(term => lowerContent.includes(term))) {
        extractedTags.push(category)
      }
    }

    return extractedTags.length > 0 ? extractedTags : ['general']
  }

  /**
   * Determine content category
   */
  private determineCategory(content: string): string {
    const lowerContent = content.toLowerCase()

    if (lowerContent.includes('financial') || lowerContent.includes('cost') || lowerContent.includes('revenue')) {
      return 'financial'
    }
    if (lowerContent.includes('quality') || lowerContent.includes('inspection') || lowerContent.includes('defect')) {
      return 'quality'
    }
    if (lowerContent.includes('process') || lowerContent.includes('workflow') || lowerContent.includes('procedure')) {
      return 'process'
    }
    if (lowerContent.includes('production') || lowerContent.includes('manufacturing') || lowerContent.includes('assembly')) {
      return 'production'
    }
    if (lowerContent.includes('data') || lowerContent.includes('analytics') || lowerContent.includes('report')) {
      return 'analytics'
    }

    return 'general'
  }

  /**
   * Determine chunk priority based on analysis and content
   */
  private determinePriority(analysis: FaesWebAnalysis, content: string): 'low' | 'medium' | 'high' | 'critical' {
    // High priority for business-critical content
    const criticalTerms = ['critical', 'urgent', 'immediate', 'priority', 'emergency']
    const highValueTerms = ['cost reduction', 'efficiency', 'improvement', 'optimization', 'revenue']
    
    const lowerContent = content.toLowerCase()
    
    if (criticalTerms.some(term => lowerContent.includes(term))) {
      return 'critical'
    }
    if (highValueTerms.some(term => lowerContent.includes(term))) {
      return 'high'
    }
    if (analysis.analysisType === 'business_intelligence') {
      return 'high'
    }
    
    return 'medium'
  }

  /**
   * Stop all listeners and clean up
   */
  stopAllListeners(): void {
    console.log('🛑 Stopping faes-web integration service...')
    this.unsubscribeListeners.forEach(unsubscribe => unsubscribe())
    this.unsubscribeListeners = []
  }

  /**
   * Get knowledge statistics
   */
  async getKnowledgeStats(): Promise<{
    totalChunks: number
    chunksByType: { [key: string]: number }
    chunksByCategory: { [key: string]: number }
    recentChunks: number
  }> {
    try {
      // Get all knowledge chunks
      const allChunks = await getDocs(collection(db, 'knowledge'))
      const totalChunks = allChunks.size

      // Group by type and category
      const chunksByType: { [key: string]: number } = {}
      const chunksByCategory: { [key: string]: number } = {}

      allChunks.docs.forEach(doc => {
        const data = doc.data()
        
        // Count by content type
        const type = data.contentType || 'unknown'
        chunksByType[type] = (chunksByType[type] || 0) + 1
        
        // Count by category
        const category = data.category || 'unknown'
        chunksByCategory[category] = (chunksByCategory[category] || 0) + 1
      })

      // Get recent chunks (last 24 hours)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      const recentChunksQuery = query(
        collection(db, 'knowledge'),
        where('createdAt', '>=', yesterday),
        orderBy('createdAt', 'desc')
      )
      const recentChunks = await getDocs(recentChunksQuery)

      return {
        totalChunks,
        chunksByType,
        chunksByCategory,
        recentChunks: recentChunks.size
      }
    } catch (error) {
      console.error('❌ Error getting knowledge stats:', error)
      return {
        totalChunks: 0,
        chunksByType: {},
        chunksByCategory: {},
        recentChunks: 0
      }
    }
  }
}

// Export singleton instance
export const faesWebIntegrationService = new FaesWebIntegrationService()
export default faesWebIntegrationService