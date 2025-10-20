'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

interface CurrencyInputProps {
    value: number
    onChange: (value: number) => void
    currency: string
    placeholder?: string
    position?: 'prefix' | 'suffix'
    readOnly?: boolean
    error?: boolean
    className?: string
}

const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CHF: 'CHF',
}

export default function CurrencyInput({
    value,
    onChange,
    currency,
    placeholder,
    position = 'suffix',
    readOnly = false,
    error = false,
    className,
}: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState('')
    const symbol = currencySymbols[currency] || currency

    const radius = 0
    const [visible, setVisible] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        if (typeof value === 'number' && !isNaN(value)) {
            setDisplayValue(
                new Intl.NumberFormat('de-DE', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(value),
            )
        } else {
            setDisplayValue('')
        }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[^\d.,-]/g, '')
        const normalized = parseFloat(input.replace(',', '.'))
        setDisplayValue(input)
        if (!isNaN(normalized)) onChange(normalized)
    }

    const handleMouseMove = ({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                      ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
                      var(--color-accent-light),
                      transparent 90%
                    )
                `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="group/input rounded-[var(--input-radius)] p-[2px] transition-all duration-300 relative w-full">
            {/* ───── Currency Symbol (prefix) ───── */}
            {position === 'prefix' && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 select-none">
                    {symbol}
                </span>
            )}

            {/* ───── Input Field ───── */}
            <input
                type="text"
                inputMode="decimal"
                readOnly={readOnly}
                placeholder={placeholder}
                value={displayValue}
                onChange={handleChange}
                className={cn(
                    `flex h-[var(--input-height)] w-full
                    rounded-[var(--input-radius)]
                    border
                    bg-[var(--input-bg)]/70
                    backdrop-blur-[var(--input-blur)]
                    px-[var(--input-padding-x)] py-[var(--input-padding-y)]
                    text-sm text-[var(--input-text)]
                    placeholder:text-[var(--input-placeholder)]
                    shadow-[var(--input-shadow)]
                    transition-all duration-300
                    hover:bg-[var(--accent-glow)]
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)]
                    focus-visible:ring-offset-1
                    focus-visible:ring-offset-[var(--color-background)]
                    focus-visible:outline-none
                    disabled:cursor-not-allowed disabled:opacity-50`,
                    error
                        ? 'border-[var(--error)] focus-visible:ring-[var(--error)] focus-visible:ring-offset-[var(--error)]/50 hover:bg-[var(--error)]/10'
                        : 'border-[var(--input-border)]',
                    position === 'prefix' ? 'pl-8 pr-3' : 'pr-8 pl-3',
                    'text-right md:text-left',
                    className,
                )}
            />

            {position === 'suffix' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 select-none">
                    {symbol}
                </span>
            )}
        </motion.div>
    )
}
