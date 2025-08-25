import { useState, useCallback } from 'react'
import apiClient from '@/lib/apiClient'

export interface Organisation {
    id: number
    name: string
    address: string
    phone: string
    email: string
    description: string
    employee_count: number
    users: User[]
    created_at: string
    updated_at: string
}

export interface User {
    id: number
    name: string
    email: string
    role: string
}

export interface UseOrganisationsReturn {
    organisations: Organisation[]
    selected: Organisation | null
    form: Partial<Organisation>
    loading: boolean
    saving: boolean
    deleting: boolean
    error: string | null
    fetchOrganisations: () => Promise<void>
    handleSelect: (org: Organisation) => void
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    handleDelete: () => Promise<void>
    handleSave: () => Promise<void>
    handleLeave: (orgId: number) => Promise<void>
    handleJoin: (orgId: number) => Promise<void>
    setSelected: (org: Organisation | null) => void
    setForm: (form: Partial<Organisation>) => void
}

export function useOrganisations(): UseOrganisationsReturn {
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

    const handleLeave = async (orgId: number) => {
        try {
            await apiClient.post(`/api/organisations/${orgId}/leave`)
            await fetchOrganisations()
        } catch (err) {
            setError('Failed to leave organisation')
        }
    }

    const handleJoin = async (orgId: number) => {
        try {
            await apiClient.post(`/api/organisations/${orgId}/join`)
            await fetchOrganisations()
        } catch (err) {
            setError('Failed to join organisation')
        }
    }

    return {
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
        handleJoin,
        setSelected,
        setForm,
    }
}
