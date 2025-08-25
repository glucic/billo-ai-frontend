import React, { createContext, useContext, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'

type OrganisationWizardContextType = {
    step: number
    nextStep: () => void
    previousStep: () => void
    companyName: string
    setCompanyName: (name: string) => void
    companyDescription: string
    setCompanyDescription: (description: string) => void
    companyDetails: {
        email: string
        phone: string
        employeeCount: number
    }
    setCompanyDetails: (field: string, value: string | number) => void
    errors: Record<string, string[]>
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
    const [companyDetails, setCompanyDetails] = useState({
        email: '',
        phone: '',
        employeeCount: 1,
    })
    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [isLoading, setIsLoading] = useState(false)

    const { createOrganisation } = useAuth()
    const router = useRouter()

    const nextStep = () => setStep(prev => prev + 1)
    const previousStep = () => setStep(prev => prev - 1)

    const handleDetailsChange = (field: string, value: string | number) => {
        setCompanyDetails(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await createOrganisation({
                name: companyName,
                description: companyDescription,
                email: companyDetails.email,
                phone: companyDetails.phone,
                employee_count: companyDetails.employeeCount,
                setErrors,
            })
            router.push('/dashboard')
        } catch (error) {
            console.error('Failed to create organisation:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        step,
        nextStep,
        previousStep,
        companyName,
        setCompanyName,
        companyDescription,
        setCompanyDescription,
        companyDetails,
        setCompanyDetails: handleDetailsChange,
        errors,
        isLoading,
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
