import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WidgetScreen() {
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
    <Animated.View style={[styles.container, { paddingTop: topPad + 24, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <Animated.Text style={[styles.headline, { transform: [{ translateY: slideAnim }] }]}>
        See your reel count{"\n"}instantly from your{"\n"}home screen.
      </Animated.Text>

      <View style={styles.phoneMockup}>
        <View style={styles.phone}>
          <View style={styles.notch} />
          <View style={styles.homeGrid}>
            <View style={[styles.widgetCell, styles.widgetCellActive]}>
              <Image source={require("../../assets/images/brain-mascot.png")} style={styles.widgetBrain} contentFit="contain" />
              <Text style={styles.widgetCount}>56</Text>
              <Text style={styles.widgetLabel}>Reels today</Text>
            </View>
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={styles.appCell} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <WarmButton label="Add Widget" onPress={() => router.push("/onboarding/privacy")} style={styles.btn} />
        <WarmButton label="Not Now" variant="ghost" onPress={() => router.push("/onboarding/privacy")} style={styles.btn} />
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
  headline: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 40,
  },
  phoneMockup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: 240,
    backgroundColor: "#111111",
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    padding: 16,
    overflow: "hidden",
  },
  notch: {
    width: 50,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 16,
  },
  homeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  widgetCell: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  widgetCellActive: {
    backgroundColor: "#2A1A00",
    borderWidth: 1,
    borderColor: "#5C3010",
  },
  widgetBrain: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  widgetCount: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  widgetLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  appCell: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  buttons: {
    width: "100%",
    gap: 4,
  },
  btn: {
    width: "100%",
  },
});
