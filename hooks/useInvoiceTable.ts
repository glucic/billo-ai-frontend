'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import apiClient from '@/lib/apiClient'
import {
    Invoice,
    InvoiceDetails,
    Issuer,
    Client,
    InvoiceItem,
    InvoiceTotals,
} from '@/types/Invoice'

const normalizeDate = (date: string | null | undefined): string =>
    date && !isNaN(Date.parse(date))
        ? new Date(date).toISOString().split('T')[0]
        : ''

interface ApiInvoice {
    id: number
    invoice_number: string
    invoice_date: string
    due_date?: string | null
    reference?: string | null
    issuer?: Partial<Issuer>
    client?: Partial<Client>
    items?: {
        name: string
        description?: string
        rate: string | number
        quantity: string | number
    }[]
    totals?: Partial<InvoiceTotals>
}

interface ApiPaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

type SortKey = 'invoice_number' | 'invoice_date' | 'client_name' | 'total'

export function useInvoiceTable() {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState<ApiPaginationMeta | null>(null)

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sortBy, setSortBy] = useState<
        | 'invoice_number'
        | 'invoice_date'
        | 'created_at'
        | 'client_name'
        | 'total'
    >('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [searchTerm, setSearchTerm] = useState('')

    // Normalize API data
    const mapApiInvoice = useCallback((apiInvoice: ApiInvoice): Invoice => {
        const safeIssuer: Issuer = {
            name: apiInvoice.issuer?.name ?? '',
            street: apiInvoice.issuer?.street ?? '',
            city: apiInvoice.issuer?.city ?? '',
            region: apiInvoice.issuer?.region ?? '',
            zip: apiInvoice.issuer?.zip ?? '',
            phone: apiInvoice.issuer?.phone ?? '',
            email: apiInvoice.issuer?.email ?? '',
        }

        const safeClient: Client = {
            name: apiInvoice.client?.name ?? '',
            street: apiInvoice.client?.street ?? '',
            city: apiInvoice.client?.city ?? '',
            region: apiInvoice.client?.region ?? '',
            zip: apiInvoice.client?.zip ?? '',
            phone: apiInvoice.client?.phone ?? '',
            email: apiInvoice.client?.email ?? '',
        }

        return {
            invoiceDetails: {
                id: apiInvoice.id,
                invoiceNumber: apiInvoice.invoice_number,
                invoiceDate: normalizeDate(apiInvoice.invoice_date),
                dueDate: normalizeDate(apiInvoice.due_date),
                reference: apiInvoice.reference ?? '',
            },
            issuer: safeIssuer,
            client: safeClient,
            items:
                apiInvoice.items?.map(item => ({
                    name: item.name,
                    description: item.description ?? '',
                    rate: Number(item.rate),
                    quantity: Number(item.quantity),
                })) ?? [],
            totals: {
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
                ...apiInvoice.totals,
            },
        }
    }, [])

    // Fetch invoices
    const fetchInvoices = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await apiClient.get<{
                data: { data: ApiInvoice[] } & ApiPaginationMeta
            }>('/api/invoices', {
                params: {
                    page,
                    per_page: rowsPerPage,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    search: searchTerm,
                },
            })

            const payload = res.data?.data
            if (!payload?.data) throw new Error('Invalid API response format.')

            const mappedInvoices = payload.data.map(mapApiInvoice)
            setInvoices(mappedInvoices)
            setPagination({
                current_page: payload.current_page,
                last_page: payload.last_page,
                per_page: payload.per_page,
                total: payload.total,
            })
        } catch (err) {
            console.error('Failed to load invoices:', err)
            setError('Failed to load invoices. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [page, rowsPerPage, sortBy, sortOrder, searchTerm, mapApiInvoice])

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    // Client-side sorting (optional refinement)
    const sortedInvoices = useMemo(() => {
        return [...invoices].sort((a: Invoice, b: Invoice) => {
            let aValue: string | number = ''
            let bValue: string | number = ''

            switch (sortBy as SortKey) {
                case 'invoice_number':
                    aValue = a.invoiceDetails.invoiceNumber
                    bValue = b.invoiceDetails.invoiceNumber
                    break
                case 'invoice_date':
                    aValue = new Date(a.invoiceDetails.invoiceDate).getTime()
                    bValue = new Date(b.invoiceDetails.invoiceDate).getTime()
                    break
                case 'client_name':
                    aValue = a.client.name
                    bValue = b.client.name
                    break
                case 'total':
                    const totalA =
                        a.totals?.amountDue ??
                        a.items.reduce(
                            (sum, item) => sum + item.rate * item.quantity,
                            0,
                        )
                    const totalB =
                        b.totals?.amountDue ??
                        b.items.reduce(
                            (sum, item) => sum + item.rate * item.quantity,
                            0,
                        )
                    aValue = totalA
                    bValue = totalB
                    break
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue)
            }

            return sortOrder === 'asc'
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number)
        })
    }, [invoices, sortBy, sortOrder])

    return {
        invoices: sortedInvoices,
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
