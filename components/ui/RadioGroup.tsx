'use client'

import * as React from 'react'

interface RadioGroupProps {
    value: string
    onValueChange: (value: string) => void
    className?: string
    children: React.ReactNode
}

export function RadioGroup({
    value,
    onValueChange,
    className,
    children,
}: RadioGroupProps) {
    return (
        <div
            role="radiogroup"
            className={className}
            onKeyDown={e => {
                const radios = React.Children.toArray(children).filter(
                    React.isValidElement,
                ) as React.ReactElement<RadioGroupItemProps>[]
                const index = radios.findIndex(r => r.props.value === value)
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault()
                    const next = radios[(index + 1) % radios.length]
                    onValueChange(next.props.value)
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    const prev =
                        radios[(index - 1 + radios.length) % radios.length]
                    onValueChange(prev.props.value)
                }
            }}>
            {React.Children.map(children, child => {
                if (!React.isValidElement<RadioGroupItemProps>(child))
                    return null
                return React.cloneElement(child, {
                    checked: child.props.value === value,
                    onChange: () => onValueChange(child.props.value),
                })
            })}
        </div>
    )
}

interface RadioGroupItemProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
    id?: string
    checked?: boolean
    onChange?: () => void
}

export function RadioGroupItem({
    id,
    value,
    checked,
    onChange,
    className = '',
    ...props
}: RadioGroupItemProps) {
    return (
        <label
            htmlFor={id}
            className="flex items-center cursor-pointer select-none">
            <input
                type="radio"
                id={id}
                name="invoiceType"
                value={value}
                checked={checked}
                onChange={onChange}
                className={`appearance-none w-4 h-4 border-2 border-gray-400 rounded-full mr-2 
                ${checked ? 'border-blue-500 bg-blue-500' : 'bg-white'} 
                transition-all duration-150`}
                {...props}
            />
        </label>
    )
}
