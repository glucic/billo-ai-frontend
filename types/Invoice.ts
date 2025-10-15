import { Organisation } from '@/types/Organisation'

export interface Issuer
    extends Omit<
        Organisation,
        | 'id'
        | 'description'
        | 'employee_count'
        | 'users'
        | 'created_at'
        | 'updated_at'
    > {}

export interface Client
    extends Omit<
        Organisation,
        | 'id'
        | 'description'
        | 'employee_count'
        | 'users'
        | 'created_at'
        | 'updated_at'
    > {}

export interface InvoiceDetails {
    id?: number
    invoiceNumber: string
    invoiceDate: string
    dueDate: string
    reference: string
}

export interface InvoiceItem {
    id?: number
    name: string
    description: string
    rate: number
    quantity: number
    subtotal?: number
}

export interface Invoice {
    invoiceDetails: InvoiceDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
}
