'use client'

import { useEffect, useState } from 'react'
import { useOrganisations } from '@/hooks/useOrganisations'
import { format } from 'date-fns'
import InvoiceDetailsSection from './InvoiceDetailsSection'
import CurrencyTaxSection from './CurrencyTaxSection'
import IssuerSection from './IssuerSection'
import ClientSection from './ClientSection'
import ItemsSection from './ItemsSection'
import PaymentInfoSection from './PaymentInfoSection'
import NotesFooterSection from './NotesFooterSection'

const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
]

interface InvoiceItem {
    name: string
    description: string
    rate: number
    quantity: number
}

export default function CreateInvoiceComponent() {
    const { organisations, fetchOrganisations } = useOrganisations()
    const [issuerId, setIssuerId] = useState<number | null>(null)
    const [issuer, setIssuer] = useState<any>({})
    const [clientId, setClientId] = useState<number | null>(null)
    const [client, setClient] = useState<any>({})
    const [items, setItems] = useState<InvoiceItem[]>([
        { name: '', description: '', rate: 0, quantity: 1 },
    ])
    const [errors, setErrors] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now())
    const [invoiceDate, setInvoiceDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    )
    const [dueDate, setDueDate] = useState('')
    const [reference, setReference] = useState('')
    const [currency, setCurrency] = useState('USD')
    const [taxRate, setTaxRate] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [paymentTerms, setPaymentTerms] = useState('Net 30')
    const [bankDetails, setBankDetails] = useState('')
    const [paymentInstructions, setPaymentInstructions] = useState('')
    const [notes, setNotes] = useState('')
    const [footer, setFooter] = useState('')

    // Calculation
    const subtotal = items.reduce(
        (sum, item) => sum + item.rate * item.quantity,
        0,
    )
    const tax = subtotal * (taxRate / 100)
    const discountAmount = subtotal * (discount / 100)
    const total = subtotal + tax - discountAmount

    useEffect(() => {
        fetchOrganisations()
    }, [fetchOrganisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === issuerId)
        if (org) setIssuer(org)
    }, [issuerId, organisations])

    useEffect(() => {
        const org = organisations.find(o => o.id === clientId)
        if (org) setClient(org)
    }, [clientId, organisations])

    const handleItemChange = (
        idx: number,
        field: keyof InvoiceItem,
        value: any,
    ) => {
        setItems(items =>
            items.map((item, i) =>
                i === idx ? { ...item, [field]: value } : item,
            ),
        )
    }

    const addItem = () =>
        setItems([
            ...items,
            { name: '', description: '', rate: 0, quantity: 1 },
        ])

    return (
        <form className="max-w-4xl mx-auto py-8">
            <div className="flex flex-col gap-6">
                <InvoiceDetailsSection
                    invoiceNumber={invoiceNumber}
                    setInvoiceNumber={setInvoiceNumber}
                    invoiceDate={invoiceDate}
                    setInvoiceDate={setInvoiceDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    reference={reference}
                    setReference={setReference}
                />
                <CurrencyTaxSection
                    currency={currency}
                    setCurrency={setCurrency}
                    taxRate={taxRate}
                    setTaxRate={setTaxRate}
                    discount={discount}
                    setDiscount={setDiscount}
                    subtotal={subtotal}
                    tax={tax}
                    discountAmount={discountAmount}
                    total={total}
                />
                <IssuerSection
                    organisations={organisations}
                    issuerId={issuerId}
                    setIssuerId={setIssuerId}
                    issuer={issuer}
                    errors={errors}
                />
                <ClientSection
                    organisations={organisations}
                    clientId={clientId}
                    setClientId={setClientId}
                    client={client}
                    errors={errors}
                />
                <ItemsSection
                    items={items}
                    setItems={setItems}
                    errors={errors}
                />
                <PaymentInfoSection
                    paymentTerms={paymentTerms}
                    setPaymentTerms={setPaymentTerms}
                    bankDetails={bankDetails}
                    setBankDetails={setBankDetails}
                    paymentInstructions={paymentInstructions}
                    setPaymentInstructions={setPaymentInstructions}
                />
                <NotesFooterSection
                    notes={notes}
                    setNotes={setNotes}
                    footer={footer}
                    setFooter={setFooter}
                />
            </div>
        </form>
    )
}
