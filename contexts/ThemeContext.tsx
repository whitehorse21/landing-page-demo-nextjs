'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Always start with 'light' to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Apply theme after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true)
    
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    let initialTheme: Theme = 'light'
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme as Theme
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark'
    }
    
    setTheme(initialTheme)
    
    // Apply theme to document
    const root = document.documentElement
    if (initialTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const root = document.documentElement
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      
      if (newTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      try {
        localStorage.setItem('theme', newTheme)
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
