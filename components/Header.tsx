'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const langMenuDesktopRef = useRef<HTMLDivElement>(null)
  const langMenuMobileRef = useRef<HTMLDivElement>(null)
  const langButtonDesktopRef = useRef<HTMLButtonElement>(null)
  const langButtonMobileRef = useRef<HTMLButtonElement>(null)

  // Memoize navLinks so they update when language changes
  const navLinks = useMemo(() => [
    { label: t('nav.home'), href: '#home', key: 'nav.home' },
    { label: t('nav.about'), href: '#about', key: 'nav.about' },
    { label: t('nav.service'), href: '#services', key: 'nav.service' },
    { label: t('nav.blog'), href: '#blog', key: 'nav.blog' },
    { label: t('nav.testimonials'), href: '#testimonials', key: 'nav.testimonials' },
    { label: t('nav.contact'), href: '#contact', key: 'nav.contact' },
  ], [t, language])

  const languages = [
    { code: 'en' as const, name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'es' as const, name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'fr' as const, name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'nl' as const, name: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isLangMenuOpen) {
      const button = langButtonDesktopRef.current || langButtonMobileRef.current
      if (button) {
        const rect = button.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + 8, // 8px = mt-2
          right: window.innerWidth - rect.right
        })
      }
    }
  }, [isLangMenuOpen])

  // Close language dropdown when clicking outside
  useEffect(() => {
    if (!isLangMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Check if click is inside desktop dropdown
      if (langMenuDesktopRef.current && langMenuDesktopRef.current.contains(target)) {
        return
      }
      
      // Check if click is inside mobile dropdown
      if (langMenuMobileRef.current && langMenuMobileRef.current.contains(target)) {
        return
      }
      
      // Check if click is on the language button itself
      if (target.closest('button[aria-label="Select language"]')) {
        return
      }
      
      // Close dropdown if clicking outside
      setIsLangMenuOpen(false)
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangMenuOpen])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      // Show progress bar when scrolling starts (scrollTop > 0)
      setShowProgress(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Calculate initial progress

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerHeight = 64 // h-16 = 64px
      const targetPosition = targetElement.offsetTop - headerHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-sm z-50 transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <div className="relative">
        <nav className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center space-x-2 z-10">
            <span className="text-xl font-bold text-gray-800 dark:text-white">Travels</span>
            <svg
              className="w-5 h-5 text-primary dark:text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-emerald-400 transition-colors font-medium whitespace-nowrap text-sm xl:text-base cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3 z-10">
            {/* Language Selector */}
            <div className="relative z-[100]" ref={langMenuDesktopRef}>
              <button
                ref={langButtonDesktopRef}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsLangMenuOpen(!isLangMenuOpen)
                }}
                className="p-1 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md flex items-center justify-center"
                aria-label="Select language"
                aria-expanded={isLangMenuOpen}
              >
                <img 
                  src={currentLanguage.flag} 
                  alt={currentLanguage.name}
                  className="w-7 h-7 object-cover rounded-full"
                  loading="lazy"
                />
              </button>
              {isLangMenuOpen && (
                <div 
                  data-language-dropdown
                  className="fixed w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[100]"
                  style={{ 
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      data-language={lang.code}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setLanguage(lang.code)
                        setIsLangMenuOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-emerald-100 dark:bg-gray-700' : ''
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className="w-6 h-4 object-cover rounded-sm"
                        loading="lazy"
                      />
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleTheme()
              }}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md"
              aria-label="Toggle theme"
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
            <Link
              href="/login"
              className="px-4 xl:px-6 py-2 bg-primary dark:bg-emerald-500 text-white rounded-full font-medium hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-md text-sm xl:text-base whitespace-nowrap"
            >
              {t('header.login')}
            </Link>
            <Link
              href="/signup"
              className="px-4 xl:px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-full font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md text-sm xl:text-base whitespace-nowrap"
            >
              {t('header.signup')}
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2 z-10">
            <div className="relative z-[100]" ref={langMenuMobileRef}>
              <button
                ref={langButtonMobileRef}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsLangMenuOpen(!isLangMenuOpen)
                }}
                className="p-1 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                aria-label="Select language"
                aria-expanded={isLangMenuOpen}
              >
                <img 
                  src={currentLanguage.flag} 
                  alt={currentLanguage.name}
                  className="w-7 h-7 object-cover rounded-full"
                  loading="lazy"
                />
              </button>
              {isLangMenuOpen && (
                <div 
                  data-language-dropdown
                  className="fixed w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[100]"
                  style={{ 
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      data-language={lang.code}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setLanguage(lang.code)
                        setIsLangMenuOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-emerald-100 dark:bg-gray-700' : ''
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className="w-6 h-4 object-cover rounded-sm"
                        loading="lazy"
                      />
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleTheme()
              }}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
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
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-emerald-200 dark:border-gray-700 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-emerald-400 transition-colors font-medium py-2 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-300 dark:border-gray-700">
              <Link
                href="/login"
                className="px-4 py-2 bg-primary dark:bg-emerald-500 text-white rounded-full font-medium hover:bg-primary-dark dark:hover:bg-emerald-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.login')}
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-full font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.signup')}
              </Link>
            </div>
          </div>
        )}
        </nav>
        {/* Scroll Progress Bar */}
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 transition-opacity duration-300 ease-in-out ${showProgress ? 'opacity-100' : 'opacity-0'}`}>
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
