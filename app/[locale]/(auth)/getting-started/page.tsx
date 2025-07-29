'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import {
    StepCompanyName,
    StepCompanyAbout,
    StepCompanyDetails,
} from '@/components/auth/getting-started'

import { StatefulButton } from '@/components/ui'
export default function GettingStartedPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [step, setStep] = useState(0)

    const [companyName, setCompanyName] = useState('')
    const [companyAbout, setCompanyAbout] = useState('')
    const [details, setDetails] = useState({
        email: '',
        phone: '',
        workers: 0,
    })

    const next = () => setStep(prev => prev + 1)
    const back = () => setStep(prev => prev - 1)
    const handleSubmit = async () => {
        setLoading(true)

        try {
            await new Promise(res => setTimeout(res, 1000))
            router.push('/dashboard')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="h-screen flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <StepCompanyName
                            value={companyName}
                            onChange={setCompanyName}
                            step={step}
                        />
                    )}
                    {step === 1 && (
                        <StepCompanyAbout
                            value={companyAbout}
                            onChange={setCompanyAbout}
                            step={step}
                        />
                    )}
                    {step === 2 && (
                        <StepCompanyDetails
                            email={details.email}
                            phone={details.phone}
                            workers={details.workers}
                            onChange={(field, value) =>
                                setDetails({ ...details, [field]: value })
                            }
                            step={step}
                        />
                    )}
                </AnimatePresence>

                <div className="flex space-x-4 mt-8">
                    {step > 0 && (
                        <StatefulButton onClick={back}>Back</StatefulButton>
                    )}
                    {step < 2 && (
                        <StatefulButton onClick={next}>Next</StatefulButton>
                    )}
                    {step === 2 && (
                        <StatefulButton onClick={handleSubmit}>
                            Finish
                        </StatefulButton>
                    )}
                </div>
            </div>
        </main>
    )
}
