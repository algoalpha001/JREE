import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import JreeLogo from "../../imports/JreeLogo1/index";

const LOGO_CANVAS_W = 1000;
const LOGO_CANVAS_H = 400;

function NavLogo({ height = 40 }: { height?: number }) {
  const scale = height / LOGO_CANVAS_H;
  return <div style={{ width: Math.round(LOGO_CANVAS_W * scale), height, overflow: "hidden", flexShrink: 0, position: "relative" }}><div style={{ width: LOGO_CANVAS_W, height: LOGO_CANVAS_H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}><JreeLogo /></div></div>;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  const go = (route: string) => { setOpen(false); window.location.hash = route; };
  const links = [["How it works", "how-it-works"], ["Students", "scoring"], ["Colleges", "for-colleges"], ["Employers", "for-employers"], ["About", "about-us"]] as const;
  const navigate = (id: string) => { if (id === "about-us" || id === "for-colleges" || id === "for-employers") return go(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <>
    <motion.nav initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .35 }} className="fixed inset-x-0 top-0 z-[100]" style={{ background: scrolled ? "rgba(250,247,240,.94)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--hairline-strong)" : "1px solid transparent" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-[72px] h-[60px] flex items-center justify-between">
        <button onClick={() => go("")} aria-label="Choose a portal"><NavLogo /></button>
        <div className="hidden md:flex items-center gap-1">{links.map(([label,id]) => <button key={id} onClick={() => navigate(id)} className="rounded-full px-3 py-2 transition-colors hover:text-[var(--violet)]" style={{ color: "var(--text-2)", fontSize: 13 }}>{label}</button>)}</div>
        <div className="hidden md:flex items-center gap-2"><button onClick={() => go("login")} className="rounded-full px-4 py-2" style={{ border: "1px solid var(--violet-border)", color: "var(--violet)", fontSize: 13 }}>Login</button><button onClick={() => go("signup")} className="rounded-full px-4 py-2" style={{ background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>Register free</button></div>
        <button className="md:hidden rounded-full px-3 py-2" onClick={() => setOpen(!open)} style={{ border: "1px solid var(--violet-border)", color: "var(--violet)", fontSize: 11 }}>{open ? "Close" : "Menu"}</button>
      </div>
    </motion.nav>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="fixed top-[60px] inset-x-0 z-[99] p-5 md:hidden" style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-elevated)" }}><div className="max-w-[560px] mx-auto flex flex-col">{links.map(([label,id]) => <button key={id} onClick={() => navigate(id)} className="text-left p-3" style={{ color: "var(--text-1)" }}>{label}</button>)}<button onClick={() => go("signup")} className="mt-4 rounded-full p-3" style={{ background: "var(--violet)", color: "var(--on-violet)" }}>Register free</button></div></motion.div>}</AnimatePresence>
  </>;
}
