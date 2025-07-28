import React from 'react'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'BilloAI - Dashboard',
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
            {children}
        </div>
    )
}
