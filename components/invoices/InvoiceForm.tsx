'use client'

import { useTranslations } from 'next-intl'
import {
    InvoiceTypeSection,
    InvoiceDetailsSection,
    IssuerSection,
    ClientSection,
    ItemsSection,
    TotalsSection,
    BankDetailsSection,
    FooterSection,
    LegalSection,
} from '@/components/invoices/form-sections'
import { PDFInvoicePreview } from '@/components/invoices'
import { useInvoiceFormLayout } from '@/hooks/useInvoiceFormLayout'
import { InvoiceFormProps } from './InvoiceFormProps'
import { InvoiceFormFooter } from './InvoiceFormFooter'

export function InvoiceForm({
    invoiceType,
    setInvoiceType,
    invoiceDetails,
    setInvoiceDetailsField,
    bankDetails,
    setBankDetailsField,
    issuer,
    setIssuerField,
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
    legal,
    setLegalField,
    footer,
    setFooterField,
    attachments,
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

    return (
        <main className="flex flex-col h-screen overflow-hidden text-[var(--color-foreground)] p-4 md:p-6">
            <div className="flex flex-1 gap-8 overflow-hidden">
                <form
                    onSubmit={handleSubmit}
                    className={`overflow-y-auto pr-2 md:pr-4 transition-all duration-300 ease-in-out ${
                        showPreview ? 'flex-1' : 'flex-[1_1_100%]'
                    }`}>
                    <InvoiceTypeSection
                        value={invoiceType}
                        setValue={setInvoiceType}
                    />

                    <InvoiceDetailsSection
                        invoiceDetails={invoiceDetails}
                        setInvoiceDetailsField={setInvoiceDetailsField}
                        errors={fieldErrors}
                    />

                    <IssuerSection
                        issuer={issuer}
                        setIssuerField={setIssuerField}
                        organisations={organisations}
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

                    <BankDetailsSection
                        bankDetails={bankDetails}
                        setBankDetailsField={setBankDetailsField}
                        errors={fieldErrors}
                    />

                    <TotalsSection
                        items={items}
                        totals={totals}
                        setTotalsField={setTotalsField}
                        errors={fieldErrors}
                        invoiceType={invoiceType}
                    />

                    <LegalSection
                        legal={legal}
                        setLegalField={setLegalField}
                        errors={fieldErrors}
                    />

                    <FooterSection
                        footer={footer}
                        setFooterField={setFooterField}
                        errors={fieldErrors}
                    />

                    <InvoiceFormFooter
                        error={error}
                        success={success}
                        mode={mode}
                        saving={saving}
                    />
                </form>

                {showPreview && (
                    <aside className="hidden md:flex flex-col items-center justify-start w-[480px] xl:w-[600px] transition-all duration-300">
                        <PDFInvoicePreview
                            invoice={{
                                invoiceType,
                                invoiceDetails,
                                bankDetails,
                                issuer,
                                client,
                                items,
                                totals,
                                legal,
                                footer,
                                attachments,
                            }}
                        />
                    </aside>
                )}
            </div>
        </main>
    )
}
