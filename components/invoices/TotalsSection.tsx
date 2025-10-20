'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    Label,
    Button,
    CurrencyInput,
    LabelInputContainer,
} from '@/components/ui'
import { CalculatedTotals, calculateTotals } from '@/lib/invoiceCalculations'
import { ChevronDownIcon } from 'lucide-react'
import { InvoiceItem, InvoiceTotals } from '@/types/Invoice'

interface TotalsSectionProps {
    items: InvoiceItem[]
    totals: InvoiceTotals
    setTotalsField: <K extends keyof InvoiceTotals>(
        field: K,
        value: InvoiceTotals[K],
    ) => void
}

const currencySymbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    CHF: 'Fr',
}

export default function TotalsSection({
    items,
    totals,
    setTotalsField,
}: TotalsSectionProps) {
    const t = useTranslations('Invoices.Totals')
    const [open, setOpen] = useState(true)
    const [computed, setComputed] = useState<CalculatedTotals>({
        subtotal: 0,
        discountAmount: 0,
        tax: 0,
        total: 0,
        amountDue: 0,
    })

    useEffect(() => {
        const calc = calculateTotals({
            items,
            taxRate: totals.taxRate,
            discount: totals.discount,
            shipping: totals.shipping,
            deposit: totals.deposit,
            payments: totals.payments,
        })

        setComputed(calc)

        // update higher-level totals whenever items or inputs change
        setTotalsField('sum', calc.subtotal ?? 0)
        setTotalsField(
            'totalNet',
            (calc.subtotal ?? 0) - (calc.discountAmount ?? 0),
        )
        setTotalsField('totalGross', calc.total ?? 0)
        setTotalsField('amountDue', calc.amountDue ?? 0)
    }, [
        items,
        totals.taxRate,
        totals.discount,
        totals.shipping,
        totals.deposit,
        totals.payments,
    ])

    const symbol = currencySymbols[totals.currency] || totals.currency
    const helperTextStyle =
        'text-xs text-[var(--foreground-secondary)] mt-1 transition-all duration-200'

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:bg-transparent hover:cursor-pointer"
                aria-expanded={open}
                aria-controls="items-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div className="space-y-6 mt-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <LabelInputContainer>
                            <Label>{t('currency')}</Label>
                            <select
                                className="appearance-none w-full border rounded-md p-2 bg-[var(--input-bg)] text-[var(--foreground)] pr-8"
                                value={totals.currency}
                                onChange={e =>
                                    setTotalsField('currency', e.target.value)
                                }>
                                <option value="EUR">€ Euro</option>
                                <option value="USD">$ US Dollar</option>
                                <option value="GBP">£ Pound Sterling</option>
                                <option value="CHF">Fr Swiss Franc</option>
                            </select>
                            <span className="absolute right-3 top-2 text-gray-500">
                                {symbol}
                            </span>
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label>{t('mwst')} (%)</Label>
                            <CurrencyInput
                                value={totals.taxRate}
                                onChange={val => setTotalsField('taxRate', val)}
                                currency="%"
                                position="suffix"
                            />
                            {totals.taxRate > 0 && computed.tax > 0 && (
                                <p className={helperTextStyle}>
                                    {totals.taxRate}% MwSt ={' '}
                                    <span className="text-[var(--accent)]">
                                        {computed.tax.toFixed(2)} {symbol}
                                    </span>
                                </p>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label>{t('discount')}</Label>
                            <CurrencyInput
                                value={totals.discount}
                                onChange={val =>
                                    setTotalsField('discount', val)
                                }
                                currency="%"
                                position="suffix"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label>{t('shipping')}</Label>
                            <CurrencyInput
                                value={totals.shipping}
                                onChange={val =>
                                    setTotalsField('shipping', val)
                                }
                                currency={symbol}
                            />
                        </LabelInputContainer>
                    </div>

                    <div className="rounded-lg p-5">
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>{t('sum')}</span>
                                <span>
                                    {computed.subtotal?.toFixed(2)} {symbol}
                                </span>
                            </div>

                            {totals.discount > 0 && (
                                <div className="flex justify-between text-gray-500">
                                    <span>{t('discountAmount')}</span>
                                    <span>
                                        -{computed.discountAmount?.toFixed(2)}{' '}
                                        {symbol}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between font-medium">
                                <span>{t('totalNet')}</span>
                                <span>
                                    {(
                                        (computed.subtotal ?? 0) -
                                        (computed.discountAmount ?? 0)
                                    ).toFixed(2)}{' '}
                                    {symbol}
                                </span>
                            </div>

                            {totals.shipping > 0 && (
                                <div className="flex justify-between">
                                    <span>{t('shipping')}</span>
                                    <span>
                                        +{totals.shipping.toFixed(2)} {symbol}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span>MwSt ({totals.taxRate}%)</span>
                                <span>
                                    +{computed.tax?.toFixed(2)} {symbol}
                                </span>
                            </div>

                            <hr className="my-2 border-[var(--border)]" />

                            <div className="flex justify-between text-lg font-semibold">
                                <span>{t('totalGross')}</span>
                                <span>
                                    {computed.total?.toFixed(2)} {symbol}
                                </span>
                            </div>

                            {totals.deposit > 0 && (
                                <div className="flex justify-between text-gray-500">
                                    <span>{t('deposit')}</span>
                                    <span>
                                        -{totals.deposit.toFixed(2)} {symbol}
                                    </span>
                                </div>
                            )}

                            {totals.payments > 0 && (
                                <div className="flex justify-between text-gray-500">
                                    <span>{t('payments')}</span>
                                    <span>
                                        -{totals.payments.toFixed(2)} {symbol}
                                    </span>
                                </div>
                            )}

                            <hr className="my-2 border-[var(--border)]" />

                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-[var(--accent)]">
                                    {t('amountDue')}
                                </span>
                                <span>
                                    {computed.amountDue?.toFixed(2)} {symbol}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
