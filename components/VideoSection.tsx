'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import AIVideo from './AIVideo'
import { useLanguage } from '@/contexts/LanguageContext'

const VideoSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()

  return (
    <section id="video" className="bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent dark:via-emerald-950/20 py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={elementRef}
          className={`text-center space-y-8 scroll-fade-in ${isVisible ? 'visible' : ''}`}
        >
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide">
              {t('video.badge')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {t('video.title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t('video.description')}
            </p>
          </div>

          {/* Video Container */}
          <div className="max-w-6xl mx-auto">
            <AIVideo className="w-full" />
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('video.feature1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{t('video.feature2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('video.feature3')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
