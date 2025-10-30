'use client'

import { useEffect } from 'react'
import WelcomeSection from '@/components/dashboard/WelcomeSection'
import { useOrganisations } from '@/hooks/useOrganisations'
import { useAuthContext } from '@/context/AuthProvider'

export default function DashboardPage() {
    const { fetchOrganisations } = useOrganisations()
    const { user } = useAuthContext()

    console.log(user)
    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    return (
        <main
            id="dashboard"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <WelcomeSection
                userName={user?.first_name + ' ' + user?.last_name}
            />
        </main>
    )
}
