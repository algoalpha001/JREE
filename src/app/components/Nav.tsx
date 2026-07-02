import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, ThemeToggle } from "./ThemeToggle";
import JreeLogo from "../../imports/JreeLogo1/index";

const LOGO_CANVAS_W = 1000;
const LOGO_CANVAS_H = 400;

function NavLogo({ height = 40 }: { height?: number }) {
  const scale = height / LOGO_CANVAS_H;
  const w = Math.round(LOGO_CANVAS_W * scale);
  return (
    <div style={{ width: w, height, overflow: "hidden", flexShrink: 0, position: "relative" }}>
      <div style={{ width: LOGO_CANVAS_W, height: LOGO_CANVAS_H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
        <JreeLogo />
      </div>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSignup = () => { window.location.hash = "signup"; };
  const goSignin = () => { window.location.hash = "login"; };

  const navLinks: { label: string; id: string }[] = [
    { label: "How It Works", id: "how-it-works" },
    { label: "For Students", id: "scoring" },
    { label: "For Colleges", id: "for-colleges" },
    { label: "For Employers", id: "for-employers" },
    { label: "About Us", id: "about-us" },
  ];
  const scrollTo = (id: string) => {
    if (id === "__top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (id === "about-us") { window.location.hash = "about-us"; return; }
    if (id === "for-employers") { window.location.hash = "for-employers"; return; }
    if (id === "for-colleges") { window.location.hash = "for-colleges"; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[100]"
            style={{
              background: scrolled ? (theme === "light" ? "rgba(250,247,240,0.78)" : "rgba(11,9,15,0.75)") : "transparent",
              backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
              borderBottom: scrolled ? "1px solid rgba(109,86,164,0.12)" : "1px solid transparent",
              transition: "background 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease",
            }}
          >
            <div className="max-w-[1160px] mx-auto px-5 md:px-[72px] h-[54px] md:h-[60px] flex items-center justify-between">
              <NavLogo height={40} />

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="rounded-full transition-colors hover:text-[var(--text-1)]"
                    style={{
                      padding: "8px 14px",
                      background: "transparent",
                      color: "var(--text-2)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle theme={theme} onToggle={toggle} />
                <button
                  onClick={goSignin}
                  className="rounded-full transition-all active:scale-[0.97]"
                  style={{
                    height: 36,
                    padding: "0 16px",
                    background: "transparent",
                    border: "1px solid var(--violet-border)",
                    color: "var(--text-1)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  Login
                </button>
                <button
                  onClick={goSignup}
                  className="inline-flex items-center rounded-full transition-all hover:shadow-[0_4px_20px_rgba(109,86,164,0.35)] active:scale-[0.97]"
                  style={{
                    height: 36,
                    padding: "0 18px",
                    background: "var(--violet)",
                    color: "var(--on-violet)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: 13,
                    transition: "all 180ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  Register Free →
                </button>
              </div>

              <div className="md:hidden flex items-center gap-3">
                <ThemeToggle theme={theme} onToggle={toggle} />
                <button
                  onClick={goSignup}
                  className="inline-flex items-center rounded-full active:scale-[0.97]"
                  style={{
                    height: 34,
                    padding: "0 14px",
                    background: "var(--violet)",
                    color: "var(--on-violet)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  Register Free →
                </button>
                <button className="flex flex-col gap-1.5" onClick={() => setOpen(true)}>
                  <span className="block w-5 h-px bg-[var(--text-1)]" />
                  <span className="block w-5 h-px bg-[var(--text-1)]" />
                </button>
              </div>
            </div>
          </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] md:hidden flex flex-col items-center justify-center"
            style={{ background: "var(--bg)" }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-[var(--text-2)]" style={{ fontFamily: "var(--font-mono)", fontSize: 24 }}>×</button>
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <NavLogo height={38} />
            </div>
            <div className="flex flex-col items-center gap-4">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setOpen(false); scrollTo(l.id); }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    color: "var(--text-2)",
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setOpen(false); goSignup(); }}
              className="mt-8 rounded-full px-10"
              style={{
                height: 56,
                background: "var(--lime)",
                color: "var(--on-lime)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Register Free →
            </button>
            <button
              onClick={() => { setOpen(false); goSignin(); }}
              className="mt-4 rounded-full px-8"
              style={{
                height: 48,
                background: "transparent",
                border: "1px solid var(--violet-border)",
                color: "var(--text-1)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
