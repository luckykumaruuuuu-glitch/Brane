interface Props {
  step: number;
  onAllow: () => void;
}

const permissions = [
  {
    title: "Display over other apps",
    subtitle: "To show reels count",
  },
  {
    title: "Background",
    subtitle: "To keep app running",
  },
  {
    title: "Accessibility",
    subtitle: "To count reels",
  },
];

export default function PermissionsScreen({ step, onAllow }: Props) {
  return (
    <div className="flex flex-col min-h-svh px-6 pt-16" style={{ background: "#000" }}>
      <h1
        className="text-4xl font-bold text-white text-center leading-tight mb-12"
        style={{ fontWeight: 800 }}
      >
        Enable permissions to
        start counting reels
      </h1>

      {/* Permissions list */}
      <div className="flex flex-col gap-8">
        {permissions.map((perm, i) => {
          const isActive = i === step;
          const isDone = i < step;

          return (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p
                  className="font-bold text-base"
                  style={{ color: isActive || isDone ? "#fff" : "#555" }}
                >
                  {perm.title}
                </p>
                {(isActive || isDone) && (
                  <p className="text-sm mt-0.5" style={{ color: "#888" }}>
                    {perm.subtitle}
                  </p>
                )}
              </div>
              <div>
                {isDone ? (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "#2a2a2a" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <button
                    onClick={onAllow}
                    className="px-6 py-2.5 rounded-full font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
                      color: "#3d2000",
                    }}
                  >
                    Allow
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Bottom help button */}
      <div className="pb-10">
        <button
          className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl"
          style={{ background: "#1a1a1a" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "#E8A44B" }}
          >
            ✓
          </div>
          <span className="text-white font-medium text-sm flex-1 text-left">
            Why should I give this permission?
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="flex justify-center mt-6">
          <div className="w-28 h-1 rounded-full bg-white opacity-30" />
        </div>
      </div>
    </div>
  );
}
