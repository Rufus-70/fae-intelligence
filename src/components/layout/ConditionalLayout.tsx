'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if the current path is a dashboard page
  const isDashboardPage = pathname.startsWith('/dashboard')
  
  if (isDashboardPage) {
    // Dashboard pages: no header/footer, full screen
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }
  
  // Public pages: include header and footer
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
