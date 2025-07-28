'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
} from '@/components/ui'
import { InputError } from '@/components/ui/InputError'

const NAME_ID = 'name'
const EMAIL_ID = 'email'
const PASSWORD_ID = 'password'
const PASSWORD_CONFIRMATION_ID = 'password_confirmation'

export function RegisterForm({
    onSubmit,
    loading = false,
    errors = {},
}: RegisterFormProps) {
    const t = useTranslations('Auth.Register')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setConfirmPassword] = useState('')
    const [clientError, setClientError] = useState<string | null>(null)

    const isFormValid =
        name.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        password_confirmation.trim() !== ''

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setClientError(null)

        if (!isFormValid) {
            setClientError(t('allFieldsRequired'))
            return
        }

        if (password !== password_confirmation) {
            setClientError(t('passwordsDontMatch'))
            return
        }

        onSubmit({ name, email, password, password_confirmation })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <InputError
                message={errors.general?.[0] || clientError || undefined}
            />

            {/* Name */}
            <LabelInputContainer>
                <Label htmlFor={NAME_ID}>{t('username')}</Label>
                <InputField
                    id={NAME_ID}
                    type="text"
                    placeholder={t('username')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    aria-label={t('username')}
                    aria-describedby={
                        errors.name ? `${NAME_ID}-error` : undefined
                    }
                    disabled={loading}
                    autoFocus
                />
                <InputError
                    message={errors.name?.[0]}
                    id={`${NAME_ID}-error`}
                />
            </LabelInputContainer>

            {/* Email */}
            <LabelInputContainer>
                <Label htmlFor={EMAIL_ID}>{t('email')}</Label>
                <InputField
                    id={EMAIL_ID}
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label={t('email')}
                    aria-describedby={
                        errors.email ? `${EMAIL_ID}-error` : undefined
                    }
                    disabled={loading}
                />
                <InputError
                    message={errors.email?.[0]}
                    id={`${EMAIL_ID}-error`}
                />
            </LabelInputContainer>

            {/* Password */}
            <LabelInputContainer>
                <Label htmlFor={PASSWORD_ID}>{t('password')}</Label>
                <InputField
                    id={PASSWORD_ID}
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    aria-label={t('password')}
                    aria-describedby={
                        errors.password ? `${PASSWORD_ID}-error` : undefined
                    }
                    disabled={loading}
                />
                <InputError
                    message={errors.password?.[0]}
                    id={`${PASSWORD_ID}-error`}
                />
            </LabelInputContainer>

            {/* Confirm Password */}
            <LabelInputContainer>
                <Label htmlFor={PASSWORD_CONFIRMATION_ID}>
                    {t('confirmPassword')}
                </Label>
                <InputField
                    id={PASSWORD_CONFIRMATION_ID}
                    type="password"
                    placeholder={t('confirmPassword')}
                    value={password_confirmation}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    aria-label={t('confirmPassword')}
                    aria-describedby={
                        errors.password_confirmation
                            ? `${PASSWORD_CONFIRMATION_ID}-error`
                            : undefined
                    }
                    disabled={loading}
                />
                <InputError
                    message={errors.password_confirmation?.[0]}
                    id={`${PASSWORD_CONFIRMATION_ID}-error`}
                />
            </LabelInputContainer>

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
