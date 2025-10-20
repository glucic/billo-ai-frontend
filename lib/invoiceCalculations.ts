import { InvoiceItem } from '@/types/Invoice'

export interface CalculatedTotals {
    subtotal: number
    discountAmount: number
    tax: number
    total: number
    amountDue: number
}

export function calculateTotals({
    items = [],
    taxRate = 0,
    discount = 0,
    shipping = 0,
    deposit = 0,
    payments = 0,
}: {
    items: InvoiceItem[]
    taxRate?: number
    discount?: number
    shipping?: number
    deposit?: number
    payments?: number
}): CalculatedTotals {
    const subtotal = items.reduce(
        (acc, item) => acc + (item.rate || 0) * (item.quantity || 0),
        0,
    )

    const discountAmount = subtotal * (discount / 100)
    const tax = (subtotal - discountAmount) * (taxRate / 100)
    const total = subtotal - discountAmount + tax + shipping
    const paid = deposit + payments
    const amountDue = total - paid

    return { subtotal, discountAmount, tax, total, amountDue }
}
