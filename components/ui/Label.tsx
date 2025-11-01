'use client'
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'
import { Tooltip } from './Tooltip'

interface LabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean
    tooltipContent?: React.ReactNode
}

const Label = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    LabelProps
>(
    (
        { className, children, required = false, tooltipContent, ...props },
        ref,
    ) => (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 relative',
                className,
            )}
            {...props}>
            <span className="flex items-center gap-1 w-full">
                {children}
                {required && (
                    <span
                        className="text-[var(--error)] text-base font-bold leading-none"
                        aria-hidden="true">
                        *
                    </span>
                )}
                {tooltipContent && (
                    <span className="ml-auto flex">
                        <Tooltip content={tooltipContent} />
                    </span>
                )}
            </span>
        </LabelPrimitive.Root>
    ),
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
