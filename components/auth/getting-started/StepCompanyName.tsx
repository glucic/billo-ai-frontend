'use client'

import React from 'react'
import { InputField, LabelInputContainer, Label } from '@/components/ui'
import { WizardStepTransition } from './WizardStepTransition'

export function StepCompanyName({
    value,
    onChange,
    step
}: {
    value: string
    onChange: (val: string) => void
    step: number
}) {
    return (
        <WizardStepTransition step={step}>
            <LabelInputContainer>
                <Label
                    htmlFor="company_name"
                    className="text-3xl font-bold text-center mb-4">
                    What is the name of your company?
                </Label>
                <InputField
                    id="company_name"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="Enter company name"
                    className="text-lg p-5 w-full"
                />
            </LabelInputContainer>
        </WizardStepTransition>
    )
}
