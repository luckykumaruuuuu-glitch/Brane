import GoldButton from "@/components/GoldButton";
import { router } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

interface Permission {
  id: string;
  title: string;
  desc: string;
  icon: keyof typeof Feather.glyphMap;
  granted: boolean;
}

export default function PermissionsScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: "overlay", title: "Display over other apps", desc: "Shows floating reel counter overlay", icon: "layers", granted: false },
    { id: "background", title: "Background running", desc: "Tracks reels even when app is closed", icon: "refresh-cw", granted: false },
    { id: "accessibility", title: "Accessibility service", desc: "Detects reels on Instagram, YouTube & Facebook", icon: "eye", granted: false },
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const grantPermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: true } : p))
    );
  };

  const allGranted = permissions.every((p) => p.granted);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Animated.View style={[styles.container, { paddingTop: topPad + 20, paddingBottom: bottomPad + 20, opacity: fadeAnim }]}>
      <View style={styles.progressRow}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={[styles.dot, i === 3 && styles.dotActive]} />
        ))}
      </View>

      <Text style={styles.eyebrow}>Setup</Text>
      <Text style={styles.headline}>Grant Permissions</Text>
      <Text style={styles.subtitle}>Required to detect and count reels accurately</Text>

      <View style={styles.permList}>
        {permissions.map((p, idx) => {
          const scale = useRef(new Animated.Value(1)).current;

          const handleGrant = () => {
            Animated.sequence([
              Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
              Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            ]).start();
            setTimeout(() => grantPermission(p.id), 200);
          };

          return (
            <Animated.View key={p.id} style={[styles.permCard, { transform: [{ scale }] }]}>
              <View style={[styles.permIcon, p.granted && styles.permIconGranted]}>
                <Feather name={p.icon} size={20} color={p.granted ? "#4CAF50" : "#888888"} />
              </View>
              <View style={styles.permText}>
                <Text style={styles.permTitle}>{p.title}</Text>
                <Text style={styles.permDesc}>{p.desc}</Text>
              </View>
              {p.granted ? (
                <View style={styles.grantedBadge}>
                  <Feather name="check" size={14} color="#4CAF50" />
                </View>
              ) : (
                <TouchableOpacity onPress={handleGrant} style={styles.grantBtn} activeOpacity={0.7}>
                  <Text style={styles.grantText}>Allow</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(permissions.filter((p) => p.granted).length / 3) * 100}%` }]} />
      </View>
      <Text style={styles.progressLabel}>{permissions.filter((p) => p.granted).length} of 3 permissions granted</Text>

      <GoldButton
        label={allGranted ? "Continue" : "Skip for now"}
        onPress={() => router.push("/onboarding/challenge")}
        variant={allGranted ? "gold" : "ghost"}
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
  progressRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 28,
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
  eyebrow: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: "#D4AF37",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  headline: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
    marginBottom: 32,
  },
  permList: {
    width: "100%",
    gap: 12,
    flex: 1,
  },
  permCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 16,
    gap: 14,
  },
  permIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  permIconGranted: {
    backgroundColor: "#1E3A1E",
  },
  permText: {
    flex: 1,
  },
  permTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  permDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  grantedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E3A1E",
    alignItems: "center",
    justifyContent: "center",
  },
  grantBtn: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
  grantText: {
    color: "#D4AF37",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
    marginTop: 24,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#D4AF37",
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#555555",
    marginBottom: 24,
  },
  btn: {
    width: "100%",
  },
});
