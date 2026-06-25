import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RatingScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotAnim = useRef(new Animated.Value(0.8)).current;
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(mascotAnim, { toValue: 1, useNativeDriver: true, tension: 60 }),
    ]).start();
  }, [fadeAnim, mascotAnim]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 48, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.headline}>Give us a rating</Text>
        <Text style={styles.sub}>It helps more people escape{"\n"}doomscrolling.</Text>

        <Animated.View style={[styles.mascotWrapper, { transform: [{ scale: mascotAnim }] }]}>
          <Image
            source={require("../../assets/images/brain-star-nobg.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </Animated.View>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => setSelected(s)} activeOpacity={0.7}>
              <Text style={[styles.star, s <= selected && styles.starFilled]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <WarmButton
        label="Continue"
        onPress={() => router.push("/onboarding/widget")}
        style={styles.btn}
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
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  mascotWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 220,
    height: 220,
  },
  stars: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  star: {
    fontSize: 44,
    color: "#333333",
  },
  starFilled: {
    color: "#E8B030",
  },
  btn: {
    width: "100%",
  },
});
