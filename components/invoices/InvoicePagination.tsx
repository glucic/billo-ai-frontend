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
    const t = useTranslations('Invoices')
    const rowsOptions = [10, 20, 50, 100]

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
                        ? 'text-white font-semibold scale-110'
                        : 'text-gray-400 hover:text-white hover:scale-105'
                }`}>
                {i}
            </Link>,
        )
    }

    return (
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-[var(--foreground)]">
            <div className="flex items-center gap-2 text-sm ">
                <span>{t('rowsPerPage')}</span>
                <select
                    className="border border-gray-600 rounded-md bg-[var(--secondary-background)] text-gray-100 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition"
                    value={rowsPerPage}
                    onChange={e => onRowsPerPageChange(Number(e.target.value))}>
                    {rowsOptions.map(option => (
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
                    className="font-bold hover:scale-110 transition-all disabled:opacity-40"
                    title={t('previous') || 'Previous'}>
                    <FaArrowLeft />
                </button>

                {pages}

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="font-bold hover:scale-110 transition-all disabled:opacity-40"
                    title={t('next') || 'Next'}>
                    <FaArrowRight />
                </button>
            </div>

            {/* Right: Page info */}
            <div className="text-sm text-gray-400">
                {t('page')} {page} {t('of')} {pagination.last_page}
            </div>
        </div>
    )
}
