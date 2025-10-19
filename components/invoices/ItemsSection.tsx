'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
    Button,
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    CurrencyInput,
    TextAreaField,
} from '@/components/ui'
import { Trash2 as TrashIcon } from 'lucide-react'
import { InvoiceItem } from '@/types/Invoice'

interface ItemsSectionProps {
    value: InvoiceItem[]
    currency: string
    onUpdateItem: <K extends keyof InvoiceItem>(
        index: number,
        field: K,
        value: InvoiceItem[K]
    ) => void
    onAddItem: () => void
    onRemoveItem: (index: number) => void
}

export default function ItemsSection({
    value,
    currency,
    onUpdateItem,
    onAddItem,
    onRemoveItem,
}: ItemsSectionProps) {
    const t = useTranslations('Invoices.Create.Items')
    const [open, setOpen] = React.useState(true)

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:bg-transparent"
                aria-expanded={open}
                aria-controls="items-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div id="items-fields" className="flex flex-col gap-6 mt-4">
                    {value.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-lg bg-[var(--primary)] shadow-sm transition-all duration-200 hover:shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                                <LabelInputContainer className="md:col-span-3">
                                    <Label htmlFor={`item-name-${idx}`}>
                                        {t('name')}
                                    </Label>
                                    <InputField
                                        id={`item-name-${idx}`}
                                        value={item.name}
                                        onChange={e =>
                                            onUpdateItem(
                                                idx,
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder={t('name')}
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor={`item-rate-${idx}`}>
                                        {t('rate')}
                                    </Label>
                                    <CurrencyInput
                                        value={item.rate}
                                        onChange={val =>
                                            onUpdateItem(idx, 'rate', val)
                                        }
                                        currency={currency}
                                        position="suffix"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor={`item-quantity-${idx}`}>
                                        {t('quantity')}
                                    </Label>
                                    <InputField
                                        id={`item-quantity-${idx}`}
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={item.quantity}
                                        onChange={e =>
                                            onUpdateItem(
                                                idx,
                                                'quantity',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </LabelInputContainer>

                                <div className="flex flex-col items-center justify-end">
                                    <CurrencyInput
                                        value={item.rate * item.quantity}
                                        onChange={() => {}}
                                        currency={currency}
                                        readOnly
                                        position="suffix"
                                    />
                                </div>
                            </div>
                            <LabelInputContainer className="mt-4">
                                <Label htmlFor={`item-description-${idx}`}>
                                    {t('description')}
                                </Label>
                                <TextAreaField
                                    id={`item-description-${idx}`}
                                    rows={3}
                                    value={item.description}
                                    onChange={e =>
                                        onUpdateItem(
                                            idx,
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                />
                            </LabelInputContainer>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onRemoveItem(idx)}
                                aria-label={t('removeItem')}
                                className="p-2 text-red-500 hover:text-red-700">
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="secondary"
                        animated
                        className="w-full py-6 rounded-2xl"
                        onClick={onAddItem}>
                        {t('addItem')}
                    </Button>
                </div>
            )}
        </section>
    )
}
