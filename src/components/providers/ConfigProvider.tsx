'use client'
// src/components/providers/ConfigProvider.tsx
// Configuration provider for proper initialization

import { useEffect } from 'react'
import config, { validateConfig } from '@/lib/config'
import { FaesWebIntegrationService } from '@/lib/integration/faesWebIntegration'

interface ConfigProviderProps {
  children: React.ReactNode
}

export default function ConfigProvider({ children }: ConfigProviderProps) {
  useEffect(() => {
    console.log('🔍 ConfigProvider starting...')
    
    const warnings = validateConfig()
    if (warnings.length > 0) {
      console.warn('Configuration warnings:', warnings)
    }
    
    console.log('🔧 Config values:')
    console.log('- isDemoMode:', config.isDemoMode)
    console.log('- enableFaesWebIntegration:', config.enableFaesWebIntegration)
    
    if (config.isDemoMode) {
      console.log('🎭 Running in DEMO MODE')
      console.log('- Firebase integration: DISABLED')
      console.log('- Business intelligence: DEMO DATA')
      console.log('- Blog posts: DEMO DATA')
    } else {
      console.log('🔥 Running in PRODUCTION MODE')
      console.log('- Firebase integration:', config.enableFaesWebIntegration ? 'ENABLED' : 'DISABLED')
      console.log('- Business intelligence:', config.businessIntelligence.enableRealTimeData ? 'LIVE DATA' : 'DEMO DATA')
      console.log('- Blog posts:', config.blog.enableFirestore ? 'FIRESTORE' : 'DEMO DATA')
      
      // Start faes-web integration service if enabled
      if (config.enableFaesWebIntegration) {
        console.log('🔗 Starting faes-web integration service...')
        try {
          const unsubscribe = FaesWebIntegrationService.startKnowledgeProcessingListener()
          console.log('✅ Integration service started successfully')
          
          return () => {
            console.log('🛑 Stopping faes-web integration service...')
            if (unsubscribe) {
              unsubscribe()
            }
          }
        } catch (error) {
          console.warn('⚠️ Faes-web integration service encountered an issue:', error)
          console.log('ℹ️ This is normal for public access. Integration will work when authenticated.')
        }
      } else {
        console.log('⚠️ Faes-web integration is DISABLED')
      }
    }
  }, [])

  return <>{children}</>
}