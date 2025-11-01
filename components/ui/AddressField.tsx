'use client'

import React, { useEffect, useState } from 'react'
import { AutocompleteSelection } from './AutocompleteSelect'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import apiClient from '@/lib/apiClient'
import { cn } from '@/lib/utils'

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
    className,
    value,
    onChange,
    onSelect,
    placeholder,
    error
}: AddressFieldProps) {
    const [query, setQuery] = useState(value || '')
    const [suggestions, setSuggestions] = useState<
        Array<{ description: string; place_id: string }>
    >([])
    const [isLoading, setIsLoading] = useState(false)
    const debouncedQuery = useDebouncedValue(query, 300)

    useEffect(() => {
        setQuery(value || '')
    }, [value])

    useEffect(() => {
        if (!debouncedQuery) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            try {
                setIsLoading(true)
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
                        params: { query: debouncedQuery, types },
                    },
                )
                setSuggestions(response.data?.data || [])
            } catch {
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchSuggestions()
    }, [debouncedQuery, type])

    const handleSelect = async (selectedLabel: string) => {
        const suggestion = suggestions.find(
            s => s.description === selectedLabel,
        )

        if (!suggestion) {
            setQuery(selectedLabel)
            onChange?.({
                target: { value: selectedLabel },
            } as React.ChangeEvent<HTMLInputElement>)
            onSelect?.({
                street: type === 'street' ? selectedLabel : '',
                zip: type === 'zip' ? selectedLabel : '',
                city: type === 'city' ? selectedLabel : '',
                region: type === 'region' ? selectedLabel : '',
            })
            return
        }

        try {
            setIsLoading(true)
            const response = await apiClient.get('/api/location/details', {
                params: { place_id: suggestion.place_id },
            })
            const address = response.data?.data || {
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
            onChange?.({
                target: { value: currentValue },
            } as React.ChangeEvent<HTMLInputElement>)
            onSelect?.(address)
        } catch {
            setQuery(selectedLabel)
            onChange?.({
                target: { value: selectedLabel },
            } as React.ChangeEvent<HTMLInputElement>)
        } finally {
            setIsLoading(false)
        }
    }

    const options = suggestions.map(s => ({
        label: s.description,
        value: s.description,
    }))

    return (
        <div className="relative">
            <AutocompleteSelection
                options={options}
                value={query}
                onChange={handleSelect}
                placeholder={placeholder || 'Type to search...'}
                className={cn(className, 'w-full')}
                loading={isLoading}
                error={Boolean(error)}
            />
        </div>
    )
}
