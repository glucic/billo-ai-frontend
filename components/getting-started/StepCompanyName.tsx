'use client'

import React from 'react'
import {
    InputError,
    InputField,
    LabelInputContainer,
    Label,
} from '@/components/ui'
import { WizardStepTransition } from './WizardStepTransition'
import { useTranslations } from 'next-intl'
import type { BackendErrors } from '@/lib/errorUtils'

export function StepCompanyName({
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
    const t = useTranslations('Organisation.GettingStarted.StepCompanyName')

    return (
        <WizardStepTransition step={step}>
            <LabelInputContainer>
                <Label
                    htmlFor="company_name"
                    className="text-3xl font-bold text-center mb-4">
                    {t('label')}
                </Label>
                <InputField
                    id="company_name"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={t('placeholder')}
                    className="text-lg p-5 w-full"
                />
                {errors?.name && <InputError messages={errors.name} />}
            </LabelInputContainer>
        </WizardStepTransition>
    )
}
