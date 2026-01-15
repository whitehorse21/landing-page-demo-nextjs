'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import WorldMapImage from './WorldMapImage'
import { useLanguage } from '@/contexts/LanguageContext'

const Testimonials = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: false })
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: false })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const testimonials = [
    {
      name: 'James William',
      role: 'Adventure Traveler',
      location: 'New York, USA',
      rating: 5,
      text: 'TripHive made my dream trip to the mountains a reality. The guides were knowledgeable, the itinerary was perfect, and every detail was taken care of. Highly recommend!',
      avatar: '👨‍🦱',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Sarah Johnson',
      role: 'Solo Traveler',
      location: 'London, UK',
      rating: 5,
      text: 'As a solo female traveler, safety is my top priority. TripHive exceeded my expectations with their attention to detail and 24/7 support. Felt safe and had an amazing time!',
      avatar: '👩‍🦰',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Michael Chen',
      role: 'Family Traveler',
      location: 'Tokyo, Japan',
      rating: 5,
      text: 'Traveled with my family of five and TripHive made it seamless. Great family-friendly destinations and activities. The kids loved every moment!',
      avatar: '👨‍💼',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Luxury Traveler',
      location: 'Paris, France',
      rating: 5,
      text: 'The luxury travel packages exceeded all expectations. Every detail was meticulously planned, from accommodations to exclusive experiences. Absolutely worth it!',
      avatar: '👩‍💼',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'David Kim',
      role: 'Backpacker',
      location: 'Beijing, China',
      rating: 5,
      text: 'As a budget traveler, I was amazed by the value TripHive provided. Great recommendations for affordable yet amazing experiences. Will definitely use again!',
      avatar: '🧑‍🎓',
      color: 'from-green-500 to-emerald-500',
    },
  ]


  return (
    <section 
      id="testimonials" 
      className="bg-transparent py-8 lg:py-12 overflow-hidden w-full max-w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-appear-from-down ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              {t('testimonials.title')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('testimonials.heading')}{' '}
              <span className="text-primary dark:text-emerald-400">{t('testimonials.heading.say')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>

          {/* Marquee Container */}
          <div
            ref={contentRef}
            className={`scroll-appear-from-down ${contentVisible ? 'visible' : ''}`}
          >
            {/* Marquee Wrapper */}
            <div className="relative overflow-hidden w-full">
              {/* Gradient Fade on Left */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-emerald-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
              
              {/* Gradient Fade on Right */}
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-emerald-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

              {/* Marquee Track */}
              <div className="marquee-track">
                {/* First Set */}
                <div className="marquee-content">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={`first-${index}`}
                      className="marquee-item"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer flex flex-col h-full testimonial-card ${
                          hoveredIndex === index ? 'animate-glow' : ''
                        }`}
                      >
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                        
                        {/* Quote icon */}
                        <div className="absolute top-4 right-4 text-6xl text-emerald-100 dark:text-emerald-900/50 group-hover:text-emerald-200 dark:group-hover:text-emerald-700 transition-colors duration-300">
                          "
                        </div>

                        <div className="relative z-10">
                          {/* Avatar and Info */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {testimonial.location}
                              </p>
                            </div>
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                            "{testimonial.text}"
                          </p>

                          {/* Rating Stars */}
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-5 h-5 text-primary dark:text-emerald-400 transform group-hover:scale-125 transition-transform duration-300"
                                  style={{ transitionDelay: `${i * 0.05}s` }}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            {/* World Map Icon - only show on larger screens */}
                            <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                              <WorldMapImage />
                            </div>
                          </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Duplicate Set for Seamless Loop */}
                <div className="marquee-content" aria-hidden="true">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={`second-${index}`}
                      className="marquee-item"
                    >
                      <div 
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer flex flex-col h-full testimonial-card"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                        <div className="absolute top-4 right-4 text-6xl text-emerald-100 dark:text-emerald-900/50 group-hover:text-emerald-200 dark:group-hover:text-emerald-700 transition-colors duration-300">
                          "
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {testimonial.location}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                            "{testimonial.text}"
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-5 h-5 text-primary dark:text-emerald-400 transform group-hover:scale-125 transition-transform duration-300"
                                  style={{ transitionDelay: `${i * 0.05}s` }}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                              <WorldMapImage />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
              <svg className="w-5 h-5 text-primary dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Trusted by <span className="text-primary dark:text-emerald-400">60,000+</span> Travelers Worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
