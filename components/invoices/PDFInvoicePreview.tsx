'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import PDFInvoiceDocument from './PDFInvoiceDocument'
import { Invoice } from '@/types/Invoice'
import { useTranslations } from 'next-intl'

const PDFViewer = dynamic(
    async () => (await import('@react-pdf/renderer')).PDFViewer,
    { ssr: false },
)

interface PDFInvoicePreviewProps {
    invoice: Invoice
}

export default function PDFInvoicePreview({ invoice }: PDFInvoicePreviewProps) {
    const t = useTranslations('Invoices.PDF')
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const labels = {
        title: t('title'),
        invoiceNumber: t('invoiceNumber'),
        invoiceDate: t('invoiceDate'),
        dueDate: t('dueDate'),
        reference: t('reference'),
        from: t('from'),
        billTo: t('billTo'),
        items: t('items'),
        name: t('name'),
        description: t('description'),
        quantity: t('quantity'),
        unitPrice: t('unitPrice'),
        subtotal: t('subtotal'),
        sumNet: t('sumNet'),
        discount: t('discount'),
        totalNet: t('totalNet'),
        shipping: t('shipping'),
        tax: t('tax'),
        totalGross: t('totalGross'),
        deposit: t('deposit'),
        payments: t('payments'),
        amountDue: t('amountDue'),
    }

    return (
        <div className="relative flex flex-col w-full h-full rounded-xl overflow-hidden bg-[var(--background)] text-[var(--foreground)] shadow-sm transition-all duration-300">
            <PDFViewer
                key={invoice.invoiceDetails.invoiceNumber}
                width="100%"
                height="100%"
                showToolbar={false}
                style={{
                    border: 'none',
                    backgroundColor: 'var(--background)',
                }}>
                <PDFInvoiceDocument
                    invoiceDetails={invoice.invoiceDetails}
                    issuer={invoice.issuer}
                    client={invoice.client}
                    items={invoice.items}
                    totals={invoice.totals}
                    t={labels}
                />
            </PDFViewer>
        </div>
    )
}
