import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export default apiClient
