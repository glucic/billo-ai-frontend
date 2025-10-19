'use client'

import React from 'react'
import { WizardStepTransition } from './WizardStepTransition'
import {
    InputField,
    Label,
    LabelInputContainer,
    InputError,
} from '@/components/ui'
import { useTranslations } from 'next-intl'

export function StepCompanyDetails({
    company_email,
    company_phone,
    workers,
    street,
    city,
    zip,
    region,
    onChange,
    step,
    errors,
}: {
    company_email: string
    company_phone: string
    workers: number
    street: string
    city: string
    zip: string
    region: string
    onChange: (field: string, value: string) => void
    step: number
    errors?: Record<string, string[]>
}) {
    const t = useTranslations('Auth.GettingStarted.StepCompanyDetails')

    return (
        <WizardStepTransition step={step}>
            <h1 className="text-3xl font-bold text-center mb-8">
                {t('title')}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
                <LabelInputContainer className="sm:col-span-1">
                    <Label htmlFor="company_email">{t('emailLabel')}</Label>
                    <InputField
                        id="company_email"
                        type="email"
                        value={company_email}
                        onChange={e =>
                            onChange('company_email', e.target.value)
                        }
                        placeholder={t('emailPlaceholder')}
                    />
                    {errors?.email && <InputError messages={errors.email} />}
                </LabelInputContainer>

                <LabelInputContainer className="sm:col-span-1">
                    <Label htmlFor="company_phone">{t('phoneLabel')}</Label>
                    <InputField
                        id="company_phone"
                        value={company_phone}
                        onChange={e =>
                            onChange('company_phone', e.target.value)
                        }
                        placeholder={t('phonePlaceholder')}
                    />
                    {errors?.phone && <InputError messages={errors.phone} />}
                </LabelInputContainer>

                <h2 className="text-lg font-semibold mt-4 col-span-2">
                    {t('addressSection')}
                </h2>

                <LabelInputContainer className="sm:col-span-2">
                    <Label htmlFor="street">{t('streetLabel')}</Label>
                    <InputField
                        id="street"
                        value={street}
                        onChange={e => onChange('street', e.target.value)}
                        placeholder={t('streetPlaceholder')}
                    />
                    {errors?.street && <InputError messages={errors.street} />}
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="zip">{t('zipLabel')}</Label>
                    <InputField
                        id="zip"
                        value={zip}
                        onChange={e => onChange('zip', e.target.value)}
                        placeholder={t('zipPlaceholder')}
                    />
                    {errors?.zip && <InputError messages={errors.zip} />}
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="city">{t('cityLabel')}</Label>
                    <InputField
                        id="city"
                        value={city}
                        onChange={e => onChange('city', e.target.value)}
                        placeholder={t('cityPlaceholder')}
                    />
                    {errors?.city && <InputError messages={errors.city} />}
                </LabelInputContainer>

                <LabelInputContainer className="sm:col-span-2">
                    <Label htmlFor="region">{t('regionLabel')}</Label>
                    <InputField
                        id="region"
                        value={region}
                        onChange={e => onChange('region', e.target.value)}
                        placeholder={t('regionPlaceholder')}
                    />
                    {errors?.region && <InputError messages={errors.region} />}
                </LabelInputContainer>

                <LabelInputContainer className="sm:col-span-2">
                    <Label htmlFor="workers">{t('workersLabel')}</Label>
                    <InputField
                        id="workers"
                        type="number"
                        value={workers}
                        onChange={e => onChange('workers', e.target.value)}
                        placeholder={t('workersPlaceholder')}
                    />
                    {errors?.employee_count && (
                        <InputError messages={errors.employee_count} />
                    )}
                </LabelInputContainer>
            </div>
        </WizardStepTransition>
    )
}
