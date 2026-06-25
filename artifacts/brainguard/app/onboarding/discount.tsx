import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function useCountdown(initial: number) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return seconds;
}

export default function DiscountScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const secs = useCountdown(899);

  const mins = Math.floor(secs / 60);
  const sec = secs % 60;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60 }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 6 && styles.dotActive]} />
        ))}
      </View>

      <Text style={styles.eyebrow}>Limited Time Offer</Text>

      <Animated.View style={[styles.discountBadge, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient colors={["#E8C84A", "#D4AF37", "#C49A2A"]} style={styles.discountGradient}>
          <Text style={styles.discountPercent}>70%</Text>
          <Text style={styles.discountOff}>OFF</Text>
        </LinearGradient>
      </Animated.View>

      <Text style={styles.headline}>Claim your exclusive{"\n"}discount now</Text>

      <View style={styles.timerRow}>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNum}>{String(Math.floor(mins / 60)).padStart(2, "0")}</Text>
          <Text style={styles.timerLabel}>HRS</Text>
        </View>
        <Text style={styles.timerColon}>:</Text>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNum}>{String(mins).padStart(2, "0")}</Text>
          <Text style={styles.timerLabel}>MIN</Text>
        </View>
        <Text style={styles.timerColon}>:</Text>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNum}>{String(sec).padStart(2, "0")}</Text>
          <Text style={styles.timerLabel}>SEC</Text>
        </View>
      </View>

      <View style={styles.offerCard}>
        <View style={styles.offerRow}>
          <Text style={styles.offerPlan}>Annual Plan</Text>
          <View style={styles.offerPricing}>
            <Text style={styles.offerOriginal}>₹999/year</Text>
            <Text style={styles.offerPrice}>₹299/year</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.offerNote}>That's just ₹25/month • Cancel anytime</Text>
      </View>

      <GoldButton
        label="Continue"
        onPress={() => router.push("/onboarding/subscription")}
        style={styles.btn}
      />
      <GoldButton
        label="Maybe Later"
        variant="ghost"
        onPress={() => router.push("/onboarding/subscription")}
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
    marginBottom: 20,
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
    color: "#FF9800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 20,
  },
  discountBadge: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
  },
  discountGradient: {
    paddingHorizontal: 48,
    paddingVertical: 24,
    alignItems: "center",
    borderRadius: 24,
  },
  discountPercent: {
    fontSize: 72,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    lineHeight: 76,
  },
  discountOff: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    letterSpacing: 4,
  },
  headline: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 24,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  timerBlock: {
    backgroundColor: "#111111",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    alignItems: "center",
    minWidth: 64,
  },
  timerNum: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#D4AF37",
  },
  timerLabel: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    color: "#555555",
    letterSpacing: 1,
  },
  timerColon: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#555555",
    marginBottom: 16,
  },
  offerCard: {
    width: "100%",
    backgroundColor: "#111111",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 20,
    marginBottom: 24,
  },
  offerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerPlan: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  offerPricing: {
    alignItems: "flex-end",
  },
  offerOriginal: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    textDecorationLine: "line-through",
  },
  offerPrice: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#D4AF37",
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 14,
  },
  offerNote: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
  },
  btn: {
    width: "100%",
    marginBottom: 4,
  },
});
