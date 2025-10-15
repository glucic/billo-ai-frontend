'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import {
    RiFullscreenLine,
    RiFullscreenExitLine,
    RiToolsLine,
} from 'react-icons/ri'

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
    const [isPreviewFullWidth, setIsPreviewFullWidth] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)

    const { organisations, fetchOrganisations } = useOrganisations()

    const [invoiceDetailsId, setInvoiceDetailsId] = useState<number | null>(
        null,
    )
    const [invoiceDetails, setInvoiceDetails] = useState({
        id: 0,
        invoiceNumber: 'INV-' + Date.now(),
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: '',
        reference: '',
    })

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
    const [client, setClient] = useState<Organisation>({
        id: 0,
        name: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        zip: '',
    })

    const [items, setItems] = useState<InvoiceItem[]>([
        {
            name: '',
            description: '',
            rate: 0,
            quantity: 1,
        },
    ])

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

    const setInvoiceDetailsField = (
        field: keyof typeof invoiceDetails,
        value: string,
    ) => {
        setInvoiceDetails(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const setIssuerField = (field: keyof Organisation, value: string) => {
        setIssuer((prev: Organisation) => ({
            ...prev,
            [field]: value,
        }))
    }

    const setClientField = (field: keyof Organisation, value: string) => {
        setClient((prev: Organisation) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            invoiceDetails,
            issuer,
            client,
            items,
        }
        console.log('Form Data:', formData)
    }

    return (
        <main
            id="create-invoice"
            className="flex flex-col h-screen overflow-hidden text-[var(--color-foreground)] p-4 md:p-6">
            <div className="flex justify-end items-center gap-2 mb-4">
                <Button
                    type="button"
                    variant="secondary"
                    animated={false}
                    onClick={() => setIsPreviewFullWidth(v => !v)}
                    className="px-3 py-2 flex items-center gap-2">
                    {isPreviewFullWidth ? (
                        <RiFullscreenExitLine />
                    ) : (
                        <RiFullscreenLine />
                    )}
                    <span className="hidden md:inline">
                        {isPreviewFullWidth ? 'Exit Fullscreen' : 'Fullscreen'}
                    </span>
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    animated={false}
                    onClick={() => setShowToolbar(v => !v)}
                    className="px-3 py-2 flex items-center gap-2">
                    <RiToolsLine />
                    <span className="hidden md:inline">
                        {showToolbar ? 'Hide Toolbar' : 'Show Toolbar'}
                    </span>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 h-0">
                <form
                    id="create-invoice-form"
                    onSubmit={handleSubmit}
                    className={`overflow-y-auto pr-2 md:pr-4 transition-all duration-300 ease-in-out ${
                        isPreviewFullWidth
                            ? 'flex-none w-0 md:w-0 opacity-0 hidden md:block'
                            : 'flex-1 opacity-100'
                    }`}>
                    <InvoiceDetailsSection
                        invoiceDetailsId={invoiceDetailsId}
                        setInvoiceDetailsId={setInvoiceDetailsId}
                        invoiceDetails={invoiceDetails}
                        setInvoiceDetailsField={setInvoiceDetailsField}
                        error={errors.invoiceDetails}
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

                    <ItemsSection
                        value={items}
                        onChange={setItems}
                        error={errors.items}
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
                    className={`flex-shrink-0 sticky top-0 h-screen border-l border-neutral-300 dark:border-neutral-700 p-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        isPreviewFullWidth
                            ? 'w-full md:w-full'
                            : 'w-full md:w-[45%]'
                    }`}>
                    <PDFInvoicePreview
                        showToolbar={showToolbar}
                        invoiceDetails={invoiceDetails}
                        issuer={issuer}
                        client={client}
                        items={items}
                    />
                </aside>
            </div>
        </main>
    )
}
