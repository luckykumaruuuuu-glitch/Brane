import GoldButton from "@/components/GoldButton";
import BrainMascot from "@/components/BrainMascot";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function InstagramScreen() {
  const insets = useSafeAreaInsets();
  const { setOnboardingComplete } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, pulseAnim]);

  const handleFinish = async () => {
    await setOnboardingComplete(true);
    router.replace("/(tabs)");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 8 && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.content}>
        <BrainMascot size={120} variant="default" animate />

        <Text style={styles.headline}>See BrainGuard{"\n"}in action</Text>
        <Text style={styles.subtitle}>Open Instagram and scroll a few reels. Watch BrainGuard count them in real-time.</Text>

        <View style={styles.demoCard}>
          <View style={styles.demoRow}>
            <View style={styles.brainBubble}>
              <BrainMascot size={28} variant="default" animate={false} />
              <Text style={styles.bubbleCount}>0</Text>
            </View>
            <Text style={styles.demoArrow}>→</Text>
            <View style={styles.igIcon}>
              <Feather name="instagram" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.demoArrow}>→</Text>
            <View style={styles.brainBubble}>
              <BrainMascot size={28} variant="default" animate={false} />
              <Text style={styles.bubbleCount}>5</Text>
            </View>
          </View>
          <Text style={styles.demoCaption}>Reels detected and counted automatically</Text>
        </View>
      </View>

      <Animated.View style={[styles.igBtnWrapper, { transform: [{ scale: pulseAnim }] }]}>
        <GoldButton
          label="Open Instagram"
          onPress={handleFinish}
          style={{ width: "100%" }}
        />
      </Animated.View>

      <GoldButton
        label="Skip — Go to Dashboard"
        variant="ghost"
        onPress={handleFinish}
        style={{ width: "100%" }}
      />
    </Animated.View>
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
    marginBottom: 20,
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  headline: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  demoCard: {
    backgroundColor: "#111111",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 24,
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  demoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  brainBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B4513",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  bubbleCount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  igIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#833AB4",
    alignItems: "center",
    justifyContent: "center",
  },
  demoArrow: {
    fontSize: 18,
    color: "#555555",
    fontFamily: "Inter_400Regular",
  },
  demoCaption: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    textAlign: "center",
  },
  igBtnWrapper: {
    width: "100%",
    marginBottom: 8,
  },
});
