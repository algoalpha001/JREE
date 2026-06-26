import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check, Camera, Mic, Wifi, Monitor, Clock, Save, Settings,
  ChevronRight, ChevronLeft, Flag, Bookmark, Volume2, Pause,
  ArrowRight, X, AlertCircle, Sparkles,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────── shared atoms ───────────────────────── */

function Grain() {
  return <span className="grain absolute inset-0 pointer-events-none" aria-hidden />;
}

function Eyebrow({ children, color = "var(--text-3)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono-sm)",
      letterSpacing: "var(--ls-mono)", color, textTransform: "uppercase",
    }}>{children}</div>
  );
}

function Mono({ children, color = "var(--text-1)", size = "var(--fs-mono-sm)" }: { children: React.ReactNode; color?: string; size?: string }) {
  return <span style={{ fontFamily: "var(--font-mono)", fontSize: size, color, letterSpacing: "var(--ls-mono-tight)" }}>{children}</span>;
}

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--hairline)",
        borderRadius: 16,
        ...style,
      }}
    >
      <Grain />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ───────────────────────── routing ───────────────────────── */

export type PostRoute =
  | "dashboard" | "exam/check" | "exam/active" | "exam/transition"
  | "exam/priya" | "exam/processing" | "results";

function go(route: PostRoute) { window.location.hash = `#${route}`; }

export function PostSignup({ route }: { route: PostRoute }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease }}
      >
        {route === "dashboard" && <Dashboard />}
        {route === "exam/check" && <SystemCheck />}
        {route === "exam/active" && <ExamActive />}
        {route === "exam/transition" && <LayerTransition />}
        {route === "exam/priya" && <PriyaInterview />}
        {route === "exam/processing" && <Processing />}
        {route === "results" && <Results />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ───────────────────────── dashboard nav ───────────────────────── */

function DashboardNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{
      background: "rgba(11,9,15,0.75)", backdropFilter: "blur(24px) saturate(1.5)",
      WebkitBackdropFilter: "blur(24px) saturate(1.5)",
      borderBottom: "1px solid var(--hairline)",
    }}>
      <div className="max-w-[1160px] mx-auto px-6 md:px-[72px] h-[60px] flex items-center justify-between">
        <button onClick={() => go("dashboard")} className="flex items-end leading-none">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-1)", letterSpacing: "var(--ls-display)" }}>JREE</span>
          <span className="inline-block rounded-full ml-0.5 mb-1.5" style={{ width: 6, height: 6, background: "var(--lime)" }} />
        </button>
        <div className="flex items-center gap-3">
          <button className="rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(240,235,255,0.06)]" style={{ width: 36, height: 36, border: "1px solid var(--hairline)" }}>
            <Settings size={15} color="var(--text-2)" />
          </button>
          <button className="rounded-full flex items-center justify-center" style={{
            width: 36, height: 36, background: "var(--violet-soft)",
            border: "1px solid var(--violet-border)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-1)",
          }}>RS</button>
        </div>
      </div>
    </header>
  );
}

/* ───────────────────────── Screen A: Dashboard ───────────────────────── */

function Dashboard() {
  const days = 7, hours = 14;
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <DashboardNav />
      <main className="max-w-[1160px] mx-auto px-6 md:px-[72px] pt-[120px] pb-24">
        <Eyebrow color="var(--violet)">Welcome, Rahul</Eyebrow>
        <h1 className="mt-4" style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)",
          color: "var(--text-1)",
        }}>
          Your JREE is{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>ready.</span>
        </h1>
        <p className="mt-5 max-w-[540px]" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-2)" }}>
          Six layers. About 90 minutes. One score that companies will actually read.
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mt-12">
          {/* Primary CTA card */}
          <Card style={{ padding: 36, background: "linear-gradient(135deg, var(--surface-1) 0%, var(--surface-2) 100%)" }}>
            <div className="flex items-start justify-between mb-8">
              <Eyebrow color="var(--lime-text)">01 / Start here</Eyebrow>
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
                <Clock size={11} color="var(--violet)" />
                <Mono color="var(--violet)" size="var(--fs-mono-xs)">{days}d {hours}h LEFT</Mono>
              </div>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
              color: "var(--text-1)",
            }}>
              The Job Readiness Exam
            </h2>
            <p className="mt-3 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
              Once you start, the timer doesn't pause. Find a quiet 90 minutes.
            </p>

            <div className="space-y-3 mb-9">
              {[
                ["Aptitude", "12 min"],
                ["Communication", "15 min"],
                ["Domain", "20 min"],
                ["Practical", "18 min"],
                ["AI Interview with Priya", "15 min"],
                ["Reflection", "10 min"],
              ].map(([name, dur], i) => (
                <div key={name} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 5 ? "1px solid var(--hairline)" : "none" }}>
                  <div className="flex items-center gap-3">
                    <Mono color="var(--text-3)" size="var(--fs-mono-xs)">0{i + 1}</Mono>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-1)" }}>{name}</span>
                  </div>
                  <Mono color="var(--text-2)">{dur}</Mono>
                </div>
              ))}
            </div>

            <button
              onClick={() => go("exam/check")}
              className="w-full rounded-full transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                height: 56, background: "var(--lime)", color: "var(--on-lime)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
                boxShadow: "0 8px 32px rgba(201,220,83,0.22)",
              }}
            >
              Begin system check →
            </button>
            <p className="text-center mt-4" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-3)" }}>
              You'll get to test your camera, mic and connection first.
            </p>
          </Card>

          {/* Side: profile + tips */}
          <div className="space-y-5">
            <Card style={{ padding: 28 }}>
              <Eyebrow>Your profile</Eyebrow>
              <div className="mt-4 space-y-3">
                {[
                  ["Name", "Rahul S."],
                  ["College", "VIT Pune"],
                  ["Domain", "Computer Science"],
                  ["Graduating", "2026"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-1)" }}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-full" style={{
                height: 38, background: "transparent",
                border: "1px solid var(--hairline-strong)", color: "var(--text-1)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", fontWeight: 500,
              }}>Edit profile</button>
            </Card>

            <Card style={{ padding: 28 }}>
              <Eyebrow color="var(--lime-text)">Before you start</Eyebrow>
              <ul className="mt-5 space-y-3.5">
                {[
                  "Quiet room, no headphones",
                  "Plug in your laptop",
                  "Close other tabs and apps",
                  "Keep your ID handy",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="rounded-full flex items-center justify-center mt-0.5" style={{ width: 16, height: 16, background: "var(--lime-soft)", border: "1px solid var(--lime-border)" }}>
                      <Check size={9} color="var(--lime-text)" strokeWidth={3} />
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── Exam Shell (52px nav) ───────────────────────── */

const LAYERS = [
  { n: 1, name: "Aptitude" },
  { n: 2, name: "Communication" },
  { n: 3, name: "Domain" },
  { n: 4, name: "Practical" },
  { n: 5, name: "AI Interview" },
  { n: 6, name: "Reflection" },
];

function ExamShell({
  current, totalQ, currentQ, timer, autosave, children,
}: {
  current: number; totalQ?: number; currentQ?: number; timer: string; autosave: "saved" | "saving" | "idle";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-10" style={{
        height: 52, background: "rgba(11,9,15,0.85)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderBottom: "1px solid var(--hairline)",
      }}>
        <div className="flex-1 flex items-end leading-none">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-1)", letterSpacing: "var(--ls-display-sm)" }}>JREE</span>
          <span className="inline-block rounded-full ml-0.5 mb-1" style={{ width: 5, height: 5, background: "var(--lime)" }} />
        </div>

        {/* centered: segmented progress + timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 w-[420px] md:w-[520px]">
            {LAYERS.map((l) => {
              const isDone = l.n < current;
              const isCurrent = l.n === current;
              return (
                <div key={l.n} className="flex-1 flex items-center gap-2" title={l.name}>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "var(--surface-2)" }}>
                    <div style={{
                      height: "100%",
                      width: isDone ? "100%" : isCurrent ? "55%" : "0%",
                      background: isDone ? "var(--lime)" : isCurrent ? "var(--violet)" : "transparent",
                      transition: "width 360ms ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
            <Clock size={11} color="var(--violet)" />
            <Mono color="var(--text-1)">{timer}</Mono>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end gap-3">
          {typeof currentQ === "number" && typeof totalQ === "number" && (
            <Mono color="var(--text-2)">Q {currentQ}/{totalQ}</Mono>
          )}
          <div className="flex items-center gap-1.5" title={autosave}>
            <span className="rounded-full" style={{
              width: 6, height: 6,
              background: autosave === "saved" ? "var(--teal)" : autosave === "saving" ? "var(--amber)" : "var(--text-3)",
            }} />
            <Mono color="var(--text-3)" size="var(--fs-mono-xs)">
              {autosave === "saved" ? "SAVED" : autosave === "saving" ? "SAVING" : "—"}
            </Mono>
          </div>
        </div>
      </header>
      <main className="pt-[52px]">{children}</main>
    </div>
  );
}

/* ───────────────────────── Screen B: System Check ───────────────────────── */

type CheckState = "idle" | "checking" | "ok" | "warn" | "fail";

function CheckRow({ icon: Icon, label, hint, state }: { icon: any; label: string; hint: string; state: CheckState }) {
  const color =
    state === "ok" ? "var(--teal)" :
    state === "warn" ? "var(--amber)" :
    state === "fail" ? "var(--danger)" :
    state === "checking" ? "var(--violet)" : "var(--text-3)";
  const bg =
    state === "ok" ? "rgba(81,193,181,0.10)" :
    state === "warn" ? "var(--amber-soft)" :
    state === "fail" ? "rgba(248,113,113,0.10)" :
    state === "checking" ? "var(--violet-soft)" : "var(--surface-2)";
  const labelText =
    state === "ok" ? "Looks good" :
    state === "warn" ? "Could be better" :
    state === "fail" ? "We can't detect it" :
    state === "checking" ? "Checking…" : "Not checked";

  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)" }}>
      <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 52, height: 52, background: bg, border: `1px solid ${color === "var(--text-3)" ? "var(--hairline)" : color}` }}>
        <Icon size={20} color={color} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-body-lg)", color: "var(--text-1)", letterSpacing: "var(--ls-display-xs)" }}>{label}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)", marginTop: 2 }}>{hint}</div>
      </div>
      <div className="flex items-center gap-2">
        {state === "checking" && (
          <motion.span className="rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 14, height: 14, border: "2px solid var(--violet)", borderTopColor: "transparent" }} />
        )}
        <Mono color={color} size="var(--fs-mono-xs)">{labelText.toUpperCase()}</Mono>
      </div>
    </div>
  );
}

