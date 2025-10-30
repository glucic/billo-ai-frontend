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
    InputError,
} from '@/components/ui'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { InvoiceItem } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'
import { cn } from '@/lib/utils'

interface ItemsSectionProps {
    value: InvoiceItem[]
    currency: string
    onUpdateItem: <K extends keyof InvoiceItem>(
        index: number,
        field: K,
        value: InvoiceItem[K],
    ) => void
    onAddItem: () => void
    onRemoveItem: (index: number) => void
    errors?: BackendErrors
}

export default function ItemsSection({
    value,
    currency,
    onUpdateItem,
    onAddItem,
    onRemoveItem,
    errors,
}: ItemsSectionProps) {
    const t = useTranslations('Invoices.Items')
    const [open, setOpen] = React.useState(true)
    const [hoverRemoveIdx, setHoverRemoveIdx] = React.useState<number | null>(
        null,
    )
    const getError = (index: number, field: keyof InvoiceItem) =>
        errors?.[`items.${index}.${field}`] || []

    const sectionError = errors?.['items'] || []

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
                    <InputError messages={sectionError} />

                    {value.map((item, idx) => {
                        const total = (item.rate ?? 0) * (item.quantity ?? 0)
                        const isSingleItem = value.length === 1

                        return (
                            <div
                                key={idx}
                                className={cn(
                                    'p-5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md',
                                    'bg-[var(--primary)]',
                                    hoverRemoveIdx === idx &&
                                        'bg-[var(--error)]/10',
                                )}>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                                    <div className="md:col-span-2">
                                        <Label
                                            htmlFor={`item-name-${idx}`}
                                            className="mb-1 block">
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
                                            error={Boolean(
                                                getError(idx, 'name')?.length,
                                            )}
                                        />
                                        <InputError
                                            id={`item-name-${idx}-error`}
                                            messages={getError(idx, 'name')}
                                            className="mt-1 text-xs"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor={`item-rate-${idx}`}
                                            className="mb-1 block">
                                            {t('rate')}
                                        </Label>
                                        <CurrencyInput
                                            value={item.rate}
                                            onChange={val =>
                                                onUpdateItem(idx, 'rate', val)
                                            }
                                            currency={currency}
                                            mode="currency"
                                            step={0.5}
                                            min={0}
                                            error={Boolean(
                                                getError(idx, 'rate')?.length,
                                            )}
                                        />
                                        <InputError
                                            id={`item-rate-${idx}-error`}
                                            messages={getError(idx, 'rate')}
                                            className="mt-1 text-xs"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor={`item-quantity-${idx}`}
                                            className="mb-1 block">
                                            {t('quantity')}
                                        </Label>
                                        <InputField
                                            id={`item-quantity-${idx}`}
                                            value={item.quantity.toString()}
                                            onChange={e =>
                                                onUpdateItem(
                                                    idx,
                                                    'quantity',
                                                    Number(
                                                        e.target.value
                                                            .replace(
                                                                /[^\d.,-]/g,
                                                                '',
                                                            )
                                                            .replace(',', '.'),
                                                    ) || 0,
                                                )
                                            }
                                            placeholder="0"
                                            error={Boolean(
                                                getError(idx, 'quantity')
                                                    ?.length,
                                            )}
                                            className="text-center"
                                        />
                                        <InputError
                                            id={`item-quantity-${idx}-error`}
                                            messages={getError(idx, 'quantity')}
                                            className="mt-1 text-xs"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-center">
                                            Total
                                        </Label>
                                        <div
                                            className="flex mb-1 items-center justify-end h-[var(--input-height)]
                                             px-3 rounded-[var(--input-radius)]
                                             text-[var(--input-text)]
                                             text-sm font-semibold tabular-nums">
                                            {total.toFixed(2)} {currency}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() =>
                                                !isSingleItem &&
                                                onRemoveItem(idx)
                                            }
                                            onMouseEnter={() =>
                                                setHoverRemoveIdx(idx)
                                            }
                                            onMouseLeave={() =>
                                                setHoverRemoveIdx(null)
                                            }
                                            aria-label={t('removeItem')}
                                            disabled={isSingleItem}
                                            className={cn(
                                                'p-2 rounded-full text-[var(--error)] transition-all duration-200 focus:outline-none focus:ring-0',
                                                'hover:bg-transparent active:bg-transparent',
                                                isSingleItem &&
                                                    'opacity-50 cursor-not-allowed',
                                            )}>
                                            <MinusIcon />
                                        </Button>
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
                                    <InputError
                                        id={`item-description-${idx}-error`}
                                        messages={getError(idx, 'description')}
                                    />
                                </LabelInputContainer>
                            </div>
                        )
                    })}

                    <Button
                        type="button"
                        variant="secondary"
                        animated
                        className="w-full py-9 rounded-2xl"
                        onClick={onAddItem}>
                        <PlusIcon className="w-5 h-5" /> {t('addItem')}
                    </Button>
                </div>
            )}
        </section>
    )
}
