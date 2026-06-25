import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import WarmButton from "@/components/WarmButton";
import React from "react";
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

const FRIENDS = [
  { name: "Rahul S.", reels: 12 },
  { name: "Priya M.", reels: 28 },
  { name: "Arjun K.", reels: 34 },
  { name: "Sneha T.", reels: 67 },
  { name: "Vikram D.", reels: 93 },
];

export default function BattleScreen() {
  const insets = useSafeAreaInsets();
  const { reelCount } = useApp();
  const topPad = Platform.OS === "web" ? 48 : insets.top;

  const allPlayers = [{ name: "You", reels: reelCount }, ...FRIENDS]
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

      <LinearGradient colors={["#3D1800", "#1A0800", "#000000"]} style={styles.vsCard}>
        <View style={styles.vsRow}>
          <View style={styles.fighter}>
            <Image
              source={require("../../assets/images/brain-cool-nobg.png")}
              style={styles.fighterImg}
              contentFit="contain"
            />
            <Text style={styles.fighterName}>You</Text>
            <Text style={styles.myScore}>{reelCount}</Text>
          </View>

          <View style={styles.vsCenter}>
            <View style={styles.lightningBadge}>
              <Ionicons name="flash" size={28} color="#E8B030" />
            </View>
            <Text style={styles.vsLabel}>VS</Text>
          </View>

          <View style={styles.fighter}>
            <Image
              source={require("../../assets/images/brain-grumpy-nobg.png")}
              style={styles.fighterImg}
              contentFit="contain"
            />
            <Text style={styles.fighterName}>Friend</Text>
            <Text style={styles.enemyScore}>93</Text>
          </View>
        </View>

        <WarmButton
          label="⚔  Challenge a Friend"
          onPress={() => {}}
          style={{ marginTop: 20 }}
        />
      </LinearGradient>

      <Text style={styles.sectionHead}>Leaderboard</Text>

      <View style={styles.leaderboard}>
        {allPlayers.map((p) => (
          <View key={p.name} style={[styles.row, p.name === "You" && styles.rowMe]}>
            <Text style={[styles.rank, p.rank === 1 && styles.rankGold]}>#{p.rank}</Text>
            <View style={[styles.avatar, p.name === "You" && styles.avatarMe]}>
              <Text style={styles.avatarTxt}>{p.name[0]}</Text>
            </View>
            <Text style={[styles.name, p.name === "You" && styles.nameMe]}>{p.name}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${Math.min(100, (p.reels / 100) * 100)}%` as any,
                    backgroundColor: p.name === "You" ? "#E8B030" : "#222222",
                  },
                ]}
              />
            </View>
            <Text style={styles.cnt}>{p.reels}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", paddingHorizontal: 20 },
  header: { paddingVertical: 16, marginBottom: 14 },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
    letterSpacing: 3,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#666666",
    marginTop: 2,
  },
  vsCard: { borderRadius: 20, padding: 20, marginBottom: 28 },
  vsRow: { flexDirection: "row", alignItems: "center" },
  fighter: { flex: 1, alignItems: "center", gap: 6 },
  fighterImg: { width: 86, height: 86 },
  fighterName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#CCCCCC",
  },
  myScore: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#E8B030",
  },
  enemyScore: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FF4444",
  },
  vsCenter: { alignItems: "center", gap: 6 },
  lightningBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2A1400",
    borderWidth: 1.5,
    borderColor: "#3D2000",
    alignItems: "center",
    justifyContent: "center",
  },
  vsLabel: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: "#555555",
    letterSpacing: 2,
  },
  sectionHead: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  leaderboard: { gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E0E0E",
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  rowMe: { borderColor: "#3A2400" },
  rank: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: "#444444",
    width: 28,
  },
  rankGold: { color: "#E8B030" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarMe: { backgroundColor: "#2A1400", borderWidth: 1.5, borderColor: "#E8B030" },
  avatarTxt: { fontSize: 14, fontFamily: "Inter_700Bold", color: "#FFFFFF" },
  name: { fontSize: 14, fontFamily: "Inter_500Medium", color: "#CCCCCC", width: 72 },
  nameMe: { color: "#E8B030" },
  barTrack: { flex: 1, height: 5, backgroundColor: "#1A1A1A", borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  cnt: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "#666666", width: 28, textAlign: "right" },
});
