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

const FIRST_NAME_ID = 'first_name'
const LAST_NAME_ID = 'last_name'
const EMAIL_ID = 'email'
const PASSWORD_ID = 'password'
const PASSWORD_CONFIRMATION_ID = 'password_confirmation'

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

    const isFormValid =
        first_name.trim() !== '' &&
        last_name.trim() !== '' &&
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

        onSubmit({ first_name, last_name, email, password, password_confirmation })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <InputError
                message={errors.general?.[0] || clientError || undefined}
            />

            <LabelInputContainer>
                <Label htmlFor={FIRST_NAME_ID}>{t('firstName')}</Label>
                <InputField
                    id={FIRST_NAME_ID}
                    type="text"
                    placeholder={t('firstName')}
                    value={first_name}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    aria-label={t('firstName')}
                    aria-describedby={
                        errors.first_name ? `${FIRST_NAME_ID}-error` : undefined
                    }
                    disabled={loading}
                    autoFocus
                />
                <InputError
                    message={errors.first_name?.[0]}
                    id={`${FIRST_NAME_ID}-error`}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor={LAST_NAME_ID}>{t('lastName')}</Label>
                <InputField
                    id={LAST_NAME_ID}
                    type="text"
                    placeholder={t('lastName')}
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                    required
                    aria-label={t('lastName')}
                    aria-describedby={
                        errors.last_name ? `${LAST_NAME_ID}-error` : undefined
                    }
                    disabled={loading}
                    autoFocus
                />
                <InputError
                    message={errors.last_name?.[0]}
                    id={`${LAST_NAME_ID}-error`}
                />
            </LabelInputContainer>

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
