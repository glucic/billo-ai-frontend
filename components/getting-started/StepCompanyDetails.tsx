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
import type { BackendErrors } from '@/lib/errorUtils'

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
            colSpan: 'sm:col-span-1',
        },
        {
            id: 'company_phone',
            labelKey: 'phoneLabel',
            placeholderKey: 'phonePlaceholder',
            colSpan: 'sm:col-span-1',
            type: 'text',
        },
        {
            id: 'street',
            labelKey: 'streetLabel',
            placeholderKey: 'streetPlaceholder',
            colSpan: 'sm:col-span-2',
            type: 'text',
        },
        {
            id: 'zip',
            labelKey: 'zipLabel',
            placeholderKey: 'zipPlaceholder',
            colSpan: 'sm:col-span-1',
            type: 'text',
        },
        {
            id: 'city',
            labelKey: 'cityLabel',
            placeholderKey: 'cityPlaceholder',
            colSpan: 'sm:col-span-1',
            type: 'text',
        },
        {
            id: 'region',
            labelKey: 'regionLabel',
            placeholderKey: 'regionPlaceholder',
            colSpan: 'sm:col-span-2',
            type: 'text',
        },
        {
            id: 'workers',
            labelKey: 'workersLabel',
            placeholderKey: 'workersPlaceholder',
            type: 'number',
            colSpan: 'sm:col-span-2',
        },
    ] as const

    const values: Record<string, string | number> = {
        company_email,
        company_phone,
        street,
        city,
        zip,
        region,
        workers,
    }

    const errorMap: Record<string, keyof BackendErrors> = {
        company_email: 'email',
        company_phone: 'phone',
        workers: 'employee_count',
    }

    return (
        <WizardStepTransition step={step}>
            <h1 className="text-3xl font-bold text-center mb-8">
                {t('title')}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
                {fields.map(
                    ({ id, labelKey, placeholderKey, type, colSpan }) => {
                        const errorKey =
                            errorMap[id] || (id as keyof BackendErrors)
                        const fieldError = errors?.[errorKey]
                        return (
                            <LabelInputContainer
                                key={id}
                                className={colSpan ?? 'sm:col-span-1'}>
                                <Label htmlFor={id}>{t(labelKey)}</Label>
                                <InputField
                                    id={id}
                                    type={type || 'text'}
                                    value={values[id]?.toString() ?? ''}
                                    onChange={e => onChange(id, e.target.value)}
                                    placeholder={t(placeholderKey)}
                                    error={Boolean(fieldError)}
                                    aria-describedby={
                                        fieldError ? `${id}-error` : undefined
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
        </WizardStepTransition>
    )
}
