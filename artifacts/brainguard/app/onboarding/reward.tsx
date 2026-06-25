import BrainMascot from "@/components/BrainMascot";
import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RewardScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80 }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, scaleAnim, glowAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] });

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 5 && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.glowCircle, { opacity: glowOpacity }]} />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <BrainMascot size={180} variant="gift" animate />
        </Animated.View>
      </View>

      <Text style={styles.headline}>You earned a gift!</Text>
      <Text style={styles.subtitle}>
        Congratulations for taking the first step toward reclaiming your time and focus
      </Text>

      <View style={styles.rewardCard}>
        <Text style={styles.rewardLabel}>Your reward</Text>
        <Text style={styles.rewardValue}>7-Day Free Trial</Text>
        <Text style={styles.rewardDesc}>Full access to all premium features</Text>
      </View>

      <GoldButton
        label="Unlock Gift"
        onPress={() => router.push("/onboarding/discount")}
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glowCircle: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#D4AF37",
  },
  headline: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  rewardCard: {
    width: "100%",
    backgroundColor: "#111111",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#D4AF37",
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  rewardLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: "#D4AF37",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  rewardValue: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  btn: {
    width: "100%",
  },
});
