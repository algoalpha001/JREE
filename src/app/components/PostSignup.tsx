import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check, Camera, Mic, Wifi, Monitor, Clock, Save, Settings,
  ChevronRight, ChevronLeft, Flag, Bookmark, Volume2, Pause,
  ArrowRight, ArrowLeft, X, AlertCircle, Sparkles, BookOpen, Brain, BadgeCheck, Bell, Play, Lightbulb,
  ChevronDown, MicOff, TrendingUp, Target, Zap, MessageSquare, Radio,
} from "lucide-react";

import {
  BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip,
  PieChart, Pie, LabelList, ScatterChart, Scatter, ZAxis, CartesianGrid, ReferenceLine, ReferenceArea
} from "recharts";

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

function go(route: PostRoute) { window.location.hash = route; }

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
      background: "rgba(250,247,240,0.92)", backdropFilter: "blur(24px) saturate(1.5)",
      WebkitBackdropFilter: "blur(24px) saturate(1.5)",
      borderBottom: "1px solid var(--hairline)",
    }}>
      <div className="max-w-[1160px] mx-auto px-6 md:px-[72px] h-[60px] flex items-center justify-between">
        <button onClick={() => go("dashboard")} className="flex items-end leading-none">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-1)", letterSpacing: "var(--ls-display)" }}>JREE</span>
          <span className="inline-block rounded-full ml-0.5 mb-1.5" style={{ width: 6, height: 6, background: "var(--lime)" }} />
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => go("dashboard")} className="rounded-full px-4 h-9 transition-colors hover:bg-[var(--hairline)] hidden sm:flex items-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text-1)", letterSpacing: "0.05em", border: "1px solid var(--hairline)" }}>
             DASHBOARD
          </button>
          <button onClick={() => window.location.hash = "resume-builder"} className="rounded-full flex items-center gap-2 px-4 h-9 transition-colors hover:bg-[var(--hairline)]" style={{ border: "1px solid var(--hairline)" }}>
            <BadgeCheck size={15} color="var(--violet)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text-1)", letterSpacing: "0.05em" }}>RESUME BUILDER</span>
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

