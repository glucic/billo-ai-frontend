import { useRouter, useParams } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import React from 'react'

type Errors = Record<string, string[]>

type AuthCallbacks = {
    setErrors: (errors: Errors) => void
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

type CreateOrganisationProps = {
    name: string
    description: string
    email: string
    phone: string
    employee_count: number
    street?: string
    city?: string
    zip?: string
    region?: string
    setErrors: (errors: Errors) => void
}

import { useAuthContext } from '@/context/AuthProvider'

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

    const csrf = () => apiClient.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await csrf()
        setErrors({})
        try {
            await apiClient.post('/register', props)
            await mutateUser()
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const login = async ({
        setErrors,
        setStatus,
        ...props
    }: LoginProps & { setStatus?: (status: string | null) => void }) => {
        await csrf()
        setErrors({})
        setStatus?.(null)
        try {
            await apiClient.post('/login', props)
            await mutateUser()
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: ForgotPasswordProps) => {
        await csrf()
        setErrors({})
        setStatus?.(null)
        try {
            const response = await apiClient.post('/forgot-password', { email })
            setStatus?.(response.data.status)
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: ResetPasswordProps & AuthCallbacks) => {
        await csrf()
        setErrors({})
        setStatus?.(null)
        try {
            const response = await apiClient.post('/reset-password', {
                token: params.token,
                ...props,
            })
            router.push('/login?reset=' + btoa(response.data.status))
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const resendEmailVerification = async ({
        setStatus,
    }: ResendEmailVerificationProps) => {
        const response = await apiClient.post(
            '/email/verification-notification',
        )
        setStatus(response.data.status)
    }

    const logout = async () => {
        await csrf()
        await apiClient.post('/logout')
        await mutateUser(null, false)
        router.push('/login')
    }

    const createOrganisation = async ({
        setErrors,
        ...props
    }: CreateOrganisationProps) => {
        await csrf()
        setErrors({})

        try {
            const response = await apiClient.post('/api/organisations', props)
            return response.data
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            }
            throw error
        }
    }

    React.useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated ?? '/')
        }
        if (middleware === 'auth' && !user && !loading) {
            logout()
        }
    }, [user, loading])

    return {
        user,
        loading,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        createOrganisation,
    }
}
