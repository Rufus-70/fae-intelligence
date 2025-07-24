// src/lib/knowledge/knowledgeStorage.ts
// Service for storing and retrieving knowledge chunks in Firestore
// Updated to match KnowledgeMapper interfaces

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Import the interfaces from KnowledgeMapper to ensure consistency
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

export class KnowledgeStorageService {
  /**
   * Store document knowledge and its chunks in Firestore
   */
  static async storeDocumentKnowledge(documentKnowledge: DocumentKnowledge): Promise<string> {
    try {
      console.log(`💾 Storing knowledge for document: ${documentKnowledge.fileName}`)
      
      const batch = writeBatch(db)
      
      // 1. Store the main document knowledge record
      const docRef = doc(collection(db, 'knowledge_base'))
      batch.set(docRef, {
        fileName: documentKnowledge.fileName,
        originalFileId: documentKnowledge.originalFileId,
        contentType: documentKnowledge.contentType,
        summary: documentKnowledge.summary,
        keyTopics: documentKnowledge.keyTopics,
        businessValue: documentKnowledge.businessValue,
        implementationComplexity: documentKnowledge.implementationComplexity,
        targetAudience: documentKnowledge.targetAudience,
        extractedAt: documentKnowledge.extractedAt,
        chunkCount: documentKnowledge.chunks.length,
        totalWordCount: documentKnowledge.chunks.reduce((sum, chunk) => sum + chunk.metadata.wordCount, 0),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      // 2. Store individual knowledge chunks
      for (const chunk of documentKnowledge.chunks) {
        const chunkRef = doc(collection(db, 'knowledge'))
        batch.set(chunkRef, {
          documentId: docRef.id,
          originalFileId: documentKnowledge.originalFileId,
          fileName: documentKnowledge.fileName,
          content: chunk.content,
          metadata: chunk.metadata,
          embedding: chunk.embedding,
          relationships: chunk.relationships,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }
      
      // Commit the batch
      await batch.commit()
      
      console.log(`✅ Successfully stored ${documentKnowledge.chunks.length} knowledge chunks for ${documentKnowledge.fileName}`)
      return docRef.id
      
    } catch (error) {
      console.error(`❌ Error storing document knowledge:`, error)
      throw error
    }
  }

  /**
   * Get knowledge statistics
   */
  static async getKnowledgeStats(): Promise<{
    totalDocuments: number
    totalChunks: number
    chunksByCategory: { [key: string]: number }
    documentsByComplexity: { [key: string]: number }
    recentChunks: any[]
  }> {
    try {
      // Get all knowledge chunks
      const chunksSnapshot = await getDocs(collection(db, 'knowledge'))
      const totalChunks = chunksSnapshot.size
      
      // Get all knowledge base documents
      const documentsSnapshot = await getDocs(collection(db, 'knowledge_base'))
      const totalDocuments = documentsSnapshot.size
      
      // Analyze chunks by category
      const chunksByCategory: { [key: string]: number } = {}
      chunksSnapshot.docs.forEach(doc => {
        const data = doc.data()
        const category = data.metadata?.category || 'uncategorized'
        chunksByCategory[category] = (chunksByCategory[category] || 0) + 1
      })
      
      // Analyze documents by complexity
      const documentsByComplexity: { [key: string]: number } = {}
      documentsSnapshot.docs.forEach(doc => {
        const data = doc.data()
        const complexity = data.implementationComplexity || 'unknown'
        documentsByComplexity[complexity] = (documentsByComplexity[complexity] || 0) + 1
      })
      
      // Get recent chunks (simplified)
      const recentChunks: any[] = []
      
      return {
        totalDocuments,
        totalChunks,
        chunksByCategory,
        documentsByComplexity,
        recentChunks
      }
      
    } catch (error) {
      console.error(`❌ Error getting knowledge stats:`, error)
      return {
        totalDocuments: 0,
        totalChunks: 0,
        chunksByCategory: {},
        documentsByComplexity: {},
        recentChunks: []
      }
    }
  }
}

export default KnowledgeStorageService