import { useTranslations } from 'next-intl'
import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'

export default function ItemsSection({ items, setItems, errors }: any) {
    const t = useTranslations('Invoices.Create')
    const handleItemChange = (idx: number, field: string, value: any) => {
        setItems((prev: any[]) =>
            prev.map((item, i) =>
                i === idx ? { ...item, [field]: value } : item,
            ),
        )
    }
    const addItem = () =>
        setItems((prev: any[]) => [
            ...prev,
            { name: '', description: '', rate: 0, quantity: 1 },
        ])
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('items')}</h2>
            {items.map((item: any, idx: number) => (
                <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                    <LabelInputContainer>
                        <Label htmlFor={`item-name-${idx}`}>
                            {t('itemName')}
                        </Label>
                        <InputField
                            id={`item-name-${idx}`}
                            value={item.name}
                            onChange={e =>
                                handleItemChange(idx, 'name', e.target.value)
                            }
                            aria-label={t('itemName')}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor={`item-description-${idx}`}>
                            {t('itemDescription')}
                        </Label>
                        <InputField
                            id={`item-description-${idx}`}
                            value={item.description}
                            onChange={e =>
                                handleItemChange(
                                    idx,
                                    'description',
                                    e.target.value,
                                )
                            }
                            aria-label={t('itemDescription')}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor={`item-rate-${idx}`}>{t('rate')}</Label>
                        <InputField
                            id={`item-rate-${idx}`}
                            type="number"
                            value={item.rate}
                            onChange={e =>
                                handleItemChange(
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
                                handleItemChange(
                                    idx,
                                    'quantity',
                                    Number(e.target.value),
                                )
                            }
                            aria-label={t('quantity')}
                        />
                    </LabelInputContainer>
                    <div className="flex items-end">
                        <button
                            type="button"
                            className="bg-blue-500 text-white rounded px-2 h-10"
                            onClick={addItem}>
                            +
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}
