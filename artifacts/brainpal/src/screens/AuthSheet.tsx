import { useState } from "react";
import { signInWithGoogle } from "../lib/authService";

interface Props {
  onNext: (user: { displayName: string; email: string; photoURL: string; uid: string }) => void;
}

export default function AuthSheet({ onNext }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setError(null);
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      onNext(user);
    } catch (err: any) {
      const msg: string = err?.message ?? "Sign-in failed";
      if (msg.includes("api-key") || msg.includes("invalid-api-key") || msg.includes("Firebase")) {
        setError("Firebase not configured yet. Add credentials to enable real sign-in.");
      } else if (msg.includes("popup-closed") || msg.includes("cancelled")) {
        setError("Sign-in cancelled. Try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-svh relative"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      {/* Blurred background */}
      <div className="flex-1 opacity-30 px-5 pt-14 pointer-events-none">
        <span
          className="text-2xl font-extrabold"
          style={{ color: "#E8A44B", fontFamily: "'Arial Black', sans-serif" }}
        >
          BRAINPAL
        </span>
        <div className="mt-8 flex justify-center">
          <div
            className="rounded-[3rem] overflow-hidden"
            style={{ width: 220, height: 400, border: "6px solid #2a2a2a", background: "#222" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "#7B4A1C" }}>
                <span className="text-xl">🧠</span>
                <span className="text-2xl font-bold text-white">41</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl px-6 pt-3 pb-10"
        style={{ background: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full" style={{ background: "#333" }} />
        </div>

        {/* Need help */}
        <div className="flex justify-end mb-4">
          <button className="text-sm underline" style={{ color: "#888" }}>Need help?</button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome to BrainPal</h2>
        <p className="text-center text-sm mb-6" style={{ color: "#666" }}>
          Sign in to track your reels and protect your focus
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm text-center" style={{ background: "#2a1010", color: "#ff6b6b", border: "1px solid #3a1515" }}>
            {error}
          </div>
        )}

        {/* Google Sign-in button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-4 rounded-full flex items-center justify-center gap-3 text-base font-semibold mb-4 transition-opacity"
          style={{
            background: loading ? "#888" : "linear-gradient(135deg, #F5C97A 0%, #E8A44B 100%)",
            color: "#3d2000",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <>
              <div
                className="w-5 h-5 rounded-full border-2 animate-spin"
                style={{ borderColor: "#3d2000 transparent transparent" }}
              />
              Signing in…
            </>
          ) : (
            <>
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue With Google
            </>
          )}
        </button>

        {/* Privacy policy */}
        <p className="text-center text-xs" style={{ color: "#666" }}>
          By continuing, you have read and agree to our{" "}
          <span className="underline" style={{ color: "#999" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
