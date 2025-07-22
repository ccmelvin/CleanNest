'use client'

import { createContext, useContext, useState } from 'react'
import { mockUser, User } from '@/lib/mockData'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading] = useState(false)

  const signUp = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful signup - use provided email
    const newUser = { id: 'new-user-' + Date.now(), email }
    setUser(newUser)
    
    // Acknowledge password parameter
    console.log('Mock signup with password length:', password.length)
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful login - always use demo user but acknowledge inputs
    console.log('Mock signin for:', email, 'password length:', password.length)
    setUser(mockUser)
  }

  const signOut = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(null)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
