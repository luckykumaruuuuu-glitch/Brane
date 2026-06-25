import brainImg from "@assets/Screenshot_20260625-164407_1782391179319.png";

interface Props {
  onNext: () => void;
}

export default function ScrollingScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-20" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-8"
        style={{ fontWeight: 800 }}
      >
        Then you start
        <br />
        scrolling.
      </h1>

      <div className="flex justify-center mb-8">
        <div
          className="px-8 py-3 rounded-full"
          style={{ background: "#4A2C0A" }}
        >
          <span className="text-white font-semibold text-base">9 reels</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={brainImg}
          alt="Scrolling brain"
          className="w-72 h-72 object-contain"
        />
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
