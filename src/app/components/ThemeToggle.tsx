import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem("jree-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
    try {
      window.localStorage.setItem("jree-theme", theme);
    } catch {}
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isLight = theme === "light";
  return (
    <button
      onClick={onToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative inline-flex items-center rounded-full transition-all active:scale-[0.95]"
      style={{
        width: 56,
        height: 30,
        padding: 3,
        background: isLight ? "rgba(109,86,164,0.10)" : "rgba(109,86,164,0.18)",
        border: "1px solid var(--violet-border)",
      }}
    >
      <span
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 22,
          height: 22,
          top: 3,
          left: isLight ? 28 : 3,
          background: isLight ? "var(--lime)" : "var(--violet)",
          boxShadow: isLight
            ? "0 0 12px rgba(201,220,83,0.5), 0 1px 2px rgba(0,0,0,0.15)"
            : "0 0 12px rgba(109,86,164,0.5), 0 1px 2px rgba(0,0,0,0.4)",
          transition: "left 240ms cubic-bezier(0.16,1,0.3,1), background 200ms ease",
        }}
      >
        {isLight ? (
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A1525"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={4} />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width={12} height={12} viewBox="0 0 24 24" fill="#F0EBFF">
            <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
