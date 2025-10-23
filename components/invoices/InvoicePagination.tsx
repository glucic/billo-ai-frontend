'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface PaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

interface InvoicePaginationProps {
    page: number
    onPageChange: (page: number) => void
    rowsPerPage: number
    onRowsPerPageChange: (rows: number) => void
    pagination: PaginationMeta | null
}
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function InvoicePagination({
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    pagination,
}: InvoicePaginationProps) {
    const invoicesT = useTranslations('Invoices')

    if (!pagination) return null

    const totalPages = pagination.last_page
    const maxButtons = 7
    const startPage = Math.max(1, page - Math.floor(maxButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxButtons - 1)

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <Link
                key={i}
                href={`?page=${i}`}
                onClick={e => {
                    e.preventDefault()
                    onPageChange(i)
                }}
                className={`px-2 text-base font-medium transition-all duration-200 ${
                    i === page
                        ? 'text-[var(--text-muted)] font-semibold scale-110'
                        : 'text-[var(--color-foreground)] hover:scale-105'
                }`}>
                {i}
            </Link>,
        )
    }

    return (
        <div className="flex items-center justify-between border-t border-[var(--divider)] pt-4 text-[var(--color-foreground)]">
            <div className="flex items-center gap-2 text-sm">
                <span>{invoicesT('rowsPerPage')}</span>
                <select
                    className="border border-[var(--border-color)] rounded-md bg-[var(--secondary-background)] text-[var(--color-foreground)] text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition"
                    value={rowsPerPage}
                    onChange={e => onRowsPerPageChange(Number(e.target.value))}>
                    {[10, 20, 50, 100].map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="font-bold hover:scale-110 transition-all disabled:opacity-40 text-[var(--color-foreground)]">
                    <FaArrowLeft />
                </button>

                {pages}

                <button
                    disabled={page === pagination.last_page}
                    onClick={() => onPageChange(page + 1)}
                    className="font-bold hover:scale-110 transition-all disabled:opacity-40 text-[var(--color-foreground)]">
                    <FaArrowRight />
                </button>
            </div>

            <div className="text-sm text-[var(--text-muted)]">
                {invoicesT('page')} {page} {invoicesT('of')}{' '}
                {pagination.last_page}
            </div>
        </div>
    )
}
