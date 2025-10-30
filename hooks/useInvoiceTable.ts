'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import apiClient from '@/lib/apiClient'
import { Invoice, Issuer, Client, InvoiceResponse } from '@/types/Invoice'
import { PaginatedResponse } from '@/types/Pagination'

const normalizeDate = (date: string | null | undefined): string =>
    date && !isNaN(Date.parse(date))
        ? new Date(date).toISOString().split('T')[0]
        : ''

type SortKey = 'invoice_number' | 'invoice_date' | 'client_name' | 'total'

export type SortField =
    | 'invoice_number'
    | 'invoice_date'
    | 'created_at'
    | 'client_name'
    | 'total'
    | 'status'

interface UseInvoiceTableReturn {
    invoices: Invoice[]
    loading: boolean
    error: string | null
    pagination: PaginatedResponse<InvoiceResponse>['meta'] | null
    page: number
    setPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (rowsPerPage: number) => void
    sortBy: SortField
    setSortBy: (sortBy: SortField) => void
    sortOrder: 'asc' | 'desc'
    setSortOrder: (sortOrder: 'asc' | 'desc') => void
    searchTerm: string
    setSearchTerm: (searchTerm: string) => void
    fetchInvoices: () => Promise<void>
}

export function useInvoiceTable(): UseInvoiceTableReturn {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState<
        PaginatedResponse<InvoiceResponse>['meta'] | null
    >(null)

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sortBy, setSortBy] = useState<SortField>('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [searchTerm, setSearchTerm] = useState('')

    // Convert backend response to frontend Invoice format
    const mapResponseToInvoice = useCallback(
        (response: InvoiceResponse): Invoice => {
            const defaultIssuer: Issuer = {
                id: response.organisation?.id ?? 1,
                name: '',
                street: '',
                city: '',
                region: '',
                zip: '',
                phone: '',
                email: '',
            }

            const defaultClient: Client = {
                name: '',
                street: '',
                city: '',
                region: '',
                zip: '',
                phone: '',
                email: '',
            }

            return {
                invoiceType: response.invoice_type,
                invoiceDetails: {
                    id: response.id,
                    invoiceNumber: response.invoice_number,
                    invoiceDate: normalizeDate(response.invoice_date),
                    dueDate: normalizeDate(response.due_date),
                    reference: response.reference ?? '',
                },
                issuer: {
                    ...defaultIssuer,
                    ...response.issuer,
                },
                client: {
                    ...defaultClient,
                    ...response.client,
                },
                items: response.items.map(item => ({
                    name: item.name,
                    description: item.description ?? '',
                    rate: Number(item.rate),
                    quantity: Number(item.quantity),
                })),
                totals: response.totals,
                legal: response.legal ?? { termsAndConditions: '' },
                footer: response.footer ?? { notes: '' },
                attachments: [],
                bankDetails: response.bank_details,
            }
        },
        [],
    )

    // Fetch invoices with pagination
    const fetchInvoices = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await apiClient.get<
                PaginatedResponse<InvoiceResponse>
            >('/api/invoices', {
                params: {
                    page,
                    per_page: rowsPerPage,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    search: searchTerm,
                },
            })

            if (!response.data?.data) {
                throw new Error('Invalid API response format.')
            }

            const mappedInvoices = response.data.data.map(mapResponseToInvoice)
            setInvoices(mappedInvoices)
            setPagination(response.data.meta)
        } catch (err) {
            console.error('Failed to load invoices:', err)
            setError('Failed to load invoices. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [page, rowsPerPage, sortBy, sortOrder, searchTerm, mapResponseToInvoice])

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
