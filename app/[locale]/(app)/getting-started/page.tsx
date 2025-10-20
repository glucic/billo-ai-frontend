'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import {
    StepCompanyName,
    StepCompanyAbout,
    StepCompanyDetails,
} from '@/components/getting-started'
import { StatefulButton } from '@/components/ui'
import {
    OrganisationWizardProvider,
    useOrganisationWizard,
} from '@/context/GettingStartedWizardContext'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function GettingStartedContent() {
    const {
        step,
        nextStep,
        previousStep,
        companyName,
        setCompanyName,
        companyDescription,
        setCompanyDescription,
        companyDetails,
        setCompanyDetails,
        errors,
        isLoading,
        handleSubmit,
    } = useOrganisationWizard()

    return (
        <main
            id="getting-started"
            className="min-h-screen flex items-center justify-center">
            <div className="h-screen flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <StepCompanyName
                            value={companyName}
                            onChange={setCompanyName}
                            step={step}
                            errors={{ name: errors.name }}
                        />
                    )}
                    {step === 1 && (
                        <StepCompanyAbout
                            value={companyDescription}
                            onChange={setCompanyDescription}
                            step={step}
                            errors={{ description: errors.description }}
                        />
                    )}
                    {step === 2 && (
                        <StepCompanyDetails
                            company_email={companyDetails.email}
                            company_phone={companyDetails.phone}
                            workers={companyDetails.employeeCount}
                            street={companyDetails.street}
                            city={companyDetails.city}
                            zip={companyDetails.zip}
                            region={companyDetails.region}
                            onChange={(field, value) => {
                                const mapping: Record<
                                    string,
                                    keyof typeof companyDetails
                                > = {
                                    company_email: 'email',
                                    company_phone: 'phone',
                                    workers: 'employeeCount',
                                    street: 'street',
                                    city: 'city',
                                    zip: 'zip',
                                    region: 'region',
                                }

                                const mappedField =
                                    mapping[field] ||
                                    (field as keyof typeof companyDetails)
                                setCompanyDetails(mappedField, value)
                            }}
                            step={step}
                            errors={errors}
                        />
                    )}
                </AnimatePresence>

                <div className="flex space-x-4 mt-8">
                    {step > 0 && (
                        <StatefulButton
                            onClick={previousStep}
                            loading={isLoading}>
                            <ArrowLeft />
                        </StatefulButton>
                    )}
                    {step < 2 && (
                        <StatefulButton onClick={nextStep} loading={isLoading}>
                            <ArrowRight />
                        </StatefulButton>
                    )}
                    {step === 2 && (
                        <StatefulButton
                            onClick={handleSubmit}
                            loading={isLoading}>
                            Finish
                        </StatefulButton>
                    )}
                </div>
            </div>
        </main>
    )
}

export default function GettingStartedPage() {
    return (
        <OrganisationWizardProvider>
            <GettingStartedContent />
        </OrganisationWizardProvider>
    )
}
