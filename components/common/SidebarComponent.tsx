'use client'
import React from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui'
import {
    IconDashboard,
    IconReceipt,
    IconUsers,
    IconLogout,
    IconSettings,
    IconBell,
    IconHelpCircle,
    IconBuildingSkyscraper,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useAuthContext } from '@/context/AuthProvider'

export function SidebarComponent() {
    const { user } = useAuthContext()
    const t = useTranslations('Sidebar')
    const links = [
        {
            label: t('dashboard'),
            href: '/dashboard',
            icon: (
                <IconDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('invoices'),
            href: '/invoices',
            icon: (
                <IconReceipt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('clients'),
            href: '/clients',
            icon: (
                <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('organisations', { defaultValue: 'Organisations' }),
            href: '/organisations',
            icon: (
                <IconBuildingSkyscraper className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('settings'),
            href: '/settings',
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('notifications'),
            href: '/notifications',
            icon: (
                <IconBell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('help'),
            href: '/help',
            icon: (
                <IconHelpCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: t('logout'),
            href: '/logout',
            icon: (
                <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ]

    return (
        <div className="h-full border-r border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: user.first_name + ' ' + user.last_name,
                                href: '/settings/profile/' + user.id,
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    )
}
