import { useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

// ─── No-flash init: runs synchronously at module load (before React renders) ───
// Reads saved preference, falls back to prefers-color-scheme, then dark.
if (typeof document !== "undefined") {
  try {
    const stored = window.localStorage.getItem("jree-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
    } else {
      const prefersDark =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    }
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.dataset.theme as Theme) ?? "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  // useLayoutEffect — sync the DOM attribute *before* the browser paints
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
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
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative inline-flex items-center rounded-full transition-all active:scale-[0.95]"
      style={{
        width: 48,
        height: 26,
        padding: 2,
        background: isLight ? "rgba(109,86,164,0.10)" : "rgba(109,86,164,0.20)",
        border: "1px solid var(--violet-border)",
        flexShrink: 0,
      }}
    >
      <span
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 20,
          height: 20,
          top: 2,
          left: isLight ? 24 : 2,
          background: isLight ? "var(--lime)" : "var(--violet)",
          boxShadow: isLight
            ? "0 0 10px rgba(201,220,83,0.45), 0 1px 2px rgba(26,21,37,0.10)"
            : "0 0 10px rgba(109,86,164,0.50), 0 1px 2px rgba(0,0,0,0.40)",
          transition: "left 220ms cubic-bezier(0.16,1,0.3,1), background 180ms ease",
        }}
      >
        {isLight ? (
          // Sun — shown when light mode is ON
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
            stroke="var(--on-lime)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={12} r={4} />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          // Moon — shown when dark mode is ON
          <svg width={11} height={11} viewBox="0 0 24 24" fill="var(--on-violet)">
            <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
