'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [shouldRenderNotifications, setShouldRenderNotifications] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  // Handle notification panel render for exit animation
  useEffect(() => {
    if (notificationsOpen) {
      setShouldRenderNotifications(true)
    } else {
      const timer = setTimeout(() => setShouldRenderNotifications(false), 300)
      return () => clearTimeout(timer)
    }
  }, [notificationsOpen])

  const languages = [
    { code: 'en' as const, name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'es' as const, name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'fr' as const, name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'nl' as const, name: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  // Helper function to get notification icon
  const getNotificationIcon = (messageKey: string) => {
    const iconMap: Record<string, string> = {
      'dashboard.notifications.bookingConfirmed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'dashboard.notifications.paymentReceived': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'dashboard.notifications.reviewRequest': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
      'dashboard.notifications.bookingReminder': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      'dashboard.notifications.paymentPending': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      'dashboard.notifications.newMessage': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      'dashboard.notifications.bookingCancelled': 'M6 18L18 6M6 6l12 12',
      'dashboard.notifications.refundProcessed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'dashboard.notifications.flightUpdate': 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
      'dashboard.notifications.hotelCheckIn': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    }
    return iconMap[messageKey] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }

  // Helper function to get notification icon color
  const getNotificationIconColor = (messageKey: string, read: boolean) => {
    if (!read) {
      return 'text-blue-600 dark:text-blue-400'
    }
    const colorMap: Record<string, string> = {
      'dashboard.notifications.bookingConfirmed': 'text-emerald-600 dark:text-emerald-400',
      'dashboard.notifications.paymentReceived': 'text-emerald-600 dark:text-emerald-400',
      'dashboard.notifications.reviewRequest': 'text-yellow-600 dark:text-yellow-400',
      'dashboard.notifications.bookingReminder': 'text-blue-600 dark:text-blue-400',
      'dashboard.notifications.paymentPending': 'text-yellow-600 dark:text-yellow-400',
      'dashboard.notifications.newMessage': 'text-blue-600 dark:text-blue-400',
      'dashboard.notifications.bookingCancelled': 'text-red-600 dark:text-red-400',
      'dashboard.notifications.refundProcessed': 'text-emerald-600 dark:text-emerald-400',
      'dashboard.notifications.flightUpdate': 'text-blue-600 dark:text-blue-400',
      'dashboard.notifications.hotelCheckIn': 'text-purple-600 dark:text-purple-400',
    }
    return colorMap[messageKey] || 'text-gray-600 dark:text-gray-400'
  }

  // Mock notifications
  const notifications = [
    { id: 1, messageKey: 'dashboard.notifications.bookingConfirmed', messageParams: { destination: 'Paris' }, time: '2 hours ago', read: false },
    { id: 2, messageKey: 'dashboard.notifications.paymentReceived', messageParams: { destination: 'Tokyo' }, time: '5 hours ago', read: false },
    { id: 3, messageKey: 'dashboard.notifications.reviewRequest', messageParams: { destination: 'Sydney' }, time: '1 day ago', read: false },
    { id: 4, messageKey: 'dashboard.notifications.bookingReminder', messageParams: { destination: 'Paris', days: '5' }, time: '1 day ago', read: true },
    { id: 5, messageKey: 'dashboard.notifications.paymentPending', messageParams: { destination: 'Barcelona' }, time: '2 days ago', read: true },
    { id: 6, messageKey: 'dashboard.notifications.newMessage', messageParams: {}, time: '2 days ago', read: true },
    { id: 7, messageKey: 'dashboard.notifications.flightUpdate', messageParams: { destination: 'London' }, time: '3 days ago', read: true },
    { id: 8, messageKey: 'dashboard.notifications.hotelCheckIn', messageParams: { destination: 'New York' }, time: '4 days ago', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogoutConfirm = () => {
    setProfileOpen(false)
    setLogoutDialogOpen(false)
    // Navigate to home page first, then logout
    router.replace('/')
    // Logout after navigation to prevent redirect to login
    setTimeout(() => {
      logout()
    }, 100)
  }

  const handleLogoutClick = () => {
    setProfileOpen(false)
    setLogoutDialogOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Menu toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-5 h-5 rounded-sm" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setLangMenuOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                      language === lang.code ? 'bg-emerald-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                    <span className="text-sm text-gray-800 dark:text-gray-200">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {shouldRenderNotifications && (
              <>
                {/* Backdrop with blur */}
                <div
                  className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300 ${
                    notificationsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  onClick={() => setNotificationsOpen(false)}
                />
                {/* Side Panel */}
                <div className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-y-auto ${
                  notificationsOpen ? 'notification-panel-enter' : 'notification-panel-exit'
                }`}>
                  {/* Header with offset for dashboard header */}
                  <div className="pt-16 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0 bg-white dark:bg-gray-900">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.header.notifications')}</h3>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                      aria-label="Close notifications"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Notifications List */}
                  <div className="flex-1 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${getNotificationIconColor(notif.messageKey, notif.read)}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getNotificationIcon(notif.messageKey)} />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 dark:text-white">
                                {notif.messageParams && Object.keys(notif.messageParams).length > 0
                                  ? t(notif.messageKey).replace(/\{(\w+)\}/g, (_match: string, key: string) => (notif.messageParams as Record<string, string>)[key] || _match)
                                  : t(notif.messageKey)}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 p-6">
                        <p>{t('dashboard.header.noNotifications')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                alt={user?.firstName || 'User'}
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.firstName} {user?.lastName}
              </span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setProfileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboard.logout.confirmTitle') || 'Confirm Logout'}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('dashboard.logout.confirmMessage') || 'Are you sure you want to logout? You will need to login again to access your dashboard.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('dashboard.logout.cancel') || 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {t('dashboard.logout.confirm') || 'Yes, Logout'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}

export default DashboardHeader
