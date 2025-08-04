// Configuration for Fae Intelligence
// Updated: 2025-08-03 - Direct configuration for faeintelligence project
// Strategy: Visual Editor → Firebase → Website workflow

// Firebase Configuration - using values from your perfect .env.local
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCNKHt-4F_QNUpIBby5SayvvsGnRPEushM',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'faeintelligence.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'faeintelligence',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'faeintelligence.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '441512448454',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:441512448454:web:b8352b260aab853c5722c7',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-NHV8PSEDE7'
}

// Application configuration
export const appConfig = {
  projectName: 'Fae Intelligence',
  environment: process.env.NODE_ENV || 'development',
  enableFaesWebIntegration: (process.env.NEXT_PUBLIC_ENABLE_FAES_WEB_INTEGRATION || 'false') === 'true',
  contentWorkflow: process.env.CONTENT_WORKFLOW || 'visual-editor-to-firebase',
  primaryBlogSystem: process.env.PRIMARY_BLOG_SYSTEM || 'visual-editor',
  demoMode: (process.env.NEXT_PUBLIC_DEMO_MODE || 'false') === 'true',
  enableRealTimeData: true // Fix for ConfigProvider error
}

// Configuration validation function
export const validateConfig = () => {
  const isValid = firebaseConfig.projectId === 'faeintelligence' && 
                  firebaseConfig.apiKey && 
                  firebaseConfig.authDomain
  
  if (process.env.NODE_ENV === 'development' || typeof window !== 'undefined') {
    console.log('🔧 Configuration validation:', isValid ? '✅ VALID' : '❌ INVALID')
    console.log('- Project ID:', firebaseConfig.projectId)
    console.log('- Environment loading:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'SUCCESS' : 'FALLBACK')
  }
  
  return isValid
}

// Debug configuration
if (typeof window !== 'undefined') {
  console.log('⚙️ App Config:', {
    projectId: firebaseConfig.projectId,
    contentWorkflow: appConfig.contentWorkflow,
    primaryBlogSystem: appConfig.primaryBlogSystem,
    faesWebIntegration: appConfig.enableFaesWebIntegration,
    demoMode: appConfig.demoMode,
    enableRealTimeData: appConfig.enableRealTimeData
  })
}

export default { firebaseConfig, appConfig, validateConfig }
