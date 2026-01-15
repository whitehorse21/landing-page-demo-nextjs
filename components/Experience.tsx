'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import ExperienceImage from './ExperienceImage'
import { useLanguage } from '@/contexts/LanguageContext'

const Experience = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: infoRef, isVisible: infoVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()

  const stats = [
    { value: '10+', labelKey: 'experience.stats.years', icon: '📅', color: 'from-blue-500 to-blue-600' },
    { value: '360+', labelKey: 'experience.stats.destinations', icon: '🌍', color: 'from-emerald-500 to-teal-600' },
    { value: '60K+', labelKey: 'experience.stats.travelers', icon: '😊', color: 'from-purple-500 to-pink-600' },
  ]

  const features = [
    { 
      text: 'Verified and trusted travel partners worldwide', 
      icon: '✓',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Trusted Partners'
    },
    { 
      text: 'Comprehensive travel insurance options', 
      icon: '✓',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Travel Insurance'
    },
    { 
      text: 'Best price guarantee on all bookings', 
      icon: '✓',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Best Price'
    },
  ]

  return (
    <section id="experience" className="bg-transparent py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-slide-right-continuous ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              {t('experience.title')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('experience.heading')}{' '}
              <span className="text-primary dark:text-emerald-400">{t('experience.heading.serve')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('experience.description')}
            </p>
          </div>

          {/* Image & Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Image */}
            <div
              ref={imageRef}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 scroll-slide-right-continuous ${imageVisible ? 'visible' : ''}`}
            >
              <div className="relative h-full">
                <ExperienceImage />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className={`flex flex-col gap-4 scroll-slide-right-continuous ${statsVisible ? 'visible' : ''}`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {t(stat.labelKey)}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Features */}
          <div
            ref={infoRef}
            className={`scroll-slide-right-continuous ${infoVisible ? 'visible' : ''}`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('experience.trust.title')}
              </h3>
            </div>
            <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 scroll-carousel-stagger ${infoVisible ? 'visible' : ''}`}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary dark:from-emerald-500 to-emerald-600 dark:to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {feature.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      {feature.text}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
