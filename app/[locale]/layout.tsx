import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import '@/styles/globals.css'
import { defaultMetadata } from '@/config/metadata'
import { roboto } from '@/config/fonts'
import { AuthProvider } from '@/context/AuthProvider'

export const metadata = defaultMetadata

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <html
            lang={locale}
            className={`${roboto.variable} font-sans scroll-smooth`}
            suppressHydrationWarning>
            <body>
                <AuthProvider>
                    <NextIntlClientProvider locale={locale}>
                        {children}
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
