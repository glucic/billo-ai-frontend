'use client'

import React from 'react'
import { WizardStepTransition } from './WizardStepTransition'
import { InputField, Label, LabelInputContainer } from '@/components/ui'
import { useTranslations } from 'next-intl'

export function StepCompanyDetails({
    company_email,
    company_phone,
    workers,
    onChange,
    step,
}: {
    company_email: string
    company_phone: string
    workers: number
    onChange: (field: string, value: string) => void
    step: number
}) {
    const t = useTranslations('Auth.GettingStarted.StepCompanyDetails')

    return (
        <WizardStepTransition step={step}>
            <h1 className="text-3xl font-bold text-center mb-6">
                {t('title')}
            </h1>
            <div className="space-y-4 w-80">
                <LabelInputContainer>
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
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="company_phone">{t('phoneLabel')}</Label>
                    <InputField
                        id="company_phone"
                        value={company_phone}
                        onChange={e =>
                            onChange('company_phone', e.target.value)
                        }
                        placeholder={t('phonePlaceholder')}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="workers">{t('workersLabel')}</Label>
                    <InputField
                        id="workers"
                        type="number"
                        value={workers}
                        onChange={e => onChange('workers', e.target.value)}
                        placeholder={t('workersPlaceholder')}
                    />
                </LabelInputContainer>
            </div>
        </WizardStepTransition>
    )
}
