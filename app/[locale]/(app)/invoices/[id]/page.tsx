'use client'

import { useParams, useRouter } from 'next/navigation'
import { useInvoiceForm } from '@/hooks/useInvoice'
import { InvoiceForm } from '@/components/invoices/InvoiceForm'

export default function EditInvoicePage() {
    const router = useRouter()
    const { id } = useParams()
    const invoiceId = Number(id)
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
        loading,
        error,
        fieldErrors,
    } = useInvoiceForm(invoiceId)

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
            loading={loading}
            fieldErrors={fieldErrors}
            mode="edit"
            onSuccessRedirect={() => router.push('/invoices')}
        />
    )
}
