'use client'

import { useTranslations } from 'next-intl'
import {
    InvoiceDetailsSection,
    IssuerSection,
    ClientSection,
    ItemsSection,
    TotalsSection,
} from '@/components/invoices/form-sections'
import { PDFInvoicePreview } from '@/components/invoices'
import { Button, StatefulButton } from '@/components/ui'
import { useInvoiceFormLayout } from '@/hooks/useInvoiceFormLayout'
import {
    InvoiceDetails,
    InvoiceItem,
    InvoiceTotals,
    Client,
    Issuer,
} from '@/types/Invoice'
import { Organisation } from '@/types/Organisation'

export interface InvoiceFormProps {
    invoiceDetails: InvoiceDetails
    setInvoiceDetailsField: (field: keyof InvoiceDetails, value: string) => void
    issuer: Issuer
    setIssuerField: (field: keyof Issuer, value: string) => void
    issuerId: number | null
    setIssuerId: (id: number | null) => void
    client: Client
    setClientField: (field: keyof Client, value: string) => void
    clientId: number | null
    setClientId: (id: number | null) => void
    items: InvoiceItem[]
    addItem: () => void
    removeItem: (index: number) => void
    updateItem: <K extends keyof InvoiceItem>(
        index: number,
        field: K,
        value: InvoiceItem[K],
    ) => void
    totals: InvoiceTotals
    setTotalsField: <K extends keyof InvoiceTotals>(
        field: K,
        value: InvoiceTotals[K],
    ) => void
    saveInvoice: () => Promise<{ success: boolean }>
    organisations: Organisation[]
    saving: boolean
    loading?: boolean
    fieldErrors: Partial<Record<string, string[]>>
    error?: string
    mode: 'create' | 'edit'
    onSuccessRedirect?: () => void
}

export function InvoiceForm({
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
    loading = false,
    fieldErrors,
    mode,
    onSuccessRedirect,
}: InvoiceFormProps) {
    const t = useTranslations('Invoices')
    const { success, error, showPreview, handleSubmit } = useInvoiceFormLayout({
        mode,
        saveInvoice,
        onSuccessRedirect,
    })

    if (loading) {
        return (
            <main className="flex h-screen items-center justify-center">
                <p className="text-gray-400">{t('loading')}</p>
            </main>
        )
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

                    {error && (
                        <div className="text-[var(--error)] text-sm mb-2 text-right">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-[var(--success)] text-sm mb-2 text-right">
                            {mode === 'edit'
                                ? t('updateSuccess') ||
                                  'Invoice updated successfully!'
                                : t('saveSuccess') ||
                                  'Invoice saved successfully!'}
                        </div>
                    )}

                    <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-[var(--accent)] py-4 flex justify-end px-6 flex-row gap-2">
                        <Button variant="ghost" href="/invoices">
                            {t('cancel')}
                        </Button>
                        <StatefulButton type="submit" loading={saving}>
                            {mode === 'edit' ? t('update') : t('save')}
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
