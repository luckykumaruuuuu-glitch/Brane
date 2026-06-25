import BrainMascot from "@/components/BrainMascot";
import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View
      style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}
    >
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 2 && styles.dotActive]} />
        ))}
      </View>

      <Text style={styles.eyebrow}>Privacy First</Text>
      <Text style={styles.headline}>Your data stays{"\n"}on your device</Text>

      <View style={styles.mascotContainer}>
        <BrainMascot size={160} variant="lock" animate />
      </View>

      <View style={styles.cards}>
        <View style={styles.privacyCard}>
          <View style={styles.iconDot}>
            <View style={styles.checkmark} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>We only count reels</Text>
            <Text style={styles.cardDesc}>No content is analyzed or stored remotely</Text>
          </View>
        </View>
        <View style={styles.privacyCard}>
          <View style={styles.iconDot}>
            <View style={styles.checkmark} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Local processing only</Text>
            <Text style={styles.cardDesc}>Your personal data never leaves your phone</Text>
          </View>
        </View>
        <View style={styles.privacyCard}>
          <View style={styles.iconDot}>
            <View style={styles.checkmark} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>No personal information</Text>
            <Text style={styles.cardDesc}>We don't track who you follow or what you watch</Text>
          </View>
        </View>
      </View>

      <GoldButton
        label="Continue"
        onPress={() => router.push("/onboarding/permissions")}
        style={styles.btn}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2A2A2A",
  },
  dotActive: {
    backgroundColor: "#D4AF37",
    width: 20,
    borderRadius: 3,
  },
  eyebrow: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#D4AF37",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  headline: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 8,
  },
  mascotContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    width: "100%",
    gap: 10,
    marginBottom: 28,
  },
  privacyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 16,
    gap: 14,
  },
  iconDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1E3A1E",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    width: 10,
    height: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#4CAF50",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  btn: {
    width: "100%",
  },
});
