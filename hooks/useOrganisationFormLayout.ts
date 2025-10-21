'use client'

import { useState } from 'react'

interface UseOrganisationFormLayoutOptions {
    mode: 'create' | 'edit'
    saveOrganisation: () => Promise<{ success: boolean }>
    onSuccessRedirect?: () => void
}

export function useOrganisationFormLayout({
    mode,
    saveOrganisation,
    onSuccessRedirect,
}: UseOrganisationFormLayoutOptions) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess(false)
        setError(null)

        try {
            const res = await saveOrganisation()
            if (res.success) {
                setSuccess(true)
                if (onSuccessRedirect) setTimeout(onSuccessRedirect, 1200)
            } else {
                setError('Something went wrong while saving the organisation.')
            }
        } catch (err: any) {
            console.error(`${mode} organisation failed:`, err)
            setError(err?.message || 'An unexpected error occurred.')
        }
    }

    return { success, setSuccess, error, handleSubmit }
}
