// src/lib/faes-web/businessIntelligence.ts
// Business Intelligence Integration for Fae Intelligence Platform

import { db } from '../firebase' // Use the SAME Firebase as Files page!
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import config from '../config'

// Use the SAME database connection as the Files page
const faesWebDb = db
console.log('✅ Business Intelligence using MAIN Firebase connection (same as Files page)')

// Types for business intelligence data
export interface FileAnalysis {
  id: string
  fileName: string
  contentType: string
  sizeBytes: number
  uploadedAt: Date
  analysisType: string
  businessCategory: string
  documentType: string
  smb_relevance: string
  summary: string
}

export interface BusinessMetrics {
  totalFiles: number
  totalAnalyses: number
  filesByCategory: Record<string, number>
  filesByDocumentType: Record<string, number>
  averageFileSize: number
  recentActivity: FileAnalysis[]
  businessInsights: string[]
}

export interface ClientDataProfile {
  userId: string
  totalFiles: number
  businessCategories: string[]
  documentTypes: string[]
  averageFileSize: number
  mostCommonContentTypes: string[]
  aiReadiness: 'low' | 'medium' | 'high'
  recommendedServices: string[]
}

export class BusinessIntelligenceService {
  
  /**
   * Get comprehensive business metrics from faes-web data
   */
  async getBusinessMetrics(): Promise<BusinessMetrics> {
    console.log('🔍 Getting business metrics from MAIN Firebase (same as Files page)...')
    
    try {
      console.log('📊 Fetching files from Firestore...')
      
      // Get files from the current structure (with fileUrl)
      const filesQuery = query(
        collection(faesWebDb, 'files'),
        orderBy('uploadedAt', 'desc'),
        limit(100)
      )
      
      const filesSnapshot = await getDocs(filesQuery)
      
      console.log(`📁 Found ${filesSnapshot.docs.length} files in main Firebase`)
      
      if (filesSnapshot.docs.length === 0) {
        console.log('⚠️ No files found - returning empty metrics instead of demo data')
        return {
          totalFiles: 0,
          totalAnalyses: 0,
          filesByCategory: {},
          filesByDocumentType: {},
          averageFileSize: 0,
          recentActivity: [],
          businessInsights: ['No files uploaded yet. Upload some files to see business intelligence.']
        }
      }
      
      const files = filesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Since we don't have analyses collection yet, create basic intelligence from files
      const filesByCategory: Record<string, number> = {}
      const filesByDocumentType: Record<string, number> = {}
      let totalSize = 0
      
      const recentActivity: FileAnalysis[] = []
      
      // Process each file and generate classification
      files.forEach(file => {
        // Generate analysis data from filename
        const analysis = this.generateBasicAnalysis(file)
        
        const category = analysis.business_category
        const docType = analysis.document_type
        
        filesByCategory[category] = (filesByCategory[category] || 0) + 1
        filesByDocumentType[docType] = (filesByDocumentType[docType] || 0) + 1
        totalSize += file.size || 0
        
        recentActivity.push({
          id: file.id,
          fileName: file.fileName,
          contentType: file.contentType,
          sizeBytes: file.size,
          uploadedAt: file.uploadedAt.toDate(),
          analysisType: 'filename_analysis_v1',
          businessCategory: category,
          documentType: docType,
          smb_relevance: analysis.smb_relevance,
          summary: analysis.summary
        })
      })
      
      // Generate business insights
      const insights = this.generateBusinessInsights(filesByCategory, filesByDocumentType, recentActivity)
      
      const metrics = {
        totalFiles: files.length,
        totalAnalyses: files.length, // Same as files since we're generating analysis from filenames
        filesByCategory,
        filesByDocumentType,
        averageFileSize: files.length > 0 ? totalSize / files.length : 0,
        recentActivity: recentActivity.slice(0, 10),
        businessInsights: insights
      }
      
      console.log('✅ Real business metrics generated:', metrics)
      return metrics
      
    } catch (error) {
      console.error('❌ Firebase access failed:', error)
      // Return empty metrics instead of demo data
      return {
        totalFiles: 0,
        totalAnalyses: 0,
        filesByCategory: {},
        filesByDocumentType: {},
        averageFileSize: 0,
        recentActivity: [],
        businessInsights: ['Error loading business intelligence. Please check the console for details.']
      }
    }
  }
  
  /**
   * Generate basic analysis data from file information
   */
  private generateBasicAnalysis(file: any) {
    const fileName = file.fileName || 'unknown'
    const contentType = file.contentType || 'unknown'
    const sizeBytes = file.size || 0
    
    // Classify document type based on filename
    const document_type = this.classifyDocumentType(fileName, contentType)
    const business_category = this.getBusinessCategory(fileName)
    const smb_relevance = this.calculateSMBRelevance(fileName, contentType)
    
    return {
      summary: `Analysis for ${fileName} - ${document_type.replace('_', ' ')} with ${smb_relevance} SMB relevance`,
      document_type,
      business_category,
      smb_relevance,
      content_type: contentType,
      size_bytes: sizeBytes,
      analysis_timestamp: new Date().toISOString()
    }
  }
  
