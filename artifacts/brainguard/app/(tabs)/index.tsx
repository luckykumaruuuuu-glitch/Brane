import { Image } from "expo-image";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
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
import { LinearGradient } from "expo-linear-gradient";
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

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount } = useApp();
  const timer = useCountdown(10752);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotBounce = useRef(new Animated.Value(0)).current;
  const countAnim = useRef(new Animated.Value(0)).current;
  const [displayCount, setDisplayCount] = useState(0);

  const ytCount = Math.max(0, reelCount - 1);
  const igCount = Math.min(reelCount, 1);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBounce, { toValue: -8, duration: 1600, useNativeDriver: true }),
        Animated.timing(mascotBounce, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    let start = 0;
    const step = Math.ceil(reelCount / 20);
    const iv = setInterval(() => {
      start = Math.min(start + step, reelCount);
      setDisplayCount(start);
      if (start >= reelCount) clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, [reelCount]);

  const topPad = Platform.OS === "web" ? 48 : insets.top;
  const bottomPad = Platform.OS === "web" ? 0 : 0;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad, opacity: fadeAnim }]}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.avatarCircle}>
            <Image
              source={require("../../assets/images/brain-mascot.png")}
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
            activeOpacity={0.7}
          >
            <Text style={styles.topBtnIcon}>📅</Text>
            <Text style={styles.topBtnText}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn} activeOpacity={0.7}>
            <Text style={styles.topBtnIcon}>💬</Text>
            <Text style={styles.topBtnText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.centerContent}>
        <Animated.View style={[styles.mascotWrapper, { transform: [{ translateY: mascotBounce }] }]}>
          <Image
            source={require("../../assets/images/brain-cool.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </Animated.View>

        <Text style={styles.countNum}>{displayCount}</Text>
        <Text style={styles.countLabel}>Reels Scrolled Today</Text>

        <View style={styles.appBreakdown}>
          <View style={styles.appPill}>
            <View style={styles.ytIcon}>
              <Text style={styles.ytPlay}>▶</Text>
            </View>
            <Text style={styles.appCount}>{ytCount}</Text>
          </View>
          <View style={styles.pillDivider} />
          <View style={styles.appPill}>
            <View style={styles.igIcon}>
              <Text style={styles.igCamera}>◉</Text>
            </View>
            <Text style={styles.appCount}>{igCount}</Text>
          </View>
        </View>
      </View>

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
          <Text style={styles.proArrow}>›</Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, width: "100%" })}
        >
          <LinearGradient
            colors={["#F5DC8E", "#E8B030"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.lockBtn}
          >
            <Text style={styles.lockBtnIcon}>🔒</Text>
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
    marginBottom: 0,
    paddingVertical: 12,
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
    backgroundColor: "#2A1A00",
    borderWidth: 1.5,
    borderColor: "#E8B030",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: 28,
    height: 28,
  },
  brandName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
    letterSpacing: 1,
  },
  topRight: {
    flexDirection: "row",
    gap: 8,
  },
  topBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  topBtnIcon: {
    fontSize: 14,
  },
  topBtnText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#DDDDDD",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  mascotWrapper: {
    marginBottom: 16,
  },
  mascot: {
    width: 160,
    height: 160,
  },
  countNum: {
    fontSize: 80,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 88,
  },
  countLabel: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginBottom: 16,
  },
  appBreakdown: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  appPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  ytIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  ytPlay: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  igIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#833AB4",
    alignItems: "center",
    justifyContent: "center",
  },
  igCamera: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  appCount: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  pillDivider: {
    width: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 8,
  },
  bottomContent: {
    gap: 12,
    paddingBottom: Platform.OS === "web" ? 100 : 16,
  },
  proBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A1400",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#4A2800",
    gap: 10,
  },
  proBadge: {
    backgroundColor: "#E8B030",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  proText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#5A3A00",
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
  },
  proArrow: {
    fontSize: 20,
    color: "#888888",
  },
  lockBtn: {
    borderRadius: 50,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  lockBtnIcon: {
    fontSize: 18,
  },
  lockBtnText: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: "#5A3A00",
  },
});
