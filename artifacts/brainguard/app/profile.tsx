import { Image } from "expo-image";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

function useCountdown(initial: number) {
  const [s, setS] = React.useState(initial);
  React.useEffect(() => {
    const t = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function MenuItem({
  icon,
  label,
  subtitle,
  value,
  onPress,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuBody}>
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
        {subtitle ? <Text style={styles.menuSub}>{subtitle}</Text> : null}
      </View>
      {value ? <Text style={styles.menuValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color="#444444" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useApp();
  const timer = useCountdown(9105);
  const topPad = Platform.OS === "web" ? 48 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: topPad }]}
      contentContainerStyle={{ paddingBottom: botPad + 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Back */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Avatar + Name + Email */}
      <View style={styles.profileTop}>
        <View style={styles.avatarRing}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatarImg} contentFit="cover" />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={42} color="#E8B030" />
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user?.displayName ?? "BrainGuard User"}</Text>
        <Text style={styles.userEmail}>{user?.email ?? "user@gmail.com"}</Text>
      </View>

      {/* PRO Banner */}
      <TouchableOpacity
        style={styles.proBanner}
        onPress={() => router.push("/onboarding/subscription")}
        activeOpacity={0.85}
      >
        <View style={styles.proBadge}>
          <Text style={styles.proText}>PRO</Text>
        </View>
        <Text style={styles.proLabel}>Claim 70% Off</Text>
        <Text style={styles.proTimer}>{timer}</Text>
        <Ionicons name="chevron-forward" size={16} color="#666666" />
      </TouchableOpacity>

      {/* Widgets card */}
      <View style={styles.widgetCard}>
        <View style={styles.widgetLeft}>
          <Image
            source={require("../assets/images/brain-dazed-nobg.png")}
            style={styles.widgetBrain}
            contentFit="contain"
          />
        </View>
        <View style={styles.widgetBody}>
          <Text style={styles.widgetTitle}>Widgets</Text>
          <Text style={styles.widgetSub}>See brain state in homepage</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#444444" />
      </View>

      {/* Menu list */}
      <View style={styles.menuCard}>
        <MenuItem
          icon={<Ionicons name="people-outline" size={20} color="#888888" />}
          label="Friends"
          onPress={() => {}}
        />
      </View>

      <View style={styles.menuCard}>
        <MenuItem
          icon={<Ionicons name="chatbox-outline" size={20} color="#888888" />}
          label="Send Feedback"
          onPress={() => {}}
        />
      </View>

      <View style={styles.menuCard}>
        <MenuItem
          icon={<MaterialCommunityIcons name="translate" size={20} color="#888888" />}
          label="Language"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem
          icon={<Ionicons name="star-outline" size={20} color="#888888" />}
          label="Rate us on playstore"
          onPress={() => {}}
        />
      </View>

      <View style={styles.menuCard}>
        <MenuItem
          icon={<Ionicons name="information-circle-outline" size={20} color="#888888" />}
          label="Legal"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem
          icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color="#888888" />}
          label="Counter size"
          value="Small"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem
          icon={<Ionicons name="log-out-outline" size={20} color="#888888" />}
          label="Logout"
          onPress={handleLogout}
        />
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", paddingHorizontal: 20 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#252525",
    marginBottom: 24,
    marginTop: 8,
  },
  profileTop: {
    alignItems: "center",
    marginBottom: 24,
    gap: 6,
  },
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2.5,
    borderColor: "#2A2A2A",
    overflow: "hidden",
    marginBottom: 4,
  },
  avatarImg: { width: "100%", height: "100%" },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#666666",
  },
  proBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C0E00",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#3A2000",
    gap: 10,
    marginBottom: 20,
  },
  proBadge: {
    backgroundColor: "#E8B030",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#4A2800",
  },
  proLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  proTimer: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#E8B030",
    letterSpacing: 0.5,
  },
  widgetCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  widgetLeft: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  widgetBrain: { width: 52, height: 52 },
  widgetBody: { flex: 1, gap: 2 },
  widgetTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  widgetSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#666666",
  },
  menuCard: {
    backgroundColor: "#111111",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  menuIcon: {
    width: 22,
    alignItems: "center",
  },
  menuBody: { flex: 1 },
  menuLabel: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#FFFFFF",
  },
  menuLabelDanger: { color: "#FF4444" },
  menuSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#666666",
    marginTop: 1,
  },
  menuValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666666",
    marginRight: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 16,
  },
  version: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#444444",
    marginTop: 8,
  },
});
