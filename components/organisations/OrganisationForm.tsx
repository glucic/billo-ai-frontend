import { Organisation } from '@/hooks/useOrganisations'
import { InputField } from '@/components/ui/InputField'
import { StatefulButton } from '@/components/ui/StatefulButton'

interface OrganisationFormProps {
    form: Partial<Organisation>
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    onSave: () => void
    onDelete: () => void
    onCancel: () => void
    saving: boolean
    deleting: boolean
    error: string | null
}

export function OrganisationForm({
    form,
    onChange,
    onSave,
    onDelete,
    onCancel,
    saving,
    deleting,
    error,
}: OrganisationFormProps) {
    return (
        <div className="p-6 bg-[var(--background)] border rounded shadow space-y-4">
            <h3 className="text-xl font-semibold mb-2">Edit Organisation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                        Name
                    </label>
                    <InputField
                        name="name"
                        value={form.name || ''}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <InputField
                        name="email"
                        value={form.email || ''}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                        Phone
                    </label>
                    <InputField
                        name="phone"
                        value={form.phone || ''}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1 font-medium">
                        Address
                    </label>
                    <InputField
                        name="address"
                        value={form.address || ''}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="employee_count"
                        className="block mb-1 font-medium">
                        Employee Count
                    </label>
                    <InputField
                        name="employee_count"
                        type="number"
                        value={form.employee_count?.toString() || ''}
                        onChange={onChange}
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="description"
                        className="block mb-1 font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description || ''}
                        onChange={onChange}
                        className="w-full rounded border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white"
                        rows={3}
                    />
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    Cancel
                </button>
                <div className="flex gap-4">
                    <StatefulButton
                        loading={deleting}
                        onClick={onDelete}
                        className="bg-red-500 hover:bg-red-600 text-white">
                        Delete
                    </StatefulButton>
                    <StatefulButton loading={saving} onClick={onSave}>
                        Save Changes
                    </StatefulButton>
                </div>
            </div>
            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </div>
    )
}
