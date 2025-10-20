'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOrganisations } from '@/hooks/useOrganisations'
import {
    Button,
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
    TextAreaField,
    InputError,
} from '@/components/ui'
import { useTranslations } from 'next-intl'

export default function OrganisationDetailPage() {
    const { id } = useParams()
    useRouter()
    const t = useTranslations('Organisation')
    const {
        form,
        saving,
        fieldErrors,
        fetchOrganisationById,
        handleChange,
        handleSave,
        handleDelete,
    } = useOrganisations()

    const [initialTitle, setInitialTitle] = useState<string>('')

    useEffect(() => {
        if (id) {
            fetchOrganisationById(id as string).then(() => {
                setInitialTitle(prev => form?.name || prev)
            })
        }
    }, [id])

    if (!form) return null

    return (
        <main className="flex flex-col h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <h2 className="text-2xl font-bold">
                {t('edit')} — {initialTitle || form.name}
            </h2>

            <div className="relative overflow-y-auto p-8 bg-[var(--secondary-background)] border border-[var(--input-border)] rounded-lg shadow-sm space-y-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <section>
                    <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                        {t('companyInfo')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LabelInputContainer>
                            <Label htmlFor="name">{t('fields.name')}</Label>
                            <InputField
                                id="name"
                                name="name"
                                value={form.name || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.name)}
                                aria-describedby={
                                    fieldErrors?.name ? 'name-error' : undefined
                                }
                            />
                            {fieldErrors?.name && (
                                <InputError
                                    id="name-error"
                                    messages={fieldErrors.name}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="employee_count">
                                {t('fields.employeeCount')}
                            </Label>
                            <InputField
                                id="employee_count"
                                name="employee_count"
                                type="number"
                                value={form.employee_count?.toString() || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.employee_count)}
                                aria-describedby={
                                    fieldErrors?.employee_count
                                        ? 'employee_count-error'
                                        : undefined
                                }
                            />
                            {fieldErrors?.employee_count && (
                                <InputError
                                    id="employee_count-error"
                                    messages={fieldErrors.employee_count}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="email">{t('fields.email')}</Label>
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                value={form.email || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.email)}
                                aria-describedby={
                                    fieldErrors?.email
                                        ? 'email-error'
                                        : undefined
                                }
                            />
                            {fieldErrors?.email && (
                                <InputError
                                    id="email-error"
                                    messages={fieldErrors.email}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="phone">{t('fields.phone')}</Label>
                            <InputField
                                id="phone"
                                name="phone"
                                value={form.phone || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.phone)}
                                aria-describedby={
                                    fieldErrors?.phone
                                        ? 'phone-error'
                                        : undefined
                                }
                            />
                            {fieldErrors?.phone && (
                                <InputError
                                    id="phone-error"
                                    messages={fieldErrors.phone}
                                />
                            )}
                        </LabelInputContainer>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                        {t('addressInfo')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LabelInputContainer>
                            <Label htmlFor="street">{t('fields.street')}</Label>
                            <InputField
                                id="street"
                                name="street"
                                value={form.street || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.street)}
                                aria-describedby={
                                    fieldErrors?.street
                                        ? 'street-error'
                                        : undefined
                                }
                            />
                            {fieldErrors?.street && (
                                <InputError
                                    id="street-error"
                                    messages={fieldErrors.street}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="city">{t('fields.city')}</Label>
                            <InputField
                                id="city"
                                name="city"
                                value={form.city || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.city)}
                                aria-describedby={
                                    fieldErrors?.city ? 'city-error' : undefined
                                }
                            />
                            {fieldErrors?.city && (
                                <InputError
                                    id="city-error"
                                    messages={fieldErrors.city}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="zip">{t('fields.zip')}</Label>
                            <InputField
                                id="zip"
                                name="zip"
                                value={form.zip || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.zip)}
                                aria-describedby={
                                    fieldErrors?.zip ? 'zip-error' : undefined
                                }
                            />
                            {fieldErrors?.zip && (
                                <InputError
                                    id="zip-error"
                                    messages={fieldErrors.zip}
                                />
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="region">{t('fields.region')}</Label>
                            <InputField
                                id="region"
                                name="region"
                                value={form.region || ''}
                                onChange={handleChange}
                                error={Boolean(fieldErrors?.region)}
                                aria-describedby={
                                    fieldErrors?.region
                                        ? 'region-error'
                                        : undefined
                                }
                            />
                            {fieldErrors?.region && (
                                <InputError
                                    id="region-error"
                                    messages={fieldErrors.region}
                                />
                            )}
                        </LabelInputContainer>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                        {t('fields.description')}
                    </h4>
                    <LabelInputContainer>
                        <TextAreaField
                            name="description"
                            value={form.description || ''}
                            onChange={handleChange}
                            rows={4}
                            error={Boolean(fieldErrors?.description)}
                            aria-describedby={
                                fieldErrors?.description
                                    ? 'description-error'
                                    : undefined
                            }
                        />
                        {fieldErrors?.description && (
                            <InputError
                                id="description-error"
                                messages={fieldErrors.description}
                            />
                        )}
                    </LabelInputContainer>
                </section>

                <div className="flex justify-between items-center pt-6 border-t border-[var(--input-border)] sticky bottom-0 z-10">
                    <Button variant="ghost" href="/organisations">
                        {t('cancel')}
                    </Button>

                    <div className="flex gap-4">
                        <Button
                            variant={'destructive'}
                            onClick={() => handleDelete(Number(id))}>
                            {t('delete')}
                        </Button>
                        <StatefulButton
                            className="rounded-none"
                            loading={saving}
                            onClick={() => handleSave(Number(id))}>
                            {t('save')}
                        </StatefulButton>
                    </div>
                </div>
            </div>
        </main>
    )
}
