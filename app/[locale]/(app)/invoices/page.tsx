'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Invoice } from '@/types/Invoice'
import { useInvoiceTable } from '@/hooks/useInvoiceTable'
import {
    InvoiceTable,
    InvoicePagination,
    PDFInvoicePreview,
} from '@/components/invoices'

import { InputField, Button } from '@/components/ui'

export default function InvoicesPage() {
    const t = useTranslations('Invoices')
    const {
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
    } = useInvoiceTable()

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

    return (
        <main className="flex h-screen text-[var(--color-foreground)] p-6 gap-4 overflow-hidden">
            {/* Table */}
            <div className="flex-1 overflow-x-auto rounded-xl bg-[var(--secondary-background)] shadow-md p-4">
                <InvoiceTable
                    invoices={sortedInvoices}
                    loading={loading}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={setSortBy}
                    onSelect={setSelectedInvoice}
                />

                <InvoicePagination
                    page={page}
                    onPageChange={setPage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={setRowsPerPage}
                    pagination={pagination}
                />
            </div>

            {selectedInvoice && (
                <PDFInvoicePreview
                    invoice={selectedInvoice}
                    showToolbar={true}
                />
            )}
        </main>
    )
}
