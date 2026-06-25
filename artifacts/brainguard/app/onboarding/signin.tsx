import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const bgFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgFade, { toValue: 0.5, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, [slideAnim, bgFade]);

  const bottomPad = Platform.OS === "web" ? 40 : insets.bottom + 20;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dimBg, { opacity: bgFade }]} />

      <View style={styles.bgContent}>
        <View style={styles.bgPhone}>
          <View style={styles.bgPhoneInner}>
            <View style={styles.bgCounter}>
              <Image source={require("../../assets/images/brain-mascot-nobg.png")} style={styles.bgBrain} contentFit="contain" />
              <Text style={styles.bgCount}>41</Text>
            </View>
          </View>
        </View>
      </View>

      <Animated.View style={[styles.sheet, { paddingBottom: bottomPad, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handle} />
        <TouchableOpacity style={styles.helpRow}>
          <Text style={styles.helpText}>Need help?</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Welcome to BrainGuard</Text>

        <WarmButton
          label="Continue With Google"
          onPress={() => router.push("/onboarding/story")}
          style={styles.googleBtn}
          icon={
            <View style={styles.googleG}>
              <Text style={styles.googleGText}>G</Text>
            </View>
          }
        />

        <Text style={styles.legal}>
          By continuing, you have read and agree to our{"\n"}
          <Text style={styles.legalLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-end",
  },
  dimBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  bgContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 80,
  },
  bgPhone: {
    width: 200,
    height: 300,
    backgroundColor: "#111111",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#222222",
    overflow: "hidden",
  },
  bgPhoneInner: {
    flex: 1,
    backgroundColor: "#2A2020",
    padding: 12,
  },
  bgCounter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5C3010",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    alignSelf: "flex-start",
  },
  bgBrain: {
    width: 28,
    height: 28,
  },
  bgCount: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  sheet: {
    backgroundColor: "#111111",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#444444",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  helpRow: {
    alignSelf: "flex-end",
  },
  helpText: {
    color: "#888888",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  googleBtn: {
    width: "100%",
  },
  googleG: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  googleGText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#4285F4",
  },
  legal: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    lineHeight: 18,
  },
  legalLink: {
    textDecorationLine: "underline",
    color: "#AAAAAA",
  },
});
