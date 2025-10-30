'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import apiClient from '@/lib/apiClient'
import {
    Client,
    Issuer,
    InvoiceDetails,
    InvoiceItem,
    InvoiceTotals,
    Legal,
    Footer,
    InvoiceResponse,
    InvoiceCreatePayload,
    InvoiceUpdatePayload,
    BankDetails,
    InvoiceTypeKey,
} from '@/types/Invoice'
import { useOrganisations } from '@/hooks/useOrganisations'
import { calculateTotals } from '@/lib/invoiceCalculations'
import { useTranslations } from 'next-intl'
import { parseBackendErrors, BackendErrors } from '@/lib/errorUtils'
import { Organisation } from '@/types/Organisation'

const normalizeDate = (date: string | null | undefined): string =>
    date && !isNaN(Date.parse(date))
        ? new Date(date).toISOString().split('T')[0]
        : ''

export function useInvoiceForm(initialInvoiceId?: number) {
    const { organisations, fetchOrganisations } = useOrganisations()
    const t = useTranslations()

    // --- Invoice type ---
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeKey>('standard')
    const setInvoiceTypeField = useCallback((value: InvoiceTypeKey) => {
        setInvoiceType(value)
    }, [])

    // --- Core sections ---
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        id: initialInvoiceId ?? 0,
        invoiceNumber: `INV-${new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '')}-${Math.random()
            .toString(36)
            .substring(2, 5)
            .toUpperCase()}`,
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: '',
        reference: '',
    })

    const [bankDetails, setBankDetails] = useState<BankDetails>({
        accountHolder: '',
        bankName: '',
        iban: '',
        bic: '',
        currency: 'EUR',
    })

    const [issuerId, setIssuerId] = useState<number | null>(null)
    const defaultIssuer = useMemo<Issuer>(
        () => ({
            id: 1,
            name: '',
            street: '',
            city: '',
            region: '',
            zip: '',
            phone: '',
            email: '',
        }),
        [],
    )
    const [issuer, setIssuer] = useState<Issuer>(defaultIssuer)

    const [clientId, setClientId] = useState<number | null>(null)
    const defaultClient = useMemo<Client>(
        () => ({
            name: '',
            street: '',
            city: '',
            region: '',
            zip: '',
            phone: '',
            email: '',
        }),
        [],
    )
    const [client, setClient] = useState<Client>(defaultClient)

    const [items, setItems] = useState<InvoiceItem[]>([
        { name: '', description: '', rate: 0, quantity: 1 },
    ])

    const defaultTotals = useMemo<InvoiceTotals>(
        () => ({
            currency: 'EUR',
            taxRate: 19,
            discount: 0,
            shipping: 0,
            deposit: 0,
            payments: 0,
            sum: 0,
            totalNet: 0,
            totalGross: 0,
            amountDue: 0,
        }),
        [],
    )
    const [totals, setTotals] = useState<InvoiceTotals>(defaultTotals)

    // --- New sections ---
    const [legal, setLegal] = useState<Legal>({ termsAndConditions: '' })
    const [footer, setFooter] = useState<Footer>({ notes: '' })
    const [attachments, setAttachments] = useState<File[]>([])

    // --- Loading & errors ---
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<BackendErrors>({})

    // --- Load organisations ---
    useEffect(() => {
        fetchOrganisations().catch(err =>
            console.error('Failed to load organisations:', err),
        )
    }, [fetchOrganisations])

    // --- Auto-fill issuer ---
    useEffect(() => {
        if (organisations.length === 0) {
            setIssuer(defaultIssuer)
            return
        }

        let org: Organisation | undefined

        if (issuerId) {
            org = organisations.find(o => o.id === issuerId)
        }

        if (!issuerId && organisations.length === 1) {
            org = organisations[0]
        }

        if (org) {
            setIssuer({
                id: org.id,
                name: org.name,
                street: org.street,
                city: org.city,
                region: org.region,
                zip: org.zip,
                phone: org.phone,
                email: org.email,
            })
        } else {
            setIssuer(defaultIssuer)
        }
    }, [issuerId, organisations, defaultIssuer, setIssuer])

    // --- Auto-fill client ---
    useEffect(() => {
        if (!clientId) return
        const org = organisations.find(o => o.id === clientId)
        setClient(
            org ?? {
                name: '',
                street: '',
                city: '',
                region: '',
                zip: '',
                phone: '',
                email: '',
            },
        )
    }, [clientId, organisations])

    // --- Field setters ---
    const setInvoiceDetailsField = useCallback(
        (field: keyof InvoiceDetails, value: string) =>
            setInvoiceDetails(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setBankDetailsField = useCallback(
        (field: keyof BankDetails, value: string) =>
            setBankDetails(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setIssuerField = useCallback(
        (field: keyof Issuer, value: string) =>
            setIssuer(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setClientField = useCallback(
        (field: keyof Client, value: string) =>
            setClient(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setTotalsField = useCallback(
        <K extends keyof InvoiceTotals>(field: K, value: InvoiceTotals[K]) =>
            setTotals(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setLegalField = useCallback(
        (field: keyof Legal, value: string) =>
            setLegal(prev => ({ ...prev, [field]: value })),
        [],
    )
    const setFooterField = useCallback(
        (field: keyof Footer, value: string) =>
            setFooter(prev => ({ ...prev, [field]: value })),
        [],
    )

    // --- Items ---
    const addItem = () =>
        setItems(prev => [
            ...prev,
            { name: '', description: '', rate: 0, quantity: 1 },
        ])
    const updateItem = useCallback(
        (index: number, field: keyof InvoiceItem, value: string | number) =>
            setItems(prev =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item,
                ),
            ),
        [],
    )
    const removeItem = (index: number) =>
        setItems(prev => prev.filter((_, i) => i !== index))

    // --- Derived totals ---
    const computedTotals = useMemo(
        () =>
            calculateTotals({
                items,
                taxRate: totals.taxRate,
                discount: totals.discount,
                shipping: totals.shipping,
                deposit: totals.deposit,
                payments: totals.payments,
            }),
        [
            items,
            totals.taxRate,
            totals.discount,
            totals.shipping,
            totals.deposit,
            totals.payments,
        ],
    )
    useEffect(() => {
        setTotals(prev => ({
            ...prev,
            sum: computedTotals.subtotal ?? 0,
            totalNet:
                (computedTotals.subtotal ?? 0) -
                (computedTotals.discountAmount ?? 0),
            totalGross: computedTotals.total ?? 0,
            amountDue: computedTotals.amountDue ?? 0,
        }))
    }, [computedTotals])

    // --- Load invoice from backend ---
    useEffect(() => {
        if (!initialInvoiceId) return
        const loadInvoice = async () => {
            setLoading(true)
            try {
                const res = await apiClient.get<{ data: InvoiceResponse }>(
                    `/api/invoices/${initialInvoiceId}`,
                )
                const inv = res.data?.data
                if (!inv) throw new Error('Invoice not found')

                setInvoiceDetails({
                    id: inv.id,
                    invoiceNumber: inv.invoice_number,
                    invoiceDate: normalizeDate(inv.invoice_date),
                    dueDate: normalizeDate(inv.due_date),
                    reference: inv.reference ?? '',
                })

                setBankDetails({
                    accountHolder: inv.bank_details?.accountHolder ?? '',
                    bankName: inv.bank_details?.bankName ?? '',
                    iban: inv.bank_details?.iban ?? '',
                    bic: inv.bank_details?.bic ?? '',
                    currency: inv.bank_details?.currency ?? 'EUR',
                })

                setIssuer(inv.issuer ?? defaultIssuer)
                setClient(inv.client ?? defaultClient)
                setItems(
                    inv.items?.map(item => ({
                        name: item.name,
                        description: item.description ?? '',
                        rate: Number(item.rate),
                        quantity: Number(item.quantity),
                    })) ?? [
                        { name: '', description: '', rate: 0, quantity: 1 },
                    ],
                )
                setTotals(inv.totals ?? defaultTotals)
                setLegal(inv.legal ?? { termsAndConditions: '' })
                setFooter(inv.footer ?? { notes: '' })
                setAttachments([])
                setInvoiceType(inv.invoice_type ?? 'standard')
            } catch (err) {
                console.error('Failed to load invoice:', err)
                setError(
                    t('errors.loadFailed') || 'Unable to load invoice data.',
                )
            } finally {
                setLoading(false)
            }
        }
        loadInvoice()
    }, [initialInvoiceId, t, defaultClient, defaultIssuer, defaultTotals])

    // --- Save invoice ---
    const saveInvoice = async () => {
        setSaving(true)
        setError(null)
        setFieldErrors({})

        const basePayload = {
            invoiceType, // <--- include type
            bankDetails,
            issuer,
            client,
            items,
            totals: {
                ...totals,
                sum: computedTotals.subtotal ?? 0,
                totalNet:
                    (computedTotals.subtotal ?? 0) -
                    (computedTotals.discountAmount ?? 0),
                totalGross: computedTotals.total ?? 0,
                amountDue: computedTotals.amountDue ?? 0,
            },
            legal,
            footer,
            attachments,
        }

        try {
            const url = initialInvoiceId
                ? `/api/invoices/${initialInvoiceId}`
                : '/api/invoices'
            const method = initialInvoiceId ? 'put' : 'post'

            const payload = initialInvoiceId
                ? ({ ...basePayload, invoiceDetails } as InvoiceUpdatePayload)
                : ({
                      ...basePayload,
                      invoiceDetails: {
                          invoiceNumber: invoiceDetails.invoiceNumber,
                          invoiceDate: invoiceDetails.invoiceDate,
                          dueDate: invoiceDetails.dueDate,
                          reference: invoiceDetails.reference,
                      },
                  } as InvoiceCreatePayload)

            const res = await apiClient[method]<{ data: InvoiceResponse }>(
                url,
                payload,
            )
            return { success: true, data: res.data.data }
        } catch (err: unknown) {
            const parsed = parseBackendErrors(err, t, 'Invoices')
            setFieldErrors(parsed)
            setError(
                parsed.general?.[0] ||
                    Object.values(parsed)[0]?.[0] ||
                    t('errors.saveFailed'),
            )
            return { success: false, error: err }
        } finally {
            setSaving(false)
        }
    }

    return {
        organisations,
        invoiceType,
        setInvoiceType: setInvoiceTypeField,
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
        updateItem,
        removeItem,
        totals,
        setTotalsField,
        legal,
        setLegalField,
        footer,
        setFooterField,
        attachments,
        setAttachments,
        computedTotals,
        loading,
        saving,
        error,
        fieldErrors,
        saveInvoice,
    }
}
