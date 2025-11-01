import { Button, StatefulButton } from '@/components/ui'
import { useTranslations } from 'next-intl'

interface InvoiceFormFooterProps {
    error: boolean
    success: boolean
    mode: 'create' | 'edit'
    saving: boolean
}

export function InvoiceFormFooter({
    error,
    success,
    mode,
    saving,
}: InvoiceFormFooterProps) {
    const t = useTranslations('Invoices')

    return (
        <section className="sticky bottom-0 left-0 w-full bg-[var(--background)] border-t border-[var(--accent)] py-4 px-6 flex flex-col md:flex-row md:justify-between items-center gap-3 md:gap-0 shadow-md overflow-visible">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                {error && (
                    <div className="bg-[var(--error)]/10 text-[var(--error)] px-3 py-1 rounded-md text-sm font-medium cursor-help">
                        {t('errors.saveFailed')}
                    </div>
                )}
                {success && (
                    <div className="bg-[var(--success)]/10 text-[var(--success)] px-3 py-1 rounded-md text-sm font-medium">
                        {mode === 'edit'
                            ? t('updateSuccess') ||
                              'Invoice updated successfully!'
                            : t('saveSuccess') || 'Invoice saved successfully!'}
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    href="/invoices"
                    className="hover:bg-transparent">
                    {t('cancel')}
                </Button>
                <StatefulButton type="submit" loading={saving}>
                    {mode === 'edit' ? t('update') : t('save')}
                </StatefulButton>
            </div>
        </section>
    )
}
