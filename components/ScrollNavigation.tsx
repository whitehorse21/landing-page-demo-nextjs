'use client'

import { useEffect, useState } from 'react'

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'subscribe', label: 'Subscribe' },
  { id: 'contact', label: 'Contact' },
]

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section) {
          const offsetTop = section.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center space-y-1">
        {sections.map((section, index) => (
          <div key={section.id} className="relative flex items-center">
            <button
              onClick={() => scrollToSection(section.id)}
              className={`group relative flex items-center transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-primary scale-110'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={`Go to ${section.label} section`}
            >
              {/* Arrow */}
              <div className="relative">
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === section.id
                      ? 'rotate-0'
                      : 'rotate-[-45deg] group-hover:rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {/* Active indicator dot */}
                {activeSection === section.id && (
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              {/* Label */}
              <span
                className={`ml-2 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'opacity-100 translate-x-0'
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {section.label}
              </span>
            </button>
            {/* Connecting line (except for last item) */}
            {index < sections.length - 1 && (
              <div
                className={`absolute left-2.5 top-6 w-0.5 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'h-10 bg-primary'
                    : 'h-6 bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default ScrollNavigation