/* Vertical A–D band ladder — a recurring "where you stand" motif. */
function BandLadder({ current }: { current: string }) {
  const bands = [
    { band: "A", range: "75–100", color: "var(--lime)", text: "var(--lime-text)" },
    { band: "B", range: "55–74", color: "var(--teal)", text: "var(--teal-text)" },
    { band: "C", range: "35–54", color: "var(--violet)", text: "var(--violet)" },
    { band: "D", range: "0–34", color: "var(--text-3)", text: "var(--text-3)" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {bands.map((b) => {
        const active = b.band === current;
        return (
          <div
            key={b.band}
            className="flex items-center gap-3 rounded-[10px] px-3 py-2 transition-colors"
            style={{
              background: active ? "var(--surface-3)" : "transparent",
              border: `1px solid ${active ? "var(--hairline-strong)" : "transparent"}`,
              opacity: active ? 1 : 0.5,
            }}
          >
            <span
              className="flex items-center justify-center rounded-md shrink-0"
              style={{
                width: 22, height: 22, background: active ? b.color : "var(--surface-3)",
                color: active ? "var(--bg)" : "var(--text-3)",
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12,
              }}
            >
              {b.band}
            </span>
            <span className="flex-1" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: active ? "var(--text-1)" : "var(--text-3)" }}>
              {b.range}
            </span>
            {active && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em", color: b.text }}>YOU</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DashboardPage() {
  const score = 73;
  const band = "B";
  const percentile = 77;

  // Canonical assessment layers — kept in sync with the Results breakdown.
  const layers = [
    { name: "AI Interview", score: 77, weight: 25, color: "var(--teal)", text: "var(--teal-text)", tag: "Strongest", key: "ai-interview" },
    { name: "Communication", score: 75, weight: 20, color: "var(--violet)", text: "var(--violet)", key: "communication" },
    { name: "Cognitive & Aptitude", score: 70, weight: 25, color: "var(--amber)", text: "var(--amber-text)", tag: "Start here", key: "cognitive-aptitude" },
    { name: "Domain Knowledge", score: 68, weight: 20, color: "var(--violet)", text: "var(--violet)", key: "domain-knowledge" },
    { name: "Work Readiness", score: 72, weight: 10, color: "var(--lime)", text: "var(--lime-text)", key: "work-readiness" },
  ];
  const axes = layers.map((l) => ({ label: l.name.split(" ")[0], value: l.score }));
  const READY = 75;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <DashboardNav />
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 pt-[100px] pb-20">

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Eyebrow color="var(--violet)">Command centre · Rahul Sharma</Eyebrow>
          <span style={{ color: "var(--text-3)" }}>·</span>
          <Mono color="var(--text-3)" size="var(--fs-mono-xs)">Latest · 29 May 2026</Mono>
          <span style={{ color: "var(--text-3)" }}>·</span>
          <Mono color="var(--text-3)" size="var(--fs-mono-xs)">JREE-2026-RS-0427</Mono>
        </div>

        {/* 1. Header identity block */}
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-stretch">
          {/* Headline + verified + CTA */}
          <div className="flex flex-col justify-between rounded-[22px] p-7 sm:p-9 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
            <div className="absolute pointer-events-none" style={{ inset: 0, background: "radial-gradient(75% 90% at 8% 0%, rgba(201,220,83,0.10) 0%, transparent 58%)" }} />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "var(--teal-soft, rgba(81,193,181,0.12))", border: "1px solid var(--teal-border, rgba(81,193,181,0.3))" }}>
                <BadgeCheck size={13} color="var(--teal-text)" />
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 10, color: "var(--teal-text)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Verified · Locked</span>
              </span>
              <p className="mt-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(17px,2.2vw,20px)", color: "var(--text-2)" }}>
                You have a strong platform to build on.
              </p>
              <h1 className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,50px)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--text-1)" }}>
                Here's where you <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", color: "var(--lime-text)" }}>stand</span> today.
              </h1>
            </div>
            <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#results" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: "var(--violet)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 32px rgba(109,86,164,0.3)" }}>
                Full results & analysis <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a href="#results/cert" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full transition-colors hover:bg-[var(--surface-3)]" style={{ border: "1px solid var(--hairline-strong)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                <BadgeCheck size={15} color="var(--text-2)" /> Certificate
              </a>
            </div>
          </div>

          {/* Stat panel — ring · band ladder · percentile */}
          <div className="rounded-[22px] p-7 flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-8 lg:gap-6 lg:w-[340px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-5">
              <ScoreRing value={score} size={104} stroke={9} color="var(--lime)">
                <div className="flex flex-col items-center leading-none">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "var(--text-1)" }}>{score}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.06em", marginTop: 3 }}>/ 100</span>
                </div>
              </ScoreRing>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--text-3)" }}>COMPOSITE</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-1)", lineHeight: 1.1 }}>Band {band}</div>
                <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.45 }}>
                  Ahead of <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>{percentile}%</strong> of CS peers.
                </div>
              </div>
            </div>
            <div className="hidden sm:block lg:hidden w-px" style={{ background: "var(--hairline)" }} />
            <div className="flex-1 lg:flex-none lg:pt-1 lg:border-t lg:border-[var(--hairline)]">
              <div className="hidden lg:block mb-3 mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--text-3)" }}>BAND SCALE</div>
              <BandLadder current={band} />
            </div>
          </div>
        </div>

        {/* 2. Composition — radar + layer rows */}
        <div className="mt-10">
          <div className="flex items-end justify-between flex-wrap gap-2">
            <div>
              <Eyebrow color="var(--violet)">COMPOSITION OF SCORE</Eyebrow>
              <h2 className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3vw,30px)", letterSpacing: "-0.02em", color: "var(--text-1)" }}>Five layers, one number.</h2>
            </div>
            <a href="#results" className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors hover:bg-[var(--surface-2)]" style={{ border: "1px solid var(--hairline-strong)", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--text-1)", textDecoration: "none" }}>
              Break it down <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(300px,.85fr)_1.15fr]">
            {/* Radar */}
            <div className="rounded-[18px] p-5 flex items-center justify-center" style={{ background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
              <RadarChart axes={axes} size={300} draw />
            </div>

            {/* Layer rows */}
            <div className="rounded-[18px] p-5 sm:p-6 flex flex-col gap-3.5" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
              {layers.map((layer) => {
                const gap = Math.max(0, READY - layer.score);
                return (
                  <a
                    key={layer.key}
                    href={`#learn/${layer.key}`}
                    className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-[12px] px-3 py-2.5 transition-colors hover:bg-[var(--surface-2)]"
                    style={{ textDecoration: "none" }}
                  >
                    <MiniRing value={layer.score} size={44} color={layer.color} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-1)" }}>{layer.name}</span>
                        {layer.tag && (
                          <span className="rounded-full px-2 py-0.5 shrink-0" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.04em", color: layer.text, background: "var(--surface-3)" }}>{layer.tag.toUpperCase()}</span>
                        )}
                      </div>
                      {/* thin progress track with benchmark */}
                      <div className="mt-2 relative h-1.5 rounded-full" style={{ background: "var(--bg-2)" }}>
                        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${layer.score}%`, background: layer.color }} />
                        <div className="absolute -top-0.5 -bottom-0.5" style={{ left: `${READY}%`, borderLeft: "1px dashed var(--text-3)" }} />
                      </div>
                      <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: gap > 0 ? "var(--amber-text)" : "var(--teal-text)" }}>
                        {gap > 0 ? `${gap} to role-ready` : "Role-ready ✓"} · {layer.weight}% weight
                      </div>
                    </div>
                    <ChevronRight size={16} color="var(--text-3)" className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Next best action */}
        <div className="mt-6 rounded-[18px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 42, height: 42, background: "rgba(217,119,6,0.14)" }}>
              <Zap size={20} color="var(--amber-text)" />
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--amber-text)", textTransform: "uppercase" }}>Your fastest lever</div>
              <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)", lineHeight: 1.55 }}>
                A focused lift in <strong>Cognitive &amp; Aptitude</strong> adds roughly <strong>+4 composite points</strong> — enough to reach Band A.
              </p>
            </div>
          </div>
          <a href="#learn/cognitive-aptitude" className="sm:ml-auto shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded-full transition-transform hover:scale-[1.02]" style={{ background: "var(--violet)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: "0 8px 32px rgba(109,86,164,0.3)" }}>
            Start practising <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>

        {/* 4. Destination cards */}
        <div className="mt-10">
          <Eyebrow color="var(--violet)">WHERE TO GO NEXT</Eyebrow>
          <div className="mt-4 grid gap-5 md:grid-cols-3">

            {/* Deep dive */}
            <a href="#results" className="group rounded-[18px] p-6 flex flex-col justify-between transition-colors hover:bg-[var(--surface-2)]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", textDecoration: "none", minHeight: 210 }}>
              <div>
                <span className="flex items-center justify-center rounded-xl mb-4" style={{ width: 40, height: 40, background: "var(--surface-3)" }}>
                  <TrendingUp size={18} color="var(--lime-text)" />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-1)" }}>Deep Dive Analysis</h3>
                <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>
                  Speed-vs-accuracy matrix, sub-topic ranking, and question-level detail.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", letterSpacing: "0.05em", fontWeight: 600 }}>
                OPEN RESULTS <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* Learning path */}
            <a href="#results/skills" className="group rounded-[18px] p-6 flex flex-col justify-between transition-colors hover:bg-[var(--surface-2)]" style={{ background: "linear-gradient(180deg, var(--violet-soft), var(--surface-1))", border: "1px solid var(--violet-border)", textDecoration: "none", minHeight: 210 }}>
              <div>
                <span className="flex items-center justify-center rounded-xl mb-4" style={{ width: 40, height: 40, background: "var(--violet-soft)" }}>
                  <BookOpen size={18} color="var(--violet)" />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-1)" }}>Your Learning Path</h3>
                <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>
                  A curriculum targeting your three biggest bottlenecks.
                </p>
              </div>
              <div className="mt-4 space-y-1.5">
                {["Logical Puzzles Masterclass", "API Design Fundamentals"].map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: "var(--bg-2)" }}>
                    <Play size={11} color="var(--violet)" />
                    <span className="truncate" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </a>

            {/* AI interview */}
            <a href="#results/interview" className="group rounded-[18px] p-6 flex flex-col justify-between transition-colors hover:bg-[var(--surface-2)]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", textDecoration: "none", minHeight: 210 }}>
              <div>
                <span className="flex items-center justify-center rounded-xl mb-4" style={{ width: 40, height: 40, background: "var(--surface-3)" }}>
                  <MessageSquare size={18} color="var(--teal-text)" />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-1)" }}>AI Interview Review</h3>
                <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>
                  Replay your session with Priya — context, clarity, and confidence read-outs.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--teal-text)", letterSpacing: "0.05em", fontWeight: 600 }}>
                WATCH REPLAY <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

          </div>
        </div>

        {/* 5. Retest CTA */}
        <div className="mt-10 rounded-[22px] overflow-hidden relative" style={{ background: "linear-gradient(135deg, var(--surface-1) 0%, var(--surface-2) 100%)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <div className="absolute pointer-events-none" style={{ inset: 0, background: "radial-gradient(55% 80% at 100% 100%, rgba(109,86,164,0.10) 0%, transparent 65%)" }} />
          <Grain />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 p-7 sm:p-10">
            {/* Icon */}
            <div className="shrink-0 flex items-center justify-center rounded-2xl" style={{ width: 64, height: 64, background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
              <Radio size={28} color="var(--violet)" strokeWidth={1.75} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase", fontWeight: 600 }}>
                RETEST AVAILABLE
              </div>
              <h2 className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3.2vw,32px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-1)" }}>
                Want to push for{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>Band A?</span>
              </h2>
              <p className="mt-2 max-w-[520px]" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
                Your score is locked and verified — but your journey isn't over. Retake the JREE after 30 days of focused practice and show employers a measurable improvement.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  ["Cooldown", "30 days"],
                  ["Score history", "Both attempts visible"],
                  ["Certificate", "Best score used"],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <span className="rounded-full shrink-0" style={{ width: 5, height: 5, background: "var(--violet)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)", fontWeight: 600, letterSpacing: "0.04em" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-3 w-full md:w-auto">
              <button
                onClick={() => go("exam/check")}
                className="inline-flex items-center justify-center gap-2 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ height: 52, padding: "0 28px", background: "var(--violet)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, boxShadow: "0 8px 32px rgba(109,86,164,0.35)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
              >
                Retest now <ArrowRight size={17} strokeWidth={2.5} />
              </button>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", textAlign: "center" }}>
                Next eligible: 29 Jun 2026
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Dashboard() {
  // If the hash is exactly #dashboard, render the new zero-state dashboard
  if (window.location.hash === "#dashboard") {
     return <DashboardPage />;
  }

  // Otherwise, render the standard "Before you start" entry screen
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
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>ready.</span>
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

            <div className="flex gap-4">
              <button
                onClick={() => go("exam/check")}
                className="flex-1 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  height: 52, background: "var(--lime)", color: "var(--bg)",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-ui)",
                  boxShadow: "0 8px 32px rgba(201,220,83,0.2)"
                }}
              >
                Begin Exam
              </button>
              
              <button
                onClick={() => go("dashboard")}
                className="flex-1 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  height: 52, background: "transparent", border: "1px solid var(--violet-border)", color: "var(--text-1)",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-ui)"
                }}
              >
                View Dashboard
              </button>
            </div>
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

            <button 
              onClick={() => window.location.hash = "resume-builder"}
              className="relative w-full overflow-hidden group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]" style={{
              background: "linear-gradient(135deg, var(--surface-1) 0%, var(--bg-2) 100%)",
              border: "1px solid rgba(109, 86, 164, 0.3)",
              borderRadius: 20,
              padding: "24px",
              textAlign: "left",
              boxShadow: "var(--shadow-elevated)"
            }}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={48} color="var(--lime)" />
              </div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(201, 220, 83, 0.1)", border: "1px solid rgba(201, 220, 83, 0.2)" }}>
                   <div className="relative">
                      <Save size={20} color="var(--lime)" />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--lime)]"
                      />
                   </div>
                </div>
                
                <div className="flex-1">
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    New Feature
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", marginBottom: 4 }}>
                    AI Resume Builder
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.5, maxWidth: "200px" }}>
                    Generate a verified PDF resume based on your JREE scores.
                  </p>
                </div>
                
                <div className="self-center">
                  <div className="w-8 h-8 rounded-full border border-[var(--hairline-strong)] flex items-center justify-center group-hover:bg-[var(--violet)] group-hover:border-[var(--violet)] transition-all">
                    <ArrowRight size={14} className="text-[var(--text-2)] group-hover:text-[var(--on-violet)] transition-colors" />
                  </div>
                </div>
              </div>

              {/* Decorative pulse line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full"
                  style={{ background: "linear-gradient(90deg, transparent, var(--lime), transparent)" }}
                />
              </div>
            </button>

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
        height: 52, background: "rgba(250,247,240,0.94)",
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
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>ready.</span>
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
          {!allDone && <button onClick={() => window.location.reload()} className="mr-3 rounded-full px-4 py-2" style={{ border: "1px solid var(--violet-border)", color: "var(--violet)", fontSize: 13 }}>Run checks again</button>}
          <button
            disabled={!allDone}
            onClick={() => go("exam/active")}
            className="rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 px-7"
            style={{
              height: 52,
              background: allDone ? "var(--violet)" : "var(--surface-2)",
              color: allDone ? "var(--on-violet)" : "var(--text-3)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
              boxShadow: allDone ? "var(--shadow-card)" : "none",
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
                height: 46, background: "var(--violet)", color: "var(--on-violet)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-body)",
                boxShadow: "var(--shadow-card)",
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
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
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
  { id: "priya",  name: "Priya",  accent: "Neutral Indian",   tone: "Warm",   color: "var(--lime-text)" },
  { id: "arjun",  name: "Arjun",  accent: "Neutral Indian",   tone: "Crisp",  color: "var(--teal-text)" },
  { id: "meera",  name: "Meera",  accent: "South Indian",     tone: "Calm",   color: "var(--violet)" },
  { id: "rohan",  name: "Rohan",  accent: "North Indian",     tone: "Direct", color: "var(--lime-text)" },
  { id: "ananya", name: "Ananya", accent: "Bengali · Indian", tone: "Gentle", color: "var(--teal-text)" },
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
      <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full px-2 py-0.5" style={{ background: "rgba(250,247,240,0.90)", backdropFilter: "blur(8px)" }}>
        <span className="rounded-full" style={{ width: 5, height: 5, background: "var(--danger)" }} />
        <Mono color="var(--text-1)" size="var(--fs-mono-xs)">YOU</Mono>
      </div>
      {muted && (
        <div className="absolute bottom-2 right-2 rounded-full flex items-center gap-1 px-2 py-0.5" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
          <Mono color="var(--amber-text)" size="var(--fs-mono-xs)">MUTED</Mono>
        </div>
      )}
    </div>
  );
}

type AiPalette = { skin: string; skinShade: string; hair: string; blazer: string; blazerDark: string; accent: string; bg1: string; bg2: string };
const PALETTES: Record<AiId, AiPalette> = {
  priya:  { skin: "#E8C9A8", skinShade: "#C9A582", hair: "#1A0F1F", blazer: "#6D56A4", blazerDark: "#4C1D95", accent: "#C9DC53", bg1: "rgba(109,86,164,0.12)", bg2: "var(--bg)" },
  arjun:  { skin: "#D4A574", skinShade: "#B6885A", hair: "#0F0A14", blazer: "#0F766E", blazerDark: "#134E4A", accent: "#51C1B5", bg1: "rgba(15,118,110,0.10)", bg2: "var(--bg)" },
  meera:  { skin: "#C99775", skinShade: "#A77A5A", hair: "#0B0710", blazer: "#5B21B6", blazerDark: "#3B0F73", accent: "#C9DC53", bg1: "rgba(91,33,182,0.10)", bg2: "var(--bg)" },
  rohan:  { skin: "#E0B58A", skinShade: "#BF9268", hair: "#15090B", blazer: "#15803D", blazerDark: "#14532D", accent: "#C9DC53", bg1: "rgba(21,128,61,0.10)", bg2: "var(--bg)" },
  ananya: { skin: "#D9AA85", skinShade: "#B98966", hair: "#100712", blazer: "#0E7490", blazerDark: "#155E75", accent: "#51C1B5", bg1: "rgba(14,116,144,0.10)", bg2: "var(--bg)" },
  vikram: { skin: "#CFA079", skinShade: "#AE825A", hair: "#0D080E", blazer: "#6D28D9", blazerDark: "#3B0F73", accent: "#C9DC53", bg1: "rgba(109,40,217,0.10)", bg2: "var(--bg)" },
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
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
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
        <ellipse cx="98" cy="112" rx="2.2" ry="2.8" fill="var(--text-1)" />
        <ellipse cx="122" cy="112" rx="2.2" ry="2.8" fill="var(--text-1)" />
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
      background: `radial-gradient(120% 80% at 50% 0%, ${p.bg1} 0%, ${p.bg2} 70%, var(--bg) 100%)`,
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
      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2 py-1" style={{ background: "rgba(250,247,240,0.86)", backdropFilter: "blur(8px)", border: "1px solid var(--hairline)" }}>
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
                height: 46, background: "var(--violet)", color: "var(--on-violet)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-body)",
                boxShadow: "var(--shadow-card)",
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
  // micro-copy that crossfades in sequence — real analysis, not a fake wait
  const captions = [
    "Scoring your responses…",
    "Mapping your strengths…",
    "Matching roles that fit…",
  ];
  const BUILD_MS = 4600;
  const [cap, setCap] = useState(0);
  const [progress, setProgress] = useState(0);
  const [allDone, setAllDone] = useState(false);

  // radar draw progress + caption rotation
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / BUILD_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      setCap(Math.min(captions.length - 1, Math.floor(t * captions.length)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setAllDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // the shape the loader completes into — same axes as Score Breakdown
  const axes = [
    { label: "Interview", value: 77 }, { label: "Comms", value: 75 },
    { label: "Cognitive", value: 70 }, { label: "Domain", value: 68 },
    { label: "Practical", value: 72 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[520px] w-full">
        <div className="text-center mb-8">
          {/* Radar building itself live — foreshadows the Score Breakdown chart */}
          <motion.div
            className="relative mx-auto mb-8 flex items-center justify-center"
            animate={allDone ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.6, ease }}
            style={{ width: 300, height: 300 }}
          >
            {/* radar sweep */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: allDone ? 0 : Infinity, ease: "linear" }}
              style={{
                width: 232, height: 232,
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(201,220,83,0.18) 40deg, transparent 60deg)",
                borderRadius: "50%",
              }}
            />
            <RadarChart axes={axes} size={280} draw progress={progress} />
          </motion.div>

          <div className="h-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {captions[cap]}
              </motion.div>
            </AnimatePresence>
          </div>

          <h1 className="mt-5" style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-display-sm)", lineHeight: "var(--lh-snug)",
            color: "var(--text-1)",
          }}>
            Building your{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>profile.</span>
          </h1>
        </div>

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
                    height: 54, background: "var(--violet)", color: "var(--on-violet)",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
                    boxShadow: "var(--shadow-elevated)",
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

/* Journey path — editorial trail showing student's position relative to band thresholds */
function JourneyPath({ score, displayScore, phase }: { score: number, displayScore: number, phase: number }) {
  const waypoints = [
    { label: "D", at: 0, desc: "Start" },
    { label: "C", at: 35, desc: "Band C" },
    { label: "B", at: 55, desc: "Band B" },
    { label: "A", at: 75, desc: "Band A" },
  ];

  // We map 0-100 score to x: 5% -> 95%, y: 95% -> 5%
  const getX = (val: number) => 5 + (val / 100) * 90;
  const getY = (val: number) => 95 - (val / 100) * 90;

  return (
    <div className="relative mb-6 mt-8" style={{ height: 140 }}>
      {/* Ascending dotted path */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line
          x1="5%" y1="95%" x2="95%" y2="5%"
          stroke="var(--hairline-strong)" strokeWidth="2" strokeDasharray="6 6"
        />
        {/* Filled trail behind marker */}
        <line
          x1="5%" y1="95%" x2={`${getX(displayScore)}%`} y2={`${getY(displayScore)}%`}
          stroke="var(--lime)" strokeWidth="2"
        />
      </svg>

      {/* Waypoint markers */}
      {waypoints.map((w) => {
        const passed = displayScore >= w.at;
        return (
          <div
            key={w.label}
            className="absolute flex flex-col items-center"
            style={{
              left: `${getX(w.at)}%`,
              top: `${getY(w.at)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="rounded-full" style={{
              width: 12, height: 12,
              background: passed ? "var(--lime)" : "var(--surface-2)",
              border: `2px solid ${passed ? "var(--lime)" : "var(--hairline-strong)"}`,
              transition: "all 0.3s ease",
            }} />
            <div className="absolute top-full mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: passed ? "var(--text-2)" : "var(--text-3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              {w.desc.toUpperCase()}
            </div>
          </div>
        );
      })}

      {/* Student marker */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${getX(displayScore)}%`,
          top: `${getY(displayScore)}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          animate={phase >= 2 ? { boxShadow: ["0 0 0px rgba(201,220,83,0)", "0 0 16px rgba(201,220,83,0.8)", "0 0 10px rgba(201,220,83,0.5)"] } : {}}
          transition={{ duration: 1, delay: 0, times: [0, 0.5, 1] }}
          style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--lime)", border: "3px solid var(--bg)" }}
        />
        <div className="absolute bottom-full mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", whiteSpace: "nowrap", letterSpacing: "0.07em", fontWeight: 700 }}>
          YOU · {displayScore}
        </div>
      </div>

      {/* "2 pts to Band A" callout — close to A threshold */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute"
        style={{
          left: `${getX(75)}%`,
          top: `${getY(75)}%`,
          transform: "translate(-50%, -180%)",
        }}
      >
        <div className="rounded-full px-2.5 py-1 whitespace-nowrap shadow-lg" style={{ background: "rgba(201,220,83,0.15)", border: "1px solid var(--lime-border)", boxShadow: "var(--shadow-card)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.05em", fontWeight: 600 }}>2 pts to Band A</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────── Results: Compact Score ─────────────── */
function CompactScore({ displayScore, percentile, band, phase }: { displayScore: number, percentile: number, band: string, phase: number }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glowing core, very compact */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: 88, height: 88 }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: ["0 0 16px rgba(201,220,83,0.15)", "0 0 32px rgba(201,220,83,0.3)", "0 0 16px rgba(201,220,83,0.15)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(201,220,83,0.2) 0%, transparent 70%)" }}
        />
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, color: "var(--lime-text)", letterSpacing: "-0.04em", textShadow: "none", position: "relative", zIndex: 10 }}>
          {displayScore}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            Band {band}
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(201,220,83,0.1)", border: "1px solid rgba(201,220,83,0.2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--lime)", display: "inline-block", boxShadow: "none" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Interview-Ready</span>
          </span>
        </div>
        <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
          You scored higher than <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>{percentile}%</strong> of candidates in Computer Science.
        </p>
      </div>
    </motion.div>
  );
}
function SignalMeter({ score, displayScore, percentile, band, phase }: { score: number, displayScore: number, percentile: number, band: string, phase: number }) {
  const layers = [
    { name: "Aptitude", score: 82, color: "var(--lime-text)" },
    { name: "Comm", score: 88, color: "var(--lime-text)" },
    { name: "Domain", score: 71, color: "var(--teal-text)" },
    { name: "Practical", score: 79, color: "var(--lime-text)" },
    { name: "Interview", score: 84, color: "var(--lime-text)" },
    { name: "Reflect", score: 64, color: "var(--amber-text)" },
  ];

  // Determine the status text based on the phase and score completion
  let statusText = "Calibrating...";
  if (phase >= 2 && displayScore > 0) {
    statusText = displayScore === score ? "Strong Signal." : "Reading...";
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-3xl mt-2 mb-8" style={{ height: 420, background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline)", boxShadow: "var(--shadow-card)" }}>
      {/* Status text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: displayScore === score ? "var(--lime-text)" : "var(--text-3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, transition: "color 0.3s ease" }}
      >
        {statusText}
      </motion.div>

      {/* Large Score */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 110, color: "var(--text-1)", lineHeight: 1, letterSpacing: "-0.04em", textShadow: "none", transition: "text-shadow 0.4s ease" }}>
          {displayScore}
        </div>
      </motion.div>

      {/* EQ Bars */}
      <div className="flex items-end gap-3 mt-8 relative z-20" style={{ height: 100 }}>
        {layers.map((l, i) => {
          // If not yet phase 2, bounce randomly. Once phase 2 starts, animate to final score height.
          const isSettling = phase >= 2;
          const finalHeight = `${l.score}%`;

          return (
            <div key={l.name} className="flex flex-col items-center gap-3">
              <div className="rounded-full overflow-hidden flex items-end justify-center" style={{ width: 12, height: 100, background: "var(--surface-3)" }}>
                <motion.div
                  className="w-full rounded-full"
                  style={{ background: l.color, boxShadow: `0 0 12px ${l.color}80` }}
                  initial={{ height: "0%" }}
                  animate={
                    isSettling
                      ? { height: finalHeight }
                      : { height: phase >= 1 ? ["20%", "70%", "30%", "90%", "40%"] : "0%" }
                  }
                  transition={
                    isSettling
                      ? { type: "spring", bounce: 0.5, duration: 1.5, delay: i * 0.1 }
                      : { duration: 1.2 + i * 0.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                  }
                />
              </div>
              {/* Very tiny label below bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSettling && displayScore === score ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.05em" }}
              >
                {l.name.substring(0, 3).toUpperCase()}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Floating Labels mapping to the original glowing core's labels */}
      <motion.div
        className="absolute z-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 10 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{ top: 24, right: 32 }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "rgba(201,220,83,0.1)", border: "1px solid rgba(201,220,83,0.25)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--lime)", display: "inline-block", boxShadow: "none" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "var(--lime-text)", letterSpacing: "0.08em" }}>BAND {band}</span>
        </span>
      </motion.div>

      <motion.div
        className="absolute z-20 flex flex-col items-end text-right max-w-[200px]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, x: phase >= 3 ? 0 : -10 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{ bottom: 32, left: 32 }}
      >
        <div className="flex items-baseline justify-end gap-1">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            {percentile}<span style={{ fontSize: 14 }}>th</span>
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)", marginTop: 2, lineHeight: 1.4 }}>
          Percentile
        </div>
      </motion.div>
    </div>
  );
}
function LayerConstellation({ phase, displayScore }: { phase: number, displayScore: number }) {
  const layers = [
    { name: "Communication", score: 88, strongest: true,  color: "var(--lime-text)" },
    { name: "Interview",     score: 84, strongest: false, color: "var(--lime-text)" },
    { name: "Aptitude",      score: 82, strongest: false, color: "var(--lime-text)" },
    { name: "Practical",     score: 79, strongest: false, color: "var(--teal-text)" },
    { name: "Domain",        score: 71, strongest: false, color: "var(--teal-text)" },
    { name: "Reflection",    score: 64, strongest: false, color: "var(--amber-text)", weakest: true },
  ];

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center rounded-2xl" style={{ height: 560, background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline)" }}>
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(109,86,164,0.12) 0%, transparent 65%)" }} />

      {/* Atmospheric Starfield / Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() > 0.8 ? 2 : 1,
              height: Math.random() > 0.8 ? 2 : 1,
              background: "var(--text-3)",
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Outer Orbit Marks (Atmospheric detail) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--hairline-strong)] opacity-20 pointer-events-none" style={{ width: 440, height: 440 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--hairline-strong)] opacity-10 pointer-events-none" style={{ width: 500, height: 500 }} />

      {/* Axis crosshairs */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--hairline)] opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--hairline)] opacity-30 pointer-events-none" />

      {/* Orbit Rings */}
      {layers.map((_, i) => {
        const r = 90 + i * 32;
        return (
          <motion.div
            key={`ring-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full border border-[var(--hairline)]"
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: phase >= 2 ? 0.4 : 0, scale: phase >= 2 ? 1 : 0.8, x: "-50%", y: "-50%" }}
            transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
            style={{ width: r * 2, height: r * 2 }}
          />
        );
      })}

      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-10 flex flex-col items-center justify-center rounded-full"
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.8, ease: "backOut" }}
        style={{
          width: 100, height: 100,
          background: "var(--surface-3)",
          border: "2px solid var(--violet)",
          boxShadow: "0 0 40px rgba(109,86,164,0.4), inset 0 0 20px rgba(109,86,164,0.3)"
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)", letterSpacing: "0.05em", marginBottom: 2 }}>CORE</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "var(--text-1)", lineHeight: 1 }}>{displayScore}</span>
      </motion.div>

      {/* Nodes */}
      {layers.map((l, i) => {
        const r = 90 + i * 32;
        const size = l.strongest ? 56 : Math.max(32, 52 - i * 4);
        const speed = 35 + i * 15;
        const startAngle = i * (360 / layers.length) + (i * 20);

        return (
          <motion.div
            key={l.name}
            className="absolute top-1/2 left-1/2"
            initial={{ opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: phase >= 2 ? 1 : 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
            style={{ width: 0, height: 0 }}
          >
            <motion.div
              initial={{ rotate: startAngle }}
              animate={{ rotate: startAngle + 360 }}
              transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0"
            >
              <div style={{ transform: `translateX(${r}px)`, position: "absolute", top: 0, left: 0 }}>
                {/* Counter-rotation to keep node text upright */}
                <motion.div
                  initial={{ rotate: -startAngle }}
                  animate={{ rotate: -(startAngle + 360) }}
                  transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col items-center justify-center relative group cursor-default"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  {/* Glow behind strongest */}
                  {l.strongest && (
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: l.color, filter: "blur(12px)", opacity: 0.5, transform: "scale(1.4)" }} />
                  )}

                  <div
                    className="flex flex-col items-center justify-center rounded-full relative z-10 transition-transform hover:scale-110"
                    style={{
                      width: size, height: size,
                      background: l.strongest ? l.color : "var(--surface-3)",
                      border: `2px solid ${l.color}`,
                      boxShadow: l.strongest ? `0 0 20px ${l.color}66` : "none",
                      color: l.strongest ? "var(--bg)" : "var(--text-1)"
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: l.strongest ? 800 : 700, fontSize: size * 0.4, lineHeight: 1 }}>{l.score}</span>
                  </div>

                  {/* Label tooltip (always visible or on hover, let's keep it visible for clarity) */}
                  <div className="absolute top-full mt-2 flex flex-col items-center text-center">
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--text-1)", whiteSpace: "nowrap" }}>
                      {l.name}
                    </span>
                    {l.strongest && <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: l.color, letterSpacing: "0.05em", marginTop: 2 }}>STRONGEST</span>}
                    {l.weakest && <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: l.color, letterSpacing: "0.05em", marginTop: 2 }}>GROWTH</span>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────── Shared results motif: ScoreRing ─────────────── */
/* One visual language for "score", reused across every tab. */
function ScoreRing({
  value, size = 96, stroke = 8, color = "var(--lime)", track = "var(--surface-3)",
  label, delay = 0, children,
}: {
  value: number; size?: number; stroke?: number; color?: string; track?: string;
  label?: string; delay?: number; children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.1, delay, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ?? (
          <>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.3, color: "var(--text-1)", lineHeight: 1 }}>{value}</span>
            {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.06em", marginTop: 2 }}>{label}</span>}
          </>
        )}
      </div>
    </div>
  );
}

/* Tiny inline ring for compact cards */
function MiniRing({ value, size = 40, color = "var(--lime)" }: { value: number; size?: number; color?: string }) {
  const stroke = 4; const r = (size - stroke) / 2; const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 0.9, ease }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "var(--font-mono)", fontSize: size * 0.28, fontWeight: 600, color: "var(--text-1)" }}>{value}</div>
    </div>
  );
}

/* ─────────────── Shared results motif: RadarChart ─────────────── */
function RadarChart({
  axes, size = 300, highlight, onHover, draw = false, progress = 1,
}: {
  axes: { label: string; value: number; color?: string }[];
  size?: number; highlight?: number | null;
  onHover?: (i: number | null) => void;
  draw?: boolean; progress?: number;
}) {
  const cx = size / 2, cy = size / 2;
  const radius = size / 2 - 44;
  const n = axes.length;
  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, val: number) => {
    const a = angleFor(i);
    const rr = (val / 100) * radius;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
  };
  const rings = [25, 50, 75, 100];
  const dataPts = axes.map((ax, i) => point(i, ax.value * progress));
  const dataPath = dataPts.map((p) => p.join(",")).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", overflow: "visible" }}>
      {/* concentric grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none" stroke="var(--hairline-strong)" strokeWidth={1}
          opacity={ring === 100 ? 0.5 : 0.22}
        />
      ))}
      {/* axis spokes + nodes */}
      {axes.map((ax, i) => {
        const [ex, ey] = point(i, 100);
        const [lx, ly] = point(i, 118);
        const active = highlight === i;
        return (
          <g key={ax.label}>
            <motion.line
              x1={cx} y1={cy} x2={ex} y2={ey}
              stroke="var(--hairline-strong)" strokeWidth={1}
              initial={draw ? { pathLength: 0, opacity: 0 } : false}
              animate={draw ? { pathLength: 1, opacity: 0.4 } : { opacity: active ? 0.7 : 0.4 }}
              transition={{ duration: 0.5, delay: draw ? i * 0.12 : 0, ease }}
            />
            <motion.circle
              cx={ex} cy={ey} r={active ? 4 : 2.5}
              fill={active ? "var(--lime)" : "var(--text-3)"}
              initial={draw ? { scale: 0 } : false}
              animate={draw ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.3, delay: draw ? 0.4 + i * 0.12 : 0 }}
            />
            <text
              x={lx} y={ly}
              textAnchor={Math.abs(lx - cx) < 6 ? "middle" : lx > cx ? "start" : "end"}
              dominantBaseline="middle"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9.5,
                letterSpacing: "0.03em",
                fill: active ? "var(--lime-text)" : "var(--text-3)",
                cursor: onHover ? "pointer" : "default",
              }}
              onMouseEnter={() => onHover?.(i)}
              onMouseLeave={() => onHover?.(null)}
            >
              {ax.label}
            </text>
          </g>
        );
      })}
      {/* data polygon */}
      <motion.polygon
        points={dataPath}
        fill="rgba(201,220,83,0.14)"
        stroke="var(--lime)" strokeWidth={2} strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: draw ? 1.1 : 0.2 }}
      />
      {/* data vertices */}
      {dataPts.map(([px, py], i) => (
        <motion.circle
          key={i} cx={px} cy={py} r={highlight === i ? 6 : 4}
          fill="var(--lime)" stroke="var(--bg)" strokeWidth={2}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: (draw ? 1.2 : 0.3) + i * 0.05 }}
          style={{ cursor: onHover ? "pointer" : "default" }}
          onMouseEnter={() => onHover?.(i)}
          onMouseLeave={() => onHover?.(null)}
        />
      ))}
    </svg>
  );
}

function Results() {
  type Tab = "breakdown" | "skills" | "interview" | "cert";
  const readTab = (): Tab => {
    const value = window.location.hash.replace(/^#results\/?/, "");
    return (["skills", "interview", "cert"].includes(value) ? value : "breakdown") as Tab;
  };
  const [tab, setTab] = useState<Tab>(readTab);
  const tabs: { id: Tab; label: string }[] = [
    { id: "breakdown", label: "Score Breakdown" },
    { id: "skills", label: "Skills & Roles" },
    { id: "interview", label: "AI Interview" },
    { id: "cert", label: "Certificate" },
  ];

  // Tabs are managed in local state so switching never re-triggers app-level
  // hash routing (which was bouncing users back to the landing page). We still
  // honour an incoming deep link on mount / when the results route reloads.
  useEffect(() => {
    const sync = () => { if (window.location.hash.startsWith("#results")) setTab(readTab()); };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const chooseTab = (id: Tab) => setTab(id);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <DashboardNav />
      <main className="max-w-[1160px] mx-auto px-5 sm:px-8 md:px-[72px] pt-[100px] pb-24">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow color="var(--violet)">Latest assessment · 29 May 2026</Eyebrow>
          <span style={{ color: "var(--text-3)" }}>·</span>
          <Mono color="var(--text-3)" size="var(--fs-mono-xs)">JREE-2026-RS-0427</Mono>
        </div>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center" style={{ borderBottom: "1px solid var(--hairline-strong)", paddingBottom: 28 }}>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "var(--text-2)" }}>You have a strong platform to build on.</p>
            <h1 className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(38px,5vw,62px)", letterSpacing: "-0.035em", lineHeight: .98, color: "var(--text-1)" }}>Your latest <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", color: "var(--lime-text)" }}>result.</span></h1>
          </div>

          {/* Hero stat panel — composite ring · band scale · percentile curve */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-[22px] grid grid-cols-1 sm:grid-cols-[auto_1px_1fr]"
            style={{ background: "linear-gradient(135deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-elevated)" }}
          >
            {/* ambient glow */}
            <div className="absolute pointer-events-none" style={{ inset: 0, background: "radial-gradient(70% 90% at 12% 0%, rgba(201,220,83,0.12) 0%, transparent 60%)" }} />

            {/* Composite ring */}
            <div className="relative flex items-center gap-4 px-6 py-6">
              <ScoreRing value={73} size={92} stroke={9} color="var(--lime)">
                <div className="flex flex-col items-center leading-none">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--text-1)" }}>73</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", marginTop: 2 }}>/100</span>
                </div>
              </ScoreRing>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>COMPOSITE</div>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(201,220,83,.1)", border: "1px solid var(--lime-border)" }}>
                  <span className="rounded-full" style={{ width: 6, height: 6, background: "var(--lime)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 10, color: "var(--lime-text)", letterSpacing: ".05em" }}>LOCKED · VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" style={{ background: "var(--hairline-strong)" }} />

            {/* Band scale + percentile curve */}
            <div className="relative px-8 py-8 flex flex-col justify-center gap-8" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
              {/* Band A–D scale with current marker */}
              <div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>EMPLOYABILITY</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)" }}>55–74 · one band from A</span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  {([
                    { b: "D", r: "0–34" },
                    { b: "C", r: "35–54" },
                    { b: "B", r: "55–74" },
                    { b: "A", r: "75+" },
                  ] as const).map(({ b, r }, i) => {
                    const on = b === "B";
                    return (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06, ease }}
                        className="flex-1 rounded-lg flex flex-col items-center justify-center"
                        style={{
                          height: 52,
                          background: on ? "var(--violet)" : "var(--surface-3)",
                          border: `1px solid ${on ? "var(--violet)" : "var(--hairline-strong)"}`,
                          boxShadow: on ? "0 6px 18px rgba(109,86,164,.4)" : "none",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: on ? 22 : 16, color: on ? "var(--on-violet)" : "var(--text-3)", lineHeight: 1 }}>{b}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: on ? "rgba(255,255,255,0.75)" : "var(--text-3)", marginTop: 3 }}>{r}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Percentile bell curve */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>NATIONAL</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-1)" }}>77<span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 11, color: "var(--text-2)" }}>th pct</span></span>
                </div>
                <div className="relative mt-4" style={{ height: 44 }}>
                  <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="pctfill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--lime)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 28 C 30 28, 40 4, 60 4 C 80 4, 90 28, 120 28" fill="none" stroke="var(--hairline-strong)" strokeWidth="1.5" />
                    {/* filled area up to 77th percentile (x ≈ 92.4) */}
                    <path d="M0 28 C 30 28, 40 4, 60 4 C 76 4, 84 20, 92.4 24 L 92.4 28 Z" fill="url(#pctfill)" />
                    <line x1="92.4" y1="2" x2="92.4" y2="30" stroke="var(--lime)" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                  <motion.div className="absolute -translate-x-1/2 rounded-full" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 15 }}
                    style={{ left: "77%", top: 24, width: 10, height: 10, background: "var(--lime)", border: "2px solid var(--surface-1)", boxShadow: "0 0 10px rgba(201,220,83,.7)" }} />
                </div>
                <span className="mt-3 block" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: ".04em" }}>Top 23% of CS candidates</span>
              </div>
            </div>
          </motion.div>
        </div>

        <nav className="mt-7 flex gap-1 overflow-x-auto border-b" style={{ borderColor: "var(--hairline-strong)" }} aria-label="Results sections">
          {tabs.map((item) => <button key={item.id} onClick={() => chooseTab(item.id)} className="shrink-0 px-4 pb-3 transition-colors" style={{ fontFamily: "var(--font-body)", fontWeight: tab === item.id ? 700 : 500, fontSize: 14, color: tab === item.id ? "var(--violet)" : "var(--text-2)", borderBottom: tab === item.id ? "2px solid var(--violet)" : "2px solid transparent" }}>{item.label}</button>)}
        </nav>
        <div className="mt-9">
          {tab === "breakdown" && <ResultsBreakdown />}
          {tab === "skills" && <ResultsSkillsRoles />}
          {tab === "interview" && <ResultsInterview />}
          {tab === "cert" && <ResultsCertificate />}
        </div>
      </main>
    </div>
  );
}

/* ─────────────── Results: Tab — Score Breakdown ─────────────── */
/* Segmented battery-style bar with a benchmark (band-ready) marker. */
function SegmentedBar({ score, benchmark, color, delay = 0 }: { score: number; benchmark: number; color: string; delay?: number }) {
  const segs = 10;
  const filled = score / 10;
  return (
    <div className="relative">
      <div className="flex gap-1">
        {Array.from({ length: segs }).map((_, i) => {
          const on = i < Math.floor(filled);
          const partial = i === Math.floor(filled) ? filled - Math.floor(filled) : 0;
          return (
            <div key={i} className="relative flex-1 overflow-hidden rounded-[3px]" style={{ height: 14, background: "var(--bg-2)" }}>
              <motion.div className="absolute inset-y-0 left-0" initial={{ width: 0 }} animate={{ width: on ? "100%" : partial > 0 ? `${partial * 100}%` : 0 }} transition={{ duration: 0.4, delay: delay + i * 0.04, ease }} style={{ background: color }} />
            </div>
          );
        })}
      </div>
      {/* benchmark marker */}
      <div className="absolute -top-1.5 -bottom-1.5" style={{ left: `${benchmark}%`, borderLeft: "2px dashed var(--text-3)" }}>
        <span className="absolute -top-4 -translate-x-1/2 whitespace-nowrap" style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.04em" }}>READY · {benchmark}</span>
      </div>
    </div>
  );
}

function ResultsBreakdown() {
  const READY = 75; // band-ready threshold
  const layers = [
    { name: "AI Interview", short: "Interview", score: 77, weight: 25, detail: "Clear examples and a composed delivery.", contribution: "19.3 pts", color: "var(--teal)", key: "ai-interview", strength: true },
    { name: "Communication", short: "Comms", score: 75, weight: 20, detail: "You make your thinking easy to follow.", contribution: "15.0 pts", color: "var(--violet)", key: "communication" },
    { name: "Cognitive & Aptitude", short: "Cognitive", score: 70, weight: 25, detail: "The fastest route to your next band.", contribution: "17.5 pts", color: "var(--amber)", key: "cognitive-aptitude", lever: true },
    { name: "Domain Knowledge", short: "Domain", score: 68, weight: 20, detail: "A focused refresh will make this dependable.", contribution: "13.6 pts", color: "var(--violet)", key: "domain-knowledge" },
    { name: "Work Readiness", short: "Practical", score: 72, weight: 10, detail: "Good practical signals across the essentials.", contribution: "7.2 pts", color: "var(--lime-text)", key: "work-readiness" },
  ];
  const [hover, setHover] = useState<number | null>(null);
  const axes = layers.map((l) => ({ label: l.short, value: l.score }));

  return <div className="max-w-[940px]">
    <Eyebrow color="var(--violet)">THE CLIMB, NOT THE VERDICT</Eyebrow>
    <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,46px)", letterSpacing: "-0.03em", color: "var(--text-1)", lineHeight: 1.04 }}>Your standout is AI Interview. Your fastest lift is <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--amber-text)" }}>Cognitive & Aptitude.</span></h2>

    {/* Zone A — at-a-glance radar + composite ring */}
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-[18px] p-5 flex items-center justify-center" style={{ background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
        <RadarChart axes={axes} size={320} highlight={hover} onHover={setHover} />
      </div>
      <div className="rounded-[18px] p-6 flex flex-col justify-center gap-5" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-5">
          <ScoreRing value={73} size={104} color="var(--lime)" label="/ 100" />
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>COMPOSITE · BAND B</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--text-1)", lineHeight: 1.1 }}>73<span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-3)" }}>/100</span></div>
            <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>77th national percentile</div>
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
          <div className="flex items-start gap-2.5">
            <Zap size={16} color="var(--amber-text)" className="mt-0.5 shrink-0" />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-1)", lineHeight: 1.55 }}>
              Your biggest lever right now is <strong>Cognitive & Aptitude</strong> — a focused lift here adds roughly <strong>+4 composite points</strong> and moves you closer to Band A.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Zone B/C — layer detail with benchmark, hover-linked to radar */}
    <div className="mt-8 space-y-3">
      {layers.map((layer, index) => {
        const active = hover === index;
        const gap = Math.max(0, READY - layer.score);
        return <div key={layer.name} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} className="rounded-[16px] p-5 sm:p-6 transition-colors" style={{ background: active ? "var(--surface-2)" : "var(--surface-1)", border: `1px solid ${active ? "var(--violet-border)" : "var(--hairline-strong)"}`, boxShadow: "var(--shadow-card)" }}>
          <div className="grid gap-5 md:grid-cols-[minmax(180px,.9fr)_minmax(250px,1.6fr)_120px] md:items-center">
            <div className="flex items-center gap-3">
              <MiniRing value={layer.score} size={44} color={layer.color} />
              <div>
                <div className="flex flex-wrap items-center gap-2"><h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)" }}>{layer.name}</h3>{layer.strength && <span className="rounded-full px-2 py-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--teal-text)", background: "rgba(81,193,181,.12)" }}>STRENGTH</span>}{layer.lever && <span className="rounded-full px-2 py-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--amber-text)", background: "var(--amber-soft)" }}>START HERE</span>}</div>
                <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>{layer.detail}</p>
              </div>
            </div>
            <div>
              <SegmentedBar score={layer.score} benchmark={READY} color={layer.color} delay={index * 0.06} />
              <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: gap > 0 ? "var(--amber-text)" : "var(--teal-text)" }}>
                {gap > 0 ? `${gap} pts to role-ready` : "Role-ready ✓"} · {layer.weight}% weight · {layer.contribution}
              </div>
            </div>
            <div className="md:text-right"><a href={`#learn/${layer.key}`} className="inline-flex items-center gap-1 rounded-full px-3 py-2 transition-colors hover:bg-[var(--violet-soft)]" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, color: "var(--violet)", textDecoration: "none" }}>Practice <ArrowRight size={14} /></a></div>
          </div>
        </div>;
      })}
    </div>

    {/* Zone D — Deep dive on the fastest lever */}
    <DeepDive />

    {/* Zone E — Critical Gap Analysis & Pacing */}
    <PacingAnalysis />
  </div>;
}

/* Detailed analysis for the fastest-lift layer: sub-topic ranking + question mix. */
function DeepDive() {
  const PAL = { lime: "#C9DC53", amber: "#D97706", teal: "#51C1B5", violet: "#6D56A4", muted: "#948AAB" };
  // sub-topics ranked strongest → weakest
  const subtopics = [
    { name: "Decision speed", score: 61 },
    { name: "Numerical", score: 60 },
    { name: "Data interp.", score: 58 },
    { name: "Pattern recog.", score: 54 },
    { name: "Logical puzzles", score: 49 },
  ].sort((a, b) => b.score - a.score);
  const barColor = (v: number) => (v >= 60 ? PAL.teal : v >= 55 ? PAL.amber : PAL.violet);

  // how the questions were distributed across sub-topics (explains the score)
  const mix = [
    { name: "Numerical", value: 8, color: PAL.violet },
    { name: "Pattern recog.", value: 6, color: PAL.amber },
    { name: "Logical puzzles", value: 5, color: PAL.lime },
    { name: "Data interp.", value: 4, color: PAL.teal },
    { name: "Decision speed", value: 3, color: PAL.muted },
  ];
  const totalQ = mix.reduce((s, m) => s + m.value, 0);

  return (
    <div className="mt-10">
      <Eyebrow color="var(--amber-text)">DEEP DIVE · COGNITIVE & APTITUDE</Eyebrow>
      <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", letterSpacing: "-0.02em", color: "var(--text-1)" }}>
        Where the points are hiding.
      </h3>
      <p className="mt-2 max-w-[65ch]" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
        This is your fastest lever. The ranking shows which sub-topics to practise first; the mix shows why the score landed where it did.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Sub-topic ranking — horizontal bar chart */}
        <div className="rounded-[16px] p-5 sm:p-6" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>SUB-TOPIC RANKING · 0–100</div>
            <span className="rounded-full px-2 py-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--amber-text)", background: "var(--amber-soft)" }}>START LOWEST</span>
          </div>
          <div className="mt-4" style={{ width: "100%", height: 230 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subtopics} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 4 }} barCategoryGap={10}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" width={104} tickLine={false} axisLine={false}
                  tick={{ fill: "var(--text-2)", fontSize: 12, fontFamily: "var(--font-body)" }} />
                <Tooltip cursor={{ fill: "rgba(148,138,171,0.08)" }}
                  contentStyle={{ background: "var(--surface-3)", border: "1px solid var(--hairline-strong)", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)" }}
                  labelStyle={{ color: "var(--text-2)" }} formatter={(v: number) => [`${v}/100`, "Score"]} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} isAnimationActive>
                  {subtopics.map((s) => <Cell key={s.name} fill={barColor(s.score)} />)}
                  <LabelList dataKey="score" position="right" style={{ fill: "var(--text-2)", fontSize: 11, fontFamily: "var(--font-mono)" }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question distribution — donut */}
        <div className="rounded-[16px] p-5 sm:p-6" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>QUESTION MIX · {totalQ} ASKED</div>
          <div className="mt-2 flex items-center gap-2">
            <div style={{ width: 150, height: 150 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mix} dataKey="value" nameKey="name" innerRadius={42} outerRadius={68} paddingAngle={2} stroke="none">
                    {mix.map((m) => <Cell key={m.name} fill={m.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--surface-3)", border: "1px solid var(--hairline-strong)", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)" }}
                    formatter={(v: number, n) => [`${v} questions`, n]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {mix.map((m) => (
                <div key={m.name} className="flex items-center gap-2">
                  <span className="rounded-full shrink-0" style={{ width: 8, height: 8, background: m.color }} />
                  <span className="flex-1 truncate" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>{m.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>{Math.round((m.value / totalQ) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto analysis */}
      <div className="mt-5 rounded-[16px] p-5 flex items-start gap-3" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
        <Lightbulb size={18} color="var(--amber-text)" className="mt-0.5 shrink-0" />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)", lineHeight: 1.6 }}>
          Your lowest sub-topic, <strong>Logical puzzles (49)</strong>, only made up <strong>19%</strong> of questions — so a focused week here is low-effort, high-return. Numerical reasoning carried the most weight ({Math.round((8 / totalQ) * 100)}% of questions) and you held steady there, which is why the layer isn't lower. Lift the bottom two sub-topics past 60 and this layer clears the role-ready line on its own.
        </p>
      </div>
    </div>
  );
}

/* Critical insight into pacing and test-taking strategy. */
function PacingAnalysis() {
  const PAL = { lime: "#C9DC53", amber: "#D97706", teal: "#51C1B5", violet: "#6D56A4", muted: "#948AAB", danger: "#F87171" };
  
  // Data for Speed vs Accuracy
  const data = [
    // Rushing (Fast, Low Score)
    { id: "Q12", time: 18, score: 20, topic: "Pattern recog." },
    { id: "Q14", time: 22, score: 10, topic: "Logical puzzles" },
    { id: "Q15", time: 15, score: 0, topic: "Logical puzzles" },
    // Mastered (Fast, High Score)
    { id: "Q1", time: 28, score: 100, topic: "Numerical" },
    { id: "Q2", time: 35, score: 90, topic: "Numerical" },
    { id: "Q4", time: 40, score: 100, topic: "Decision speed" },
    // Careful (Slow, High Score)
    { id: "Q8", time: 95, score: 85, topic: "Data interp." },
    { id: "Q9", time: 110, score: 100, topic: "Numerical" },
    // Struggling (Slow, Low Score)
    { id: "Q18", time: 105, score: 30, topic: "Logical puzzles" },
    { id: "Q20", time: 125, score: 20, topic: "Data interp." },
  ];

  const getDotColor = (time: number, score: number) => {
    if (score < 50 && time < 60) return PAL.danger; // Rushing
    if (score < 50 && time >= 60) return PAL.amber; // Struggling
    if (score >= 50 && time < 60) return PAL.lime; // Mastered
    return PAL.teal; // Careful
  };

  const formattedData = data.map(d => ({ ...d, fill: getDotColor(d.time, d.score) }));

  return (
    <div className="mt-12 pt-10 border-t border-[var(--hairline)]">
      <Eyebrow color="var(--danger)">CRITICAL GAP ANALYSIS</Eyebrow>
      <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", letterSpacing: "-0.02em", color: "var(--text-1)" }}>
        You're losing points to <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--danger)" }}>rushing.</span>
      </h3>
      <p className="mt-2 max-w-[65ch]" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
        Your knowledge is solid, but your test-taking strategy is costing you a Band A. This Speed vs. Accuracy matrix reveals a cluster of rapid, incorrect answers in logic puzzles.
      </p>

      <div className="mt-6 rounded-[16px] p-5 sm:p-6" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-3)" }}>SPEED VS. ACCURACY MATRIX</div>
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: PAL.danger }} /><span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-2)" }}>RUSHING</span></div>
             <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: PAL.amber }} /><span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-2)" }}>BLIND SPOTS</span></div>
          </div>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(240,235,255,0.06)" />
              <XAxis type="number" dataKey="time" name="Time Spent" unit="s" domain={[0, 140]} 
                tick={{ fill: "var(--text-3)", fontSize: 11, fontFamily: "var(--font-mono)" }} 
                axisLine={false} tickLine={false} 
                label={{ value: "Time Spent (seconds) →", position: "insideBottom", offset: -15, fill: "var(--text-3)", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }} />
              <YAxis type="number" dataKey="score" name="Score" domain={[0, 100]} 
                tick={{ fill: "var(--text-3)", fontSize: 11, fontFamily: "var(--font-mono)" }} 
                axisLine={false} tickLine={false}
                label={{ value: "Accuracy / Score", angle: -90, position: "insideLeft", offset: 25, fill: "var(--text-3)", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }} />
              
              <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ background: "var(--surface-3)", border: "1px solid var(--hairline-strong)", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)" }}
                formatter={(val: number, name: string) => [name === "Time Spent" ? `${val}s` : `${val}%`, name]}
                labelFormatter={() => ""}
              />
              
              {/* Quadrant lines */}
              <ReferenceLine x={60} stroke="var(--hairline-strong)" strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke="var(--hairline-strong)" strokeDasharray="3 3" />
              
              {/* Quadrant Highlights */}
              <ReferenceArea x1={0} x2={60} y1={0} y2={50} fill="rgba(248,113,113,0.03)" />
              <ReferenceArea x1={60} x2={140} y1={0} y2={50} fill="rgba(217,119,6,0.03)" />

              <Scatter name="Questions" data={formattedData} shape="circle" isAnimationActive={false}>
                {formattedData.map((entry, index) => (
                  <Cell key={`scatter-cell-${entry.id}`} fill={entry.fill} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
           <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)]">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--lime-text)", letterSpacing: ".05em" }}>FAST & ACCURATE</div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>Numerical reasoning is your comfort zone.</div>
           </div>
           <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)]">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--teal-text)", letterSpacing: ".05em" }}>SLOW & ACCURATE</div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>You solve data puzzles well, but they drain the clock.</div>
           </div>
           <div className="p-3 rounded-xl border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.05)]">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--danger)", letterSpacing: ".05em" }}>RUSHING (CRITICAL)</div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)" }}>You guess on logic puzzles to save time. This is a critical leak.</div>
           </div>
           <div className="p-3 rounded-xl border border-[rgba(217,119,6,0.2)] bg-[rgba(217,119,6,0.05)]">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--amber-text)", letterSpacing: ".05em" }}>BLIND SPOTS</div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>Complex data interps are your true blind spot.</div>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Results: Tab — Skills & Roles ─────────────── */