function SystemCheck() {
  const [states, setStates] = useState<Record<string, CheckState>>({
    camera: "idle", mic: "idle", wifi: "idle", browser: "idle",
  });

  useEffect(() => {
    const order: [string, CheckState][] = [
      ["camera", "ok"], ["mic", "ok"], ["wifi", "warn"], ["browser", "ok"],
    ];
    order.forEach(([k, end], i) => {
      setTimeout(() => setStates((s) => ({ ...s, [k]: "checking" })), 400 + i * 700);
      setTimeout(() => setStates((s) => ({ ...s, [k]: end })), 1100 + i * 700);
    });
  }, []);

  const allDone = Object.values(states).every((s) => s === "ok" || s === "warn");

  return (
    <ExamShell current={1} timer="90:00" autosave="idle">
      <div className="max-w-[760px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <Eyebrow color="var(--violet)">Pre-flight</Eyebrow>
        <h1 className="mt-4" style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
          color: "var(--text-1)",
        }}>
          Let's make sure your setup is{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>ready.</span>
        </h1>
        <p className="mt-3 mb-10" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
          This takes about 20 seconds. Nothing is recorded yet.
        </p>

        <div className="space-y-3">
          <CheckRow icon={Camera} label="Camera" hint="So Priya can see you during the interview." state={states.camera} />
          <CheckRow icon={Mic} label="Microphone" hint="Speak naturally — we measure clarity, not accent." state={states.mic} />
          <CheckRow icon={Wifi} label="Internet" hint="Stable enough to stream a 15-min interview." state={states.wifi} />
          <CheckRow icon={Monitor} label="Browser" hint="Chrome / Edge / Safari, latest version." state={states.browser} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button onClick={() => go("dashboard")} className="flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)" }}>
            <ChevronLeft size={16} /> Back to dashboard
          </button>
          <button
            disabled={!allDone}
            onClick={() => go("exam/active")}
            className="rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 px-7"
            style={{
              height: 52,
              background: allDone ? "var(--lime)" : "var(--surface-2)",
              color: allDone ? "var(--on-lime)" : "var(--text-3)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
              boxShadow: allDone ? "0 8px 32px rgba(201,220,83,0.22)" : "none",
              cursor: allDone ? "pointer" : "not-allowed",
            }}
          >
            I'm ready — start Layer 1 <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </ExamShell>
  );
}

/* ───────────────────────── Screen C: Exam Active (L2 Communication) ───────────────────────── */

function ExamActive() {
  const total = 12;
  const [q, setQ] = useState(4);
  const [picked, setPicked] = useState<number | null>(null);
  const [flagged, setFlagged] = useState<Set<number>>(new Set([2, 7]));
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set([5]));
  const answered = useMemo(() => new Set([1, 2, 3]), []);

  const options = [
    "Because the timeline shifted, we'll need to delay the launch.",
    "We delayed the launch as the timeline got shifted.",
    "The launch got delayed because timeline shifted.",
    "Due to a shifted timeline, the launch is delayed.",
  ];

  return (
    <ExamShell current={2} totalQ={total} currentQ={q} timer="14:32" autosave="saved">
      <div className="grid lg:grid-cols-[1fr_280px] gap-8 max-w-[1160px] mx-auto px-6 md:px-10 pt-10 pb-24">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Eyebrow color="var(--violet)">Layer 02 / Communication</Eyebrow>
            <span style={{ color: "var(--text-3)" }}>·</span>
            <Mono color="var(--text-2)">Question {q} of {total}</Mono>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 26, letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
            color: "var(--text-1)",
          }}>
            Which version reads most clearly in a status update to your manager?
          </h2>
          <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
            Pick the option that's clear, concise and ordered cause → effect.
          </p>

          <div className="mt-8 space-y-3">
            {options.map((o, i) => {
              const isPicked = picked === i;
              return (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  className="w-full text-left flex items-center gap-4 transition-all"
                  style={{
                    background: isPicked ? "var(--violet-soft)" : "var(--surface-1)",
                    border: `1px solid ${isPicked ? "var(--violet)" : "var(--hairline)"}`,
                    borderRadius: 14, padding: "20px 22px",
                    boxShadow: isPicked ? "0 0 0 3px rgba(109,86,164,0.18)" : "none",
                  }}
                >
                  <span className="rounded-full flex items-center justify-center shrink-0" style={{
                    width: 32, height: 32,
                    background: isPicked ? "var(--violet)" : "var(--surface-3)",
                    color: isPicked ? "var(--text-1)" : "var(--text-2)",
                    fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
                  }}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-1)", lineHeight: "var(--lh-body)" }}>{o}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={() => { setFlagged((s) => { const n = new Set(s); n.has(q) ? n.delete(q) : n.add(q); return n; }); }}
              className="rounded-full flex items-center gap-2 px-4"
              style={{
                height: 42,
                background: flagged.has(q) ? "var(--amber-soft)" : "transparent",
                border: `1px solid ${flagged.has(q) ? "var(--amber-border)" : "var(--hairline-strong)"}`,
                color: flagged.has(q) ? "var(--amber)" : "var(--text-2)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
              }}
            >
              <Flag size={14} /> Flag
            </button>
            <button
              onClick={() => { setBookmarked((s) => { const n = new Set(s); n.has(q) ? n.delete(q) : n.add(q); return n; }); }}
              className="rounded-full flex items-center gap-2 px-4"
              style={{
                height: 42,
                background: bookmarked.has(q) ? "var(--violet-soft)" : "transparent",
                border: `1px solid ${bookmarked.has(q) ? "var(--violet-border)" : "var(--hairline-strong)"}`,
                color: bookmarked.has(q) ? "var(--violet)" : "var(--text-2)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
              }}
            >
              <Bookmark size={14} /> Review later
            </button>

            <div className="flex-1" />

            <button
              disabled={q === 1}
              onClick={() => setQ((n) => Math.max(1, n - 1))}
              className="rounded-full flex items-center gap-2 px-5"
              style={{
                height: 46, background: "transparent",
                border: "1px solid var(--hairline-strong)",
                color: q === 1 ? "var(--text-3)" : "var(--text-1)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", fontWeight: 500,
              }}
            ><ChevronLeft size={16} /> Previous</button>
            <button
              onClick={() => {
                if (q === total) go("exam/transition");
                else { setQ((n) => n + 1); setPicked(null); }
              }}
              className="rounded-full flex items-center gap-2 px-6"
              style={{
                height: 46, background: "var(--lime)", color: "var(--on-lime)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-body)",
                boxShadow: "0 6px 22px rgba(201,220,83,0.20)",
              }}
            >{q === total ? "Finish layer" : "Next"} <ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Navigator */}
        <aside>
          <div className="sticky top-[76px]">
            <Card style={{ padding: 22 }}>
              <Eyebrow>Question navigator</Eyebrow>
              <div className="grid grid-cols-6 gap-2 mt-5">
                {Array.from({ length: total }).map((_, i) => {
                  const n = i + 1;
                  const isCurrent = n === q;
                  const isAnswered = answered.has(n);
                  const isFlagged = flagged.has(n);
                  const isBook = bookmarked.has(n);
                  const ring = isFlagged ? "var(--amber)" : isBook ? "var(--violet)" : null;
                  return (
                    <button
                      key={n}
                      onClick={() => setQ(n)}
                      className="rounded-lg flex items-center justify-center relative"
                      style={{
                        width: 36, height: 36,
                        background: isCurrent ? "var(--violet)" : isAnswered ? "var(--lime-soft)" : "var(--surface-2)",
                        border: `1px solid ${isCurrent ? "var(--violet)" : isAnswered ? "var(--lime-border)" : "var(--hairline)"}`,
                        color: isCurrent ? "var(--text-1)" : isAnswered ? "var(--lime-text)" : "var(--text-2)",
                        fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                        boxShadow: ring ? `0 0 0 2px ${ring}` : "none",
                      }}
                    >{n}</button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2.5">
                {[
                  ["Answered", "var(--lime)", answered.size],
                  ["Flagged", "var(--amber)", flagged.size],
                  ["Review later", "var(--violet)", bookmarked.size],
                  ["Remaining", "var(--text-3)", total - answered.size],
                ].map(([k, c, n]) => (
                  <div key={k as string} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full" style={{ width: 6, height: 6, background: c as string }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)" }}>{k}</span>
                    </div>
                    <Mono color="var(--text-1)" size="var(--fs-mono-xs)">{String(n).padStart(2, "0")}</Mono>
                  </div>
                ))}
              </div>
            </Card>

            <button
              onClick={() => go("dashboard")}
              className="mt-4 w-full rounded-full"
              style={{
                height: 38, background: "transparent",
                border: "1px solid var(--hairline)", color: "var(--text-2)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
              }}
            >Save & exit</button>
          </div>
        </aside>
      </div>
    </ExamShell>
  );
}

/* ───────────────────────── Screen D: Layer Transition ───────────────────────── */

function LayerTransition() {
  useEffect(() => {
    const t = setTimeout(() => go("exam/priya"), 4200);
    return () => clearTimeout(t);
  }, []);
  return (
    <ExamShell current={5} timer="62:11" autosave="saved">
      <div className="min-h-[calc(100vh-52px)] flex items-center justify-center px-6">
        <div className="max-w-[640px] text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{ background: "var(--lime-soft)", border: "1px solid var(--lime-border)" }}>
              <Check size={12} color="var(--lime-text)" strokeWidth={3} />
              <Mono color="var(--lime-text)" size="var(--fs-mono-xs)">LAYER 04 COMPLETE</Mono>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)",
              color: "var(--text-1)",
            }}
          >
            Next up:{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
              Priya.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
            className="mt-6 mb-10 mx-auto max-w-[460px]"
            style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-lg)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}
          >
            A 15-minute conversation with our AI interviewer. Speak naturally — pauses are fine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              className="rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              style={{ width: 14, height: 14, border: "2px solid var(--violet)", borderTopColor: "transparent" }}
            />
            <Mono color="var(--text-3)">Preparing your session…</Mono>
          </motion.div>
        </div>
      </div>
    </ExamShell>
  );
}

