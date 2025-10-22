'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Invoice } from '@/types/Invoice'
import {
    InvoiceTable,
    InvoicePagination,
    PDFInvoicePreview,
} from '@/components/invoices'
import { Button } from '@/components/ui'
import { useInvoiceTable } from '@/hooks/useInvoiceTable'
import { XIcon } from 'lucide-react'

export default function InvoicesPage() {
    const t = useTranslations('Invoices')

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
    } = useInvoiceTable()

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

    const closePreview = () => setSelectedInvoice(null)

    return (
        <main className="flex h-screen text-[var(--color-foreground)] p-6 overflow-hidden">
            <div
                className={`flex-1 flex flex-col rounded-xl bg-[var(--secondary-background)] shadow-md p-4 transition-all duration-300 ease-in-out ${selectedInvoice ? 'md:basis-1/2 md:max-w-1/2' : ''}`}>
                <header className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">{t('title')}</h1>
                    </div>
                    <div>
                        <Button variant="primary" href="/invoices/create">
                            {t('create')}
                        </Button>
                    </div>
                </header>

                <div className="flex-1 min-h-0">
                    <InvoiceTable
                        invoices={invoices}
                        loading={loading}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={setSortBy}
                        onSelect={setSelectedInvoice}
                        onDownloadPDF={() => {}}
                        onArchive={() => {}}
                    />
                </div>

                <footer className="mt-4">
                    <InvoicePagination
                        page={page}
                        onPageChange={setPage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={setRowsPerPage}
                        pagination={pagination}
                    />
                </footer>
            </div>

            {selectedInvoice && (
                <>
                    <div
                        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${selectedInvoice ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div
                            className="absorelute inset-0 bg-black/50"
                            onClick={closePreview}></div>
                        <div className="relative inset-y-0 right-0 w-full bg-[var(--secondary-background)] p-4 overflow-auto">
                            <div className="flex items-center justify-end mb-2">
                                <Button
                                    variant="icon"
                                    motionEffect
                                    onClick={closePreview}>
                                    <XIcon />
                                </Button>
                            </div>
                            <PDFInvoicePreview invoice={selectedInvoice} />
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-center justify-start basis-1/2 max-w-1/2 transition-all duration-500">
                        <div className="w-full h-full p-4">
                            <div className="flex items-center justify-end mb-2">
                                <Button
                                    size="md"
                                    variant="icon"
                                    motionEffect
                                    animated={true}
                                    onClick={closePreview}>
                                    <XIcon />
                                </Button>
                            </div>
                            <PDFInvoicePreview invoice={selectedInvoice} />
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}
