'use client'

function MetricCard({
    label,
    value,
}: {
    label: string
    value: string | number
}) {
    return (
        <div className="flex flex-col items-start p-4 rounded-2xl bg-[var(--background)] border border-[var(--accent)] shadow-md w-full">
            <span className="text-sm text-[var(--accent-light)]">{label}</span>
            <span className="text-2xl font-bold">{value}</span>
        </div>
    )
}

export default function MetricsGrid({
    metrics,
}: {
    metrics: { label: string; value: string | number }[]
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((m, idx) => (
                <MetricCard key={idx} label={m.label} value={m.value} />
            ))}
        </div>
    )
}
