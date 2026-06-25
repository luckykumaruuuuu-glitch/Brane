import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function InstagramScreen() {
  const insets = useSafeAreaInsets();
  const { setOnboardingComplete } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotSlide = useRef(new Animated.Value(-40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(mascotSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, mascotSlide, pulseAnim]);

  const handleFinish = async () => {
    await setOnboardingComplete(true);
    router.replace("/(tabs)");
  };

  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 40, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <Text style={styles.headline}>
        Open <Text style={styles.igWord}>Instagram</Text> to see{"\n"}BrainGuard in action
      </Text>

      <View style={styles.cardBlock}>
        <Animated.View style={[styles.mascotPeek, { transform: [{ translateY: mascotSlide }] }]}>
          <Image
            source={require("../../assets/images/brain-mascot.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </Animated.View>

        <View style={styles.card}>
          <View style={styles.igLogo}>
            <Feather name="instagram" size={40} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <Animated.View style={[{ width: "100%" }, { transform: [{ scale: pulseAnim }] }]}>
          <WarmButton label="Open Instagram" onPress={handleFinish} style={{ width: "100%" }} />
        </Animated.View>
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
  igWord: {
    color: "#E8B030",
  },
  cardBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  mascotPeek: {
    zIndex: 2,
    marginBottom: -40,
  },
  mascot: {
    width: 100,
    height: 100,
  },
  card: {
    width: "80%",
    height: 180,
    backgroundColor: "#111111",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    zIndex: 1,
  },
  igLogo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#833AB4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#833AB4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  buttons: {
    width: "100%",
    gap: 10,
  },
});
