import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (saved) setTheme(saved)
    }, [])

    const toggleTheme = () =>
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] transition">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    )
}