  /**
   * Classify document type based on filename and content type
   */
  private classifyDocumentType(fileName: string, contentType: string): string {
    const fileLower = fileName.toLowerCase()
    
    if (fileLower.includes('invoice') || fileLower.includes('bill') || fileLower.includes('receipt')) {
      return 'financial_document'
    } else if (fileLower.includes('contract') || fileLower.includes('agreement') || fileLower.includes('terms')) {
      return 'legal_document'
    } else if (fileLower.includes('marketing') || fileLower.includes('strategy') || fileLower.includes('campaign')) {
      return 'marketing_document'
    } else if (fileLower.includes('report') || fileLower.includes('analysis') || fileLower.includes('summary')) {
      return 'business_report'
    } else if (fileLower.includes('proposal') || fileLower.includes('quote') || fileLower.includes('estimate')) {
      return 'sales_document'
    } else if (fileLower.includes('manual') || fileLower.includes('guide') || fileLower.includes('training')) {
      return 'operational_document'
    } else {
      return 'general_document'
    }
  }
  
  /**
   * Get business category from filename
   */
  private getBusinessCategory(fileName: string): string {
    const fileLower = fileName.toLowerCase()
    
    if (fileLower.includes('marketing') || fileLower.includes('social') || fileLower.includes('campaign')) {
      return 'marketing'
    } else if (fileLower.includes('financial') || fileLower.includes('budget') || fileLower.includes('invoice')) {
      return 'finance'
    } else if (fileLower.includes('legal') || fileLower.includes('contract') || fileLower.includes('agreement')) {
      return 'legal'
    } else if (fileLower.includes('sales') || fileLower.includes('proposal') || fileLower.includes('quote')) {
      return 'sales'
    } else if (fileLower.includes('operations') || fileLower.includes('manual') || fileLower.includes('process')) {
      return 'operations'
    } else {
      return 'general'
    }
  }
  
  /**
   * Calculate SMB business relevance
   */
  private calculateSMBRelevance(fileName: string, contentType: string): string {
    const fileLower = fileName.toLowerCase()
    
    const highValueTerms = ['contract', 'invoice', 'strategy', 'client', 'proposal']
    const mediumValueTerms = ['report', 'analysis', 'marketing', 'plan']
    
    if (highValueTerms.some(term => fileLower.includes(term))) {
      return 'high'
    } else if (mediumValueTerms.some(term => fileLower.includes(term))) {
      return 'medium'
    } else {
      return 'low'
    }
  }
  private getDemoBusinessMetrics(): BusinessMetrics {
    const demoRecentActivity: FileAnalysis[] = [
      {
        id: 'demo-1',
        fileName: 'Q4_Financial_Report.pdf',
        contentType: 'application/pdf',
        sizeBytes: 245760,
        uploadedAt: new Date('2025-06-15'),
        analysisType: 'enhanced_analysis_v1',
        businessCategory: 'finance',
        documentType: 'financial_document',
        smb_relevance: 'high',
        summary: 'Comprehensive quarterly financial analysis with strong indicators for AI automation opportunities'
      },
      {
        id: 'demo-2',
        fileName: 'Operations_Manual_v2.docx',
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        sizeBytes: 156780,
        uploadedAt: new Date('2025-06-14'),
        analysisType: 'enhanced_analysis_v1',
        businessCategory: 'operations',
        documentType: 'operational_document',
        smb_relevance: 'high',
        summary: 'Detailed operational procedures showing excellent potential for process automation'
      },
      {
        id: 'demo-3',
        fileName: 'Marketing_Strategy_2025.pptx',
        contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeBytes: 892340,
        uploadedAt: new Date('2025-06-13'),
        analysisType: 'visual_analysis_v1',
        businessCategory: 'marketing',
        documentType: 'business_report',
        smb_relevance: 'medium',
        summary: 'Strategic marketing presentation with opportunities for AI-powered content generation'
      },
      {
        id: 'demo-4',
        fileName: 'Client_Contract_Template.pdf',
        contentType: 'application/pdf',
        sizeBytes: 89450,
        uploadedAt: new Date('2025-06-12'),
        analysisType: 'enhanced_analysis_v1',
        businessCategory: 'legal',
        documentType: 'legal_document',
        smb_relevance: 'medium',
        summary: 'Standard contract template suitable for document automation and AI review'
      },
      {
        id: 'demo-5',
        fileName: 'Product_Quality_Inspection.jpg',
        contentType: 'image/jpeg',
        sizeBytes: 2456789,
        uploadedAt: new Date('2025-06-11'),
        analysisType: 'visual_analysis_v1',
        businessCategory: 'operations',
        documentType: 'operational_document',
        smb_relevance: 'high',
        summary: 'Quality inspection image with excellent potential for automated visual inspection systems'
      }
    ]
    
    return {
      totalFiles: 24,
      totalAnalyses: 22,
      filesByCategory: {
        'finance': 6,
        'operations': 8,
        'marketing': 4,
        'legal': 3,
        'general': 3
      },
      filesByDocumentType: {
        'financial_document': 6,
        'operational_document': 9,
        'business_report': 5,
        'legal_document': 3,
        'general_document': 1
      },
      averageFileSize: 456789,
      recentActivity: demoRecentActivity,
      businessInsights: [
        'Primary business focus: operations (8 files) - strong foundation for AI automation',
        'Comprehensive document management - ideal for integrated AI solutions',
        '3 high-value documents detected - strong AI implementation potential',
        'Diverse content types indicate readiness for multi-modal AI solutions',
        'Financial and operational documents suggest enterprise-level AI consulting opportunities'
      ]
    }
  }
  
