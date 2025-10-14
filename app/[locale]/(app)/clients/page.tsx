'use client'

import { useTranslations } from 'next-intl'

export default function ClientsPage() {
    const t = useTranslations('Clients')

    return (
        <main
            id="clients"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
        </main>
    )
}
