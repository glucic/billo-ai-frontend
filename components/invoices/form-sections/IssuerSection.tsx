'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    SelectField,
    ChevronDownIcon,
    Button,
    InputError,
} from '@/components/ui'
import LocationFields, {
    LocationValues,
} from '@/components/common/LocationFields'
import { Organisation } from '@/types/Organisation'
import { Issuer } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface IssuerSectionProps {
    organisations: Organisation[]
    setIssuerId: (id: number | null) => void
    issuer: Issuer
    setIssuerField: (field: keyof Issuer, value: string) => void
    errors?: BackendErrors
}

export default function IssuerSection({
    organisations,
    setIssuerId,
    issuer,
    setIssuerField,
    errors,
}: IssuerSectionProps) {
    const t = useTranslations('Invoices.IssuerDetails')
    const orgT = useTranslations('Organisation.fields')
    const [open, setOpen] = React.useState(true)

    const getError = (key: keyof Issuer): string[] | undefined =>
        errors?.[`issuer.${key}`] ?? errors?.[key]

    const handleFullAddressSelect = (address: {
        street: string
        zip: string
        city: string
        region: string
    }) => {
        if (address.street) setIssuerField('street', address.street)
        if (address.zip) setIssuerField('zip', address.zip)
        if (address.city) setIssuerField('city', address.city)
        if (address.region) setIssuerField('region', address.region)
    }

    const contactFields: { key: keyof Issuer; required?: boolean }[] = [
        { key: 'name', required: true },
        { key: 'email', required: true },
        { key: 'phone', required: false },
    ]

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="issuer-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div
                    id="issuer-fields"
                    className="grid grid-cols-1 gap-4 mt-4 pl-4">
                    <LabelInputContainer>
                        <Label htmlFor="issuer-org">{t('selectIssuer')}</Label>
                        <SelectField
                            placeholder={t('selectIssuer')}
                            value={issuer.id ?? ''}
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
                        {contactFields.map(({ key, required }) => (
                            <LabelInputContainer key={key}>
                                <Label
                                    htmlFor={`issuer-${key}`}
                                    required={required}>
                                    {orgT(key)}
                                </Label>
                                <InputField
                                    id={`issuer-${key}`}
                                    placeholder={orgT(key)}
                                    value={issuer[key] ?? ''}
                                    onChange={e =>
                                        setIssuerField(key, e.target.value)
                                    }
                                    error={Boolean(getError(key))}
                                    aria-describedby={
                                        getError(key)
                                            ? `issuer-${key}-error`
                                            : undefined
                                    }
                                />
                                <InputError
                                    id={`issuer-${key}-error`}
                                    messages={getError(key)}
                                />
                            </LabelInputContainer>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <LocationFields
                            values={{
                                street: issuer.street ?? '',
                                zip: issuer.zip ?? '',
                                city: issuer.city ?? '',
                                region: issuer.region ?? '',
                            }}
                            onChange={(field, value) =>
                                setIssuerField(field as keyof Issuer, value)
                            }
                            onFullAddressSelect={(address: LocationValues) =>
                                handleFullAddressSelect({
                                    street: address.street ?? '',
                                    zip: address.zip ?? '',
                                    city: address.city ?? '',
                                    region: address.region ?? '',
                                })
                            }
                            required={{ street: true, zip: true, city: true }}
                            placeholders={{
                                street: orgT('street'),
                                zip: orgT('zip'),
                                city: orgT('city'),
                                region: orgT('region'),
                            }}
                            errors={{
                                street: getError('street'),
                                zip: getError('zip'),
                                city: getError('city'),
                                region: getError('region'),
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
