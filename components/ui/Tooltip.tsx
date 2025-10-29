'use client'

import React, { useState, ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TooltipProps {
    content: ReactNode
    className?: string
    children?: ReactNode
}

export function Tooltip({ content, children, className }: TooltipProps) {
    const [visible, setVisible] = useState(false)

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}>
            <span
                className={cn(
                    'cursor-pointer flex items-center justify-center',
                    className,
                )}>
                {children ?? (
                    <Info className="w-4 h-4 text-[var(--text-muted)]" />
                )}
            </span>

            {visible && (
                <div className="absolute z-50 w-64 p-2 text-sm text-white bg-[var(--text-accent)] rounded shadow-lg top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-normal pointer-events-none">
                    {content}
                </div>
            )}
        </div>
    )
}
