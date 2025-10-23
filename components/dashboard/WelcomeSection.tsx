'use client'

export default function WelcomeSection({ userName }: { userName?: string }) {
    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-bold">
                Welcome back,{' '}
                <span className="text-[var(--color-accent)]">
                    {userName ?? 'Guest'}
                </span>
                !
            </h1>
        </section>
    )
}
