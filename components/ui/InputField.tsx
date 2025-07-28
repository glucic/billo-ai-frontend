import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    id: string
    disabled?: boolean
    className?: string
}

export const InputField: React.FC<InputProps> = ({
    label,
    id,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium mb-1 text-[var(--color-foreground)]">
                    {label}
                </label>
            )}
            <input
                id={id}
                disabled={disabled}
                {...props}
                className={`${className} w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition`}
            />
        </div>
    )
}

export default InputField
