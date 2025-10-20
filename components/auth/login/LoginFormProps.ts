type LoginFields = 'email' | 'password'

export type LoginFormProps = {
    onSubmit: (credentials: Record<LoginFields, string>) => void
    loading?: boolean
    errors?: FormErrors<LoginFields>
}
