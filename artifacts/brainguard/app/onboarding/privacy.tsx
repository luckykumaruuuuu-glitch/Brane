import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.7, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, glowAnim]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 40, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <Text style={styles.line1}>We only count reels.</Text>
      <Text style={styles.line2}>Your personal data stays{"\n"}on your phone.</Text>

      <View style={styles.phoneWrapper}>
        <View style={styles.phone}>
          <View style={styles.notch} />
          <Animated.View style={[styles.glowBg, { opacity: glowAnim }]} />
          <View style={styles.brainInPhone}>
            <Image
              source={require("../../assets/images/brain-lock.png")}
              style={styles.brain}
              contentFit="contain"
            />
          </View>
        </View>
      </View>

      <WarmButton label="Continue" onPress={() => router.push("/onboarding/permissions")} style={styles.btn} />
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
  line1: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  line2: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 40,
  },
  phoneWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: 220,
    height: 340,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    overflow: "hidden",
    padding: 16,
    position: "relative",
  },
  notch: {
    width: 50,
    height: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 4,
    marginBottom: 8,
  },
  glowBg: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#D4AF37",
    bottom: 60,
    alignSelf: "center",
  },
  brainInPhone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brain: {
    width: 160,
    height: 160,
  },
  btn: {
    width: "100%",
  },
});
