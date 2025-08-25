'use client'

import { useEffect, useState, useCallback } from 'react'
import apiClient from '@/lib/apiClient'
import { InputField } from '@/components/ui/InputField'
import { StatefulButton } from '@/components/ui/StatefulButton'

interface Organisation {
    id: number
    name: string
    address: string
    phone: string
    email: string
    description: string
    employee_count: number
    created_at: string
    updated_at: string
}

export default function OrganisationDashboard() {
    const [organisations, setOrganisations] = useState<Organisation[]>([])
    const [selected, setSelected] = useState<Organisation | null>(null)
    const [form, setForm] = useState<Partial<Organisation>>({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchOrganisations = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiClient.get('/api/organisations')
            setOrganisations(res.data.data || res.data)
            setError(null)
        } catch (err) {
            setError('Failed to load organisations')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    const handleSelect = (org: Organisation) => {
        setSelected(org)
        setForm(org)
        setError(null)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleDelete = async () => {
        if (
            !selected ||
            !window.confirm(
                'Are you sure you want to delete this organisation?',
            )
        )
            return
        setDeleting(true)
        setError(null)
        try {
            await apiClient.delete(`/api/organisations/${selected.id}`)
            setOrganisations(orgs => orgs.filter(o => o.id !== selected.id))
            setSelected(null)
        } catch {
            setError('Failed to delete organisation')
        } finally {
            setDeleting(false)
        }
    }

    const handleSave = async () => {
        if (!selected) return
        setSaving(true)
        setError(null)
        try {
            await apiClient.put(`/api/organisations/${selected.id}`, form)
            setOrganisations(orgs =>
                orgs.map(o =>
                    o.id === selected.id
                        ? ({ ...o, ...form } as Organisation)
                        : o,
                ),
            )
            setSelected(null)
        } catch {
            setError('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Organisations</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                            {organisations.length} organisations found
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {organisations.map(org => (
                            <li
                                key={org.id}
                                className="flex items-center justify-between py-3 hover:bg-[var(--accent)]/10 rounded px-4 group">
                                <div
                                    className="cursor-pointer flex-grow"
                                    onClick={() => handleSelect(org)}>
                                    <div>
                                        <span className="font-medium">
                                            {org.name}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                            ({org.email})
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {org.address}
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleSelect(org)}
                                        className="text-blue-500 hover:text-blue-700 px-2 py-1 text-sm">
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {selected && (
                <div className="p-6 bg-[var(--background)] border rounded shadow space-y-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Edit Organisation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-1 font-medium">
                                Name
                            </label>
                            <InputField
                                name="name"
                                value={form.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1 font-medium">
                                Email
                            </label>
                            <InputField
                                name="email"
                                value={form.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-1 font-medium">
                                Phone
                            </label>
                            <InputField
                                name="phone"
                                value={form.phone || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-1 font-medium">
                                Address
                            </label>
                            <InputField
                                name="address"
                                value={form.address || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="employee_count"
                                className="block mb-1 font-medium">
                                Employee Count
                            </label>
                            <InputField
                                name="employee_count"
                                type="number"
                                value={form.employee_count?.toString() || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-1 font-medium">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description || ''}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setSelected(null)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                            Cancel
                        </button>
                        <div className="flex gap-4">
                            <StatefulButton
                                loading={deleting}
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                            </StatefulButton>
                            <StatefulButton
                                loading={saving}
                                onClick={handleSave}>
                                Save Changes
                            </StatefulButton>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-500 text-sm">{error}</div>
                    )}
                </div>
            )}
        </div>
    )
}
