import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menuItems = [
  { label: 'My Tickets', icon: '▣', route: '/tickets' as const },
  { label: 'Payment Methods', icon: '▰' },
  { label: 'Rewards & Coupons', icon: '◎' },
  { label: 'Account Settings', icon: '▧' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} accessibilityLabel="Go back"><Text style={styles.back}>‹</Text></Pressable>
          <View style={styles.headerActions}><Pressable accessibilityLabel="Edit profile"><Text style={styles.action}>□</Text></Pressable><Pressable onPress={() => router.replace('/')} accessibilityLabel="Sign out"><Text style={styles.logout}>↪</Text></Pressable></View>
        </View>
        <Image source={require('@/assets/picture14.png')} contentFit="cover" style={styles.avatar} />
        <Text style={styles.name}>Marybeth Walker</Text>
        <Text style={styles.email}>marybethwalker@gmail.com</Text>
        <Text style={styles.phone}>+268 00000000</Text>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable key={item.label} style={styles.menuItem} onPress={() => item.route && router.push(item.route)}>
              <View style={styles.menuLeft}><Text style={styles.menuIcon}>{item.icon}</Text><Text style={styles.menuLabel}>{item.label}</Text></View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#19191b' }, content: { flexGrow: 1, paddingBottom: 30 },
  header: { height: 48, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, back: { color: '#fff', fontSize: 28 }, headerActions: { flexDirection: 'row', gap: 18 }, action: { color: '#d6d6d9', fontSize: 20 }, logout: { color: '#f20d16', fontSize: 21 },
  avatar: { width: 58, height: 58, borderRadius: 29, alignSelf: 'center', marginTop: 8 }, name: { color: '#fff', fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 10 }, email: { color: '#b1b1b6', fontSize: 9, textAlign: 'center', marginTop: 5 }, phone: { color: '#b1b1b6', fontSize: 9, textAlign: 'center', marginTop: 5 },
  menu: { gap: 10, marginTop: 28, paddingHorizontal: 12 }, menuItem: { height: 38, borderRadius: 7, paddingHorizontal: 11, backgroundColor: '#2a2a2f', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 }, menuIcon: { color: '#fff', width: 14, textAlign: 'center', fontSize: 13 }, menuLabel: { color: '#fff', fontSize: 9 }, chevron: { color: '#c7c7ca', fontSize: 20 },
});
