'use client'

import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from 'use-debounce'
import { useTranslations } from 'next-intl'
import PDFInvoiceDocument from './PDFInvoiceDocument'
import { Invoice } from '@/types/Invoice'

function PDFSkeleton() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[var(--background)] animate-pulse">
            <div className="w-[90%] h-[95%] rounded-xl bg-[var(--foreground)]/10 shadow-inner" />
        </div>
    )
}

export default function PDFInvoicePreview({ invoice }: { invoice: Invoice }) {
    const t = useTranslations('Invoices.PDF')
    const [debouncedInvoice] = useDebounce(invoice, 400)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        let active = true
        async function generate() {
            setIsGenerating(true)
            try {
                const blob = await pdf(
                    <PDFInvoiceDocument
                        invoiceDetails={debouncedInvoice.invoiceDetails}
                        issuer={debouncedInvoice.issuer}
                        client={debouncedInvoice.client}
                        items={debouncedInvoice.items}
                        totals={debouncedInvoice.totals}
                        legal={debouncedInvoice.legal}
                        footer={debouncedInvoice.footer}
                        t={{
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
                            totalNet: t('totalNet'),
                            tax: t('tax'),
                            totalGross: t('totalGross'),
                            amountDue: t('amountDue'),
                        }}
                    />,
                ).toBlob()
                if (!active) return
                const url = URL.createObjectURL(blob)
                setPdfUrl(prev => {
                    if (prev) URL.revokeObjectURL(prev)
                    return url
                })
            } catch (err) {
                console.error('PDF generation failed:', err)
            } finally {
                if (active) setIsGenerating(false)
            }
        }

        generate()
        return () => {
            active = false
        }
    }, [debouncedInvoice, t])

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[var(--background)] text-[var(--foreground)] shadow-sm">
            <AnimatePresence>
                {isGenerating && (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10">
                        <PDFSkeleton />
                    </motion.div>
                )}
            </AnimatePresence>

            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    className="w-full h-full border-none"
                    title="Invoice PDF Preview"
                />
            ) : (
                <PDFSkeleton />
            )}
        </div>
    )
}
