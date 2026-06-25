import { Image } from "expo-image";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

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

function YouTubeIcon({ size = 22 }: { size?: number }) {
  return (
    <View style={[ytStyles.wrap, { width: size, height: size * 0.72, borderRadius: size * 0.18 }]}>
      <View style={[ytStyles.triangle, { borderLeftWidth: size * 0.28, borderTopWidth: size * 0.22, borderBottomWidth: size * 0.22 }]} />
    </View>
  );
}
const ytStyles = StyleSheet.create({
  wrap: { backgroundColor: "#FF0000", alignItems: "center", justifyContent: "center" },
  triangle: { width: 0, height: 0, borderLeftColor: "#FFFFFF", borderTopColor: "transparent", borderBottomColor: "transparent", borderStyle: "solid" },
});

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.22, overflow: "hidden" }}>
      <LinearGradient
        colors={["#F9CE34", "#EE2A7B", "#6228D7"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ width: size * 0.44, height: size * 0.44, borderRadius: size * 0.44, borderWidth: 1.5, borderColor: "#FFFFFF" }} />
        <View style={{ position: "absolute", top: size * 0.14, right: size * 0.14, width: size * 0.12, height: size * 0.12, borderRadius: size * 0.06, backgroundColor: "#FFFFFF" }} />
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount } = useApp();
  const timer = useCountdown(10752);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotBounce = useRef(new Animated.Value(0)).current;
  const [displayCount, setDisplayCount] = useState(reelCount);

  const ytCount = Math.max(0, reelCount - 1);
  const igCount = Math.min(reelCount > 0 ? 1 : 0, 1);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBounce, { toValue: -10, duration: 1800, useNativeDriver: true }),
        Animated.timing(mascotBounce, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(reelCount / 24));
    const iv = setInterval(() => {
      start = Math.min(start + step, reelCount);
      setDisplayCount(start);
      if (start >= reelCount) clearInterval(iv);
    }, 40);
    return () => clearInterval(iv);
  }, [reelCount]);

  const topPad = Platform.OS === "web" ? 48 : insets.top;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad, opacity: fadeAnim }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.avatarCircle}>
            <Image
              source={require("../../assets/images/brain-mascot-nobg.png")}
              style={styles.avatarImg}
              contentFit="contain"
            />
          </View>
          <Text style={styles.brandName}>BRAINGUARD</Text>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity
            style={styles.topBtn}
            onPress={() => router.push("/stats")}
            activeOpacity={0.75}
          >
            <Ionicons name="calendar-outline" size={14} color="#CCCCCC" />
            <Text style={styles.topBtnText}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn} activeOpacity={0.75}>
            <Ionicons name="chatbubble-outline" size={14} color="#CCCCCC" />
            <Text style={styles.topBtnText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Center */}
      <View style={styles.centerContent}>
        <Animated.View style={{ transform: [{ translateY: mascotBounce }] }}>
          <Image
            source={require("../../assets/images/brain-cool-nobg.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </Animated.View>

        <Text style={styles.countNum}>{displayCount}</Text>
        <Text style={styles.countLabel}>Reels Scrolled Today</Text>

        <View style={styles.appBreakdown}>
          <View style={styles.appPill}>
            <YouTubeIcon size={24} />
            <Text style={styles.appCount}>{ytCount}</Text>
          </View>
          <View style={styles.pillDivider} />
          <View style={styles.appPill}>
            <InstagramIcon size={24} />
            <Text style={styles.appCount}>{igCount}</Text>
          </View>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomContent}>
        <TouchableOpacity
          style={styles.proBanner}
          activeOpacity={0.85}
          onPress={() => router.push("/onboarding/subscription")}
        >
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
          <Text style={styles.proLabel}>Claim 70% Off</Text>
          <Text style={styles.proTimer}>{timer}</Text>
          <Ionicons name="chevron-forward" size={16} color="#666666" />
        </TouchableOpacity>

        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1, width: "100%" })}
        >
          <LinearGradient
            colors={["#F5DC8E", "#E8B030"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.lockBtn}
          >
            <Ionicons name="lock-closed" size={18} color="#5A3A00" />
            <Text style={styles.lockBtnText}>Lock Reels</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 0,
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A0E00",
    borderWidth: 1.5,
    borderColor: "#E8B030",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: 30, height: 30 },
  brandName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
    letterSpacing: 1.5,
  },
  topRight: { flexDirection: "row", gap: 8 },
  topBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#161616",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#252525",
  },
  topBtnText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#CCCCCC",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  mascot: { width: 168, height: 168 },
  countNum: {
    fontSize: 86,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 96,
    letterSpacing: -2,
    marginTop: 8,
  },
  countLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#777777",
    marginBottom: 18,
  },
  appBreakdown: {
    flexDirection: "row",
    backgroundColor: "#111111",
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  appPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 11,
    gap: 8,
  },
  pillDivider: {
    width: 1,
    backgroundColor: "#1E1E1E",
    marginVertical: 8,
  },
  appCount: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  bottomContent: {
    gap: 12,
    paddingBottom: Platform.OS === "web" ? 90 : 12,
  },
  proBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C0E00",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#3A2000",
    gap: 10,
  },
  proBadge: {
    backgroundColor: "#E8B030",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#4A2800",
  },
  proLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  proTimer: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#E8B030",
    letterSpacing: 0.5,
  },
  lockBtn: {
    borderRadius: 50,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  lockBtnText: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: "#4A2800",
  },
});
