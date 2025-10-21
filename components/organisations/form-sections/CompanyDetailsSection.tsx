'use client'

import {
    Label,
    LabelInputContainer,
    InputField,
    InputError,
} from '@/components/ui'
import { useTranslations } from 'next-intl'

export function CompanyDetailsSection({
    form,
    handleChange,
    fieldErrors,
}: any) {
    const t = useTranslations('Organisation')
    return (
        <section>
            <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                {t('addressInfo')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['street', 'city', 'zip', 'region', 'email', 'phone'].map(
                    field => (
                        <LabelInputContainer key={field}>
                            <Label htmlFor={field}>
                                {t(`fields.${field}`)}
                            </Label>
                            <InputField
                                id={field}
                                name={field}
                                value={form[field] || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.[field])}
                            />
                            {fieldErrors?.[field] && (
                                <InputError messages={fieldErrors[field]} />
                            )}
                        </LabelInputContainer>
                    ),
                )}
            </div>
        </section>
    )
}
