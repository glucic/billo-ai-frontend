export function calculateTotals({
    items = [],
    taxRate = 0,
    discount = 0,
    shipping = 0,
    deposit = 0,
    payments = 0,
}: any) {
    const subtotal = items.reduce(
        (acc: number, item: any) =>
            acc + (item.rate || 0) * (item.quantity || 0),
        0,
    )

    const discountAmount = subtotal * (discount / 100)
    const tax = (subtotal - discountAmount) * (taxRate / 100)
    const total = subtotal - discountAmount + tax + shipping
    const paid = deposit + payments
    const amountDue = total - paid

    return { subtotal, discountAmount, tax, total, amountDue }
}
