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

/* ──────────────────────────────────────────────
 * useInvoiceForm – create & edit logic
 * ────────────────────────────────────────────── */
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

    // Load organisations once
    useEffect(() => {
        fetchOrganisations().catch(err =>
            console.error('Failed to load organisations:', err),
        )
    }, [fetchOrganisations])

    // Auto-fill issuer / client
    useEffect(() => {
        if (!issuerId) return
        const org = organisations.find(o => o.id === issuerId)
        if (org) setIssuer(org)
    }, [issuerId, organisations])

    useEffect(() => {
        if (!clientId) return
        const org = organisations.find(o => o.id === clientId)
        if (org) setClient(org)
    }, [clientId, organisations])

    // Field setters
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

    // Items
    const addItem = () =>
        setItems(prev => [
            ...prev,
            { name: '', description: '', rate: 0, quantity: 1 },
        ])
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
    const removeItem = (index: number) =>
        setItems(prev => prev.filter((_, i) => i !== index))

    // Auto totals
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

    // Load invoice for edit
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
                    invoiceDate: inv.invoice_date?.split('T')[0] || '',
                    dueDate: inv.due_date?.split('T')[0] || '',
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
                setError('Unable to load invoice data.')
            } finally {
                setLoading(false)
            }
        }
        loadInvoice()
    }, [initialInvoiceId])

    // Save / update
    const saveInvoice = async () => {
        setSaving(true)
        setError(null)
        const calc = calculateTotals({
            items,
            taxRate: totals.taxRate,
            discount: totals.discount,
            shipping: totals.shipping,
            deposit: totals.deposit,
            payments: totals.payments,
        })
        const payload: Invoice = {
            invoiceDetails,
            issuer,
            client,
            items,
            totals: {
                ...totals,
                sum: calc.subtotal ?? 0,
                totalNet: (calc.subtotal ?? 0) - (calc.discountAmount ?? 0),
                totalGross: calc.total ?? 0,
                amountDue: calc.amountDue ?? 0,
            },
        }
        try {
            const url = initialInvoiceId
                ? `/api/invoices/${initialInvoiceId}`
                : '/api/invoices'
            const method = initialInvoiceId ? 'put' : 'post'
            const res = await apiClient[method](url, payload)
            return res.data
        } catch (err) {
            console.error(err)
            setError('Failed to save invoice.')
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

/* ──────────────────────────────────────────────
 * listInvoices – list, pagination, sort, search
 * ────────────────────────────────────────────── */
export function listInvoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [pagination, setPagination] = useState<{
        current_page: number
        last_page: number
        per_page: number
        total: number
    } | null>(null)
    const [sortBy, setSortBy] = useState<
        | 'invoice_number'
        | 'invoice_date'
        | 'created_at'
        | 'client_name'
        | 'total'
    >('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [searchTerm, setSearchTerm] = useState('')

    const mapApiInvoice = (apiInvoice: any): Invoice => ({
        invoiceDetails: {
            id: apiInvoice.id,
            invoiceNumber: apiInvoice.invoice_number,
            invoiceDate: apiInvoice.invoice_date,
            dueDate: apiInvoice.due_date ?? '',
            reference: apiInvoice.reference ?? '',
        },
        issuer: apiInvoice.issuer ?? {},
        client: apiInvoice.client ?? {},
        items:
            apiInvoice.items?.map((item: any) => ({
                name: item.name,
                description: item.description ?? '',
                rate: Number(item.rate),
                quantity: Number(item.quantity),
            })) ?? [],
        totals: apiInvoice.totals ?? {
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
        },
    })

    const fetchInvoices = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await apiClient.get('/api/invoices', {
                params: {
                    page,
                    per_page: rowsPerPage,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    search: searchTerm,
                },
            })
            const data = res.data?.data
            if (!data) throw new Error('Invalid API response')
            const mapped = (data.data || []).map(mapApiInvoice)
            setInvoices(mapped)
            setPagination({
                current_page: data.current_page,
                last_page: data.last_page,
                per_page: data.per_page,
                total: data.total,
            })
        } catch (err) {
            console.error(err)
            setError('Failed to load invoices.')
        } finally {
            setLoading(false)
        }
    }, [page, rowsPerPage, sortBy, sortOrder, searchTerm])

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    return {
        invoices,
        loading,
        error,
        pagination,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
        fetchInvoices,
    }
}
