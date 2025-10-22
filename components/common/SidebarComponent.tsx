'use client'
import React, { useState } from 'react'
import {
    IconDashboard,
    IconReceipt,
    IconUsers,
    IconLogout,
    IconSettings,
    IconBell,
    IconHelpCircle,
    IconBuildingSkyscraper,
    IconChevronDown,
    IconMenu2,
    IconX,
    IconLayoutNavbarExpand,
    IconLayoutSidebarRightExpand,
    IconLayoutSidebarLeftExpand,
    IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useAuthContext } from '@/context/AuthProvider'
import ThemeToggle from '@/components/common/ThemeToggle'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'

type SidebarLinkType = {
    label: string
    href?: string
    icon: React.ReactNode
    children?: SidebarLinkType[]
}

export function SidebarComponent() {
    const { user } = useAuthContext()
    const t = useTranslations('Sidebar')
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [collapsed, setCollapsed] = useState(false)

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label)
    }

    const links: SidebarLinkType[] = [
        {
            label: t('dashboard'),
            href: '/dashboard',
            icon: <IconDashboard className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('invoices'),
            icon: <IconReceipt className="h-5 w-5 shrink-0" />,
            children: [
                {
                    label: t('invoicesOverview'),
                    href: '/invoices',
                    icon: <IconReceipt className="h-5 w-5 shrink-0" />,
                },
                {
                    label: t('invoicesCreate'),
                    href: '/invoices/create',
                    icon: <IconReceipt className="h-5 w-5 shrink-0" />,
                },
            ],
        },
        {
            label: t('clients'),
            href: '/clients',
            icon: <IconUsers className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('organisations'),
            href: '/organisations',
            icon: <IconBuildingSkyscraper className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('settings'),
            href: '/settings',
            icon: <IconSettings className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('notifications'),
            href: '/notifications',
            icon: <IconBell className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('help'),
            href: '/help',
            icon: <IconHelpCircle className="h-5 w-5 shrink-0" />,
        },
        {
            label: t('logout'),
            href: '/logout',
            icon: <IconLogout className="h-5 w-5 shrink-0" />,
        },
    ]

    return (
        <motion.div
            animate={{
                width: collapsed ? 80 : 260,
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
            }}
            className="h-screen border-r border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex flex-col shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-300 dark:border-neutral-700">
                <motion.h1
                    initial={false}
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`text-lg font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap overflow-hidden ${
                        collapsed ? 'hidden' : 'block'
                    }`}>
                    BilloAI
                </motion.h1>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
                    {collapsed ? (
                        <IconLayoutSidebarLeftExpand className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                    ) : (
                        <IconLayoutSidebarRightCollapse className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto mt-3 flex flex-col">
                {links.map((link, idx) => (
                    <div key={idx} className="relative">
                        {link.children ? (
                            <>
                                <button
                                    onClick={() => toggleDropdown(link.label)}
                                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                                    {link.icon}
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -5 }}
                                                transition={{ duration: 0.15 }}
                                                className="flex-1 text-left">
                                                {link.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    {!collapsed && (
                                        <IconChevronDown
                                            className={`h-4 w-4 transition-transform ${
                                                openDropdown === link.label
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {openDropdown === link.label &&
                                        !collapsed && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-10 flex flex-col overflow-hidden">
                                                {link.children.map(
                                                    (child, childIdx) => (
                                                        <Link
                                                            key={childIdx}
                                                            href={
                                                                child.href ||
                                                                '#'
                                                            }
                                                            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-all">
                                                            {child.icon}
                                                            <span>
                                                                {child.label}
                                                            </span>
                                                        </Link>
                                                    ),
                                                )}
                                            </motion.div>
                                        )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <Link
                                href={link.href || '#'}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                                {link.icon}
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -5 }}
                                            transition={{ duration: 0.15 }}>
                                            {link.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-300 dark:border-neutral-700 p-4 flex flex-col gap-3">
                <Link
                    href={`/settings/profile/${user?.id}`}
                    className="flex items-center gap-3">
                    <img
                        src="https://assets.aceternity.com/manu.png"
                        className="h-8 w-8 rounded-full"
                        alt="Avatar"
                    />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm text-neutral-700 dark:text-neutral-200">
                                {user?.first_name} {user?.last_name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
                <AnimatePresence>
                    {!collapsed && <ThemeToggle />}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
