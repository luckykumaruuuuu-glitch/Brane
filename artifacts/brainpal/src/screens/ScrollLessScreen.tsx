interface Props {
  onNext: () => void;
}

const benefits = [
  { emoji: "😴", label: "Sleep calmly" },
  { emoji: "📚", label: "Focus better" },
  { emoji: "🧘", label: "Improved mental health" },
];

export default function ScrollLessScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-16" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-2"
        style={{ fontWeight: 800 }}
      >
        Within a week,
        <br />
        you'll scroll less.
      </h1>
      <p className="text-center mb-8" style={{ color: "#888", fontSize: 16 }}>
        And your mind will feel clearer.
      </p>

      {/* Benefits list */}
      <div className="flex flex-col gap-3 mb-8">
        {benefits.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{ background: "#1a1a1a" }}
          >
            <div
              className="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "#2a1a1a" }}
            >
              {item.emoji}
            </div>
            <span className="text-white font-semibold text-base">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <div className="pb-10">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-base font-bold"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          Let's Do This!
        </button>
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
