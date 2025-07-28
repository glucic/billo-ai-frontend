import React from 'react'
import { cn } from '@/lib/utils'

interface LabelInputContainerProps {
    children: React.ReactNode
    className?: string
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn('flex w-full flex-col space-y-2', className)}>
            {children}
        </div>
    )
}

export default LabelInputContainer
