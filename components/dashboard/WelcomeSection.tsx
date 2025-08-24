'use client'

export default function WelcomeSection({
    userName,
    stepsCompleted,
    totalSteps,
}: {
    userName: string
    stepsCompleted: number
    totalSteps: number
}) {
    const onboardingPercent = (stepsCompleted / totalSteps) * 100

    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-bold">
                Welcome back,{' '}
                <span className="text-[var(--color-accent)]">{userName}</span>!
            </h1>
            <p className="text-lg">
                You’ve completed{' '}
                <strong>
                    {stepsCompleted}/{totalSteps}
                </strong>{' '}
                steps to fully set up your company profile.
            </p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[var(--color-accent)] transition-all"
                    style={{ width: `${onboardingPercent}%` }}
                />
            </div>
        </section>
    )
}
