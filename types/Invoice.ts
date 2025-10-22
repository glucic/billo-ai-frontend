import { Organisation } from '@/types/Organisation'

export type Issuer = Omit<
    Organisation,
    | 'id'
    | 'description'
    | 'employee_count'
    | 'users'
    | 'created_at'
    | 'updated_at'
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

export interface InvoiceDetails {
    id?: number
    invoiceNumber: string
    invoiceDate: string
    dueDate: string
    reference: string
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
    invoiceDetails: InvoiceDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    legal: Legal
    footer: Footer
    attachments: File[]
}
