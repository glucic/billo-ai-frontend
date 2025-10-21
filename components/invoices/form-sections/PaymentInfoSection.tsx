import { useTranslations } from 'next-intl'
import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'
import { TextAreaField } from '../ui/TextArea'

export default function PaymentInfoSection({
    paymentTerms,
    setPaymentTerms,
    bankDetails,
    setBankDetails,
    paymentInstructions,
    setPaymentInstructions,
}: any) {
    const t = useTranslations('Invoices.Create')
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('paymentInfo')}</h2>
            <LabelInputContainer>
                <Label htmlFor="payment-terms">{t('paymentTerms')}</Label>
                <InputField
                    id="payment-terms"
                    value={paymentTerms}
                    onChange={e => setPaymentTerms(e.target.value)}
                    aria-label={t('paymentTerms')}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="bank-details">{t('bankDetails')}</Label>
                <TextAreaField
                    id="bank-details"
                    value={bankDetails}
                    onChange={e => setBankDetails(e.target.value)}
                    aria-label={t('bankDetails')}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="payment-instructions">
                    {t('paymentInstructions')}
                </Label>
                <TextAreaField
                    id="payment-instructions"
                    value={paymentInstructions}
                    onChange={e => setPaymentInstructions(e.target.value)}
                    aria-label={t('paymentInstructions')}
                />
            </LabelInputContainer>
        </section>
    )
}
