'use client'

import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    Button,
} from '@/components/ui'
import React from 'react'
import { InvoiceDetails } from '@/types/Invoice'

interface InvoiceDetailsSectionProps {
    invoiceDetails: InvoiceDetails
    setInvoiceDetailsField: (field: keyof InvoiceDetails, value: string) => void
    error?: { [K in keyof InvoiceDetails]?: string }
}

export default function InvoiceDetailsSection({
    invoiceDetails,
    setInvoiceDetailsField,
    error,
}: InvoiceDetailsSectionProps) {
    const t = useTranslations('Invoices.Create.InvoiceDetails')
    const [open, setOpen] = React.useState(true)

    return (
        <section className="card rounded-lg glass">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="invoice-details-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <span
                    className={`transition-transform ${open ? '' : '-rotate-90'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </span>
            </Button>

            {open && (
                <div
                    id="invoice-details-fields"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <LabelInputContainer>
                        <Label htmlFor="invoice-number">
                            {t('invoiceNumber')}
                        </Label>
                        <InputField
                            id="invoice-number"
                            readOnly
                            required
                            value={invoiceDetails.invoiceNumber}
                            onChange={e =>
                                setInvoiceDetailsField(
                                    'invoiceNumber',
                                    e.target.value,
                                )
                            }
                            aria-label={t('invoiceNumber')}
                        />
                        {error?.invoiceNumber && (
                            <span className="text-sm text-red-500">
                                {error.invoiceNumber}
                            </span>
                        )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="invoice-date">{t('invoiceDate')}</Label>
                        <InputField
                            id="invoice-date"
                            type="date"
                            required
                            value={invoiceDetails.invoiceDate}
                            onChange={e =>
                                setInvoiceDetailsField(
                                    'invoiceDate',
                                    e.target.value,
                                )
                            }
                            aria-label={t('invoiceDate')}
                        />
                        {error?.invoiceDate && (
                            <span className="text-sm text-red-500">
                                {error.invoiceDate}
                            </span>
                        )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="due-date">{t('dueDate')}</Label>
                        <InputField
                            id="due-date"
                            type="date"
                            value={invoiceDetails.dueDate}
                            onChange={e =>
                                setInvoiceDetailsField(
                                    'dueDate',
                                    e.target.value,
                                )
                            }
                            aria-label={t('dueDate')}
                        />
                        {error?.dueDate && (
                            <span className="text-sm text-red-500">
                                {error.dueDate}
                            </span>
                        )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="reference">{t('reference')}</Label>
                        <InputField
                            id="reference"
                            value={invoiceDetails.reference}
                            placeholder={t('reference')}
                            onChange={e =>
                                setInvoiceDetailsField(
                                    'reference',
                                    e.target.value,
                                )
                            }
                            aria-label={t('reference')}
                        />
                        {error?.reference && (
                            <span className="text-sm text-red-500">
                                {error.reference}
                            </span>
                        )}
                    </LabelInputContainer>
                </div>
            )}
        </section>
    )
}
