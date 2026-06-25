import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface GoldButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  variant?: "gold" | "outline" | "ghost";
  disabled?: boolean;
}

export default function GoldButton({
  onPress,
  label,
  style,
  textStyle,
  loading,
  variant = "gold",
  disabled,
}: GoldButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  if (variant === "outline") {
    return (
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          style={styles.outlineBtn}
        >
          <Text style={[styles.outlineText, textStyle]}>{label}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  if (variant === "ghost") {
    return (
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          style={styles.ghostBtn}
        >
          <Text style={[styles.ghostText, textStyle]}>{label}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <LinearGradient
          colors={["#E8C84A", "#D4AF37", "#C49A2A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={[styles.goldText, textStyle]}>{label}</Text>
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
  },
  goldText: {
    color: "#000000",
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.3,
  },
  outlineBtn: {
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#2A2A2A",
  },
  outlineText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  ghostBtn: {
    paddingVertical: 16,
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
