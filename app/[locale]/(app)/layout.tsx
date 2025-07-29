'use client'

import React, { useEffect } from 'react'
import { SidebarComponent } from '@/components/common/SidebarComponent'
import {
    IconDashboard,
    IconReceipt,
    IconUsers,
    IconLogout,
    IconSettings,
    IconBell,
    IconHelpCircle,
} from '@tabler/icons-react'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { useTranslations } from 'next-intl'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const t = useTranslations('Sidebar')

    const sidebarLinks = [
        {
            label: t('dashboard'),
            href: '/dashboard',
            icon: (
                <IconDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('invoices'),
            href: '/invoices',
            icon: (
                <IconReceipt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('clients'),
            href: '/clients',
            icon: (
                <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('settings'),
            href: '/settings',
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('notifications'),
            href: '/notifications',
            icon: (
                <IconBell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('help'),
            href: '/help',
            icon: (
                <IconHelpCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('logout'),
            href: '/logout',
            icon: (
                <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ]

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

    if (!user) {
        return null
    }

    return (
        <div className="flex h-screen">
            <aside>
                <SidebarComponent links={sidebarLinks} />
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
