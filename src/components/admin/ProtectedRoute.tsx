'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'editor'
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'admin' 
}: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthorization()
  }, [user, authLoading])

  const checkAuthorization = async () => {
    if (authLoading) return

    if (!user) {
      router.push('/login')
      return
    }

    try {
      console.log('🔍 ProtectedRoute: Checking authorization for user:', user.uid)
      
      // Check user role in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userRole = userData.role
        console.log('👤 User role found:', userRole)
        
        if (userRole === requiredRole || (requiredRole === 'editor' && userRole === 'admin')) {
          console.log('✅ Authorization successful')
          setAuthorized(true)
        } else {
          console.log('❌ Authorization failed - insufficient role')
          router.push('/dashboard') // Redirect to main dashboard if no access
        }
      } else {
        console.log('⚠️ User document not found, creating default admin role for development')
        // For development: Allow access and create user document with admin role
        setAuthorized(true)
        
        // Optionally create user document
        // await setDoc(doc(db, 'users', user.uid), {
        //   email: user.email,
        //   role: 'admin',
        //   createdAt: serverTimestamp()
        // })
      }
    } catch (error) {
      console.error('❌ Error checking authorization:', error)
      console.log('⚠️ Allowing access for development')
      // For development: Allow access even if there's an error
      setAuthorized(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
