import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'
import { ChevronDownIcon } from '../ui/ChevronDownIcon'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function InvoiceDetailsSection({
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    reference,
    setReference,
}: any) {
    const t = useTranslations('Invoices.Create')
    const [open, setOpen] = React.useState(true)
    return (
        <section className="bg-[var(--secondary-background)] rounded-lg shadow p-6 mb-6">
            <button
                type="button"
                className="flex items-center w-full justify-between mb-4 focus:outline-none"
                aria-expanded={open}
                aria-controls="invoice-details-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('invoiceDetails')}</h2>
                <span
                    className={`transition-transform ${open ? '' : '-rotate-90'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </span>
            </button>
            {open && (
                <div
                    id="invoice-details-fields"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabelInputContainer>
                        <Label htmlFor="invoice-number">
                            {t('invoiceNumber')}
                        </Label>
                        <InputField
                            id="invoice-number"
                            value={invoiceNumber}
                            onChange={e => setInvoiceNumber(e.target.value)}
                            aria-label={t('invoiceNumber')}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="invoice-date">{t('invoiceDate')}</Label>
                        <InputField
                            id="invoice-date"
                            type="date"
                            value={invoiceDate}
                            onChange={e => setInvoiceDate(e.target.value)}
                            aria-label={t('invoiceDate')}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="due-date">{t('dueDate')}</Label>
                        <InputField
                            id="due-date"
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            aria-label={t('dueDate')}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="reference">{t('reference')}</Label>
                        <InputField
                            id="reference"
                            value={reference}
                            onChange={e => setReference(e.target.value)}
                            aria-label={t('reference')}
                        />
                    </LabelInputContainer>
                </div>
            )}
        </section>
    )
}
