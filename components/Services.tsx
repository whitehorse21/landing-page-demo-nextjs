'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'
import ServiceCardImage from './ServiceCardImage'

const Services = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ triggerOnce: false })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { t } = useLanguage()

  const services = [
    {
      kind: 'tours' as const,
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      title: 'Guided Tours',
      description: 'Explore amazing destinations with our expert-guided tours. Experience local culture, history, and hidden gems.',
      features: ['Expert local guides', 'Small group sizes', 'Cultural immersion'],
    },
    {
      kind: 'hiking' as const,
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Adventure Hiking',
      description: 'Discover nature trails and mountain adventures. From beginner-friendly paths to challenging summit climbs.',
      features: ['Multiple difficulty levels', 'Safety equipment included', 'Scenic routes'],
    },
    {
      kind: 'support' as const,
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your travel needs. We are here to help whenever you need us.',
      features: ['24/7 availability', 'Multi-language support', 'Emergency assistance'],
    },
    {
      kind: 'planning' as const,
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: 'Travel Planning',
      description: 'Comprehensive travel planning and booking services. From flights to accommodations, we handle it all.',
      features: ['End-to-end planning', 'Best price guarantee', 'Flexible bookings'],
    },
  ]

  // Auto-play slideshow
  useEffect(() => {
    if (!isPaused && servicesVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
      }, 3000) // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, servicesVisible, services.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume after 5 seconds
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  return (
    <section id="services" className="bg-transparent py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-float-in ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>

          {/* Slideshow Container */}
          <div
            ref={servicesRef}
            className={`relative scroll-float-in ${servicesVisible ? 'visible' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-12 z-20 bg-white dark:bg-gray-700 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary dark:hover:bg-emerald-500 hover:text-white group"
              aria-label="Previous service"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-12 z-20 bg-white dark:bg-gray-700 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary dark:hover:bg-emerald-500 hover:text-white group"
              aria-label="Next service"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slideshow Content */}
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="min-w-full flex-shrink-0 px-4"
                  >
                    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Image */}
                        <div className="order-2 md:order-1">
                          <div className="rounded-xl overflow-hidden">
                            <ServiceCardImage
                              kind={service.kind}
                              className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="order-1 md:order-2">
                          {/* Icon */}
                          <div className="mb-4 text-primary dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-base md:text-lg">
                            {service.description}
                          </p>

                          {/* Features */}
                          <ul className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="text-sm md:text-base text-gray-700 dark:text-gray-300 flex items-center">
                                <span className="text-primary dark:text-emerald-400 mr-3 text-lg">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>

                          {/* Decorative Element */}
                          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-primary dark:bg-emerald-500 shadow-lg'
                      : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
