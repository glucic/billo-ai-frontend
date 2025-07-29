'use client'

import React from 'react'
import { WizardStepTransition } from './WizardStepTransition'
import { InputField, Label, LabelInputContainer } from '@/components/ui'

export function StepCompanyAbout({
    value,
    onChange,
    step,
}: {
    value: string
    onChange: (val: string) => void
    step: number
}) {
    return (
        <WizardStepTransition step={step}>
            <h1 className="text-3xl font-bold text-center mb-4">
                What is your company about? (Optional)
            </h1>
            <InputField
                as="textarea"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-96 h-32 border-neutral-300 text-black"
                placeholder="Describe your company"
            />
        </WizardStepTransition>
    )
}
