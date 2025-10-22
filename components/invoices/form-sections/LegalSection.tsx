'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    TextAreaField,
    Button,
    ChevronDownIcon,
    InputError,
} from '@/components/ui'
import { Legal } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface LegalSectionProps {
    legal: Legal
    setLegalField: (field: keyof Legal, value: string) => void
    errors?: BackendErrors
}

export default function LegalSection({
    legal,
    setLegalField,
    errors,
}: LegalSectionProps) {
    const t = useTranslations('Invoices.Legal')
    const [open, setOpen] = useState(true)

    const getError = (key: keyof Legal) =>
        errors?.[`legal.${key}`] ?? errors?.[key]

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="legal-section"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">
                    {t('title') || 'Legal / Terms'}
                </h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div id="legal-section" className="mt-4 animate-fadeIn pl-4">
                    <LabelInputContainer>
                        <label
                            htmlFor="legal-terms"
                            className="block text-sm font-semibold text-[var(--text-heading)] mb-2">
                            {t('legalTermsLabel') || 'Terms & Conditions'}
                        </label>
                        <TextAreaField
                            id="legal-terms"
                            value={legal.termsAndConditions || ''}
                            onChange={e =>
                                setLegalField(
                                    'termsAndConditions',
                                    e.target.value,
                                )
                            }
                            placeholder={
                                t('legalTermsPlaceholder') ||
                                'Enter terms and conditions here...'
                            }
                            error={Boolean(getError('termsAndConditions'))}
                            className="w-full resize-none overflow-y-auto min-h-[200px] max-h-[400px]"
                        />
                        <InputError
                            id="legal-terms-error"
                            messages={getError('termsAndConditions')}
                        />
                    </LabelInputContainer>
                </div>
            )}
        </section>
    )
}