  /**
   * Get client data profile for a specific user
   */
  async getClientDataProfile(userId: string): Promise<ClientDataProfile> {
    // If Firebase is not properly configured, return demo data
    if (!faesWebDb) {
      return this.getDemoClientProfile(userId)
    }

    try {
      const filesQuery = query(
        collection(faesWebDb, 'files'),
        where('userId', '==', userId),
        orderBy('uploadedAt', 'desc')
      )
      
      const analysesQuery = query(
        collection(faesWebDb, 'analyses'),
        where('userId', '==', userId),
        orderBy('generatedAt', 'desc')
      )
      
      const [filesSnapshot, analysesSnapshot] = await Promise.all([
        getDocs(filesQuery),
        getDocs(analysesQuery)
      ])
      
      const files = filesSnapshot.docs.map(doc => doc.data())
      const analyses = analysesSnapshot.docs.map(doc => doc.data())
      
      // Extract business categories and document types
      const businessCategories = new Set<string>()
      const documentTypes = new Set<string>()
      const contentTypes: Record<string, number> = {}
      let totalSize = 0
      
      analyses.forEach(analysis => {
        if (analysis.data?.business_category) {
          businessCategories.add(analysis.data.business_category)
        }
        if (analysis.data?.document_type) {
          documentTypes.add(analysis.data.document_type)
        }
      })
      
      files.forEach(file => {
        totalSize += file.sizeBytes || 0
        const contentType = file.contentType || 'unknown'
        contentTypes[contentType] = (contentTypes[contentType] || 0) + 1
      })
      
      // Determine AI readiness based on data patterns
      const aiReadiness = this.calculateAIReadiness(files, analyses)
      
      // Generate service recommendations
      const recommendedServices = this.generateServiceRecommendations(
        Array.from(businessCategories),
        Array.from(documentTypes),
        aiReadiness
      )
      
      return {
        userId,
        totalFiles: files.length,
        businessCategories: Array.from(businessCategories),
        documentTypes: Array.from(documentTypes),
        averageFileSize: files.length > 0 ? totalSize / files.length : 0,
        mostCommonContentTypes: Object.entries(contentTypes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([type]) => type),
        aiReadiness,
        recommendedServices
      }
      
    } catch (error) {
      console.warn('Firebase access failed for client profile, using demo data:', error)
      return this.getDemoClientProfile(userId)
    }
  }
  
