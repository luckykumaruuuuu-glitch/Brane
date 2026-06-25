import { useState, useEffect } from "react";
import brainMascot from "../assets/brain-mascot-nobg.png";

interface Props {
  onProfile: () => void;
  userPhoto?: string;
  userName?: string;
  userEmail?: string;
}

export default function HomeScreen({ onProfile, userPhoto, userName = "Max" }: Props) {
  const [reelCount, setReelCount] = useState(43);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hour = time.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col min-h-svh" style={{ background: "#000" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <span
            className="text-2xl font-extrabold"
            style={{
              color: "#E8A44B",
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              letterSpacing: 1,
            }}
          >
            BRAINPAL
          </span>
        </div>

        {/* Profile avatar icon */}
        <button
          onClick={onProfile}
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            border: "2px solid #333",
            background: "#1c1c1e",
          }}
        >
          {userPhoto ? (
            <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold" style={{ color: "#E8A44B" }}>
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </div>

      {/* Greeting */}
      <div className="px-5 mb-6">
        <p style={{ color: "#888", fontSize: 14 }}>{greeting},</p>
        <h2 className="text-2xl font-bold text-white">{userName} 👋</h2>
      </div>

      {/* Reel count card */}
      <div className="px-5 mb-5">
        <div
          className="rounded-3xl p-6"
          style={{ background: "linear-gradient(135deg, #2A1200 0%, #1A0A00 100%)", border: "1px solid #3A2000" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p style={{ color: "#888", fontSize: 13, fontWeight: 500 }}>Today's Reels</p>
            <span className="text-lg">🧠</span>
          </div>
          <p
            className="text-7xl font-black"
            style={{ color: "#E8A44B", fontFamily: "'Arial Black', sans-serif", lineHeight: 1 }}
          >
            {reelCount}
          </p>
          <p className="text-sm mt-2" style={{ color: "#666" }}>reels watched today</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: "#555" }}>
              <span>0</span>
              <span>Daily limit: 50</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: "#2a2a2a" }}>
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${Math.min((reelCount / 50) * 100, 100)}%`,
                  background: "linear-gradient(90deg, #E8A44B, #F5C97A)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl p-4" style={{ background: "#111" }}>
          <p className="text-xs mb-1" style={{ color: "#666" }}>This week</p>
          <p className="text-2xl font-bold text-white">284</p>
          <p className="text-xs" style={{ color: "#555" }}>total reels</p>
        </div>
        <div className="rounded-2xl p-4" style={{ background: "#111" }}>
          <p className="text-xs mb-1" style={{ color: "#666" }}>Best day</p>
          <p className="text-2xl font-bold" style={{ color: "#4ADE80" }}>12</p>
          <p className="text-xs" style={{ color: "#555" }}>reels (Mon)</p>
        </div>
      </div>

      {/* Brain mascot */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <img
          src={brainMascot}
          alt="Brain mascot"
          className="w-32 h-32 object-contain mb-3"
        />
        <p className="text-center text-sm" style={{ color: "#555" }}>
          {reelCount < 20
            ? "Great job! Your brain is fresh today 🌟"
            : reelCount < 50
            ? "You're doing okay. Keep it up!"
            : "Time for a break. Your brain needs rest 😴"}
        </p>
      </div>

      {/* Bottom home indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-28 h-1 rounded-full bg-white opacity-20" />
      </div>
    </div>
  );
}
