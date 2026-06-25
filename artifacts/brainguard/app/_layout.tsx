import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProvider } from "@/context/AppContext";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#000000");

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }}>
            <KeyboardProvider>
              <AppProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    contentStyle: { backgroundColor: "#000000" },
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="onboarding/signin" options={{ animation: "slide_from_bottom" }} />
                  <Stack.Screen name="onboarding/story" />
                  <Stack.Screen name="onboarding/benefits" />
                  <Stack.Screen name="onboarding/rating" />
                  <Stack.Screen name="onboarding/widget" />
                  <Stack.Screen name="onboarding/privacy" />
                  <Stack.Screen name="onboarding/permissions" />
                  <Stack.Screen name="onboarding/challenge" />
                  <Stack.Screen name="onboarding/reward" />
                  <Stack.Screen name="onboarding/offer" />
                  <Stack.Screen name="onboarding/discount" />
                  <Stack.Screen name="onboarding/subscription" />
                  <Stack.Screen name="onboarding/instagram" />
                  <Stack.Screen name="stats" options={{ animation: "slide_from_right" }} />
                  <Stack.Screen name="profile" options={{ animation: "slide_from_right" }} />
                  <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
                </Stack>
              </AppProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
