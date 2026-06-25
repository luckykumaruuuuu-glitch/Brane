import { useState, useEffect } from "react";
import brainDazed from "../assets/brain-dazed-nobg.png";

interface Props {
  onBack: () => void;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
}

function useCountdown(initial: number) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function MenuItem({
  icon,
  label,
  subtitle,
  value,
  onClick,
  divider,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  value?: string;
  onClick?: () => void;
  divider?: boolean;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 px-4 py-4 text-left"
        style={{ background: "transparent" }}
      >
        <div className="w-6 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white" style={{ fontSize: 15 }}>{label}</p>
          {subtitle && (
            <p style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{subtitle}</p>
          )}
        </div>
        {value && (
          <span style={{ fontSize: 14, color: "#666", marginRight: 6 }}>{value}</span>
        )}
        {/* Chevron */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {divider && (
        <div style={{ height: 1, background: "#1a1a1a", marginLeft: 54 }} />
      )}
    </>
  );
}

export default function ProfileScreen({
  onBack,
  onLogout,
  userName = "Max",
  userEmail = "max785mmaaxx@gmail.com",
  userPhoto,
}: Props) {
  const timer = useCountdown(9105); // ~2:31:45

  return (
    <div
      className="flex flex-col min-h-svh overflow-y-auto"
      style={{ background: "#000" }}
    >
      <div className="px-5 pt-14 pb-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center mb-6"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#161616",
            border: "1px solid #252525",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Avatar + Name + Email */}
        <div className="flex flex-col items-center mb-6 gap-2">
          <div
            className="rounded-full overflow-hidden flex items-center justify-center"
            style={{
              width: 84,
              height: 84,
              border: "2.5px solid #2A2A2A",
              background: "#1a1a1a",
              marginBottom: 4,
            }}
          >
            {userPhoto ? (
              <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7B4A1C, #3d1800)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#E8A44B",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <p className="text-xl font-bold text-white" style={{ fontWeight: 700 }}>
            {userName}
          </p>
          <p style={{ fontSize: 13, color: "#666" }}>{userEmail}</p>
        </div>

        {/* PRO Banner */}
        <button
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl mb-5"
          style={{
            background: "#1C0E00",
            border: "1px solid #3A2000",
          }}
        >
          {/* PRO badge */}
          <div
            className="flex items-center justify-center px-2 py-1 rounded-lg flex-shrink-0"
            style={{ background: "#E8B030" }}
          >
            <span className="font-bold" style={{ fontSize: 11, color: "#4A2800" }}>PRO</span>
          </div>
          <span className="flex-1 text-left font-semibold text-white" style={{ fontSize: 15 }}>
            Claim 70% Off
          </span>
          <span className="font-semibold" style={{ fontSize: 14, color: "#E8B030", letterSpacing: 0.5 }}>
            {timer}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Widgets card */}
        <div
          className="flex items-center gap-3 px-4 py-4 rounded-2xl mb-3"
          style={{ background: "#111", border: "1px solid #1a1a1a" }}
        >
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
            <img src={brainDazed} alt="Brain dazed" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white" style={{ fontSize: 15 }}>Widgets</p>
            <p style={{ fontSize: 12, color: "#666", marginTop: 2 }}>See brain state in homepage</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* Friends */}
        <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            label="Friends"
          />
        </div>

        {/* Send Feedback */}
        <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            label="Send Feedback"
          />
        </div>

        {/* Language + Rate us */}
        <div className="rounded-2xl mb-3 overflow-hidden" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            label="Language"
            divider
          />
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
            label="Rate us on playstore"
          />
        </div>

        {/* Legal + Counter size + Logout */}
        <div className="rounded-2xl mb-5 overflow-hidden" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
            label="Legal"
            divider
          />
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="11" r="1" fill="#888" />
                <circle cx="12" cy="11" r="1" fill="#888" />
                <circle cx="15" cy="11" r="1" fill="#888" />
              </svg>
            }
            label="Counter size"
            value="Small"
            divider
          />
          <MenuItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            }
            label="Logout"
            onClick={onLogout ?? onBack}
          />
        </div>

        {/* Version */}
        <p className="text-center" style={{ fontSize: 13, color: "#444", marginBottom: 30 }}>
          Version 7.1.340
        </p>
      </div>
    </div>
  );
}
