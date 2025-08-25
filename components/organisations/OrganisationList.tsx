import { Organisation } from '@/hooks/useOrganisations'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { OrganisationLogo } from './OrganisationLogo'

interface OrganisationListProps {
    organisations: Organisation[]
    onSelect: (org: Organisation) => void
    onLeave: (orgId: number) => void
}

export function OrganisationList({
    organisations,
    onSelect,
    onLeave,
}: OrganisationListProps) {
    const t = useTranslations('organisation')

    return (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {organisations.map(org => (
                <li
                    key={org.id}
                    className={cn(
                        'relative group rounded-lg border shadow-sm',
                        'bg-white dark:bg-zinc-900',
                        'border-gray-200 dark:border-gray-800',
                        'transition-all duration-200',
                        'hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50',
                    )}>
                    <div
                        className="p-6 cursor-pointer"
                        onClick={() => onSelect(org)}>
                        <div className="flex items-start gap-4 mb-4">
                            <OrganisationLogo name={org.name} size="lg" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between w-full">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            {org.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {org.email}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                        <span className="text-sm text-blue-700 dark:text-blue-300">
                                            {t('fields.members')}:{' '}
                                            {org.users?.length || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-3">
                                    {org.address && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            📍 {org.address}
                                        </p>
                                    )}
                                    {org.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                            {org.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
