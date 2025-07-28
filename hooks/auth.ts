import apiClient from '@/lib/apiClient'

export async function getCsrfCookie() {
    await apiClient.get('/sanctum/csrf-cookie')
}

export async function login(email: string, password: string) {
    await getCsrfCookie()
    return apiClient.post('/login', { email, password })
}

export async function register(name: string, email: string, password: string) {
    await getCsrfCookie()
    return apiClient.post('/register', { name, email, password })
}

export async function logout() {
    await getCsrfCookie()
    return apiClient.post('/logout')
}

export async function fetchUser() {
    return apiClient.get('/api/user')
}
