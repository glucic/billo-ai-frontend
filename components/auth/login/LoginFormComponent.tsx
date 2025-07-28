'use client'

import React, { useState } from 'react'
import { InputField } from '@/components/ui/InputField'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type LoginFormProps = {
    onSubmit: (email: string, password: string) => void | Promise<void>
    loading?: boolean
}

export function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
    const t = useTranslations('Auth.Login')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim() || !password.trim()) {
            return
        }
        onSubmit(email, password)
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            <InputField
                id="email"
                type="email"
                label={t('email')}
                placeholder={t('email')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-label={t('email')}
                disabled={loading}
            />
            <InputField
                id="password"
                type="password"
                label={t('password')}
                placeholder={t('password')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                aria-label={t('password')}
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded bg-[var(--color-accent)] text-white font-semibold transition ${
                    loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[var(--color-accent-light)]'
                }`}>
                {loading ? t('loading') : t('loginButton')}
            </button>

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
