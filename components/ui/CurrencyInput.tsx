'use client'

import React, { useState, useEffect } from 'react'
import { InputField } from '@/components/ui'

interface CurrencyInputProps {
    value: number
    onChange: (value: number) => void
    currency: string
    placeholder?: string
    position?: 'prefix' | 'suffix' // default: suffix
    readOnly?: boolean
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
}: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState('')
    const symbol = currencySymbols[currency] || currency

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

    return (
        <div className="relative w-full">

            {position === 'prefix' && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 select-none">
                    {symbol}
                </span>
            )}

            <InputField
                type="text"
                inputMode="decimal"
                value={displayValue}
                onChange={handleChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`${
                    position === 'prefix' ? 'pl-8 pr-3' : 'pr-8 pl-3'
                } text-right md:text-left`}
            />

            {position === 'suffix' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 select-none">
                    {symbol}
                </span>
            )}
        </div>
    )
}
