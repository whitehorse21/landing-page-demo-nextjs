'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import AboutUs from '@/components/AboutUs'
import Services from '@/components/Services'
import Blog from '@/components/Blog'
import HowItWorks from '@/components/HowItWorks'
import Experience from '@/components/Experience'
import Testimonials from '@/components/Testimonials'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'
import GoToTop from '@/components/GoToTop'
import SectionSeparator from '@/components/SectionSeparator'
import LoginModal from '@/components/LoginModal'

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onOpenLoginModal={handleOpenLoginModal} />
      <SectionSeparator variant="dots" />
      <VideoSection />
      <SectionSeparator variant="waves" />
      <AboutUs />
      <Services />
      <SectionSeparator variant="particles" />
      <Blog />
      <SectionSeparator variant="lines" />
      <HowItWorks />
      <SectionSeparator variant="circles" />
      <Experience />
      <SectionSeparator variant="geometric" />
      <Testimonials />
      <SectionSeparator variant="flow" />
      <Subscribe />
      <Footer />
      <GoToTop />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </main>
  )
}
