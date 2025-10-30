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
    IconLayoutSidebarLeftExpand,
    IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useAuthContext } from '@/context/AuthProvider'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { DefaultAvatar } from './DefaultAvatar'

type SidebarLinkType = {
    label: string
    href?: string
    icon: React.ReactNode
    children?: SidebarLinkType[]
}

export function SidebarComponent() {
    const { user } = useAuthContext()
    const t = useTranslations('Sidebar')
    const pathname = usePathname()
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
            href: '/invoices',

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

            children: [
                {
                    label: t('organisationsOverview'),
                    href: '/organisations',
                    icon: (
                        <IconBuildingSkyscraper className="h-5 w-5 shrink-0" />
                    ),
                },
                {
                    label: t('organisationsCreate'),
                    href: '/getting-started',
                    icon: (
                        <IconBuildingSkyscraper className="h-5 w-5 shrink-0" />
                    ),
                },
            ],
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

    const isActive = (href?: string) => {
        return href && pathname?.startsWith(href)
    }

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 260 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="h-screen flex flex-col"
            style={{
                background: 'var(--secondary-background)',
                borderRight: '1px solid var(--divider)',
                boxShadow: 'var(--shadow-md)',
            }}>
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                    borderBottom: '1px solid var(--divider)',
                }}>
                <motion.h1
                    initial={false}
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-semibold whitespace-nowrap overflow-hidden"
                    style={{
                        color: 'var(--text-heading)',
                        display: collapsed ? 'none' : 'block',
                    }}>
                    BilloAI
                </motion.h1>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-md"
                    style={{
                        background: 'transparent',
                        color: 'var(--text-heading)',
                    }}>
                    {collapsed ? (
                        <IconLayoutSidebarLeftExpand className="h-5 w-5" />
                    ) : (
                        <IconLayoutSidebarRightCollapse className="h-5 w-5" />
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
                                    className={`flex items-center w-full gap-3 px-4 py-2 text-sm rounded-md transition-colors`}
                                    style={{
                                        color: 'var(--text-heading)',
                                        background: isActive(link.href)
                                            ? 'var(--accent-glow)'
                                            : 'transparent',
                                    }}>
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
                                            style={{
                                                color: 'var(--text-muted)',
                                            }}
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
                                                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors`}
                                                            style={{
                                                                color: 'var(--text-heading)',
                                                                background:
                                                                    isActive(
                                                                        link.href,
                                                                    )
                                                                        ? 'var(--accent-glow)'
                                                                        : 'transparent',
                                                                borderLeft:
                                                                    isActive(
                                                                        link.href,
                                                                    )
                                                                        ? '3px solid var(--accent)'
                                                                        : '3px solid transparent',
                                                            }}
                                                            onMouseEnter={e =>
                                                                (e.currentTarget.style.background =
                                                                    isActive(
                                                                        link.href,
                                                                    )
                                                                        ? 'var(--accent-glow)'
                                                                        : 'rgba(59, 130, 246, 0.05)')
                                                            }
                                                            onMouseLeave={e =>
                                                                (e.currentTarget.style.background =
                                                                    isActive(
                                                                        link.href,
                                                                    )
                                                                        ? 'var(--accent-glow)'
                                                                        : 'transparent')
                                                            }>
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
                                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors`}
                                style={{
                                    color: 'var(--text-heading)',
                                    background: isActive(link.href)
                                        ? 'var(--accent-glow)'
                                        : 'transparent',
                                }}
                                onMouseEnter={e =>
                                    (e.currentTarget.style.background =
                                        'rgba(59, 130, 246, 0.05)')
                                }
                                onMouseLeave={e =>
                                    (e.currentTarget.style.background =
                                        isActive(link.href)
                                            ? 'var(--accent-glow)'
                                            : 'transparent')
                                }>
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
            <div
                className="p-4 flex flex-col gap-3"
                style={{
                    borderTop: '1px solid var(--divider)',
                }}>
                <Link
                    href={`/settings/profile/${user?.id}`}
                    className="flex items-center gap-3">
                    <DefaultAvatar
                        name={`${user?.first_name} ${user?.last_name}`}
                        size="sm"
                    />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ color: 'var(--text-heading)' }}>
                                {user?.first_name} {user?.last_name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>
        </motion.div>
    )
}
