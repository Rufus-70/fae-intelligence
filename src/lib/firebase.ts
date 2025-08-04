// Firebase Configuration for Fae Intelligence
// Updated: 2025-08-03 - Direct configuration for faeintelligence project
// Strategy: Visual Editor → Firebase → Website workflow
// Note: Using direct config due to Next.js environment loading issue

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Production Firebase Configuration - faeintelligence project
// Using direct values from .env.local (which contains perfect configuration)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCNKHt-4F_QNUpIBby5SayvvsGnRPEushM',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'faeintelligence.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'faeintelligence',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'faeintelligence.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '441512448454',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:441512448454:web:b8352b260aab853c5722c7',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-NHV8PSEDE7'
}

// Debug logging
if (process.env.NODE_ENV === 'development' || typeof window !== 'undefined') {
  console.log('🔥 Firebase Configuration Status:')
  console.log('- Project ID:', firebaseConfig.projectId)
  console.log('- Environment loading:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'SUCCESS' : 'USING FALLBACK')
  
  // Verify we're using the correct project
  if (firebaseConfig.projectId === 'faeintelligence') {
    console.log('✅ Using correct Firebase project: faeintelligence')
  } else {
    console.error('❌ Wrong Firebase project! Expected: faeintelligence, Got:', firebaseConfig.projectId)
  }
}

// Initialize Firebase (prevent multiple initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Analytics (only in browser)
let analytics: any = null
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app)
    console.log('✅ Firebase Analytics initialized')
  } catch (error) {
    console.warn('⚠️ Firebase Analytics initialization failed:', error)
  }
}
export { analytics }

export default app
