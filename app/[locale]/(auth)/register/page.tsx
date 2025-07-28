'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { IconBrandGoogle } from '@tabler/icons-react'
import React, { useState } from 'react'

import { RegisterForm } from '@/components/auth/register/RegisterFormComponent'
import { RegisterHeader } from '@/components/auth/register/RegisterHeaderComponent'
import { SocialLoginButton } from '@/components/ui/SocialLoginButton'
import { register } from '@/hooks/auth'

export default function RegisterPage() {
    const router = useRouter()
    const t = useTranslations('Auth.Register')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (formData: {
        name: string
        email: string
        password: string
        confirmPassword: string
    }) => {
        setLoading(true)
        try {
            await register(formData.name, formData.email, formData.password)
            router.push('/dashboard')
        } catch (error) {
            alert('Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            id="register"
            className="flex flex-col min-h-screen bg-[var(--color-background)] justify-center items-center px-4">
            <RegisterHeader />

            <RegisterForm onSubmit={handleRegister} loading={loading} />

            <div className="flex items-center my-6 max-w-md w-full">
                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
                <span className="mx-4 text-gray-400 text-sm">{t('or')}</span>
                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            <div className="space-y-3 max-w-md w-full">
                <SocialLoginButton
                    icon={<IconBrandGoogle className="h-5 w-5 text-red-500" />}
                    label={t('signUpGoogle')}
                    onClick={() => alert('Google sign-up not implemented')}
                    disabled={loading}
                />
            </div>

            <div className="text-center mt-6 text-sm text-[var(--color-foreground)] max-w-md">
                {t('haveAccount')}{' '}
                <Link
                    href="/login"
                    className="text-[var(--color-accent)] hover:underline font-semibold">
                    {t('login')}
                </Link>
            </div>
        </main>
    )
}
