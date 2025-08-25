'use client'

import { useTranslations } from 'next-intl'
import WelcomeSection from '@/components/dashboard/WelcomeSection'
import QuickStats from '@/components/dashboard/QuickStats'
import MetricsGrid from '@/components/dashboard/MetricsGrid'

import QuickActions from '@/components/dashboard/QuickActions'
import ActivityList from '@/components/dashboard/ActivityList'
import OrganisationDashboard from '@/components/organisations/OrganisationDashboard'

export default function DashboardPage() {
    const t = useTranslations('Dashboard')

    const user = { name: 'Gabriel', onboarding: { completed: 2, total: 3 } }

    const quickStats = [
        { label: 'Pending Invoices', value: 5, color: 'text-yellow-400' },
        { label: 'Paid Invoices', value: 12, color: 'text-green-400' },
        { label: 'Upcoming Meetings', value: 3, color: 'text-blue-400' },
    ]

    const metrics = [
        { label: t('metrics.totalCompanies'), value: 3 },
        { label: t('metrics.activeUsers'), value: 15 },
        { label: t('metrics.invoicesGenerated'), value: 42 },
    ]

    const activities = [
        {
            description: t('activity.addedCompany', { name: 'Acme Inc.' }),
            date: '2h ago',
        },
        {
            description: t('activity.createdInvoice', { name: 'Beta LLC' }),
            date: 'Yesterday',
        },
        { description: t('activity.updatedProfile'), date: '2 days ago' },
    ]

    return (
        <main
            id="dashboard"
            className="flex flex-col min-h-screen text-[var(--color-foreground)] p-6 space-y-8">
            <WelcomeSection
                userName={user.name}
                stepsCompleted={user.onboarding.completed}
                totalSteps={user.onboarding.total}
            />

            <QuickStats stats={quickStats} />

            <MetricsGrid metrics={metrics} />

            <QuickActions
                actions={[
                    {
                        label: t('actions.addCompany'),
                        onClick: () => alert('Add Company'),
                    },
                    {
                        label: t('actions.createInvoice'),
                        onClick: () => alert('Create Invoice'),
                    },
                    {
                        label: t('actions.viewReports'),
                        onClick: () => alert('View Reports'),
                    },
                ]}
            />

            <ActivityList activities={activities} />
        </main>
    )
}