type SkillStatus = "Strong" | "Developing" | "Needs Work";
type Skill = {
  name: string; score: number; status: SkillStatus; desc: string;
  color: string; focus?: boolean;
  rolesNow: string[]; rolesStrengthen: string[];
  topics: { name: string; value: number }[];
};

function statusStyle(s: SkillStatus) {
  if (s === "Strong") return { color: "var(--lime-text)", bg: "rgba(201,220,83,.12)" };
  if (s === "Developing") return { color: "var(--teal-text)", bg: "rgba(81,193,181,.12)" };
  return { color: "var(--amber-text)", bg: "var(--amber-soft)" };
}

function SkillCard({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  const st = statusStyle(skill.status);
  const totalRoles = skill.rolesNow.length + skill.rolesStrengthen.length;
  const shown = skill.rolesNow.slice(0, 3);
  const more = totalRoles - shown.length;

  return (
    <article className="rounded-[18px] flex flex-col overflow-hidden" style={{ background: "var(--surface-1)", border: `1px solid ${skill.focus ? "rgba(217,119,6,.32)" : "var(--hairline-strong)"}`, boxShadow: "var(--shadow-card)" }}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <MiniRing value={skill.score} size={46} color={skill.color} />
          <span className="rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: st.color, background: st.bg, letterSpacing: ".04em" }}>{skill.status.toUpperCase()}</span>
        </div>
        <h3 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: "var(--text-1)" }}>{skill.name}</h3>
        <p className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{skill.desc}</p>

        {/* role teaser — consistent height */}
        <div className="mt-5 flex items-center gap-1.5 flex-wrap">
          {shown.map((role) => <span key={role} className="rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)", background: "var(--bg-2)" }}>{role}</span>)}
          {more > 0 && (
            <button onClick={() => setOpen((o) => !o)} className="rounded-full px-2.5 py-1 transition-colors hover:bg-[var(--violet-soft)]" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>
              and {more} more →
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ overflow: "hidden", borderTop: "1px solid var(--hairline)" }}>
            <div className="p-6 space-y-5" style={{ background: "var(--bg-2)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)", letterSpacing: ".07em" }}>OPENS NOW</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{skill.rolesNow.map((r) => <span key={r} className="rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)", background: "rgba(201,220,83,.1)", border: "1px solid var(--lime-border)" }}>{r}</span>)}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: ".07em" }}>STRENGTHENS</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{skill.rolesStrengthen.map((r) => <span key={r} className="rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)", background: "var(--bg)" }}>{r}</span>)}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: ".07em" }}>BY SUB-TOPIC</div>
                <div className="mt-3 space-y-2.5">
                  {skill.topics.map((t) => (
                    <div key={t.name} className="flex items-center gap-3">
                      <span className="w-28 shrink-0" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>{t.name}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}><div className="h-full rounded-full" style={{ width: `${t.value}%`, background: skill.color }} /></div>
                      <span className="w-7 text-right" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto p-6 pt-0">
        <a href={`#learn/${skill.name.toLowerCase().replaceAll(" ", "-")}`} className={`mt-4 inline-flex w-full h-11 items-center justify-center gap-2 rounded-full transition-all ${skill.focus ? "hover:scale-[1.02] active:scale-[0.98]" : "hover:bg-[var(--violet-soft)]"}`} style={{ background: skill.focus ? "#FFFFFF" : "transparent", color: "var(--violet)", border: "1px solid var(--violet-border)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Start learning <ArrowRight size={15} /></a>
      </div>
    </article>
  );
}

function ResultsSkillsRoles() {
  const skills: Skill[] = [
    { name: "Product thinking", score: 78, status: "Strong", color: "var(--lime-text)", desc: "Framing the real problem before jumping to a solution.",
      rolesNow: ["Product analyst", "Business analyst", "APM"], rolesStrengthen: ["Program associate", "Growth analyst", "Ops lead"],
      topics: [{ name: "Problem framing", value: 82 }, { name: "Prioritisation", value: 74 }, { name: "User signals", value: 79 }] },
    { name: "Backend foundations", score: 66, status: "Developing", color: "var(--teal-text)", desc: "Building reliable services and reasoning about data.",
      rolesNow: ["Backend engineer", "Full-stack dev"], rolesStrengthen: ["Platform associate", "SDET", "Data engineer", "DevOps trainee"],
      topics: [{ name: "APIs", value: 70 }, { name: "Data models", value: 62 }, { name: "Debugging", value: 66 }] },
    { name: "Cognitive & Aptitude", score: 58, status: "Needs Work", color: "var(--amber-text)", focus: true, desc: "Spotting patterns in numbers, sequences and logic quickly.",
      rolesNow: ["Graduate trainee"], rolesStrengthen: ["Analyst", "Operations associate", "Consultant", "Quant support", "Actuarial trainee"],
      topics: [{ name: "Numerical", value: 60 }, { name: "Pattern recog.", value: 54 }, { name: "Decision speed", value: 61 }] },
    { name: "Data Storytelling", score: 82, status: "Strong", color: "var(--lime-text)", desc: "Translating raw numbers into compelling narratives.",
      rolesNow: ["Data analyst", "BI developer"], rolesStrengthen: ["Data scientist", "Product manager", "Consultant"],
      topics: [{ name: "Visualization", value: 85 }, { name: "Insights", value: 80 }, { name: "Reporting", value: 81 }] },
    { name: "Systems Design", score: 64, status: "Developing", color: "var(--teal-text)", desc: "Architecting scalable and maintainable technical solutions.",
      rolesNow: ["Software engineer"], rolesStrengthen: ["Senior engineer", "Tech lead", "Architect"],
      topics: [{ name: "Scalability", value: 60 }, { name: "Trade-offs", value: 68 }, { name: "Microservices", value: 64 }] },
    { name: "Communication", score: 88, status: "Strong", color: "var(--lime-text)", desc: "Articulating ideas clearly and managing stakeholders.",
      rolesNow: ["Project coordinator", "Associate"], rolesStrengthen: ["Product manager", "Chief of staff", "Consultant"],
      topics: [{ name: "Clarity", value: 90 }, { name: "Active listening", value: 85 }, { name: "Empathy", value: 89 }] },
    { name: "Frontend Engineering", score: 69, status: "Developing", color: "var(--teal-text)", desc: "Crafting responsive, accessible, and performant user interfaces.",
      rolesNow: ["Frontend dev", "UI engineer"], rolesStrengthen: ["UX engineer", "Full-stack dev"],
      topics: [{ name: "React", value: 72 }, { name: "CSS/Layout", value: 65 }, { name: "Performance", value: 70 }] },
    { name: "UX Research", score: 45, status: "Needs Work", color: "var(--amber-text)", desc: "Understanding user behaviors, needs, and motivations.",
      rolesNow: ["UX intern"], rolesStrengthen: ["UX designer", "Product designer", "Researcher"],
      topics: [{ name: "Interviews", value: 50 }, { name: "Usability testing", value: 40 }, { name: "Personas", value: 45 }] },
    { name: "Cloud Infrastructure", score: 62, status: "Developing", color: "var(--teal-text)", desc: "Deploying and managing services in AWS/GCP/Azure.",
      rolesNow: ["Cloud associate"], rolesStrengthen: ["DevOps engineer", "SRE", "Cloud architect"],
      topics: [{ name: "Compute", value: 65 }, { name: "Networking", value: 58 }, { name: "Security", value: 63 }] },
    { name: "Quality Assurance", score: 76, status: "Strong", color: "var(--lime-text)", desc: "Ensuring software reliability through rigorous testing.",
      rolesNow: ["QA analyst", "Tester"], rolesStrengthen: ["SDET", "Automation engineer", "Release manager"],
      topics: [{ name: "Manual testing", value: 80 }, { name: "Test planning", value: 75 }, { name: "Automation", value: 73 }] },
    { name: "Agile Methodologies", score: 81, status: "Strong", color: "var(--lime-text)", desc: "Delivering iterative value in cross-functional teams.",
      rolesNow: ["Scrum master", "Project assoc."], rolesStrengthen: ["Agile coach", "Delivery manager"],
      topics: [{ name: "Scrum rituals", value: 85 }, { name: "Sprint planning", value: 78 }, { name: "Retrospectives", value: 80 }] },
    { name: "Database Management", score: 52, status: "Needs Work", color: "var(--amber-text)", desc: "Designing schemas and optimizing queries.",
      rolesNow: ["DB admin associate"], rolesStrengthen: ["Database engineer", "Data architect"],
      topics: [{ name: "SQL", value: 55 }, { name: "NoSQL", value: 48 }, { name: "Optimization", value: 53 }] },
  ];

  return <div>
    <Eyebrow color="var(--violet)">EVERY SKILL IS A DOOR</Eyebrow>
    <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,44px)", letterSpacing: "-0.03em", color: "var(--text-1)" }}>Build a skill. Open a role.</h2>

    {/* Career bridge hero */}
    <div className="mt-7 rounded-[18px] p-6 grid gap-6 md:grid-cols-2" style={{ background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <BadgeCheck size={16} color="var(--lime-text)" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", letterSpacing: ".05em" }}>MARKET ALIGNMENT</span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
          Your profile strongly aligns with <strong style={{ color: "var(--text-1)", fontWeight: 500 }}>Product and Data</strong> roles. Your top skills—Communication and Data Storytelling—are in peak demand, required by 78% of active listings in this track.
        </p>
      </div>
      <div className="md:border-l border-[var(--hairline)] md:pl-6 pt-6 md:pt-0 border-t md:border-t-0">
        <div className="flex items-center gap-2 mb-2.5">
          <Zap size={16} color="var(--amber-text)" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber-text)", letterSpacing: ".05em" }}>THE BOTTLENECK</span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
          Your <strong style={{ color: "var(--text-1)", fontWeight: 500 }}>Cognitive & Aptitude</strong> score is artificially limiting your reach. Raising this single skill by 12 points will unlock immediate eligibility for top-tier Analyst roles.
        </p>
      </div>
    </div>

    <div className="mt-6 grid gap-5 lg:grid-cols-3 items-stretch">{skills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}</div>
  </div>;
}

type QState = "strong" | "weak" | "nosignal";
type QItem = {
  question: string; state: QState;
  summary: string; note: string; todo?: string;
  scores?: { context: number; clarity: number; confidence: number };
};

function QStateBadge({ state }: { state: QState }) {
  const map = {
    strong: { icon: BadgeCheck, color: "var(--lime-text)", bg: "rgba(201,220,83,.12)", label: "STRONG" },
    weak: { icon: TrendingUp, color: "var(--amber-text)", bg: "var(--amber-soft)", label: "THIN" },
    nosignal: { icon: MicOff, color: "var(--text-3)", bg: "var(--surface-2)", label: "NO SIGNAL" },
  } as const;
  const m = map[state];
  const Icon = m.icon;
  return <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 shrink-0" style={{ background: m.bg, color: m.color, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".05em" }}><Icon size={11} /> {m.label}</span>;
}

function InterviewCard({ item, index }: { item: QItem; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-[16px] overflow-hidden" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left p-5 flex items-start gap-4">
        <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 30, height: 30, background: "var(--violet-soft)", color: "var(--violet)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{index + 1}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.3 }}>{item.question}</h3>
            <QStateBadge state={item.state} />
          </div>
          <p className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>{item.summary}</p>
        </div>
        <ChevronDown size={18} color="var(--text-3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s", flexShrink: 0, marginTop: 4 }} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} style={{ overflow: "hidden" }}>
            <div className="px-5 pb-5 pl-[62px]">
              {item.scores ? (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {([["Context", item.scores.context], ["Clarity", item.scores.clarity], ["Confidence", item.scores.confidence]] as const).map(([label, val]) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5"><span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: ".05em" }}>{label.toUpperCase()}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)" }}>{val}</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-2)" }}><div className="h-full rounded-full" style={{ width: `${val}%`, background: item.state === "strong" ? "var(--lime)" : "var(--amber)" }} /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 flex items-center gap-2.5 rounded-xl p-3" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)" }}>
                  <Radio size={15} color="var(--text-3)" />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>No audio was captured — this is a technical issue, not a performance score. You can re-attempt this question.</span>
                </div>
              )}
              {/* coach commentary with left accent */}
              <div className="rounded-r-xl pl-4 py-2" style={{ borderLeft: `3px solid ${item.state === "strong" ? "var(--lime)" : "var(--violet)"}` }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)", lineHeight: 1.6 }}>{item.note}</p>
                {item.todo && <p className="mt-2 flex items-start gap-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--amber-text)" }}><Lightbulb size={14} className="mt-0.5 shrink-0" /> {item.todo}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultsInterview() {
  const sub = [{ label: "Context", score: 75 }, { label: "Clarity", score: 80 }, { label: "Confidence", score: 74 }];
  const questions: QItem[] = [
    { question: "Tell me about a challenge you solved.", state: "strong", summary: "Clear structure, real outcome.", note: "You framed the situation, action and result cleanly, and the outcome was concrete. This is exactly the shape recruiters look for.", scores: { context: 82, clarity: 84, confidence: 80 } },
    { question: "How do you work through uncertainty?", state: "weak", summary: "Good instinct, needs an example.", note: "Your reasoning was sound but stayed abstract. Grounding it in one real decision would make it far more persuasive.", todo: "Next time, name a specific moment and what you actually did.", scores: { context: 68, clarity: 72, confidence: 66 } },
    { question: "Where do you see yourself growing?", state: "nosignal", summary: "Audio wasn't captured.", note: "The mic didn't pick up a response here. Nothing about your ability is inferred from this — retake it when you're ready." },
  ];

  return <div className="max-w-[940px]">
    <Eyebrow color="var(--violet)">AI INTERVIEW</Eyebrow>
    <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,44px)", letterSpacing: "-0.03em", color: "var(--text-1)" }}>You came through <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--teal-text)" }}>clearly.</span></h2>

    {/* Summary strip */}
    <div className="mt-7 rounded-[18px] p-6 grid gap-6 sm:grid-cols-[auto_1fr]" style={{ background: "linear-gradient(180deg, var(--surface-1), var(--surface-2))", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-4">
        <ScoreRing value={77} size={92} color="var(--teal)" label="OVERALL" />
        <div className="sm:hidden" />
      </div>
      <div className="flex flex-col justify-center gap-3">
        {sub.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", letterSpacing: ".04em" }}>{m.label}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-2)" }}><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ duration: 0.9, ease }} style={{ background: "var(--teal)" }} /></div>
            <span className="w-7 text-right" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)" }}>{m.score}</span>
          </div>
        ))}
        <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--text-1)" }}>Confidence</strong> is your weakest of the three — one more worked example is the fastest way to lift it.
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-3">{questions.map((q, i) => <InterviewCard key={q.question} item={q} index={i} />)}</div>

    {/* Cross-tab synthesis */}
    <div className="mt-6 rounded-[16px] p-5" style={{ background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
      <div className="flex items-start gap-3">
        <MessageSquare size={18} color="var(--violet)" className="mt-0.5 shrink-0" />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)", lineHeight: 1.6 }}>
          This interview shapes your <strong>Context</strong> score most — which connects to <a href="#results/skills" style={{ color: "var(--violet)", fontWeight: 700 }}>Product thinking</a> in Your Skills and <a href="#results" style={{ color: "var(--violet)", fontWeight: 700 }}>Communication</a> in Score Breakdown.
        </p>
      </div>
    </div>

    <a href="#learn/ai-interview" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full px-5" style={{ background: "var(--violet)", color: "var(--on-violet)", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>Practice your interview <ArrowRight size={15} /></a>
  </div>;
}

