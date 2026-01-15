'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useCountUp } from '@/hooks/useCountUp'
import HeroImage from './HeroImage'
import SparkleAnimation from './SparkleAnimation'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroProps {
  onOpenLoginModal?: () => void
}

const Hero = ({ onOpenLoginModal }: HeroProps) => {
  const { elementRef: leftRef, isVisible: leftVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: rightRef, isVisible: rightVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()

  const travelersCount = useCountUp({
    end: 10000,
    duration: 3000,
    suffix: '+',
    enabled: statsVisible,
  })

  const destinationsCount = useCountUp({
    end: 360,
    duration: 3000,
    suffix: '+',
    enabled: statsVisible,
  })

  const ratingCount = useCountUp({
    end: 4.9,
    duration: 3000,
    decimals: 1,
    suffix: '★',
    enabled: statsVisible,
  })


  return (
    <section id="home" className="bg-transparent py-8 lg:py-12 min-h-screen flex items-center relative overflow-hidden">
      <SparkleAnimation />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div
            ref={leftRef}
            className={`space-y-6 scroll-slide-left-bounce ${leftVisible ? 'visible' : ''}`}
          >
            <div className="space-y-4">
              <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide">
                {t('hero.welcome')}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('hero.title')}{' '}
                <span className="text-primary dark:text-emerald-400 animate-pulse-slow">{t('hero.title.world')}</span>
              </h1>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {t('hero.feature1')}<br />
                {t('hero.feature2')}<br />
                {t('hero.feature3')}<br />
                {t('hero.feature4')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenLoginModal?.()}
                className="px-8 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t('hero.button.getStarted')}
              </button>
              <button className="px-8 py-3 bg-white dark:bg-gray-800 text-primary dark:text-emerald-400 border-2 border-primary dark:border-emerald-500 rounded-lg text-lg font-semibold hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300">
                {t('hero.button.watchDemo')}
              </button>
            </div>
            <div ref={statsRef} className="flex items-center gap-6 pt-4">
              <div>
                <div className="text-2xl font-bold text-primary dark:text-emerald-400">{travelersCount.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.travelers')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary dark:text-emerald-400">{destinationsCount.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.destinations')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary dark:text-emerald-400">{ratingCount.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.rating')}</div>
              </div>
            </div>
          </div>

          {/* Right Graphic */}
          <div
            ref={rightRef}
            className={`relative hidden lg:block scroll-slide-right-bounce ${rightVisible ? 'visible' : ''}`}
          >
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
