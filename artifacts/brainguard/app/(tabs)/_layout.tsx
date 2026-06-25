import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const isIOS = Platform.OS === "ios";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E8B030",
        tabBarInactiveTintColor: "#444444",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : "#000000",
          borderTopWidth: 1,
          borderTopColor: "#161616",
          elevation: 0,
          height: Platform.OS === "web" ? 84 : 60 + (isIOS ? 20 : 0),
          paddingBottom: Platform.OS === "web" ? 30 : isIOS ? 20 : 8,
          paddingTop: 6,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "#000000", borderTopColor: "#161616", borderTopWidth: 1 }]} />
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="battle"
        options={{
          title: "Battle",
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <Ionicons name="flash-outline" size={size + 2} color={color} />
              <View style={{
                position: "absolute",
                top: -2,
                right: -4,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#FF3B30",
                borderWidth: 1.5,
                borderColor: "#000000",
              }} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
