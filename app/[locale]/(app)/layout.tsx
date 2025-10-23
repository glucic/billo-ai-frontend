'use client'

import React from 'react'
import { SidebarComponent } from '@/components/common/SidebarComponent'
import { useAuth } from '@/hooks/auth'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { loading } = useAuth({ middleware: 'auth' })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    // user will always be defined here if we reached this point
    return (
        <div className="flex min-h-screen">
            <aside>
                <SidebarComponent />
            </aside>
            <main className="flex-1 p-5 overflow-y-auto bg-[var(--color-background)]">
                {children}
            </main>
        </div>
    )
}
