import GlassCard from "@/components/GlassCard";
import BrainMascot from "@/components/BrainMascot";
import { useApp } from "@/context/AppContext";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ScoreBarProps {
  value: number;
  color: string;
}

function ScoreBar({ value, color }: ScoreBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [value, widthAnim]);

  return (
    <View style={barStyles.track}>
      <Animated.View
        style={[
          barStyles.fill,
          {
            width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const barStyles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: "#2A2A2A",
    borderRadius: 4,
    overflow: "hidden",
    flex: 1,
  },
  fill: {
    height: "100%",
    borderRadius: 4,
  },
});

const CATEGORIES = [
  { name: "Entertainment", pct: 42, color: "#FF6B35" },
  { name: "Comedy", pct: 28, color: "#D4AF37" },
  { name: "News", pct: 16, color: "#4CAF50" },
  { name: "Lifestyle", pct: 14, color: "#2196F3" },
];

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const { productivityScore, focusScore, scrollRisk, reelCount, weeklyData } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const riskColor = scrollRisk === "Low" ? "#4CAF50" : scrollRisk === "Medium" ? "#FF9800" : "#FF4444";
  const attnLoss = Math.round(reelCount * 0.4);

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Powered by AI</Text>
          <Text style={styles.headerTitle}>Insights</Text>
        </View>
        <BrainMascot size={60} variant="default" animate />
      </View>

      <View style={styles.scoresRow}>
        <GlassCard style={styles.scoreCard}>
          <Text style={styles.scoreEmoji}>⚡</Text>
          <Text style={styles.scoreValue}>{productivityScore}</Text>
          <Text style={styles.scoreLabel}>Productivity</Text>
          <ScoreBar value={productivityScore} color="#D4AF37" />
        </GlassCard>
        <GlassCard style={styles.scoreCard}>
          <Text style={styles.scoreEmoji}>🎯</Text>
          <Text style={styles.scoreValue}>{focusScore}</Text>
          <Text style={styles.scoreLabel}>Focus Score</Text>
          <ScoreBar value={focusScore} color="#4CAF50" />
        </GlassCard>
      </View>

      <GlassCard style={styles.riskCard}>
        <View style={styles.riskHeader}>
          <View>
            <Text style={styles.sectionTitle}>Scroll Risk</Text>
            <Text style={styles.riskSub}>Based on today's activity</Text>
          </View>
          <View style={[styles.riskBadge, { backgroundColor: riskColor + "22", borderColor: riskColor + "44" }]}>
            <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
            <Text style={[styles.riskLabel, { color: riskColor }]}>{scrollRisk}</Text>
          </View>
        </View>

        <View style={styles.riskDetails}>
          <View style={styles.riskMetric}>
            <Feather name="clock" size={14} color="#888888" />
            <Text style={styles.riskMetricText}>{Math.round(reelCount * 0.5)} min wasted</Text>
          </View>
          <View style={styles.riskMetric}>
            <Feather name="zap" size={14} color="#888888" />
            <Text style={styles.riskMetricText}>{attnLoss}% attention loss</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard style={styles.categoriesCard}>
        <Text style={styles.sectionTitle}>Content Breakdown</Text>
        <Text style={styles.sectionSub}>What you're consuming</Text>
        <View style={styles.categoriesList}>
          {CATEGORIES.map((cat) => (
            <View key={cat.name} style={styles.categoryRow}>
              <View style={[styles.catDot, { backgroundColor: cat.color }]} />
              <Text style={styles.catName}>{cat.name}</Text>
              <ScoreBar value={cat.pct} color={cat.color} />
              <Text style={styles.catPct}>{cat.pct}%</Text>
            </View>
          ))}
        </View>
      </GlassCard>

      <GlassCard style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <LinearGradient colors={["#D4AF37", "#8B7322"]} style={styles.aiIconBg}>
            <Feather name="cpu" size={16} color="#000000" />
          </LinearGradient>
          <Text style={styles.aiTitle}>AI Recommendation</Text>
        </View>
        <Text style={styles.aiText}>
          Your peak scroll time is between 8–10 PM. Setting a 20-reel daily limit could save you{" "}
          <Text style={styles.aiHighlight}>{Math.round(reelCount * 0.3)} minutes</Text> today.
          Try the 10-minute rule: after every 10 reels, put your phone down for 5 minutes.
        </Text>
      </GlassCard>

      <GlassCard style={styles.patternCard}>
        <Text style={styles.sectionTitle}>Screen Time Patterns</Text>
        <View style={styles.patternGrid}>
          {["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"].map((time, i) => {
            const heights = [10, 25, 55, 30, 70, 90];
            const h = heights[i];
            return (
              <View key={time} style={styles.patternCol}>
                <View style={[styles.patternBar, { height: h, backgroundColor: h > 60 ? "#FF4444" : h > 40 ? "#FF9800" : "#2A2A2A" }]} />
                <Text style={styles.patternTime}>{time}</Text>
              </View>
            );
          })}
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
  scoresRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  scoreCard: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 20,
  },
  scoreEmoji: {
    fontSize: 20,
  },
  scoreValue: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 40,
  },
  scoreLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: "#888888",
    marginBottom: 8,
  },
  riskCard: {
    marginBottom: 16,
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
  },
  riskSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    marginTop: 2,
  },
  riskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  riskLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  riskDetails: {
    flexDirection: "row",
    gap: 20,
  },
  riskMetric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  riskMetricText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  categoriesCard: {
    marginBottom: 16,
  },
  categoriesList: {
    marginTop: 14,
    gap: 12,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  catName: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#DDDDDD",
    width: 88,
  },
  catPct: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: "#888888",
    width: 36,
    textAlign: "right",
  },
  aiCard: {
    marginBottom: 16,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  aiIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  aiText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    lineHeight: 22,
  },
  aiHighlight: {
    color: "#D4AF37",
    fontFamily: "Inter_600SemiBold",
  },
  patternCard: {
    marginBottom: 16,
  },
  patternGrid: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 16,
    height: 100,
  },
  patternCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  patternBar: {
    width: "100%",
    borderRadius: 6,
  },
  patternTime: {
    fontSize: 9,
    fontFamily: "Inter_400Regular",
    color: "#555555",
  },
});
