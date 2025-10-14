import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    Button,
} from '@/components/ui'
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
    const t = useTranslations('Invoices.Create.InvoiceDetails')
    const [open, setOpen] = React.useState(true)
    return (
        <section className="card rounded-lg">
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
                            required
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
