import BarChart from "@/components/BarChart";
import BrainMascot from "@/components/BrainMascot";
import GlassCard from "@/components/GlassCard";
import GoldButton from "@/components/GoldButton";
import { useApp } from "@/context/AppContext";
import * as Haptics from "expo-haptics";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount, weeklyData, monthlyTotal, timeWasted, incrementReel } = useApp();
  const countAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(countAnim, { toValue: reelCount, duration: 1200, useNativeDriver: false }),
    ]).start();
  }, [fadeAnim, countAnim, reelCount]);

  const handleAdd = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    incrementReel();
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const weeklyAvg = Math.round(weeklyData.reduce((a, b) => a + b, 0) / 7);

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <BrainMascot size={60} variant="default" animate />
      </View>

      <GlassCard style={styles.heroCard}>
        <Text style={styles.heroLabel}>Today's Reel Count</Text>
        <Animated.Text style={styles.heroCount}>
          {countAnim.interpolate({ inputRange: [0, reelCount || 1], outputRange: ["0", String(reelCount)] })}
        </Animated.Text>
        <Text style={styles.heroSub}>reels watched today</Text>
        <View style={styles.heroActions}>
          <TouchableOpacity onPress={handleAdd} style={styles.addBtn} activeOpacity={0.7}>
            <Feather name="plus" size={16} color="#000000" />
            <Text style={styles.addBtnText}>Add Reel</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard}>
          <Feather name="calendar" size={16} color="#D4AF37" />
          <Text style={styles.statValue}>{weeklyAvg}</Text>
          <Text style={styles.statLabel}>Daily avg</Text>
        </GlassCard>
        <GlassCard style={styles.statCard}>
          <Feather name="trending-up" size={16} color="#D4AF37" />
          <Text style={styles.statValue}>{weeklyData.reduce((a, b) => a + b, 0)}</Text>
          <Text style={styles.statLabel}>This week</Text>
        </GlassCard>
        <GlassCard style={styles.statCard}>
          <Feather name="bar-chart-2" size={16} color="#D4AF37" />
          <Text style={styles.statValue}>{monthlyTotal}</Text>
          <Text style={styles.statLabel}>Monthly</Text>
        </GlassCard>
        <GlassCard style={styles.statCard}>
          <Feather name="clock" size={16} color="#FF9800" />
          <Text style={[styles.statValue, { color: "#FF9800" }]}>{timeWasted}h</Text>
          <Text style={styles.statLabel}>Wasted</Text>
        </GlassCard>
      </View>

      <GlassCard style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <Text style={styles.chartMeta}>Last 7 days</Text>
        </View>
        <BarChart data={weeklyData} labels={DAY_LABELS} height={100} />
      </GlassCard>

      <GlassCard style={styles.trendsCard}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.trendRow}>
          <View style={styles.trendItem}>
            <View style={[styles.trendDot, { backgroundColor: "#4CAF50" }]} />
            <Text style={styles.trendLabel}>Best day</Text>
            <Text style={styles.trendVal}>{Math.min(...weeklyData)} reels</Text>
          </View>
          <View style={styles.trendDivider} />
          <View style={styles.trendItem}>
            <View style={[styles.trendDot, { backgroundColor: "#FF4444" }]} />
            <Text style={styles.trendLabel}>Worst day</Text>
            <Text style={styles.trendVal}>{Math.max(...weeklyData)} reels</Text>
          </View>
          <View style={styles.trendDivider} />
          <View style={styles.trendItem}>
            <View style={[styles.trendDot, { backgroundColor: "#D4AF37" }]} />
            <Text style={styles.trendLabel}>Streak</Text>
            <Text style={styles.trendVal}>3 days</Text>
          </View>
        </View>
      </GlassCard>
    </Animated.ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  heroCard: {
    alignItems: "center",
    paddingVertical: 28,
    marginBottom: 16,
  },
  heroLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#888888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroCount: {
    fontSize: 80,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 88,
  },
  heroSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    marginBottom: 20,
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#D4AF37",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  addBtnText: {
    color: "#000000",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
  },
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  chartMeta: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
  },
  trendsCard: {
    marginBottom: 16,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  trendItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  trendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  trendLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  trendVal: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  trendDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#2A2A2A",
  },
});
