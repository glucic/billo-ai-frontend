'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useAuth } from '@/hooks/auth'
import { RegisterForm } from '@/components/auth/register/RegisterFormComponent'
import { RegisterHeader } from '@/components/auth/register/RegisterHeaderComponent'
import { SocialLoginButton } from '@/components/ui/SocialLoginButton'
import type { BackendErrors } from '@/lib/errorUtils'

export default function RegisterPage() {
    const router = useRouter()
    const t = useTranslations('Auth.Register')

    const { register, user, loading } = useAuth({ middleware: 'guest' })

    const [formLoading, setFormLoading] = useState(false)
    const [errors, setErrors] = useState<BackendErrors>({})
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard')
        }
    }, [user, loading, router])

    const handleRegister = async (data: {
        first_name: string
        last_name: string
        email: string
        password: string
        password_confirmation: string
    }) => {
        setFormLoading(true)
        setErrors({})
        setStatus(null)
        try {
            await register({
                ...data,
                setErrors,
                setStatus,
                redirectAfter: '/getting-started',
            })
        } finally {
            setFormLoading(false)
        }
    }

    return (
        <main className="flex flex-col min-h-screen bg-[var(--color-background)] justify-center items-center px-4 text-[var(--color-foreground)]">
            <RegisterHeader />

            <RegisterForm
                onSubmit={handleRegister}
                loading={formLoading}
                errors={errors}
            />

            {status && (
                <p className="text-[var(--color-success)] mt-3">{status}</p>
            )}

            <div className="flex items-center my-6 max-w-md w-full">
                <div className="flex-grow h-px bg-[var(--divider-light)]" />
                <span className="mx-4 text-[var(--text-muted)] text-sm">
                    {t('or')}
                </span>
                <div className="flex-grow h-px bg-[var(--divider-light)]" />
            </div>

            <div className="space-y-3 max-w-md w-full">
                <SocialLoginButton
                    icon={
                        <IconBrandGoogle className="h-5 w-5 text-[var(--error)]" />
                    }
                    label={t('signUpGoogle')}
                    onClick={() => alert('Google sign-up not implemented')}
                    disabled={formLoading}
                />
            </div>

            <div className="text-center mt-6 text-sm text-[var(--text-muted)] max-w-md">
                {t('haveAccount')}{' '}
                <Link
                    href="/login"
                    className="text-[var(--color-accent)] hover:underline font-semibold transition-colors">
                    {t('login')}
                </Link>
            </div>
        </main>
    )
}
