import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Slide = {
  headline: string;
  counter: string | null;
  counterColor: string;
  image: ReturnType<typeof require>;
};

const SLIDES: Slide[] = [
  {
    headline: "Your brain starts\nfresh everyday",
    counter: "0 reels",
    counterColor: "#5C3010",
    image: require("../../assets/images/brain-fresh-nobg.png"),
  },
  {
    headline: "Then you start\nscrolling.",
    counter: "9 reels",
    counterColor: "#5C3010",
    image: require("../../assets/images/brain-scrolling-nobg.png"),
  },
  {
    headline: "Every reel drains\nyour brain more.",
    counter: "100 reels",
    counterColor: "#5C3010",
    image: require("../../assets/images/brain-tired-nobg.png"),
  },
  {
    headline: "Your ability to\nfocus drops.",
    counter: "500+ reels",
    counterColor: "#6B1A1A",
    image: require("../../assets/images/brain-grumpy-nobg.png"),
  },
  {
    headline: "You decide when to stop.\nNot the algorithm.",
    counter: null,
    counterColor: "#5C3010",
    image: require("../../assets/images/brain-cool-nobg.png"),
  },
];

export default function StoryScreen() {
  const insets = useSafeAreaInsets();
  const [idx, setIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === "web" ? 52 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const goNext = () => {
    if (idx < SLIDES.length - 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setIdx((i) => i + 1);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
          Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80 }),
        ]).start();
      });
    } else {
      router.push("/onboarding/benefits");
    }
  };

  const slide = SLIDES[idx];

  return (
    <Pressable style={[styles.container, { paddingTop: topPad + 12, paddingBottom: bottomPad + 20 }]} onPress={goNext}>
      <View style={styles.bars}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.bar, i <= idx && styles.barFilled]} />
        ))}
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.headline}>{slide.headline}</Text>

        {slide.counter && (
          <View style={[styles.counterPill, { backgroundColor: slide.counterColor }]}>
            <Text style={styles.counterText}>{slide.counter}</Text>
          </View>
        )}

        <View style={styles.mascotWrapper}>
          <Image
            source={slide.image}
            style={styles.mascot}
            contentFit="contain"
          />
        </View>
      </Animated.View>

      <WarmButton
        label="Continue"
        onPress={goNext}
        style={styles.btn}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  bars: {
    flexDirection: "row",
    gap: 4,
    width: "100%",
    marginBottom: 28,
  },
  bar: {
    flex: 1,
    height: 3,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
  },
  barFilled: {
    backgroundColor: "#E8B030",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  headline: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 44,
    marginBottom: 24,
  },
  counterPill: {
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 40,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  mascotWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 240,
    height: 240,
  },
  btn: {
    width: "100%",
  },
});
