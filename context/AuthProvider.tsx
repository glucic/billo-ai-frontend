'use client'

import React, { createContext, useContext } from 'react'
import useSWR from 'swr'
import apiClient from '@/lib/apiClient'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: any | null
    loading: boolean
    mutateUser: (data?: any, shouldRevalidate?: boolean) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        '/api/user',
        () =>
            apiClient
                .get('/api/user')
                .then(res => res.data)
                .catch(err => {
                    if (err.response?.status === 409) {
                        //router.push('/verify-email')
                    } else {
                        throw err
                    }
                }),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
            refreshInterval: 0,
        },
    )

    const loading = !user && !error

    return (
        <AuthContext.Provider value={{ user, loading, mutateUser: mutate }}>
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
