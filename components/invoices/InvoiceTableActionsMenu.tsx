'use client'

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
    FaEdit,
    FaFileDownload,
    FaArchive,
    FaCopy,
    FaEye,
} from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { Invoice } from '@/types/Invoice'
import { IconDotsDiagonal2, IconDotsVertical } from '@tabler/icons-react'

interface InvoiceActionsMenuProps {
    invoice: Invoice
    isOpen: boolean
    onClose: () => void
    onSelect: (invoice: Invoice) => void
    onDownloadPDF: (invoice: Invoice) => void
    onArchive: (invoice: Invoice) => void
    onToggle: () => void
    t: (key: string) => string
}

export const InvoiceActionsMenu: React.FC<InvoiceActionsMenuProps> = ({
    invoice,
    isOpen,
    onClose,
    onToggle,
    onSelect,
    onDownloadPDF,
    onArchive,
    t,
}) => {
    const router = useRouter()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [coords, setCoords] = useState({ top: 0, left: 0 })

    useLayoutEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const dropdownHeight = dropdownRef.current?.offsetHeight ?? 180
            const viewportHeight = window.innerHeight

            const spaceBelow = viewportHeight - rect.bottom
            const topPosition =
                spaceBelow < dropdownHeight
                    ? rect.top + window.scrollY - dropdownHeight
                    : rect.bottom + window.scrollY

            setCoords({
                top: topPosition,
                left: rect.left + window.scrollX,
            })
        }
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                buttonRef.current &&
                dropdownRef.current &&
                !buttonRef.current.contains(e.target as Node) &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                onClose()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [onClose])

    const handleAction = (callback: () => void) => {
        callback()
        onClose()
    }

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                size="lg"
                variant="icon"
                motionEffect
                animated
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={e => {
                    e.stopPropagation()
                    onToggle()
                }}>
                <IconDotsVertical size={18} />
            </Button>

            {isOpen &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{ top: coords.top, left: coords.left }}
                        className="absolute z-50 w-48 bg-[var(--secondary-background)] shadow-lg rounded-md"
                        onClick={e => e.stopPropagation()}>
                        <div className="py-1">
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-[var(--accent-light)]/20"
                                onClick={() => {
                                    handleAction(() => onSelect(invoice))
                                }}>
                                <FaEye /> {t('view')}
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-[var(--accent-light)]/20"
                                onClick={e => {
                                    handleAction(() =>
                                        router.push(
                                            `/invoices/${invoice.invoiceDetails.id}`,
                                        ),
                                    )
                                }}>
                                <FaEdit /> {t('update')}
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-[var(--accent-light)]/20"
                                onClick={e => {
                                    e.stopPropagation()
                                    handleAction(() => onDownloadPDF(invoice))
                                }}>
                                <FaFileDownload /> {t('downloadPDF')}
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-[var(--accent-light)]/20"
                                onClick={e => {
                                    e.stopPropagation()
                                    handleAction(() => onArchive(invoice))
                                }}>
                                <FaArchive /> {t('archive')}
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-[var(--accent-light)]/20"
                                onClick={e => {
                                    e.stopPropagation()
                                    handleAction(() => onArchive(invoice)) // replace with copy if needed
                                }}>
                                <FaCopy /> {t('copy')}
                            </button>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    )
}
