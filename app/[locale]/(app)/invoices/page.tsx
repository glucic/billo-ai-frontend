'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'

export default function InvoicesPage() {
    const t = useTranslations('Invoices')

    return (
        <main
            id="invoices"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <Button variant="primary" href="/invoices/create">
                Create an Invoice
            </Button>
        </main>
    )
}
