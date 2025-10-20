'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
    InputError,
} from '@/components/ui'

export function RegisterForm({
    onSubmit,
    loading = false,
    errors = {},
}: RegisterFormProps) {
    const t = useTranslations('Auth.Register')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setConfirmPassword] = useState('')
    const [clientError, setClientError] = useState<string | null>(null)

    const isFormValid = [
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
    ].every(v => v.trim())

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setClientError(null)

        if (!isFormValid) return setClientError(t('allFieldsRequired'))

        onSubmit({
            first_name,
            last_name,
            email,
            password,
            password_confirmation,
        })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <InputError
                message={errors.general?.[0] || clientError || undefined}
            />

            {(
                [
                    {
                        id: 'first_name',
                        label: t('firstName'),
                        value: first_name,
                        setValue: setFirstName,
                        type: 'text'
                    },
                    {
                        id: 'last_name',
                        label: t('lastName'),
                        value: last_name,
                        setValue: setLastName,
                        type: 'text'
                    },
                    {
                        id: 'email',
                        label: t('email'),
                        value: email,
                        setValue: setEmail,
                        type: 'email',
                    },
                    {
                        id: 'password',
                        label: t('password'),
                        value: password,
                        setValue: setPassword,
                        type: 'password',
                    },
                    {
                        id: 'password_confirmation',
                        label: t('confirmPassword'),
                        value: password_confirmation,
                        setValue: setConfirmPassword,
                        type: 'password',
                    },
                ] as const
            ).map(({ id, label, value, setValue, type }) => (
                <LabelInputContainer key={id}>
                    <Label required={true} htmlFor={id}>{label}</Label>
                    <InputField
                        id={id}
                        type={type}
                        placeholder={label}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        required
                        disabled={loading}
                        error={Boolean(errors?.[id])}
                        aria-describedby={
                            errors?.[id] ? `${id}-error` : undefined
                        }
                    />
                    <InputError
                        message={errors?.[id]?.[0]}
                        id={`${id}-error`}
                    />
                </LabelInputContainer>
            ))}

            <div className="flex justify-center">
                <StatefulButton
                    className="min-w-[260px]"
                    type="submit"
                    disabled={!isFormValid || loading}>
                    {t('registerButton')}
                </StatefulButton>
            </div>
        </form>
    )
}
