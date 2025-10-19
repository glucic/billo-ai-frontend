import type { User } from '@/types/User'

export interface Organisation {
    id: number
    name: string
    street: string
    city?: string
    zip?: string
    region?: string
    phone?: string
    email?: string
    description?: string
    employee_count?: number
    users?: User[]
    created_at: string
    updated_at: string
}
