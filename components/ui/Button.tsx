'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'motion/react'

const buttonVariants = cva(
    'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] shadow-sm',
                secondary:
                    'bg-[var(--secondary-background)]/70 text-[var(--color-foreground)] hover:bg-[var(--accent-glow)] border border-[var(--accent)]/20',
                outline:
                    'border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent)] hover:text-white',
                ghost: 'text-[var(--color-foreground)] hover:bg-[var(--accent-glow)]',
                destructive:
                    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
                icon: 'bg-transparent rounded-full p-2 hover:pointer-cursor hover:bg-[var(--accent-glow)]',
            },
            size: {
                sm: 'h-8 px-3 text-sm',
                md: 'h-10 px-4 text-sm',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10 p-0',
            },
            animated: {
                true: 'hover:scale-[1.02] active:scale-[0.98]',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
            animated: true,
        },
    },
)

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
    className?: string
    motionEffect?: boolean
    children?: React.ReactNode
    href?: string
}

type RegularButtonProps = BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        motionEffect?: false
    }

type MotionButtonProps = BaseButtonProps &
    HTMLMotionProps<'button'> & {
        motionEffect: true
    }

type ButtonProps = RegularButtonProps | MotionButtonProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            className,
            variant,
            size,
            animated,
            motionEffect,
            href,
            children,
            ...rest
        } = props

        const classes = cn(
            buttonVariants({ variant, size, animated }),
            className,
        )

        const isExternal = href?.startsWith('http')

        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            href ? (
                isExternal ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block">
                        {children}
                    </a>
                ) : (
                    <Link href={href} className="inline-block">
                        {children}
                    </Link>
                )
            ) : (
                <>{children}</>
            )

        if (motionEffect) {
            return (
                <Wrapper>
                    <motion.button
                        ref={ref}
                        className={classes}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        {...(rest as HTMLMotionProps<'button'>)}>
                        {children}
                    </motion.button>
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                <button
                    ref={ref}
                    className={classes}
                    {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                    {children}
                </button>
            </Wrapper>
        )
    },
)

Button.displayName = 'Button'
