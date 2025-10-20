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
import { LoginFormProps } from '@/components/auth/login/LoginFormProps'

export function LoginForm({
    onSubmit,
    loading = false,
    errors = {},
}: LoginFormProps) {
    const t = useTranslations('Auth.Login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isFormValid = email.trim() && password.trim()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return
        onSubmit({ email, password })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <InputError message={errors.general?.[0]} />

            <LabelInputContainer>
                <Label required={true} htmlFor="email">{t('email')}</Label>
                <InputField
                    id="email"
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    error={Boolean(errors.email)}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={loading}
                />
                <InputError message={errors.email?.[0]} id="email-error" />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label required={true} htmlFor="password">{t('password')}</Label>
                <InputField
                    id="password"
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    error={Boolean(errors.password)}
                    autoComplete="current-password"
                    aria-describedby={
                        errors.password ? 'password-error' : undefined
                    }
                    disabled={loading}
                />
                <InputError
                    message={errors.password?.[0]}
                    id="password-error"
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
        </form>
    )
}
