import type { User } from '@/types/User'

export interface Organisation {
    id: number
    name: string
    address: string
    city?: string
    state?: string
    zip?: string
    phone?: string
    email?: string
    description?: string
    employee_count?: number
    users?: User[]
    created_at: string
    updated_at: string
}
