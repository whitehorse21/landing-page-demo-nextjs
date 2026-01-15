'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Always start with null to avoid hydration mismatch
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load user from localStorage after hydration
  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }
  }, [user, mounted])

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const signup = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`
    }
    setUser(mockUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
