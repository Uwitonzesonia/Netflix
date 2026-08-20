import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const rows = ['A', 'B', 'C', 'D', 'E'];
const reservedSeats = ['A3', 'B2', 'B3', 'C7', 'C8', 'D1', 'D2', 'E4', 'E5'];

export default function BookingScreen() {
const router = useRouter();
const { movie = 'Blade Runner 2049' } = useLocalSearchParams<{ movie?: string }>();
const [selectedSeats, setSelectedSeats] = useState<string[]>(['A2']);

  const toggleSeat = (seat: string) => {
    if (reservedSeats.includes(seat)) return;
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.headerTitle}>Choose your seat</Text><View style={styles.headerSpace} /></View>
        <Text style={styles.movieName}>{movie}</Text>
        <View style={styles.screenLabel}><Text style={styles.screenText}>Screen</Text></View>
        <View style={styles.legend}><Text style={styles.legendItem}><Text style={styles.availableDot}>●</Text> Available</Text><Text style={styles.legendItem}><Text style={styles.reservedDot}>●</Text> Reserved</Text><Text style={styles.legendItem}><Text style={styles.selectedDot}>●</Text> Selected</Text></View>
        <View style={styles.seatMap}>
          {rows.map((row) => <View key={row} style={styles.seatRow}><Text style={styles.rowLabel}>{row}</Text>{Array.from({ length: 10 }, (_, index) => { const seat = `${row}${index + 1}`; const reserved = reservedSeats.includes(seat); const selected = selectedSeats.includes(seat); return <Pressable key={seat} onPress={() => toggleSeat(seat)} style={[styles.seat, reserved && styles.reservedSeat, selected && styles.selectedSeat]} accessibilityLabel={`Seat ${seat}`} />; })}</View>)}
        </View>
        <Text style={styles.hint}>Tap a seat to select or unselect it</Text>
        <View style={styles.ticketCard}>
          <Text style={styles.brand}>Movie<Text style={styles.brandAccent}>zone</Text></Text>
          <Text style={styles.ticketHeading}>Ticket Purchase</Text>
          <Text style={styles.ticketMovie}>{movie}</Text>
          <View style={styles.ticketRow}><Text style={styles.ticketLabel}>Date</Text><Text style={styles.ticketValue}>Oct 6, Friday</Text></View>
          <View style={styles.ticketRow}><Text style={styles.ticketLabel}>Time</Text><Text style={styles.ticketValue}>20:15</Text></View>
          <View style={styles.ticketRow}><Text style={styles.ticketLabel}>Seats</Text><Text style={styles.ticketValue}>{selectedSeats.join(', ') || 'Choose seats'}</Text></View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total Payment</Text><Text style={styles.total}>£{(selectedSeats.length * 10).toFixed(2)}</Text></View>
        </View>
        <Pressable style={[styles.payButton, selectedSeats.length === 0 && styles.disabledButton]} disabled={selectedSeats.length === 0} onPress={() => router.push({ pathname: '/success', params: { movie, seats: selectedSeats.join(', '), date: '6th of October', time: '20:15' } })}><Text style={styles.payText}>Pay Now</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#19191b' }, content: { paddingBottom: 28 }, header: { height: 52, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, back: { color: '#fff', fontSize: 30 }, headerTitle: { color: '#fff', fontSize: 12 }, headerSpace: { width: 24 }, movieName: { color: '#fff', fontSize: 15, fontWeight: '700', paddingHorizontal: 14, marginTop: 8 }, screenLabel: { height: 28, marginHorizontal: 14, backgroundColor: '#f20d16', borderRadius: 5, marginTop: 17, alignItems: 'center', justifyContent: 'center' }, screenText: { color: '#fff', fontSize: 10, fontWeight: '700' }, seatMap: { marginTop: 22, gap: 8, paddingHorizontal: 14 }, seatRow: { flexDirection: 'row', alignItems: 'center', gap: 6 }, rowLabel: { color: '#aaaab0', width: 12, fontSize: 9 }, seat: { width: 15, height: 15, borderRadius: 8, backgroundColor: '#c7c7c9' }, reservedSeat: { backgroundColor: '#f20d16' }, selectedSeat: { backgroundColor: '#f7a900' }, legend: { flexDirection: 'row', gap: 14, paddingHorizontal: 32, marginTop: 17 }, legendItem: { color: '#aaaab0', fontSize: 8 }, availableDot: { color: '#c7c7c9' }, reservedDot: { color: '#f20d16' }, selectedDot: { color: '#f7a900' }, hint: { color: '#77777d', textAlign: 'center', fontSize: 9, marginTop: 14 }, ticketCard: { marginHorizontal: 14, marginTop: 26, padding: 16, borderRadius: 15, backgroundColor: '#2a2a2f' }, brand: { color: '#fff', fontSize: 13, fontWeight: '700' }, brandAccent: { color: '#f20d16' }, ticketHeading: { color: '#fff', fontSize: 13, fontWeight: '700', marginTop: 15 }, ticketMovie: { color: '#c4c4c8', fontSize: 10, marginTop: 5 }, ticketRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#414147', paddingVertical: 9 }, ticketLabel: { color: '#9d9da3', fontSize: 10 }, ticketValue: { color: '#fff', fontSize: 10, maxWidth: '65%', textAlign: 'right' }, totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 14 }, totalLabel: { color: '#fff', fontSize: 11, fontWeight: '700' }, total: { color: '#fff', fontSize: 11, fontWeight: '700' }, payButton: { alignSelf: 'center', backgroundColor: '#f20d16', borderRadius: 4, paddingVertical: 11, paddingHorizontal: 62, marginTop: 22 }, disabledButton: { opacity: 0.45 }, payText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
