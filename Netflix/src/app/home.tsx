import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const heroImage = require('@/assets/picture2.png');
const movieImages = [
  require('@/assets/picture1.png'),
  require('@/assets/picture2.png'),
  require('@/assets/picture3.png'),
  require('@/assets/picture4.png'),
  require('@/assets/picture5.png'),
  require('@/assets/picture6.png'),
];
const comingSoonImages = [
  require('@/assets/picture7.png'),
  require('@/assets/picture8.png'),
  require('@/assets/picture9.png'),
  require('@/assets/picture10.png'),
  require('@/assets/picture11.png'),
  require('@/assets/picture12.png'),
];

const nowPlaying = [
  { title: 'Dune', year: '2021', duration: '155 minutes', rating: 'PG-13', image: movieImages[0] },
  { title: 'The Creator', year: '2023', duration: '133 minutes', rating: 'PG-13', image: movieImages[1] },
  { title: 'Blade Runner 2049', year: '2017', duration: '164 minutes', rating: 'R', image: movieImages[2] },
  { title: 'Oppenheimer', year: '2023', duration: '180 minutes', rating: 'R', image: movieImages[3] },
  { title: 'Past Lives', year: '2023', duration: '106 minutes', rating: 'PG-13', image: movieImages[4] },
  { title: 'The Batman', year: '2022', duration: '176 minutes', rating: 'PG-13', image: movieImages[5] },
];

