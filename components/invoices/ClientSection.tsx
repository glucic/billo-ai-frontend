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
    const t = useTranslations('Invoices.Create.ClientDetails')
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
                <div id="client-fields" className="grid grid-cols-1 gap-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelInputContainer>
                            <Label htmlFor="client-name">{orgT('name')}</Label>
                            <InputField
                                required
                                id="client-name"
                                placeholder={orgT('name')}
                                value={client.name}
                                onChange={e =>
                                    setClientField('name', e.target.value)
                                }
                                aria-label={orgT('name')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-email">
                                {orgT('email')}
                            </Label>
                            <InputField
                                type="email"
                                id="client-email"
                                placeholder={orgT('email')}
                                value={client.email}
                                onChange={e =>
                                    setClientField('email', e.target.value)
                                }
                                aria-label={orgT('email')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-phone">
                                {orgT('phone')}
                            </Label>
                            <InputField
                                type="tel"
                                id="client-phone"
                                placeholder={orgT('phone')}
                                value={client.phone}
                                onChange={e =>
                                    setClientField('phone', e.target.value)
                                }
                                aria-label={orgT('phone')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-street">
                                {orgT('street')}
                            </Label>
                            <InputField
                                required
                                id="client-address"
                                placeholder={orgT('street')}
                                value={client.street}
                                onChange={e =>
                                    setClientField('street', e.target.value)
                                }
                                aria-label={orgT('street')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-city">{orgT('city')}</Label>
                            <InputField
                                required
                                id="client-city"
                                placeholder={orgT('city')}
                                value={client.city}
                                onChange={e =>
                                    setClientField('city', e.target.value)
                                }
                                aria-label={orgT('city')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-region">
                                {orgT('region')}
                            </Label>
                            <InputField
                                required
                                id="client-region"
                                placeholder={orgT('region')}
                                value={client.region}
                                onChange={e =>
                                    setClientField('region', e.target.value)
                                }
                                aria-label={orgT('region')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-zip">{orgT('zip')}</Label>
                            <InputField
                                required
                                placeholder={orgT('zip')}
                                id="client-zip"
                                value={client.zip}
                                onChange={e =>
                                    setClientField('zip', e.target.value)
                                }
                                aria-label={orgT('zip')}
                            />
                        </LabelInputContainer>
                    </div>
                </div>
            )}
        </section>
    )
}
