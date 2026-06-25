import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WidgetScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.phoneFrame}>
        <View style={styles.phone}>
          <View style={styles.notch} />
          <View style={styles.widgetBubble}>
            <Image source={require("../../assets/images/brain-mascot.png")} style={styles.brainSmall} />
            <Text style={styles.widgetCount}>43</Text>
          </View>
          <View style={styles.phoneContent}>
            <View style={styles.appRow}>
              {[1, 2, 3, 4].map((j) => (
                <View key={j} style={styles.appIcon} />
              ))}
            </View>
          </View>
          <View style={styles.socialIcons}>
            {["instagram", "youtube", "snap", "facebook"].map((s) => (
              <View key={s} style={styles.socialDot} />
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.headline}>See your reels count</Text>
      <Text style={styles.subtitle}>Instantly visible from your home screen — always know where you stand</Text>

      <View style={styles.buttons}>
        <GoldButton label="Add Widget" onPress={() => router.push("/onboarding/privacy")} style={styles.btn} />
      </View>
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
    marginBottom: 32,
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
  phoneFrame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: 200,
    height: 340,
    backgroundColor: "#1A1A1A",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#333333",
    alignItems: "center",
    overflow: "hidden",
    padding: 16,
  },
  notch: {
    width: 60,
    height: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
    marginBottom: 12,
  },
  widgetBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B4513",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 20,
  },
  brainSmall: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  widgetCount: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  phoneContent: {
    width: "100%",
  },
  appRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  appIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#333333",
    borderRadius: 10,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 16,
    marginTop: "auto",
    paddingBottom: 8,
  },
  socialDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#333333",
  },
  headline: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  buttons: {
    width: "100%",
  },
  btn: {
    width: "100%",
  },
});
