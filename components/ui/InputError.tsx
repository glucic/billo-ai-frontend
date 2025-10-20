import React from 'react'

type InputErrorProps = {
    message?: string
    messages?: string[]
    id?: string
    className?: string
}

export function InputError({
    message,
    messages,
    id,
    className,
}: InputErrorProps) {
    if (!message && !messages?.length) return null

    return (
        <div
            id={id}
            role="alert"
            className={`text-sm text-[var(--error)] ${className || ''}`}>
            {message && <p>{message}</p>}
            {messages && messages.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
    )
}
