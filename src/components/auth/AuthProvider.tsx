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

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
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
