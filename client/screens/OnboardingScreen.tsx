import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <LinearGradient
      colors={["#14B8A6", "#8B5CF6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
      >
        <View style={styles.avatarsContainer}>
          <View style={[styles.avatarCard, styles.avatarTopLeft]}>
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Alex&background=f87171&color=fff&size=80",
              }}
              style={styles.avatarImage}
            />
          </View>
          <View style={[styles.avatarCard, styles.avatarTopRight]}>
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Sarah&background=fbbf24&color=fff&size=80",
              }}
              style={styles.avatarImage}
            />
          </View>
          <View style={[styles.avatarCard, styles.avatarBottomLeft]}>
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Mike&background=a78bfa&color=fff&size=80",
              }}
              style={styles.avatarImage}
            />
          </View>
          <View style={[styles.avatarCard, styles.avatarCenter]}>
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Emma&background=34d399&color=fff&size=80",
              }}
              style={styles.avatarImage}
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Let's Get</ThemedText>
          <ThemedText style={styles.title}>Started</ThemedText>
          <ThemedText style={styles.subtitle}>
            Connect with each other with chatting or calling. Enjoy safe and
            private texting
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <ThemedText style={styles.primaryButtonText}>Join Now</ThemedText>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <ThemedText style={styles.loginText}>
              Already have an account?{" "}
              <ThemedText style={styles.loginLink}>Login</ThemedText>
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: "space-between",
  },
  avatarsContainer: {
    flex: 1,
    position: "relative",
    marginTop: Spacing["3xl"],
  },
  avatarCard: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarTopLeft: {
    top: 20,
    left: 40,
  },
  avatarTopRight: {
    top: 60,
    right: 60,
  },
  avatarBottomLeft: {
    top: 140,
    left: 20,
  },
  avatarCenter: {
    top: 100,
    right: 30,
    width: 100,
    height: 100,
  },
  textContainer: {
    marginBottom: Spacing["3xl"],
  },
  title: {
    ...Typography.h1,
    fontSize: 40,
    color: "#FFFFFF",
  },
  subtitle: {
    ...Typography.body,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.md,
  },
  buttonContainer: {
    gap: Spacing.lg,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["4xl"],
    borderRadius: BorderRadius.lg,
    width: "100%",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  primaryButtonText: {
    ...Typography.button,
    color: "#14B8A6",
  },
  loginText: {
    ...Typography.body,
    color: "rgba(255,255,255,0.8)",
  },
  loginLink: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
