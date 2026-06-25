import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OfferScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const mascotSlide = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
      Animated.spring(mascotSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, [fadeAnim, cardScale, mascotSlide]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 48, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.headline}>You unlocked limited{"\n"}time offer!</Text>

        <View style={styles.offerBlock}>
          <Animated.View style={[styles.mascotPeek, { transform: [{ translateY: mascotSlide }] }]}>
            <Image
              source={require("../../assets/images/brain-gift2.png")}
              style={styles.mascot}
              contentFit="contain"
            />
          </Animated.View>

          <Animated.View style={[styles.offerCard, { transform: [{ scale: cardScale }] }]}>
            <Text style={styles.offerPct}>70% OFF</Text>
            <Text style={styles.offerSub}>on yearly plan</Text>
          </Animated.View>
        </View>
      </View>

      <WarmButton label="Continue" onPress={() => router.push("/onboarding/subscription")} style={styles.btn} />
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
    alignItems: "center",
    width: "100%",
  },
  headline: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 48,
  },
  offerBlock: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  mascotPeek: {
    zIndex: 2,
    marginBottom: -50,
  },
  mascot: {
    width: 140,
    height: 140,
  },
  offerCard: {
    width: "100%",
    backgroundColor: "#0D2B0D",
    borderRadius: 24,
    padding: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E4A1E",
    zIndex: 1,
  },
  offerPct: {
    fontSize: 52,
    fontFamily: "Inter_700Bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  offerSub: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#4CAF50",
  },
  btn: {
    width: "100%",
  },
});
