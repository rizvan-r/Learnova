import React, { createContext, useContext, useState } from 'react'
import type { UserProfile } from '../api/client'
import { api } from '../api/client'

interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  loginWithRole: (role: string) => Promise<void>
  loginWithEmis: (emis: string, dob: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Fallback seed profiles for instant offline development
const FALLBACK_PROFILES: Record<string, UserProfile> = {
  student: {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'student.demo@learnova.gov.in',
    full_name: 'Priya Ramanathan',
    full_name_ta: 'பிரியா ராமநாதன்',
    role: 'student',
    school_id: 'a1111111-1111-1111-1111-111111111111',
    region: 'Salem',
    emis_number: '3302010010101',
    designation: 'Class 11 - Computer Science',
    phone: '+91 98765 43210',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  staff: {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'staff.demo@learnova.gov.in',
    full_name: 'Anitha Subramanian',
    full_name_ta: 'அனிதா சுப்ரமணியன்',
    role: 'staff',
    school_id: 'a1111111-1111-1111-1111-111111111111',
    region: 'Salem',
    emis_number: '3302010010102',
    designation: 'PG Teacher (Computer Science)',
    phone: '+91 98765 43211',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  headmaster: {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'hm.demo@learnova.gov.in',
    full_name: 'Dr. K. Meenakshi Sundaram',
    full_name_ta: 'முனைவர் கே. மீனாட்சி சுந்தரம்',
    role: 'headmaster',
    school_id: 'a1111111-1111-1111-1111-111111111111',
    region: 'Salem',
    emis_number: '3302010010103',
    designation: 'Headmaster',
    phone: '+91 98765 43212',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  doctor: {
    id: '44444444-4444-4444-4444-444444444444',
    email: 'doctor.demo@learnova.gov.in',
    full_name: 'Dr. S. Vignesh M.B.B.S.',
    full_name_ta: 'மருத்துவர் எஸ். விக்னேஷ்',
    role: 'doctor',
    school_id: 'a1111111-1111-1111-1111-111111111111',
    region: 'Salem Region',
    emis_number: 'DOC-TN-8821',
    designation: 'School Health Officer',
    phone: '+91 98765 43213',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
  },
  education_officer: {
    id: '55555555-5555-5555-5555-555555555555',
    email: 'officer.demo@learnova.gov.in',
    full_name: 'Thiru R. Karunakaran M.A., B.Ed.',
    full_name_ta: 'திரு ஆர். கருணாகரன்',
    role: 'education_officer',
    region: 'Salem Educational District',
    emis_number: 'DEO-TN-4190',
    designation: 'District Educational Officer (DEO)',
    phone: '+91 98765 43214',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('learnova_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch {
        return null
      }
    }
    // Default to student demo user for immediate rich initial load
    return FALLBACK_PROFILES.student
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('learnova_token') || 'demo-token-student'
  })

  const [isLoading, setIsLoading] = useState(false)

  const loginWithRole = async (role: string) => {
    setIsLoading(true)
    try {
      const data = await api.demoLogin(role)
      setToken(data.access_token)
      setUser(data.user)
      localStorage.setItem('learnova_token', data.access_token)
      localStorage.setItem('learnova_user', JSON.stringify(data.user))
    } catch {
      // Fallback to offline profile
      const fallback = FALLBACK_PROFILES[role] || FALLBACK_PROFILES.student
      const fallbackToken = `demo-token-${role}`
      setToken(fallbackToken)
      setUser(fallback)
      localStorage.setItem('learnova_token', fallbackToken)
      localStorage.setItem('learnova_user', JSON.stringify(fallback))
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithEmis = async (emis: string, dob: string) => {
    setIsLoading(true)
    try {
      const data = await api.emisLogin(emis, dob)
      setToken(data.access_token)
      setUser(data.user)
      localStorage.setItem('learnova_token', data.access_token)
      localStorage.setItem('learnova_user', JSON.stringify(data.user))
    } catch {
      const fallback = FALLBACK_PROFILES.student
      setToken('demo-token-student')
      setUser(fallback)
      localStorage.setItem('learnova_token', 'demo-token-student')
      localStorage.setItem('learnova_user', JSON.stringify(fallback))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('learnova_token')
    localStorage.removeItem('learnova_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, loginWithRole, loginWithEmis, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