  /**
   * Get demo client profile
   */
  private getDemoClientProfile(userId: string): ClientDataProfile {
    return {
      userId,
      totalFiles: 15,
      businessCategories: ['finance', 'operations', 'marketing'],
      documentTypes: ['financial_document', 'operational_document', 'business_report'],
      averageFileSize: 456789,
      mostCommonContentTypes: ['application/pdf', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      aiReadiness: 'high',
      recommendedServices: [
        'Custom AI Strategy Development',
        'Advanced Process Automation',
        'Financial Document AI Processing',
        'Operational Efficiency AI Tools'
      ]
    }
  }
  
  /**
   * Generate actionable business insights
   */
  private generateBusinessInsights(
    filesByCategory: Record<string, number>,
    filesByDocumentType: Record<string, number>,
    recentActivity: FileAnalysis[]
  ): string[] {
    const insights: string[] = []
    
    // Category analysis
    const topCategory = Object.entries(filesByCategory)
      .sort(([,a], [,b]) => b - a)[0]
    
    if (topCategory) {
      insights.push(`Primary business focus: ${topCategory[0]} (${topCategory[1]} files)`)
    }
    
    // Document type patterns
    const hasFinancialDocs = filesByDocumentType['financial_document'] > 0
    const hasOperationalDocs = filesByDocumentType['operational_document'] > 0
    
    if (hasFinancialDocs && hasOperationalDocs) {
      insights.push('Comprehensive document management - ideal for integrated AI solutions')
    }
    
    // Recent activity trends
    const highValueFiles = recentActivity.filter(f => f.smb_relevance === 'high').length
    if (highValueFiles > 0) {
      insights.push(`${highValueFiles} high-value documents detected - strong AI implementation potential`)
    }
    
    // AI readiness indicators
    const diverseContentTypes = new Set(recentActivity.map(f => f.contentType)).size
    if (diverseContentTypes >= 3) {
      insights.push('Diverse content types indicate readiness for multi-modal AI solutions')
    }
    
    return insights
  }
  
  /**
   * Calculate AI readiness score
   */
  private calculateAIReadiness(files: any[], analyses: any[]): 'low' | 'medium' | 'high' {
    let score = 0
    
    // File volume indicator
    if (files.length >= 10) score += 1
    if (files.length >= 50) score += 1
    
    // Content diversity
    const contentTypes = new Set(files.map(f => f.contentType))
    if (contentTypes.size >= 3) score += 1
    
    // Business document sophistication
    const businessDocs = analyses.filter(a => 
      a.data?.document_type && 
      ['financial_document', 'operational_document', 'business_report'].includes(a.data.document_type)
    )
    if (businessDocs.length >= 5) score += 1
    
    // High-value content ratio
    const highValueRatio = analyses.filter(a => a.data?.smb_relevance === 'high').length / analyses.length
    if (highValueRatio >= 0.3) score += 1
    
    if (score >= 4) return 'high'
    if (score >= 2) return 'medium'
    return 'low'
  }
  
  /**
   * Generate service recommendations based on data profile
   */
  private generateServiceRecommendations(
    categories: string[],
    documentTypes: string[],
    aiReadiness: 'low' | 'medium' | 'high'
  ): string[] {
    const recommendations: string[] = []
    
    // Base recommendations by AI readiness
    if (aiReadiness === 'high') {
      recommendations.push('Custom AI Strategy Development')
      recommendations.push('Advanced Process Automation')
    } else if (aiReadiness === 'medium') {
      recommendations.push('Hands-On AI Training Workshops')
      recommendations.push('AI Implementation & Support')
    } else {
      recommendations.push('AI Foundations Workshop')
      recommendations.push('Document Management Optimization')
    }
    
    // Category-specific recommendations
    if (categories.includes('finance')) {
      recommendations.push('Financial Document AI Processing')
    }
    if (categories.includes('operations')) {
      recommendations.push('Operational Efficiency AI Tools')
    }
    if (categories.includes('marketing')) {
      recommendations.push('Marketing Content AI Enhancement')
    }
    
    // Document type recommendations
    if (documentTypes.includes('financial_document')) {
      recommendations.push('Automated Financial Analysis')
    }
    if (documentTypes.includes('business_report')) {
      recommendations.push('Business Intelligence Dashboard')
    }
    
    return [...new Set(recommendations)] // Remove duplicates
  }
  
  /**
   * Get real-time business metrics for dashboard
   */
  async getDashboardMetrics() {
    try {
      const [businessMetrics, recentFiles] = await Promise.all([
        this.getBusinessMetrics(),
        this.getRecentFileActivity(5)
      ])
      
      return {
        ...businessMetrics,
        recentFiles,
        lastUpdated: new Date()
      }
    } catch (error) {
      console.warn('Dashboard metrics failed, using demo data:', error)
      const demoMetrics = this.getDemoBusinessMetrics()
      return {
        ...demoMetrics,
        recentFiles: demoMetrics.recentActivity.slice(0, 5),
        lastUpdated: new Date()
      }
    }
  }
  
  /**
   * Get recent file activity
   */
  private async getRecentFileActivity(limit: number = 10) {
    if (!faesWebDb) {
      return this.getDemoBusinessMetrics().recentActivity.slice(0, limit)
    }

    try {
      const filesQuery = query(
        collection(faesWebDb, 'files'),
        orderBy('uploadedAt', 'desc'),
        limit(limit)
      )
      
      const snapshot = await getDocs(filesQuery)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadedAt: doc.data().uploadedAt?.toDate()
      }))
    } catch (error) {
      console.warn('Recent file activity failed, using demo data:', error)
      return this.getDemoBusinessMetrics().recentActivity.slice(0, limit)
    }
  }
}

// Export singleton instance
export const businessIntelligence = new BusinessIntelligenceService()