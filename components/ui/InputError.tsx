export function InputError({ messages }: { messages?: string[] }) {
    if (!messages || messages.length === 0) return null
    return (
        <div className="mt-1 text-sm text-red-600">
            {messages.map((msg, i) => (
                <p key={i}>{msg}</p>
            ))}
        </div>
    )
}
