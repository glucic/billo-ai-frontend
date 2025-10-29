'use client'

import React, { useState, ElementType, SVGProps } from 'react'
import { useTranslations } from 'next-intl'
import { Button, ChevronDownIcon, Label } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { FileText, Package, Building2, Repeat, Receipt } from 'lucide-react'
import { Tooltip } from '@/components/ui/Tooltip'
import { InvoiceTypeKey } from '@/types/Invoice'

interface InvoiceTypeSectionProps {
    value: InvoiceTypeKey
    setValue: (value: InvoiceTypeKey) => void
}

const iconsMap: Record<InvoiceTypeKey, ElementType<SVGProps<SVGSVGElement>>> = {
    standard: FileText,
    shipping: Package,
    service: Building2,
    recurring: Repeat,
    proforma: Receipt,
}

export default function InvoiceTypeSection({
    value,
    setValue,
}: InvoiceTypeSectionProps) {
    const t = useTranslations('Invoices.InvoiceType')
    const [open, setOpen] = useState(true)

    const invoiceKeys = Object.keys(iconsMap) as InvoiceTypeKey[]

    const invoiceTypes = invoiceKeys.map(key => ({
        value: key,
        label: t(`types.${key}.label`),
        desc: t(`types.${key}.desc`),
        tooltip: t(`types.${key}.tooltip`),
        icon: iconsMap[key],
    }))

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div className="mt-4 animate-fadeIn grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {invoiceTypes.map(type => {
                        const Icon = type.icon as ElementType<
                            SVGProps<SVGSVGElement>
                        >
                        const selected = value === type.value

                        return (
                            <Card
                                key={type.value}
                                tabIndex={0}
                                role="button"
                                onClick={() => setValue(type.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' || e.key === ' ')
                                        setValue(type.value)
                                }}
                                className={`relative cursor-pointer p-4 flex items-center gap-3 rounded-xl border transition-all
                                    ${
                                        selected
                                            ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg'
                                            : 'border-[var(--border-color)] bg-[var(--secondary-background)] hover:shadow-md'
                                    }`}>
                                <Icon
                                    className={`w-6 h-6 transition-colors duration-150 ${
                                        selected
                                            ? 'text-[var(--accent)]'
                                            : 'text-[var(--text-muted)]'
                                    }`}
                                />
                                <div className="flex-1 relative">
                                    <div className="flex w-full gap-2 items-center">
                                        <Label className="font-semibold text-[var(--text-heading)]">
                                            {type.label}
                                        </Label>
                                        <Tooltip content={type.tooltip} />
                                    </div>

                                    <p className="text-sm text-[var(--text-muted)]">
                                        {type.desc}
                                    </p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
