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
