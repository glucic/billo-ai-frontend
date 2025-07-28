type RegisterFormProps = {
    onSubmit: (formData: {
        name: string
        email: string
        password: string
        confirmPassword: string
    }) => void | Promise<void>
    loading?: boolean
}
