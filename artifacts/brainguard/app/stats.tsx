import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const TODAY_IDX = 3;

function getWeekLabel() {
  const now = new Date();
  const day = now.getDay();
  const mon = new Date(now);
  mon.setDate(now.getDate() - ((day + 6) % 7));
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(mon)} – ${fmt(sun)}`;
}

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount, weeklyData } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const weekLabel = getWeekLabel();

  const topPad = Platform.OS === "web" ? 48 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const chartMax = Math.max(...weeklyData, reelCount, 1);
  const CHART_H = 160;

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad + 20 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>STATS</Text>
      </View>

      <View style={styles.weekNav}>
        <TouchableOpacity onPress={() => setWeekOffset((w) => w - 1)} style={styles.navBtn} activeOpacity={0.7}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{weekLabel}</Text>
        <TouchableOpacity onPress={() => setWeekOffset((w) => w + 1)} style={styles.navBtn} activeOpacity={0.7}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartArea}>
          {DAYS.map((day, i) => {
            const val = i === TODAY_IDX ? reelCount : weeklyData[i] ?? 0;
            const barH = val > 0 ? Math.max(8, (val / chartMax) * CHART_H) : 0;
            const isToday = i === TODAY_IDX;

            return (
              <View key={`${day}-${i}`} style={styles.barCol}>
                {isToday && val > 0 && (
                  <Text style={styles.barValue}>{val}</Text>
                )}
                <View style={styles.barTrack}>
                  {val > 0 ? (
                    <View style={[styles.bar, { height: barH, backgroundColor: isToday ? "#E8B030" : "#4A3010" }]} />
                  ) : null}
                </View>
                {isToday ? (
                  <Image
                    source={require("../assets/images/brain-tired.png")}
                    style={styles.brainUnder}
                    contentFit="contain"
                  />
                ) : (
                  <Text style={styles.dayLabel}>{day}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalNum}>{reelCount}</Text>
        <Text style={styles.totalLabel}>Total Reels</Text>
      </View>

      <Text style={styles.sectionLabel}>Top apps</Text>

      <View style={styles.appsCard}>
        <View style={styles.appRow}>
          <View style={styles.ytIconLg}>
            <Text style={styles.ytPlayLg}>▶</Text>
          </View>
          <Text style={styles.appName}>YouTube</Text>
          <Text style={styles.appNum}>{Math.max(0, reelCount - 1)}</Text>
        </View>
        <View style={styles.appDivider} />
        <View style={styles.appRow}>
          <View style={styles.igIconLg}>
            <Text style={styles.igSymbol}>◉</Text>
          </View>
          <Text style={styles.appName}>Instagram</Text>
          <Text style={styles.appNum}>{Math.min(reelCount, 1)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
    paddingVertical: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  backArrow: {
    fontSize: 22,
    color: "#FFFFFF",
    lineHeight: 26,
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
    gap: 20,
    marginBottom: 20,
  },
  navBtn: {
    padding: 8,
  },
  navArrow: {
    fontSize: 22,
    color: "#888888",
  },
  weekLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  chartCard: {
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 220,
    gap: 4,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  barValue: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  barTrack: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 6,
  },
  brainUnder: {
    width: 32,
    height: 32,
    marginTop: 6,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#888888",
    marginTop: 8,
  },
  totalCard: {
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  totalNum: {
    fontSize: 40,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  appsCard: {
    backgroundColor: "#111111",
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
  ytIconLg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  ytPlayLg: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  igIconLg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#833AB4",
    alignItems: "center",
    justifyContent: "center",
  },
  igSymbol: {
    fontSize: 16,
    color: "#FFFFFF",
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
  appDivider: {
    height: 1,
    backgroundColor: "#1E1E1E",
    marginHorizontal: 20,
  },
});
