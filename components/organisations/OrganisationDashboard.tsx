'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useOrganisations } from '@/hooks/useOrganisations'
import { OrganisationList } from './OrganisationList'
import { OrganisationForm } from './OrganisationForm'

export default function OrganisationDashboard() {
    const t = useTranslations('Organisation')
    const {
        organisations,
        selected,
        form,
        loading,
        saving,
        deleting,
        error,
        fetchOrganisations,
        handleSelect,
        handleChange,
        handleDelete,
        handleSave,
        handleLeave,
        setSelected,
    } = useOrganisations()

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">{t('title')}</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                            {t('count', { count: organisations.length })}
                        </p>
                    </div>
                    <OrganisationList
                        organisations={organisations}
                        onSelect={handleSelect}
                        onLeave={handleLeave}
                    />
                </>
            )}

            {selected && (
                <OrganisationForm
                    form={form}
                    onChange={handleChange}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onCancel={() => setSelected(null)}
                    saving={saving}
                    deleting={deleting}
                    error={error}
                />
            )}
        </div>
    )
}
