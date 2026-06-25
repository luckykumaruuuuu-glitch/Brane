import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

function YouIcon({ color }: { color: string }) {
  return (
    <View style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, opacity: color === "#E8B030" ? 1 : 0.5 }}>🐾</Text>
    </View>
  );
}

function BattleIcon({ color, badge }: { color: string; badge?: boolean }) {
  return (
    <View style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, opacity: color === "#E8B030" ? 1 : 0.5 }}>⚔️</Text>
      {badge && (
        <View style={{
          position: "absolute", top: -2, right: -2,
          width: 8, height: 8, borderRadius: 4,
          backgroundColor: "#FF3B30",
        }} />
      )}
    </View>
  );
}

export default function TabLayout() {
  const isIOS = Platform.OS === "ios";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E8B030",
        tabBarInactiveTintColor: "#555555",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : "#000000",
          borderTopWidth: 1,
          borderTopColor: "#1A1A1A",
          elevation: 0,
          height: Platform.OS === "web" ? 84 : 60 + (isIOS ? 20 : 0),
          paddingBottom: Platform.OS === "web" ? 34 : isIOS ? 20 : 8,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "#000000", borderTopColor: "#1A1A1A", borderTopWidth: 1 }]} />
          ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter_500Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => <YouIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="battle"
        options={{
          title: "Battle",
          tabBarIcon: ({ color }) => <BattleIcon color={color} badge />,
        }}
      />
    </Tabs>
  );
}
