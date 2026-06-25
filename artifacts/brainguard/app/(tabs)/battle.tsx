import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

const FRIENDS = [
  { name: "Rahul S.", reels: 12, rank: 1 },
  { name: "Priya M.", reels: 28, rank: 2 },
  { name: "Arjun K.", reels: 34, rank: 3 },
  { name: "Sneha T.", reels: 67, rank: 4 },
  { name: "Vikram D.", reels: 93, rank: 5 },
];

export default function BattleScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount } = useApp();
  const topPad = Platform.OS === "web" ? 48 : insets.top;
  const bottomPad = Platform.OS === "web" ? 0 : 0;

  const allPlayers = [{ name: "You", reels: reelCount, rank: 0 }, ...FRIENDS]
    .sort((a, b) => a.reels - b.reels)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  const myRank = allPlayers.findIndex((p) => p.name === "You") + 1;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: topPad }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 110 : insets.bottom + 90 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BATTLE</Text>
        <Text style={styles.headerSub}>Rank #{myRank} this week</Text>
      </View>

      <LinearGradient colors={["#3D1800", "#1A0800"]} style={styles.challengeCard}>
        <View style={styles.challengeRow}>
          <View style={styles.fighter}>
            <Image source={require("../../assets/images/brain-cool.png")} style={styles.fighterImg} contentFit="contain" />
            <Text style={styles.fighterName}>You</Text>
            <Text style={styles.fighterScore}>{reelCount}</Text>
          </View>

          <View style={styles.vsCol}>
            <Text style={styles.lightning}>⚡</Text>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={styles.fighter}>
            <Image source={require("../../assets/images/brain-grumpy.png")} style={styles.fighterImg} contentFit="contain" />
            <Text style={styles.fighterName}>Friend</Text>
            <Text style={[styles.fighterScore, styles.friendScore]}>93</Text>
          </View>
        </View>

        <WarmButton
          label="⚔  Challenge a Friend"
          onPress={() => {}}
          style={{ width: "100%", marginTop: 16 }}
        />
      </LinearGradient>

      <Text style={styles.sectionLabel}>Leaderboard</Text>

      <View style={styles.leaderboard}>
        {allPlayers.map((p, i) => (
          <View key={p.name} style={[styles.leaderRow, p.name === "You" && styles.leaderRowMe]}>
            <Text style={[styles.leaderRank, p.rank === 1 && styles.leaderRankGold]}>#{p.rank}</Text>
            <View style={[styles.leaderAvatar, p.name === "You" && styles.leaderAvatarMe]}>
              <Text style={styles.leaderAvatarText}>{p.name[0]}</Text>
            </View>
            <Text style={[styles.leaderName, p.name === "You" && styles.leaderNameMe]}>{p.name}</Text>
            <View style={styles.leaderBarWrapper}>
              <View style={[styles.leaderBar, { width: `${Math.min(100, (p.reels / 100) * 100)}%`, backgroundColor: p.name === "You" ? "#E8B030" : "#2A2A2A" }]} />
            </View>
            <Text style={styles.leaderCount}>{p.reels}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
    letterSpacing: 3,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginTop: 2,
  },
  challengeCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  challengeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fighter: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  fighterImg: {
    width: 80,
    height: 80,
  },
  fighterName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  fighterScore: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
  },
  friendScore: {
    color: "#FF4444",
  },
  vsCol: {
    alignItems: "center",
    gap: 4,
  },
  lightning: {
    fontSize: 32,
  },
  vsText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#888888",
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  leaderboard: {
    gap: 10,
  },
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  leaderRowMe: {
    borderColor: "#E8B030",
  },
  leaderRank: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: "#555555",
    width: 28,
  },
  leaderRankGold: {
    color: "#E8B030",
  },
  leaderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },
  leaderAvatarMe: {
    backgroundColor: "#2A1400",
    borderWidth: 1.5,
    borderColor: "#E8B030",
  },
  leaderAvatarText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  leaderName: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#DDDDDD",
    width: 70,
  },
  leaderNameMe: {
    color: "#E8B030",
  },
  leaderBarWrapper: {
    flex: 1,
    height: 6,
    backgroundColor: "#1E1E1E",
    borderRadius: 3,
    overflow: "hidden",
  },
  leaderBar: {
    height: "100%",
    borderRadius: 3,
  },
  leaderCount: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#888888",
    width: 28,
    textAlign: "right",
  },
});
