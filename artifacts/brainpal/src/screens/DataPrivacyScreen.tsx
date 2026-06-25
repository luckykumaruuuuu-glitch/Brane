interface Props {
  onNext: () => void;
}

export default function DataPrivacyScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-16" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-10"
        style={{ fontWeight: 800 }}
      >
        We only count reels.
        <br /><br />
        Your personal data stays
        <br />
        on your phone.
      </h1>

      {/* Phone mockup with brain */}
      <div className="flex justify-center mb-8 flex-1 items-center">
        <div
          className="relative flex items-center justify-center rounded-[3rem]"
          style={{
            width: 240,
            height: 380,
            border: "6px solid #222",
            background: "#0d0d0d",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full"
            style={{ background: "#222" }}
          />
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-[3rem]"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(200,100,100,0.2) 0%, transparent 70%)",
            }}
          />
          {/* Brain with lock */}
          <div className="flex flex-col items-center gap-2">
            <span style={{ fontSize: 90 }}>🧠</span>
            <span style={{ fontSize: 40 }}>🔒</span>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-base font-bold"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          Continue
        </button>
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
