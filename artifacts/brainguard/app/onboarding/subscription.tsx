import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type Plan = "yearly" | "monthly";

function useCountdown(initial: number) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [plan, setPlan] = useState<Plan>("yearly");
  const timer = useCountdown(10761);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const topPad = Platform.OS === "web" ? 52 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={{ paddingTop: topPad + 20, paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/onboarding/instagram")} style={styles.closeBtn} activeOpacity={0.7}>
          <Feather name="x" size={20} color="#888888" />
        </TouchableOpacity>
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>BRAINGUARD</Text>
          <View style={styles.proBadge}><Text style={styles.proText}>PRO</Text></View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.helpText}>Need Help?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ticketWrapper}>
        <LinearGradient colors={["#F5DC8E", "#D4A020"]} style={styles.ticket}>
          <View style={styles.ticketDecor}>
            <Text style={styles.ticketDecorL}>🌿</Text>
            <Text style={styles.ticketDecorR}>🌿</Text>
          </View>
          <Text style={styles.ticketPct}>70%</Text>
          <Text style={styles.ticketLabel}>Discount</Text>
          <View style={styles.ticketNotchRow}>
            <View style={styles.ticketNotch} />
            <View style={styles.ticketDash} />
            <View style={styles.ticketNotch} />
          </View>
          <View style={styles.timerPill}>
            <Text style={styles.timerText}>Ends in {timer}</Text>
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.headline}>Block doom scrolling.{"\n"}Get back to what matters.</Text>

      <View style={styles.reviewCard}>
        <View style={styles.reviewAvatar}><Text style={styles.reviewAvatarText}>A</Text></View>
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewName}>Aryan Muk...</Text>
          <Text style={styles.reviewStars}>★ ★ ★ ★ ★</Text>
        </View>
      </View>

      <View style={styles.plans}>
        <TouchableOpacity onPress={() => setPlan("yearly")} style={[styles.planCard, plan === "yearly" && styles.planActive]} activeOpacity={0.8}>
          {plan === "yearly" && (
            <View style={styles.planBadge}><Text style={styles.planBadgeText}>70% OFF</Text></View>
          )}
          <View style={styles.planBody}>
            <View style={styles.planInfo}>
              <Text style={styles.planName}>Yearly</Text>
              <Text style={styles.planSub}>₹999 → ₹299/year</Text>
            </View>
            <View style={styles.planRight}>
              <Text style={[styles.planPrice, plan === "yearly" && styles.planPriceActive]}>₹25/month</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPlan("monthly")} style={[styles.planCard, plan === "monthly" && styles.planActive]} activeOpacity={0.8}>
          <View style={styles.planBody}>
            <View style={styles.planInfo}>
              <Text style={styles.planName}>Monthly</Text>
            </View>
            <View style={styles.planRight}>
              <Text style={[styles.planPrice, plan === "monthly" && styles.planPriceActive]}>₹99/month</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.payRow}>
        <View style={styles.phonepeRow}>
          <View style={styles.phonepeDot} />
          <Text style={styles.payUsing}>Pay Using</Text>
          <Feather name="chevron-down" size={14} color="#AAAAAA" />
          <Text style={styles.phonepeText}>PhonePe</Text>
        </View>

        <WarmButton label="Continue" onPress={() => router.push("/onboarding/instagram")} style={styles.continueBtn} />
      </View>

      <Text style={styles.legal}>Billed Annually · Cancel Anytime</Text>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
  },
  proBadge: {
    backgroundColor: "#1A1A1A",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#E8B030",
  },
  proText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
  },
  helpText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textDecorationLine: "underline",
  },
  ticketWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  ticket: {
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: "90%",
    position: "relative",
  },
  ticketDecor: {
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  ticketDecorL: { fontSize: 20 },
  ticketDecorR: { fontSize: 20, transform: [{ scaleX: -1 }] },
  ticketPct: {
    fontSize: 56,
    fontFamily: "Inter_700Bold",
    color: "#5A3A00",
    lineHeight: 60,
  },
  ticketLabel: {
    fontSize: 20,
    fontFamily: "Inter_500Medium",
    color: "#5A3A00",
    marginBottom: 12,
  },
  ticketNotchRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "110%",
    marginBottom: 12,
  },
  ticketNotch: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#0A0A0A",
  },
  ticketDash: {
    flex: 1,
    height: 1.5,
    backgroundColor: "rgba(90,58,0,0.3)",
    borderStyle: "dashed",
  },
  timerPill: {
    backgroundColor: "#C0392B",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  headline: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 16,
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#111111",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  reviewStars: {
    fontSize: 12,
    color: "#E8B030",
  },
  plans: {
    gap: 10,
    marginBottom: 20,
  },
  planCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#2A2A2A",
    backgroundColor: "#111111",
    overflow: "hidden",
  },
  planActive: {
    borderColor: "#E8B030",
  },
  planBadge: {
    backgroundColor: "#E8B030",
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    borderRadius: 8,
    margin: 12,
    marginBottom: 0,
  },
  planBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#5A3A00",
  },
  planBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  planInfo: {},
  planName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  planSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginTop: 2,
  },
  planRight: {},
  planPrice: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#AAAAAA",
  },
  planPriceActive: {
    color: "#E8B030",
  },
  payRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  phonepeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  phonepeDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#5F259F",
  },
  payUsing: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  phonepeText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginLeft: 2,
  },
  continueBtn: {
    flex: 1,
  },
  legal: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    textAlign: "center",
    marginBottom: 8,
  },
});
