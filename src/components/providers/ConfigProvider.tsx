'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { appConfig, validateConfig } from '@/lib/config'

// Fixed interface that matches our config structure
interface ConfigContextType {
  isDemoMode: boolean
  enableFaesWebIntegration: boolean
  enableRealTimeData: boolean
  contentWorkflow: string
  primaryBlogSystem: string
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  console.log('🔍 ConfigProvider starting...')
  
  useEffect(() => {
    // Use our corrected config structure
    const configValidation = validateConfig()
    if (!configValidation) {
      console.warn('Configuration warnings:', appConfig.environment)
    }
    
    console.log('🔧 Config values:')
    console.log('- isDemoMode:', appConfig.demoMode)
    console.log('- enableFaesWebIntegration:', appConfig.enableFaesWebIntegration)
    console.log('- enableRealTimeData:', appConfig.enableRealTimeData)
    
    // Simple mode detection
    if (appConfig.demoMode) {
      console.log('🎭 Running in DEMO MODE')
    } else {
      console.log('🔥 Running in PRODUCTION MODE')
      console.log('- Firebase integration:', appConfig.enableFaesWebIntegration ? 'ENABLED' : 'DISABLED')
      console.log('- Real-time data:', appConfig.enableRealTimeData ? 'ENABLED' : 'DISABLED')
    }
  }, [])

  // Provide the config values directly from our appConfig
  const configValue: ConfigContextType = {
    isDemoMode: appConfig.demoMode,
    enableFaesWebIntegration: appConfig.enableFaesWebIntegration,
    enableRealTimeData: appConfig.enableRealTimeData,
    contentWorkflow: appConfig.contentWorkflow,
    primaryBlogSystem: appConfig.primaryBlogSystem
  }

  return (
    <ConfigContext.Provider value={configValue}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
