'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, ChevronDownIcon } from '@/components/ui'

interface AttachmentSectionProps {
    files: File[]
    onAddFile: (file: File) => void
    onRemoveFile: (index: number) => void
}

export default function AttachmentSection({
    files,
    onAddFile,
    onRemoveFile,
}: AttachmentSectionProps) {
    const t = useTranslations('Invoices.Attachments')
    const [open, setOpen] = useState(true)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onAddFile(e.target.files[0])
            e.target.value = ''
        }
    }

    return (
        <section className="card rounded-lg">
            <Button
                variant="ghost"
                animated={false}
                className="flex items-center w-full justify-between focus:outline-none hover:bg-transparent hover:cursor-pointer"
                aria-expanded={open}
                aria-controls="attachment-section"
                onClick={() => setOpen(v => !v)}>
                <h2 className="text-xl font-bold">
                    {t('title') || 'Attachments'}
                </h2>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? '' : '-rotate-90'}`}
                />
            </Button>

            {open && (
                <div
                    id="attachment-section"
                    className="mt-4 animate-fadeIn space-y-2">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-[var(--text-heading)]"
                    />

                    {files?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {files.map((file, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-[var(--secondary-background)] px-3 py-1 rounded-md">
                                    <span>{file.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onRemoveFile(index)}>
                                        {t('remove') || 'Remove'}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </section>
    )
}
