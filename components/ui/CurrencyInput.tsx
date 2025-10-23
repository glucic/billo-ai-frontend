'use client'

import React, { useState, useEffect } from 'react'
import { NumberField, Group, Input, Button, Label } from 'react-aria-components'
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CurrencyInputMode = 'currency' | 'percent'

interface CurrencyInputProps {
    label?: string
    value?: number
    onChange?: (value: number) => void
    currency?: string
    mode?: CurrencyInputMode
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    error?: boolean
    className?: string
    step?: number
    min?: number
    max?: number
}

export default function CurrencyInput({
    label,
    value = 0,
    onChange,
    currency = 'EUR',
    mode = 'currency',
    placeholder,
    readOnly = false,
    disabled = false,
    error = false,
    className,
    step,
    min,
    max,
}: CurrencyInputProps) {
    const [raw, setRaw] = useState<string>('')
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        if (!focused) {
            if (value !== undefined && value !== null) {
                const fmt =
                    mode === 'currency'
                        ? new Intl.NumberFormat('de-DE', {
                              style: 'currency',
                              currency,
                              minimumFractionDigits: 2,
                          }).format(value)
                        : `${value.toFixed(2)} %`
                setRaw(fmt)
            }
        }
    }, [value, focused, mode, currency])

    const parse = (s: string): number | null => {
        const normalized = s.replace(',', '.').replace(/[^\d.-]/g, '')
        const num = parseFloat(normalized)
        return isNaN(num) ? null : num
    }

    const commit = (text: string) => {
        const parsed = parse(text)
        if (parsed != null) {
            const clamped = Math.min(
                max ?? Infinity,
                Math.max(min ?? -Infinity, parsed),
            )
            onChange?.(parseFloat(clamped.toFixed(2)))
        } else {
            onChange?.(0)
        }
    }

    const increment = () => {
        const stepVal = step ?? (mode === 'percent' ? 0.1 : 0.5)
        onChange?.(parseFloat(((value ?? 0) + stepVal).toFixed(2)))
    }

    const decrement = () => {
        const stepVal = step ?? (mode === 'percent' ? 0.1 : 0.5)
        onChange?.(parseFloat(((value ?? 0) - stepVal).toFixed(2)))
    }

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <Label className="text-sm font-medium text-[var(--input-text)]">
                    {label}
                </Label>
            )}
            <Group
                className={cn(
                    `relative inline-flex h-[var(--input-height)] w-full items-center overflow-hidden
          rounded-[var(--input-radius)]
          border border-[var(--input-border)]
          bg-[var(--input-bg)]/70 backdrop-blur-[var(--input-blur)]
          text-sm text-[var(--input-text)]
          shadow-[var(--input-shadow)]
          transition-all duration-300
          focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-1 focus-within:ring-offset-[var(--color-background)]
          hover:bg-[var(--input-bg)]/100
          disabled:opacity-50 disabled:cursor-not-allowed`,
                    error &&
                        'border-[var(--error)] focus-within:ring-[var(--error)] hover:bg-[var(--error)]/10',
                    className,
                )}>
                <Input
                    inputMode="decimal"
                    value={raw}
                    onChange={e => setRaw(e.target.value)}
                    onFocus={() => {
                        setFocused(true)
                        setRaw(value?.toString() ?? '')
                    }}
                    onBlur={() => {
                        setFocused(false)
                        commit(raw)
                    }}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    className="flex-1 bg-transparent px-3 py-[6px] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] tabular-nums outline-none"
                />

                <div className="flex h-[calc(100%+2px)] flex-col">
                    <Button
                        type="button"
                        onPress={increment}
                        className="flex h-1/2 w-6 items-center justify-center border-l border-b border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-white transition-colors disabled:opacity-40">
                        <ChevronUpIcon size={15} />
                    </Button>
                    <Button
                        type="button"
                        onPress={decrement}
                        className="flex h-1/2 w-6 items-center justify-center border-l border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-white transition-colors disabled:opacity-40">
                        <ChevronDownIcon size={15} />
                    </Button>
                </div>
            </Group>
        </div>
    )
}