/* ───────────────────────── Screen E: AI Interview ───────────────────────── */

const AI_ROSTER = [
  { id: "priya",  name: "Priya",  accent: "Neutral Indian",   tone: "Warm",   color: "var(--lime)" },
  { id: "arjun",  name: "Arjun",  accent: "Neutral Indian",   tone: "Crisp",  color: "var(--teal)" },
  { id: "meera",  name: "Meera",  accent: "South Indian",     tone: "Calm",   color: "var(--violet)" },
  { id: "rohan",  name: "Rohan",  accent: "North Indian",     tone: "Direct", color: "var(--lime)" },
  { id: "ananya", name: "Ananya", accent: "Bengali · Indian", tone: "Gentle", color: "var(--teal)" },
  { id: "vikram", name: "Vikram", accent: "Marathi · Indian", tone: "Formal", color: "var(--violet)" },
] as const;
type AiId = typeof AI_ROSTER[number]["id"];

function WebcamPreview({ muted }: { muted: boolean }) {
  return (
    <div className="relative overflow-hidden" style={{
      borderRadius: 14, background: "var(--surface-2)",
      border: "1px solid var(--hairline-strong)", aspectRatio: "4 / 3",
    }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center gap-2">
        <Camera size={20} color="var(--text-3)" />
        <Mono color="var(--text-3)" size="var(--fs-mono-xs)">YOUR VIDEO</Mono>
      </div>
      <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full px-2 py-0.5" style={{ background: "rgba(11,9,15,0.7)", backdropFilter: "blur(8px)" }}>
        <span className="rounded-full" style={{ width: 5, height: 5, background: "var(--danger)" }} />
        <Mono color="var(--text-1)" size="var(--fs-mono-xs)">YOU</Mono>
      </div>
      {muted && (
        <div className="absolute bottom-2 right-2 rounded-full flex items-center gap-1 px-2 py-0.5" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
          <Mono color="var(--amber)" size="var(--fs-mono-xs)">MUTED</Mono>
        </div>
      )}
    </div>
  );
}

type AiPalette = { skin: string; skinShade: string; hair: string; blazer: string; blazerDark: string; accent: string; bg1: string; bg2: string };
const PALETTES: Record<AiId, AiPalette> = {
  priya:  { skin: "#E8C9A8", skinShade: "#C9A582", hair: "#1A0F1F", blazer: "#6D56A4", blazerDark: "#4C1D95", accent: "#C9DC53", bg1: "#2A1745", bg2: "#0F0820" },
  arjun:  { skin: "#D4A574", skinShade: "#B6885A", hair: "#0F0A14", blazer: "#0F766E", blazerDark: "#134E4A", accent: "#51C1B5", bg1: "#0F2D2A", bg2: "#06120F" },
  meera:  { skin: "#C99775", skinShade: "#A77A5A", hair: "#0B0710", blazer: "#5B21B6", blazerDark: "#3B0F73", accent: "#C9DC53", bg1: "#1F0F38", bg2: "#0A0418" },
  rohan:  { skin: "#E0B58A", skinShade: "#BF9268", hair: "#15090B", blazer: "#15803D", blazerDark: "#14532D", accent: "#C9DC53", bg1: "#0F2A1A", bg2: "#06120C" },
  ananya: { skin: "#D9AA85", skinShade: "#B98966", hair: "#100712", blazer: "#0E7490", blazerDark: "#155E75", accent: "#51C1B5", bg1: "#062B36", bg2: "#03141A" },
  vikram: { skin: "#CFA079", skinShade: "#AE825A", hair: "#0D080E", blazer: "#6D28D9", blazerDark: "#3B0F73", accent: "#C9DC53", bg1: "#1A0E33", bg2: "#080414" },
};

function AvatarCharacter({ aiId, speaking, female }: { aiId: AiId; speaking: boolean; female: boolean }) {
  const p = PALETTES[aiId];
  return (
    <svg viewBox="0 0 220 240" width="220" height="240" aria-hidden style={{ display: "block" }}>
      <defs>
        <linearGradient id={`blazer-${aiId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.blazer} />
          <stop offset="100%" stopColor={p.blazerDark} />
        </linearGradient>
        <linearGradient id={`skin-${aiId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skin} />
          <stop offset="100%" stopColor={p.skinShade} />
        </linearGradient>
        <linearGradient id={`shirt-${aiId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0EBFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C9C3D9" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* blazer shoulders */}
      <path d={`M 10 230 C 25 175, 60 158, 78 156 L 142 156 C 160 158, 195 175, 210 230 Z`} fill={`url(#blazer-${aiId})`} />
      {/* blazer lapels */}
      <path d="M 78 156 L 110 195 L 92 156 Z" fill={p.blazerDark} opacity="0.55" />
      <path d="M 142 156 L 110 195 L 128 156 Z" fill={p.blazerDark} opacity="0.55" />
      {/* shirt v */}
      <path d="M 92 156 L 110 195 L 128 156 Z" fill={`url(#shirt-${aiId})`} />
      {/* lapel pin accent */}
      <circle cx="92" cy="172" r="2.5" fill={p.accent} />

      {/* neck */}
      <path d="M 96 144 L 96 160 L 124 160 L 124 144 Z" fill={`url(#skin-${aiId})`} />
      <path d="M 96 158 L 124 158 L 124 162 L 96 162 Z" fill="#000" opacity="0.18" />

      {/* hair back (silhouette behind head) */}
      {female ? (
        <path d="M 62 110 C 58 70, 80 44, 110 44 C 140 44, 162 70, 158 110 C 158 138, 150 160, 142 168 L 140 150 L 138 122 L 110 110 L 82 122 L 80 150 L 78 168 C 70 160, 62 138, 62 110 Z" fill={p.hair} />
      ) : (
        <path d="M 70 96 C 70 70, 88 54, 110 54 C 132 54, 150 70, 150 96 L 150 106 L 140 100 L 110 96 L 80 100 L 70 106 Z" fill={p.hair} />
      )}

      {/* face */}
      <ellipse cx="110" cy="108" rx="32" ry="38" fill={`url(#skin-${aiId})`} />

      {/* hair front fringe */}
      {female ? (
        <path d="M 78 92 C 82 76, 100 68, 110 70 C 124 68, 138 78, 142 96 C 134 84, 122 82, 110 84 C 96 82, 86 86, 78 96 Z" fill={p.hair} />
      ) : (
        <path d="M 80 88 C 88 76, 100 72, 110 74 C 122 72, 134 78, 140 92 L 138 96 C 126 86, 110 86, 96 92 L 82 96 Z" fill={p.hair} />
      )}

      {/* subtle cheek tone */}
      <ellipse cx="92" cy="120" rx="6" ry="4" fill={p.blazer} opacity="0.10" />
      <ellipse cx="128" cy="120" rx="6" ry="4" fill={p.blazer} opacity="0.10" />

      {/* eyes */}
      <motion.g animate={speaking ? {} : { opacity: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}>
        <ellipse cx="98" cy="112" rx="2.2" ry="2.8" fill="#0B090F" />
        <ellipse cx="122" cy="112" rx="2.2" ry="2.8" fill="#0B090F" />
      </motion.g>
      {/* brows */}
      <rect x="92" y="103" width="12" height="1.6" rx="1" fill={p.hair} />
      <rect x="116" y="103" width="12" height="1.6" rx="1" fill={p.hair} />

      {/* mouth — animated when speaking */}
      <motion.path
        animate={speaking ? { d: ["M 102 130 Q 110 132 118 130", "M 102 130 Q 110 138 118 130", "M 102 130 Q 110 132 118 130"] } : { d: "M 102 130 Q 110 132 118 130" }}
        transition={{ duration: 0.45, repeat: speaking ? Infinity : 0 }}
        fill="none"
        stroke="#1A0F1F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* earrings (female only) */}
      {female && (
        <>
          <circle cx="78" cy="122" r="1.8" fill={p.accent} />
          <circle cx="142" cy="122" r="1.8" fill={p.accent} />
        </>
      )}
    </svg>
  );
}

const FEMALE_IDS: AiId[] = ["priya", "meera", "ananya"];

function AvatarOrb({ aiId, color, speaking }: { aiId: AiId; color: string; speaking: boolean }) {
  const p = PALETTES[aiId];
  const female = FEMALE_IDS.includes(aiId);
  return (
    <div className="relative overflow-hidden grain" style={{
      width: 300, height: 360, borderRadius: 22,
      background: `radial-gradient(120% 80% at 50% 0%, ${p.bg1} 0%, ${p.bg2} 70%, #050309 100%)`,
      border: `1px solid ${color === "var(--lime)" ? "rgba(201,220,83,0.18)" : color === "var(--teal)" ? "rgba(81,193,181,0.22)" : "rgba(109,86,164,0.28)"}`,
      boxShadow: `0 30px 80px ${color === "var(--lime)" ? "rgba(201,220,83,0.18)" : color === "var(--teal)" ? "rgba(81,193,181,0.20)" : "rgba(109,86,164,0.32)"}`,
    }}>
      {/* cinematic spotlight */}
      <div className="absolute pointer-events-none" style={{
        inset: 0,
        background: `radial-gradient(50% 40% at 50% 35%, ${color === "var(--lime)" ? "rgba(201,220,83,0.15)" : color === "var(--teal)" ? "rgba(81,193,181,0.18)" : "rgba(109,86,164,0.28)"} 0%, transparent 70%)`,
      }} />
      {/* pulsing rings */}
      {speaking && (
        <>
          <motion.span className="absolute rounded-full" style={{ left: "50%", top: "62%", width: 240, height: 240, marginLeft: -120, marginTop: -120, border: `1px solid ${color}` }} animate={{ scale: [0.6, 1.2], opacity: [0.45, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }} />
          <motion.span className="absolute rounded-full" style={{ left: "50%", top: "62%", width: 240, height: 240, marginLeft: -120, marginTop: -120, border: `1px solid ${color}` }} animate={{ scale: [0.6, 1.4], opacity: [0.3, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.9 }} />
        </>
      )}

      {/* character */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 0 }}
        animate={{ y: speaking ? [0, -2, 0] : 0 }}
        transition={{ duration: 1.4, repeat: speaking ? Infinity : 0, ease: "easeInOut" }}
      >
        <AvatarCharacter aiId={aiId} speaking={speaking} female={female} />
      </motion.div>

      {/* corner mono tag */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2 py-1" style={{ background: "rgba(11,9,15,0.55)", backdropFilter: "blur(8px)", border: "1px solid var(--hairline)" }}>
        <span className="rounded-full" style={{ width: 5, height: 5, background: speaking ? color : "var(--text-3)" }} />
        <Mono color={speaking ? "var(--text-1)" : "var(--text-3)"} size="var(--fs-mono-xs)">AI INTERVIEWER</Mono>
      </div>
    </div>
  );
}

function PriyaInterview() {
  const [aiId, setAiId] = useState<AiId>("priya");
  const [speaking, setSpeaking] = useState<"ai" | "you">("ai");
  const [muted, setMuted] = useState(false);
  const bars = 28;
  const ai = AI_ROSTER.find((a) => a.id === aiId)!;

  useEffect(() => {
    const t = setInterval(() => setSpeaking((s) => (s === "ai" ? "you" : "ai")), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <ExamShell current={5} timer="11:42" autosave="saving">
      <div className="min-h-[calc(100vh-52px)] grid lg:grid-cols-[1fr_360px]">
        {/* Stage: AI on left, webcam beside */}
        <div className="relative flex flex-col px-6 lg:px-10 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)" }}>
              <span className="rounded-full" style={{ width: 6, height: 6, background: "var(--danger)" }} />
              <Mono color="var(--text-2)" size="var(--fs-mono-xs)">REC · LAYER 05</Mono>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)" }}>
              Question <Mono color="var(--text-1)">3</Mono> of <Mono color="var(--text-1)">6</Mono>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* AI avatar — left half */}
            <div className="flex flex-col items-center justify-center text-center rounded-2xl" style={{ padding: 24, background: "var(--surface-1)", border: "1px solid var(--hairline)" }}>
              <AvatarOrb aiId={aiId} color={ai.color} speaking={speaking === "ai"} />
              <div className="mt-6">
                <Eyebrow color={speaking === "ai" ? ai.color : "var(--lime-text)"}>
                  {speaking === "ai" ? `${ai.name} is speaking` : "Your turn"}
                </Eyebrow>
                <div className="mt-2 flex items-baseline gap-2 justify-center flex-wrap">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)", letterSpacing: "var(--ls-display-sm)" }}>{ai.name}</span>
                  <Mono color="var(--text-3)" size="var(--fs-mono-xs)">· {ai.accent.toUpperCase()} · {ai.tone.toUpperCase()}</Mono>
                </div>
              </div>
            </div>

            {/* Webcam preview — right half */}
            <div className="flex flex-col rounded-2xl" style={{ padding: 24, background: "var(--surface-1)", border: "1px solid var(--hairline)" }}>
              <div className="flex-1 flex items-center justify-center">
                <WebcamPreview muted={muted} />
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="rounded-full" style={{ width: 5, height: 5, background: speaking === "you" ? "var(--lime)" : "var(--text-3)" }} />
                <Mono color="var(--text-3)" size="var(--fs-mono-xs)">{speaking === "you" ? "MIC LIVE" : "LISTENING"}</Mono>
              </div>
            </div>
          </div>

          {/* Question */}
          <h2 className="mt-10 max-w-[680px]" style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: 24, letterSpacing: "var(--ls-display-xs)", lineHeight: "var(--lh-snug)",
            color: "var(--text-1)",
          }}>
            Tell me about a project where the original plan didn't survive contact with reality. What did you change, and why?
          </h2>

          {/* waveform */}
          <div className="mt-7 flex items-end gap-[3px]" style={{ height: 38 }}>
            {Array.from({ length: bars }).map((_, i) => (
              <motion.span
                key={i}
                className="rounded-full"
                animate={{ height: speaking === "you" && !muted ? [6, 8 + Math.random() * 26, 6] : 6 }}
                transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                style={{ width: 3, background: speaking === "you" ? "var(--lime)" : "var(--text-3)" }}
              />
            ))}
          </div>

          {/* AI selector */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <Eyebrow>Pick your interviewer</Eyebrow>
              <Mono color="var(--text-3)" size="var(--fs-mono-xs)">{AI_ROSTER.length} VOICES</Mono>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {AI_ROSTER.map((a) => {
                const isActive = a.id === aiId;
                return (
                  <button
                    key={a.id}
                    onClick={() => setAiId(a.id)}
                    className="shrink-0 text-left transition-all"
                    style={{
                      width: 168,
                      background: isActive ? "var(--surface-2)" : "var(--surface-1)",
                      border: `1px solid ${isActive ? a.color : "var(--hairline)"}`,
                      borderRadius: 14, padding: 14,
                      boxShadow: isActive ? `0 0 0 3px ${a.color === "var(--lime)" ? "rgba(201,220,83,0.15)" : a.color === "var(--teal)" ? "rgba(81,193,181,0.15)" : "rgba(109,86,164,0.15)"}` : "none",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full flex items-center justify-center" style={{
                        width: 34, height: 34,
                        background: `linear-gradient(135deg, ${a.color} 0%, ${a.color === "var(--lime)" ? "#7AA838" : a.color === "var(--teal)" ? "#0F766E" : "#5B21B6"} 100%)`,
                      }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "var(--on-lime)" }}>{a.name[0]}</span>
                      </span>
                      <div className="min-w-0">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-1)", letterSpacing: "var(--ls-display-xs)" }}>{a.name}</div>
                        <Mono color="var(--text-3)" size="var(--fs-mono-xs)">{a.tone.toUpperCase()}</Mono>
                      </div>
                    </div>
                    <div className="mt-2.5 truncate" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>{a.accent}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMuted((m) => !m)}
              className="rounded-full flex items-center gap-2 px-5"
              style={{
                height: 46,
                background: muted ? "var(--amber-soft)" : "var(--surface-2)",
                border: `1px solid ${muted ? "var(--amber-border)" : "var(--hairline-strong)"}`,
                color: muted ? "var(--amber)" : "var(--text-1)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
              }}
            ><Mic size={15} /> {muted ? "Unmute" : "Mute"}</button>

            <button
              className="rounded-full flex items-center gap-2 px-5"
              style={{
                height: 46, background: "var(--surface-2)",
                border: "1px solid var(--hairline-strong)", color: "var(--text-1)",
                fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
              }}
            ><Volume2 size={15} /> Repeat question</button>

            <div className="flex-1" />

            <button
              onClick={() => go("exam/processing")}
              className="rounded-full flex items-center gap-2 px-6"
              style={{
                height: 46, background: "var(--lime)", color: "var(--on-lime)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-body)",
                boxShadow: "0 6px 22px rgba(201,220,83,0.20)",
              }}
            >Finish & submit <ArrowRight size={16} /></button>
          </div>
        </div>

        {/* Transcript */}
        <aside className="border-l p-6 overflow-y-auto" style={{ borderColor: "var(--hairline)", background: "var(--bg-2)" }}>
          <Eyebrow>Live transcript</Eyebrow>
          <div className="mt-5 space-y-5">
            <Bubble who={ai.name} color={ai.color} text="Walk me through a recent project that mattered to you. Start with what you were trying to build." />
            <Bubble who="You" color="var(--lime-text)" text="Sure — last semester I led a four-person team building a delivery routing app for our city's small restaurants…" />
            <Bubble who={ai.name} color={ai.color} text="What was the first thing that surprised you?" />
            <Bubble who="You" color="var(--lime-text)" text="Honestly, how messy the address data was. We had to add a fuzzy match step we never planned for." />
            <Bubble who={ai.name} color={ai.color} text="Tell me about a project where the original plan didn't survive contact with reality. What did you change, and why?" current />
          </div>
        </aside>
      </div>
    </ExamShell>
  );
}

function Bubble({ who, color, text, current }: { who: string; color: string; text: string; current?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="rounded-full" style={{ width: 5, height: 5, background: color }} />
        <Mono color={color} size="var(--fs-mono-xs)">{who.toUpperCase()}</Mono>
      </div>
      <div style={{
        fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
        color: current ? "var(--text-1)" : "var(--text-2)", lineHeight: "var(--lh-body)",
        opacity: current ? 1 : 0.85,
      }}>{text}</div>
    </div>
  );
}

/* ───────────────────────── Screen F: Processing Results ───────────────────────── */

function Processing() {
  const steps = [
    "Scoring aptitude responses",
    "Analysing communication patterns",
    "Evaluating domain answers",
    "Reviewing practical work",
    "Generating role-fit recommendations",
  ];
  const FINAL_SCORE = 73;
  const STEP_MS = 1400;
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  // Advance steps
  useEffect(() => {
    if (idx >= steps.length) return;
    const t = setTimeout(() => setIdx((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx]);

  // Count up score over total duration of step progression
  useEffect(() => {
    const total = STEP_MS * steps.length;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(eased * FINAL_SCORE));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const allDone = idx >= steps.length;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[520px] w-full">
        <div className="text-center mb-10">
          {/* Gradient ring with score counter */}
          <div className="relative mx-auto mb-9" style={{ width: 168, height: 168 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(from 0deg, var(--violet) 0%, var(--lime) 60%, transparent 75%, transparent 100%)",
                WebkitMask: "radial-gradient(circle, transparent 62%, #000 64%)",
                mask: "radial-gradient(circle, transparent 62%, #000 64%)",
              }}
            />
            <div className="absolute inset-0 rounded-full" style={{
              border: "1px solid var(--hairline)",
              WebkitMask: "radial-gradient(circle, transparent 62%, #000 64%)",
              mask: "radial-gradient(circle, transparent 62%, #000 64%)",
            }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: 56, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1,
                background: "linear-gradient(180deg, #F0EBFF 0%, #C9DC53 120%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{score}</span>
              <Mono color="var(--text-3)" size="var(--fs-mono-xs)">OUT OF 100</Mono>
            </div>
          </div>

          <Eyebrow color="var(--violet)">Almost there</Eyebrow>
          <h1 className="mt-3" style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
            color: "var(--text-1)",
          }}>
            Reading your{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>work.</span>
          </h1>
        </div>

        <Card style={{ padding: 24 }}>
          <ul className="space-y-3.5">
            {steps.map((s, i) => {
              const done = i < idx;
              const active = i === idx;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span className="rounded-full flex items-center justify-center shrink-0" style={{
                    width: 22, height: 22,
                    background: done ? "var(--lime)" : active ? "var(--violet-soft)" : "var(--surface-2)",
                    border: `1px solid ${done ? "var(--lime)" : active ? "var(--violet)" : "var(--hairline)"}`,
                  }}>
                    {done
                      ? <Check size={11} color="var(--on-lime)" strokeWidth={3} />
                      : active
                        ? <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="rounded-full" style={{ width: 10, height: 10, border: "1.5px solid var(--violet)", borderTopColor: "transparent" }} />
                        : null}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)",
                    color: done ? "var(--text-2)" : active ? "var(--text-1)" : "var(--text-3)",
                  }}>{s}</span>
                </li>
              );
            })}
          </ul>
        </Card>

        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="mt-8 flex justify-center"
            >
              <div className="relative">
                <motion.span
                  className="absolute rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.12], opacity: [0.5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  style={{ inset: -6, border: "2px solid var(--lime)" }}
                />
                <button
                  onClick={() => go("results")}
                  className="relative rounded-full flex items-center gap-2 px-7 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    height: 54, background: "var(--lime)", color: "var(--on-lime)",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
                    boxShadow: "0 10px 40px rgba(201,220,83,0.32)",
                  }}
                >
                  View my results <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── Screen G: Results ───────────────────────── */

function Results() {
  const score = 73;
  const band = "B";
  const percentile = 77;
  const [tab, setTab] = useState<"overview" | "breakdown" | "roles" | "plan" | "cert">("overview");

  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (score / 100) * circumference;

  const TABS: { id: typeof tab; label: string }[] = [
    { id: "overview",  label: "Overview" },
    { id: "breakdown", label: "Score Breakdown" },
    { id: "roles",     label: "Role Readiness" },
    { id: "plan",      label: "Improvement Plan" },
    { id: "cert",      label: "Certificate" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <DashboardNav />
      <main className="relative max-w-[1160px] mx-auto px-6 md:px-[72px] pt-[100px] pb-24">
        {/* Ghost hero number — same treatment as landing hero */}
        <div
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            right: "-2vw", top: 60,
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "min(28vw, 360px)",
            color: "rgba(240,235,255,0.03)",
            letterSpacing: "-0.06em", lineHeight: 0.85,
          }}
        >
          {score}
        </div>

        <div className="relative flex items-center gap-3">
          <Eyebrow color="var(--lime-text)">Result · 29 May 2026</Eyebrow>
          <span style={{ color: "var(--text-3)" }}>·</span>
          <Mono color="var(--text-2)" size="var(--fs-mono-xs)">JREE-2026-RS-0427</Mono>
        </div>
        <h1 className="mt-4 max-w-[760px]" style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)",
          color: "var(--text-1)",
        }}>
          You're{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
            interview-ready.
          </span>
        </h1>
        <p className="mt-5 max-w-[560px]" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-2)" }}>
          You scored stronger than {percentile}% of candidates in your domain. Here's the breakdown.
        </p>

        {/* tabs — underline style */}
        <div className="mt-10 flex items-center gap-1 relative overflow-x-auto" style={{ borderBottom: "1px solid var(--hairline)" }}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative whitespace-nowrap"
                style={{
                  height: 44, padding: "0 18px", background: "transparent",
                  color: active ? "var(--text-1)" : "var(--text-2)",
                  fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", fontWeight: active ? 600 : 500,
                  borderBottom: active ? "2px solid var(--lime)" : "2px solid transparent",
                  transition: "color 200ms ease, border-color 200ms ease",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab !== "overview" && (
          <div className="mt-8">
            {tab === "breakdown" && <ResultsBreakdown />}
            {tab === "roles"     && <ResultsRoles />}
            {tab === "plan"      && <ResultsPlan />}
            {tab === "cert"      && <ResultsCertificate />}
          </div>
        )}

        {tab === "overview" && (
        <>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 mt-8">
          {/* Score ring */}
          <Card style={{ padding: 40 }}>
            <Eyebrow>Overall score</Eyebrow>
            <div className="mt-6 flex items-center gap-10">
              <div className="relative" style={{ width: 200, height: 200 }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="var(--surface-3)" strokeWidth="14" />
                  <motion.circle
                    cx="100" cy="100" r="88" fill="none"
                    stroke="var(--lime)" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.6, ease, delay: 0.2 }}
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 800,
                    fontSize: 56, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1,
                  }}>{score}</div>
                  <Mono color="var(--text-3)" size="var(--fs-mono-xs)">OUT OF 100</Mono>
                </div>
              </div>
              <div>
                <Eyebrow color="var(--lime-text)">Band {band}</Eyebrow>
                <h3 className="mt-2" style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: 26, color: "var(--text-1)", letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
                }}>
                  Interview-ready
                </h3>
                <p className="mt-3 max-w-[260px]" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
                  You communicate clearly, think structurally and have solid domain fundamentals.
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "var(--lime)", letterSpacing: "var(--ls-display-sm)" }}>
                    {percentile}<span style={{ fontSize: 20 }}>th</span>
                  </span>
                  <Mono color="var(--text-2)">percentile</Mono>
                </div>
              </div>
            </div>
          </Card>

          {/* National percentile — the emotional peak */}
          <Card style={{ padding: 32, background: "linear-gradient(155deg, var(--surface-1) 0%, var(--surface-2) 100%)" }}>
            <Eyebrow color="var(--lime-text)">National percentile</Eyebrow>
            <div className="mt-6 flex items-baseline gap-2">
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: 96, color: "#C9DC53",
                letterSpacing: "var(--ls-display)", lineHeight: 0.9,
                textShadow: "0 6px 40px rgba(201,220,83,0.35)",
              }}>{percentile}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "#C9DC53", letterSpacing: "var(--ls-display-sm)" }}>th</span>
            </div>
            <p className="mt-3 max-w-[300px]" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
              You scored higher than <Mono color="var(--text-1)">{percentile}%</Mono> of candidates in your domain across India.
            </p>
            <div className="mt-6 pt-6 grid grid-cols-2 gap-4" style={{ borderTop: "1px solid var(--hairline)" }}>
              <div>
                <Mono color="var(--text-3)" size="var(--fs-mono-xs)">DOMAIN</Mono>
                <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-1)" }}>Computer Science</div>
              </div>
              <div>
                <Mono color="var(--text-3)" size="var(--fs-mono-xs)">COHORT</Mono>
                <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-1)" }}>4,218 graduates</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Role fit row */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 mt-5">
          <Card style={{ padding: 32 }}>
            <Eyebrow>Top role fits</Eyebrow>
            <div className="mt-6 space-y-4">
              {[
                ["Product Engineer", 91, "var(--lime)"],
                ["Backend Engineer", 84, "var(--lime)"],
                ["Solutions Engineer", 76, "var(--teal)"],
                ["Data Analyst", 62, "var(--violet)"],
              ].map(([role, fit, c]) => (
                <div key={role as string}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-1)" }}>{role}</span>
                    <Mono color="var(--text-1)">{fit}% fit</Mono>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 6, background: "var(--surface-3)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fit}%` }}
                      transition={{ duration: 1.1, ease, delay: 0.3 }}
                      style={{ height: "100%", background: c as string, borderRadius: 999 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-7 w-full rounded-full" style={{
              height: 42, background: "transparent",
              border: "1px solid var(--hairline-strong)",
              color: "var(--text-1)",
              fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--fs-body-sm)",
            }}>See all 12 role matches →</button>
          </Card>
        </div>

        {/* Layer breakdown */}
        <Card className="mt-5" style={{ padding: 32 }}>
          <Eyebrow>Layer breakdown</Eyebrow>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {[
              ["Aptitude", 82, "var(--lime)"],
              ["Communication", 88, "var(--lime)"],
              ["Domain", 71, "var(--teal)"],
              ["Practical", 79, "var(--lime)"],
              ["Interview", 84, "var(--lime)"],
              ["Reflection", 64, "var(--amber)"],
            ].map(([name, s, c]) => (
              <div key={name as string} className="p-4 rounded-2xl" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)" }}>
                <Mono color="var(--text-3)" size="var(--fs-mono-xs)">0{(["Aptitude","Communication","Domain","Practical","Interview","Reflection"].indexOf(name as string)) + 1}</Mono>
                <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-2)" }}>{name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: c as string, letterSpacing: "var(--ls-display-sm)" }}>{s}</span>
                  <Mono color="var(--text-3)" size="var(--fs-mono-xs)">/100</Mono>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTAs — only Download Certificate is filled lime; the 3 share actions are ghost */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button className="rounded-full px-6 flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{
            height: 52, background: "var(--lime)", color: "var(--on-lime)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
            boxShadow: "0 8px 32px rgba(201,220,83,0.22)",
          }}>Download certificate <ArrowRight size={16} /></button>

          <button className="rounded-full px-6" style={{
            height: 52, background: "transparent",
            border: "1px solid var(--hairline-strong)", color: "var(--text-1)",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
          }}>Share with recruiters</button>
          <button className="rounded-full px-6" style={{
            height: 52, background: "transparent",
            border: "1px solid var(--hairline-strong)", color: "var(--text-1)",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
          }}>Post to LinkedIn</button>
          <button className="rounded-full px-6" style={{
            height: 52, background: "transparent",
            border: "1px solid var(--hairline-strong)", color: "var(--text-1)",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
          }}>Copy public link</button>

          <div className="flex-1" />

          <button onClick={() => go("dashboard")} style={{
            background: "transparent", color: "var(--text-2)",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
          }}>← Back to dashboard</button>
        </div>
        </>
        )}
      </main>
    </div>
  );
}

