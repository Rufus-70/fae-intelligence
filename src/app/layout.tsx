import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { AuthProvider } from '@/components/auth/AuthProvider'
import ConfigProvider from '@/components/providers/ConfigProvider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Fae Intelligence - AI Made Practical for Manufacturing',
  description: 'Empowering manufacturing teams with practical AI solutions. Over 30 years of operational excellence meets cutting-edge AI technology.',
  keywords: 'AI, Manufacturing, Artificial Intelligence, Process Optimization, Predictive Maintenance, Training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ConfigProvider>
          <AuthProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}