'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WizardStepTransition } from './WizardStepTransition'
import {
    InputField,
    Label,
    LabelInputContainer,
    InputError,
} from '@/components/ui'
import { useTranslations } from 'next-intl'
import type { BackendErrors } from '@/lib/errorUtils'
import LocationFields, { LocationValues } from '../common/LocationFields'

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
    errors?: BackendErrors
}) {
    const t = useTranslations('Organisation.GettingStarted.StepCompanyDetails')

    const fields = [
        {
            id: 'company_email',
            labelKey: 'emailLabel',
            placeholderKey: 'emailPlaceholder',
            type: 'email',
            autoComplete: 'email',
            colSpan: 'sm:col-span-1',
        },
        {
            id: 'company_phone',
            labelKey: 'phoneLabel',
            placeholderKey: 'phonePlaceholder',
            type: 'tel',
            autoComplete: 'tel',
            colSpan: 'sm:col-span-1',
        },
    ] as const

    const values: Record<string, string | number> = {
        company_email,
        company_phone,
        workers,
    }

    const errorMap: Record<string, keyof BackendErrors> = {
        company_email: 'email',
        company_phone: 'phone',
    }

    const handleFullAddressSelect = (address: LocationValues) => {
        if (address.street !== undefined) onChange('street', address.street)
        if (address.zip !== undefined) onChange('zip', address.zip)
        if (address.city !== undefined) onChange('city', address.city)
        if (address.region !== undefined) onChange('region', address.region)
    }

    return (
        <WizardStepTransition step={step}>
            <div className="flex flex-col items-center text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-muted-foreground text-base max-w-lg">
                    {t('subtitle')}
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <div className="bg-muted/30 rounded-2xl p-6 shadow-sm sm:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">
                        {t('contactInfoTitle')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {fields.map(
                            ({
                                id,
                                labelKey,
                                placeholderKey,
                                type,
                                autoComplete,
                                colSpan,
                            }) => {
                                const errorKey =
                                    errorMap[id] || (id as keyof BackendErrors)
                                const fieldError = errors?.[errorKey]

                                return (
                                    <LabelInputContainer
                                        key={id}
                                        className={colSpan ?? 'sm:col-span-1'}>
                                        <Label htmlFor={id}>
                                            {t(labelKey)}
                                        </Label>
                                        <InputField
                                            id={id}
                                            type={type || 'text'}
                                            autoComplete={autoComplete}
                                            value={values[id]?.toString() ?? ''}
                                            onChange={e =>
                                                onChange(id, e.target.value)
                                            }
                                            placeholder={t(placeholderKey)}
                                            error={Boolean(fieldError)}
                                            aria-describedby={
                                                fieldError
                                                    ? `${id}-error`
                                                    : undefined
                                            }
                                        />
                                        {fieldError && (
                                            <InputError
                                                messages={fieldError}
                                                id={`${id}-error`}
                                            />
                                        )}
                                    </LabelInputContainer>
                                )
                            },
                        )}
                    </div>
                </div>

                <div className="bg-muted/30 rounded-2xl p-6 shadow-sm sm:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">
                        {t('addressInfoTitle')}
                    </h2>

                    <LocationFields
                        values={{
                            street: street ?? '',
                            zip: zip ?? '',
                            city: city ?? '',
                            region: region ?? '',
                        }}
                        onChange={(field, value) => onChange(field, value)}
                        onFullAddressSelect={handleFullAddressSelect}
                        required={{ street: true, zip: true, city: true }}
                        placeholders={{
                            street: t('streetPlaceholder'),
                            zip: t('zipPlaceholder'),
                            city: t('cityPlaceholder'),
                            region: t('regionPlaceholder'),
                        }}
                        errors={{
                            street: errors?.['street'],
                            zip: errors?.['zip'],
                            city: errors?.['city'],
                            region: errors?.['region'],
                        }}
                    />
                </div>
            </motion.div>
        </WizardStepTransition>
    )
}
