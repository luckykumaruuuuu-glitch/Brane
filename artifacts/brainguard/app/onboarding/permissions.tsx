import WarmButton from "@/components/WarmButton";
import { router } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type Perm = { id: string; title: string; desc: string; granted: boolean };

const INITIAL: Perm[] = [
  { id: "overlay", title: "Display over other apps", desc: "To show reels count", granted: false },
  { id: "background", title: "Background", desc: "To keep app running", granted: false },
  { id: "accessibility", title: "Accessibility", desc: "To count reels", granted: false },
];

export default function PermissionsScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [perms, setPerms] = useState(INITIAL);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const grant = (id: string) => {
    setPerms((prev) => prev.map((p) => (p.id === id ? { ...p, granted: true } : p)));
  };

  const activeIdx = perms.findIndex((p) => !p.granted);
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 48, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <Text style={styles.headline}>Enable permissions to{"\n"}start counting reels</Text>

      <View style={styles.permList}>
        {perms.map((p, i) => {
          const isActive = i === activeIdx;
          const isDone = p.granted;
          const isLocked = !isDone && i > activeIdx;

          return (
            <View key={p.id} style={styles.permRow}>
              <View style={styles.permTexts}>
                <Text style={[styles.permTitle, (isDone || isLocked) && styles.permTitleDim]}>{p.title}</Text>
                {isActive && <Text style={styles.permDesc}>{p.desc}</Text>}
              </View>

              {isDone ? (
                <View style={styles.doneCircle}>
                  <Feather name="check" size={14} color="#AAAAAA" />
                </View>
              ) : isActive ? (
                <TouchableOpacity onPress={() => grant(p.id)} style={styles.allowBtn} activeOpacity={0.8}>
                  <Text style={styles.allowText}>Allow</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.whyBtn} activeOpacity={0.7} onPress={() => {}}>
        <Feather name="check-circle" size={16} color="#888888" />
        <Text style={styles.whyText}>Why should I give this permission?</Text>
        <Feather name="chevron-right" size={16} color="#888888" />
      </TouchableOpacity>

      {perms.every((p) => p.granted) && (
        <WarmButton label="Continue" onPress={() => router.push("/onboarding/challenge")} style={styles.btn} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
  },
  headline: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    lineHeight: 36,
    marginBottom: 48,
  },
  permList: {
    gap: 32,
  },
  permRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  permTexts: {
    flex: 1,
    marginRight: 16,
  },
  permTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  permTitleDim: {
    color: "#444444",
    fontFamily: "Inter_400Regular",
  },
  permDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  doneCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1E1E1E",
    borderWidth: 1.5,
    borderColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  allowBtn: {
    borderRadius: 30,
    overflow: "hidden",
  },
  allowText: {
    color: "#5A3A00",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    backgroundColor: "#E8B030",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
  whyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#111111",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 20,
  },
  whyText: {
    flex: 1,
    color: "#AAAAAA",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  btn: {
    width: "100%",
  },
});
