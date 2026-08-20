import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  const router = useRouter();
  const { movie = 'your movie', seats = 'A2', date = '6th of October', time = '20:15' } = useLocalSearchParams<{ movie?: string; seats?: string; date?: string; time?: string }>();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <Image source={require('@/assets/picture13.png')} contentFit="cover" style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.successIcon}><Text style={styles.checkmark}>✓</Text></View>
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.message}>Your seat has been reserved.</Text>
        <Text style={styles.details}>Be sure to show up at Gables, Eswatini{`\n`}on the {date} with the details of{`\n`}your ticket purchase!</Text>
        <View style={styles.ticketSummary}>
          <Text style={styles.movie}>{movie}</Text>
          <Text style={styles.summaryText}>Seats: {seats}</Text>
          <Text style={styles.summaryText}>Viewing time: {time}</Text>
        </View>
        <Pressable style={styles.proceedButton} onPress={() => router.replace('/home')}>
          <Text style={styles.proceedText}>Proceed</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#171719' },
  backgroundImage: { ...StyleSheet.absoluteFill, opacity: 0.22 },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10, 10, 12, 0.76)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  successIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#00d447', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  checkmark: { color: '#101014', fontSize: 40, lineHeight: 46, fontWeight: '800' },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  message: { color: '#fff', fontSize: 10, marginTop: 7 },
  details: { color: '#ededee', fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 12 },
  ticketSummary: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#48484d', width: '100%', alignItems: 'center', paddingVertical: 12, marginTop: 19 },
  movie: { color: '#fff', fontSize: 11, fontWeight: '700' },
  summaryText: { color: '#bcbcc1', fontSize: 9, marginTop: 4 },
  proceedButton: { backgroundColor: '#f20d16', borderRadius: 4, minWidth: 76, alignItems: 'center', paddingVertical: 9, marginTop: 25 },
  proceedText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
