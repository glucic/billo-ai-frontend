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

export default function PDFInvoiceDocument({
    invoiceDetails,
    bankDetails,
    issuer,
    client,
    items,
    totals,
    legal,
    footer,
    t,
}: {
    invoiceDetails: InvoiceDetails
    bankDetails: BankDetails
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
                    {t.title ? (
                        <Text style={styles.title}>{safeText(t.title)}</Text>
                    ) : null}
                </View>

                {/* Invoice Details */}
                <View style={styles.section}>
                    {invoiceDetails.invoiceNumber ? (
                        <Text>
                            {safeText(t.invoiceNumber)}:{' '}
                            {safeText(invoiceDetails.invoiceNumber)}
                        </Text>
                    ) : null}
                    {invoiceDetails.invoiceDate ? (
                        <Text>
                            {safeText(t.invoiceDate)}:{' '}
                            {safeText(invoiceDetails.invoiceDate)}
                        </Text>
                    ) : null}
                    {invoiceDetails.dueDate ? (
                        <Text>
                            {safeText(t.dueDate)}:{' '}
                            {safeText(invoiceDetails.dueDate)}
                        </Text>
                    ) : null}
                    {invoiceDetails.reference ? (
                        <Text>
                            {safeText(t.reference)}:{' '}
                            {safeText(invoiceDetails.reference)}
                        </Text>
                    ) : null}
                </View>

                <View style={styles.divider} />

                {/* Issuer / Client */}
                <View style={[styles.section, styles.rowBetween]}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        {issuer.name ? (
                            <Text style={styles.label}>{safeText(t.from)}</Text>
                        ) : null}
                        {issuer.name ? (
                            <Text>{safeText(issuer.name)}</Text>
                        ) : null}
                        {issuer.street ? (
                            <Text>{safeText(issuer.street)}</Text>
                        ) : null}
                        {issuer.zip || issuer.city ? (
                            <Text>
                                {[issuer.zip, issuer.city]
                                    .filter(Boolean)
                                    .join(' ')}
                            </Text>
                        ) : null}
                        {issuer.region ? (
                            <Text>{safeText(issuer.region)}</Text>
                        ) : null}
                    </View>

                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        {client.name ? (
                            <Text style={styles.label}>
                                {safeText(t.billTo)}
                            </Text>
                        ) : null}
                        {client.name ? (
                            <Text>{safeText(client.name)}</Text>
                        ) : null}
                        {client.street ? (
                            <Text>{safeText(client.street)}</Text>
                        ) : null}
                        {client.zip || client.city ? (
                            <Text>
                                {[client.zip, client.city]
                                    .filter(Boolean)
                                    .join(' ')}
                            </Text>
                        ) : null}
                        {client.region ? (
                            <Text>{safeText(client.region)}</Text>
                        ) : null}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Items Table */}
                {items && items.length > 0 ? (
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.th}>{safeText(t.name)}</Text>
                            <Text style={styles.th}>
                                {safeText(t.description)}
                            </Text>
                            <Text style={styles.th}>
                                {safeText(t.quantity)}
                            </Text>
                            <Text style={styles.th}>
                                {safeText(t.unitPrice)}
                            </Text>
                            <Text style={styles.th}>
                                {safeText(t.subtotal)}
                            </Text>
                        </View>
                        {items.map((item, i) => (
                            <View
                                key={`${item.name}-${i}`}
                                style={styles.tableRow}>
                                {item.name ? (
                                    <Text style={styles.td}>
                                        {safeText(item.name)}
                                    </Text>
                                ) : (
                                    <Text style={styles.td}>—</Text>
                                )}
                                {item.description ? (
                                    <Text style={styles.td}>
                                        {safeText(item.description)}
                                    </Text>
                                ) : (
                                    <Text style={styles.td}>—</Text>
                                )}
                                {item.quantity ? (
                                    <Text style={styles.td}>
                                        {safeText(item.quantity)}
                                    </Text>
                                ) : (
                                    <Text style={styles.td}>—</Text>
                                )}
                                {item.rate ? (
                                    <Text style={styles.td}>
                                        {money(item.rate, totals.currency)}
                                    </Text>
                                ) : (
                                    <Text style={styles.td}>—</Text>
                                )}
                                <Text style={styles.td}>
                                    {money(
                                        (item.quantity ?? 0) * (item.rate ?? 0),
                                        totals.currency,
                                    )}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : null}

                {/* Totals */}
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

                {/* Banking */}
                {bankDetails.accountHolder ||
                bankDetails.bankName ||
                bankDetails.iban ||
                bankDetails.bic ? (
                    <View style={[styles.section, { marginTop: 12 }]}>
                        <Text style={styles.label}>
                            {safeText(t.paymentInformation)}
                        </Text>

                        {bankDetails.accountHolder ? (
                            <Text>
                                {safeText(t.accountHolder)}:{' '}
                                {safeText(bankDetails.accountHolder)}
                            </Text>
                        ) : null}

                        {bankDetails.bankName ? (
                            <Text>
                                {safeText(t.bankName)}:{' '}
                                {safeText(bankDetails.bankName)}
                            </Text>
                        ) : null}

                        {bankDetails.iban ? (
                            <Text>
                                {safeText(t.iban)}: {safeText(bankDetails.iban)}
                            </Text>
                        ) : null}

                        {bankDetails.bic ? (
                            <Text>
                                {safeText(t.bic)}: {safeText(bankDetails.bic)}
                            </Text>
                        ) : null}
                    </View>
                ) : null}

                <View style={styles.divider} />

                {/* Legal Terms */}
                {legal.termsAndConditions ? (
                    <View>
                        <Text>{safeText(legal.termsAndConditions)}</Text>
                    </View>
                ) : null}

                {/* Footer */}
                {footer.notes || issuer.name || issuer.city ? (
                    <Text style={styles.footer}>
                        {[footer.notes, issuer.name, issuer.city]
                            .filter(Boolean)
                            .join(' · ')}
                    </Text>
                ) : null}
            </Page>
        </Document>
    )
}
