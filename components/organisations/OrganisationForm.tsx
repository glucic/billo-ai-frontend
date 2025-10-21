'use client'

import { useTranslations } from 'next-intl'
import { Button, StatefulButton } from '@/components/ui'
import { useOrganisationFormLayout } from '@/hooks/useOrganisationFormLayout'
import { CompanyNameSection } from '@/components/organisations/form-sections/CompanyNameSection'
import { CompanyDetailsSection } from '@/components/organisations/form-sections/CompanyDetailsSection'
import { CompanyAboutSection } from '@/components/organisations/form-sections/CompanyAboutSection'

interface OrganisationFormProps {
    form: Record<string, any>
    fieldErrors: Partial<Record<string, string[]>>
    saving: boolean
    loading?: boolean
    mode: 'create' | 'edit'
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    handleSave: (id?: number) => Promise<{ success: boolean }>
    handleDelete?: (id: number) => Promise<void>
    id?: number
    onSuccessRedirect?: () => void
}

export function OrganisationForm({
    form,
    fieldErrors,
    saving,
    loading = false,
    mode,
    handleChange,
    handleSave,
    handleDelete,
    id,
    onSuccessRedirect,
}: OrganisationFormProps) {
    const t = useTranslations('Organisation')
    const { success, error, handleSubmit } = useOrganisationFormLayout({
        mode,
        saveOrganisation: () => handleSave(id),
        onSuccessRedirect,
    })

    if (loading) {
        return (
            <main className="flex h-screen items-center justify-center">
                <p className="text-gray-400">{t('loading')}</p>
            </main>
        )
    }

    return (
        <main className="flex flex-col h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <form
                onSubmit={handleSubmit}
                className="relative overflow-y-auto p-8 bg-[var(--secondary-background)] border border-[var(--input-border)] rounded-lg shadow-sm space-y-8">
                <CompanyNameSection
                    form={form}
                    handleChange={handleChange}
                    fieldErrors={fieldErrors}
                />

                <CompanyDetailsSection
                    form={form}
                    handleChange={handleChange}
                    fieldErrors={fieldErrors}
                />

                <CompanyAboutSection
                    form={form}
                    handleChange={handleChange}
                    fieldErrors={fieldErrors}
                />

                {error && (
                    <div className="text-[var(--error)] text-sm mb-2 text-right">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-[var(--success)] text-sm mb-2 text-right">
                        {mode === 'edit'
                            ? t('updateSuccess')
                            : t('saveSuccess')}
                    </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t border-[var(--input-border)] sticky bottom-0 bg-[var(--secondary-background)]">
                    <Button variant="ghost" href="/organisations">
                        {t('cancel')}
                    </Button>

                    <div className="flex gap-4">
                        {mode === 'edit' && handleDelete && id && (
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={() => handleDelete(id)}>
                                {t('delete')}
                            </Button>
                        )}
                        <StatefulButton
                            type="submit"
                            className="rounded-none"
                            loading={saving}>
                            {mode === 'edit' ? t('save') : t('create')}
                        </StatefulButton>
                    </div>
                </div>
            </form>
        </main>
    )
}
