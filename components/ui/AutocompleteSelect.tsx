'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { ChevronDownIcon } from './ChevronDownIcon'
import { Loader2 } from 'lucide-react'

interface Suggestion {
    label: string
    value: string | number
}

interface AutocompleteSelectionProps {
    options: Suggestion[]
    value: string
    onChange: (val: string) => void
    placeholder?: string
    className?: string
    loading?: boolean
    error: boolean
}

export const AutocompleteSelection = React.forwardRef<
    HTMLDivElement,
    AutocompleteSelectionProps
>(
    (
        { options, value, onChange, placeholder, className, loading, error },
        ref,
    ) => {
        const [open, setOpen] = React.useState(false)
        const [highlightedIndex, setHighlightedIndex] = React.useState(0)
        const radius = 0
        const [visible, setVisible] = React.useState(false)
        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)
        const containerRef = React.useRef<HTMLDivElement>(null)

        const filtered = React.useMemo(() => {
            if (!value) return options
            return options.filter(o =>
                o.label.toLowerCase().includes(value.toLowerCase()),
            )
        }, [value, options])

        React.useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (!containerRef.current?.contains(e.target as Node))
                    setOpen(false)
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () =>
                document.removeEventListener('mousedown', handleClickOutside)
        }, [])

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent<HTMLDivElement>) {
            const { left, top } = currentTarget.getBoundingClientRect()
            mouseX.set(clientX - left)
            mouseY.set(clientY - top)
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!open || filtered.length === 0) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setHighlightedIndex(prev => (prev + 1) % filtered.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setHighlightedIndex(prev =>
                    prev === 0 ? filtered.length - 1 : prev - 1,
                )
            } else if (e.key === 'Enter') {
                e.preventDefault()
                const selected = filtered[highlightedIndex]
                if (selected) {
                    onChange(selected.label)
                    setOpen(false)
                }
            } else if (e.key === 'Escape') {
                setOpen(false)
            }
        }

        const handleSelect = (option: Suggestion) => {
            onChange(option.label)
            setOpen(false)
        }

        return (
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
            var(--color-accent),
            transparent 90%
          )
        `,
                }}
                className={cn(
                    'relative rounded-lg p-[2px] cursor-pointer transition duration-300',
                    className,
                )}>
                <div
                    className={cn(
                        `flex items-center justify-between h-[var(--input-height)] w-full
          border border-[var(--input-border)]
          px-[var(--input-padding-x)] py-[var(--input-padding-y)]
          bg-[var(--input-bg)]/70
          backdrop-blur-[var(--input-blur)]
          hover:bg-[var(--input-bg)]/100
          rounded-[var(--input-radius)] 
          shadow-[var(--input-shadow)]
          text-sm text-[var(--input-text)]
          placeholder:text-[var(--input-placeholder)]
          transition-all duration-300
          focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
          focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-background)]
          focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50`,
                        error
                            ? 'border-[var(--error)] focus-visible:ring-[var(--error)] focus-visible:ring-offset-[var(--error)]/50 hover:bg-[var(--error)]/10'
                            : 'border-[var(--input-border)]',
                    )}
                    onClick={() => setOpen(o => !o)}>
                    <input
                        type="text"
                        value={value}
                        onChange={e => {
                            onChange(e.target.value)
                            setOpen(true)
                        }}
                        onFocus={() => setOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder || 'Select...'}
                        className="flex-1 bg-transparent outline-none"
                    />
                    {loading && (
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    )}
                </div>

                {open && filtered.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-full bg-[var(--input-bg)] backdrop-blur-[var(--input-blur)] rounded-[var(--input-radius)] shadow-[var(--input-shadow)] max-h-60 overflow-auto">
                        {filtered.map((opt, idx) => (
                            <li
                                key={opt.value}
                                className={cn(
                                    'px-[var(--input-padding-x)] py-[var(--input-padding-y)] cursor-pointer transition',
                                    highlightedIndex === idx
                                        ? 'bg-[var(--accent-glow)]'
                                        : 'hover:bg-[var(--accent-glow)]',
                                )}
                                onMouseDown={() => handleSelect(opt)}
                                onMouseEnter={() => setHighlightedIndex(idx)}>
                                {opt.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </motion.div>
        )
    },
)

AutocompleteSelection.displayName = 'AutocompleteSelection'
