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

const countries = [
  { code: '+1', name: 'United States', flag: 'https://flagcdn.com/w20/us.png' },
  { code: '+44', name: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: '+33', name: 'France', flag: 'https://flagcdn.com/w20/fr.png' },
  { code: '+49', name: 'Germany', flag: 'https://flagcdn.com/w20/de.png' },
  { code: '+34', name: 'Spain', flag: 'https://flagcdn.com/w20/es.png' },
  { code: '+31', name: 'Netherlands', flag: 'https://flagcdn.com/w20/nl.png' },
  { code: '+39', name: 'Italy', flag: 'https://flagcdn.com/w20/it.png' },
  { code: '+81', name: 'Japan', flag: 'https://flagcdn.com/w20/jp.png' },
  { code: '+86', name: 'China', flag: 'https://flagcdn.com/w20/cn.png' },
  { code: '+91', name: 'India', flag: 'https://flagcdn.com/w20/in.png' },
  { code: '+61', name: 'Australia', flag: 'https://flagcdn.com/w20/au.png' },
  { code: '+55', name: 'Brazil', flag: 'https://flagcdn.com/w20/br.png' },
]

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    subscribeNewsletter: false,
  })
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { signup } = useAuth()
  const router = useRouter()

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    if (isCountryOpen || isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCountryOpen, isLangMenuOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms of service')
      return
    }
    const success = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
    if (success) {
      router.push('/dashboard')
    }
  }

  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0]

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      <div className="w-full flex">
        {/* Left Column - Image */}
        <div className="hidden lg:block w-2/5 h-screen relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Travel signup"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{t('auth.signup.joinUs')}</h2>
            <p className="text-lg opacity-90">{t('auth.signup.joinMessage')}</p>
          </div>
        </div>

        {/* Right Column - Signup Form */}
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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">{t('auth.signup.title')}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('auth.signup.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {t('auth.signup.firstName')}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {t('auth.signup.lastName')}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('auth.signup.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('auth.signup.phone')}
                </label>
                <div className="flex gap-3">
                  <div className="relative" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className="px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2 min-w-[120px] transition-all"
                    >
                      <img 
                        src={selectedCountry.flag} 
                        alt={selectedCountry.name}
                        className="w-5 h-4 object-cover rounded"
                        loading="lazy"
                      />
                      <span className="text-base font-medium">{selectedCountry.code}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isCountryOpen && (
                      <div className="absolute z-10 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, countryCode: country.code }))
                              setIsCountryOpen(false)
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                          >
                            <img 
                              src={country.flag} 
                              alt={country.name}
                              className="w-5 h-4 object-cover rounded"
                              loading="lazy"
                            />
                            <span className="text-base font-medium">{country.code}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">{country.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('auth.signup.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('auth.signup.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-primary dark:focus:border-emerald-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-primary dark:text-emerald-500 focus:ring-primary dark:focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('auth.signup.agreeTerms')}{' '}
                    <Link href="/terms" className="text-primary dark:text-emerald-400 hover:underline">
                      {t('auth.signup.termsOfService')}
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="subscribeNewsletter"
                    name="subscribeNewsletter"
                    type="checkbox"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-primary dark:text-emerald-500 focus:ring-primary dark:focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('auth.signup.subscribeNewsletter')}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 text-lg bg-primary dark:bg-emerald-500 text-white rounded-xl font-bold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform"
              >
                {t('auth.signup.submit')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('auth.signup.hasAccount')}{' '}
                <Link
                  href="/login"
                  className="font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
                >
                  {t('auth.signup.signIn')}
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

export default SignupPage
