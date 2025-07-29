'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'

export default function LogoutPage() {
    const { logout } = useAuth()
    const [loggingOut, setLoggingOut] = useState(true)

    useEffect(() => {
        async function doLogout() {
            await logout()
            setLoggingOut(false)
        }
        doLogout()
    }, [logout])

    if (loggingOut) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    return null
}
