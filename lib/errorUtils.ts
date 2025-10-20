'use client'
import { useTranslations } from 'next-intl'

export type BackendErrors = Partial<Record<string, string[]>>
export type TranslateFn = ReturnType<typeof useTranslations>

export function detectErrorKey(field: string, message: string): string | null {
    const lower = message.toLowerCase()

    if (lower.includes('required')) return `${field}Required`
    if (lower.includes('valid') || lower.includes('invalid'))
        return `${field}Invalid`
    if (lower.includes('credentials')) return 'invalidCredentials'
    if (lower.includes('confirm') || lower.includes('match'))
        return `${field}Mismatch`
    if (lower.includes('short') || lower.includes('minimum'))
        return `${field}TooShort`
    if (lower.includes('maximum') || lower.includes('too long'))
        return `${field}TooLong`
    if (lower.includes('taken') || lower.includes('already'))
        return `${field}Taken`
    if (lower.includes('too many') || lower.includes('throttle'))
        return 'tooManyAttempts'

    return null
}

export function parseBackendErrors(
    error: any,
    t: TranslateFn,
    namespace: string = 'GlobalErrors',
): BackendErrors {
    if (!error?.response) {
        return {
            general: [t(`${namespace}.unknownError`, { defaultMessage: 'Unexpected error' })],
        }
    }

    const { data, status } = error.response

    if (status === 422 && data?.errors) {
        const translated: BackendErrors = {}
        for (const [field, messages] of Object.entries(data.errors)) {
            translated[field] = (messages as string[]).map(msg => {
                const key = detectErrorKey(field, msg)
                const localizedKey = key ? `${namespace}.errors.${key}` : undefined

                try {
                    if (localizedKey) return t(localizedKey)
                } catch {
                    /* ignore */
                }

                try {
                    const globalKey = `GlobalErrors.${key ?? 'unknownError'}`
                    return t(globalKey)
                } catch {
                    return msg
                }
            })
        }
        return translated
    }

    if (data?.message) {
        const key = detectErrorKey('general', data.message)
        const localizedKey = key ? `${namespace}.errors.${key}` : undefined

        try {
            if (localizedKey) return { general: [t(localizedKey)] }
        } catch {}

        try {
            const globalKey = `GlobalErrors.${key ?? 'unknownError'}`
            return { general: [t(globalKey)] }
        } catch {}

        return { general: [data.message] }
    }

    return { general: [t('GlobalErrors.unknownError')] }
}