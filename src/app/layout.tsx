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
  title: 'Fae Intelligence - AI Made Practical for Business',
  description: 'Empowering business and operations leaders across all industries with practical AI solutions. Over 30 years of operational excellence meets cutting-edge AI technology.',
  keywords: 'AI, Business Intelligence, Artificial Intelligence, Process Optimization, Automation, Training, Cross-Industry Solutions',
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