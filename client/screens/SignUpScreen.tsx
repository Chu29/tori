import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { RootStackParamList } from '@/navigation/RootStackNavigator';
import { useTheme } from '@/hooks/useTheme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <KeyboardAwareScrollViewCompat
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + Spacing['3xl'], paddingBottom: insets.bottom + Spacing.xl }
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            Connect with your friends today!
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundDefault, color: theme.text, borderColor: theme.border }]}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Mobile Number</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundDefault, color: theme.text, borderColor: theme.border }]}
              placeholder="Enter your mobile number"
              placeholderTextColor={theme.textSecondary}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, { backgroundColor: theme.backgroundDefault, color: theme.text, borderColor: theme.border }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.termsContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
            <View style={[styles.checkbox, agreeTerms && { backgroundColor: theme.primary, borderColor: theme.primary }, { borderColor: theme.border }]}>
              {agreeTerms && <Feather name="check" size={14} color="#FFFFFF" />}
            </View>
            <ThemedText style={[styles.termsText, { color: theme.textSecondary }]}>
              I agree to the terms and conditions
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.signupButton, { backgroundColor: theme.secondary }, pressed && styles.buttonPressed]}
            onPress={handleSignUp}
          >
            <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
          </Pressable>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <ThemedText style={[styles.dividerText, { color: theme.textSecondary }]}>Or Sign Up With</ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>

          <View style={styles.socialButtons}>
            <Pressable style={({ pressed }) => [styles.socialButton, { borderColor: theme.border }, pressed && styles.buttonPressed]}>
              <ThemedText style={styles.socialIcon}>G</ThemedText>
              <ThemedText style={{ color: theme.text }}>Google</ThemedText>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.socialButton, { borderColor: theme.border }, pressed && styles.buttonPressed]}>
              <Feather name="facebook" size={20} color="#1877F2" />
              <ThemedText style={{ color: theme.text }}>Facebook</ThemedText>
            </Pressable>
          </View>

          <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <ThemedText style={{ color: theme.textSecondary }}>
              Already have an account? <ThemedText style={{ color: theme.primary, fontWeight: '600' }}>Login</ThemedText>
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },
  header: {
    marginBottom: Spacing['3xl'],
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
  },
  form: {
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: Spacing.sm,
  },
  label: {
    ...Typography.small,
    fontWeight: '500',
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    ...Typography.body,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: Spacing.lg,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    ...Typography.small,
  },
  signupButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  signupButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginVertical: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...Typography.small,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EA4335',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});
