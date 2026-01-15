'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'

const languages = [
  { code: 'en' as const, name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'es' as const, name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'fr' as const, name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'nl' as const, name: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
]

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangMenuOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const success = await login(email, password)
    setIsLoading(false)
    if (success) {
      router.push('/dashboard')
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      <div className="w-full flex">
        {/* Left Column - Image */}
        <div className="hidden lg:block w-2/5 h-screen relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Travel login"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{t('auth.login.welcomeBack')}</h2>
            <p className="text-lg opacity-90">{t('auth.login.welcomeMessage')}</p>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-3/5 h-screen overflow-y-auto">
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="w-full max-w-2xl mx-auto">
              {/* Top Controls - Back, Language, Theme */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-emerald-400 transition-colors group"
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">{t('auth.back')}</span>
                </button>
                
                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <div className="relative" ref={langMenuRef}>
                    <button
                      onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                      className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md flex items-center justify-center"
                      aria-label="Select language"
                    >
                      <img 
                        src={currentLanguage.flag} 
                        alt={currentLanguage.name}
                        className="w-5 h-5 object-cover rounded-full"
                        loading="lazy"
                      />
                    </button>
                    {isLangMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
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
                    onClick={toggleTheme}
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
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 lg:p-12 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">{t('auth.login.title')}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('auth.login.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('auth.login.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                    {t('auth.login.password')}
                  </label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
                  >
                    {t('auth.login.forgotPassword')}
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder={t('auth.login.password')}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary dark:text-emerald-500 focus:ring-primary dark:focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('auth.login.rememberMe')}
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 text-lg bg-primary dark:bg-emerald-500 text-white rounded-xl font-bold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : t('auth.login.submit')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('auth.login.noAccount')}{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
                >
                  {t('auth.login.signUp')}
                </Link>
              </p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
