import reelsMockup from "@assets/Screenshot_20260625-164238_1782391179054.png";

interface Props {
  onNext: () => void;
}

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <span
          className="text-2xl font-extrabold"
          style={{
            color: "#E8A44B",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            letterSpacing: 1,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          BRAINPAL
        </span>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl"
          style={{ background: "#1c1c1e", color: "#fff", fontSize: 15 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5h18M3 12h18M3 19h18" opacity="0.5" />
            <path d="M9 5l-4 4 4 4" />
          </svg>
          English
        </button>
      </div>

      {/* Phone mockup */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4">
        <div
          className="relative w-full rounded-[3rem] overflow-hidden shadow-2xl"
          style={{
            maxWidth: 280,
            aspectRatio: "9/18",
            border: "8px solid #2a2a2a",
            background: "#111",
          }}
        >
          <img
            src={reelsMockup}
            alt="Reels mockup"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          />
          {/* Brain counter overlay */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: "#7B4A1C" }}
          >
            <span className="text-2xl">🧠</span>
            <span className="text-3xl font-bold text-white">43</span>
          </div>
          {/* Right side icons */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-white text-xs mt-0.5">1.7k</span>
            </div>
            <div className="flex flex-col items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-white text-xs mt-0.5">41</span>
            </div>
            <div className="flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
          {/* Bottom user info */}
          <div className="absolute bottom-10 left-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-400 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500" />
              </div>
              <span className="text-white text-sm font-semibold">naru_kumar20</span>
            </div>
            <p className="text-gray-300 text-xs max-w-[160px]">Does a delight have so... <span className="text-gray-400">more</span></p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          See your reels count
        </h1>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Instagram */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1c1c1e" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="#888" stroke="none" />
            </svg>
          </div>
          {/* TikTok/YouTube Shorts */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1c1c1e" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#888">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.84a8.2 8.2 0 004.79 1.52V6.91a4.85 4.85 0 01-1.02-.22z" />
            </svg>
          </div>
          {/* Snapchat */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1c1c1e" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#888">
              <path d="M12.17 2C9.09 2 7 4.16 7 7.29V8.5H5.5a.5.5 0 000 1H7v.5c0 .43-.22.84-.6 1.08l-1.8 1.12c-.42.26-.52.82-.22 1.2l.12.16c.22.28.58.38.9.24l1.6-.73v.3c0 2.05 1.35 3.84 3.33 4.37l.17.05-.23.7c-.08.25-.3.42-.56.44-.43.03-1.08-.15-1.71-.32l-.35-.09c-.16-.04-.3-.06-.43-.06a.85.85 0 00-.83.86c0 .37.24.72.6.82.6.17 1.33.38 2.02.43.44.04.79.33.79.72v.12c0 .44.36.8.8.8s.8-.36.8-.8v-.12c0-.39.35-.68.79-.72.69-.05 1.42-.26 2.02-.43.36-.1.6-.45.6-.82a.85.85 0 00-.83-.86c-.13 0-.27.02-.43.06l-.35.09c-.63.17-1.28.35-1.71.32-.26-.02-.48-.19-.56-.44l-.23-.7.17-.05C16.65 14.73 18 12.94 18 10.89v-.3l1.6.73c.32.14.68.04.9-.24l.12-.16c.3-.38.2-.94-.22-1.2l-1.8-1.12A1.25 1.25 0 0118 8.5V9.5h1.5a.5.5 0 000-1H18V7.29C18 4.16 15.25 2 12.17 2z" />
            </svg>
          </div>
          {/* Facebook */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1c1c1e" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#888">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-lg font-bold"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          Get Started
        </button>

        {/* Home indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
