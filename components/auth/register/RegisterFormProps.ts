type RegisterFields =
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'password'
    | 'password_confirmation'

type RegisterFormProps = {
    onSubmit: (credentials: Record<RegisterFields, string>) => void
    loading?: boolean
    errors?: FormErrors<RegisterFields>
}