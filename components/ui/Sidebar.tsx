'use client'
import React, { useState, createContext, useContext } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Links {
    label: string
    href: string
    icon: React.ReactNode
}

interface SidebarContextProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context)
        throw new Error('useSidebar must be used within SidebarProvider')
    return context
}

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const SidebarBody = ({
    children,
    className,
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen } = useSidebar()
    return (
        <motion.div
            className={cn(
                'h-full flex flex-col bg-neutral-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700',
                className,
            )}
            animate={{ width: open ? '300px' : '60px' }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}>
            {children}
        </motion.div>
    )
}

export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links
    className?: string
}) => {
    const { open } = useSidebar()

    return (
        <a
            href={link.href}
            className={cn(
                'flex items-center justify-start gap-2 group/sidebar transition-all duration-200',
                open ? 'pl-5 pr-5 py-2' : 'pl-3 py-2',
            )}
            {...props}>
            {link.icon}

            <motion.span
                initial={false}
                animate={{
                    opacity: open ? 1 : 0,
                    maxWidth: open ? 150 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-nowrap overflow-hidden group-hover/sidebar:translate-x-1 transition-transform duration-150">
                {link.label}
            </motion.span>
        </a>
    )
}
