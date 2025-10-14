import { useTranslations } from 'next-intl'
import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { InputField } from '../ui/InputField'
import { TextAreaField } from '../ui/TextArea'

export default function ClientSection({
    organisations,
    clientId,
    setClientId,
    client,
    errors,
}: any) {
    const t = useTranslations('Invoices.Create')
    const orgT = useTranslations('organisation.fields')
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('client')}</h2>
            <LabelInputContainer>
                <Label htmlFor="client-org">{t('selectClient')}</Label>
                <select
                    id="client-org"
                    className="mb-4 w-full rounded border p-2"
                    value={clientId ?? ''}
                    onChange={e => setClientId(Number(e.target.value) || null)}
                    aria-label={t('selectClient')}>
                    <option value="">{t('selectClient')}</option>
                    {organisations.map((org: any) => (
                        <option key={org.id} value={org.id}>
                            {org.name}
                        </option>
                    ))}
                </select>
            </LabelInputContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                    <Label htmlFor="client-name">{orgT('name')}</Label>
                    <InputField
                        id="client-name"
                        value={client.name || ''}
                        readOnly
                        aria-label={orgT('name')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="client-address">{orgT('address')}</Label>
                    <InputField
                        id="client-address"
                        value={client.address || ''}
                        readOnly
                        aria-label={orgT('address')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="client-phone">{orgT('phone')}</Label>
                    <InputField
                        id="client-phone"
                        value={client.phone || ''}
                        readOnly
                        aria-label={orgT('phone')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="client-email">{orgT('email')}</Label>
                    <InputField
                        id="client-email"
                        value={client.email || ''}
                        readOnly
                        aria-label={orgT('email')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="client-employee-count">
                        {orgT('employeeCount')}
                    </Label>
                    <InputField
                        id="client-employee-count"
                        value={client.employee_count || ''}
                        readOnly
                        aria-label={orgT('employeeCount')}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="client-description">
                        {orgT('description')}
                    </Label>
                    <TextAreaField
                        id="client-description"
                        value={client.description || ''}
                        readOnly
                        aria-label={orgT('description')}
                    />
                </LabelInputContainer>
            </div>
        </section>
    )
}
