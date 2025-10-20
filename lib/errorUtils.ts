'use client'
import { useTranslations } from 'next-intl'

export type BackendErrors = Partial<Record<string, string[]>>
export type TranslateFn = ReturnType<typeof useTranslations>

/**
 * Tries to detect the most fitting error key name from a backend message.
 * Used to build i18n translation keys dynamically.
 */
export function detectErrorKey(field: string, message: string): string | null {
    const lower = message.toLowerCase()

    if (lower.includes('required')) return `${field}Required`
    if (lower.includes('valid') || lower.includes('invalid'))
        return `${field}Invalid`
    if (lower.includes('credentials')) return 'invalidCredentials'
    if (lower.includes('confirm') || lower.includes('match'))
        return `${field}Mismatch`
    if (
        lower.includes('short') ||
        lower.includes('minimum') ||
        lower.includes('at least') ||
        lower.includes('must be at least')
    )
        return `${field}TooShort`
    if (lower.includes('maximum') || lower.includes('too long'))
        return `${field}TooLong`
    if (lower.includes('taken') || lower.includes('already'))
        return `${field}Taken`
    if (lower.includes('too many') || lower.includes('throttle'))
        return 'tooManyAttempts'
    if (lower.includes('date after or equal'))
        return `${field}Before`

    return null
}

/**
 * Parses Laravel-style backend validation errors into a frontend-friendly map
 * and attempts to translate them via next-intl using dynamic keys.
 *
 * Example backend error:
 *   { "items.0.name": ["The name field is required."] }
 *
 * Translated key lookup order:
 *   1. Invoices.errors.items.nameRequired
 *   2. GlobalErrors.nameRequired
 *   3. Fallback to raw message
 */
export function parseBackendErrors(
    error: any,
    t: TranslateFn,
    namespace: string = 'GlobalErrors',
): BackendErrors {
    if (!error?.response) {
        return {
            general: [
                t(`${namespace}.unknownError`, {
                    defaultMessage: 'Unexpected error',
                }),
            ],
        }
    }

    const { data, status } = error.response

    if (status === 422 && data?.errors) {
        const translated: BackendErrors = {}

        for (const [rawField, messages] of Object.entries(data.errors)) {
            const cleanField = rawField.replace(/\.\d+\./g, '.')

            translated[rawField] = (messages as string[]).map(msg => {
                const key = detectErrorKey(cleanField, msg)
                const localizedKey = key
                    ? `${namespace}.errors.${key}`
                    : undefined

                try {
                    if (localizedKey) return t(localizedKey)
                } catch {
                    /* ignore and fallback */
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
