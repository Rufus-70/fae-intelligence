// src/components/layout/Header.tsx - Updated with Resources
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/assets/fae-logo.png" 
              alt="Fae Intelligence Hub Logo" 
              width={48} 
              height={48}
              className="rounded flex-none"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <div className="text-xl font-bold text-gray-900">Fae Intelligence</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-cyan-500 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Services
            </Link>
            
            <Link href="/consultation" className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
              Get Started
            </Link>
            
            {/* Admin Access */}
            {user ? (
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-cyan-500 transition-colors">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-cyan-500 py-2">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-500 py-2">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-cyan-500 py-2">
                Services
              </Link>
              
              <Link href="/consultation" className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors inline-block text-center mt-2">
                Get Started
              </Link>
              
              {/* Mobile Admin Access */}
              {user ? (
                <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-cyan-500 py-2">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 py-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>Admin Login</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}