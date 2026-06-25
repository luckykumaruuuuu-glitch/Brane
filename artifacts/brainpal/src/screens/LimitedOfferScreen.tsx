import brainImg from "@assets/Screenshot_20260625-164644_1782391253378.png";

interface Props {
  onNext: () => void;
}

export default function LimitedOfferScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-20" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-10"
        style={{ fontWeight: 800 }}
      >
        You unlocked limited
        <br />
        time offer!
      </h1>

      {/* Offer card with brain on top */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Brain on top of card */}
          <div className="flex justify-center mb-[-30px] relative z-10">
            <img
              src={brainImg}
              alt="Brain with heart"
              className="w-24 h-24 object-contain"
            />
          </div>
          {/* Card */}
          <div
            className="rounded-3xl px-10 pt-10 pb-8 text-center"
            style={{ background: "#1A3A1A", minWidth: 260 }}
          >
            <p
              className="text-6xl font-black mb-2"
              style={{ color: "#4ADE80", fontFamily: "'Arial Black', sans-serif" }}
            >
              70% OFF
            </p>
            <p className="text-sm" style={{ color: "#86EFAC" }}>
              on yearly plan
            </p>
          </div>
        </div>
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
          Continue
        </button>
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
