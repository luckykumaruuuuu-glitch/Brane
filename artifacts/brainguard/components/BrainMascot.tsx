import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

type MascotVariant = "default" | "gift" | "lock";

interface BrainMascotProps {
  size?: number;
  variant?: MascotVariant;
  animate?: boolean;
}

const sources: Record<MascotVariant, string> = {
  default: require("../assets/images/brain-mascot.png"),
  gift: require("../assets/images/brain-gift.png"),
  lock: require("../assets/images/brain-lock.png"),
};

export default function BrainMascot({ size = 140, variant = "default", animate = true }: BrainMascotProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animate) return;

    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -12, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );

    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    );

    float.start();
    breathe.start();

    return () => {
      float.stop();
      breathe.stop();
    };
  }, [animate, floatAnim, scaleAnim]);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center", backgroundColor: "#000000" }}>
      <Animated.View style={{ transform: [{ translateY: floatAnim }, { scale: scaleAnim }] }}>
        <Image
          source={sources[variant]}
          style={{ width: size, height: size }}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </View>
  );
}
