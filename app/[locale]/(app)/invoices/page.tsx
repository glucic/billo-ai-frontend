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
import { XIcon, MaximizeIcon, MinimizeIcon, PlusIcon } from 'lucide-react'

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
        searchTerm,
        setSearchTerm,
    } = useInvoiceTable()

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const closePreview = () => {
        setSelectedInvoice(null)
        setIsFullscreen(false)
    }

    const toggleFullscreen = () => setIsFullscreen(prev => !prev)

    return (
        <main className="flex h-screen text-[var(--color-foreground)] p-6 overflow-hidden">
            <div
                className={`flex flex-col rounded-xl bg-[var(--secondary-background)] shadow-md p-4 transition-all duration-500 ease-in-out
                    ${
                        selectedInvoice
                            ? isFullscreen
                                ? 'md:basis-0 md:max-w-0'
                                : 'md:basis-2/3 md:max-w-2/3'
                            : 'flex-1'
                    }`}>
                <header className="flex items-center justify-between m-4">
                    <h1 className="text-2xl font-bold">{t('title')}</h1>
                    <Button variant="ghost" href="/invoices/create">
                        <PlusIcon /> {t('create')}
                    </Button>
                </header>

                <div className="flex-1 min-h-0">
                    <InvoiceTable
                        invoices={invoices}
                        loading={loading}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={setSortBy}
                        searchTerm={searchTerm}
                        onSearch={setSearchTerm}
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
                <div
                    className={`flex flex-col transition-all duration-500 ease-in-out
                        ${
                            isFullscreen
                                ? 'fixed inset-0 z-50 bg-[var(--secondary-background)]'
                                : 'md:basis-1/3 md:max-w-1/3'
                        }`}>
                    <div
                        className={`flex items-center justify-end p-2 border-b border-[var(--divider)]`}>
                        <div>
                            <Button
                                size="md"
                                variant="icon"
                                motionEffect
                                animated
                                onClick={toggleFullscreen}>
                                {isFullscreen ? (
                                    <MinimizeIcon />
                                ) : (
                                    <MaximizeIcon />
                                )}
                            </Button>
                        </div>
                        <div>
                            <Button
                                size="md"
                                variant="icon"
                                motionEffect
                                animated
                                onClick={closePreview}>
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <PDFInvoicePreview invoice={selectedInvoice} />
                    </div>
                </div>
            )}
        </main>
    )
}
