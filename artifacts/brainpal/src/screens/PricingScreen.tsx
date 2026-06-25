import { useState, useEffect } from "react";

interface Props {
  onNext: () => void;
}

export default function PricingScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<"yearly" | "monthly">("yearly");
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60 - 19); // 2:59:41

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  return (
    <div
      className="flex flex-col min-h-svh"
      style={{
        background: "radial-gradient(ellipse at center top, #3D2000 0%, #1A0A00 50%, #050200 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={onNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button className="text-sm underline" style={{ color: "#888" }}>
          Need Help?
        </button>
      </div>

      {/* BRAINPAL PRO */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className="text-2xl font-extrabold"
          style={{ color: "#E8A44B", fontFamily: "'Arial Black', sans-serif" }}
        >
          BRAINPAL
        </span>
        <div
          className="px-3 py-1 rounded-full border text-sm font-bold"
          style={{ border: "1.5px solid #E8A44B", color: "#E8A44B" }}
        >
          PRO
        </div>
      </div>

      {/* Discount ticket */}
      <div className="flex justify-center mb-2">
        <div
          className="rounded-2xl px-10 py-5 text-center relative"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #D4872A 100%)",
            minWidth: 280,
          }}
        >
          {/* Ticket holes */}
          <div
            className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{ background: "#1A0A00" }}
          />
          <div
            className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{ background: "#1A0A00" }}
          />
          {/* Laurel decorations */}
          <div className="flex items-center justify-center gap-2">
            <span className="opacity-30 text-2xl">🌿</span>
            <div>
              <p
                className="text-7xl font-black leading-none"
                style={{ color: "#7B3F00", fontFamily: "'Arial Black', sans-serif" }}
              >
                70%
              </p>
              <p className="text-xl font-bold" style={{ color: "#8B4A00" }}>
                Discount
              </p>
            </div>
            <span className="opacity-30 text-2xl">🌿</span>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-5">
        <div
          className="px-5 py-2 rounded-full text-sm font-bold"
          style={{ background: "#5A1A1A", color: "#FF6B6B" }}
        >
          Ends in {h} : {m} : {s}
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Block doom scrolling.
          <br />
          Get back to what matters.
        </h2>

        {/* Testimonial */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-4 overflow-x-hidden"
          style={{ background: "#1a1a1a" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
            style={{ background: "#7B5EA7" }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-white text-sm font-semibold">Aryan Muk...</span>
          </div>
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>
        </div>

        {/* Plan selection */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => setSelected("yearly")}
            className="relative p-4 rounded-2xl text-left"
            style={{
              border: selected === "yearly" ? "2px solid #E8A44B" : "2px solid #333",
              background: selected === "yearly" ? "rgba(232,164,75,0.1)" : "#111",
            }}
          >
            {/* 70% OFF badge */}
            <div
              className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "#E8A44B", color: "#3d2000" }}
            >
              70% OFF
            </div>
            <p className="text-xs mb-1 mt-2" style={{ color: "#aaa" }}>Yearly</p>
            <p className="text-xl font-bold text-white">₹25/month</p>
            <p className="text-xs mt-1" style={{ color: "#888" }}>
              <span className="line-through">₹999</span> → ₹299/year
            </p>
          </button>

          <button
            onClick={() => setSelected("monthly")}
            className="p-4 rounded-2xl text-left"
            style={{
              border: selected === "monthly" ? "2px solid #E8A44B" : "2px solid #333",
              background: selected === "monthly" ? "rgba(232,164,75,0.1)" : "#111",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "#aaa" }}>Monthly</p>
            <p className="text-xl font-bold text-white">₹99/month</p>
          </button>
        </div>

        {/* Pay / Continue */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "#5B3EAC" }}
            >
              <span style={{ color: "#E8A44B" }}>₹</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white flex items-center gap-0.5">
                Pay Using
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </p>
              <p className="text-xs font-bold text-white">PhonePe</p>
            </div>
          </div>
          <button
            onClick={onNext}
            className="flex-1 py-4 rounded-full text-base font-bold"
            style={{
              background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
              color: "#3d2000",
            }}
          >
            Continue
          </button>
        </div>

        <p className="text-center text-xs mt-3 mb-6" style={{ color: "#666" }}>
          Billed Annually · Cancel Anytime
        </p>

        <div className="flex justify-center">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
