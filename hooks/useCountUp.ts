'use client'

import { useEffect, useState, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
  suffix?: string
  prefix?: string
  enabled?: boolean
}

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  enabled = true,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start)
  const [isCounting, setIsCounting] = useState(false)
  const frameRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!enabled) {
      setCount(start)
      setIsCounting(false)
      return
    }

    if (enabled && !isCounting) {
      setIsCounting(true)
      startTimeRef.current = undefined
    }
  }, [enabled])

  useEffect(() => {
    if (!isCounting || !enabled) {
      return
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = start + (end - start) * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsCounting(false)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isCounting, enabled, end, duration, start])

  const formatNumber = (num: number): string => {
    let formatted = num.toFixed(decimals)
    
    if (num >= 1000 && num < 1000000) {
      const kValue = num / 1000
      formatted = kValue.toFixed(decimals === 0 ? 0 : 1) + 'K'
    } else if (num >= 1000000) {
      const mValue = num / 1000000
      formatted = mValue.toFixed(decimals === 0 ? 0 : 1) + 'M'
    }

    return `${prefix}${formatted}${suffix}`
  }

  return {
    count: formatNumber(count),
    rawCount: count,
    isCounting,
  }
}
