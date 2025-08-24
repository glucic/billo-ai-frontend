type RegisterFormProps = {
    onSubmit: (credentials: {
        first_name: string
        last_name: string
        email: string
        password: string
        password_confirmation: string
    }) => void
    loading?: boolean
    errors?: {
        first_name?: string[]
        last_name?: string[]
        email?: string[]
        password?: string[]
        password_confirmation?: string[]
        general?: string[]
    }
}
