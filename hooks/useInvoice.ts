'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
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
import { useTranslations } from 'next-intl'
import { parseBackendErrors, BackendErrors } from '@/lib/errorUtils'

const normalizeDate = (date: string | null | undefined): string =>
    date && !isNaN(Date.parse(date))
        ? new Date(date).toISOString().split('T')[0]
        : ''

export function useInvoiceForm(initialInvoiceId?: number) {
    const { organisations, fetchOrganisations } = useOrganisations()
    const t = useTranslations()

    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        id: initialInvoiceId ?? 0,
        invoiceNumber: `INV-${new Date()
            .toISOString()
            .slice(0, 10)
            .replace(
                /-/g,
                '',
            )}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: '',
        reference: '',
    })

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

    const [items, setItems] = useState<InvoiceItem[]>([
        { name: '', description: '', rate: 0, quantity: 1 },
    ])

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

    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<BackendErrors>({})

    // Load organisations on mount
    useEffect(() => {
        fetchOrganisations().catch(err =>
            console.error('Failed to load organisations:', err),
        )
    }, [fetchOrganisations])

    // Auto-fill issuer when selected
    useEffect(() => {
        if (!issuerId) return
        const org = organisations.find(o => o.id === issuerId)
        setIssuer(
            org ?? {
                name: '',
                street: '',
                city: '',
                region: '',
                zip: '',
                phone: '',
                email: '',
            },
        )
    }, [issuerId, organisations])

    // Auto-fill client when selected
    useEffect(() => {
        if (!clientId) return
        const org = organisations.find(o => o.id === clientId)
        setClient(
            org ?? {
                name: '',
                street: '',
                city: '',
                region: '',
                zip: '',
                phone: '',
                email: '',
            },
        )
    }, [clientId, organisations])

    // Field setters
    const setInvoiceDetailsField = useCallback(
        (field: keyof InvoiceDetails, value: string) =>
            setInvoiceDetails(prev => ({ ...prev, [field]: value })),
        [],
    )

    const setIssuerField = useCallback(
        (field: keyof Issuer, value: string) =>
            setIssuer(prev => ({ ...prev, [field]: value })),
        [],
    )

    const setClientField = useCallback(
        (field: keyof Client, value: string) =>
            setClient(prev => ({ ...prev, [field]: value })),
        [],
    )

    const setTotalsField = useCallback(
        <K extends keyof InvoiceTotals>(field: K, value: InvoiceTotals[K]) =>
            setTotals(prev => ({ ...prev, [field]: value })),
        [],
    )

    const addItem = () =>
        setItems(prev => [
            ...prev,
            { name: '', description: '', rate: 0, quantity: 1 },
        ])

    const updateItem = useCallback(
        (index: number, field: keyof InvoiceItem, value: string | number) =>
            setItems(prev =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item,
                ),
            ),
        [],
    )

    const removeItem = (index: number) =>
        setItems(prev => prev.filter((_, i) => i !== index))

    // Derived totals (memoized)
    const computedTotals = useMemo(
        () =>
            calculateTotals({
                items,
                taxRate: totals.taxRate,
                discount: totals.discount,
                shipping: totals.shipping,
                deposit: totals.deposit,
                payments: totals.payments,
            }),
        [
            items,
            totals.taxRate,
            totals.discount,
            totals.shipping,
            totals.deposit,
            totals.payments,
        ],
    )

    useEffect(() => {
        setTotals(prev => ({
            ...prev,
            sum: computedTotals.subtotal ?? 0,
            totalNet:
                (computedTotals.subtotal ?? 0) -
                (computedTotals.discountAmount ?? 0),
            totalGross: computedTotals.total ?? 0,
            amountDue: computedTotals.amountDue ?? 0,
        }))
    }, [computedTotals])

    useEffect(() => {
        if (!initialInvoiceId) return
        const loadInvoice = async () => {
            setLoading(true)
            try {
                const res = await apiClient.get(
                    `/api/invoices/${initialInvoiceId}`,
                )
                const inv = res.data?.data
                if (!inv) throw new Error('Invoice not found')

                setInvoiceDetails({
                    id: inv.id,
                    invoiceNumber: inv.invoice_number,
                    invoiceDate: normalizeDate(inv.invoice_date),
                    dueDate: normalizeDate(inv.due_date),
                    reference: inv.reference ?? '',
                })
                setIssuer(inv.issuer ?? {})
                setClient(inv.client ?? {})
                setItems(
                    inv.items?.map((item: any) => ({
                        name: item.name,
                        description: item.description ?? '',
                        rate: Number(item.rate),
                        quantity: Number(item.quantity),
                    })) ?? [],
                )
                setTotals(inv.totals ?? totals)
            } catch (err) {
                console.error('Failed to load invoice:', err)
                setError(
                    t('errors.loadFailed') || 'Unable to load invoice data.',
                )
            } finally {
                setLoading(false)
            }
        }
        loadInvoice()
    }, [initialInvoiceId, t])

    const saveInvoice = async () => {
        setSaving(true)
        setError(null)
        setFieldErrors({})

        const payload: Invoice = {
            invoiceDetails,
            issuer,
            client,
            items,
            totals: {
                ...totals,
                sum: computedTotals.subtotal ?? 0,
                totalNet:
                    (computedTotals.subtotal ?? 0) -
                    (computedTotals.discountAmount ?? 0),
                totalGross: computedTotals.total ?? 0,
                amountDue: computedTotals.amountDue ?? 0,
            },
        }

        try {
            const url = initialInvoiceId
                ? `/api/invoices/${initialInvoiceId}`
                : '/api/invoices'
            const method = initialInvoiceId ? 'put' : 'post'
            const res = await apiClient[method](url, payload)
            return { success: true, data: res.data }
        } catch (err: unknown) {
            const parsed = parseBackendErrors(err, t, 'Invoices')
            setFieldErrors(parsed)
            setError(
                parsed.general?.[0] ||
                    Object.values(parsed)[0]?.[0] ||
                    t('errors.saveFailed'),
            )
            return { success: false, error: err }
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
        computedTotals,
        loading,
        saving,
        error,
        fieldErrors,
        saveInvoice,
    }
}
