type LoginFormProps = {
    onSubmit: (credentials: { email: string; password: string }) => void
    loading?: boolean
    errors?: {
        email?: string[]
        password?: string[]
        general?: string[]
    }
}
