'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { 
  LayoutDashboard, 
  Settings, 
  BarChart3,
  Menu,
  X,
  LogOut,
  Folder,
  Tag,
  Upload,
  Brain,
  FileText,
  Palette,
  Building2,
  ExternalLink,
  Edit
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logOut } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'Blog Management', 
      href: '/dashboard/blog',
      icon: FileText,
      current: pathname.startsWith('/dashboard/blog')
    },
    {
      name: 'BlogCraft Editor',
      href: '/blogcraft',
      icon: Edit,
      current: pathname === '/blogcraft'
    },
    {
      name: 'AI Assessment',
      href: '/ai-readiness-assessment',
      icon: Brain,
      current: pathname === '/ai-readiness-assessment'
    },
    {
      name: 'Files', 
      href: '/dashboard/files',
      icon: Upload,
      current: pathname === '/dashboard/files'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      current: pathname === '/dashboard/analytics'
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname === '/dashboard/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Fae Intelligence Admin</h1>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <span className="text-sm text-gray-500 mr-4">{user?.email}</span>
              <button
                onClick={() => logOut()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
