import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const inputFields = [
  { placeholder: 'Name', autoCapitalize: 'words' as const },
  { placeholder: 'Surname', autoCapitalize: 'words' as const },
  { placeholder: 'Email', keyboardType: 'email-address' as const, autoCapitalize: 'none' as const },
  { placeholder: 'Phone Number', keyboardType: 'phone-pad' as const },
];

export default function SignupScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>Movie<Text style={styles.logoAccent}>zone</Text></Text>

          <View style={styles.heading}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Lets get you started and create your{`\n`}account!</Text>
          </View>

          <View style={styles.form}>
            {inputFields.map((field) => (
              <TextInput
                key={field.placeholder}
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#8c8c90"
                keyboardType={field.keyboardType}
                autoCapitalize={field.autoCapitalize}
              />
            ))}
            <View style={styles.passwordWrap}>
              <TextInput style={styles.passwordInput} placeholder="Password" placeholderTextColor="#8c8c90" secureTextEntry={!showPassword} />
              <Pressable onPress={() => setShowPassword((value) => !value)} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                <Text style={styles.eye}>{showPassword ? '◉' : '◎'}</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.consentRow} onPress={() => setAccepted((value) => !value)} accessibilityRole="checkbox" accessibilityState={{ checked: accepted }}>
            <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>{accepted && <Text style={styles.checkmark}>✓</Text>}</View>
            <Text style={styles.consentText}>Yes, I understand and agree to the Moviezone Terms of{`\n`}Service, including the <Text style={styles.link}>User Agreement and Privacy{`\n`}Policy.</Text></Text>
          </Pressable>

          <Pressable style={styles.signInButton} onPress={() => router.replace('/home')}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or sign in with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton} accessibilityLabel="Sign up with Facebook"><Text style={styles.facebook}>f</Text></Pressable>
            <Pressable style={styles.socialButton} accessibilityLabel="Sign up with Google"><Text style={styles.google}>G</Text></Pressable>
          </View>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.registerText}>Already registered? <Text style={styles.registerLink}>Sign In</Text></Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: '#1c1c1e' },
  content: { flexGrow: 1, width: '100%', maxWidth: 460, alignSelf: 'center', paddingHorizontal: 9, paddingTop: 16, paddingBottom: 22, alignItems: 'center' },
  logo: { color: '#f5f5f5', fontSize: 16, fontWeight: '700', marginTop: 2 },
  logoAccent: { color: '#f20d16' },
  heading: { alignItems: 'center', marginTop: 31 },
  title: { color: '#f5f5f5', fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#d0d0d2', fontSize: 12, lineHeight: 17, textAlign: 'center', marginTop: 6 },
  form: { alignSelf: 'stretch', marginTop: 31, gap: 8 },
  input: { height: 38, borderRadius: 8, paddingHorizontal: 11, backgroundColor: '#242426', color: '#fff', fontSize: 12 },
  passwordWrap: { height: 25, borderRadius: 8, paddingLeft: 11, paddingRight: 9, backgroundColor: '#242426', flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1, color: '#fff', fontSize: 12, paddingVertical: 0 },
  eye: { color: '#86868a', fontSize: 16 },
  consentRow: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 },
  checkbox: { width: 7, height: 7, borderRadius: 1, backgroundColor: '#fff', marginTop: 1, marginRight: 5, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#ff090d' },
  checkmark: { color: '#fff', fontSize: 7, lineHeight: 8 },
  consentText: { flex: 1, color: '#e3e3e3', fontSize: 10, lineHeight: 14 },
  link: { color: '#ff171c' },
  signInButton: { height: 36, width: 110, borderRadius: 4, backgroundColor: '#ff090d', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 21 },
  signInText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginTop: 20, gap: 7 },
  divider: { flex: 1, height: 1, backgroundColor: '#838386' },
  orText: { color: '#ededed', fontSize: 11 },
  socialRow: { flexDirection: 'row', gap: 11, marginTop: 20 },
  socialButton: { width: 40, height: 40, borderRadius: 9, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  facebook: { color: '#222', fontSize: 16, fontWeight: '700' },
  google: { color: '#222', fontSize: 12, fontWeight: '700' },
  registerText: { color: '#ededed', fontSize: 11, marginTop: 21 },
  registerLink: { color: '#ff171c' },
});
