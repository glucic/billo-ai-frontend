import apiClient from '@/lib/apiClient'

export async function getCsrfCookie(): Promise<void> {
    await apiClient.get('/sanctum/csrf-cookie')
}

export async function login(email: string, password: string): Promise<any> {
    await getCsrfCookie()
    try {
        return await apiClient.post('/login', { email, password })
    } catch (error: any) {
        throw error
    }
}

export async function register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
): Promise<any> {
    if (password !== password_confirmation) {
        throw new Error("Passwords don't match!")
    }

    await getCsrfCookie()
    try {
        return await apiClient.post('/register', {
            name,
            email,
            password,
            password_confirmation,
        })
    } catch (error: any) {
        throw error
    }
}

export async function logout(): Promise<any> {
    await getCsrfCookie()
    return apiClient.post('/logout')
}

export async function fetchUser(): Promise<any> {
    return apiClient.get('/api/user')
}
