import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BENEFITS = [
  { label: "Sleep calmly", image: require("../../assets/images/brain-sleep.png") },
  { label: "Focus better", image: require("../../assets/images/brain-reading.png") },
  { label: "Improved mental health", image: require("../../assets/images/brain-meditate.png") },
];

export default function BenefitsScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 32, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <Animated.View style={[styles.content, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.headline}>Within a week,{"\n"}you'll scroll less.</Text>
        <Text style={styles.sub}>And your mind will feel clearer.</Text>

        <View style={styles.cards}>
          {BENEFITS.map((b) => (
            <View key={b.label} style={styles.card}>
              <Image source={b.image} style={styles.cardImage} contentFit="contain" />
              <Text style={styles.cardText}>{b.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <WarmButton label="Let's Do This!" onPress={() => router.push("/onboarding/rating")} style={styles.btn} />
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
  content: {
    flex: 1,
    width: "100%",
  },
  headline: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 44,
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    marginBottom: 36,
  },
  cards: {
    gap: 10,
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  cardImage: {
    width: 56,
    height: 56,
  },
  cardText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  btn: {
    width: "100%",
  },
});