/* ─────────────── Results: Tab 2 — Score Breakdown ─────────────── */
function ResultsBreakdown() {
  const layers = [
    { n: "L1", name: "Cognitive Ability",       weight: 25, score: 79, avg: 68, sub: "Logical reasoning, pattern recognition, numerical ability", color: "var(--violet)" },
    { n: "L2", name: "Professional Communication", weight: 20, score: 74, avg: 65, sub: "Written clarity, verbal articulation, business English", color: "var(--violet)" },
    { n: "L3", name: "Domain Knowledge",        weight: 25, score: 68, avg: 72, sub: "Engineering fundamentals — your stream's core knowledge", color: "var(--amber)" },
    { n: "L4", name: "Workplace Decision Making", weight: 15, score: 71, avg: 64, sub: "Situational judgement, prioritisation, professional ethics", color: "var(--violet)" },
    { n: "L5", name: "AI Video Interview (Priya)", weight: 15, score: 77, avg: 62, sub: "Content, clarity, composure under structured questions", color: "var(--lime)", special: true },
  ];

  const bandFor = (s: number) =>
    s >= 80 ? { label: "Strong", color: "var(--lime-text)", bg: "var(--lime-soft)", bd: "var(--lime-border)" }
    : s >= 60 ? { label: "Good", color: "var(--text-1)", bg: "var(--violet-soft)", bd: "var(--violet-border)" }
    : s >= 40 ? { label: "Developing", color: "var(--amber)", bg: "var(--amber-soft)", bd: "rgba(217,119,6,0.32)" }
    : { label: "Needs Work", color: "var(--text-3)", bg: "var(--surface-2)", bd: "var(--hairline)" };

  return (
    <div>
      <Eyebrow color="var(--violet)">YOUR 5-LAYER BREAKDOWN</Eyebrow>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1.1 }}>
        Where your{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>score</span>{" "}
        came from.
      </h2>

      <div className="mt-8 flex flex-col gap-4">
        {layers.map((l, i) => {
          const b = bandFor(l.score);
          const above = l.score >= l.avg;
          return (
            <div key={l.n} className="rounded-2xl relative overflow-hidden" style={{
              background: l.special ? "rgba(109,86,164,0.06)" : "var(--surface-1)",
              border: `1px solid ${l.special ? "rgba(109,86,164,0.25)" : "var(--violet-border)"}`,
              borderLeft: l.special ? "3px solid var(--violet)" : undefined,
              padding: 28,
            }}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 items-start">
                {/* LEFT */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full flex items-center justify-center" style={{ width: 28, height: 28, background: "rgba(109,86,164,0.2)", border: "1px solid var(--violet-border)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--text-1)" }}>{l.n}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--text-1)" }}>{l.name}</span>
                  </div>
                  <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: 12, color: "var(--text-3)" }}>{l.weight}% weight</div>
                  <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{l.sub}</p>
                </div>

                {/* CENTER */}
                <div>
                  <div className="flex items-center justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>
                    <span>0</span>
                    <span style={{ position: "relative" }}>Avg {l.avg}</span>
                    <span>100</span>
                  </div>
                  <div className="relative mt-2 rounded-full" style={{ height: 12, background: "rgba(109,86,164,0.12)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${l.score}%` }}
                      transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.1 }}
                      className="rounded-full"
                      style={{ height: "100%", background: l.color }}
                    />
                    <div className="absolute" style={{ left: `${l.avg}%`, top: -4, bottom: -4, width: 0, borderLeft: "2px dashed rgba(255,255,255,0.25)" }} />
                    <div className="absolute rounded-full" style={{ left: `calc(${l.score}% - 8px)`, top: -2, width: 16, height: 16, background: "var(--lime)", boxShadow: "0 0 8px rgba(201,220,83,0.4)" }} />
                  </div>
                  <p className="mt-3" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: above ? "var(--teal)" : "var(--amber)", lineHeight: 1.5 }}>
                    {above
                      ? "You scored above the national average for this layer."
                      : `You are ${l.avg - l.score} points below the national average for this layer.`}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="md:text-right">
                  <div className="flex items-baseline md:justify-end gap-1">
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 40, color: l.special ? "var(--lime)" : "var(--text-1)", lineHeight: 1 }}>{l.score}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: 14, color: "var(--text-3)" }}>/ 100</span>
                  </div>
                  <span className="inline-flex items-center rounded-full mt-2" style={{ padding: "3px 10px", background: b.bg, border: `1px solid ${b.bd}` }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: b.color, letterSpacing: "0.02em" }}>{b.label}</span>
                  </span>
                  <div className="mt-3">
                    <button style={{ background: "transparent", color: above ? "var(--violet)" : "var(--amber)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12 }}>
                      {l.special ? "Re-watch interview →" : `Practice ${l.n} →`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite */}
      <div className="mt-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{
        background: "rgba(201,220,83,0.05)", border: "1px solid rgba(201,220,83,0.2)", padding: "20px 24px",
      }}>
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, color: "var(--text-2)" }}>Weighted composite</div>
        <div className="text-center">
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 32, color: "var(--text-1)", lineHeight: 1 }}>72.50 / 100</div>
          <span className="inline-flex items-center rounded-full mt-1" style={{ padding: "2px 9px", background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: "var(--text-1)", letterSpacing: "0.02em" }}>Band B — Nearly Ready</span>
          </span>
        </div>
        <div className="md:text-right">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>Your strongest: AI Interview (77)</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--amber)" }}>Your growth lever: Domain (68)</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Results: Tab 3 — Role Readiness ─────────────── */