/* ─────────────── Results: Tab 5 — Certificate ─────────────── */
function ResultsCertificate() {
  return (
    <div>
      <Eyebrow color="var(--violet)">YOUR VERIFIED CREDENTIAL</Eyebrow>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, color: "var(--text-1)", letterSpacing: "var(--ls-display)", lineHeight: 1.1 }}>
        Now you can{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>show it.</span>
      </h2>
      <p className="mt-3 max-w-[480px]" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.65 }}>
        Your certificate is locked to this attempt and verified by QR code. Any recruiter can check it in under five seconds.
      </p>

      {/* Certificate */}
      <div className="mx-auto mt-10" style={{
        maxWidth: 680, background: "#FEFEFE", border: "1px solid #E5E7EB",
        borderRadius: 8, boxShadow: "var(--shadow-highest)", padding: 48,
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
        <button className="rounded-full flex items-center gap-2" style={{ height: 44, padding: "0 28px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, border: "none" }}>
          ↓ Download PDF
        </button>
        <button className="rounded-full" style={{ height: 44, padding: "0 22px", background: "transparent", color: "var(--text-1)", border: "1px solid var(--violet-border)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14 }}>
          ↗ Add to LinkedIn
        </button>
        <button className="rounded-full" style={{ height: 44, padding: "0 22px", background: "transparent", color: "var(--text-1)", border: "1px solid var(--violet-border)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14 }}>
          ↗ Share on WhatsApp
        </button>
      </div>

      <div className="mt-8 text-center">
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>Share with family:</div>
        <button className="mt-2 inline-flex items-center gap-2 rounded-full" style={{ height: 36, padding: "0 20px", background: "rgba(109,86,164,0.08)", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>
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
          <input defaultValue="JREE-2026-00847" className="flex-1 rounded-xl" style={{ height: 44, padding: "0 16px", background: "var(--surface-1)", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-mono)", fontSize: 14 }} />
          <button className="rounded-xl" style={{ height: 44, padding: "0 22px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, border: "none" }}>Verify →</button>
        </div>
        <div className="mt-4 rounded-xl" style={{ background: "rgba(81,193,181,0.06)", border: "1px solid rgba(81,193,181,0.2)", padding: "16px 20px" }}>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--teal-text)" }}>✓ Verified</div>
          <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>This certificate is authentic, unaltered, and currently valid.</div>
          <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>Certificate status: Active · Valid until: May 2028</div>
        </div>
      </div>
    </div>
  );
}
