'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { InvoiceDetails, Issuer, Client, InvoiceItem } from '@/types/Invoice'

interface PDFInvoiceDocumentProps {
    invoiceDetails: InvoiceDetails
    issuer: Issuer
    client: Client
    items: InvoiceItem[]
}

export default function PDFInvoiceDocument({
    invoiceDetails,
    issuer,
    client,
    items,
}: PDFInvoiceDocumentProps) {
    const subtotal = items.reduce((acc, i) => acc + i.rate * i.quantity, 0)
    const formatEuro = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Rechnung</Text>
                    <View style={{ textAlign: 'right' }}>
                        <Text>
                            Rechnungsnummer: {invoiceDetails.invoiceNumber}
                        </Text>
                        <Text>
                            Rechnungsdatum: {invoiceDetails.invoiceDate}
                        </Text>
                        {invoiceDetails.dueDate && (
                            <Text>
                                Fälligkeitsdatum: {invoiceDetails.dueDate}
                            </Text>
                        )}
                        {invoiceDetails.reference && (
                            <Text>Referenz: {invoiceDetails.reference}</Text>
                        )}
                    </View>
                </View>

                {/* Issuer */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Von:</Text>
                    <Text>{issuer.name}</Text>
                    <Text>{issuer.address}</Text>
                    <Text>
                        {issuer.city}, {issuer.state} {issuer.zip}
                    </Text>
                    <Text>{issuer.email}</Text>
                    <Text>{issuer.phone}</Text>
                </View>

                {/* Client */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Rechnung an:</Text>
                    <Text>{client.name}</Text>
                    <Text>{client.address}</Text>
                    <Text>
                        {client.city}, {client.state} {client.zip}
                    </Text>
                    <Text>{client.email}</Text>
                    <Text>{client.phone}</Text>
                </View>

                {/* Items */}
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Positionen:</Text>
                    <View style={[styles.itemRow, styles.itemHeader]}>
                        <Text style={{ flex: 2 }}>Name</Text>
                        <Text style={{ flex: 3 }}>Beschreibung</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            Menge
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            Preis
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>
                            Zwischensumme
                        </Text>
                    </View>

                    {items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={{ flex: 2 }}>{item.name}</Text>
                            <Text style={{ flex: 3 }}>{item.description}</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {item.quantity}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {formatEuro(item.rate)}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                                {formatEuro(item.rate * item.quantity)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.total}>
                        Zwischensumme: {formatEuro(subtotal)}
                    </Text>
                    <Text style={styles.total}>
                        Gesamt: {formatEuro(subtotal)}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    body: { padding: 32, fontSize: 12 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    section: { marginBottom: 12 },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 2,
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
    total: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'right',
    },
})
