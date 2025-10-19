'use client'

import dynamic from 'next/dynamic'
import PDFInvoiceDocument from './PDFInvoiceDocument'

// Dynamically import PDFViewer for client-side only rendering
const PDFViewer = dynamic(
    async () => (await import('@react-pdf/renderer')).PDFViewer,
    { ssr: false },
)

interface PDFInvoicePreviewProps {
    invoice: any
}

export default function PDFInvoicePreview({ invoice }: PDFInvoicePreviewProps) {
    return (
        <div className="relative flex flex-col w-full h-full rounded-xl overflow-hidden bg-[var(--background)] text-[var(--foreground)] shadow-sm transition-all duration-300">
            <PDFViewer
                width="100%"
                height="100%"
                showToolbar={false}
                style={{
                    border: 'none',
                    backgroundColor: 'var(--background)',
                }}
                scale={1.05}>
                <PDFInvoiceDocument
                    invoiceDetails={invoice.invoiceDetails}
                    issuer={invoice.issuer}
                    client={invoice.client}
                    items={invoice.items}
                />
            </PDFViewer>
        </div>
    )
}
