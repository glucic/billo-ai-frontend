'use client'

import React from 'react'
import { WizardStepTransition } from './WizardStepTransition'
import { Label, InputError } from '@/components/ui'
import { TextAreaField } from '@/components/ui/TextArea'
import { useTranslations } from 'next-intl'
import type { BackendErrors } from '@/lib/errorUtils'

export function StepCompanyAbout({
    value,
    onChange,
    step,
    errors,
}: {
    value: string
    onChange: (val: string) => void
    step: number
    errors?: BackendErrors
}) {
    const t = useTranslations('Organisation.GettingStarted.StepCompanyAbout')

    return (
        <WizardStepTransition step={step}>
            <Label
                htmlFor="company_description"
                className="text-3xl font-bold text-center mb-4">
                {t('label')}
            </Label>
            <TextAreaField
                id="company_description"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={t('placeholder')}
                className="w-120 h-32 resize-none"
            />
            {errors?.description && (
                <InputError messages={errors.description} className="mt-2" />
            )}
        </WizardStepTransition>
    )
}
