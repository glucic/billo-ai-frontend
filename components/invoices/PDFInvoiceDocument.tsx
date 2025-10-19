'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import {
    InvoiceDetails,
    Issuer,
    Client,
    InvoiceItem,
    InvoiceTotals,
} from '@/types/Invoice'

interface PDFInvoiceDocumentProps {
    invoiceDetails: InvoiceDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    t: Record<string, string>
}

export default function PDFInvoiceDocument({
                                               invoiceDetails,
                                               issuer,
                                               client,
                                               items,
                                               totals,
                                               t,
                                           }: PDFInvoiceDocumentProps) {
    const symbol = totals.currency === 'EUR' ? '€' : totals.currency
    const formatValue = (v: number) =>
        `${v.toFixed(2).replace('.', ',')} ${symbol}`

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{t['title']}</Text>
                    <View style={{ textAlign: 'right' }}>
                        <Text>
                            {t['invoiceNumber']}: {invoiceDetails.invoiceNumber}
                        </Text>
                        <Text>
                            {t['invoiceDate']}: {invoiceDetails.invoiceDate}
                        </Text>
                        {invoiceDetails.dueDate && (
                            <Text>
                                {t['dueDate']}: {invoiceDetails.dueDate}
                            </Text>
                        )}
                        {invoiceDetails.reference && (
                            <Text>
                                {t['reference']}: {invoiceDetails.reference}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Issuer */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>{t['from']}</Text>
                    <Text>{issuer.name}</Text>
                    <Text>{issuer.street}</Text>
                    <Text>
                        {issuer.zip} {issuer.city}, {issuer.region}
                    </Text>
                    {issuer.email && <Text>{issuer.email}</Text>}
                    {issuer.phone && <Text>{issuer.phone}</Text>}
                </View>

                {/* Client */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>{t['billTo']}</Text>
                    <Text>{client.name}</Text>
                    <Text>{client.street}</Text>
                    <Text>
                        {client.zip} {client.city}, {client.region}
                    </Text>
                    {client.email && <Text>{client.email}</Text>}
                    {client.phone && <Text>{client.phone}</Text>}
                </View>

                {/* Items */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>{t['items']}</Text>

                    <View style={[styles.itemRow, styles.itemHeader]}>
                        <Text style={{ flex: 2 }}>{t['name']}</Text>
                        <Text style={{ flex: 3 }}>{t['description']}</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            {t['quantity']}
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            {t['unitPrice']}
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            {t['subtotal']}
                        </Text>
                    </View>

                    {items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={{ flex: 2 }}>{item.name}</Text>
                            <Text style={{ flex: 3 }}>
                                {item.description || '-'}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {item.quantity}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {formatValue(item.rate)}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {formatValue(item.rate * item.quantity)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={[styles.section, styles.totalsSection]}>
                    <View style={styles.totalsRow}>
                        <Text>{t['sumNet']}</Text>
                        <Text>{formatValue(totals.sum)}</Text>
                    </View>

                    {totals.discount > 0 && (
                        <View style={styles.totalsRow}>
                            <Text>
                                {t['discount']} ({totals.discount}%)
                            </Text>
                            <Text>
                                -{formatValue(totals.sum - totals.totalNet)}
                            </Text>
                        </View>
                    )}

                    <View style={styles.totalsRow}>
                        <Text>{t['totalNet']}</Text>
                        <Text>{formatValue(totals.totalNet)}</Text>
                    </View>

                    {totals.shipping > 0 && (
                        <View style={styles.totalsRow}>
                            <Text>{t['shipping']}</Text>
                            <Text>+{formatValue(totals.shipping)}</Text>
                        </View>
                    )}

                    <View style={styles.totalsRow}>
                        <Text>
                            {t['tax']} ({totals.taxRate}%)
                        </Text>
                        <Text>
                            +
                            {formatValue(
                                totals.totalGross -
                                totals.totalNet -
                                totals.shipping,
                            )}
                        </Text>
                    </View>

                    <View style={styles.totalsDivider} />

                    <View style={[styles.totalsRow, styles.totalBold]}>
                        <Text>{t['totalGross']}</Text>
                        <Text>{formatValue(totals.totalGross)}</Text>
                    </View>

                    {totals.deposit > 0 && (
                        <View style={styles.totalsRow}>
                            <Text>{t['deposit']}</Text>
                            <Text>-{formatValue(totals.deposit)}</Text>
                        </View>
                    )}

                    {totals.payments > 0 && (
                        <View style={styles.totalsRow}>
                            <Text>{t['payments']}</Text>
                            <Text>-{formatValue(totals.payments)}</Text>
                        </View>
                    )}

                    <View style={styles.totalsDivider} />

                    <View style={[styles.totalsRow, styles.amountDue]}>
                        <Text>{t['amountDue']}</Text>
                        <Text>{formatValue(totals.amountDue)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    body: { padding: 32, fontSize: 11, fontFamily: 'Helvetica' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    section: { marginBottom: 12 },
    itemRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999',
        paddingVertical: 2,
    },
    itemHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    totalsSection: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 8,
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    totalsDivider: {
        borderTopWidth: 0.8,
        borderTopColor: '#666',
        marginVertical: 5,
    },
    totalBold: { fontWeight: 'bold' },
    amountDue: { fontWeight: 'bold', fontSize: 13, marginTop: 4 },
})