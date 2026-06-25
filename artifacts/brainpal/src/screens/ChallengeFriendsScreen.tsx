import brainImg from "@assets/Screenshot_20260625-164631_1782391253275.png";

interface Props {
  onNext: () => void;
}

export default function ChallengeFriendsScreen({ onNext }: Props) {
  return (
    <div
      className="flex flex-col min-h-svh px-6 pt-16"
      style={{
        background: "radial-gradient(ellipse at center top, #7B3F00 0%, #3D1C00 40%, #0a0500 100%)",
      }}
    >
      {/* Subtitle */}
      <p className="text-center text-sm mb-2" style={{ color: "#C99050" }}>
        Flex your scroll count
      </p>

      {/* Title */}
      <h1
        className="text-5xl font-black text-white text-center leading-tight mb-10"
        style={{ fontFamily: "'Arial Black', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}
      >
        CHALLENGE
        <br />
        FRIENDS
      </h1>

      {/* VS section */}
      <div className="flex items-end justify-center gap-6 flex-1">
        {/* You */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="w-28 h-32 rounded-2xl flex items-end justify-center pb-2 overflow-hidden"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              {/* Anime character placeholder */}
              <div className="w-full h-full relative">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: 60 }}
                >
                  🧑‍🦱
                </div>
                {/* Small brain on shoulder */}
                <div className="absolute top-2 right-2 text-lg">🧠</div>
              </div>
            </div>
          </div>
          <div
            className="px-5 py-1.5 rounded-full text-sm font-bold"
            style={{ background: "#F5C97A", color: "#3d2000" }}
          >
            36
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">YOU</span>
        </div>

        {/* Lightning bolt */}
        <div className="mb-16">
          <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
            <polygon points="28,0 12,44 22,44 12,80 36,30 24,30" fill="#F5C97A" />
          </svg>
        </div>

        {/* Friend */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="w-28 h-32 rounded-2xl flex items-end justify-center pb-2 overflow-hidden"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <div className="w-full h-full relative">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: 60 }}
                >
                  👩‍🦱
                </div>
                <div className="absolute top-2 right-2 text-lg">🧠</div>
              </div>
            </div>
          </div>
          <div
            className="px-5 py-1.5 rounded-full text-sm font-bold"
            style={{ background: "#F5C97A", color: "#3d2000" }}
          >
            93
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">FRIEND</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="pb-10 mt-10">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 mb-4"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          <span>✕</span> Challenge Your Friend
        </button>
        <button
          onClick={onNext}
          className="w-full py-2 text-base font-bold text-white text-center"
        >
          I'll Do It Later
        </button>
        <div className="flex justify-center mt-4">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
