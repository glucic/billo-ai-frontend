'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', error, ...props }, ref) => {
        const radius = 0
        const [visible, setVisible] = React.useState(false)

        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent) {
            const { left, top } = currentTarget.getBoundingClientRect()
            mouseX.set(clientX - left)
            mouseY.set(clientY - top)
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
                          var(--color-accent-light),
                          transparent 90%
                        )
                    `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="group/input rounded-[var(--input-radius)] p-[2px] transition-all duration-300">
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        `flex h-[var(--input-height)] w-full
                        rounded-[var(--input-radius)]
                        border
                        bg-[var(--input-bg)]/70
                        backdrop-blur-[var(--input-blur)]
                        px-[var(--input-padding-x)] py-[var(--input-padding-y)]
                        text-sm text-[var(--input-text)]
                        placeholder:text-[var(--input-placeholder)]
                        shadow-[var(--input-shadow)]
                        transition-all duration-300
                        hover:bg-[var(--accent-glow)]
                        focus-visible:ring-2
                        focus-visible:ring-[var(--color-accent)]
                        focus-visible:ring-offset-1
                        focus-visible:ring-offset-[var(--color-background)]
                        focus-visible:outline-none
                        disabled:cursor-not-allowed disabled:opacity-50`,
                        error
                            ? 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-red-100'
                            : 'border-[var(--input-border)]',
                        className,
                    )}
                    {...props}
                />
            </motion.div>
        )
    },
)

InputField.displayName = 'InputField'

export { InputField }
