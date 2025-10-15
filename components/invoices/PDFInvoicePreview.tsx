import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer'

function PDFInvoiceDocument({ invoiceDetails, issuer, client, items }: any) {
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.title}>Invoice</Text>
                    <Text>{invoiceDetails.invoiceNumber}</Text>
                    <Text>{invoiceDetails.dueDate}</Text>{' '}
                    <Text>{invoiceDetails.invoiceDate}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>From:</Text>
                    <Text>{issuer?.name}</Text>
                    <Text>{issuer?.address}</Text>
                    <Text>{issuer?.email}</Text>
                    <Text>{issuer?.phone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Bill To:</Text>
                    <Text>{client?.name}</Text>
                    <Text>{client?.address}</Text>
                    <Text>{client?.email}</Text>
                    <Text>{client?.phone}</Text>
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
    subtitle: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
    section: { marginBottom: 12 },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    total: { fontWeight: 'bold', fontSize: 14, marginTop: 8 },
})

export default function PDFInvoicePreview(props: any) {
    return (
        <div className="w-full h-[900px] bg-white rounded shadow overflow-hidden">
            <PDFViewer
                width="100%"
                height="100%"
                showToolbar={props.showToolbar}>
                <PDFInvoiceDocument {...props} />
            </PDFViewer>
        </div>
    )
}
