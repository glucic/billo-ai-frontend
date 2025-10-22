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
import { Footer } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface FooterSectionProps {
    footer: Footer
    setFooterField: (field: keyof Footer, value: string) => void
    errors?: BackendErrors
}

export default function FooterSection({
    footer,
    setFooterField,
    errors,
}: FooterSectionProps) {
    const t = useTranslations('Invoices.Footer')
    const [open, setOpen] = useState(true)

    const getError = (key: keyof Footer) =>
        errors?.[`footer.${key}`] ?? errors?.[key]

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="footer-section"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title') || 'Footer'}</h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div id="footer-section" className="mt-4 animate-fadeIn pl-4">
                    <LabelInputContainer>
                        <label
                            htmlFor="footer-notes"
                            className="block text-sm font-semibold text-[var(--text-heading)] mb-2">
                            {t('footerLabel') || 'Footer Text'}
                        </label>
                        <TextAreaField
                            id="footer-notes"
                            value={footer.notes ?? ''}
                            onChange={e =>
                                setFooterField('notes', e.target.value)
                            }
                            placeholder={
                                t('footerPlaceholder') ||
                                'Enter footer information here...'
                            }
                            error={Boolean(getError('notes'))}
                            className="w-full resize-none overflow-y-auto min-h-[100px] max-h-[300px]"
                        />
                        <InputError
                            id="footer-notes-error"
                            messages={getError('notes')}
                        />
                    </LabelInputContainer>
                </div>
            )}
        </section>
    )
}
