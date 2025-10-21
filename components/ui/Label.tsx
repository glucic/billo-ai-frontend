'use client'
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

interface LabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean
}

const Label = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    LabelProps
>(({ className, children, required = false, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1',
            className,
        )}
        {...props}>
        {children}
        {required && (
            <span
                className="text-[var(--error)] text-base font-bold leading-none"
                aria-hidden="true">
                *
            </span>
        )}
    </LabelPrimitive.Root>
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
