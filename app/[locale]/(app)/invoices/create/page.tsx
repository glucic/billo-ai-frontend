'use client'

import { useRouter } from 'next/navigation'
import { useInvoiceForm } from '@/hooks/useInvoice'
import { InvoiceForm } from '@/components/invoices/InvoiceForm'

export default function CreateInvoicePage() {
    const router = useRouter()
    const {
        invoiceType,
        setInvoiceType,
        invoiceDetails,
        setInvoiceDetailsField,
        bankDetails,
        setBankDetailsField,
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
        legal,
        setLegalField,
        footer,
        setFooterField,
        attachments,
        setAttachments,
        saveInvoice,
        organisations,
        saving,
        fieldErrors,
    } = useInvoiceForm()

    return (
        <InvoiceForm
            invoiceType={invoiceType}
            setInvoiceType={setInvoiceType}
            invoiceDetails={invoiceDetails}
            setInvoiceDetailsField={setInvoiceDetailsField}
            bankDetails={bankDetails}
            setBankDetailsField={setBankDetailsField}
            issuer={issuer}
            setIssuerField={setIssuerField}
            issuerId={issuerId}
            setIssuerId={setIssuerId}
            client={client}
            setClientField={setClientField}
            clientId={clientId}
            setClientId={setClientId}
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
            totals={totals}
            setTotalsField={setTotalsField}
            legal={legal}
            setLegalField={setLegalField}
            footer={footer}
            setFooterField={setFooterField}
            attachments={attachments}
            setAttachments={setAttachments}
            saveInvoice={saveInvoice}
            organisations={organisations}
            saving={saving}
            fieldErrors={fieldErrors}
            mode="create"
            onSuccessRedirect={() => router.push('/invoices')}
        />
    )
}
