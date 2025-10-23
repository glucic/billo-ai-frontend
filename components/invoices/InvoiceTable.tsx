'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Invoice } from '@/types/Invoice'
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'
import { InputField } from '@/components/ui/InputField'
import { useTranslations } from 'next-intl'
import { SortField } from '@/hooks/useInvoiceTable'
import { InvoiceActionsMenu } from '@/components/invoices'
import '@/styles/invoice-table.css'

interface InvoiceTableProps {
    invoices: Invoice[]
    loading: boolean
    sortBy: SortField
    sortOrder: 'asc' | 'desc'
    onSort: (field: SortField) => void
    onSelect: (invoice: Invoice) => void
    onDownloadPDF: (invoice: Invoice) => void
    onArchive: (invoice: Invoice) => void
    /** optional external search value (server-side) */
    searchTerm?: string
    /** called with debounced search value when provided */
    onSearch?: (value: string) => void
}

const InvoiceTableComponent = ({
    invoices,
    loading,
    sortBy,
    sortOrder,
    onSort,
    onSelect,
    onDownloadPDF,
    onArchive,
    searchTerm,
    onSearch,
}: InvoiceTableProps) => {
    const invoicesT = useTranslations('Invoices')

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(handler)
    }, [search])

    // forward debounced search to parent if onSearch provided
    useEffect(() => {
        if (typeof onSearch === 'function') onSearch(debouncedSearch)
    }, [debouncedSearch, onSearch])

    // if parent controls searchTerm, sync it into local input so user sees it
    useEffect(() => {
        if (typeof searchTerm === 'string') setSearch(searchTerm)
    }, [searchTerm])

    const [colWidths, setColWidths] = useState<number[]>([
        15, 18, 30, 15, 12, 10,
    ])
    const resizingCol = useRef<number | null>(null)
    const startX = useRef(0)
    const startWidths = useRef<number[]>([])

    const onMouseDownResize = (index: number, e: React.MouseEvent) => {
        e.preventDefault()
        resizingCol.current = index
        startX.current = e.clientX
        startWidths.current = [...colWidths]
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
        if (resizingCol.current === null) return
        const dx = e.clientX - startX.current
        const table = document.querySelector(
            '.invoice-table',
        ) as HTMLElement | null
        if (!table) return
        const tableWidth = table.getBoundingClientRect().width
        const deltaPercent = (dx / tableWidth) * 100
        const idx = resizingCol.current
        const newWidths = [...startWidths.current]
        newWidths[idx] = Math.max(5, startWidths.current[idx] + deltaPercent)
        if (idx + 1 < newWidths.length)
            newWidths[idx + 1] = Math.max(
                5,
                startWidths.current[idx + 1] - deltaPercent,
            )
        setColWidths(newWidths)
    }

    const onMouseUp = () => {
        resizingCol.current = null
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    const effectiveSearch = useMemo(
        () => searchTerm ?? debouncedSearch,
        [searchTerm, debouncedSearch],
    )

    const filteredInvoices = useMemo(() => {
        return invoices.filter(inv => {
            const s = effectiveSearch.toLowerCase()
            return (
                inv.invoiceDetails.invoiceNumber.toLowerCase().includes(s) ||
                inv.client.name.toLowerCase().includes(s) ||
                (inv.client.email ?? '').toLowerCase().includes(s)
            )
        })
    }, [effectiveSearch, invoices])

    const getSortIndicator = (field: string) => {
        if (sortBy !== field) return null
        return sortOrder === 'asc' ? <IoChevronUp /> : <IoChevronDown />
    }

    const getStatusBadge = (invoice: Invoice) => {
        const dueDate = invoice.invoiceDetails.dueDate
            ? new Date(invoice.invoiceDetails.dueDate)
            : null
        const total = invoice.totals?.amountDue ?? 0

        let label = ''
        let variantClass = ''
        if (total <= 0) {
            label = invoicesT('InvoiceStatus.paid')
            variantClass = 'bg-[var(--success)]/15 text-[var(--success)]'
        } else if (dueDate && dueDate < new Date()) {
            label = invoicesT('InvoiceStatus.overdue')
            variantClass = 'bg-[var(--error)]/15 text-[var(--error)]'
        } else {
            label = invoicesT('InvoiceStatus.pending')
            variantClass = 'bg-[var(--warning)]/15 text-[var(--warning)]'
        }

        return (
            <span
                className={`px-3 py-1 rounded-md text-sm font-semibold capitalize ${variantClass}`}>
                {label}
            </span>
        )
    }

    return (
        <div className="flex flex-col h-full rounded-xl bg-[var(--secondary-background)] shadow-[var(--card-shadow)] p-4 border-[var(--card-border)]">
            <div className="mb-4">
                <InputField
                    placeholder="Search invoices, clients or emails..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="flex-1 overflow-auto">
                <table className="min-w-full table-fixed text-sm text-left border-collapse invoice-table">
                    <thead className="sticky top-0 bg-[var(--secondary-background)] text-xs uppercase tracking-wide z-10">
                        <tr>
                            {[
                                'invoiceNumber',
                                'invoiceDate',
                                'clientName',
                                'amountDue',
                                'status',
                                'actions',
                            ].map((key, i) => (
                                <th
                                    key={key}
                                    style={{ width: `${colWidths[i]}%` }}
                                    className="px-6 py-4 relative whitespace-nowrap">
                                    {key !== 'actions' ? (
                                        <div
                                            onClick={() =>
                                                key !== 'status' &&
                                                onSort(key as SortField)
                                            }
                                            className="flex items-center gap-1 cursor-pointer hover:text-[var(--accent-light)]">
                                            {invoicesT(`columns.${key}`)}
                                            {getSortIndicator(key)}
                                        </div>
                                    ) : (
                                        invoicesT('actions')
                                    )}
                                    {i < colWidths.length - 1 && (
                                        <div
                                            className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize"
                                            onMouseDown={e =>
                                                onMouseDownResize(i, e)
                                            }
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6">
                                    {invoicesT('loading')}
                                </td>
                            </tr>
                        ) : filteredInvoices.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-[var(--muted-foreground)]">
                                    {invoicesT('noInvoices')}
                                </td>
                            </tr>
                        ) : (
                            filteredInvoices.map((invoice, idx) => {
                                const total = invoice.totals?.amountDue ?? 0
                                return (
                                    <tr
                                        key={invoice.invoiceDetails.id || idx}
                                        className="h-16 hover:bg-[var(--accent-light)]/10 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-[var(--accent)]">
                                            {
                                                invoice.invoiceDetails
                                                    .invoiceNumber
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                invoice.invoiceDetails.invoiceDate,
                                            ).toLocaleDateString('de-DE')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {invoice.client.name}
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold">
                                            €{total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(invoice)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <InvoiceActionsMenu
                                                invoice={invoice}
                                                isOpen={
                                                    activeDropdown ===
                                                    String(
                                                        invoice.invoiceDetails
                                                            .id,
                                                    )
                                                }
                                                onClose={() =>
                                                    setActiveDropdown(null)
                                                }
                                                onToggle={() =>
                                                    setActiveDropdown(prev =>
                                                        prev ===
                                                        String(
                                                            invoice
                                                                .invoiceDetails
                                                                .id,
                                                        )
                                                            ? null
                                                            : String(
                                                                  invoice
                                                                      .invoiceDetails
                                                                      .id,
                                                              ),
                                                    )
                                                }
                                                onSelect={onSelect}
                                                onDownloadPDF={onDownloadPDF}
                                                onArchive={onArchive}
                                                t={invoicesT}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    td:nth-child(2),
                    th:nth-child(2),
                    td:nth-child(4),
                    th:nth-child(4) {
                        display: none;
                    }
                }
            `}</style>
        </div>
    )
}

export const InvoiceTable = React.memo(InvoiceTableComponent)
