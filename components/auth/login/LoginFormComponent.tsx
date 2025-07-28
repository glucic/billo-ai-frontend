'use client'

import React, { useState } from 'react'
import { InputField } from '@/components/ui/InputField'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type LoginFormProps = {
    onSubmit: (credentials: {
        username: string
        password: string
    }) => void | Promise<void>
    loading?: boolean
    errors?: Partial<{
        username: string[]
        password: string[]
        general: string[]
    }>
}

export function LoginForm({
    onSubmit,
    loading = false,
    errors = {},
}: LoginFormProps) {
    const t = useTranslations('Auth.Login')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username.trim() || !password.trim()) return

        onSubmit({ username, password })
    }

    return (
        <form
            className="space-y-5 max-w-md w-full"
            onSubmit={handleSubmit}
            noValidate>
            {/* Email Field */}
            <InputField
                id="email"
                type="text"
                label={t('email')}
                placeholder={t('email')}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="email"
                aria-label={t('email')}
                disabled={loading}
            />

            {/* Password Field */}
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

            {/* Submit Button */}
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

            {/* Forgot Password */}
            <div className="text-right mt-1">
                <Link
                    href="/forgot-password"
                    className="text-[var(--color-accent)] hover:underline text-sm font-medium">
                    {t('forgotPassword')}
                </Link>
            </div>

            {/* General Error */}
            {errors.general && (
                <p className="text-sm text-red-600 mt-2">{errors.general[0]}</p>
            )}
        </form>
    )
}
