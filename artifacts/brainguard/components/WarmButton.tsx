import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

interface WarmButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  variant?: "warm" | "ghost";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function WarmButton({ onPress, label, style, textStyle, loading, variant = "warm", disabled, icon }: WarmButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 60 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 60 }).start();

  if (variant === "ghost") {
    return (
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} disabled={disabled || loading} style={styles.ghost}>
          <Text style={[styles.ghostText, textStyle]}>{label}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} disabled={disabled || loading} style={{ opacity: disabled ? 0.5 : 1 }}>
        <LinearGradient colors={["#F5DC8E", "#E8B030"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
          {loading ? (
            <ActivityIndicator color="#5A3A00" />
          ) : (
            <>
              {icon}
              <Text style={[styles.text, textStyle]}>{label}</Text>
            </>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    color: "#5A3A00",
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.2,
  },
  ghost: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostText: {
    color: "#888888",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
