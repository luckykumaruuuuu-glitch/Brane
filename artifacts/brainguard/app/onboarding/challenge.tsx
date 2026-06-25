import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideLeft = useRef(new Animated.Value(-40)).current;
  const slideRight = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideLeft, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(slideRight, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideLeft, slideRight]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20 }]}>
      <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
        <View style={styles.progressRow}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <View key={i} style={[styles.dot, i === 4 && styles.dotActive]} />
          ))}
        </View>

        <Text style={styles.eyebrow}>Challenge</Text>
        <Text style={styles.headline}>Battle your friends</Text>
        <Text style={styles.subtitle}>Who can watch fewer reels?</Text>
      </Animated.View>

      <View style={styles.battle}>
        <Animated.View style={[styles.playerCard, { transform: [{ translateX: slideLeft }], opacity: fadeAnim }]}>
          <LinearGradient colors={["#D4AF37", "#8B7322"]} style={styles.playerGradient}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>Y</Text>
            </View>
            <Text style={styles.playerLabel}>You</Text>
            <Text style={styles.playerCount}>36</Text>
            <Text style={styles.playerUnit}>reels</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.vsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.vs}>VS</Text>
        </Animated.View>

        <Animated.View style={[styles.playerCard, { transform: [{ translateX: slideRight }], opacity: fadeAnim }]}>
          <View style={[styles.playerGradient, styles.friendCard]}>
            <View style={[styles.avatarCircle, styles.friendAvatar]}>
              <Text style={styles.avatarText}>F</Text>
            </View>
            <Text style={[styles.playerLabel, styles.friendLabel]}>Friend</Text>
            <Text style={[styles.playerCount, styles.friendCount]}>93</Text>
            <Text style={[styles.playerUnit, styles.friendUnit]}>reels</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.winBanner}>
        <Text style={styles.winText}>You're winning by 57 reels!</Text>
      </View>

      <View style={styles.buttons}>
        <GoldButton
          label="Challenge Your Friend"
          onPress={() => router.push("/onboarding/reward")}
          style={styles.btn}
        />
        <GoldButton
          label="I'll Do It Later"
          variant="ghost"
          onPress={() => router.push("/onboarding/reward")}
          style={styles.btn}
        />
      </View>
    </View>
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
    marginBottom: 28,
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
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    marginBottom: 12,
  },
  battle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  playerCard: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  playerGradient: {
    padding: 24,
    alignItems: "center",
    borderRadius: 24,
    minHeight: 200,
    justifyContent: "center",
  },
  friendCard: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  friendAvatar: {
    backgroundColor: "#2A2A2A",
  },
  avatarText: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  playerLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "rgba(0,0,0,0.7)",
    marginBottom: 8,
  },
  playerCount: {
    fontSize: 48,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    lineHeight: 52,
  },
  playerUnit: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(0,0,0,0.6)",
  },
  friendLabel: {
    color: "#888888",
  },
  friendCount: {
    color: "#FF4444",
  },
  friendUnit: {
    color: "#555555",
  },
  vsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  vs: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#555555",
  },
  winBanner: {
    backgroundColor: "#1E3A1E",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#2D5A2D",
  },
  winText: {
    color: "#4CAF50",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  buttons: {
    width: "100%",
    gap: 4,
  },
  btn: {
    width: "100%",
  },
});
