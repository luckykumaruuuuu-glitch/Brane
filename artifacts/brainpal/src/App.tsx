import { useState, useEffect } from "react";
import LandingScreen from "./screens/LandingScreen";
import AuthSheet from "./screens/AuthSheet";
import WelcomeScreen from "./screens/WelcomeScreen";
import BrainFreshScreen from "./screens/BrainFreshScreen";
import ScrollingScreen from "./screens/ScrollingScreen";
import DrainsScreen from "./screens/DrainsScreen";
import FocusDropsScreen from "./screens/FocusDropsScreen";
import AlgorithmScreen from "./screens/AlgorithmScreen";
import ScrollLessScreen from "./screens/ScrollLessScreen";
import RatingScreen from "./screens/RatingScreen";
import WidgetScreen from "./screens/WidgetScreen";
import DataPrivacyScreen from "./screens/DataPrivacyScreen";
import PermissionsScreen from "./screens/PermissionsScreen";
import ChallengeFriendsScreen from "./screens/ChallengeFriendsScreen";
import GiftScreen from "./screens/GiftScreen";
import LimitedOfferScreen from "./screens/LimitedOfferScreen";
import PricingScreen from "./screens/PricingScreen";
import InstagramScreen from "./screens/InstagramScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { onAuthChange, signOut, AuthUser } from "./lib/authService";

export type Screen =
  | "splash"
  | "landing"
  | "auth-sheet"
  | "welcome"
  | "brain-fresh"
  | "scrolling"
  | "drains"
  | "focus-drops"
  | "algorithm"
  | "scroll-less"
  | "rating"
  | "widget"
  | "data-privacy"
  | "permissions"
  | "challenge-friends"
  | "gift"
  | "limited-offer"
  | "pricing"
  | "instagram"
  | "home"
  | "profile";

const ONBOARDING_KEY = "brainpal_onboarding_done";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [permissionStep, setPermissionStep] = useState(0);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);

      if (firebaseUser) {
        const onboardingDone = localStorage.getItem(ONBOARDING_KEY) === "true";
        setScreen(onboardingDone ? "home" : "welcome");
      } else {
        setScreen("landing");
      }
    });
    return unsub;
  }, []);

  const go = (s: Screen) => setScreen(s);

  const handleAuthSuccess = (authUser: AuthUser) => {
    setUser(authUser);
    go("welcome");
  };

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem(ONBOARDING_KEY);
    setUser(null);
    go("landing");
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    go("home");
  };

  if (authLoading || screen === "splash") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: "#000" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl animate-pulse">🧠</div>
          <span
            className="text-3xl font-extrabold"
            style={{
              color: "#E8A44B",
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              letterSpacing: 2,
            }}
          >
            BRAINPAL
          </span>
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{ borderColor: "#E8A44B transparent transparent" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "#111" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: "100%", maxWidth: 430, minHeight: "100svh", background: "#000" }}
      >
        {screen === "landing" && <LandingScreen onNext={() => go("auth-sheet")} />}
        {screen === "auth-sheet" && (
          <AuthSheet onNext={handleAuthSuccess} />
        )}
        {screen === "welcome" && <WelcomeScreen onNext={() => go("brain-fresh")} />}
        {screen === "brain-fresh" && <BrainFreshScreen onNext={() => go("scrolling")} />}
        {screen === "scrolling" && <ScrollingScreen onNext={() => go("drains")} />}
        {screen === "drains" && <DrainsScreen onNext={() => go("focus-drops")} />}
        {screen === "focus-drops" && <FocusDropsScreen onNext={() => go("algorithm")} />}
        {screen === "algorithm" && <AlgorithmScreen onNext={() => go("scroll-less")} />}
        {screen === "scroll-less" && <ScrollLessScreen onNext={() => go("rating")} />}
        {screen === "rating" && <RatingScreen onNext={() => go("widget")} />}
        {screen === "widget" && <WidgetScreen onNext={() => go("data-privacy")} />}
        {screen === "data-privacy" && <DataPrivacyScreen onNext={() => go("permissions")} />}
        {screen === "permissions" && (
          <PermissionsScreen
            step={permissionStep}
            onAllow={() => {
              if (permissionStep < 2) {
                setPermissionStep(permissionStep + 1);
              } else {
                go("challenge-friends");
                setPermissionStep(0);
              }
            }}
          />
        )}
        {screen === "challenge-friends" && <ChallengeFriendsScreen onNext={() => go("gift")} />}
        {screen === "gift" && <GiftScreen onNext={() => go("limited-offer")} />}
        {screen === "limited-offer" && <LimitedOfferScreen onNext={() => go("pricing")} />}
        {screen === "pricing" && <PricingScreen onNext={() => go("instagram")} />}
        {screen === "instagram" && <InstagramScreen onNext={handleOnboardingComplete} />}
        {screen === "home" && (
          <HomeScreen
            onProfile={() => go("profile")}
            userName={user?.displayName ?? "Max"}
            userEmail={user?.email ?? ""}
            userPhoto={user?.photoURL}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            onBack={() => go("home")}
            onLogout={handleLogout}
            userName={user?.displayName ?? "Max"}
            userEmail={user?.email ?? "max785mmaaxx@gmail.com"}
            userPhoto={user?.photoURL}
          />
        )}
      </div>
    </div>
  );
}
