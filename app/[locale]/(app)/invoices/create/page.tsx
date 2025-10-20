'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useInvoiceForm } from '@/hooks/useInvoice'
import {
    InvoiceDetailsSection,
    IssuerSection,
    ClientSection,
    ItemsSection,
    TotalsSection,
    PDFInvoicePreview,
} from '@/components/invoices'
import { Button, StatefulButton } from '@/components/ui'

export default function CreateInvoicePage() {
    const t = useTranslations('Invoices')
    const [success, setSuccess] = useState(false)
    const [showPreview] = useState(true)

    const {
        invoiceDetails,
        setInvoiceDetailsField,
        issuer,
        setIssuerField,
        issuerId,
        setIssuerId,
        client,
        setClientField,
        clientId,
        setClientId,
        items,
        addItem,
        removeItem,
        updateItem,
        totals,
        setTotalsField,
        saveInvoice,
        organisations,
        saving,
        fieldErrors,
    } = useInvoiceForm()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess(false)
        try {
            const res = await saveInvoice()
            if (res.success) setSuccess(true)
        } catch (err) {
            console.error('Save failed:', err)
        }
    }

    const invoice = { invoiceDetails, issuer, client, items, totals }

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
                        errors={fieldErrors}
                    />

                    <IssuerSection
                        issuer={issuer}
                        setIssuerField={setIssuerField}
                        organisations={organisations}
                        issuerId={issuerId}
                        setIssuerId={setIssuerId}
                        errors={fieldErrors}
                    />

                    <ClientSection
                        client={client}
                        setClientField={setClientField}
                        organisations={organisations}
                        clientId={clientId}
                        setClientId={setClientId}
                        errors={fieldErrors}
                    />

                    <ItemsSection
                        value={items}
                        currency={totals.currency}
                        onUpdateItem={updateItem}
                        onAddItem={addItem}
                        onRemoveItem={removeItem}
                        errors={fieldErrors}
                    />

                    <TotalsSection
                        items={items}
                        totals={totals}
                        setTotalsField={setTotalsField}
                        errors={fieldErrors}
                    />

                    {success && (
                        <div className="text-green-500 text-sm mb-2 text-right">
                            {t('saveSuccess') || 'Invoice saved successfully!'}
                        </div>
                    )}

                    <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-[var(--accent)] py-4 flex justify-end px-6 flex-row gap-2">
                        <Button variant="ghost" href="/invoices">
                            {t('cancel')}
                        </Button>
                        <StatefulButton type="submit" loading={saving}>
                            {t('save')}
                        </StatefulButton>
                    </section>
                </form>

                {showPreview && (
                    <aside className="hidden md:flex flex-col items-center justify-start w-[480px] xl:w-[600px] transition-all duration-300">
                        <PDFInvoicePreview invoice={invoice} />
                    </aside>
                )}
            </div>
        </main>
    )
}
