import { Image } from "expo-image";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function getWeekRange() {
  const now = new Date();
  const dow = now.getDay();
  const mon = new Date(now);
  mon.setDate(now.getDate() - ((dow + 6) % 7));
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const mo = mon.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const su = sun.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${mo} – ${su}`;
}

function YouTubeIcon({ size = 36 }: { size?: number }) {
  return (
    <View style={[ytS.wrap, { width: size, height: size, borderRadius: size * 0.22 }]}>
      <View style={[ytS.tri, { borderLeftWidth: size * 0.26, borderTopWidth: size * 0.18, borderBottomWidth: size * 0.18 }]} />
    </View>
  );
}
const ytS = StyleSheet.create({
  wrap: { backgroundColor: "#FF0000", alignItems: "center", justifyContent: "center" },
  tri: { width: 0, height: 0, borderLeftColor: "#FFFFFF", borderTopColor: "transparent", borderBottomColor: "transparent", borderStyle: "solid" },
});

function InstagramIcon({ size = 36 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.22, overflow: "hidden" }}>
      <LinearGradient
        colors={["#F9CE34", "#EE2A7B", "#6228D7"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ width: size * 0.42, height: size * 0.42, borderRadius: size * 0.42, borderWidth: 2, borderColor: "#FFFFFF" }} />
        <View style={{ position: "absolute", top: size * 0.14, right: size * 0.14, width: size * 0.12, height: size * 0.12, borderRadius: size * 0.06, backgroundColor: "#FFFFFF" }} />
      </LinearGradient>
    </View>
  );
}

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount, weeklyData } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const weekRange = getWeekRange();

  const CHART_H = 130;
  const todayIdx = 3; // Thursday (Jun 25, 2026)
  const chartData = weeklyData.map((v, i) => (i === todayIdx ? reelCount : v));
  const maxVal = Math.max(...chartData, 1);

  const topPad = Platform.OS === "web" ? 48 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: topPad }]}
      contentContainerStyle={{ paddingBottom: botPad + 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>STATS</Text>
      </View>

      {/* Week nav */}
      <View style={styles.weekNav}>
        <TouchableOpacity onPress={() => setWeekOffset((w) => w - 1)} activeOpacity={0.7} style={styles.navBtn}>
          <Ionicons name="chevron-back" size={18} color="#666666" />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{weekRange}</Text>
        <TouchableOpacity onPress={() => setWeekOffset((w) => w + 1)} activeOpacity={0.7} style={styles.navBtn}>
          <Ionicons name="chevron-forward" size={18} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartRow}>
          {chartData.map((val, i) => {
            const barH = val > 0 ? Math.max(10, (val / maxVal) * CHART_H) : 0;
            const isToday = i === todayIdx;
            return (
              <View key={i} style={styles.barCol}>
                {isToday && val > 0 && (
                  <Text style={styles.barLabel}>{val}</Text>
                )}
                <View style={[styles.barTrack, { height: CHART_H }]}>
                  {barH > 0 && (
                    <View
                      style={[
                        styles.bar,
                        { height: barH, backgroundColor: isToday ? "#E8B030" : "#2D1A00" },
                      ]}
                    />
                  )}
                </View>
                {isToday ? (
                  <Image
                    source={require("../assets/images/brain-tired-nobg.png")}
                    style={styles.brainUnder}
                    contentFit="contain"
                  />
                ) : (
                  <Text style={styles.dayTxt}>{DAYS[i]}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalCard}>
        <Text style={styles.totalNum}>{reelCount}</Text>
        <Text style={styles.totalLabel}>Total Reels</Text>
      </View>

      {/* Top apps */}
      <Text style={styles.sectionHead}>Top apps</Text>
      <View style={styles.appsCard}>
        <View style={styles.appRow}>
          <YouTubeIcon size={40} />
          <Text style={styles.appName}>YouTube</Text>
          <Text style={styles.appNum}>{Math.max(0, reelCount - 1)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.appRow}>
          <InstagramIcon size={40} />
          <Text style={styles.appName}>Instagram</Text>
          <Text style={styles.appNum}>{Math.min(reelCount > 0 ? 1 : 0, 1)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
    marginBottom: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#252525",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
    letterSpacing: 3,
  },
  weekNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginBottom: 20,
  },
  navBtn: { padding: 6 },
  weekLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  chartCard: {
    backgroundColor: "#0E0E0E",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 0,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
  },
  barLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  barTrack: {
    width: "70%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 5,
  },
  brainUnder: {
    width: 30,
    height: 30,
    marginTop: 6,
  },
  dayTxt: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#555555",
    marginTop: 8,
  },
  totalCard: {
    backgroundColor: "#0E0E0E",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  totalNum: {
    fontSize: 44,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666666",
  },
  sectionHead: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  appsCard: {
    backgroundColor: "#0E0E0E",
    borderRadius: 20,
    overflow: "hidden",
  },
  appRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  appName: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#FFFFFF",
  },
  appNum: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
  },
});
