'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscribed:', email)
    setEmail('')
    alert(t('subscribe.thankYou'))
  }

  return (
    <section
      id="subscribe"
      className="bg-transparent py-8 lg:py-12"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            ref={elementRef}
            className={`text-center mb-12 scroll-flip-in ${isVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              Newsletter
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('subscribe.heading')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('subscribe.description')}
            </p>
          </div>

          {/* Subscribe Card */}
          <div className="group relative bg-transparent p-6 lg:p-8">

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  {t('subscribe.placeholder')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('subscribe.placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t('subscribe.button')}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-4">
                {t('subscribe.privacy')}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-emerald-400">50K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('subscribe.subscribers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-emerald-400">Weekly</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('subscribe.updates')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-emerald-400">Exclusive</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('subscribe.deals')}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
