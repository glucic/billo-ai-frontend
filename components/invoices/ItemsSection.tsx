'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
    Button,
    InputField,
    Label,
    LabelInputContainer,
    ChevronDownIcon,
} from '@/components/ui'
import { Trash2 as TrashIcon } from 'lucide-react'
import { InvoiceItem } from '@/types/Invoice'

interface ItemsSectionProps {
    value: InvoiceItem[]
    onUpdateItem: (index: number, field: keyof InvoiceItem, value: any) => void
    onAddItem: () => void
    onRemoveItem: (index: number) => void
}

export default function ItemsSection({
    value,
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
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="items-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <span
                    className={`transition-transform ${open ? '' : '-rotate-90'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </span>
            </Button>

            {open && (
                <div id="items-fields" className="flex flex-col gap-4 mt-4">
                    {value.map((item, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                            <LabelInputContainer>
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
                                    aria-label={t('name')}
                                />
                            </LabelInputContainer>

                            <LabelInputContainer className="md:col-span-2">
                                <Label htmlFor={`item-description-${idx}`}>
                                    {t('description')}
                                </Label>
                                <InputField
                                    id={`item-description-${idx}`}
                                    value={item.description}
                                    onChange={e =>
                                        onUpdateItem(
                                            idx,
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    aria-label={t('description')}
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor={`item-rate-${idx}`}>
                                    {t('rate')}
                                </Label>
                                <InputField
                                    id={`item-rate-${idx}`}
                                    type="number"
                                    value={item.rate}
                                    onChange={e =>
                                        onUpdateItem(
                                            idx,
                                            'rate',
                                            Number(e.target.value),
                                        )
                                    }
                                    aria-label={t('rate')}
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor={`item-quantity-${idx}`}>
                                    {t('quantity')}
                                </Label>
                                <InputField
                                    id={`item-quantity-${idx}`}
                                    type="number"
                                    value={item.quantity}
                                    onChange={e =>
                                        onUpdateItem(
                                            idx,
                                            'quantity',
                                            Number(e.target.value),
                                        )
                                    }
                                    aria-label={t('quantity')}
                                />
                            </LabelInputContainer>

                            <div className="flex items-end justify-center">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => onRemoveItem(idx)}
                                    aria-label={t('removeItem')}
                                    className="p-2 text-red-500 hover:text-red-700">
                                    <TrashIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="secondary"
                        animated
                        className="w-full py-6"
                        onClick={onAddItem}>
                        {t('addItem')}
                    </Button>
                </div>
            )}
        </section>
    )
}
