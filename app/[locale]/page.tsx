import { Navbar } from '@/components/common'
import { Hero, Features } from '@/components/landing'

export default function LandingPage() {
    return (
        <main id="landing-page" className="h-screen overflow-auto">
            <Navbar />
            <Hero />
            <Features />
        </main>
    )
}
