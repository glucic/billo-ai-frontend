'use client'

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer'
import {
    InvoiceDetails,
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

export default function PDFInvoiceDocument({
    invoiceDetails,
    issuer,
    client,
    items,
    totals,
    legal,
    footer,
    t,
}: {
    invoiceDetails: InvoiceDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
    totals: InvoiceTotals
    legal: Legal
    footer: Footer
    t: Record<string, string>
}) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerRow}>
                    <Image src="/logo.png" style={styles.logo} />
                    <Text style={styles.title}>{safeText(t.title)}</Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        {safeText(t.invoiceNumber)}:{' '}
                        {safeText(invoiceDetails.invoiceNumber)}
                    </Text>
                    <Text>
                        {safeText(t.invoiceDate)}:{' '}
                        {safeText(invoiceDetails.invoiceDate)}
                    </Text>
                    <Text>
                        {safeText(t.dueDate)}:{' '}
                        {safeText(invoiceDetails.dueDate)}
                    </Text>
                    {invoiceDetails.reference ? (
                        <Text>
                            {safeText(t.reference)}:{' '}
                            {safeText(invoiceDetails.reference)}
                        </Text>
                    ) : null}
                </View>

                <View style={styles.divider} />

                <View style={[styles.section, styles.rowBetween]}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.label}>{safeText(t.from)}</Text>
                        <Text>{safeText(issuer.name)}</Text>
                        <Text>{safeText(issuer.street)}</Text>
                        <Text>
                            {[issuer.zip, issuer.city]
                                .filter(Boolean)
                                .join(' ')}
                        </Text>
                        {issuer.region && (
                            <Text>{safeText(issuer.region)}</Text>
                        )}
                    </View>
                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <Text style={styles.label}>{safeText(t.billTo)}</Text>
                        <Text>{safeText(client.name)}</Text>
                        <Text>{safeText(client.street)}</Text>
                        <Text>
                            {[client.zip, client.city]
                                .filter(Boolean)
                                .join(' ')}
                        </Text>
                        {client.region && (
                            <Text>{safeText(client.region)}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.th}>{safeText(t.name)}</Text>
                        <Text style={styles.th}>{safeText(t.description)}</Text>
                        <Text style={styles.th}>{safeText(t.quantity)}</Text>
                        <Text style={styles.th}>{safeText(t.unitPrice)}</Text>
                        <Text style={styles.th}>{safeText(t.subtotal)}</Text>
                    </View>
                    {items.map((item, i) => (
                        <View key={`${item.name}-${i}`} style={styles.tableRow}>
                            <Text style={styles.td}>{safeText(item.name)}</Text>
                            <Text style={styles.td}>
                                {safeText(item.description)}
                            </Text>
                            <Text style={styles.td}>
                                {safeText(item.quantity)}
                            </Text>
                            <Text style={styles.td}>
                                {money(item.rate, totals.currency)}
                            </Text>
                            <Text style={styles.td}>
                                {money(
                                    (item.quantity ?? 0) * (item.rate ?? 0),
                                    totals.currency,
                                )}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totals}>
                    <View style={styles.totalLine}>
                        <Text>{safeText(t.totalNet)}:</Text>
                        <Text>{money(totals.totalNet, totals.currency)}</Text>
                    </View>
                    <View style={styles.totalLine}>
                        <Text>
                            {safeText(t.tax)} ({safeText(totals.taxRate)}%):
                        </Text>
                        <Text>
                            {money(
                                (totals.totalGross ?? 0) -
                                    (totals.totalNet ?? 0),
                                totals.currency,
                            )}
                        </Text>
                    </View>
                    <View style={styles.totalLine}>
                        <Text>{safeText(t.totalGross)}:</Text>
                        <Text>{money(totals.totalGross, totals.currency)}</Text>
                    </View>
                    <View style={[styles.totalLine, styles.totalBold]}>
                        <Text>{safeText(t.amountDue)}:</Text>
                        <Text>{money(totals.amountDue, totals.currency)}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View>
                    <Text>{safeText(legal.termsAndConditions)}</Text>
                </View>

                <Text style={styles.footer}>
                    {`${safeText(footer.notes)} | ${safeText(issuer.name)} · ${safeText(issuer.city)}`}
                </Text>
            </Page>
        </Document>
    )
}
