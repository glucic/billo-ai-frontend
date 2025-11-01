'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import {
    StepCompanyName,
    StepCompanyAbout,
    StepCompanyDetails,
} from '@/components/getting-started'
import { Button, StatefulButton } from '@/components/ui'
import {
    OrganisationWizardProvider,
    useOrganisationWizard,
} from '@/context/GettingStartedWizardContext'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/Card'

function GettingStartedContentNavigation({
    step,
    previousStep,
    nextStep,
    handleSubmit,
    isLoading,
}: {
    step: number
    previousStep: () => void
    nextStep: () => void
    handleSubmit: () => void
    isLoading: boolean
}) {
    const t = useTranslations('Organisation.GettingStarted')

    return (
        <div className="flex justify-center gap-4 mt-8">
            {step > 0 && (
                <Button
                    variant="icon"
                    className="rounded-full"
                    size="lg"
                    onClick={previousStep}>
                    <ArrowLeft className="mr-1 h-5 w-5" />
                    {t('back', { default: 'Zurück' })}
                </Button>
            )}
            {step < 2 && (
                <Button
                    variant="icon"
                    className="rounded-full"
                    size="lg"
                    onClick={nextStep}>
                    {t('next', { default: 'Weiter' })}
                    <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
            )}
            {step === 2 && (
                <StatefulButton
                    className="rounded-full px-6"
                    onClick={handleSubmit}
                    loading={isLoading}>
                    {t('finish', { default: 'Fertigstellen' })}
                </StatefulButton>
            )}
        </div>
    )
}

function GettingStartedContent() {
    const t = useTranslations('Organisation.GettingStarted')
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
            className="min-h-screen flex flex-col items-center">
            <div className="w-2xl fixed top-10 z-50 p-6 bg-transparent">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                        style={{ width: `${((step + 1) / 3) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center w-full p-6 pt-24">
                <Card className="max-w-3xl w-full p-10 backdrop-blur-md border-none">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <div key="step-0">
                                <StepCompanyName
                                    value={companyName}
                                    onChange={setCompanyName}
                                    step={step}
                                    errors={{ name: errors.name }}
                                />
                                <GettingStartedContentNavigation
                                    step={step}
                                    previousStep={previousStep}
                                    nextStep={nextStep}
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}

                        {step === 1 && (
                            <div key="step-1">
                                <StepCompanyAbout
                                    value={companyDescription}
                                    onChange={setCompanyDescription}
                                    step={step}
                                    errors={{ description: errors.description }}
                                />
                                <GettingStartedContentNavigation
                                    step={step}
                                    previousStep={previousStep}
                                    nextStep={nextStep}
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div key="step-2">
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
                                <GettingStartedContentNavigation
                                    step={step}
                                    previousStep={previousStep}
                                    nextStep={nextStep}
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}
                    </AnimatePresence>
                </Card>
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
