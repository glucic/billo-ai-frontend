'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { motion, useAnimate } from 'motion/react'
import { Loader } from '@/components/ui/Loader'
import { CheckIcon } from '@/components/ui/CheckIcon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode
}

export const StatefulButton = ({
    className,
    children,
    ...props
}: ButtonProps) => {
    const [scope, animate] = useAnimate()

    const animateLoading = async () => {
        await animate(
            '.loader',
            {
                width: '20px',
                scale: 1,
                display: 'block',
            },
            { duration: 0.2 },
        )
    }

    const animateSuccess = async () => {
        await animate(
            '.loader',
            {
                width: '0px',
                scale: 0,
                display: 'none',
            },
            { duration: 0.2 },
        )
        await animate(
            '.check',
            {
                width: '20px',
                scale: 1,
                display: 'block',
            },
            { duration: 0.2 },
        )

        await animate(
            '.check',
            {
                width: '0px',
                scale: 0,
                display: 'none',
            },
            { delay: 2, duration: 0.2 },
        )
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        await animateLoading()
        await props.onClick?.(event)
        await animateSuccess()
    }

    const {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onAnimationStart,
        onAnimationEnd,
        ...buttonProps
    } = props

    return (
        <motion.button
            ref={scope}
            className={cn(
                'flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 font-medium text-white',
                className,
            )}
            {...buttonProps}
            onClick={handleClick}>
            <div className="flex items-center gap-2">
                <Loader />
                <CheckIcon />
                <span>{children}</span>
            </div>
        </motion.button>
    )
}
