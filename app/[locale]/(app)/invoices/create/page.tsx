'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'

import {
    IssuerSection,
    ClientSection,
    InvoiceDetailsSection,
} from '@/components/invoices'
import { useOrganisations } from '@/hooks/useOrganisations'
import { PDFViewer } from '@react-pdf/renderer'

const PDFInvoicePreview = dynamic(
    () => import('@/components/invoices/PDFInvoicePreview'),
    { ssr: false },
)

export default function CreateInvoicePage() {
    const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now())
    const [invoiceDate, setInvoiceDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    )
    const [dueDate, setDueDate] = useState('')
    const [reference, setReference] = useState('')

    const { organisations, fetchOrganisations } = useOrganisations()
    const [issuerId, setIssuerId] = useState<number | null>(null)
    const [issuer, setIssuer] = useState<any>({})
    const [clientId, setClientId] = useState<number | null>(null)
    const [client] = useState<any>({})
    const [errors] = useState<any>({})

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === issuerId)
        if (org) setIssuer(org)
    }, [issuerId, organisations])

    return (
        <main
            id="create-invoice"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <form className="py-8">
                    <InvoiceDetailsSection
                        invoiceNumber={invoiceNumber}
                        setInvoiceNumber={setInvoiceNumber}
                        invoiceDate={invoiceDate}
                        setInvoiceDate={setInvoiceDate}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        reference={reference}
                        setReference={setReference}
                    />
                    <section id="billing-parties">
                        <IssuerSection
                            organisations={organisations}
                            issuerId={issuerId}
                            setIssuerId={setIssuerId}
                            issuer={issuer}
                            errors={errors}
                        />
                        <ClientSection
                            organisations={organisations}
                            clientId={clientId}
                            setClientId={setClientId}
                            client={client}
                            errors={errors}
                        />
                    </section>
                </form>
                <aside className="h-[800px]">
                    <PDFInvoicePreview
                        invoiceNumber={invoiceNumber}
                        issuer={issuer}
                        client={client}
                    />
                </aside>
            </div>
        </main>
    )
}
