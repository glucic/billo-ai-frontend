import OrganisationDashboard from '@/components/organisations/OrganisationDashboard'

export default function OrganisationPage() {
    return (
        <main className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <OrganisationDashboard />
        </main>
    )
}
