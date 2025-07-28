'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { CheckCircle, FileText, CheckCircle2 } from 'lucide-react'

export default function Features() {
    const t = useTranslations('LandingPage.Features')

    const features = [
        {
            icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
            title: t('feature1.title'),
            description: t('feature1.description'),
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-500" />,
            title: t('feature2.title'),
            description: t('feature2.description'),
        },
        {
            icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />,
            title: t('feature3.title'),
            description: t('feature3.description'),
        },
    ]

    return (
        <section
            id="features"
            className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center bg-[var(--background)]">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="text-center text-3xl font-bold md:text-5xl">
                {t('heading')}
            </motion.h2>

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center rounded-2xl bg-white/5 p-6 shadow-md backdrop-blur-md dark:bg-black/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        {feature.icon}
                        <h3 className="mt-4 text-xl font-semibold">
                            {feature.title}
                        </h3>
                        <p className="mt-2 text-center text-neutral-600 dark:text-neutral-400">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
