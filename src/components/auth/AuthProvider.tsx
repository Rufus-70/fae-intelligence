'use client'

import { createContext, useContext, useState } from 'react'

interface User {
  uid: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  logOut: () => void
  signIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>({
    uid: 'dev-user-123',
    email: 'dev@example.com'
  })
  const [loading] = useState(false)

  const logOut = () => {
    console.log('Logout called')
  }

  const signIn = async (email: string, password: string) => {
    console.log('Sign in called with:', email, password)
    // Mock authentication - always succeeds in dev mode
    return Promise.resolve()
  }

  return (
    <AuthContext.Provider value={{ user, loading, logOut, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
