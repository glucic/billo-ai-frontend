import { Organisation } from '@/types/Organisation'

export type Issuer = Omit<
    Organisation,
    'description' | 'employee_count' | 'users' | 'created_at' | 'updated_at'
>

export type Client = Omit<
    Organisation,
    | 'id'
    | 'description'
    | 'employee_count'
    | 'users'
    | 'created_at'
    | 'updated_at'
>

export type InvoiceTypeKey =
    | 'standard'
    | 'shipping'
    | 'service'
    | 'recurring'
    | 'proforma'

export interface InvoiceTypeOption {
    value: InvoiceTypeKey
    label: string
    desc: string
    tooltip: string
    icon: React.ElementType<React.SVGProps<SVGSVGElement>>
}

export interface InvoiceDetails {
    id?: number
    invoiceNumber: string
    invoiceDate: string
    dueDate: string
    reference: string
}

export interface BankDetails {
    accountHolder: string
    bankName: string
    iban: string
    bic: string
}

export interface InvoiceItem {
    name: string
    description: string
    rate: number
    quantity: number
}

export interface InvoiceTotals {
    currency: string
    taxRate: number
    discount: number
    shipping: number
    deposit: number
    payments: number
    sum: number
    totalNet: number
    totalGross: number
    amountDue: number
}

export interface Legal {
    termsAndConditions: string
}

export interface Footer {
    notes: string
}

export interface Invoice {
    invoiceType: InvoiceTypeKey
    invoiceDetails: InvoiceDetails
    bankDetails: BankDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    legal: Legal
    footer: Footer
    attachments: File[]
}

export interface InvoiceResponse {
    id: number
    invoice_number: string
    invoice_date: string
    due_date: string | null
    reference: string | null
    invoice_type: InvoiceTypeKey
    bank_details: BankDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    legal: Legal | null
    footer: Footer | null
    user: {
        id: number
        name: string
        email: string
    }
    organisation: Organisation | null
    created_at: string
    updated_at: string
}

export interface InvoiceCreatePayload extends Omit<Invoice, 'invoiceDetails'> {
    invoiceDetails: Omit<InvoiceDetails, 'id'>
}

export interface InvoiceUpdatePayload extends Invoice {
    invoiceDetails: InvoiceDetails
}
