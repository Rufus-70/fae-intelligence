// src/lib/config.ts
// Environment Configuration for Fae Intelligence Platform

export const config = {
  // Environment mode
  isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Site configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Feature flags
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableFaesWebIntegration: process.env.NEXT_PUBLIC_ENABLE_FAES_WEB_INTEGRATION === 'true',
  
  // Firebase configuration for main app
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
  },
  
  // Faes-Web Firebase configuration
  faesWeb: {
    apiKey: process.env.NEXT_PUBLIC_FAES_WEB_API_KEY || 'demo-key',
    authDomain: 'faes-web.firebaseapp.com',
    projectId: 'faes-web',
    storageBucket: 'faes-web.firebasestorage.app',
    messagingSenderId: process.env.NEXT_PUBLIC_FAES_WEB_MESSAGING_SENDER_ID || 'demo-sender',
    appId: process.env.NEXT_PUBLIC_FAES_WEB_APP_ID || 'demo-app'
  },
  
  // Authentication
  auth: {
    enabled: !process.env.NEXT_PUBLIC_DEMO_MODE || process.env.NEXT_PUBLIC_DEMO_MODE !== 'true',
    providers: ['email', 'google'] as const
  },
  
  // Business intelligence
  businessIntelligence: {
    enableRealTimeData: process.env.NEXT_PUBLIC_ENABLE_FAES_WEB_INTEGRATION === 'true' && 
                        !process.env.NEXT_PUBLIC_DEMO_MODE,
    refreshInterval: 30000, // 30 seconds
    enableDemoData: process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
  },
  
  // Blog configuration
  blog: {
    enableFirestore: !process.env.NEXT_PUBLIC_DEMO_MODE || process.env.NEXT_PUBLIC_DEMO_MODE !== 'true',
    enableDemoData: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
    postsPerPage: 10,
    featuredPostsCount: 3
  }
}

// Validation helper
export function validateConfig() {
  const warnings: string[] = []
  
  if (config.isDemoMode) {
    warnings.push('Running in demo mode - using mock data')
  }
  
  if (!config.firebase.projectId && !config.isDemoMode) {
    warnings.push('Firebase project ID not configured')
  }
  
  if (!config.enableFaesWebIntegration && !config.isDemoMode) {
    warnings.push('Faes-Web integration disabled')
  }
  
  return warnings
}

// Export for use in components
export default config
