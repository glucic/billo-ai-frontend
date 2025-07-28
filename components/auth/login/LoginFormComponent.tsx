'use client'

import React, { useState } from 'react'
import {
    InputField,
    Label,
    LabelInputContainer,
    StatefulButton,
} from '@/components/ui'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { InputError } from '@/components/ui/InputError'

const USERNAME_ID = 'email'
const PASSWORD_ID = 'password'

export function LoginForm({
    onSubmit,
    loading = false,
    errors = {},
}: LoginFormProps) {
    const t = useTranslations('Auth.Login')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isFormValid = username.trim() !== '' && password.trim() !== ''

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return

        onSubmit({ username, password })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <LabelInputContainer>
                <Label htmlFor={USERNAME_ID}>{t('email')}</Label>
                <InputField
                    id={USERNAME_ID}
                    type="text"
                    placeholder={t('email')}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    autoComplete="email"
                    aria-label={t('email')}
                    aria-describedby={
                        errors.username ? `${USERNAME_ID}-error` : undefined
                    }
                    disabled={loading}
                />
                <InputError
                    message={errors.username?.[0]}
                    id={`${USERNAME_ID}-error`}
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
                    autoComplete="current-password"
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

            <div className="flex justify-center">
                <StatefulButton
                    className="min-w-[260px]"
                    type="submit"
                    disabled={!isFormValid || loading}>
                    {t('loginButton')}
                </StatefulButton>
            </div>

            <div className="text-right mt-1">
                <Link
                    href="/forgot-password"
                    className="text-[var(--color-accent)] hover:underline text-sm font-medium">
                    {t('forgotPassword')}
                </Link>
            </div>

            <InputError message={errors.general?.[0]} />
        </form>
    )
}
