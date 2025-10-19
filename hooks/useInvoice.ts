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
    InvoiceTotals,
} from '@/types/Invoice'
import { useOrganisations } from '@/hooks/useOrganisations'
import { calculateTotals } from '@/lib/invoiceCalculations'

export function useInvoiceForm(initialInvoiceId?: number) {
    const { organisations, fetchOrganisations } = useOrganisations()

    // ─── Invoice Details ──────────────────────────────
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        id: initialInvoiceId ?? 0,
        invoiceNumber: 'INV-' + Date.now(),
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: '',
        reference: '',
    })

    // ─── Issuer & Client ──────────────────────────────
    const [issuerId, setIssuerId] = useState<number | null>(null)
    const [issuer, setIssuer] = useState<Issuer>({
        name: '',
        street: '',
        city: '',
        region: '',
        zip: '',
        phone: '',
        email: '',
    })

    const [clientId, setClientId] = useState<number | null>(null)
    const [client, setClient] = useState<Client>({
        name: '',
        street: '',
        city: '',
        region: '',
        zip: '',
        phone: '',
        email: '',
    })

    // ─── Items ──────────────────────────────
    const [items, setItems] = useState<InvoiceItem[]>([
        { name: '', description: '', rate: 0, quantity: 1 },
    ])

    // ─── Totals ──────────────────────────────
    const [totals, setTotals] = useState<InvoiceTotals>({
        currency: 'EUR',
        taxRate: 19,
        discount: 0,
        shipping: 0,
        deposit: 0,
        payments: 0,
        sum: 0,
        totalNet: 0,
        totalGross: 0,
        amountDue: 0,
    })

    // ─── Loading / Error ──────────────────────────────
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // ─── Fetch Organisations ──────────────────────────────
    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    // ─── Auto-fill Issuer / Client from orgs ──────────────────────────────
    useEffect(() => {
        const org = organisations.find(o => o.id === issuerId)
        if (org) {
            setIssuer({
                name: org.name,
                street: org.street,
                city: org.city,
                region: org.region,
                zip: org.zip,
                phone: org.phone,
                email: org.email,
            })
        }
    }, [issuerId, organisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === clientId)
        if (org) {
            setClient({
                name: org.name,
                street: org.street,
                city: org.city,
                region: org.region,
                zip: org.zip,
                phone: org.phone,
                email: org.email,
            })
        }
    }, [clientId, organisations])

    // ─── Field Setters ──────────────────────────────
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

    const setTotalsField = useCallback(
        <K extends keyof InvoiceTotals>(field: K, value: InvoiceTotals[K]) => {
            setTotals(prev => ({ ...prev, [field]: value }))
        },
        [],
    )

    // ─── Items Handling ──────────────────────────────
    const addItem = () => {
        setItems(prev => [
            ...prev,
            { id: Date.now(), name: '', description: '', rate: 0, quantity: 1 },
        ])
    }

    const updateItem = useCallback(
        (index: number, field: keyof InvoiceItem, value: string | number) => {
            setItems(prev =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item,
                ),
            )
        },
        [],
    )

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    // ─── Auto-update Totals ──────────────────────────────
    useEffect(() => {
        const calc = calculateTotals({
            items,
            taxRate: totals.taxRate,
            discount: totals.discount,
            shipping: totals.shipping,
            deposit: totals.deposit,
            payments: totals.payments,
        })

        setTotals(prev => ({
            ...prev,
            sum: calc.subtotal ?? 0,
            totalNet: (calc.subtotal ?? 0) - (calc.discountAmount ?? 0),
            totalGross: calc.total ?? 0,
            amountDue: calc.amountDue ?? 0,
        }))
    }, [
        items,
        totals.taxRate,
        totals.discount,
        totals.shipping,
        totals.deposit,
        totals.payments,
    ])

    // ─── Save Invoice ──────────────────────────────
    const saveInvoice = async () => {
        setSaving(true)
        setError(null)

        const payload: Invoice = {
            invoiceDetails,
            issuer,
            client,
            items,
            totals,
        }

        try {
            const res = await apiClient.post('/api/invoices', payload)
            return res.data
        } catch (err: unknown) {
            console.error(err)
            const message =
                err instanceof Error ? err.message : 'Failed to save invoice'
            setError(message)
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
        totals,
        setTotalsField,
        loading,
        saving,
        error,
        saveInvoice,
    }
}
