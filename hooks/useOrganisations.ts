import { useState, useCallback } from 'react'
import apiClient from '@/lib/apiClient'
import { Organisation } from '@/types/Organisation'

export interface UseOrganisationsReturn {
    organisations: Organisation[]
    selected: Organisation | null
    form: Partial<Organisation>
    loading: boolean
    saving: boolean
    deleting: boolean
    error: string | null
    fetchOrganisations: () => Promise<void>
    fetchOrganisationById: (id: string | number) => Promise<void>

    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    handleSave: (id?: number) => Promise<void>
    handleDelete: (id?: number) => Promise<void>

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
        } catch {
            setError('Failed to load organisations')
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchOrganisationById = useCallback(async (id: string | number) => {
        setLoading(true)
        try {
            const res = await apiClient.get(`/api/organisations/${id}`)
            const org = res.data.data || res.data
            setSelected(org)
            setForm(org)
            setError(null)
        } catch {
            setError('Failed to load organisation')
        } finally {
            setLoading(false)
        }
    }, [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async (id?: number) => {
        const orgId = id || selected?.id
        if (!orgId) return
        setSaving(true)
        setError(null)
        try {
            await apiClient.put(`/api/organisations/${orgId}`, form)
            setOrganisations(orgs =>
                orgs.map(o => (o.id === orgId ? { ...o, ...form } : o)),
            )
        } catch {
            setError('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id?: number) => {
        const orgId = id || selected?.id
        if (!orgId) return
        if (
            !window.confirm(
                'Are you sure you want to delete this organisation?',
            )
        )
            return
        setDeleting(true)
        setError(null)
        try {
            await apiClient.delete(`/api/organisations/${orgId}`)
            setOrganisations(orgs => orgs.filter(o => o.id !== orgId))
            setSelected(null)
        } catch {
            setError('Failed to delete organisation')
        } finally {
            setDeleting(false)
        }
    }

    const handleLeave = async (orgId: number) => {
        try {
            await apiClient.post(`/api/organisations/${orgId}/leave`)
            await fetchOrganisations()
        } catch {
            setError('Failed to leave organisation')
        }
    }

    const handleJoin = async (orgId: number) => {
        try {
            await apiClient.post(`/api/organisations/${orgId}/join`)
            await fetchOrganisations()
        } catch {
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
        fetchOrganisationById,
        handleChange,
        handleSave,
        handleDelete,
        handleLeave,
        handleJoin,
        setSelected,
        setForm,
    }
}
