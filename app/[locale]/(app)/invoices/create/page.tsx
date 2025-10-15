'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
    RiFullscreenLine,
    RiFullscreenExitLine,
    RiToolsLine,
} from 'react-icons/ri'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useInvoiceForm } from '@/hooks/useInvoice'
import InvoiceDetailsSection from '@/components/invoices/InvoiceDetailsSection'
import IssuerSection from '@/components/invoices/IssuerSection'
import ClientSection from '@/components/invoices/ClientSection'
import ItemsSection from '@/components/invoices/ItemsSection'

const PDFInvoicePreview = dynamic(
    () => import('@/components/invoices/PDFInvoicePreview'),
    { ssr: false },
)

export default function CreateInvoicePage() {
    const t = useTranslations('Invoices.Create')
    const [isPreviewFullWidth, setIsPreviewFullWidth] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [success, setSuccess] = useState(false)

    const {
        invoiceDetails,
        issuer,
        issuerId,
        setIssuerId,
        setIssuerField,
        client,
        clientId,
        setClientId,
        setClientField,
        items,
        addItem,
        removeItem,
        updateItem,
        setInvoiceDetailsField,
        saveInvoice,
        organisations,
        saving,
        error,
    } = useInvoiceForm()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess(false)
        try {
            await saveInvoice()
            setSuccess(true)
        } catch {
            // error is handled inside the hook
        }
    }

    return (
        <main className="flex flex-col h-screen overflow-hidden text-[var(--color-foreground)] p-4 md:p-6">
            <div className="flex justify-end items-center gap-2 mb-4">
                <Button
                    onClick={() => setIsPreviewFullWidth(v => !v)}
                    variant="secondary">
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
                    onClick={() => setShowToolbar(v => !v)}
                    variant="secondary">
                    <RiToolsLine />
                    <span className="hidden md:inline">
                        {showToolbar ? 'Hide Toolbar' : 'Show Toolbar'}
                    </span>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 h-0">
                <form
                    onSubmit={handleSubmit}
                    className={`overflow-y-auto pr-2 md:pr-4 transition-all duration-300 ease-in-out ${
                        isPreviewFullWidth
                            ? 'flex-none w-0 md:w-0 opacity-0 hidden md:block'
                            : 'flex-1 opacity-100'
                    }`}>
                    <InvoiceDetailsSection
                        invoiceDetails={invoiceDetails}
                        setInvoiceDetailsField={setInvoiceDetailsField}
                    />

                    <IssuerSection
                        issuer={issuer}
                        setIssuerField={setIssuerField}
                        organisations={organisations}
                        issuerId={issuerId}
                        setIssuerId={setIssuerId}
                    />

                    <ClientSection
                        client={client}
                        setClientField={setClientField}
                        organisations={organisations}
                        clientId={clientId}
                        setClientId={setClientId}
                    />

                    <ItemsSection
                        value={items}
                        onUpdateItem={updateItem}
                        onAddItem={addItem}
                        onRemoveItem={removeItem}
                    />

                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    {success && (
                        <div className="text-green-500 mb-2">
                            Invoice saved successfully!
                        </div>
                    )}

                    <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-neutral-300 dark:border-neutral-700 py-4 flex justify-end px-6 flex-row gap-2">
                        <Button variant="ghost" href="/invoices">
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={saving}>
                            {saving ? 'Saving...' : t('save')}
                        </Button>
                    </section>
                </form>

                <aside
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
