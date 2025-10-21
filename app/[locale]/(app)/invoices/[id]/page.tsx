'use client'

import { useParams, useRouter } from 'next/navigation'
import { useInvoiceForm } from '@/hooks/useInvoice'
import { InvoiceForm } from '@/components/invoices/InvoiceForm'

export default function EditInvoicePage() {
    const router = useRouter()
    const { id } = useParams()
    const invoiceId = Number(id)
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
        loading,
        error,
        fieldErrors,
    } = useInvoiceForm(invoiceId)

    return (
        <InvoiceForm
            invoiceDetails={invoiceDetails}
            setInvoiceDetailsField={setInvoiceDetailsField}
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