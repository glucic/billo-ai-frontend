'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'

export type TextAreaProps =
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        error?: boolean
        minHeight?: number
        maxHeight?: number
    }

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, error, minHeight = 120, maxHeight = 300, ...props }, ref) => {
        const radius = 0
        const [visible, setVisible] = React.useState(false)

        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent<HTMLDivElement>) {
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
                <textarea
                    ref={ref}
                    style={{
                        minHeight: minHeight,
                        maxHeight: maxHeight,
                        overflowY: 'auto',
                    }}
                    className={cn(
                        `flex w-full
                        rounded-[var(--input-radius)]
                        border
                        bg-[var(--input-bg)]/70
                        backdrop-blur-[var(--input-blur)]
                        px-[var(--input-padding-x)] py-[var(--input-padding-y)]
                        text-sm text-[var(--input-text)]
                        placeholder:text-[var(--input-placeholder)]
                        shadow-[var(--input-shadow)]
                        transition-all duration-300
                        hover:bg-[var(--input-bg)]/100
                        focus-visible:ring-2
                        focus-visible:ring-[var(--color-accent)]
                        focus-visible:ring-offset-1
                        focus-visible:ring-offset-[var(--color-background)]
                        focus-visible:outline-none
                        disabled:cursor-not-allowed disabled:opacity-50
                        resize-none`,
                        error
                            ? 'border-[var(--error)] focus-visible:ring-[var(--error)] focus-visible:ring-offset-[var(--error)]/50 hover:bg-[var(--error)]/10'
                            : 'border-[var(--input-border)]',
                        className,
                    )}
                    {...props}
                />
            </motion.div>
        )
    },
)

TextAreaField.displayName = 'TextAreaField'

export { TextAreaField }
