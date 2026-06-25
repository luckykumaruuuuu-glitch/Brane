import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const leftSlide = useRef(new Animated.Value(-60)).current;
  const rightSlide = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(leftSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
      Animated.spring(rightSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, [fadeAnim, leftSlide, rightSlide]);

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <LinearGradient
      colors={["#3D1800", "#1A0800", "#000000"]}
      locations={[0, 0.5, 1]}
      style={[styles.container, { paddingTop: topPad + 32, paddingBottom: bottomPad + 20 }]}
    >
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={styles.eyebrow}>Flex your scroll count</Text>
        <Text style={styles.headline}>CHALLENGE{"\n"}FRIENDS</Text>
      </Animated.View>

      <View style={styles.battleArea}>
        <Animated.View style={[styles.fighter, { transform: [{ translateX: leftSlide }], opacity: fadeAnim }]}>
          <View style={styles.figureBox}>
            <View style={styles.figurePlaceholder}>
              <View style={styles.figureHead} />
              <View style={styles.figureBody} />
            </View>
            <Image source={require("../../assets/images/brain-mascot.png")} style={styles.brainBadge} contentFit="contain" />
          </View>
          <View style={styles.scoreBubble}>
            <Text style={styles.scoreNum}>36</Text>
          </View>
          <Text style={styles.fighterLabel}>YOU</Text>
        </Animated.View>

        <View style={styles.vsArea}>
          <Text style={styles.lightning}>⚡</Text>
        </View>

        <Animated.View style={[styles.fighter, { transform: [{ translateX: rightSlide }], opacity: fadeAnim }]}>
          <View style={styles.figureBox}>
            <View style={[styles.figurePlaceholder, styles.figurePlaceholderRight]}>
              <View style={styles.figureHeadRight} />
              <View style={styles.figureBodyRight} />
            </View>
            <Image source={require("../../assets/images/brain-mascot.png")} style={[styles.brainBadge, styles.brainBadgeRight]} contentFit="contain" />
          </View>
          <View style={styles.scoreBubble}>
            <Text style={styles.scoreNum}>93</Text>
          </View>
          <Text style={styles.fighterLabel}>FRIEND</Text>
        </Animated.View>
      </View>

      <View style={styles.buttons}>
        <WarmButton
          label="  Challenge Your Friend"
          onPress={() => router.push("/onboarding/reward")}
          style={styles.btn}
          icon={<Text style={{ fontSize: 16 }}>✕</Text>}
        />
        <WarmButton
          label="I'll Do It Later"
          variant="ghost"
          onPress={() => router.push("/onboarding/reward")}
          style={styles.btn}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  eyebrow: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#C4A060",
    letterSpacing: 1,
    marginBottom: 8,
  },
  headline: {
    fontSize: 42,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 32,
  },
  battleArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    width: "100%",
  },
  fighter: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  figureBox: {
    position: "relative",
    width: 100,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  figurePlaceholder: {
    alignItems: "center",
    gap: 4,
  },
  figureHead: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#5A4030",
    marginBottom: 4,
  },
  figureBody: {
    width: 60,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#3A2A1A",
  },
  figurePlaceholderRight: {},
  figureHeadRight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#5A4035",
    marginBottom: 4,
  },
  figureBodyRight: {
    width: 60,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#3A2A1F",
  },
  brainBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 36,
    height: 36,
  },
  brainBadgeRight: {
    left: 0,
    right: undefined,
  },
  scoreBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5DC8E",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNum: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#5A3A00",
  },
  fighterLabel: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  vsArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  lightning: {
    fontSize: 48,
  },
  buttons: {
    width: "100%",
    gap: 4,
  },
  btn: {
    width: "100%",
  },
});
