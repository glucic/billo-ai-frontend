'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'

import {
    InvoiceDetailsSection,
    IssuerSection,
    ClientSection,
    ItemsSection,
} from '@/components/invoices'

interface Organisation {
    id: number
    name: string
    address: string
    phone: string
    email: string
    city: string
    state: string
    zip: string
}

type FormOrganisation = Organisation & {
    [key: string]: any
}

interface InvoiceItem {
    name: string
    description: string
    rate: number
    quantity: number
}

import { useOrganisations } from '@/hooks/useOrganisations'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

const PDFInvoicePreview = dynamic(
    () => import('@/components/invoices/PDFInvoicePreview'),
    { ssr: false },
)

export default function CreateInvoicePage() {
    const t = useTranslations('Invoices.Create')
    const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now())
    const [invoiceDate, setInvoiceDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    )
    const [dueDate, setDueDate] = useState('')
    const [reference, setReference] = useState('')

    const { organisations, fetchOrganisations } = useOrganisations()
    const [issuerId, setIssuerId] = useState<number | null>(null)
    const [issuer, setIssuer] = useState<Organisation>({
        id: 0,
        name: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        zip: '',
    })
    const [clientId, setClientId] = useState<number | null>(null)
    const [client, setClient] = useState<any>({
        name: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        zip: '',
    })
    const [errors] = useState<any>({})

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === issuerId) as
            | FormOrganisation
            | undefined
        if (org) {
            setIssuer({
                id: org.id,
                name: org.name || '',
                address: org.address || '',
                phone: org.phone || '',
                email: org.email || '',
                city: org.city || '',
                state: org.state || '',
                zip: org.zip || '',
            })
        }
    }, [issuerId, organisations])

    const setIssuerField = (field: keyof typeof issuer, value: string) => {
        setIssuer((prev: typeof issuer) => ({
            ...prev,
            [field]: value,
        }))
    }

    const setClientField = (field: keyof typeof client, value: string) => {
        setClient((prev: typeof client) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            invoiceDetails: {
                invoiceNumber,
                invoiceDate,
                dueDate,
                reference,
            },
            issuer,
            client,
        }
        console.log('Form Data:', formData)
    }

    return (
        <main
            id="create-invoice"
            className="flex flex-col h-screen overflow-hidden text-[var(--color-foreground)] p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 h-0">
                <form
                    id="create-invoice-form"
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto pr-2 md:pr-4">
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

                    <IssuerSection
                        organisations={organisations}
                        issuerId={issuerId}
                        setIssuerId={setIssuerId}
                        issuer={issuer}
                        setIssuerField={setIssuerField}
                    />

                    <ClientSection
                        organisations={organisations}
                        clientId={clientId}
                        setClientId={setClientId}
                        client={client}
                        setClientField={setClientField}
                    />

                    <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-neutral-300 dark:border-neutral-700 py-4 flex justify-end px-6 flex-row gap-2">
                        <Button
                            variant="ghost"
                            href="/invoices"
                            animated={false}
                            className="px-6 py-3">
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            form="create-invoice-form"
                            variant="primary"
                            animated={false}
                            className="px-6 py-3">
                            {t('save')}
                        </Button>
                    </section>
                </form>

                <aside
                    id="pdf-invoice-preview"
                    className="w-full md:w-[45%] flex-shrink-0 sticky top-0 h-full border-l border-neutral-300 dark:border-neutral-700 p-4 overflow-hidden">
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
