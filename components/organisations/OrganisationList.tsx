'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { DefaultAvatar } from '../common/DefaultAvatar'
import { Organisation } from '@/types/Organisation'

interface OrganisationListProps {
    organisations: Organisation[]
    onLeave: (orgId: number) => void
}

export function OrganisationList({ organisations }: OrganisationListProps) {
    const t = useTranslations('Organisation')

    if (!organisations?.length) {
        return (
            <p className="text-[var(--input-placeholder)] text-sm">
                {t('errors.loadFailed', {
                    defaultValue: t('notFound'),
                })}
            </p>
        )
    }

    return (
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {organisations.map(org => (
                <li
                    key={org.id}
                    className={cn(
                        'relative group rounded-[var(--radius-lg)] border transition-all duration-300',
                        'bg-[var(--secondary-background)] border-[var(--input-border)] shadow-[var(--shadow-input)]',
                        'hover:border-[var(--color-accent)] hover:shadow-[0_0_12px_var(--accent-glow)]',
                    )}>
                    <Link
                        href={`/organisations/${org.id}`}
                        className="block p-6 rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
                        <div className="flex items-start gap-4 mb-4">
                            <DefaultAvatar name={org.name} size="lg" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between w-full">
                                    <div>
                                        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1">
                                            {org.name}
                                        </h3>
                                        {org.email && (
                                            <p className="text-sm text-[var(--input-placeholder)]">
                                                {org.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-[var(--accent-glow)]">
                                        <span className="text-sm text-[var(--color-accent-light)]">
                                            {t('fields.members')}:{' '}
                                            {org.users?.length || 0}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-3">
                                    {org.street && (
                                        <p className="text-sm text-[var(--input-text)]">
                                            📍 {org.street}
                                        </p>
                                    )}
                                    {org.description && (
                                        <p className="text-sm text-[var(--input-placeholder)] line-clamp-2">
                                            {org.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
                </li>
            ))}
        </ul>
    )
}
