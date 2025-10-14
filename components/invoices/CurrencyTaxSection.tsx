import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'
import { useTranslations } from 'next-intl'

const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
]

export default function CurrencyTaxSection({
    currency,
    setCurrency,
    taxRate,
    setTaxRate,
    discount,
    setDiscount,
    subtotal,
    tax,
    discountAmount,
    total,
}: any) {
    const t = useTranslations('Invoices.Create')
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('currencyAndTax')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                    <Label htmlFor="currency">{t('currency')}</Label>
                    <select
                        id="currency"
                        className="w-full rounded border p-2"
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        aria-label={t('currency')}>
                        {currencyOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="tax-rate">{t('taxRate')}</Label>
                    <InputField
                        id="tax-rate"
                        type="number"
                        value={taxRate}
                        onChange={e => setTaxRate(Number(e.target.value))}
                        aria-label={t('taxRate')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="discount">{t('discount')}</Label>
                    <InputField
                        id="discount"
                        type="number"
                        value={discount}
                        onChange={e => setDiscount(Number(e.target.value))}
                        aria-label={t('discount')}
                    />
                </LabelInputContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="font-medium">
                    {t('subtotal')}: {subtotal.toFixed(2)} {currency}
                </div>
                <div className="font-medium">
                    {t('tax')}: {tax.toFixed(2)} {currency}
                </div>
                <div className="font-medium">
                    {t('discountAmount')}: {discountAmount.toFixed(2)}{' '}
                    {currency}
                </div>
                <div className="font-bold text-lg">
                    {t('total')}: {total.toFixed(2)} {currency}
                </div>
            </div>
        </section>
    )
}
