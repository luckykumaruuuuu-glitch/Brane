import BrainMascot from "@/components/BrainMascot";
import GoldButton from "@/components/GoldButton";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { onboardingComplete } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (onboardingComplete) {
      router.replace("/(tabs)");
      return;
    }
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, [onboardingComplete, fadeAnim, slideAnim]);

  if (onboardingComplete) return null;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20 }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.logoRow}>
          <Text style={styles.logo}>BRAIN</Text>
          <Text style={[styles.logo, styles.logoGold]}>GUARD</Text>
        </View>

        <View style={styles.mascotContainer}>
          <BrainMascot size={180} variant="default" animate />
        </View>

        <Text style={styles.headline}>Take Back Control{"\n"}Of Your Time</Text>
        <Text style={styles.subtitle}>Track and reduce your short{"\n"}video consumption effortlessly</Text>

        <View style={styles.buttons}>
          <GoldButton
            label="Get Started"
            onPress={() => router.push("/onboarding/widget")}
            style={styles.btnFull}
          />
          <GoldButton
            label="Sign In"
            variant="outline"
            onPress={() => router.push("/onboarding/widget")}
            style={styles.btnFull}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 8,
  },
  logo: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: 4,
  },
  logoGold: {
    color: "#D4AF37",
  },
  mascotContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 44,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  buttons: {
    width: "100%",
    gap: 12,
  },
  btnFull: {
    width: "100%",
  },
});
