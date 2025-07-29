'use client'

import React from 'react'
import { WizardStepTransition } from './WizardStepTransition'
import { InputField, Label, LabelInputContainer } from '@/components/ui'

export function StepCompanyDetails({
    email,
    phone,
    workers,
    onChange,
    step
}: {
    email: string
    phone: string
    workers: number
    onChange: (field: string, value: string) => void
    step: number
}) {
    return (
        <WizardStepTransition step={step}>
            <h1 className="text-3xl font-bold text-center mb-6">
                Company Details
            </h1>
            <div className="space-y-4 w-80">
                <LabelInputContainer>
                    <Label htmlFor="email">Company Email</Label>
                    <InputField
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => onChange('email', e.target.value)}
                        placeholder="email@company.com"
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="phone">Phone Number</Label>
                    <InputField
                        id="phone"
                        value={phone}
                        onChange={e => onChange('phone', e.target.value)}
                        placeholder="+123 456 789"
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="workers">Number of Workers</Label>
                    <InputField
                        id="workers"
                        type="number"
                        value={workers}
                        onChange={e => onChange('workers', e.target.value)}
                        placeholder="50"
                    />
                </LabelInputContainer>
            </div>
        </WizardStepTransition>
    )
}
