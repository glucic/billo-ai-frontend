type Errors = {
    username?: string[]
    password?: string[]
    general?: string[]
}

type LoginFormProps = {
    onSubmit: (credentials: {
        username: string
        password: string
    }) => void | Promise<void>
    loading?: boolean
    errors?: Errors
}
