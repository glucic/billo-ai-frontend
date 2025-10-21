'use client'

import { LabelInputContainer, TextAreaField, InputError } from '@/components/ui'
import { useTranslations } from 'next-intl'

export function CompanyAboutSection({ form, handleChange, fieldErrors }: any) {
    const t = useTranslations('Organisation')
    return (
        <section>
            <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                {t('fields.description')}
            </h4>
            <LabelInputContainer>
                <TextAreaField
                    name="description"
                    value={form.description || ''}
                    onChange={handleChange}
                    rows={4}
                    error={Boolean(fieldErrors?.description)}
                />
                {fieldErrors?.description && (
                    <InputError messages={fieldErrors.description} />
                )}
            </LabelInputContainer>
        </section>
    )
}
