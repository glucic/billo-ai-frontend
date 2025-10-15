'use client'

import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    SelectField,
    ChevronDownIcon,
    Button,
} from '@/components/ui'
import React from 'react'
import { Organisation } from '@/types/Organisation'
import { Issuer } from '@/types/invoice'

interface IssuerSectionProps {
    organisations: Organisation[]
    issuerId: number | null
    setIssuerId: (id: number | null) => void
    issuer: Issuer
    setIssuerField: (field: keyof Issuer, value: string) => void
}

export default function IssuerSection({
    organisations,
    issuerId,
    setIssuerId,
    issuer,
    setIssuerField,
}: IssuerSectionProps) {
    const t = useTranslations('Invoices.Create.IssuerDetails')
    const orgT = useTranslations('Organisation.fields')
    const [open, setOpen] = React.useState<boolean>(true)

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="issuer-fields"
                onClick={() => setOpen((v: boolean) => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <span
                    className={`transition-transform ${open ? '' : '-rotate-90'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </span>
            </Button>

            {open && (
                <div id="issuer-fields" className="grid grid-cols-1 gap-4 mt-4">
                    <LabelInputContainer>
                        <Label htmlFor="issuer-org">{t('selectIssuer')}</Label>
                        <SelectField
                            className="mb-4"
                            placeholder={t('selectIssuer')}
                            value={issuerId ?? ''}
                            onChange={value =>
                                setIssuerId(Number(value) || null)
                            }
                            options={[
                                { label: t('selectIssuer'), value: '' },
                                ...organisations.map(org => ({
                                    label: org.name,
                                    value: org.id,
                                })),
                            ]}
                        />
                    </LabelInputContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'name',
                            'email',
                            'phone',
                            'address',
                            'city',
                            'state',
                            'zip',
                        ].map(field => (
                            <LabelInputContainer key={field}>
                                <Label htmlFor={`issuer-${field}`}>
                                    {orgT(field)}
                                </Label>
                                <InputField
                                    required={
                                        field !== 'phone' && field !== 'email'
                                    }
                                    id={`issuer-${field}`}
                                    placeholder={orgT(field)}
                                    value={issuer[field as keyof Issuer] ?? ''}
                                    onChange={e =>
                                        setIssuerField(
                                            field as keyof Issuer,
                                            e.target.value,
                                        )
                                    }
                                    aria-label={orgT(field)}
                                />
                            </LabelInputContainer>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
