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
    } = useInvoiceTable()

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

    return (
        <main className="flex h-screen text-[var(--color-foreground)] p-6 gap-4 overflow-hidden">
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
                <div className="hidden md:flex flex-col items-center justify-start w-[480px] xl:w-[600px] transition-all duration-300">
                    <PDFInvoicePreview invoice={selectedInvoice} />
                </div>
            )}
        </main>
    )
}
