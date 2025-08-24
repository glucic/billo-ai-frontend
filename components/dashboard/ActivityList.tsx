'use client'

function ActivityItem({
    description,
    date,
}: {
    description: string
    date: string
}) {
    return (
        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-[var(--accent-glow)] transition">
            <span>{description}</span>
            <span className="text-sm text-gray-400">{date}</span>
        </div>
    )
}

export default function ActivityList({
    activities,
}: {
    activities: { description: string; date: string }[]
}) {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <div className="flex flex-col space-y-2">
                {activities.map((a, idx) => (
                    <ActivityItem
                        key={idx}
                        description={a.description}
                        date={a.date}
                    />
                ))}
            </div>
        </section>
    )
}
