'use client'

import { motion } from 'framer-motion'
import React from 'react'

export function WizardStepTransition({
    children,
    step,
}: {
    children: React.ReactNode
    step: number
}) {
    return (
        <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center space-y-6">
            {children}
        </motion.div>
    )
}
