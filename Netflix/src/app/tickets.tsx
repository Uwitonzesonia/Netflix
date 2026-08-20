import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { latestBooking } from '@/data/booking';

export default function TicketsScreen() {
  const router = useRouter();
  const booking = latestBooking;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.headerTitle}>My Tickets</Text><View style={styles.spacer} /></View>
        {booking ? (
          <View style={styles.ticket}>
            <View style={styles.ticketTop}><Text style={styles.brand}>Movie<Text style={styles.brandAccent}>zone</Text></Text><Text style={styles.status}>CONFIRMED</Text></View>
            <Text style={styles.movie}>{booking.movie}</Text>
            <Text style={styles.venue}>Gables Cinema, Eswatini</Text>
            <View style={styles.divider} />
            <View style={styles.details}><View><Text style={styles.label}>DATE</Text><Text style={styles.value}>{booking.date}</Text></View><View><Text style={styles.label}>TIME</Text><Text style={styles.value}>{booking.time}</Text></View><View><Text style={styles.label}>SEATS</Text><Text style={styles.value}>{booking.seats}</Text></View></View>
            <View style={styles.barcode}><Text style={styles.barcodeLines}>||| |||| || ||||| ||| |||| || ||| ||||</Text><Text style={styles.ticketCode}>MOVIEZONE · TICKET</Text></View>
          </View>
        ) : (
          <View style={styles.empty}><Text style={styles.emptyIcon}>▣</Text><Text style={styles.emptyTitle}>No tickets yet</Text><Text style={styles.emptyText}>Your confirmed movie bookings will appear here.</Text><Pressable style={styles.browseButton} onPress={() => router.replace('/home')}><Text style={styles.browseText}>Browse Movies</Text></Pressable></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#19191b' }, content: { flexGrow: 1, paddingBottom: 30 }, header: { height: 52, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, back: { color: '#fff', fontSize: 30 }, headerTitle: { color: '#fff', fontSize: 13 }, spacer: { width: 24 },
  ticket: { margin: 14, padding: 17, borderRadius: 14, backgroundColor: '#2a2a2f' }, ticketTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, brand: { color: '#fff', fontSize: 14, fontWeight: '700' }, brandAccent: { color: '#f20d16' }, status: { color: '#00d447', fontSize: 8, fontWeight: '700' }, movie: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 24 }, venue: { color: '#b9b9be', fontSize: 10, marginTop: 6 }, divider: { height: 1, backgroundColor: '#48484e', marginVertical: 18 }, details: { flexDirection: 'row', justifyContent: 'space-between' }, label: { color: '#929298', fontSize: 8 }, value: { color: '#fff', fontSize: 11, marginTop: 5, maxWidth: 100 }, barcode: { marginTop: 24, alignItems: 'center', paddingTop: 15, borderTopWidth: 1, borderColor: '#48484e' }, barcodeLines: { color: '#fff', fontSize: 18, letterSpacing: 2 }, ticketCode: { color: '#929298', fontSize: 8, marginTop: 6 },
  empty: { alignItems: 'center', paddingHorizontal: 30, marginTop: 130 }, emptyIcon: { color: '#66666d', fontSize: 38 }, emptyTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 14 }, emptyText: { color: '#aaaab0', fontSize: 11, textAlign: 'center', marginTop: 8 }, browseButton: { backgroundColor: '#f20d16', borderRadius: 5, paddingHorizontal: 28, paddingVertical: 11, marginTop: 24 }, browseText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
