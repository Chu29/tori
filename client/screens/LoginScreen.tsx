import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Spacing, BorderRadius, Typography, Colors } from '@/constants/theme';
import { RootStackParamList } from '@/navigation/RootStackNavigator';
import { useTheme } from '@/hooks/useTheme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
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
          <ThemedText style={styles.title}>Hi, Welcome Back!</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            Hello again, you've been missed!
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
            <Pressable style={styles.forgotPassword}>
              <ThemedText style={[styles.forgotPasswordText, { color: theme.primary }]}>Forgot Password</ThemedText>
            </Pressable>
          </View>

          <Pressable style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && { backgroundColor: theme.primary, borderColor: theme.primary }, { borderColor: theme.border }]}>
              {rememberMe && <Feather name="check" size={14} color="#FFFFFF" />}
            </View>
            <ThemedText style={[styles.rememberText, { color: theme.textSecondary }]}>Remember Me</ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.loginButton, { backgroundColor: theme.secondary }, pressed && styles.buttonPressed]}
            onPress={handleLogin}
          >
            <ThemedText style={styles.loginButtonText}>Login</ThemedText>
          </Pressable>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <ThemedText style={[styles.dividerText, { color: theme.textSecondary }]}>Or Login With</ThemedText>
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

          <Pressable style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
            <ThemedText style={{ color: theme.textSecondary }}>
              Don't have an account? <ThemedText style={{ color: theme.primary, fontWeight: '600' }}>Sign Up</ThemedText>
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    ...Typography.small,
    fontWeight: '500',
  },
  rememberContainer: {
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
  rememberText: {
    ...Typography.small,
  },
  loginButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  loginButtonText: {
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
  signupLink: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});
