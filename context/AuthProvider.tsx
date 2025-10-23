'use client'

import React, { createContext, useContext } from 'react'
import useSWR from 'swr'
import apiClient from '@/lib/apiClient'
import { User } from '@/types/User'

interface AuthContextType {
    user: User | null
    loading: boolean
    mutateUser: (data?: User | null, shouldRevalidate?: boolean) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        data: user,
        error,
        mutate,
        isLoading,
    } = useSWR<User>(
        '/api/user',
        async () => {
            try {
                const res = await apiClient.get('/api/user')
                return res.data
            } catch (err: any) {
                if (err.response?.status === 401) {
                    // Not logged in — return null, don’t throw
                    return null
                }
                throw err
            }
        },
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
            refreshInterval: 0,
        },
    )

    const loading = isLoading

    return (
        <AuthContext.Provider
            value={{ user: user ?? null, loading, mutateUser: mutate }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context)
        throw new Error('useAuthContext must be used inside AuthProvider')
    return context
}
