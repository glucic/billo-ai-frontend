'use client'

import {
    Label,
    LabelInputContainer,
    InputField,
    InputError,
} from '@/components/ui'
import { useTranslations } from 'next-intl'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CompanyNameSection({ form, handleChange, fieldErrors }: any) {
    const t = useTranslations('Organisation')
    return (
        <section>
            <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                {t('companyInfo')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LabelInputContainer>
                    <Label htmlFor="name">{t('fields.name')}</Label>
                    <InputField
                        id="name"
                        name="name"
                        value={form.name || ''}
                        onChange={handleChange}
                        error={Boolean(fieldErrors?.name)}
                    />
                    {fieldErrors?.name && (
                        <InputError messages={fieldErrors.name} />
                    )}
                </LabelInputContainer>
            </div>
        </section>
    )
}
