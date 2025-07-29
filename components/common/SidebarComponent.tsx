'use client'
import React from 'react'
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from '@/components/ui'

interface SidebarLinkItem {
    label: string
    href: string
    icon: React.ReactNode
}

interface SidebarComponentProps {
    links: SidebarLinkItem[]
}

export function SidebarComponent({ links }: SidebarComponentProps) {
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
                                label: 'Manu Arora',
                                href: '#',
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
