interface Props {
  onNext: () => void;
}

export default function InstagramScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-20" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-10"
        style={{ fontWeight: 800 }}
      >
        Open{" "}
        <span style={{ color: "#E8A44B" }}>Instagram</span>
        {" "}to see
        <br />
        BrainPal in action
      </h1>

      {/* Phone mockup with brain + Instagram */}
      <div className="flex justify-center flex-1 items-center">
        <div
          className="relative flex flex-col items-center justify-center rounded-3xl px-10 py-8"
          style={{
            background: "#1a1a1a",
            minWidth: 240,
            minHeight: 220,
          }}
        >
          {/* Brain peeking from top */}
          <div className="absolute -top-10 flex justify-center w-full">
            <span className="text-5xl">🧠</span>
          </div>

          {/* Instagram icon */}
          <div className="mt-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10 mt-8">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-base font-bold"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          Open Instagram
        </button>
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
