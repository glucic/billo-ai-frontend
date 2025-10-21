'use client'

import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    ChevronDownIcon,
    Button,
    InputError,
} from '@/components/ui'
import React from 'react'
import { Organisation } from '@/types/Organisation'
import { Client } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface ClientSectionProps {
    organisations: Organisation[]
    clientId: number | null
    setClientId: (id: number | null) => void
    client: Client
    setClientField: (field: keyof Client, value: string) => void
    errors?: BackendErrors
}

export default function ClientSection({
    client,
    setClientField,
    errors,
}: ClientSectionProps) {
    const t = useTranslations('Invoices.ClientDetails')
    const orgT = useTranslations('Organisation.fields')
    const [open, setOpen] = React.useState(true)

    const getError = (key: keyof Client): string[] | undefined =>
        errors?.[`client.${key}`] ?? errors?.[key]

    const contactFields: { key: keyof Client; required?: boolean }[] = [
        { key: 'name', required: true },
        { key: 'email', required: false },
        { key: 'phone', required: false },
    ]

    const addressFields: { key: keyof Client; required?: boolean }[] = [
        { key: 'street', required: false },
        { key: 'zip', required: false },
        { key: 'city', required: false },
        { key: 'region', required: false },
    ]

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
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div
                    id="client-fields"
                    className="grid grid-cols-1 gap-6 mt-4 pl-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contactFields.map(({ key, required }) => (
                            <LabelInputContainer key={key}>
                                <Label
                                    htmlFor={`client-${key}`}
                                    required={required}>
                                    {orgT(key)}
                                </Label>
                                <InputField
                                    id={`client-${key}`}
                                    placeholder={orgT(key)}
                                    value={client[key] ?? ''}
                                    onChange={e =>
                                        setClientField(key, e.target.value)
                                    }
                                    aria-label={orgT(key)}
                                    error={Boolean(getError(key))}
                                    aria-describedby={
                                        getError(key)
                                            ? `client-${key}-error`
                                            : undefined
                                    }
                                />
                                <InputError
                                    id={`client-${key}-error`}
                                    messages={getError(key)}
                                />
                            </LabelInputContainer>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addressFields.map(({ key, required }) => (
                            <LabelInputContainer key={key}>
                                <Label
                                    htmlFor={`client-${key}`}
                                    required={required}>
                                    {orgT(key)}
                                </Label>
                                <InputField
                                    id={`client-${key}`}
                                    placeholder={orgT(key)}
                                    value={client[key] ?? ''}
                                    onChange={e =>
                                        setClientField(key, e.target.value)
                                    }
                                    aria-label={orgT(key)}
                                    error={Boolean(getError(key))}
                                    aria-describedby={
                                        getError(key)
                                            ? `client-${key}-error`
                                            : undefined
                                    }
                                />
                                <InputError
                                    id={`client-${key}-error`}
                                    messages={getError(key)}
                                />
                            </LabelInputContainer>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
