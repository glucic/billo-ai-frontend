'use client'

import { useState, useCallback } from 'react'
import apiClient from '@/lib/apiClient'
import { Organisation } from '@/types/Organisation'
import { useTranslations } from 'next-intl'
import { parseBackendErrors, BackendErrors } from '@/lib/errorUtils'

export interface UseOrganisationsReturn {
    organisations: Organisation[]
    selected: Organisation | null
    form: Partial<Organisation>
    loading: boolean
    saving: boolean
    deleting: boolean
    error: string | null
    fieldErrors: BackendErrors
    fetchOrganisations: () => Promise<void>
    fetchOrganisationById: (id: string | number) => Promise<void>
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    handleSave: (id?: number) => Promise<void>
    handleDelete: (id?: number) => Promise<void>
    handleCreate: (payload: Partial<Organisation>) => Promise<void>
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
    const [fieldErrors, setFieldErrors] = useState<BackendErrors>({})

    const t = useTranslations()

    const handleOrgRequest = async (
        requestFn: () => Promise<any>,
        namespace = 'Organisation',
    ) => {
        setError(null)
        setFieldErrors({})
        try {
            const res = await requestFn()
            return res
        } catch (err: any) {
            const parsed = parseBackendErrors(err, t, namespace)
            setFieldErrors(parsed)
            const message =
                parsed.general?.[0] ||
                Object.values(parsed)[0]?.[0] ||
                t(`${namespace}.errors.general`)
            setError(message)
            throw err
        }
    }

    const fetchOrganisations = useCallback(async () => {
        setLoading(true)
        await handleOrgRequest(async () => {
            const res = await apiClient.get('/api/organisations')
            setOrganisations(res.data.data || res.data)
            return res
        }).catch(() => {})
        setLoading(false)
    }, [])

    const fetchOrganisationById = useCallback(async (id: string | number) => {
        setLoading(true)
        await handleOrgRequest(async () => {
            const res = await apiClient.get(`/api/organisations/${id}`)
            const org = res.data.data || res.data
            setSelected(org)
            setForm(org)
            return res
        }).catch(() => {})
        setLoading(false)
    }, [])

    const handleCreate = async (payload: Partial<Organisation>) => {
        return handleOrgRequest(async () => {
            const res = await apiClient.post('/api/organisations', payload)
            setOrganisations(prev => [...prev, res.data])
            return res
        })
    }

    const handleSave = async (id?: number) => {
        const orgId = id || selected?.id
        if (!orgId) return
        setSaving(true)
        await handleOrgRequest(async () => {
            await apiClient.put(`/api/organisations/${orgId}`, form)
            setOrganisations(orgs =>
                orgs.map(o => (o.id === orgId ? { ...o, ...form } : o)),
            )
        }).catch(() => {})
        setSaving(false)
    }

    const handleDelete = async (id?: number) => {
        const orgId = id || selected?.id
        if (!orgId) return
        if (!window.confirm(t('confirmDelete'))) return

        setDeleting(true)
        await handleOrgRequest(async () => {
            await apiClient.delete(`/api/organisations/${orgId}`)
            setOrganisations(orgs => orgs.filter(o => o.id !== orgId))
            setSelected(null)
        }).catch(() => {})
        setDeleting(false)
    }

    const handleLeave = async (orgId: number) =>
        handleOrgRequest(async () => {
            await apiClient.post(`/api/organisations/${orgId}/leave`)
            await fetchOrganisations()
        }).catch(() => {})

    const handleJoin = async (orgId: number) =>
        handleOrgRequest(async () => {
            await apiClient.post(`/api/organisations/${orgId}/join`)
            await fetchOrganisations()
        }).catch(() => {})

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return {
        organisations,
        selected,
        form,
        loading,
        saving,
        deleting,
        error,
        fieldErrors,
        fetchOrganisations,
        fetchOrganisationById,
        handleChange,
        handleSave,
        handleDelete,
        handleCreate,
        handleLeave,
        handleJoin,
        setSelected,
        setForm,
    }
}
