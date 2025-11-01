'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
    Label,
    LabelInputContainer,
    InputField,
    Button,
    ChevronDownIcon,
} from '@/components/ui'
import { BankDetails } from '@/types/Invoice'
import { BackendErrors } from '@/lib/errorUtils'

interface BankDetailsSectionProps {
    bankDetails: BankDetails
    setBankDetailsField: (field: keyof BankDetails, value: string) => void
    errors?: BackendErrors
}

export default function BankDetailsSection({
    bankDetails,
    setBankDetailsField,
    errors,
}: BankDetailsSectionProps) {
    const t = useTranslations('Invoices.BankDetails')
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
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>
            {open && (
                <div
                    id="bank-details-fields"
                    className="grid grid-cols-1 md:grid-cols-2 mt-4 pl-4 gap-5">
                    <LabelInputContainer>
                        <Label htmlFor="accountHolder">
                            {t('accountHolder')}
                        </Label>
                        <InputField
                            id="accountHolder"
                            value={bankDetails.accountHolder}
                            onChange={e =>
                                setBankDetailsField(
                                    'accountHolder',
                                    e.target.value,
                                )
                            }
                            placeholder={t('accountHolderPlaceholder')}
                            errorMessages={errors?.accountHolder}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="bankName">{t('bankName')}</Label>
                        <InputField
                            id="bankName"
                            value={bankDetails.bankName}
                            onChange={e =>
                                setBankDetailsField('bankName', e.target.value)
                            }
                            placeholder={t('bankNamePlaceholder')}
                            errorMessages={errors?.bankName}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="iban">{t('iban')}</Label>
                        <InputField
                            id="iban"
                            value={bankDetails.iban}
                            onChange={e =>
                                setBankDetailsField('iban', e.target.value)
                            }
                            placeholder={t('ibanPlaceholder')}
                            errorMessages={errors?.iban}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="bic">{t('bic')}</Label>
                        <InputField
                            id="bic"
                            value={bankDetails.bic}
                            onChange={e =>
                                setBankDetailsField('bic', e.target.value)
                            }
                            placeholder={t('bicPlaceholder')}
                            errorMessages={errors?.bic}
                        />
                    </LabelInputContainer>
                </div>
            )}
        </section>
    )
}
