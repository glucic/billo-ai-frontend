'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { ChevronDownIcon } from './ChevronDownIcon'

interface SelectFieldProps {
    options: { label: string; value: string | number }[]
    value: string | number | null
    onChange: (value: any) => void
    placeholder?: string
    className?: string
}

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
    ({ options, value, onChange, placeholder, className }, ref) => {
        const [open, setOpen] = React.useState(false)
        const radius = 0
        const [visible, setVisible] = React.useState(false)
        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            const { left, top } = currentTarget.getBoundingClientRect()
            mouseX.set(clientX - left)
            mouseY.set(clientY - top)
        }

        const selected = options.find(o => o.value === value)

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
                            var(--color-accent),
                            transparent 90%
                        )
                    `,
                }}
                className={cn(
                    'relative rounded-lg p-[2px] cursor-pointer transition duration-300',
                    className,
                )}>
                <div
                    className={cn(
                        `flex items-center justify-between h-[var(--input-height)] w-full
                        border border-[var(--input-border)]
                        px-[var(--input-padding-x)] py-[var(--input-padding-y)]
                        bg-[var(--input-bg)]/70
                        backdrop-blur-[var(--input-blur)]
                        hover:bg-[var(--accent-glow)]
                        rounded-[var(--input-radius)] 
                        shadow-[var(--input-shadow)]
                        text-sm text-[var(--input-text)]
                        placeholder:text-[var(--input-placeholder)]
                        transition-all duration-300
                        focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                        focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-background)]
                        focus-visible:outline-none
                        disabled:cursor-not-allowed disabled:opacity-50`,
                        className,
                    )}
                    onClick={() => setOpen(o => !o)}>
                    <span
                        className={cn(
                            !selected && 'text-[var(--input-placeholder)]',
                        )}>
                        {selected?.label || placeholder || 'Select...'}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
                </div>

                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute z-10 mt-1 w-full bg-[var(--input-bg)] backdrop-blur-[var(--input-blur)]
                            rounded-[var(--input-radius)] shadow-[var(--input-shadow)] max-h-60 overflow-auto`}>
                        {options.map(opt => (
                            <li
                                key={opt.value}
                                className="px-[var(--input-padding-x)] py-[var(--input-padding-y)] hover:bg-[var(--accent-glow)] cursor-pointer"
                                onClick={() => {
                                    onChange(opt.value)
                                    setOpen(false)
                                }}>
                                {opt.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </motion.div>
        )
    },
)

SelectField.displayName = 'SelectField'
