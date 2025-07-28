'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { fetchUser, logout } from '@/hooks/auth'

interface AuthContextType {
    user: any | null
    loading: boolean
    setUser: (user: any | null) => void
    logoutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUser()
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    const logoutUser = async () => {
        await logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
}
