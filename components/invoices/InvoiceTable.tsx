'use client'

import React, { useState, useMemo, useRef } from 'react'
import { Invoice } from '@/types/Invoice'
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'
import { FaEdit, FaFileDownload, FaArchive } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { SortField } from '@/hooks/useInvoiceTable'

interface InvoiceTableProps {
    invoices: Invoice[]
    loading: boolean
    sortBy: SortField
    sortOrder: 'asc' | 'desc'
    onSort: (field: SortField) => void
    onSelect: (invoice: Invoice) => void
    onDownloadPDF: (invoice: Invoice) => void
    onArchive: (invoice: Invoice) => void
}

export default function InvoiceTable({
    invoices,
    loading,
    sortBy,
    sortOrder,
    onSort,
    onSelect,
    onDownloadPDF,
    onArchive,
}: InvoiceTableProps) {
    const invoicesT = useTranslations('Invoices')
    const clientsT = useTranslations('Clients')
    const router = useRouter()

    const [search, setSearch] = useState('')

    const [colWidths, setColWidths] = useState<number[]>([
        15, 18, 30, 15, 12, 10,
    ])
    const resizingCol = useRef<number | null>(null)
    const startX = useRef(0)
    const startWidths = useRef<number[]>([])

    const onMouseDownResize = (index: number, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
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
        if (idx + 1 < newWidths.length) {
            newWidths[idx + 1] = Math.max(
                5,
                startWidths.current[idx + 1] - deltaPercent,
            )
        }
        setColWidths(newWidths)
    }

    const onMouseUp = () => {
        resizingCol.current = null
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    const filteredInvoices = useMemo(() => {
        return invoices.filter(
            inv =>
                inv.invoiceDetails.invoiceNumber
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                inv.client.name.toLowerCase().includes(search.toLowerCase()),
        )
    }, [search, invoices])

    const getSortIndicator = (field: string) => {
        if (sortBy !== field) return null
        return sortOrder === 'asc' ? <IoChevronUp /> : <IoChevronDown />
    }

    const getStatus = (invoice: Invoice) => {
        const dueDate = invoice.invoiceDetails.dueDate
            ? new Date(invoice.invoiceDetails.dueDate)
            : null
        const total =
            invoice.totals?.amountDue ??
            invoice.items.reduce(
                (sum, item) => sum + item.rate * item.quantity,
                0,
            )
        if (total <= 0) return 'Paid'
        if (dueDate && dueDate < new Date()) return 'Overdue'
        return 'Pending Payment'
    }

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden rounded-xl bg-[var(--secondary-background)] shadow-[var(--card-shadow)] p-4 border-[var(--card-border)]">
            <div className="mb-4">
                <InputField
                    placeholder="Search invoices or clients..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-scroll">
                    <table className="min-w-full table-fixed text-sm text-left border-collapse invoice-table">
                        <thead className="bg-[var(--secondary-background)] text-[var(--color-foreground)] uppercase text-xs tracking-wide rounded-t-lg sticky top-0 left-0 right-0 z-10">
                            <tr>
                                <th
                                    style={{ width: `${colWidths[0]}%` }}
                                    className="px-6 py-4 relative">
                                    <div className="flex items-center gap-1">
                                        <div
                                            onClick={() =>
                                                onSort('invoice_number')
                                            }
                                            className="flex cursor-pointer hover:text-[var(--accent-light)]">
                                            {invoicesT(
                                                'InvoiceDetails.invoiceNumber',
                                            )}{' '}
                                            {getSortIndicator('invoice_number')}
                                        </div>
                                    </div>
                                    <div
                                        className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                                        onMouseDown={e =>
                                            onMouseDownResize(0, e)
                                        }
                                        aria-hidden
                                    />
                                </th>
                                <th
                                    style={{ width: `${colWidths[1]}%` }}
                                    className="px-6 py-4 relative">
                                    <div className="flex items-center gap-1">
                                        <div
                                            onClick={() =>
                                                onSort('invoice_date')
                                            }
                                            className="flex cursor-pointer hover:text-[var(--accent-light)]">
                                            {invoicesT(
                                                'InvoiceDetails.invoiceDate',
                                            )}{' '}
                                            {getSortIndicator('invoice_date')}
                                        </div>
                                    </div>
                                    <div
                                        className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                                        onMouseDown={e =>
                                            onMouseDownResize(1, e)
                                        }
                                        aria-hidden
                                    />
                                </th>
                                <th
                                    style={{ width: `${colWidths[2]}%` }}
                                    className="px-6 py-4 relative">
                                    <div className="flex items-center gap-1">
                                        <div
                                            onClick={() =>
                                                onSort('client_name')
                                            }
                                            className="flex cursor-pointer hover:text-[var(--accent-light)]">
                                            {clientsT('title')}{' '}
                                            {getSortIndicator('client_name')}
                                        </div>
                                    </div>
                                    <div
                                        className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                                        onMouseDown={e =>
                                            onMouseDownResize(2, e)
                                        }
                                        aria-hidden
                                    />
                                </th>
                                <th
                                    style={{ width: `${colWidths[3]}%` }}
                                    className="px-6 py-4 relative">
                                    <div className="flex items-center gap-1">
                                        <div
                                            onClick={() => onSort('total')}
                                            className="flex cursor-pointer hover:text-[var(--accent-light)]">
                                            {invoicesT('Totals.amountDue')}
                                            {getSortIndicator('total')}
                                        </div>
                                    </div>
                                    <div
                                        className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                                        onMouseDown={e =>
                                            onMouseDownResize(3, e)
                                        }
                                        aria-hidden
                                    />
                                </th>
                                <th
                                    style={{ width: `${colWidths[4]}%` }}
                                    className="px-6 py-4 relative">
                                    <div className="flex items-center gap-1">
                                        <div
                                            onClick={() => onSort('status')}
                                            className="flex cursor-pointer hover:text-[var(--accent-light)]">
                                            Status {getSortIndicator('status')}
                                        </div>
                                    </div>
                                    <div
                                        className="resizer absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                                        onMouseDown={e =>
                                            onMouseDownResize(4, e)
                                        }
                                        aria-hidden
                                    />
                                </th>
                                <th
                                    style={{ width: `${colWidths[5]}%` }}
                                    className="px-6 py-4 text-right">
                                    {invoicesT('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                filteredInvoices.map((invoice, idx) => {
                                    const total =
                                        invoice.totals?.amountDue ??
                                        invoice.items.reduce(
                                            (sum, item) =>
                                                sum + item.rate * item.quantity,
                                            0,
                                        )
                                    const status = getStatus(invoice)

                                    return (
                                        <tr
                                            key={
                                                invoice.invoiceDetails.id || idx
                                            }
                                            className="invoice-row h-16 cursor-pointer table-row"
                                            onClick={() => onSelect(invoice)}>
                                            <td
                                                style={{
                                                    width: `${colWidths[0]}%`,
                                                }}
                                                className="px-6 py-4 font-semibold text-[var(--accent)]">
                                                {
                                                    invoice.invoiceDetails
                                                        .invoiceNumber
                                                }
                                            </td>
                                            <td
                                                style={{
                                                    width: `${colWidths[1]}%`,
                                                }}
                                                className="px-6 py-4">
                                                {new Date(
                                                    invoice.invoiceDetails.invoiceDate,
                                                ).toLocaleDateString('de-DE')}
                                            </td>
                                            <td
                                                style={{
                                                    width: `${colWidths[2]}%`,
                                                }}
                                                className="px-6 py-4">
                                                {invoice.client.name}
                                            </td>
                                            <td
                                                style={{
                                                    width: `${colWidths[3]}%`,
                                                }}
                                                className="px-6 py-4 font-semibold">
                                                €{total.toFixed(2)}
                                            </td>
                                            <td
                                                style={{
                                                    width: `${colWidths[4]}%`,
                                                }}
                                                className="px-6 py-4 font-semibold">
                                                <span
                                                    className={`
                                                    px-2 py-1 rounded-md
                                                    ${
                                                        status === 'Paid'
                                                            ? 'bg-[var(--success)] text-black'
                                                            : status ===
                                                                'Overdue'
                                                              ? 'bg-[var(--error)] text-white'
                                                              : 'bg-[var(--warning)] text-black'
                                                    }
                                                `}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    width: `${colWidths[5]}%`,
                                                }}
                                                className="px-6 py-4 flex gap-5">
                                                <Button
                                                    variant="icon"
                                                    motionEffect
                                                    animated={true}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        router.push(
                                                            `/invoices/${invoice.invoiceDetails.id}`,
                                                        )
                                                    }}
                                                    aria-label="Edit invoice">
                                                    <FaEdit />
                                                </Button>

                                                <Button
                                                    variant="icon"
                                                    motionEffect
                                                    animated={true}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        onDownloadPDF(invoice)
                                                    }}
                                                    aria-label="Download PDF">
                                                    <FaFileDownload />
                                                </Button>

                                                <Button
                                                    variant="icon"
                                                    motionEffect
                                                    animated={true}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        onArchive(invoice)
                                                    }}
                                                    aria-label="Archive invoice">
                                                    <FaArchive />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
