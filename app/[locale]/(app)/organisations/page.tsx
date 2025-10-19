'use client'

import { useTranslations } from 'next-intl'
import { useOrganisations } from '@/hooks/useOrganisations'
import { useEffect } from 'react'
import { OrganisationList } from '@/components/organisations/OrganisationList'

export default function OrganisationPage() {
    const t = useTranslations('Organisation')
    const { organisations, fetchOrganisations, handleLeave } =
        useOrganisations()

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    return (
        <main className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">{t('title')}</h2>

                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">
                        {t('count', { count: organisations.length })}
                    </p>
                </div>
                <OrganisationList
                    organisations={organisations}
                    onLeave={handleLeave}
                />
            </div>
        </main>
    )
}
