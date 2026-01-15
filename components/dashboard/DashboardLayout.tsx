'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only redirect to login if user is unauthenticated AND still on a dashboard route
    // Don't redirect if user is navigating away (e.g., during logout)
    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
      // Small delay to allow navigation to complete first
      const timer = setTimeout(() => {
        if (pathname.startsWith('/dashboard')) {
          router.push('/login')
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, router, pathname])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <DashboardSidebar sidebarOpen={sidebarOpen} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${
          sidebarOpen 
            ? 'lg:ml-64' 
            : 'lg:ml-20'
        } flex flex-col min-h-0 w-full`}>
          <div className="p-4 lg:p-8 flex-1 flex flex-col min-h-0 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
