'use client'

import React from 'react'
import {
    Label,
    LabelInputContainer,
    InputField,
    InputError,
} from '@/components/ui'
import { AddressField } from '@/components/ui/AddressField'

export type LocationValues = {
    street?: string
    zip?: string
    city?: string
    region?: string
}

export interface LocationFieldsProps {
    values: LocationValues
    onChange?: (field: keyof LocationValues, value: string) => void
    onFullAddressSelect?: (address: LocationValues) => void
    showLabels?: boolean
    required?: Partial<Record<keyof LocationValues, boolean>>
    className?: string
    fieldClassName?: string
    disableZipSuggestions?: boolean
    ids?: Partial<Record<keyof LocationValues, string>>
    placeholders?: Partial<Record<keyof LocationValues, string>>
    labels?: Partial<Record<keyof LocationValues, string>>
    errors?: Partial<Record<keyof LocationValues, string[]>>
}

export function LocationFields({
    values,
    onChange,
    onFullAddressSelect,
    showLabels = true,
    required = {},
    className = '',
    fieldClassName = '',
    disableZipSuggestions = true,
    ids = {},
    labels = {},
    placeholders = {},
    errors = {},
}: LocationFieldsProps) {
    const handleFieldChange =
        (field: keyof LocationValues) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(field, e.target.value)
        }

    const handleFullSelect = (address: LocationValues) => {
        onFullAddressSelect?.(address)
        if (address.street !== undefined) onChange?.('street', address.street)
        if (address.zip !== undefined) onChange?.('zip', address.zip)
        if (address.city !== undefined) onChange?.('city', address.city)
        if (address.region !== undefined) onChange?.('region', address.region)
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
            <LabelInputContainer>
                {showLabels && (
                    <Label
                        htmlFor={ids.street ?? 'street'}
                        required={!!required.street}>
                        {labels.street ?? 'Street'}
                    </Label>
                )}
                <AddressField
                    type="street"
                    id={ids.street}
                    placeholder={placeholders.street}
                    value={values.street ?? ''}
                    onChange={handleFieldChange('street')}
                    onSelect={handleFullSelect}
                    className={fieldClassName}
                    error={Boolean(errors.street)}
                />
                <InputError
                    id={ids.street ? `${ids.street}-error` : 'street-error'}
                    messages={errors.street}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                {showLabels && (
                    <Label htmlFor={ids.zip ?? 'zip'} required={!!required.zip}>
                        {labels.zip ?? 'ZIP'}
                    </Label>
                )}
                {disableZipSuggestions ? (
                    <InputField
                        id={ids.zip}
                        placeholder={placeholders.zip}
                        value={values.zip ?? ''}
                        onChange={handleFieldChange('zip')}
                        className={fieldClassName}
                        error={Boolean(errors.zip)}
                    />
                ) : (
                    <AddressField
                        type="zip"
                        id={ids.zip}
                        placeholder={placeholders.zip}
                        value={values.zip ?? ''}
                        onChange={handleFieldChange('zip')}
                        onSelect={handleFullSelect}
                        className={fieldClassName}
                        error={Boolean(errors.zip)}
                    />
                )}
                <InputError
                    id={ids.zip ? `${ids.zip}-error` : 'zip-error'}
                    messages={errors.zip}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                {showLabels && (
                    <Label
                        htmlFor={ids.city ?? 'city'}
                        required={!!required.city}>
                        {labels.city ?? 'City'}
                    </Label>
                )}
                <AddressField
                    type="city"
                    id={ids.city}
                    placeholder={placeholders.city}
                    value={values.city ?? ''}
                    onChange={handleFieldChange('city')}
                    onSelect={handleFullSelect}
                    className={fieldClassName}
                    error={Boolean(errors.city)}
                />
                <InputError
                    id={ids.city ? `${ids.city}-error` : 'city-error'}
                    messages={errors.city}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                {showLabels && (
                    <Label
                        htmlFor={ids.region ?? 'region'}
                        required={!!required.region}>
                        {labels.region ?? 'Region'}
                    </Label>
                )}
                <AddressField
                    type="region"
                    id={ids.region}
                    placeholder={placeholders.region}
                    value={values.region ?? ''}
                    onChange={handleFieldChange('region')}
                    onSelect={handleFullSelect}
                    className={fieldClassName}
                    error={Boolean(errors.region)}
                />
                <InputError
                    id={ids.region ? `${ids.region}-error` : 'region-error'}
                    messages={errors.region}
                />
            </LabelInputContainer>
        </div>
    )
}

export default LocationFields
export const LocationFieldsComponent = LocationFields
