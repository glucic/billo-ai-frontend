'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import apiClient from '@/lib/apiClient'
import {
    Client,
    Issuer,
    InvoiceDetails,
    InvoiceItem,
    Invoice,
} from '@/types/invoice'
import { useOrganisations } from '@/hooks/useOrganisations'

export function useInvoiceForm(initialInvoiceId?: number) {
    const { organisations, fetchOrganisations } = useOrganisations()

    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        id: initialInvoiceId ?? 0,
        invoiceNumber: 'INV-' + Date.now(),
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: '',
        reference: '',
    })

    const [issuerId, setIssuerId] = useState<number | null>(null)
    const [issuer, setIssuer] = useState<Issuer>({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
    })

    const [clientId, setClientId] = useState<number | null>(null)
    const [client, setClient] = useState<Client>({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
    })

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 0, name: '', description: '', rate: 0, quantity: 1 },
    ])

    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === issuerId)
        if (org)
            setIssuer({
                name: org.name,
                address: org.address,
                city: org.city,
                state: org.state,
                zip: org.zip,
                phone: org.phone,
                email: org.email,
            })
    }, [issuerId, organisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === clientId)
        if (org)
            setClient({
                name: org.name,
                address: org.address,
                city: org.city,
                state: org.state,
                zip: org.zip,
                phone: org.phone,
                email: org.email,
            })
    }, [clientId, organisations])

    const setInvoiceDetailsField = useCallback(
        (field: keyof InvoiceDetails, value: string) => {
            setInvoiceDetails(prev => ({ ...prev, [field]: value }))
        },
        [],
    )

    const setIssuerField = useCallback((field: keyof Issuer, value: string) => {
        setIssuer(prev => ({ ...prev, [field]: value }))
    }, [])

    const setClientField = useCallback((field: keyof Client, value: string) => {
        setClient(prev => ({ ...prev, [field]: value }))
    }, [])

    const addItem = () => {
        setItems(prev => [
            ...prev,
            { id: Date.now(), name: '', description: '', rate: 0, quantity: 1 },
        ])
    }

    const updateItem = (
        index: number,
        field: keyof InvoiceItem,
        value: any,
    ) => {
        setItems(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
            ),
        )
    }

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    const saveInvoice = async () => {
        setSaving(true)
        setError(null)

        const payload: Invoice = {
            invoiceDetails,
            issuer,
            client,
            items,
        }

        try {
            const res = await apiClient.post('/api/invoices', payload)
            return res.data
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to save invoice')
            throw err
        } finally {
            setSaving(false)
        }
    }

    return {
        organisations,
        invoiceDetails,
        setInvoiceDetailsField,
        issuer,
        setIssuerField,
        issuerId,
        setIssuerId,
        client,
        setClientField,
        clientId,
        setClientId,
        items,
        addItem,
        updateItem,
        removeItem,
        loading,
        saving,
        error,
        saveInvoice,
    }
}
