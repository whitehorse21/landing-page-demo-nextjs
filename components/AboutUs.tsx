'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import DestinationImage from './DestinationImage'
import { useLanguage } from '@/contexts/LanguageContext'

const AboutUs = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()

  const destinations = [
    {
      id: 1,
      type: 'lake' as const,
      price: '$338',
      alt: 'Mountain lake with boats',
      title: 'Mountain Lake Adventure',
      description: 'Experience serene mountain lakes with traditional boat rides',
    },
    {
      id: 2,
      type: 'beach' as const,
      price: '$338',
      alt: 'Tropical beach',
      title: 'Tropical Paradise',
      description: 'Relax on pristine beaches with crystal clear waters',
    },
    {
      id: 3,
      type: 'pier' as const,
      price: '$338',
      alt: 'Ocean pier',
      title: 'Ocean Pier Experience',
      description: 'Enjoy stunning ocean views from beautiful wooden piers',
    },
  ]

  return (
    <section id="about" className="bg-transparent py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-slide-up-down ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              {t('about.title')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.heading')}{' '}
              <span className="text-primary dark:text-emerald-400">{t('about.heading.world')}</span> {t('about.heading.with')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('about.description')}
            </p>
          </div>

          {/* Mission & Features */}
          <div
            ref={contentRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 scroll-slide-up-down ${contentVisible ? 'visible' : ''}`}
          >
            {/* Mission Card */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Travel mission"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  }}
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We believe that travel is more than just visiting places—it's about creating memories, building connections, and discovering yourself.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Why Choose Us Card */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Why choose us"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  }}
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Years Experience</span>
                    <span className="text-2xl font-bold text-primary dark:text-emerald-400">10+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Destinations</span>
                    <span className="text-2xl font-bold text-primary dark:text-emerald-400">360+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Happy Travelers</span>
                    <span className="text-2xl font-bold text-primary dark:text-emerald-400">60K+</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                text: 'Curated travel experiences from local experts',
                image: 'https://images.unsplash.com/photo-1502780402662-acc019171b0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                fallback: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              },
              {
                text: 'Community-driven recommendations and reviews',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                fallback: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              },
              {
                text: 'Sustainable and responsible travel options',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                fallback: 'https://images.unsplash.com/photo-1502780402662-acc019171b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              },
              {
                text: '24/7 support for all your travel needs',
                image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                fallback: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.text}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = feature.fallback
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary dark:text-emerald-400 text-xl flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div
            ref={galleryRef}
            className={`scroll-fade-in ${galleryVisible ? 'visible' : ''}`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('about.destinations.title')}
              </h3>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 scroll-carousel-stagger ${galleryVisible ? 'visible' : ''}`}>
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-full h-64 overflow-hidden">
                    <DestinationImage
                      type={destination.type}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-primary dark:bg-emerald-500 text-white px-3 py-1 rounded-lg font-semibold shadow-lg">
                    {destination.price}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{destination.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{destination.description}</p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105">
                Explore More Destinations →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
