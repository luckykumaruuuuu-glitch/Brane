import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RewardScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotScale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(mascotScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
  }, [fadeAnim, mascotScale]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 48, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.headline}>You've earned a gift{"\n"}for taking the first step!</Text>

        <Animated.View style={[styles.mascotWrapper, { transform: [{ scale: mascotScale }] }]}>
          <Image
            source={require("../../assets/images/brain-gift2.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </Animated.View>
      </View>

      <WarmButton label="Unlock Gift" onPress={() => router.push("/onboarding/offer")} style={styles.btn} />
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
    marginBottom: 40,
  },
  mascotWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 260,
    height: 260,
  },
  btn: {
    width: "100%",
  },
});
