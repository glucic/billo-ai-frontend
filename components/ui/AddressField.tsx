'use client'

import React, { useEffect, useState, JSX } from 'react'
import { InputField } from './InputField'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import apiClient from '@/lib/apiClient'

interface AddressFieldProps {
    type: 'street' | 'zip' | 'city' | 'region'
    error?: boolean
    className?: string
    value?: string
    placeholder?: string
    id?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect?: (address: {
        street: string
        zip: string
        city: string
        region: string
    }) => void
    'aria-describedby'?: string
}

export function AddressField({
    type,
    error,
    className,
    value,
    onChange,
    onSelect,
    id,
    placeholder,
    'aria-describedby': ariaDescribedBy,
}: AddressFieldProps) {
    const [query, setQuery] = useState(value || '')
    const [suggestions, setSuggestions] = useState<
        Array<{ description: string; place_id: string }>
    >([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const debouncedQuery = useDebouncedValue(query, 300)

    useEffect(() => {
        setQuery(value as string)
    }, [value])

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery) {
                setSuggestions([])
                return
            }

            try {
                const types =
                    type === 'city'
                        ? 'cities'
                        : type === 'region'
                          ? 'regions'
                          : type === 'street'
                            ? 'address'
                            : null

                if (!types) return

                const response = await apiClient.get(
                    '/api/location/suggestions',
                    {
                        params: {
                            query: debouncedQuery,
                            types,
                        },
                    },
                )
                setSuggestions(response.data.predictions || [])
            } catch (error) {
                console.error('Error fetching address suggestions:', error)
                setSuggestions([])
            }
        }
        fetchSuggestions()
    }, [debouncedQuery, type])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (onChange) {
            onChange(e)
        }
    }

    const handleSuggestionClick = async (suggestion: {
        description: string
        place_id: string
    }) => {
        try {
            const response = await apiClient.get('/api/location/details', {
                params: { place_id: suggestion.place_id },
            })

            const address = response.data || {
                street: '',
                zip: '',
                city: '',
                region: '',
            }

            let currentValue = ''
            switch (type) {
                case 'street':
                    currentValue = address.street || suggestion.description
                    break
                case 'zip':
                    currentValue = address.zip || suggestion.description
                    break
                case 'city':
                    currentValue = address.city || suggestion.description
                    break
                case 'region':
                    currentValue = address.region || suggestion.description
                    break
            }

            setQuery(currentValue)
            setSuggestions([])
            setShowSuggestions(false)

            const event = {
                target: {
                    value: currentValue,
                },
            } as React.ChangeEvent<HTMLInputElement>

            if (onChange) {
                onChange(event)
            }

            if (onSelect) {
                onSelect({
                    street: address.street || '',
                    zip: address.zip || '',
                    city: address.city || '',
                    region: address.region || '',
                })
            }
        } catch (err) {
            console.error('Error fetching address details:', err)
            setQuery(suggestion.description)
            setSuggestions([])
            setShowSuggestions(false)
            const event = {
                target: { value: suggestion.description },
            } as React.ChangeEvent<HTMLInputElement>
            if (onChange) onChange(event)
        }
    }

    return (
        <div className="relative">
            <InputField
                id={id}
                value={query}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200)
                }}
                error={error}
                className={className}
                placeholder={placeholder}
                aria-describedby={ariaDescribedBy}
            />
            {showSuggestions && suggestions.length > 0 && type !== 'zip' && (
                <ul className="absolute z-10 w-full mt-1 bg-[var(--secondary-background)]/100 rounded-[var(--input-radius)] shadow-lg max-h-60 overflow-auto">
                    {suggestions.map(suggestion => (
                        <li
                            key={suggestion.place_id}
                            className="px-[var(--input-padding-x)] py-[var(--input-padding-y)] hover:bg-[var(--accent-glow)] cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
