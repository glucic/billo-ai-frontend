'use client'

import React, { useState, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TooltipProps {
    content: ReactNode
    className?: string
    children?: ReactNode
}

export function Tooltip({ content, children, className }: TooltipProps) {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const tooltipRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    ) => {
        const { clientX, clientY } = e
        const tooltipWidth = tooltipRef.current?.offsetWidth ?? 200
        const tooltipHeight = tooltipRef.current?.offsetHeight ?? 40
        const padding = 10

        let top = clientY + padding
        let left = clientX - tooltipWidth / 2

        if (left + tooltipWidth > window.innerWidth - padding) {
            left = window.innerWidth - tooltipWidth - padding
        }
        if (left < padding) {
            left = padding
        }
        if (top + tooltipHeight > window.innerHeight - padding) {
            top = clientY - tooltipHeight - padding
        }

        setPosition({ top, left })
        setVisible(true)
    }

    return (
        <>
            <span
                className={cn('relative inline-flex cursor-pointer', className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setVisible(false)}>
                {children ?? (
                    <Info className="w-4 h-4 text-[var(--text-muted)]" />
                )}
            </span>

            {visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={cn(
                            'fixed z-50 max-w-xs p-2 text-sm text-white bg-[var(--text-accent)] rounded shadow-lg pointer-events-none whitespace-pre-line',
                            className,
                        )}
                        style={{ top: position.top, left: position.left }}>
                        {content}
                    </div>,
                    document.body,
                )}
        </>
    )
}
