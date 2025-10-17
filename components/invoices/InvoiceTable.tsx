'use client'

import React from 'react'
import { Invoice } from '@/types/Invoice'
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'

type SortField =
    | 'invoice_number'
    | 'invoice_date'
    | 'created_at'
    | 'client_name'
    | 'total'

interface InvoiceTableProps {
    invoices: Invoice[]
    loading: boolean
    sortBy: SortField
    sortOrder: 'asc' | 'desc'
    onSort: (field: SortField) => void
    onSelect: (invoice: Invoice) => void
}

export default function InvoiceTable({
    invoices,
    loading,
    sortBy,
    sortOrder,
    onSort,
    onSelect,
}: InvoiceTableProps) {
    const getSortIndicator = (field: string) => {
        if (sortBy !== field) return null
        return sortOrder === 'asc' ? <IoChevronUp /> : <IoChevronDown />
    }

    return (
        <div className="overflow-x-auto rounded-xl bg-[var(--secondary-background)] shadow-md p-4">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#1f1f1f] text-[#f0f0f0] uppercase text-xs tracking-wide rounded-t-lg sticky top-0">
                    <tr>
                        <th
                            className="px-6 py-4 cursor-pointer"
                            onClick={() => onSort('invoice_number')}>
                            <div className="flex items-center gap-1">
                                Number {getSortIndicator('invoice_number')}
                            </div>
                        </th>
                        <th
                            className="px-6 py-4 cursor-pointer"
                            onClick={() => onSort('invoice_date')}>
                            <div className="flex items-center gap-1">
                                Date {getSortIndicator('invoice_date')}
                            </div>
                        </th>
                        <th
                            className="px-6 py-4 cursor-pointer"
                            onClick={() => onSort('client_name')}>
                            <div className="flex items-center gap-1">
                                Client {getSortIndicator('client_name')}
                            </div>
                        </th>
                        <th
                            className="px-6 py-4 cursor-pointer text-right"
                            onClick={() => onSort('total')}>
                            <div className="flex items-center justify-end gap-1">
                                Total {getSortIndicator('total')}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td
                                colSpan={4}
                                className="text-center py-12 text-gray-400">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loading && invoices.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="text-center py-12 text-gray-500">
                                No invoices found
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        invoices.map((invoice, idx) => {
                            const total = invoice.items.reduce(
                                (sum, item) => sum + item.rate * item.quantity,
                                0,
                            )
                            return (
                                <tr
                                    key={idx}
                                    className={`h-16 cursor-pointer transition-colors ${
                                        idx % 2 === 0
                                            ? 'bg-[#232323]'
                                            : 'bg-[#272727]'
                                    } hover:bg-[#333333]`}
                                    onClick={() => onSelect(invoice)}>
                                    <td className="px-6 py-4 font-semibold text-[var(--accent)]">
                                        {invoice.invoiceDetails.invoiceNumber}
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
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}
