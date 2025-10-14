'use client'

import React, { useEffect } from 'react'
import { SidebarComponent } from '@/components/common/SidebarComponent'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const router = useRouter()
    const { user, loading } = useAuth({
        middleware: 'auth',
    })

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="flex">
            <aside>
                <SidebarComponent />
            </aside>

            <main className="flex-1 p-5 overflow-y-auto relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    children
                )}
            </main>
        </div>
    )
}
