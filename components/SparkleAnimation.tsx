'use client'

import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'sparkle' | 'particle' | 'star'
}

const SparkleAnimation = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Generate sparkles and particles with random positions
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = []
      
      // Add bright sparkles (larger, more visible)
      for (let i = 0; i < 40; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4, // 4-10px
          duration: Math.random() * 2 + 2, // 2-4s
          delay: Math.random() * 2,
          type: 'sparkle',
        })
      }
      
      // Add star-shaped sparkles
      for (let i = 40; i < 60; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 3, // 3-8px
          duration: Math.random() * 3 + 2.5, // 2.5-5.5s
          delay: Math.random() * 2.5,
          type: 'star',
        })
      }
      
      // Add floating particles (larger, more visible)
      for (let i = 60; i < 80; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 5, // 5-13px
          duration: Math.random() * 4 + 3, // 3-7s
          delay: Math.random() * 3,
          type: 'particle',
        })
      }
      
      setSparkles(newSparkles)
    }

    generateSparkles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`absolute ${sparkle.type === 'sparkle' ? 'animate-sparkle' : sparkle.type === 'star' ? 'animate-star' : 'animate-particle'}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          {sparkle.type === 'sparkle' ? (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 dark:from-yellow-300 dark:via-yellow-200 dark:to-yellow-100 shadow-2xl shadow-yellow-400/80 dark:shadow-yellow-300/80 animate-twinkle"></div>
          ) : sparkle.type === 'star' ? (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-200 transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
              <div className="absolute inset-0 bg-yellow-200/60 dark:bg-yellow-300/60 blur-sm animate-pulse"></div>
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/60 via-emerald-400/50 to-teal-400/60 dark:from-emerald-400/70 dark:via-emerald-300/60 dark:to-teal-300/70 shadow-xl shadow-emerald-400/50 dark:shadow-emerald-300/50 animate-glow"></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SparkleAnimation
