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
        const radius = 100
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
              #3b82f6,
              transparent 80%
            )
          `,
                }}
                className={cn(
                    'relative rounded-lg p-[2px] cursor-pointer transition duration-300',
                    className,
                )}>
                <div
                    className="flex items-center justify-between h-10 px-3 bg-gray-50 dark:bg-zinc-800 rounded-md shadow-input"
                    onClick={() => setOpen(o => !o)}>
                    <span className={cn(!selected && 'text-neutral-400')}>
                        {selected?.label || placeholder || 'Select...'}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
                </div>

                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-full bg-gray-50 dark:bg-zinc-800 rounded-md shadow-lg max-h-60 overflow-auto">
                        {options.map(opt => (
                            <li
                                key={opt.value}
                                className="px-3 py-2 hover:bg-[var(--accent-glow)] dark:hover:bg-[var(--accent-glow)]"
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
