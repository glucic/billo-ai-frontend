import { cn } from '@/lib/utils'

interface OrganisationLogoProps {
    name: string
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
}

export function OrganisationLogo({
    name,
    size = 'md',
    className,
}: OrganisationLogoProps) {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    // Generate a consistent color based on the organization name
    const colors = [
        'bg-blue-100 text-blue-700',
        'bg-green-100 text-green-700',
        'bg-purple-100 text-purple-700',
        'bg-orange-100 text-orange-700',
        'bg-pink-100 text-pink-700',
        'bg-cyan-100 text-cyan-700',
    ]

    const darkColors = [
        'dark:bg-blue-900/30 dark:text-blue-300',
        'dark:bg-green-900/30 dark:text-green-300',
        'dark:bg-purple-900/30 dark:text-purple-300',
        'dark:bg-orange-900/30 dark:text-orange-300',
        'dark:bg-pink-900/30 dark:text-pink-300',
        'dark:bg-cyan-900/30 dark:text-cyan-300',
    ]

    // Use the sum of character codes to pick a consistent color
    const colorIndex =
        name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        colors.length

    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-lg font-semibold',
                sizes[size],
                colors[colorIndex],
                darkColors[colorIndex],
                className,
            )}>
            {initials}
        </div>
    )
}
