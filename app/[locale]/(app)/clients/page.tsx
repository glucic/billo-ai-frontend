'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ClientsPage() {
    const t = useTranslations('Clients')

    // Mock metrics data
    const metrics = [
        { label: t('metrics.total'), value: 18 },
        { label: t('metrics.active'), value: 14 },
        { label: t('metrics.new'), value: 3 },
    ]

    // Mock clients data
    const clients = [
        {
            id: 1,
            name: 'Acme Corporation',
            email: 'contact@acme.com',
            phone: '+1 555 123 456',
            company: 'Acme Group',
            status: 'Active',
            dateAdded: '2024-07-01',
        },
        {
            id: 2,
            name: 'Beta LLC',
            email: 'hello@beta.com',
            phone: '+1 555 987 654',
            company: 'Beta Group',
            status: 'Inactive',
            dateAdded: '2024-06-20',
        },
        {
            id: 3,
            name: 'Gamma Ltd',
            email: 'support@gamma.com',
            phone: '+1 555 555 555',
            company: 'Gamma Group',
            status: 'Active',
            dateAdded: '2024-07-10',
        },
    ]

    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All')

    // Filter clients by search & filter (simple mock logic)
    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filter === 'All' || client.status === filter

        return matchesSearch && matchesFilter
    })

    return (
        <main
            id="clients"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold">{t('title')}</h1>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((metric, i) => (
                    <div
                        key={i}
                        className="flex flex-col p-4 rounded-2xl bg-[var(--background)] border border-[var(--accent)] shadow-md">
                        <span className="text-sm text-[var(--accent-light)]">
                            {metric.label}
                        </span>
                        <span className="text-2xl font-bold">
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Actions and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] transition text-white font-medium shadow"
                        onClick={() => alert('Add Client')}>
                        {t('actions.add')}
                    </button>
                    <button
                        className="px-4 py-2 rounded-xl border border-[var(--accent)] hover:bg-[var(--accent-glow)] transition text-[var(--accent)] font-medium shadow"
                        onClick={() => alert('Export Clients')}>
                        {t('actions.export')}
                    </button>
                </div>

                <input
                    type="text"
                    placeholder={t('filters.search')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="rounded-xl p-2 bg-[var(--background)] border border-[var(--accent)] text-[var(--color-foreground)] w-full sm:w-64"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                {(['All', 'Active', 'Inactive'] as const).map(status => (
                    <button
                        key={status}
                        className={`px-3 py-1 rounded-lg font-medium border ${
                            filter === status
                                ? 'bg-[var(--accent)] text-white border-transparent'
                                : 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-white'
                        }`}
                        onClick={() => setFilter(status)}>
                        {t(`filters.${status.toLowerCase()}`)}
                    </button>
                ))}
            </div>

            {/* Clients Table */}
            <table className="w-full text-left border-collapse border border-[var(--accent)] rounded-lg overflow-hidden">
                <thead className="bg-[var(--background)]">
                    <tr>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.name')}
                        </th>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.email')}
                        </th>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.phone')}
                        </th>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.company')}
                        </th>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.status')}
                        </th>
                        <th className="border border-[var(--accent)] px-4 py-2">
                            {t('table.date')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <tr
                                key={client.id}
                                className="hover:bg-[var(--accent-glow)] transition cursor-pointer"
                                onClick={() =>
                                    alert(`Selected client: ${client.name}`)
                                }>
                                <td className="border border-[var(--accent)] px-4 py-2">
                                    {client.name}
                                </td>
                                <td className="border border-[var(--accent)] px-4 py-2">
                                    {client.email}
                                </td>
                                <td className="border border-[var(--accent)] px-4 py-2">
                                    {client.phone}
                                </td>
                                <td className="border border-[var(--accent)] px-4 py-2">
                                    {client.company}
                                </td>
                                <td
                                    className={`border border-[var(--accent)] px-4 py-2 font-semibold ${client.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                    {client.status}
                                </td>
                                <td className="border border-[var(--accent)] px-4 py-2">
                                    {client.dateAdded}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center py-4 text-gray-400">
                                {t('filters.search')}{' '}
                                {t('filters.noResults') || ''}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    )
}
