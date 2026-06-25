import GlassCard from "@/components/GlassCard";
import GoldButton from "@/components/GoldButton";
import { useApp } from "@/context/AppContext";
import React, { useRef, useEffect, useState } from "react";
import { Alert, Animated, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

interface SettingRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
}

function SettingRow({ icon, label, value, onPress, danger, toggle, toggleValue, onToggle }: SettingRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.settingRow}
    >
      <View style={[styles.settingIcon, danger && styles.settingIconDanger]}>
        <Feather name={icon} size={16} color={danger ? "#FF4444" : "#D4AF37"} />
      </View>
      <Text style={[styles.settingLabel, danger && styles.settingLabelDanger]}>{label}</Text>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: "#2A2A2A", true: "#D4AF37" }}
          thumbColor="#FFFFFF"
          style={Platform.OS === "ios" ? {} : { transform: [{ scale: 0.85 }] }}
        />
      ) : (
        <View style={styles.settingRight}>
          {value ? <Text style={styles.settingValue}>{value}</Text> : null}
          {onPress ? <Feather name="chevron-right" size={16} color="#555555" /> : null}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { resetToday, reelCount, productivityScore, setOnboardingComplete } = useApp();
  const [notifs, setNotifs] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const handleReset = () => {
    if (Platform.OS === "web") {
      resetToday();
      return;
    }
    Alert.alert("Reset Today's Count", "This will set today's reel count to zero.", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: resetToday },
    ]);
  };

  const handleRestart = async () => {
    await setOnboardingComplete(false);
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.headerTitle}>Settings</Text>

      <GlassCard style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>B</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>BrainGuard User</Text>
            <Text style={styles.profilePlan}>Free Trial • 7 days left</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreNum}>{productivityScore}</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
        </View>
      </GlassCard>

      <Text style={styles.sectionLabel}>Tracking</Text>
      <GlassCard style={styles.sectionCard}>
        <SettingRow icon="target" label="Daily Limit" value="50 reels" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingRow icon="smartphone" label="Tracked Apps" value="3 apps" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingRow
          icon="refresh-cw"
          label="Reset Today"
          danger
          onPress={handleReset}
          value={`${reelCount} reels`}
        />
      </GlassCard>

      <Text style={styles.sectionLabel}>Notifications</Text>
      <GlassCard style={styles.sectionCard}>
        <SettingRow
          icon="bell"
          label="Push Notifications"
          toggle
          toggleValue={notifs}
          onToggle={setNotifs}
        />
        <View style={styles.divider} />
        <SettingRow
          icon="sunrise"
          label="Daily Reminder"
          toggle
          toggleValue={dailyReminder}
          onToggle={setDailyReminder}
        />
      </GlassCard>

      <Text style={styles.sectionLabel}>Account</Text>
      <GlassCard style={styles.sectionCard}>
        <SettingRow icon="share-2" label="Challenge a Friend" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingRow icon="award" label="Achievements" value="3 unlocked" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingRow icon="star" label="Rate BrainGuard" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingRow icon="help-circle" label="Help & Support" onPress={() => {}} />
      </GlassCard>

      <GoldButton
        label="Upgrade to Premium"
        onPress={() => {}}
        style={styles.upgradeBtn}
      />

      <Text style={styles.version}>BrainGuard v1.0.0 • Made with focus</Text>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  profileCard: {
    marginBottom: 24,
    paddingVertical: 18,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1A1200",
    borderWidth: 2,
    borderColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#D4AF37",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 3,
  },
  profilePlan: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  scoreBadge: {
    alignItems: "center",
    backgroundColor: "#1A1200",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3A2D00",
  },
  scoreNum: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#D4AF37",
  },
  scoreLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    padding: 0,
    marginBottom: 24,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 14,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#1A1200",
    borderWidth: 1,
    borderColor: "#3A2D00",
    alignItems: "center",
    justifyContent: "center",
  },
  settingIconDanger: {
    backgroundColor: "#1A0000",
    borderColor: "#3A0000",
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#FFFFFF",
  },
  settingLabelDanger: {
    color: "#FF4444",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingValue: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#555555",
  },
  divider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 18,
  },
  upgradeBtn: {
    width: "100%",
    marginBottom: 20,
  },
  version: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
});
