import { Navbar } from '@/components/common'
import { Hero, Features } from '@/components/landing'
import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
    title: 'BilloAI – Login or Register',
    description:
        'Create professional invoices in seconds using AI. Generate, customize, and export invoices effortlessly with BilloAI.',
}

export default function LandingPage() {
    return (
        <main id="landing-page" className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
        </main>
    )
}