function ResultsRoles() {
  return (
    <div>
      <Eyebrow color="var(--violet)">YOUR ROLE FIT PROFILE</Eyebrow>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1.1 }}>
        You're ready for{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>these</span>{" "}
        roles.
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <RoleCard tier="best"  name="HR & People"            score={76} sub="Talent acquisition, L&D, HR operations, culture" />
        <RoleCard tier="good"  name="Product & Strategy"     score={71} sub="Product analyst, business strategy, ops roles" />
        <RoleCard tier="dev"   name="Operations"             score={68} sub="Process design, supply chain, project ops" />
        <RoleCard tier="lock"  name="Software Engineering"   score={45} sub="Backend, full-stack, systems engineering" />
      </div>

      <div className="mt-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{
        background: "var(--violet-soft)", border: "1px solid var(--violet-border)", padding: "20px 24px",
      }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>Among Engineering graduates at your band level:</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 14, color: "var(--lime-text)" }}>Top 8% for HR & People readiness</div>
        <button style={{ background: "transparent", color: "var(--violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>→ See employers hiring for HR roles</button>
      </div>
    </div>
  );
}

function RoleCard({ tier, name, score, sub }: { tier: "best" | "good" | "dev" | "lock"; name: string; score: number; sub: string }) {
  const cfg = {
    best: { border: "1.5px solid var(--teal)",    badge: "BEST FIT",   bColor: "var(--teal)",   bBg: "rgba(81,193,181,0.12)", bBorder: "rgba(81,193,181,0.3)",  fill: "var(--teal)",   bg: "var(--surface-1)" },
    good: { border: "1px solid var(--violet-border)", badge: "GOOD FIT",   bColor: "var(--violet)", bBg: "var(--violet-soft)",   bBorder: "var(--violet-border)",  fill: "var(--violet)", bg: "var(--surface-1)" },
    dev:  { border: "1px solid rgba(217,119,6,0.2)", badge: "DEVELOPING", bColor: "var(--amber)",  bBg: "var(--amber-soft)",    bBorder: "rgba(217,119,6,0.32)",  fill: "var(--amber)",  bg: "var(--surface-1)" },
    lock: { border: "1px solid rgba(109,86,164,0.08)", badge: "LOCKED",   bColor: "var(--text-3)", bBg: "var(--surface-2)",     bBorder: "var(--hairline)",      fill: "var(--text-3)", bg: "#0F0D14" },
  }[tier];

  const locked = tier === "lock";
  return (
    <div className="rounded-2xl relative" style={{ background: cfg.bg, border: cfg.border, padding: 28, opacity: locked ? 0.85 : 1 }}>
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-full flex items-center justify-center" style={{ width: 40, height: 40, background: cfg.bBg, border: `1px solid ${cfg.bBorder}` }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: cfg.bColor }}>{locked ? "🔒" : name[0]}</span>
        </div>
        <span className="inline-flex items-center rounded-full" style={{ padding: "3px 10px", background: cfg.bBg, border: `1px solid ${cfg.bBorder}` }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: cfg.bColor, letterSpacing: "0.02em" }}>{cfg.badge}</span>
        </span>
      </div>

      <h3 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: locked ? "var(--text-3)" : "var(--text-1)", letterSpacing: "var(--ls-display-sm)" }}>{name}</h3>
      <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>{sub}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>Role Readiness</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: cfg.fill }}>{score}% readiness</span>
        </div>
        <div className="rounded-full" style={{ height: 8, background: "var(--surface-2)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.9, ease, delay: 0.2 }} className="rounded-full" style={{ height: "100%", background: cfg.fill }} />
        </div>
      </div>

      {tier === "dev" && (
        <p className="mt-3" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--amber)" }}>+5 points in Domain unlocks this role fully</p>
      )}

      {locked && (
        <div className="mt-4 rounded-xl" style={{ background: "rgba(109,86,164,0.08)", padding: 14 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>Requires Band A in Domain Knowledge.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--amber)" }}>You are currently at 68. Boost by 12 points.</p>
          <button className="mt-2" style={{ background: "transparent", color: "var(--violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>Practice Domain →</button>
        </div>
      )}

      {!locked && (
        <button className="mt-4" style={{ background: "transparent", color: cfg.fill, fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>
          See open {name} roles →
        </button>
      )}
    </div>
  );
}

/* ─────────────── Results: Tab 4 — Improvement Plan ─────────────── */
function ResultsPlan() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { n: 1, name: "Domain Knowledge",        score: 68, gain: "+7", note: "4 points below avg", priority: "var(--lime)",   accent: "var(--amber)" },
    { n: 2, name: "Professional Communication", score: 74, gain: "+6", note: "Solidly within reach", priority: "var(--violet)", accent: "var(--teal)" },
    { n: 3, name: "Overall Band Progression", score: 72, gain: "+8", note: "Band B → Band A", priority: "var(--text-3)", accent: "var(--text-2)" },
  ];

  return (
    <div>
      <Eyebrow color="var(--violet)">YOUR PERSONAL ROADMAP</Eyebrow>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1.1 }}>
        From Band B to{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>Band A.</span>
      </h2>
      <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-2)" }}>3 focused improvements. That's all it takes.</p>

      {/* Streak widget */}
      <div className="mt-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-5 justify-between" style={{
        background: "rgba(109,86,164,0.08)", border: "1px solid rgba(109,86,164,0.18)", padding: "20px 24px",
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--text-1)" }}>🔥 Placement-Ready Streak</div>
          <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>Solve 5 quick questions daily to stay sharp.</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 40, color: "var(--lime)", lineHeight: 1 }}>4</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--lime-text)" }}>day streak</div>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="rounded-full" style={{
                width: 10, height: 10,
                background: i < 4 ? "var(--violet)" : i === 4 ? "var(--lime)" : "rgba(109,86,164,0.15)",
              }} />
            ))}
          </div>
        </div>
        <button className="rounded-full" style={{
          height: 36, padding: "0 18px", background: "var(--lime)", color: "var(--on-lime)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, border: "none",
        }}>Today's 5-question drill →</button>
      </div>

      {/* Accordion */}
      <div className="mt-6 flex flex-col gap-4">
        {items.map((it, idx) => {
          const isOpen = open === idx;
          return (
            <div key={it.n} className="rounded-2xl overflow-hidden" style={{
              background: "var(--surface-1)", border: "1px solid var(--violet-border)", borderLeft: `3px solid ${it.priority}`,
            }}>
              <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex items-center gap-4 text-left" style={{ padding: "20px 24px" }}>
                <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 28, height: 28, background: it.priority, color: "var(--on-lime)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13 }}>
                  {it.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-1)" }}>{it.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: it.accent }}>{it.score} / 100 · {it.note}</div>
                </div>
                <div className="text-right shrink-0">
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--lime-text)" }}>{it.gain} points → Band A</div>
                  <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text-2)", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}>›</div>
                </div>
              </button>
              {isOpen && (
                <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--hairline)" }}>
                  <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
                    {idx === 0 && "Domain Knowledge is 25% of your total score and directly gates Software Engineering and Product roles. This is your highest-leverage improvement."}
                    {idx === 1 && "Communication shows up in every role. A small lift here puts you comfortably inside Band A territory."}
                    {idx === 2 && "Re-taking after 30 days with focused practice is the fastest path to Band A. 80% of B-band students get there."}
                  </p>
                  <div className="mt-4 grid md:grid-cols-3 gap-3">
                    {[
                      { t: idx === 0 ? "Engineering Fundamentals Drill" : idx === 1 ? "Business Writing Sprint" : "Re-test Strategy", d: "15 min", g: "+3 pts", lock: false },
                      { t: idx === 0 ? "Mechanical Systems Concepts" : idx === 1 ? "Verbal Drill" : "Layer Focus Plan", d: "20 min", g: "+2 pts", lock: true },
                      { t: idx === 0 ? "Domain Mock Test" : idx === 1 ? "Mock Interview Replay" : "Schedule Re-test", d: "25 min", g: "+2 pts", lock: true },
                    ].map((m, mi) => (
                      <div key={mi} className="rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--violet-border)", padding: 16, opacity: m.lock ? 0.55 : 1 }}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full" style={{ padding: "2px 8px", background: "var(--lime)", color: "var(--on-lime)", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11 }}>{m.d}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13, color: "var(--teal)" }}>{m.g}</span>
                        </div>
                        <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-1)" }}>{m.t}</div>
                        <button className="mt-2" style={{ background: "transparent", color: m.lock ? "var(--text-3)" : "var(--violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>
                          {m.lock ? "Locked" : "Start →"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button className="rounded-full" style={{
          height: 44, padding: "0 22px", background: "transparent", color: "var(--text-1)",
          border: "1px solid var(--violet-border)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
        }}>Schedule Re-Test</button>
        <button style={{ background: "transparent", color: "var(--text-3)", fontFamily: "var(--font-body)", fontSize: 13 }}>Remind me in 30 days</button>
      </div>
    </div>
  );
}

/* ─────────────── Results: Tab 5 — Certificate ─────────────── */
function ResultsCertificate() {
  return (
    <div>
      <Eyebrow color="var(--violet)">YOUR VERIFIED CREDENTIAL</Eyebrow>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1.1 }}>
        Your{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>proof.</span>
      </h2>

      {/* Certificate */}
      <div className="mx-auto mt-10" style={{
        maxWidth: 680, background: "#FEFEFE", border: "1px solid #E5E7EB",
        borderRadius: 8, boxShadow: "0 24px 64px rgba(0,0,0,0.4)", padding: 48,
      }}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#1E1B4B" }}>JREE</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#6B7280" }}>EduBridge Pvt. Ltd.</span>
        </div>
        <div className="mt-3" style={{ height: 1, background: "#D97706" }} />

        <div className="text-center mt-8">
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 11, color: "#6B7280", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            NATIONAL JOB READINESS ENTRANCE EXAM
          </div>
          <div className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#1E1B4B", letterSpacing: "-0.02em" }}>
            CERTIFICATE OF ASSESSMENT
          </div>

          <div className="mt-6" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280" }}>This certifies that</div>
          <div className="mt-2 inline-block">
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 48, color: "#1E1B4B", lineHeight: 1 }}>Priya Sharma</div>
            <div className="mt-1" style={{ height: 1, background: "#D97706" }} />
          </div>
          <div className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280" }}>has successfully completed the JREE assessment and is awarded</div>

          <div className="mt-5 flex items-center justify-center gap-5">
            <div className="relative" style={{ width: 64, height: 64 }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#1E1B4B" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={(2 * Math.PI * 26) * (1 - 0.725)}
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 22, color: "#1E1B4B" }}>73</div>
            </div>
            <div className="text-left">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "#1E1B4B" }}>EMPLOYABILITY BAND B</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280" }}>(72.50 / 100 · National Percentile: 77th)</div>
            </div>
          </div>
        </div>

        <div className="mt-8" style={{ height: 1, background: "#E5E7EB" }} />
        <div className="mt-3 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#9CA3AF" }}>
          Exam ID: JREE-2026-00847 · Exam Date: 24 May 2026 · Stream: Engineering · Attempt: 1
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <div style={{ width: 80, height: 1, background: "#9CA3AF" }} />
            <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9CA3AF" }}>Director, EduBridge Pvt. Ltd.</div>
          </div>
          <div className="rounded-full flex items-center justify-center" style={{ width: 48, height: 48, border: "1px solid #D97706" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 11, color: "#1E1B4B" }}>JREE</span>
          </div>
          <div className="text-right">
            <div style={{ width: 48, height: 48, background: "repeating-conic-gradient(#1E1B4B 0% 25%, #FEFEFE 0% 50%) 0 0 / 12px 12px" }} />
            <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9CA3AF" }}>Scan to verify</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3 justify-center">
        <button className="rounded-full flex items-center gap-2" style={{
          height: 44, padding: "0 28px", background: "var(--lime)", color: "var(--on-lime)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, border: "none",
        }}>↓ Download PDF</button>
        <button className="rounded-full" style={{
          height: 44, padding: "0 22px", background: "transparent", color: "var(--text-1)",
          border: "1px solid var(--violet-border)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
        }}>↗ Add to LinkedIn</button>
        <button className="rounded-full" style={{
          height: 44, padding: "0 22px", background: "transparent", color: "var(--text-1)",
          border: "1px solid var(--violet-border)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
        }}>↗ Share on WhatsApp</button>
      </div>

      <div className="mt-8 text-center">
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>Share with family:</div>
        <button className="mt-2 inline-flex items-center gap-2 rounded-full" style={{
          height: 36, padding: "0 20px", background: "rgba(109,86,164,0.08)", border: "1px solid var(--violet-border)",
          color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13,
        }}>
          <span className="rounded-full" style={{ width: 8, height: 8, background: "#25D366" }} />
          Send family card on WhatsApp
        </button>
        <div className="mt-2" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--text-3)" }}>
          (Generates: "Priya ne JREE Band B achieve ki — Top 23% nationally")
        </div>
      </div>

      {/* Verification */}
      <div className="mt-10">
        <Eyebrow color="var(--violet)">FOR EMPLOYERS</Eyebrow>
        <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--text-1)", letterSpacing: "var(--ls-display-sm)" }}>
          Verify this certificate in 5 seconds.
        </h3>
        <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>Any recruiter can scan the QR code or enter the ID below.</p>
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <input defaultValue="JREE-2026-00847" className="flex-1 rounded-xl" style={{
            height: 44, padding: "0 16px", background: "var(--surface-1)", border: "1px solid var(--violet-border)",
            color: "var(--text-1)", fontFamily: "var(--font-mono)", fontSize: 14,
          }} />
          <button className="rounded-xl" style={{
            height: 44, padding: "0 22px", background: "var(--violet)", color: "var(--on-violet)",
            fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, border: "none",
          }}>Verify →</button>
        </div>
        <div className="mt-4 rounded-xl" style={{ background: "rgba(81,193,181,0.06)", border: "1px solid rgba(81,193,181,0.2)", padding: "16px 20px" }}>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--teal)" }}>✓ Verified</div>
          <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>This certificate is authentic, unaltered, and currently valid.</div>
          <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>Certificate status: Active · Valid until: May 2028</div>
        </div>
      </div>
    </div>
  );
}
