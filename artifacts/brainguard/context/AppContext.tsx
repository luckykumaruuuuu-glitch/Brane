import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

interface UserInfo {
  displayName: string;
  email: string;
  photoURL?: string;
}

interface AppContextType {
  reelCount: number;
  weeklyData: number[];
  monthlyTotal: number;
  timeWasted: number;
  onboardingComplete: boolean;
  setOnboardingComplete: (val: boolean) => Promise<void>;
  incrementReel: () => void;
  resetToday: () => void;
  productivityScore: number;
  focusScore: number;
  scrollRisk: "Low" | "Medium" | "High";
  user: UserInfo | null;
  setUser: (u: UserInfo | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  ONBOARDING: "brainguard_onboarding_complete",
  TODAY_COUNT: "brainguard_today_count",
  TODAY_DATE: "brainguard_today_date",
  WEEKLY_DATA: "brainguard_weekly_data",
  USER: "brainguard_user",
};

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [onboardingComplete, setOnboardingCompleteState] = useState(Platform.OS === "web");
  const [reelCount, setReelCount] = useState(56);
  const [weeklyData, setWeeklyData] = useState([32, 45, 67, 41, 89, 56, 72]);
  const [user, setUserState] = useState<UserInfo | null>({
    displayName: "BrainGuard User",
    email: "user@gmail.com",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [onboarding, count, date, weekly, userData] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING),
          AsyncStorage.getItem(STORAGE_KEYS.TODAY_COUNT),
          AsyncStorage.getItem(STORAGE_KEYS.TODAY_DATE),
          AsyncStorage.getItem(STORAGE_KEYS.WEEKLY_DATA),
          AsyncStorage.getItem(STORAGE_KEYS.USER),
        ]);

        if (onboarding !== null) setOnboardingCompleteState(onboarding === "true");

        const today = getTodayString();
        if (date === today && count !== null) {
          setReelCount(parseInt(count, 10));
        } else {
          await AsyncStorage.setItem(STORAGE_KEYS.TODAY_DATE, today);
          await AsyncStorage.setItem(STORAGE_KEYS.TODAY_COUNT, "56");
          setReelCount(56);
        }

        if (weekly) setWeeklyData(JSON.parse(weekly));
        if (userData) setUserState(JSON.parse(userData));
      } catch (_) {}
      setLoaded(true);
    }
    load();
  }, []);

  const setOnboardingComplete = useCallback(async (val: boolean) => {
    setOnboardingCompleteState(val);
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, val ? "true" : "false");
  }, []);

  const setUser = useCallback(async (u: UserInfo | null) => {
    setUserState(u);
    if (u) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, []);

  const incrementReel = useCallback(async () => {
    setReelCount((c) => {
      const next = c + 1;
      AsyncStorage.setItem(STORAGE_KEYS.TODAY_COUNT, String(next));
      return next;
    });
  }, []);

  const resetToday = useCallback(async () => {
    setReelCount(0);
    await AsyncStorage.setItem(STORAGE_KEYS.TODAY_COUNT, "0");
  }, []);

  const monthlyTotal = weeklyData.reduce((a, b) => a + b, 0) * 4 + reelCount;
  const timeWasted = Math.round((reelCount * 0.5) * 10) / 10;
  const avgDaily = weeklyData.reduce((a, b) => a + b, 0) / 7;
  const productivityScore = Math.max(10, Math.min(100, Math.round(100 - (reelCount / 120) * 100)));
  const focusScore = Math.max(10, Math.min(100, Math.round(100 - (avgDaily / 100) * 60)));
  const scrollRisk: "Low" | "Medium" | "High" =
    reelCount < 30 ? "Low" : reelCount < 70 ? "Medium" : "High";

  if (!loaded) return null;

  return (
    <AppContext.Provider
      value={{
        reelCount,
        weeklyData,
        monthlyTotal,
        timeWasted,
        onboardingComplete,
        setOnboardingComplete,
        incrementReel,
        resetToday,
        productivityScore,
        focusScore,
        scrollRisk,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
