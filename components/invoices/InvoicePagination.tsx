'use client'

import React from 'react'
import { Button } from '@/components/ui'

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

export default function InvoicePagination({
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    pagination,
}: InvoicePaginationProps) {
    const rowsOptions = [10, 20, 50, 100]

    const renderPageNumbers = () => {
        if (!pagination) return null
        const totalPages = pagination.last_page
        const maxButtons = 5
        const startPage = Math.max(1, page - Math.floor(maxButtons / 2))
        const endPage = Math.min(totalPages, startPage + maxButtons - 1)

        const pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={i === page ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded ${
                        i === page
                            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}>
                    {i}
                </Button>,
            )
        }
        return pages
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Rows per page:
                </span>
                <select
                    className="border rounded px-2 py-1 text-sm"
                    value={rowsPerPage}
                    onChange={e => onRowsPerPageChange(Number(e.target.value))}>
                    {rowsOptions.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    ←
                </Button>

                {renderPageNumbers()}

                <Button
                    variant="ghost"
                    size="sm"
                    disabled={pagination ? page === pagination.last_page : true}
                    onClick={() => onPageChange(page + 1)}
                    className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    →
                </Button>
            </div>
        </div>
    )
}
