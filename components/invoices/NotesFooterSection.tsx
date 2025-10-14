import { useTranslations } from 'next-intl'
import LabelInputContainer from '../ui/LabelInputContainer'
import { Label } from '../ui/Label'
import { TextAreaField } from '../ui/TextArea'

export default function NotesFooterSection({
    notes,
    setNotes,
    footer,
    setFooter,
}: any) {
    const t = useTranslations('Invoices.Create')
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('notesAndFooter')}</h2>
            <LabelInputContainer>
                <Label htmlFor="notes">{t('notes')}</Label>
                <TextAreaField
                    id="notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    aria-label={t('notes')}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="footer">{t('footer')}</Label>
                <TextAreaField
                    id="footer"
                    value={footer}
                    onChange={e => setFooter(e.target.value)}
                    aria-label={t('footer')}
                />
            </LabelInputContainer>
        </section>
    )
}
