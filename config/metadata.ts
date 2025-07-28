import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
    title: 'BilloAI – AI-Powered Invoice Generation',
    description:
        'Create professional invoices in seconds using AI. Generate, customize, and export invoices effortlessly with BilloAI.',
    keywords: [
        'AI Invoices',
        'Invoice Generator',
        'Billing Automation',
        'PDF Invoice',
        'BilloAI',
        'Invoice App',
        'Business Tools',
    ],
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? 'https://billoai.app',
    ),
    openGraph: {
        title: 'BilloAI – AI-Powered Invoice Generation',
        description:
            'Generate professional invoices in seconds with BilloAI. Simplify your billing process using AI.',
        url: 'https://billoai.app',
        siteName: 'BilloAI',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'BilloAI Invoice Generator',
            },
        ],
    },
}
