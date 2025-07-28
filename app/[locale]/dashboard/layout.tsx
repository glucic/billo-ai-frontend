'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

async function getCurrentUser() {
    // Replace this with your actual auth logic
    // For demo, return null to simulate unauthenticated
    return null
}

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<{ name: string } | null>(null)

    useEffect(() => {
        getCurrentUser().then(currentUser => {
            if (!currentUser) {
                router.replace('/login')
            } else {
                setUser(currentUser)
                setLoading(false)
            }
        })
    }, [router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--color-accent)]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
            {children}
        </div>
    )
}
