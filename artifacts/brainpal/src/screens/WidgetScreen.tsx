import brainImg from "@assets/Screenshot_20260625-164504_1782391225216.png";

interface Props {
  onNext: () => void;
}

export default function WidgetScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-16" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-10"
        style={{ fontWeight: 800 }}
      >
        See your reel count
        instantly from your home
        screen.
      </h1>

      {/* Phone mockup with grid */}
      <div className="flex justify-center mb-8">
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-5"
          style={{
            width: 260,
            height: 380,
            border: "6px solid #222",
            background: "#0d0d0d",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full"
            style={{ background: "#222" }}
          />

          {/* Icon grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {/* Brain widget - featured */}
            <div
              className="col-span-1 row-span-1 flex flex-col items-center justify-between p-3 rounded-2xl"
              style={{
                background: "#3D2000",
                aspectRatio: "1",
              }}
            >
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl leading-none">56</p>
                <p className="text-xs" style={{ color: "#C99050" }}>Reels today</p>
              </div>
            </div>

            {/* Empty slots */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl"
                style={{
                  background: "#1c1c1e",
                  aspectRatio: "1",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="pb-10">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full text-base font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
          }}
        >
          Add Widget
        </button>
        <button
          onClick={onNext}
          className="w-full py-2 text-base font-bold text-white text-center"
        >
          Not Now
        </button>
        <div className="flex justify-center mt-4">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
