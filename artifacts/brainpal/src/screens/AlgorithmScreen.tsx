import brainImg from "@assets/Screenshot_20260625-164446_1782391179472.png";

interface Props {
  onNext: () => void;
}

export default function AlgorithmScreen({ onNext }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-20" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-10"
        style={{ fontWeight: 800 }}
      >
        You decide when to
        <br />
        stop.
        <br />
        Not the algorithm.
      </h1>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={brainImg}
          alt="Cool brain"
          className="w-80 h-80 object-contain"
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
