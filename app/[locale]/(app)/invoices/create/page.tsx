'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useInvoiceForm } from '@/hooks/useInvoice'
import InvoiceDetailsSection from '@/components/invoices/InvoiceDetailsSection'
import IssuerSection from '@/components/invoices/IssuerSection'
import ClientSection from '@/components/invoices/ClientSection'
import ItemsSection from '@/components/invoices/ItemsSection'
import PDFInvoicePreview from '@/components/invoices/PDFInvoicePreview'

export default function CreateInvoicePage() {
    const t = useTranslations('Invoices.Create')
    const [success, setSuccess] = useState(false)
    const [showPreview, setShowPreview] = useState(true)

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
        } catch {}
    }

    const invoice = { invoiceDetails, issuer, client, items }

    return (
        <main className="flex flex-col h-screen overflow-hidden text-[var(--color-foreground)] p-4 md:p-6">
            <div className="flex flex-1 gap-8 overflow-hidden">
                <form
                    onSubmit={handleSubmit}
                    className={`overflow-y-auto pr-2 md:pr-4 transition-all duration-300 ease-in-out ${
                        showPreview ? 'flex-1' : 'flex-[1_1_100%]'
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

                    <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-[var(--accent)] py-4 flex justify-end px-6 flex-row gap-2">
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

                {showPreview && (
                    <div className="hidden md:flex flex-col items-center justify-start w-[480px] xl:w-[600px] h-[85vh] transition-all duration-300">
                        <PDFInvoicePreview invoice={invoice} />
                    </div>
                )}
            </div>
        </main>
    )
}
