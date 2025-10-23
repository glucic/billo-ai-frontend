'use client'

import * as React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface StyledDatePickerProps {
    id: string
    value?: string | number
    onChange: (val: string) => void
    ariaLabel?: string
    placeholder?: string
    defaultToday?: boolean
    error?: boolean
}

export function CustomDatePicker({
    id,
    value,
    onChange,
    ariaLabel,
    placeholder,
    defaultToday = false,
    error = false,
}: StyledDatePickerProps) {
    const radius = 0
    const [visible, setVisible] = React.useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const formatInputValue = (input?: string) => {
        if (!input) return ''
        const digits = input.replace(/\D/g, '')
        if (digits.length <= 2) return digits
        if (digits.length <= 4)
            return `${digits.slice(0, 2)}/${digits.slice(2)}`
        if (digits.length <= 8)
            return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
    }

    const selectedDate =
        value && !isNaN(Date.parse(String(value)))
            ? new Date(value)
            : defaultToday
              ? new Date()
              : null

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
            className="group/input rounded-[var(--input-radius)] p-[2px] transition-all duration-300 relative">
            <div className="relative">
                <DatePicker
                    id={id}
                    selected={selectedDate}
                    onChange={date => {
                        if (date instanceof Date && !isNaN(date.getTime())) {
                            onChange(date.toISOString())
                        } else {
                            onChange('')
                        }
                    }}
                    onChangeRaw={e => {
                        const target = e?.target as HTMLInputElement | undefined
                        const rawValue = target?.value || ''
                        const formatted = formatInputValue(rawValue)
                        if (target) target.value = formatted
                        const [day, month, year] = formatted.split('/')
                        if (day && month && year?.length === 4) {
                            const parsed = new Date(
                                `${year}-${month}-${day}T00:00:00`,
                            )
                            if (!isNaN(parsed.getTime())) {
                                onChange(parsed.toISOString())
                            }
                        }
                    }}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={70}
                    todayButton="Today"
                    placeholderText={placeholder || 'dd/mm/yyyy'}
                    className={`flex h-[var(--input-height)] w-full
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
                        ${
                            error
                                ? 'border-[var(--error)] focus-visible:ring-[var(--error)] hover:bg-[var(--error)]/10'
                                : 'border-[var(--input-border)]'
                        }`}
                    popperClassName="z-[var(--z-dropdown)]"
                    calendarClassName="glass-calendar"
                    dayClassName={(date: Date) =>
                        date.toDateString() === new Date().toDateString()
                            ? 'bg-[var(--color-accent)] text-white rounded-full'
                            : 'hover:bg-[var(--accent-glow)] rounded-full'
                    }
                    popperPlacement="bottom-start"
                    portalId="datepicker-portal"
                    aria-label={ariaLabel}
                    aria-invalid={error}
                />
            </div>
        </motion.div>
    )
}
