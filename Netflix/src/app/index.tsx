import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>Movie<Text style={styles.logoAccent}>zone</Text></Text>

          <View style={styles.heading}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please sign in to your account to{`\n`}continue</Text>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Email / Phone Number" placeholderTextColor="#8c8c90" keyboardType="email-address" autoCapitalize="none" />
            <View style={styles.passwordWrap}>
              <TextInput style={styles.passwordInput} placeholder="Password" placeholderTextColor="#8c8c90" secureTextEntry={!showPassword} />
              <Pressable onPress={() => setShowPassword((value) => !value)} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                <Text style={styles.eye}>{showPassword ? '◉' : '◎'}</Text>
              </Pressable>
            </View>
            <Pressable style={styles.signInButton} onPress={() => router.replace('/home')}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or sign in with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton} accessibilityLabel="Sign in with Facebook"><Text style={styles.facebook}>f</Text></Pressable>
            <Pressable style={styles.socialButton} accessibilityLabel="Sign in with Google"><Text style={styles.google}>G</Text></Pressable>
          </View>

          <Pressable onPress={() => router.push('/signup')}>
            <Text style={styles.registerText}>Not registered yet? <Text style={styles.registerLink}>Sign Up</Text></Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 28,
    alignItems: 'center',
  },
  logo: { color: '#f5f5f5', fontSize: 18, fontWeight: '700', marginTop: 2 },
  logoAccent: { color: '#f20d16' },
  heading: { alignItems: 'center', marginTop: 42 },
  title: { color: '#f5f5f5', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#d0d0d2', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  form: { alignSelf: 'stretch', marginTop: 41, gap: 10 },
  input: { height: 44, borderRadius: 11, paddingHorizontal: 13, backgroundColor: '#242426', color: '#fff', fontSize: 14 },
  passwordWrap: { height: 33, borderRadius: 11, paddingLeft: 13, paddingRight: 12, backgroundColor: '#242426', flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 0 },
  eye: { color: '#86868a', fontSize: 18 },
  signInButton: { height: 40, width: 120, borderRadius: 5, backgroundColor: '#ff090d', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 13 },
  signInText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginTop: 25, gap: 8 },
  divider: { flex: 1, height: 1, backgroundColor: '#838386' },
  orText: { color: '#ededed', fontSize: 12 },
  socialRow: { flexDirection: 'row', gap: 14, marginTop: 25 },
  socialButton: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  facebook: { color: '#222', fontSize: 21, fontWeight: '700' },
  google: { color: '#222', fontSize: 16, fontWeight: '700' },
  registerText: { color: '#ededed', fontSize: 12, marginTop: 27 },
  registerLink: { color: '#ff171c' },
});
