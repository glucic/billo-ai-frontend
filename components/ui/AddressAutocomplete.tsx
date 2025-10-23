'use client'

import React, { useEffect, useState } from 'react'
import { InputField } from './InputField'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import apiClient from '@/lib/apiClient'

interface AddressAutocompleteProps {
    onAddressSelect: (address: {
        street: string
        zip: string
        city: string
        region: string
    }) => void
    error?: boolean
    className?: string
    placeholder?: string
}

export function AddressAutocomplete({
    onAddressSelect,
    error,
    className,
    placeholder = 'Enter address...',
}: AddressAutocompleteProps) {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<
        Array<{ description: string; place_id: string }>
    >([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const debouncedQuery = useDebouncedValue(query, 300)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery) {
                setSuggestions([])
                return
            }

            try {
                const response = await apiClient.get(
                    'api/location/suggestions',
                    {
                        params: { query: debouncedQuery },
                    },
                )
                setSuggestions(response.data.predictions || [])
            } catch (error) {
                console.error('Error fetching address suggestions:', error)
                setSuggestions([])
            }
        }

        fetchSuggestions()
    }, [debouncedQuery])

    const handleSuggestionClick = async (placeId: string) => {
        try {
            const response = await apiClient.get('/location/details', {
                params: { place_id: placeId },
            })
            onAddressSelect(response.data)
            setQuery('')
            setSuggestions([])
            setShowSuggestions(false)
        } catch (error) {
            console.error('Error fetching address details:', error)
        }
    }

    return (
        <div className="relative">
            <InputField
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder={placeholder}
                error={error}
                className={className}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-[var(--input-bg)] rounded-[var(--input-radius)] shadow-lg max-h-60 overflow-auto">
                    {suggestions.map(suggestion => (
                        <li
                            key={suggestion.place_id}
                            className="px-[var(--input-padding-x)] py-[var(--input-padding-y)] hover:bg-[var(--accent-glow)] cursor-pointer"
                            onClick={() =>
                                handleSuggestionClick(suggestion.place_id)
                            }>
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
