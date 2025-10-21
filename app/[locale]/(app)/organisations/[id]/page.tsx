'use client'

import { useParams, useRouter } from 'next/navigation'
import { useOrganisations } from '@/hooks/useOrganisations'
import { OrganisationForm } from '@/components/organisations/OrganisationForm'
import { useEffect } from 'react'

export default function EditOrganisationPage() {
    const { id } = useParams()
    const router = useRouter()
    const {
        form,
        saving,
        fieldErrors,
        fetchOrganisationById,
        handleChange,
        handleSave,
        handleDelete,
    } = useOrganisations()

    const organisationId = Number(id)
    useEffect(() => {
        if (!isNaN(organisationId)) {
            fetchOrganisationById(organisationId)
        }
    }, [organisationId])

    return (
        <OrganisationForm
            form={form}
            fieldErrors={fieldErrors}
            saving={saving}
            handleChange={handleChange}
            handleSave={handleSave}
            handleDelete={handleDelete}
            id={organisationId}
            mode="edit"
            onSuccessRedirect={() => router.push('/organisations')}
        />
    )
}
