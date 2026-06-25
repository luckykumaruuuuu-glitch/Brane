import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const FEATURES = [
  { icon: "activity" as const, text: "Unlimited reel tracking" },
  { icon: "bar-chart-2" as const, text: "Daily & weekly reports" },
  { icon: "users" as const, text: "Friend challenges" },
  { icon: "cpu" as const, text: "AI-powered insights" },
];

type Plan = "yearly" | "monthly";

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState<Plan>("yearly");

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 7 && styles.dotActive]} />
        ))}
      </View>

      <Text style={styles.eyebrow}>Premium</Text>
      <Text style={styles.headline}>Start your free trial</Text>
      <Text style={styles.subtitle}>7 days free, then choose your plan</Text>

      <View style={styles.plans}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelected("yearly")}
          style={[styles.planCard, selected === "yearly" && styles.planCardActive]}
        >
          {selected === "yearly" && (
            <LinearGradient colors={["#D4AF37", "#8B7322"]} style={styles.planBadge}>
              <Text style={styles.planBadgeText}>BEST VALUE</Text>
            </LinearGradient>
          )}
          <View style={styles.planRow}>
            <View style={[styles.radioOuter, selected === "yearly" && styles.radioOuterActive]}>
              {selected === "yearly" && <View style={styles.radioInner} />}
            </View>
            <View style={styles.planInfo}>
              <Text style={[styles.planName, selected === "yearly" && styles.planNameActive]}>Yearly</Text>
              <Text style={styles.planSaving}>Save 75%</Text>
            </View>
            <View style={styles.planPricing}>
              <Text style={[styles.planPrice, selected === "yearly" && styles.planPriceActive]}>₹299</Text>
              <Text style={styles.planPeriod}>/year</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelected("monthly")}
          style={[styles.planCard, selected === "monthly" && styles.planCardActive]}
        >
          <View style={styles.planRow}>
            <View style={[styles.radioOuter, selected === "monthly" && styles.radioOuterActive]}>
              {selected === "monthly" && <View style={styles.radioInner} />}
            </View>
            <View style={styles.planInfo}>
              <Text style={[styles.planName, selected === "monthly" && styles.planNameActive]}>Monthly</Text>
              <Text style={styles.planSaving}>Flexible</Text>
            </View>
            <View style={styles.planPricing}>
              <Text style={[styles.planPrice, selected === "monthly" && styles.planPriceActive]}>₹99</Text>
              <Text style={styles.planPeriod}>/month</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        {FEATURES.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Feather name={f.icon} size={14} color="#D4AF37" />
            </View>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>

      <GoldButton
        label="Start Free Trial"
        onPress={() => router.push("/onboarding/instagram")}
        style={styles.btn}
      />
      <Text style={styles.legal}>Cancel anytime • Supports PhonePe, UPI & Cards</Text>
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
    color: "#D4AF37",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  headline: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginBottom: 24,
  },
  plans: {
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#2A2A2A",
    overflow: "hidden",
  },
  planCardActive: {
    borderColor: "#D4AF37",
  },
  planBadge: {
    paddingVertical: 5,
    alignItems: "center",
  },
  planBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    letterSpacing: 1.5,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: "#D4AF37",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D4AF37",
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  planNameActive: {
    color: "#D4AF37",
  },
  planSaving: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  planPricing: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  planPrice: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  planPriceActive: {
    color: "#D4AF37",
  },
  planPeriod: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginBottom: 2,
  },
  features: {
    width: "100%",
    gap: 10,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#1A1200",
    borderWidth: 1,
    borderColor: "#3A2D00",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#DDDDDD",
  },
  btn: {
    width: "100%",
    marginBottom: 12,
  },
  legal: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    textAlign: "center",
  },
});
