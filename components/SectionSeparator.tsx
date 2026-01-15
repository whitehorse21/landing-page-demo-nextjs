'use client'

import { useId } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface SectionSeparatorProps {
  variant?: 'dots' | 'waves' | 'particles' | 'lines' | 'circles' | 'geometric' | 'flow'
  type?: 'dots' | 'waves' | 'particles' | 'lines' | 'circles' | 'geometric' | 'flow' // Legacy support
}

const SectionSeparator = ({ variant, type }: SectionSeparatorProps) => {
  // Support both 'variant' and 'type' props for backward compatibility
  const separatorType = variant || type || 'dots'
  const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: true })
  const gradientId = useId()

  // Variant 1: Expanding Ripples
  if (separatorType === 'dots') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 dark:border-blue-400 transition-opacity duration-500 ${
                    isVisible ? 'opacity-60' : 'opacity-0'
                  }`}
                  style={{
                    width: `${60 + i * 80}px`,
                    height: `${60 + i * 80}px`,
                    animationName: isVisible ? 'ripple-expand' : 'none',
                    animationDuration: '2.5s',
                    animationTimingFunction: 'ease-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 2: Flowing Gradient Waves
  if (separatorType === 'waves') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              <svg className="w-full h-full" viewBox="0 0 1200 128" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`waveGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="25%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="1" />
                    <stop offset="75%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,64 Q300,20 600,64 T1200,64"
                  fill="none"
                  stroke={`url(#waveGrad-${gradientId})`}
                  strokeWidth="3"
                  className={`transition-opacity duration-1000 ${
                    isVisible ? 'opacity-100 animate-wave-flow' : 'opacity-0'
                  }`}
                />
                <path
                  d="M0,64 Q300,108 600,64 T1200,64"
                  fill="none"
                  stroke={`url(#waveGrad-${gradientId})`}
                  strokeWidth="3"
                  className={`transition-opacity duration-1000 ${
                    isVisible ? 'opacity-100 animate-wave-flow-reverse' : 'opacity-0'
                  }`}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 3: Particle Swarm
  if (separatorType === 'particles') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-pink-500 dark:bg-pink-400 transition-opacity duration-500 ${
                    isVisible ? 'opacity-80' : 'opacity-0'
                  }`}
                  style={{
                    left: `${(i * 6.67)}%`,
                    top: '50%',
                    animationName: isVisible ? 'particle-swarm' : 'none',
                    animationDuration: '3s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-pink-300 dark:bg-pink-300 blur-sm animate-ping"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 4: Expanding Lines with Gradient
  if (separatorType === 'lines') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 dark:via-orange-400 to-transparent transition-all duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    width: isVisible ? '100%' : '0%',
                    animationName: isVisible ? 'line-expand' : 'none',
                    animationDuration: '2s',
                    animationTimingFunction: 'ease-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.4}s`,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                  }}
                ></div>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 5: Morphing Circles
  if (separatorType === 'circles') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 transition-opacity duration-500 ${
                    isVisible ? 'opacity-70' : 'opacity-0'
                  }`}
                  style={{
                    width: `${40 + i * 30}px`,
                    height: `${40 + i * 30}px`,
                    animationName: isVisible ? 'circle-morph' : 'none',
                    animationDuration: '3s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.25}s`
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-300 dark:bg-cyan-300 blur-md opacity-50"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 6: Rotating Geometric Pattern
  if (separatorType === 'geometric') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                    isVisible ? 'opacity-80' : 'opacity-0'
                  }`}
                  style={{
                    width: '60px',
                    height: '60px',
                    animationName: isVisible ? 'geometric-spin' : 'none',
                    animationDuration: '4s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.2}s`,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(120px) rotate(-${i * 60}deg)`
                  }}
                >
                  <div 
                    className="w-full h-full bg-indigo-500 dark:bg-indigo-400"
                    style={{
                      clipPath: i % 3 === 0 
                        ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                        : i % 3 === 1
                        ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                        : 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant 7: Flowing Particles Trail
  if (separatorType === 'flow') {
    return (
      <div ref={elementRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-center h-32">
            <div className="relative w-full max-w-6xl h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full bg-rose-500 dark:bg-rose-400 transition-opacity duration-500 ${
                    isVisible ? 'opacity-90' : 'opacity-0'
                  }`}
                  style={{
                    left: '50%',
                    top: '50%',
                    animationName: isVisible ? 'flow-trail' : 'none',
                    animationDuration: '4s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-rose-300 dark:bg-rose-300 blur-lg"></div>
                </div>
              ))}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/30 dark:via-rose-400/30 to-transparent transition-opacity duration-1000 ${
                  isVisible ? 'opacity-50' : 'opacity-0'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default SectionSeparator
