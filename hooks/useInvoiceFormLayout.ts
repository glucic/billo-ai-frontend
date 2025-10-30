'use client'

import React, { useState } from 'react'

interface UseInvoiceFormLayoutOptions {
    mode: 'create' | 'edit'
    saveInvoice: () => Promise<{ success: boolean }>
    onSuccessRedirect?: () => void
}

export function useInvoiceFormLayout({
    mode,
    saveInvoice,
    onSuccessRedirect,
}: UseInvoiceFormLayoutOptions) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [showPreview, setShowPreview] = useState(true)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess(false)
        setError(false)

        const res = await saveInvoice()
        if (res.success) {
            setSuccess(true)
            if (onSuccessRedirect) setTimeout(onSuccessRedirect, 1200)
        } else {
            setError(true)
        }
    }

    return {
        success,
        setSuccess,
        error,
        showPreview,
        setShowPreview,
        handleSubmit,
    }
}
