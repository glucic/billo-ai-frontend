'use client'

import React, { createContext, useContext } from 'react'
import useSWR from 'swr'
import apiClient from '@/lib/apiClient'
import { User } from '@/types/User'

interface AuthContextType {
    user: User | null
    loading: boolean
    mutateUser: (
        data?: User | null,
        shouldRevalidate?: boolean,
    ) => Promise<User | undefined>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        data: user,
        mutate,
        isLoading,
    } = useSWR<User | null>(
        '/api/user',
        async () => {
            try {
                const res = await apiClient.get('/api/user')
                return res.data
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                if (
                    typeof err === 'object' &&
                    err !== null &&
                    'response' in err
                ) {
                    if (err.response?.status === 401) return null
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

    const mutateUser = async (
        data?: User | null,
        shouldRevalidate?: boolean,
    ): Promise<User | undefined> => {
        const result = await mutate(data ?? undefined, shouldRevalidate)
        // Convert any null into undefined to satisfy type
        return result ?? undefined
    }

    return (
        <AuthContext.Provider
            value={{ user: user ?? null, loading, mutateUser }}>
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
