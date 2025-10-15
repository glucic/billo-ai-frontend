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

type IssuerData = {
    id: number
    name: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    email: string
}

interface IssuerSectionProps {
    organisations: Array<{
        id: number
        name: string
        [key: string]: any
    }>
    issuerId: number | null
    setIssuerId: (id: number | null) => void
    issuer: IssuerData
    setIssuerField: (field: keyof IssuerData, value: string) => void
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
    const [open, setOpen] = React.useState(true)

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
                                {
                                    label: t('selectIssuer'),
                                    value: '',
                                },
                                ...organisations.map((org: any) => ({
                                    label: org.name,
                                    value: org.id,
                                })),
                            ]}
                        />
                    </LabelInputContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelInputContainer>
                            <Label htmlFor="issuer-name">{orgT('name')}</Label>
                            <InputField
                                required
                                id="issuer-name"
                                placeholder={orgT('name')}
                                value={issuer.name}
                                onChange={e =>
                                    setIssuerField('name', e.target.value)
                                }
                                aria-label={orgT('name')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-email">
                                {orgT('email')}
                            </Label>
                            <InputField
                                type="email"
                                id="issuer-email"
                                placeholder={orgT('email')}
                                value={issuer.email}
                                onChange={e =>
                                    setIssuerField('email', e.target.value)
                                }
                                aria-label={orgT('email')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-phone">
                                {orgT('phone')}
                            </Label>
                            <InputField
                                type="tel"
                                id="issuer-phone"
                                placeholder={orgT('phone')}
                                value={issuer.phone}
                                onChange={e =>
                                    setIssuerField('phone', e.target.value)
                                }
                                aria-label={orgT('phone')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-address">
                                {orgT('address')}
                            </Label>
                            <InputField
                                required
                                id="issuer-address"
                                placeholder={orgT('address')}
                                value={issuer.address}
                                onChange={e =>
                                    setIssuerField('address', e.target.value)
                                }
                                aria-label={orgT('address')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-city">{orgT('city')}</Label>
                            <InputField
                                required
                                id="issuer-city"
                                placeholder={orgT('city')}
                                value={issuer.city}
                                onChange={e =>
                                    setIssuerField('city', e.target.value)
                                }
                                aria-label={orgT('city')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-state">
                                {orgT('state')}
                            </Label>
                            <InputField
                                required
                                id="issuer-state"
                                placeholder={orgT('state')}
                                value={issuer.state}
                                onChange={e =>
                                    setIssuerField('state', e.target.value)
                                }
                                aria-label={orgT('state')}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="issuer-zip">{orgT('zip')}</Label>
                            <InputField
                                required
                                id="issuer-zip"
                                placeholder={orgT('zip')}
                                value={issuer.zip}
                                onChange={e =>
                                    setIssuerField('zip', e.target.value)
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
