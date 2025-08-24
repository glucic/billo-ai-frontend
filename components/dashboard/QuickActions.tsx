'use client'

function QuickActionButton({
    label,
    onClick,
}: {
    label: string
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] transition text-white font-medium shadow">
            {label}
        </button>
    )
}

export default function QuickActions({
    actions,
}: {
    actions: { label: string; onClick: () => void }[]
}) {
    return (
        <div className="flex gap-4">
            {actions.map((action, idx) => (
                <QuickActionButton
                    key={idx}
                    label={action.label}
                    onClick={action.onClick}
                />
            ))}
        </div>
    )
}
