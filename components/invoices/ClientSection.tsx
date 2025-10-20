'use client'

import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    Button,
} from '@/components/ui'
import React from 'react'
import { Organisation } from '@/types/Organisation'
import { Client } from '@/types/Invoice'

interface ClientSectionProps {
    organisations: Organisation[]
    clientId: number | null
    setClientId: (id: number | null) => void
    client: Client
    setClientField: (field: keyof Client, value: string) => void
}

export default function ClientSection({
    client,
    setClientField,
}: ClientSectionProps) {
    const t = useTranslations('Invoices.ClientDetails')
    const orgT = useTranslations('Organisation.fields')
    const [open, setOpen] = React.useState(true)

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:cursor-pointer hover:bg-transparent"
                aria-expanded={open}
                aria-controls="client-fields"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">{t('title')}</h2>
                <span
                    className={`transition-transform ${open ? '' : '-rotate-90'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </span>
            </Button>

            {open && (
                <div id="client-fields" className="grid grid-cols-1 gap-6 mt-4">
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['name', 'email', 'phone'].map(field => (
                            <LabelInputContainer key={field}>
                                <Label htmlFor={`client-${field}`}>
                                    {orgT(field)}
                                </Label>
                                <InputField
                                    required={field === 'name'}
                                    type={
                                        field === 'email'
                                            ? 'email'
                                            : field === 'phone'
                                              ? 'tel'
                                              : 'text'
                                    }
                                    id={`client-${field}`}
                                    placeholder={orgT(field)}
                                    value={client[field as keyof Client] ?? ''}
                                    onChange={e =>
                                        setClientField(
                                            field as keyof Client,
                                            e.target.value,
                                        )
                                    }
                                    aria-label={orgT(field)}
                                />
                            </LabelInputContainer>
                        ))}
                    </div>

                    {/* Address Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['street', 'zip', 'city', 'region'].map(field => (
                            <LabelInputContainer key={field}>
                                <Label htmlFor={`client-${field}`}>
                                    {orgT(field)}
                                </Label>
                                <InputField
                                    required={field !== 'region'}
                                    id={`client-${field}`}
                                    placeholder={orgT(field)}
                                    value={client[field as keyof Client] ?? ''}
                                    onChange={e =>
                                        setClientField(
                                            field as keyof Client,
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
