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

    const fields: {
        id: string
        labelKey: string
        placeholderKey: string
        type?: string
        colSpan?: string
    }[] = [
        {
            id: 'company_email',
            labelKey: 'emailLabel',
            placeholderKey: 'emailPlaceholder',
            type: 'email',
        },
        {
            id: 'company_phone',
            labelKey: 'phoneLabel',
            placeholderKey: 'phonePlaceholder',
        },
        {
            id: 'street',
            labelKey: 'streetLabel',
            placeholderKey: 'streetPlaceholder',
            colSpan: 'sm:col-span-2',
        },
        {
            id: 'zip',
            labelKey: 'zipLabel',
            placeholderKey: 'zipPlaceholder',
        },
        {
            id: 'city',
            labelKey: 'cityLabel',
            placeholderKey: 'cityPlaceholder',
        },
        {
            id: 'region',
            labelKey: 'regionLabel',
            placeholderKey: 'regionPlaceholder',
            colSpan: 'sm:col-span-2',
        },
        {
            id: 'workers',
            labelKey: 'workersLabel',
            placeholderKey: 'workersPlaceholder',
            type: 'number',
            colSpan: 'sm:col-span-2',
        },
    ]

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
                    ({ id, labelKey, placeholderKey, type, colSpan }) => (
                        <LabelInputContainer
                            key={id}
                            className={colSpan ? colSpan : 'sm:col-span-1'}>
                            <Label htmlFor={id}>{t(labelKey)}</Label>
                            <InputField
                                id={id}
                                type={type || 'text'}
                                value={values[id]?.toString() ?? ''}
                                onChange={e => onChange(id, e.target.value)}
                                placeholder={t(placeholderKey)}
                            />
                            {errors?.[
                                errorMap[id] || (id as keyof BackendErrors)
                            ] && (
                                <InputError
                                    messages={
                                        errors[
                                            errorMap[id] ||
                                                (id as keyof BackendErrors)
                                        ]
                                    }
                                />
                            )}
                        </LabelInputContainer>
                    ),
                )}
            </div>
        </WizardStepTransition>
    )
}
