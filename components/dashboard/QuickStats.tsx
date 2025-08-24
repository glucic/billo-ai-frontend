'use client'

export default function QuickStats({
    stats,
}: {
    stats: { label: string; value: number; color: string }[]
}) {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl bg-gray-800 shadow-md border border-gray-700 flex flex-col items-center space-y-2">
                        <span className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </span>
                        <span className="text-sm text-gray-300">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
