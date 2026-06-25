import { Image } from "expo-image";
import WarmButton from "@/components/WarmButton";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { onboardingComplete } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [displayCount, setDisplayCount] = React.useState(38);

  useEffect(() => {
    if (onboardingComplete) {
      router.replace("/(tabs)");
      return;
    }
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    let c = 38;
    const interval = setInterval(() => {
      if (c < 43) { c++; setDisplayCount(c); }
      else { clearInterval(interval); }
    }, 600);
    return () => clearInterval(interval);
  }, [onboardingComplete]);

  if (onboardingComplete) return null;

  const topPad = Platform.OS === "web" ? 52 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Image source={require("../assets/images/brain-mascot-nobg.png")} style={styles.logoIcon} contentFit="contain" />
          <Text style={styles.logoText}>BRAIN<Text style={styles.logoTextDim}>GUARD</Text></Text>
        </View>
        <View style={styles.langBtn}>
          <Feather name="globe" size={13} color="#DDDDDD" />
          <Text style={styles.langText}>English</Text>
        </View>
      </View>

      <View style={styles.phoneMockupWrapper}>
        <View style={styles.phone}>
          <View style={styles.phoneInner}>
            <View style={styles.reelBg}>
              <View style={styles.reelUser}>
                <View style={styles.userAvatar} />
                <Text style={styles.userName}>naru_kumar20</Text>
              </View>
              <View style={styles.reelCaption}>
                <Text style={styles.reelCaptionText}>Does a delight have so... <Text style={styles.more}>more</Text></Text>
              </View>
              <View style={styles.reelActions}>
                <View style={styles.actionItem}>
                  <Feather name="heart" size={18} color="#FFFFFF" />
                  <Text style={styles.actionCount}>1.7k</Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather name="message-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.actionCount}>41</Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather name="bookmark" size={18} color="#FFFFFF" />
                </View>
              </View>
            </View>
            <View style={styles.counterBubble}>
              <Image source={require("../assets/images/brain-mascot-nobg.png")} style={styles.bubbleBrain} contentFit="contain" />
              <Text style={styles.counterNum}>{displayCount}</Text>
            </View>
          </View>
          <View style={styles.phoneChin} />
        </View>
      </View>

      <Animated.View style={[styles.bottom, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.headline}>See your reels count</Text>

        <View style={styles.socialRow}>
          <View style={styles.socialIcon}><Feather name="instagram" size={22} color="#666666" /></View>
          <View style={styles.socialIcon}><FontAwesome name="youtube-play" size={22} color="#666666" /></View>
          <View style={styles.socialIcon}><FontAwesome name="snapchat-ghost" size={20} color="#666666" /></View>
          <View style={styles.socialIcon}><FontAwesome name="facebook" size={20} color="#666666" /></View>
        </View>

        <WarmButton
          label="Get Started"
          onPress={() => router.push("/onboarding/signin")}
          style={styles.btn}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoIcon: {
    width: 28,
    height: 28,
  },
  logoText: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#E8A030",
    letterSpacing: 1,
  },
  logoTextDim: {
    color: "#D4AF37",
  },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  langText: {
    color: "#DDDDDD",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  phoneMockupWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: 220,
    backgroundColor: "#111111",
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: "#333333",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  phoneInner: {
    height: 360,
    backgroundColor: "#1A1A1A",
    position: "relative",
  },
  reelBg: {
    flex: 1,
    backgroundColor: "#2A2020",
    padding: 12,
    justifyContent: "flex-end",
  },
  reelUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#555555",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  reelCaption: {
    marginBottom: 4,
  },
  reelCaptionText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  more: {
    color: "#CCCCCC",
  },
  reelActions: {
    position: "absolute",
    right: 10,
    bottom: 50,
    gap: 16,
  },
  actionItem: {
    alignItems: "center",
    gap: 2,
  },
  actionCount: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
  },
  counterBubble: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5C3010",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  bubbleBrain: {
    width: 30,
    height: 30,
  },
  counterNum: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  phoneChin: {
    height: 18,
    backgroundColor: "#111111",
  },
  bottom: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 8,
  },
  headline: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "100%",
  },
});
