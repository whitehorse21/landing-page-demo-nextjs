'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: false })
  const { t } = useLanguage()
  
  const footerLinks = {
    company: [
      { labelKey: 'footer.links.home', href: '#home' },
      { labelKey: 'footer.links.about', href: '#about' },
      { labelKey: 'footer.links.services', href: '#service' },
      { labelKey: 'footer.links.howItWorks', href: '#how-it-works' },
      { labelKey: 'footer.links.blogs', href: '#blog' },
      { labelKey: 'footer.links.contactUs', href: '#contact' },
    ],
    support: [
      { labelKey: 'footer.links.helpCenter', href: '#help' },
      { labelKey: 'footer.links.safetyCenter', href: '#safety' },
      { labelKey: 'footer.links.communityGuidelines', href: '#guidelines' },
    ],
    legal: [
      { labelKey: 'footer.links.cookiesPolicy', href: '#cookies' },
      { labelKey: 'footer.links.privacyPolicy', href: '#privacy' },
      { labelKey: 'footer.links.termsOfService', href: '#terms' },
    ],
    contact: [
      { labelKey: 'footer.links.contactUs', href: '#contact' },
      { labelKey: 'footer.links.blog', href: '#blog' },
      { labelKey: 'footer.links.service', href: '#service' },
    ],
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerHeight = 64
      const targetPosition = targetElement.offsetTop - headerHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer
      id="contact"
      ref={elementRef}
      className={`bg-gray-900 dark:bg-gray-950 mt-12 scroll-fade-in transition-colors duration-300 ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-white dark:text-white mb-4 text-sm uppercase tracking-wide">
                {t('footer.company')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="font-semibold text-white dark:text-white mb-4 text-sm uppercase tracking-wide">
                {t('footer.support')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-white dark:text-white mb-4 text-sm uppercase tracking-wide">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-semibold text-white dark:text-white mb-4 text-sm uppercase tracking-wide">
                {t('footer.contact')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-400">
              {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
