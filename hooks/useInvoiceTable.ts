import { useMemo } from 'react'
import { listInvoices } from '@/hooks/useInvoice'
import { Invoice } from '@/types/Invoice'

type SortKey = 'invoice_number' | 'invoice_date' | 'client_name' | 'total'

export function useInvoiceTable() {
    const {
        invoices,
        loading,
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
    } = listInvoices()

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
                    const sumA = a.items.reduce(
                        (sum, item) => sum + item.rate * item.quantity,
                        0,
                    )
                    const sumB = b.items.reduce(
                        (sum, item) => sum + item.rate * item.quantity,
                        0,
                    )
                    aValue = sumA
                    bValue = sumB
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
        sortedInvoices,
        loading,
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
    }
}
