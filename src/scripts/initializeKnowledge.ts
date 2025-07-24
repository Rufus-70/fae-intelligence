// src/scripts/initializeKnowledge.ts
import { KnowledgeStorageService } from '@/lib/knowledge/knowledgeStorage'

/**
 * Initialize the knowledge base with Fae Intelligence categories
 * Run this script once to set up the system categories
 */
export async function initializeKnowledgeBase() {
  try {
    console.log('🚀 Starting knowledge base initialization...')
    
    // Initialize categories based on Fae Intelligence Knowledge Hub structure
    await KnowledgeStorageService.initializeCategories()
    
    console.log('✅ Knowledge base initialization complete!')
    console.log('')
    console.log('📋 Categories created:')
    console.log('  - Project Management (project-management)')
    console.log('  - Business Strategy (business-strategy)')
    console.log('  - Curriculum Development (curriculum-development)')
    console.log('  - Marketing & Sales (marketing-sales)')
    console.log('  - Operations & Legal (operations-legal)')
    console.log('  - Financials (financials)')
    console.log('  - Technology (technology)')
    console.log('  - Client Engagements (client-engagements)')
    console.log('  - Manufacturing Knowledge (manufacturing-knowledge)')
    console.log('  - AI Applications (ai-applications)')
    console.log('  - Research & Insights (research-insights)')
    console.log('')
    console.log('🎯 You can now upload files and they will be automatically categorized!')
    
  } catch (error) {
    console.error('❌ Failed to initialize knowledge base:', error)
    throw error
  }
}

// Allow running this script directly
if (typeof window === 'undefined') {
  // Node.js environment
  initializeKnowledgeBase().catch(console.error)
}