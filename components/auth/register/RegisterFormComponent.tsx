'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
} from '@/components/ui'

export function RegisterForm({ onSubmit, loading = false }: RegisterFormProps) {
    const t = useTranslations('Auth.Register')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const isFormValid =
        name.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== ''

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!isFormValid) {
            setError(t('allFieldsRequired'))
            return
        }

        if (password !== confirmPassword) {
            setError(t('passwordsDontMatch'))
            return
        }

        onSubmit({ name, email, password, confirmPassword })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <LabelInputContainer>
                <Label htmlFor="username">{t('username')}</Label>
                <InputField
                    id="username"
                    type="text"
                    placeholder={t('username')}
                    aria-label={t('username')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                    autoFocus
                />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="email">{t('email')}</Label>
                <InputField
                    id="email"
                    type="email"
                    placeholder={t('email')}
                    aria-label={t('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="password">{t('password')}</Label>
                <InputField
                    id="password"
                    type="password"
                    placeholder={t('password')}
                    aria-label={t('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <InputField
                    id="confirmPassword"
                    type="password"
                    placeholder={t('confirmPassword')}
                    aria-label={t('confirmPassword')}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                />
            </LabelInputContainer>

            {error && (
                <p
                    className="text-red-500 text-sm"
                    role="alert"
                    aria-live="assertive">
                    {error}
                </p>
            )}

            <div className="flex justify-center">
                <StatefulButton
                    className="min-w-[260px]"
                    type="submit"
                    disabled={!isFormValid || loading}
                >
                    {t('registerButton')}
                </StatefulButton>
            </div>
        </form>
    )
}
