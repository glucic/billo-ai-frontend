'use client'

import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrganisations } from '@/hooks/useOrganisations'
import type { BackendErrors } from '@/lib/errorUtils'

const defaultCompanyDetails = {
    email: '',
    phone: '',
    employeeCount: 1,
    street: '',
    city: '',
    zip: '',
    region: '',
}

type OrganisationWizardContextType = {
    step: number
    nextStep: () => void
    previousStep: () => void
    companyName: string
    setCompanyName: (name: string) => void
    companyDescription: string
    setCompanyDescription: (description: string) => void
    companyDetails: typeof defaultCompanyDetails
    setCompanyDetails: (
        field: keyof typeof defaultCompanyDetails,
        value: string | number,
    ) => void
    errors: BackendErrors
    isLoading: boolean
    handleSubmit: () => Promise<void>
}

const OrganisationWizardContext = createContext<
    OrganisationWizardContextType | undefined
>(undefined)

export function OrganisationWizardProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [step, setStep] = useState(0)
    const [companyName, setCompanyName] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')
    const [companyDetails, setCompanyDetails] = useState(defaultCompanyDetails)

    const { handleCreate, fieldErrors, loading } = useOrganisations()
    const router = useRouter()

    const nextStep = () => setStep(prev => prev + 1)
    const previousStep = () => setStep(prev => Math.max(prev - 1, 0))

    const handleDetailsChange = (
        field: keyof typeof defaultCompanyDetails,
        value: string | number,
    ) => {
        setCompanyDetails(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        try {
            await handleCreate({
                name: companyName,
                description: companyDescription,
                email: companyDetails.email,
                phone: companyDetails.phone,
                employee_count: companyDetails.employeeCount,
                street: companyDetails.street,
                city: companyDetails.city,
                zip: companyDetails.zip,
                region: companyDetails.region,
            })
            router.push('/dashboard')
        } catch (error) {
            console.error('Failed to create organisation:', error)
        }
    }

    const value: OrganisationWizardContextType = {
        step,
        nextStep,
        previousStep,
        companyName,
        setCompanyName,
        companyDescription,
        setCompanyDescription,
        companyDetails,
        setCompanyDetails: handleDetailsChange,
        errors: fieldErrors,
        isLoading: loading,
        handleSubmit,
    }

    return (
        <OrganisationWizardContext.Provider value={value}>
            {children}
        </OrganisationWizardContext.Provider>
    )
}

export const useOrganisationWizard = () => {
    const context = useContext(OrganisationWizardContext)
    if (!context) {
        throw new Error(
            'useOrganisationWizard must be used within OrganisationWizardProvider',
        )
    }
    return context
}
