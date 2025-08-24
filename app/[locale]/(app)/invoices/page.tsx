'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function InvoicesPage() {
    const t = useTranslations('Invoices')

    // Mock data
    const metrics = [
        { label: t('metrics.total'), value: 24 },
        { label: t('metrics.paid'), value: 16 },
        { label: t('metrics.pending'), value: 6 },
        { label: t('metrics.overdue'), value: 2 },
    ]

    const invoices = [
        {
            id: 'INV-001',
            client: 'Acme Inc.',
            amount: '$1,200',
            status: 'Paid',
            date: '2025-07-25',
        },
        {
            id: 'INV-002',
            client: 'Beta LLC',
            amount: '$950',
            status: 'Pending',
            date: '2025-07-26',
        },
        {
            id: 'INV-003',
            client: 'Gamma GmbH',
            amount: '$2,300',
            status: 'Overdue',
            date: '2025-07-20',
        },
    ]

    return (
        <main
            id="invoices"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold">{t('title')}</h1>

            {/* Metrics */}
            <section>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl bg-gray-800 shadow-md border border-gray-700 flex flex-col items-center space-y-2">
                            <span className="text-2xl font-bold text-[var(--color-accent)]">
                                {m.value}
                            </span>
                            <span className="text-sm text-gray-300">
                                {m.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Actions */}
            <section className="flex gap-4">
                <button className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] transition text-white font-medium shadow">
                    {t('actions.create')}
                </button>
                <button className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition text-white font-medium shadow">
                    {t('actions.export')}
                </button>
            </section>

            {/* Filters */}
            <section className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder={t('filters.search')}
                    className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white w-full max-w-sm"
                />
                <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white">
                    <option>{t('filters.all')}</option>
                    <option>{t('filters.paid')}</option>
                    <option>{t('filters.pending')}</option>
                    <option>{t('filters.overdue')}</option>
                </select>
            </section>

            {/* Invoice Table */}
            <section className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b border-gray-700">
                            <th className="p-3">{t('table.id')}</th>
                            <th className="p-3">{t('table.client')}</th>
                            <th className="p-3">{t('table.amount')}</th>
                            <th className="p-3">{t('table.status')}</th>
                            <th className="p-3">{t('table.date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-[var(--accent-glow)] transition">
                                <td className="p-3">{inv.id}</td>
                                <td className="p-3">{inv.client}</td>
                                <td className="p-3">{inv.amount}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            inv.status === 'Paid'
                                                ? 'bg-green-600'
                                                : inv.status === 'Pending'
                                                  ? 'bg-yellow-600'
                                                  : 'bg-red-600'
                                        }`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="p-3">{inv.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}
