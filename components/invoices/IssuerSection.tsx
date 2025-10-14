import { useTranslations } from 'next-intl'
import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'
import { TextAreaField } from '../ui/TextArea'

export default function IssuerSection({
    organisations,
    issuerId,
    setIssuerId,
    issuer,
    errors,
}: any) {
    const t = useTranslations('Invoices.Create')
    const orgT = useTranslations('organisation.fields')
    return (
        <section className="bg-[var(--secondary-background)] rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('issuer')}</h2>
            <LabelInputContainer>
                <Label htmlFor="issuer-org">{t('selectOrganisation')}</Label>
                <select
                    id="issuer-org"
                    className="mb-4 w-full rounded border p-2"
                    value={issuerId ?? ''}
                    onChange={e => setIssuerId(Number(e.target.value) || null)}
                    aria-label={t('selectOrganisation')}>
                    <option value="">{t('selectOrganisation')}</option>
                    {organisations.map((org: any) => (
                        <option key={org.id} value={org.id}>
                            {org.name}
                        </option>
                    ))}
                </select>
            </LabelInputContainer>
            <div className="flex flex-row flex-wrap gap-4 min-w-1">
                <LabelInputContainer>
                    <Label htmlFor="issuer-name">{orgT('name')}</Label>
                    <InputField
                        id="issuer-name"
                        value={issuer.name || ''}
                        readOnly
                        aria-label={orgT('name')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="issuer-address">{orgT('address')}</Label>
                    <InputField
                        id="issuer-address"
                        value={issuer.address || ''}
                        readOnly
                        aria-label={orgT('address')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="issuer-phone">{orgT('phone')}</Label>
                    <InputField
                        id="issuer-phone"
                        value={issuer.phone || ''}
                        readOnly
                        aria-label={orgT('phone')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="issuer-email">{orgT('email')}</Label>
                    <InputField
                        id="issuer-email"
                        value={issuer.email || ''}
                        readOnly
                        aria-label={orgT('email')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="issuer-description">
                        {orgT('description')}
                    </Label>
                    <TextAreaField
                        id="issuer-description"
                        value={issuer.description || ''}
                        readOnly
                        aria-label={orgT('description')}
                    />
                </LabelInputContainer>
            </div>
        </section>
    )
}
