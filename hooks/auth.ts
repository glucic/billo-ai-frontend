'use client'

import { useRouter, useParams } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import React from 'react'
import { useAuthContext } from '@/context/AuthProvider'
import { useTranslations } from 'next-intl'
import { parseBackendErrors, BackendErrors } from '@/lib/errorUtils'

type AuthCallbacks = {
    setErrors: (errors: BackendErrors) => void
    setStatus?: (status: string | null) => void
}

type RegisterProps = AuthCallbacks & {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
}

type LoginProps = AuthCallbacks & {
    email: string
    password: string
}

type ForgotPasswordProps = AuthCallbacks & {
    email: string
}

type ResetPasswordProps = AuthCallbacks & {
    password: string
    password_confirmation: string
    token?: string
}

type ResendEmailVerificationProps = {
    setStatus: (status: string | null) => void
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: {
    middleware?: 'guest' | 'auth'
    redirectIfAuthenticated?: string
} = {}) => {
    const router = useRouter()
    const params = useParams()
    const { user, loading, mutateUser } = useAuthContext()
    const t = useTranslations('Auth')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csrfPromise = React.useRef<Promise<any> | null>(null)
    const csrf = async () => {
        try {
            if (!csrfPromise.current) {
                csrfPromise.current = apiClient.get('/sanctum/csrf-cookie')
            }
            return await csrfPromise.current
        } catch (err) {
            csrfPromise.current = null
            throw err
        }
    }

    // ---- Unified request wrapper ----
    const handleAuthRequest = async (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        requestFn: () => Promise<any>,
        setErrors: (errors: BackendErrors) => void,
        setStatus?: (status: string | null) => void,
        namespace = 'GlobalErrors',
    ) => {
        setErrors({})
        setStatus?.(null)

        try {
            await csrf()
            return await requestFn()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setErrors(parseBackendErrors(error, t, namespace))
            throw error
        }
    }

    const register = async (props: RegisterProps) =>
        handleAuthRequest(
            async () => {
                try {
                    await apiClient.post('/register', props)
                    await mutateUser()
                } finally {
                    router.push('/getting-started')
                }
            },
            props.setErrors,
            props.setStatus,
            'Register',
        )

    const login = async (props: LoginProps) =>
        handleAuthRequest(
            async () => {
                await apiClient.post('/login', props)
                await mutateUser()
            },
            props.setErrors,
            props.setStatus,
            'Login',
        )

    const forgotPassword = async (props: ForgotPasswordProps) =>
        handleAuthRequest(
            async () => {
                const response = await apiClient.post('/forgot-password', {
                    email: props.email,
                })
                props.setStatus?.(response.data.status)
            },
            props.setErrors,
            props.setStatus,
            'ForgotPassword',
        )

    const resetPassword = async (props: ResetPasswordProps) =>
        handleAuthRequest(
            async () => {
                const response = await apiClient.post('/reset-password', {
                    token: params.token,
                    ...props,
                })
                router.push('/login?reset=' + btoa(response.data.status))
            },
            props.setErrors,
            props.setStatus,
            'ResetPassword',
        )

    const resendEmailVerification = async ({
        setStatus,
    }: ResendEmailVerificationProps) => {
        const response = await apiClient.post(
            '/email/verification-notification',
        )
        setStatus(response.data.status)
    }

    const logout = React.useCallback(async () => {
        try {
            await csrf()
            await apiClient.post('/logout')
        } finally {
            await mutateUser(null, false)
        }
        router.push('/login')
    }, [router, mutateUser])

    React.useEffect(() => {
        if (loading) return

        if (middleware === 'guest' && user) {
            router.push(redirectIfAuthenticated ?? '/')
            return
        }

        if (middleware === 'auth' && !user) {
            router.push('/login')
            return
        }

        if (window.location.pathname === '/verify-email') {
            router.push(redirectIfAuthenticated ?? '/')
        }
    }, [user, loading, middleware, redirectIfAuthenticated, router])

    return {
        user,
        loading,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
