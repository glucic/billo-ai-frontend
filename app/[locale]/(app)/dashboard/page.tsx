'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

export default function DashboardPage() {
    const router = useRouter()
    const { user, loading } = useAuth({
        middleware: 'auth',
    })

    useEffect(() => {
        if (!loading && !user) {
            router.push('/')
        }
    }, [loading, user, router])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return null // or a placeholder while redirect happens
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Hello {user.name}</h1>
        </div>
    )
}
