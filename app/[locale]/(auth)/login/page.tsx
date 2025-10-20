'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/auth'
import { LoginForm } from '@/components/auth/login/LoginFormComponent'
import { LoginHeader } from '@/components/auth/login/LoginHeaderComponent'
import { SocialLoginButton } from '@/components/ui/SocialLoginButton'
import { IconBrandGoogle } from '@tabler/icons-react'
import Link from 'next/link'

import type { BackendErrors } from '@/lib/errorUtils'

export default function LoginPage() {
    useRouter()
    const t = useTranslations('Auth.Login')
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<BackendErrors>({})
    const [status, setStatus] = useState<string | null>(null)

    const handleLogin = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        setLoading(true)
        setErrors({})
        setStatus(null)

        try {
            await login({
                email,
                password,
                setErrors,
                setStatus,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            id="login"
            className="flex flex-col min-h-screen bg-[var(--color-background)] justify-center items-center px-4">
            <LoginHeader />

            <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                errors={errors}
            />

            {status && <p className="text-green-600 mt-2">{status}</p>}

            <div className="flex items-center my-6 max-w-md w-full">
                <div className="flex-grow h-px bg-[var(--divider-light)]" />
                <span className="mx-4 text-[var(--text-muted)] text-sm">
                    {t('or')}
                </span>
                <div className="flex-grow h-px bg-[var(--divider-light)]" />
            </div>

            <div className="space-y-3 w-full max-w-md">
                <SocialLoginButton
                    icon={
                        <IconBrandGoogle className="h-5 w-5 text-[var(--error)]" />
                    }
                    label={t('signInGoogle')}
                    onClick={() => alert('Google sign-in not implemented')}
                    disabled={loading}
                />
            </div>

            <div className="text-center mt-6 text-sm text-[var(--color-foreground)] max-w-md">
                {t('noAccount')}{' '}
                <Link
                    href="/register"
                    className="text-[var(--color-accent)] hover:underline font-semibold">
                    {t('signUp')}
                </Link>
            </div>
        </main>
    )
}
