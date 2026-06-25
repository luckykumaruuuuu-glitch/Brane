import { useState } from "react";
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

export type Screen =
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

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [permissionStep, setPermissionStep] = useState(0);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");

  const go = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#111" }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100svh",
          background: "#000",
        }}
      >
        {screen === "landing" && <LandingScreen onNext={() => go("auth-sheet")} />}
        {screen === "auth-sheet" && <AuthSheet onNext={() => go("welcome")} />}
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
        {screen === "instagram" && <InstagramScreen onNext={() => go("home")} />}
        {screen === "home" && (
          <HomeScreen
            onProfile={() => go("profile")}
            userName="Max"
            userEmail="max785mmaaxx@gmail.com"
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            onBack={() => go("home")}
            userName="Max"
            userEmail="max785mmaaxx@gmail.com"
          />
        )}
      </div>
    </div>
  );
}
