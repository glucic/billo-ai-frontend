import { cn } from '@/lib/utils'

interface DefaultAvatarProps {
    name: string
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
}

export function DefaultAvatar({
    name,
    size = 'md',
    className,
}: DefaultAvatarProps) {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    const colors = [
        'bg-blue-400 text-blue-900',
        'bg-green-400 text-green-900',
        'bg-purple-400 text-purple-900',
        'bg-orange-400 text-orange-900',
        'bg-pink-400 text-pink-900',
        'bg-cyan-400 text-cyan-900',
    ]

    const darkColors = [
        'dark:bg-blue-900/30 dark:text-blue-300',
        'dark:bg-green-900/30 dark:text-green-300',
        'dark:bg-purple-900/30 dark:text-purple-300',
        'dark:bg-orange-900/30 dark:text-orange-300',
        'dark:bg-pink-900/30 dark:text-pink-300',
        'dark:bg-cyan-900/30 dark:text-cyan-300',
    ]

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
