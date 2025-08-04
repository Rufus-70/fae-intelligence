// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDUIVyQam00tPEH0AcLFlaDcT9XSoxr-h0",
  authDomain: "faes-web.firebaseapp.com",
  projectId: "faes-web",
  storageBucket: "faes-web.firebasestorage.app",
  messagingSenderId: "837345805064",
  appId: "1:837345805064:web:0e4a42b4ada04d72dee2bd",
  measurementId: "G-R4LHD76YKL"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
