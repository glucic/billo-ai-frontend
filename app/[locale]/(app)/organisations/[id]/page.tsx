'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOrganisations } from '@/hooks/useOrganisations'
import {
    Button,
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
    TextAreaField,
} from '@/components/ui'
import { useTranslations } from 'next-intl'

export default function OrganisationDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const t = useTranslations('Organisation')
    const {
        form,
        saving,
        deleting,
        error,
        fetchOrganisationById,
        handleChange,
        handleSave,
        handleDelete,
    } = useOrganisations()

    useEffect(() => {
        if (id) fetchOrganisationById(id as string)
    }, [id, fetchOrganisationById])

    if (!form) return null

    return (
        <main className="flex flex-col h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <h2 className="text-2xl font-bold">
                {t('edit')} — {form.name}
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
                            />
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
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="email">{t('fields.email')}</Label>
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                value={form.email || ''}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="phone">{t('fields.phone')}</Label>
                            <InputField
                                id="phone"
                                name="phone"
                                value={form.phone || ''}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-medium mb-4 text-[var(--input-text)]">
                        {t('addressInfo')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LabelInputContainer>
                            <Label htmlFor="street">
                                {t('fields.address')}
                            </Label>
                            <InputField
                                id="street"
                                name="street"
                                value={form.street || ''}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="city">{t('fields.city')}</Label>
                            <InputField
                                id="city"
                                name="city"
                                value={form.city || ''}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="zip">{t('fields.zip')}</Label>
                            <InputField
                                id="zip"
                                name="zip"
                                value={form.zip || ''}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="region">{t('fields.state')}</Label>
                            <InputField
                                id="region"
                                name="region"
                                value={form.region || ''}
                                onChange={handleChange}
                            />
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
                            className="w-full rounded-md border border-[var(--input-border)] bg-[var(--input-bg)]/70 backdrop-blur-[var(--input-blur)] px-[var(--input-padding-x)] py-[var(--input-padding-y)] text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] shadow-[var(--input-shadow)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-background)] focus-visible:outline-none"
                        />
                    </LabelInputContainer>
                </section>

                <div className="flex justify-between items-center pt-6 border-t border-[var(--input-border)] sticky bottom-0 z-10">
                    <Button variant="ghost" href="/organisations">
                        {t('cancel')}
                    </Button>

                    <div className="flex gap-4">
                        <StatefulButton
                            loading={deleting}
                            onClick={() => handleDelete(Number(id))}
                            className="bg-red-500 hover:bg-red-600 text-white">
                            {t('delete')}
                        </StatefulButton>
                        <StatefulButton
                            loading={saving}
                            onClick={() => handleSave(Number(id))}>
                            {t('save')}
                        </StatefulButton>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 text-red-500 text-sm text-right">
                        {error}
                    </div>
                )}
            </div>
        </main>
    )
}
