'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import {
    InvoiceDetails,
    BankDetails,
    Issuer,
    Client,
    InvoiceItem,
    InvoiceTotals,
    Footer,
    Legal,
} from '@/types/Invoice'

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#222',
        lineHeight: 1.4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: { width: 100, height: 40 },
    title: { fontSize: 22, fontWeight: 'bold' },
    section: { marginBottom: 16 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
    label: { fontWeight: 'bold', marginBottom: 4 },
    table: { borderWidth: 1, borderColor: '#ccc', marginTop: 10 },
    tableRow: { flexDirection: 'row' },
    tableHeader: { backgroundColor: '#f3f4f6' },
    th: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        padding: 6,
        fontWeight: 'bold',
    },
    td: { flex: 1, borderRightWidth: 1, borderRightColor: '#ccc', padding: 6 },
    totals: { marginTop: 24, alignItems: 'flex-end' },
    totalLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        paddingVertical: 3,
    },
    totalBold: { fontSize: 12, fontWeight: 'bold' },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 8,
        fontSize: 9,
        color: '#555',
        textAlign: 'center',
    },
})

const safeText = (v: unknown) => String(v ?? '')
const money = (n: number, c: string) => `${(n ?? 0).toFixed(2)} ${safeText(c)}`
const MaybeText = ({
    label,
    value,
}: {
    label?: string
    value?: string | number
}) => {
    if (value === undefined || value === null || value === '') return null
    return (
        <Text>
            {label ? `${label}: ` : ''}
            {safeText(value)}
        </Text>
    )
}
const TableCell = ({ children }: { children?: React.ReactNode }) => (
    <Text style={styles.td}>{children ?? '—'}</Text>
)

export default function PDFInvoiceDocument({
    invoiceDetails,
    bankDetails,
    issuer,
    client,
    items,
    totals,
    legal,
    footer,
    translations: t,
}: {
    invoiceDetails: InvoiceDetails
    bankDetails: BankDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    legal: Legal
    footer: Footer
    translations: (key: string) => string
}) {
    const totalsRows = [
        { label: t('sumNet'), value: totals.sum },
        { label: t('discount'), value: -totals.discount },
        { label: t('totalNet'), value: totals.totalNet },
        {
            label: `${t('tax')} (${totals.taxRate}%)`,
            value: (totals.totalGross ?? 0) - (totals.totalNet ?? 0),
        },
        { label: t('totalGross'), value: totals.totalGross },
        { label: t('amountDue'), value: totals.amountDue, bold: true },
    ]
    const safeBankDetails = bankDetails ?? {}

    const bankInfo = [
        { label: t('accountHolder'), value: safeBankDetails.accountHolder },
        { label: t('bankName'), value: safeBankDetails.bankName },
        { label: t('iban'), value: safeBankDetails.iban },
        { label: t('bic'), value: safeBankDetails.bic },
    ].filter(b => b.value)

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{t('title')}</Text>
                </View>

                {/* Invoice Details */}
                <View style={styles.section}>
                    <MaybeText
                        label={t('invoiceNumber')}
                        value={invoiceDetails.invoiceNumber}
                    />
                    <MaybeText
                        label={t('invoiceDate')}
                        value={invoiceDetails.invoiceDate}
                    />
                    <MaybeText
                        label={t('dueDate')}
                        value={invoiceDetails.dueDate}
                    />
                    <MaybeText
                        label={t('reference')}
                        value={invoiceDetails.reference}
                    />
                </View>

                <View style={styles.divider} />

                {/* Issuer / Client */}
                <View style={[styles.section, styles.rowBetween]}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        <MaybeText
                            label={issuer.name ? t('from') : undefined}
                            value={issuer.name}
                        />
                        <MaybeText value={issuer.street} />
                        <MaybeText
                            value={[issuer.zip, issuer.city]
                                .filter(Boolean)
                                .join(' ')}
                        />
                        <MaybeText value={issuer.region} />
                    </View>

                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <MaybeText
                            label={client.name ? t('billTo') : undefined}
                            value={client.name}
                        />
                        <MaybeText value={client.street} />
                        <MaybeText
                            value={[client.zip, client.city]
                                .filter(Boolean)
                                .join(' ')}
                        />
                        <MaybeText value={client.region} />
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Items Table */}
                {items.length > 0 && (
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.th}>{t('name')}</Text>
                            <Text style={styles.th}>{t('description')}</Text>
                            <Text style={styles.th}>{t('quantity')}</Text>
                            <Text style={styles.th}>{t('unitPrice')}</Text>
                            <Text style={styles.th}>{t('subtotal')}</Text>
                        </View>
                        {items.map((item, i) => (
                            <View key={i} style={styles.tableRow}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    {item.rate
                                        ? money(item.rate, totals.currency)
                                        : undefined}
                                </TableCell>
                                <TableCell>
                                    {money(
                                        (item.quantity ?? 0) * (item.rate ?? 0),
                                        totals.currency,
                                    )}
                                </TableCell>
                            </View>
                        ))}
                    </View>
                )}

                {/* Totals */}
                <View style={styles.totals}>
                    {totalsRows.map((row, i) => (
                        <View
                            key={i}
                            style={[
                                styles.totalLine,
                                row.bold ? styles.totalBold : {},
                            ]}>
                            <Text>{row.label}:</Text>
                            <Text>{money(row.value, totals.currency)}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.divider} />

                {/* Bank Details */}
                {bankInfo?.length > 0 && (
                    <View style={[styles.section, { marginTop: 12 }]}>
                        <Text style={styles.label}>
                            {t('paymentInformation')}
                        </Text>
                        {bankInfo.map((b, i) => (
                            <Text key={i}>
                                {b.label}: {b.value}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Legal Terms */}
                {legal.termsAndConditions && (
                    <Text>{legal.termsAndConditions}</Text>
                )}

                {/* Footer */}
                {(footer.notes || issuer.name || issuer.city) && (
                    <Text style={styles.footer}>
                        {[footer.notes, issuer.name, issuer.city]
                            .filter(Boolean)
                            .join(' · ')}
                    </Text>
                )}
            </Page>
        </Document>
    )
}
