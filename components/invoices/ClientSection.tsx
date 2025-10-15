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

type ClientData = {
    name: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    email: string
}

interface ClientSectionProps {
    organisations: Array<{
        id: number
        name: string
        [key: string]: any
    }>
    clientId: number | null
    setClientId: (id: number | null) => void
    client: ClientData
    setClientField: (field: keyof ClientData, value: string) => void
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
                            <Label htmlFor="client-address">
                                {orgT('address')}
                            </Label>
                            <InputField
                                required
                                id="client-address"
                                placeholder={orgT('address')}
                                value={client.address}
                                onChange={e =>
                                    setClientField('address', e.target.value)
                                }
                                aria-label={orgT('address')}
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
                            <Label htmlFor="client-state">
                                {orgT('state')}
                            </Label>
                            <InputField
                                required
                                id="client-state"
                                placeholder={orgT('state')}
                                value={client.state}
                                onChange={e =>
                                    setClientField('state', e.target.value)
                                }
                                aria-label={orgT('state')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="client-zip">{orgT('zip')}</Label>
                            <InputField
                                required
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
