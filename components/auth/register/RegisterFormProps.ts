type RegisterFormProps = {
    onSubmit: (credentials: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) => void
    loading?: boolean
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        password_confirmation?: string[]
        general?: string[]
    }
}
