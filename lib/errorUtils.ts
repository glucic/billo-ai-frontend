'use client'
import { useTranslations } from 'next-intl'

export type BackendErrors = Partial<Record<string, string[]>>
export type TranslateFn = ReturnType<typeof useTranslations>

/**
 * Returns true when a translation value should be considered "missing".
 * Some i18n setups return the key itself or an empty string when missing.
 */
export function isTranslationMissing(
    translated: string | undefined,
    key: string,
): boolean {
    return !translated || translated === '' || translated === key
}

/**
 * Try to translate a key and return undefined when the translation is missing.
 * defaultMessage defaults to empty string so callers can detect missing keys.
 */
export function translateIfExists(
    t: TranslateFn,
    key: string,
    defaultMessage: string = '',
): string | undefined {
    try {
        const v = t(key, { defaultMessage })
        if (isTranslationMissing(v, key)) return undefined
        return v
    } catch {
        return undefined
    }
}

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
    if (lower.includes('date after or equal')) return `${field}Before`

    return `${field}.general`
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
                t('GlobalErrors.unexpectedError', {
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

                // Try namespace-specific translation first
                const nsTranslated =
                    localizedKey && translateIfExists(t, localizedKey, '')
                if (nsTranslated) return nsTranslated

                // Fallback to global unknown error (use raw message as default)
                const globalKey = `GlobalErrors.unknownError`
                const globalTranslated = translateIfExists(t, globalKey, msg)
                if (globalTranslated) return globalTranslated

                return msg
            })
        }

        return translated
    }

    if (data?.message) {
        const key = detectErrorKey('general', data.message)
        const localizedKey = key ? `${namespace}.errors.${key}` : undefined

        // Try namespace-specific translation first
        const nsTranslated =
            localizedKey && translateIfExists(t, localizedKey, '')
        if (nsTranslated) return { general: [nsTranslated] }

        // Fallback to global key (default to raw message)
        const globalKey = `GlobalErrors.${key ?? 'unknownError'}`
        const globalTranslated = translateIfExists(t, globalKey, data.message)
        if (globalTranslated) return { general: [globalTranslated] }

        return { general: [data.message] }
    }

    return { general: [t('GlobalErrors.unknownError')] }
}