const comingSoon = [
  { title: 'The Last Voyage', year: '2026', duration: '128 minutes', rating: 'PG-13', image: comingSoonImages[0] },
  { title: 'Mickey 17', year: '2026', duration: '137 minutes', rating: 'R', image: comingSoonImages[1] },
  { title: 'Avatar 3', year: '2026', duration: '192 minutes', rating: 'PG-13', image: comingSoonImages[2] },
  { title: 'Project Hail Mary', year: '2026', duration: '150 minutes', rating: 'PG-13', image: comingSoonImages[3] },
  { title: 'The Odyssey', year: '2026', duration: '140 minutes', rating: 'PG-13', image: comingSoonImages[4] },
  { title: 'Supergirl', year: '2026', duration: '125 minutes', rating: 'PG-13', image: comingSoonImages[5] },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 760;

  const renderMovies = (movies: typeof nowPlaying, comingSoonSection = false) => {
    const movieCards = movies.map((movie) => (
      <Pressable key={movie.title} style={[styles.movieCard, isWideScreen && styles.wideMovieCard]} onPress={() => router.push({ pathname: '/movie/[id]', params: { id: movie.title } })}>
        <View style={styles.posterWrap}>
          <Image source={movie.image} contentFit="cover" style={styles.poster} />
          <Pressable style={styles.favorite} accessibilityLabel={`Add ${movie.title} to favorites`}><Text style={styles.heart}>♡</Text></Pressable>
          <View style={styles.showtimes}>
            {comingSoonSection ? <Text style={styles.time}>{movie.year}</Text> : <Text style={styles.time}>11:15</Text>}
            {comingSoonSection ? <Text style={styles.time}>Coming Soon</Text> : <>
              <Text style={styles.time}>14:15</Text>
              <Text style={styles.time}>17:15</Text>
              <Text style={styles.time}>20:15</Text>
            </>}
          </View>
        </View>
        <View style={styles.movieDetails}>
          <Text style={styles.detail}>{movie.duration}</Text>
          <Text style={styles.detail}>{movie.rating}</Text>
        </View>
        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
      </Pressable>
    ));

    return isWideScreen ? (
      <View style={styles.wideMovieList}>{movieCards}</View>
    ) : (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.movieList}>{movieCards}</ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>Movie<Text style={styles.logoAccent}>zone</Text></Text>
          <Pressable accessibilityLabel="Open notifications"><Text style={styles.bell}>♧</Text></Pressable>
        </View>

        <View style={[styles.hero, isWideScreen && styles.wideHero]}>
          <Image source={heroImage} contentFit="cover" style={styles.heroImage} />
          <View style={styles.heroShade} />
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>Blade Runner 2049</Text>
            <View style={styles.metaRow}>
              <Text style={styles.ratingBadge}>★ 4.8</Text>
              <Text style={styles.meta}>R</Text>
              <Text style={styles.meta}>2017</Text>
              <Text style={styles.meta}>Sci-fi</Text>
              <Text style={styles.meta}>Action</Text>
            </View>
            <Pressable style={styles.watchButton} onPress={() => router.push({ pathname: '/movie/[id]', params: { id: 'Blade Runner 2049' } })}>
              <Text style={styles.watchText}>Watch Now</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.pagination}>
          <View style={[styles.pageDot, styles.activeDot]} />
          <View style={styles.pageDot} />
          <View style={styles.pageDot} />
          <View style={styles.pageDot} />
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          <Text style={styles.sectionSubtitle}>Playing in theaters now</Text>
        </View>

        {renderMovies(nowPlaying)}

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Coming Soon This Year</Text>
          <Text style={styles.sectionSubtitle}>Get ready for the latest releases</Text>
        </View>

        {renderMovies(comingSoon, true)}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.navItem}><Text style={[styles.navIcon, styles.selected]}>⌂</Text><Text style={[styles.navText, styles.selected]}>Home</Text></Pressable>
        <Pressable style={styles.navItem}><Text style={styles.navIcon}>⌕</Text><Text style={styles.navText}>Search</Text></Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/signup')}><Text style={styles.navIcon}>◯</Text><Text style={styles.navText}>Profile</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#19191b' },
  content: { width: '100%', maxWidth: 1120, alignSelf: 'center', paddingBottom: 86 },
  header: { height: 48, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { color: '#f5f5f5', fontSize: 15, fontWeight: '700' },
  logoAccent: { color: '#f20d16' },
  bell: { color: '#f5f5f5', fontSize: 20, transform: [{ rotate: '180deg' }] },
  hero: { height: 245, marginHorizontal: 1, overflow: 'hidden', borderRadius: 13, backgroundColor: '#eee' },
  wideHero: { height: 390, marginHorizontal: 10 },
  heroImage: { ...StyleSheet.absoluteFill },
  heroShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.12)' },
  heroInfo: { position: 'absolute', left: 0, right: 0, bottom: 12, alignItems: 'center' },
  heroTitle: { color: '#fff', fontSize: 15, fontWeight: '700', textShadowColor: '#000', textShadowRadius: 5 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  ratingBadge: { color: '#111', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 2, fontSize: 7, fontWeight: '700' },
  meta: { color: '#fff', fontSize: 7, textShadowColor: '#000', textShadowRadius: 4 },
  watchButton: { backgroundColor: '#f20d16', borderRadius: 4, paddingHorizontal: 17, paddingVertical: 7, marginTop: 9 },
  watchText: { color: '#fff', fontSize: 8, fontWeight: '700' },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 8 },
  pageDot: { width: 8, height: 1, backgroundColor: '#6d6d70' },
  activeDot: { backgroundColor: '#ee141b' },
  sectionHeading: { paddingHorizontal: 10, marginTop: 28 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sectionSubtitle: { color: '#aaaab0', fontSize: 8, marginTop: 5 },
  movieList: { paddingHorizontal: 9, gap: 9, paddingTop: 16 },
  wideMovieList: { flexDirection: 'row', gap: 10, paddingHorizontal: 10, paddingTop: 16 },
  movieCard: { width: 118 },
  wideMovieCard: { flex: 1, width: undefined, minWidth: 0 },
  posterWrap: { aspectRatio: 0.7, borderRadius: 6, overflow: 'hidden', backgroundColor: '#35353a', position: 'relative' },
  poster: { width: '100%', height: '100%' },
  favorite: { position: 'absolute', top: 5, right: 5 },
  heart: { color: '#fff', fontSize: 22, textShadowColor: '#000', textShadowRadius: 4 },
  showtimes: { position: 'absolute', bottom: 6, left: 5, right: 5, flexDirection: 'row', gap: 3 },
  time: { color: '#fff', backgroundColor: '#ee1118', borderRadius: 4, paddingHorizontal: 3, paddingVertical: 3, fontSize: 6, fontWeight: '700' },
  movieDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 },
  detail: { color: '#aaaab0', fontSize: 7 },
  movieTitle: { color: '#fff', fontSize: 8, fontWeight: '600', marginTop: 6 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 65, paddingBottom: 8, backgroundColor: '#1b1b1d', borderTopWidth: 1, borderTopColor: '#303034', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', gap: 3 },
  navIcon: { color: '#8d8d93', fontSize: 20 },
  navText: { color: '#8d8d93', fontSize: 8 },
  selected: { color: '#f20d16' },
});
