'use client'
import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    Button,
    InputError,
} from '@/components/ui'
import { CustomDatePicker as DatePicker } from '@/components/ui/CustomDatePicker'
import React from 'react'
import { InvoiceDetails } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface InvoiceDetailsSectionProps {
    invoiceDetails: InvoiceDetails
    setInvoiceDetailsField: (field: keyof InvoiceDetails, value: string) => void
    errors?: BackendErrors
}

const normalizeDate = (date: string | null | undefined): string => {
    if (!date) return ''
    const parsed = new Date(date)
    return isNaN(parsed.getTime()) ? '' : parsed.toISOString().split('T')[0]
}

export default function InvoiceDetailsSection({
    invoiceDetails,
    setInvoiceDetailsField,
    errors,
}: InvoiceDetailsSectionProps) {
    const t = useTranslations('Invoices.InvoiceDetails')
    const [open, setOpen] = React.useState(true)

    const getError = (key: keyof InvoiceDetails): string[] | undefined =>
        errors?.[`invoiceDetails.${key}`] ?? errors?.[key]

    const fields: {
        key: keyof InvoiceDetails
        required?: boolean
        type: 'text' | 'date'
    }[] = [
        { key: 'invoiceNumber', required: true, type: 'text' },
        { key: 'reference', required: false, type: 'text' },
        { key: 'invoiceDate', required: true, type: 'date' },
        { key: 'dueDate', required: false, type: 'date' },
    ]

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
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div
                    id="invoice-details-fields"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {fields.map(({ key, required, type }) => (
                        <LabelInputContainer key={key}>
                            <Label
                                htmlFor={`invoice-${key}`}
                                required={required}>
                                {t(key)}
                            </Label>

                            {type === 'text' ? (
                                <InputField
                                    id={`invoice-${key}`}
                                    required={required}
                                    readOnly={key === 'invoiceNumber'}
                                    value={invoiceDetails[key] ?? ''}
                                    onChange={e =>
                                        setInvoiceDetailsField(
                                            key,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={t(key)}
                                    error={Boolean(getError(key)?.length)}
                                    aria-describedby={
                                        getError(key)?.length
                                            ? `invoice-${key}-error`
                                            : undefined
                                    }
                                />
                            ) : (
                                <DatePicker
                                    id={`invoice-${key}`}
                                    value={invoiceDetails[key] ?? ''}
                                    onChange={val =>
                                        setInvoiceDetailsField(
                                            key,
                                            normalizeDate(val),
                                        )
                                    }
                                    placeholder="dd/mm/yyyy"
                                    error={Boolean(getError(key)?.length)}
                                />
                            )}

                            <InputError
                                id={`invoice-${key}-error`}
                                messages={getError(key)}
                            />
                        </LabelInputContainer>
                    ))}
                </div>
            )}
        </section>
    )
}
