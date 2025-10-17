'use client'

import { PDFViewer } from './ClientPDFViewer'
import PDFInvoiceDocument from './PDFInvoiceDocument'

export default function PDFInvoicePreview({
    invoice,
    showToolbar = true,
}) {
    return (
        <div className="w-[700px] h-full overflow-hidden shadow-lg rounded bg-white">
            <PDFViewer width="100%" height="100%" showToolbar={showToolbar}>
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
