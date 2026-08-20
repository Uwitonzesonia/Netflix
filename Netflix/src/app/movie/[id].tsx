import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const movies = [
  { title: 'Dune', year: '2021', duration: '155 minutes', rating: 'PG-13', image: require('@/assets/picture1.png'), director: 'Denis Villeneuve', genre: 'Sci-fi, Adventure', description: 'A noble family becomes embroiled in a war for control of the most valuable asset in the galaxy.' },
  { title: 'The Creator', year: '2023', duration: '133 minutes', rating: 'PG-13', image: require('@/assets/picture2.png'), director: 'Gareth Edwards', genre: 'Sci-fi, Action', description: 'Amid a future war between humanity and artificial intelligence, a former special forces agent is recruited for a dangerous mission.' },
  { title: 'Blade Runner 2049', year: '2017', duration: '164 minutes', rating: 'R', image: require('@/assets/picture3.png'), director: 'Denis Villeneuve', genre: 'Sci-fi, Mystery', description: 'A young blade runner unearths a long-buried secret that leads him to track down a former blade runner who has been missing for thirty years.' },
  { title: 'Oppenheimer', year: '2023', duration: '180 minutes', rating: 'R', image: require('@/assets/picture4.png'), director: 'Christopher Nolan', genre: 'Biography, Drama', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.' },
  { title: 'Past Lives', year: '2023', duration: '106 minutes', rating: 'PG-13', image: require('@/assets/picture5.png'), director: 'Celine Song', genre: 'Drama, Romance', description: 'Two childhood friends reunite in New York for one week, confronting ideas of destiny and the choices that shape a life.' },
  { title: 'The Batman', year: '2022', duration: '176 minutes', rating: 'PG-13', image: require('@/assets/picture6.png'), director: 'Matt Reeves', genre: 'Crime, Action', description: 'Batman ventures into Gotham City corruption and faces a killer who leaves cryptic clues for him to solve.' },
];

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = movies.find((item) => item.title === id) ?? movies[0];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={movie.image} contentFit="cover" style={styles.cover} />
          <View style={styles.heroShade} />
          <Pressable onPress={() => router.back()} style={styles.backButton}><Text style={styles.back}>‹</Text></Pressable>
          <Pressable style={styles.favorite}><Text style={styles.favoriteText}>♡</Text></Pressable>
        </View>
        <View style={styles.body}>
          <Text style={styles.kicker}>MOVIE DETAILS</Text>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metaRow}><Text style={styles.rating}>★ 4.8</Text><Text style={styles.meta}>{movie.rating}</Text><Text style={styles.meta}>{movie.year}</Text><Text style={styles.meta}>{movie.duration}</Text></View>
          <Text style={styles.description}>{movie.description}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}><Text style={styles.label}>Director</Text><Text style={styles.value}>{movie.director}</Text></View>
            <View style={styles.infoItem}><Text style={styles.label}>Genre</Text><Text style={styles.value}>{movie.genre}</Text></View>
            <View style={styles.infoItem}><Text style={styles.label}>Release Date</Text><Text style={styles.value}>October 6, 2017</Text></View>
            <View style={styles.infoItem}><Text style={styles.label}>Ticket Price</Text><Text style={styles.value}>£10.00</Text></View>
          </View>
          <Text style={styles.sectionTitle}>Viewing Schedule</Text>
          <View style={styles.days}>{['Oct 6\nFriday', 'Oct 7\nSaturday', 'Oct 8\nSunday'].map((day, index) => <Pressable key={day} style={[styles.day, index === 0 && styles.selectedDay]}><Text style={styles.dayText}>{day}</Text></Pressable>)}</View>
          <Text style={styles.sectionTitle}>Viewing Times</Text>
          <View style={styles.times}>{['11:15', '14:15', '17:15'].map((time) => <Pressable key={time} style={styles.timeButton}><Text style={styles.timeText}>{time}</Text><Text style={styles.available}>16 Seats Available</Text></Pressable>)}</View>
          <Pressable style={styles.bookButton} onPress={() => router.push({ pathname: '/booking', params: { movie: movie.title } })}><Text style={styles.bookText}>Book a Seat</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141416' }, content: { paddingBottom: 30 },
  hero: { height: 300, position: 'relative', backgroundColor: '#26262a' }, cover: { width: '100%', height: '100%' }, heroShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.38)' },
  backButton: { position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' }, back: { color: '#fff', fontSize: 29, lineHeight: 32 }, favorite: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' }, favoriteText: { color: '#fff', fontSize: 24 },
  body: { padding: 18 }, kicker: { color: '#f20d16', fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 7 }, title: { color: '#fff', fontSize: 26, fontWeight: '700' }, metaRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 10 }, rating: { color: '#111', backgroundColor: '#fff', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, fontSize: 9, fontWeight: '700' }, meta: { color: '#c4c4c8', fontSize: 10 }, description: { color: '#d3d3d6', lineHeight: 19, fontSize: 12, marginTop: 16 }, infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 }, infoItem: { width: '47%', backgroundColor: '#202024', borderRadius: 8, padding: 10 }, label: { color: '#8d8d93', fontSize: 9 }, value: { color: '#fff', fontSize: 11, marginTop: 4 }, sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 28 }, days: { flexDirection: 'row', gap: 8, marginTop: 12 }, day: { flex: 1, borderWidth: 1, borderColor: '#55555b', borderRadius: 8, alignItems: 'center', paddingVertical: 11 }, selectedDay: { borderColor: '#f20d16', backgroundColor: '#35191c' }, dayText: { color: '#fff', textAlign: 'center', fontSize: 10, lineHeight: 15 }, times: { flexDirection: 'row', gap: 8, marginTop: 12 }, timeButton: { flex: 1, backgroundColor: '#252529', borderRadius: 8, alignItems: 'center', paddingVertical: 11 }, timeText: { color: '#fff', fontSize: 12, fontWeight: '700' }, available: { color: '#9b9ba0', fontSize: 7, marginTop: 5 }, bookButton: { alignSelf: 'stretch', backgroundColor: '#f20d16', borderRadius: 7, paddingVertical: 14, alignItems: 'center', marginTop: 28 }, bookText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
