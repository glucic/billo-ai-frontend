'use client'

import React, { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    // On mount, read preferred theme from localStorage or system
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as
            | 'light'
            | 'dark'
            | null
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
            setTheme(prefersDark ? 'dark' : 'light')
        }
    }, [])

    // Apply theme attribute and save preference
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    // Toggle between light and dark
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] transition"
            aria-label="Toggle Dark/Light Mode">
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    )
}
