import {
    InvoiceDetails,
    InvoiceItem,
    InvoiceTotals,
    Client,
    Issuer,
    Legal,
    Footer,
    BankDetails,
    InvoiceTypeKey,
} from '@/types/Invoice'
import { Organisation } from '@/types/Organisation'

export interface InvoiceFormProps {
    invoiceType: InvoiceTypeKey
    setInvoiceType: (value: InvoiceTypeKey) => void
    invoiceDetails: InvoiceDetails
    setInvoiceDetailsField: (field: keyof InvoiceDetails, value: string) => void
    bankDetails: BankDetails
    setBankDetailsField: (field: keyof BankDetails, value: string) => void
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
    legal: Legal
    setLegalField: (field: keyof Legal, value: string) => void
    footer: Footer
    setFooterField: (field: keyof Footer, value: string) => void
    attachments: File[]
    setAttachments: (files: File[]) => void
    saveInvoice: () => Promise<{ success: boolean }>
    organisations: Organisation[]
    saving: boolean
    loading?: boolean
    fieldErrors: Partial<Record<string, string[]>>
    error?: string
    mode: 'create' | 'edit'
    onSuccessRedirect?: () => void
}
