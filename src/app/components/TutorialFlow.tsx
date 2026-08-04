import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Camera, Mic, Wifi, Monitor, Check, Clock,
  ShieldCheck, X, RefreshCw, Bookmark, ChevronLeft, ChevronRight, Send,
  Eye, ClipboardX, ScanLine, Users,
} from "lucide-react";
import { Buddy, BuddyState, usePrefersReducedMotion } from "./Buddy";

const ease = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────── persisted flow state ───────────────────────── */

const K_STEP = "jree.tutorial.step";
const K_MAX = "jree.tutorial.maxStep";
const K_DEFER = "jree.tutorial.deferred";
const K_CHECKS = "jree.tutorial.checks";
const K_WAIVED = "jree.tutorial.cameraWaived";
const K_RESULT = "jree.hasResult";

function read(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* storage unavailable — flow still works, just not resumable */ }
}
function drop(key: string) {
  try { window.localStorage.removeItem(key); } catch { /* no-op */ }
}

export function hasAssessmentResult() { return read(K_RESULT) === "1"; }
export function markAssessmentResult() { write(K_RESULT, "1"); }
export function isTutorialDeferred() { return read(K_DEFER) === "1"; }
export function deferTutorial() { write(K_DEFER, "1"); }
export function tutorialProgress() { return Number(read(K_MAX) || 0); }
export function isCameraWaived() { return read(K_WAIVED) === "1"; }

export type CheckKey = "camera" | "mic" | "connection" | "browser";
export type CheckStatus = "pending" | "checking" | "pass" | "warn" | "fail";
export type CheckResult = { status: CheckStatus; detail: string };
export type CheckMap = Record<CheckKey, CheckResult>;

const CHECK_KEYS: CheckKey[] = ["camera", "mic", "connection", "browser"];

const BLANK_CHECKS: CheckMap = {
  camera: { status: "pending", detail: "Not checked yet." },
  mic: { status: "pending", detail: "Not checked yet." },
  connection: { status: "pending", detail: "Not checked yet." },
  browser: { status: "pending", detail: "Not checked yet." },
};

/* Read by SystemCheck so the same four checks are never run twice. */
export function readStoredChecks(): CheckMap | null {
  const raw = read(K_CHECKS);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CheckMap;
    if (CHECK_KEYS.every((k) => parsed?.[k]?.status)) return parsed;
    return null;
  } catch { return null; }
}
export function checksCleared(c: CheckMap | null) {
  return !!c && CHECK_KEYS.every((k) => c[k].status === "pass" || c[k].status === "warn");
}
export function clearTutorialProgress() {
  drop(K_STEP); drop(K_MAX);
}

/* ───────────────────────── the beats ─────────────────────────
   One piece of information and one action per screen. Everything
   else is dimmed behind a dark layer.                             */

type Beat = {
  id: string;
  text: string;
  cta: string;
  /* data-spot target on the exam mock — when absent the whole screen dims evenly */
  spot?: string;
  kind?: "checks" | "start";
  /* "rule" beats carry the proctoring treatment: amber chip, rule counter, explicit acknowledgement */
  tone?: "rule";
  label?: string;
  icon?: any;
};

const BEATS: Beat[] = [
  { id: "hello", text: "Hi — I'm your guide. Give me a minute and you'll know exactly what to expect.", cta: "Show me" },
  { id: "time", text: "The exam is one sitting of about 90 minutes, and it can't be paused once it starts.", cta: "Next" },
  { id: "layers", text: "Five layers build your score. The first four are written; the last one is a video interview.", cta: "Next" },
  { id: "timer", spot: "timer", text: "Your timer lives here. It runs on our server, so closing the tab won't stop it.", cta: "Next" },
  { id: "progress", spot: "progress", text: "This bar tells you which of the five layers you're in.", cta: "Next" },
  { id: "question", spot: "question", text: "One question at a time. Every answer saves itself as you go.", cta: "Next" },
  { id: "mark", spot: "mark", text: "Not sure about an answer? Flag it and come back before the layer ends.", cta: "Next" },
  { id: "tracker", spot: "tracker", text: "The tracker shows what you've answered. Tap any box to jump straight back.", cta: "Next" },
  { id: "next", spot: "next", text: "Next moves you forward. Submit only appears on the very last question.", cta: "Next" },
  { id: "interview", text: "Layer 5 is five spoken questions with Priya, on video. Content and clarity are what's scored.", cta: "Next" },

  /* ── proctoring: the part that decides whether the score means anything ── */
  { id: "proctor-intro", spot: "proctor", tone: "rule", label: "Proctoring · 1 of 6", icon: Eye,
    text: "From the moment Layer 1 opens, the session is proctored. This indicator stays on screen the entire time.", cta: "Understood" },
  { id: "proctor-tabs", tone: "rule", label: "Proctoring · 2 of 6", icon: Monitor,
    text: "Leaving this tab or switching apps is logged with a timestamp. Three switches flags your attempt for review.", cta: "Understood" },
  { id: "proctor-copy", tone: "rule", label: "Proctoring · 3 of 6", icon: ClipboardX,
    text: "Copy and paste are disabled inside the exam. Pasted text will not appear in your answer.", cta: "Understood" },
  { id: "proctor-capture", tone: "rule", label: "Proctoring · 4 of 6", icon: ScanLine,
    text: "Screenshots and screen recording are detected and logged. Exam content does not leave this window.", cta: "Understood" },
  { id: "proctor-presence", tone: "rule", label: "Proctoring · 5 of 6", icon: Users,
    text: "Your camera stays on for Layer 5. Leaving the frame, or a second face appearing in it, is flagged.", cta: "Understood" },
  { id: "proctor-fair", tone: "rule", label: "Proctoring · 6 of 6", icon: ShieldCheck,
    text: "No flag fails you automatically. A person reads the log before anything is decided — this is what makes your score worth showing.", cta: "I accept these rules" },
  { id: "checks", kind: "checks", text: "Last thing — let's make sure your camera and microphone work.", cta: "Run the checks" },
  { id: "ready", kind: "start", text: "That's everything. The clock starts the moment you press start.", cta: "Start the exam" },
];

const LAST = BEATS.length - 1;
export const TUTORIAL_STEPS = BEATS.length;

/* ───────────────────────── 1. First-time decision screen ───────────────────────── */

export function FirstTimeDecision({ onDefer }: { onDefer: () => void }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <header className="flex items-center justify-between px-5 sm:px-8 md:px-12" style={{ height: 60, borderBottom: "1px solid var(--hairline)" }}>
        <div className="flex items-end leading-none">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.03em" }}>JREE</span>
          <span className="inline-block rounded-full ml-0.5 mb-1.5" style={{ width: 6, height: 6, background: "var(--violet)" }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--text-3)", textTransform: "uppercase" }}>Rahul Sharma</span>
      </header>

      <main className="flex-1 flex items-center">
        <div className="w-full max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[600px]">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase" }}>
                Welcome to JREE
              </div>
              <h1 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5.5vw,54px)", letterSpacing: "-0.035em", lineHeight: 1.02, color: "var(--text-1)" }}>
                You haven't taken the assessment{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>yet.</span>
              </h1>
              <p className="mt-5" style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.65, color: "var(--text-2)" }}>
                One sitting of about 90 minutes gives you a verified 0–100 score, your band, your national rank, and a shareable certificate. It's free for students, and the timer can't be paused once you begin — so start when you have a quiet stretch ahead of you.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href="#exam/tutorial"
                  className="inline-flex items-center justify-center gap-2 rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  style={{ height: 52, padding: "0 26px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 8px 32px rgba(94,74,158,0.28)" }}
                >
                  Take the assessment now <ArrowRight size={17} strokeWidth={2.5} />
                </a>
                <button
                  onClick={onDefer}
                  className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-[var(--violet-soft)] w-full sm:w-auto"
                  style={{ height: 52, padding: "0 26px", background: "transparent", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15 }}
                >
                  I'll take it later
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {[["Time", "~90 minutes"], ["Cost", "Free for students"], ["Pausing", "Not possible once started"]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="rounded-full shrink-0" style={{ width: 5, height: 5, background: "var(--violet)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--text-3)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", fontWeight: 600, color: "var(--text-1)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="hidden lg:flex flex-col items-center justify-center"
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <Buddy state="talking" className="w-[220px] h-[220px]" />
              <p className="mt-4 max-w-[240px]" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, lineHeight: 1.5, color: "var(--text-2)", textAlign: "center" }}>
                "I'll walk you through it first — nothing starts until you say so."
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── 2. The guided tour ───────────────────────── */

type Rect = { top: number; left: number; width: number; height: number };

export function TutorialFlow() {
  const retest = hasAssessmentResult();
  const reduced = usePrefersReducedMotion();

  const [i, setI] = useState(() => {
    const s = Number(read(K_STEP) || 0);
    return Number.isFinite(s) && s >= 0 && s <= LAST ? s : 0;
  });
  const [maxStep, setMaxStep] = useState(() => {
    const m = Number(read(K_MAX) || 0);
    return Math.max(Number.isFinite(m) ? m : 0, 0);
  });
  const [buddyState, setBuddyState] = useState<BuddyState>("talking");
  const [checks, setChecks] = useState<CheckMap>(() => readStoredChecks() ?? BLANK_CHECKS);
  const [cameraWaived, setCameraWaived] = useState(() => isCameraWaived());
  const [running, setRunning] = useState<CheckKey | null>(null);

  const beat = BEATS[i];

  useEffect(() => {
    write(K_STEP, String(i));
    setMaxStep((m) => Math.max(m, i));
  }, [i]);
  useEffect(() => { write(K_MAX, String(maxStep)); }, [maxStep]);
  useEffect(() => { write(K_CHECKS, JSON.stringify(checks)); }, [checks]);

  /* beat-enter → talking, line delivered → listening */
  useEffect(() => {
    setBuddyState("talking");
    const t = setTimeout(() => setBuddyState("listening"), Math.min(6000, 2000 + beat.text.length * 26));
    return () => clearTimeout(t);
  }, [beat.text]);

  /* Listening is the resting state here: the aura now disappears entirely at idle,
     which would read as dormant rather than waiting mid-walkthrough. */

  /* Measure the element this beat points at, so the dark layer can cut a hole around it. */
  const [rect, setRect] = useState<Rect | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      if (!beat.spot) { setRect(null); return; }
      const el = document.querySelector(`[data-spot="${beat.spot}"]`);
      if (!el) { setRect(null); return; }
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    const settle = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(settle); window.removeEventListener("resize", measure); };
  }, [beat.spot]);

  const exit = useCallback(() => { window.location.hash = "dashboard"; }, []);
  const back = () => (i === 0 ? exit() : setI((n) => Math.max(0, n - 1)));
  const next = () => setI((n) => Math.min(LAST, n + 1));

  const effectiveChecks: CheckMap = cameraWaived && checks.camera.status === "fail"
    ? { ...checks, camera: { status: "warn", detail: "Skipped — continuing without a camera." } }
    : checks;
  const cleared = checksCleared(effectiveChecks);

  const startExam = () => {
    clearTutorialProgress();
    /* Checks already cleared here — don't make them sit through SystemCheck twice. */
    window.location.hash = cleared ? "exam/active" : "exam/check";
  };

  /* ── the checks beat runs inside the same one-line card ── */
  const runOne = useCallback(async (key: CheckKey) => {
    setRunning(key);
    setChecks((c) => ({ ...c, [key]: { status: "checking", detail: "Checking…" } }));
    await new Promise((r) => setTimeout(r, 420));
    const result = (key === "camera" || key === "mic") ? await probeMedia(key)
      : key === "connection" ? probeConnection() : probeBrowser();
    setChecks((c) => ({ ...c, [key]: result }));
    setRunning(null);
    return result;
  }, []);

  const runAll = useCallback(async () => {
    setChecks(BLANK_CHECKS);
    for (const key of CHECK_KEYS) await runOne(key);
  }, [runOne]);

  const failed = CHECK_KEYS.find((k) => effectiveChecks[k].status === "fail");
  const checksTouched = CHECK_KEYS.some((k) => checks[k].status !== "pending");

  /* One line of information and one action — resolved per beat. */
  let line = beat.text;
  let cta = beat.cta;
  let action: () => void = next;
  let busy = false;

  if (beat.kind === "checks") {
    if (running) {
      line = `Checking your ${CHECK_META[running].label.toLowerCase()}…`;
      cta = "Checking…";
      busy = true;
    } else if (failed) {
      line = CHECK_META[failed].fix;
      cta = "Retry";
      action = () => runOne(failed);
    } else if (checksTouched && cleared) {
      line = "Camera, microphone, connection and browser all look good.";
      cta = "Next";
      action = next;
    } else {
      action = runAll;
    }
  } else if (beat.kind === "start") {
    line = cleared ? beat.text : "We'll re-check your setup on the next screen, then the clock starts.";
    action = startExam;
  }

  const spotlightLow = rect ? rect.top + rect.height / 2 > window.innerHeight / 2 : false;
  const isRule = beat.tone === "rule";

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* The real exam screen, sitting underneath the dark layer */}
      <ExamMock />

      {/* Dark layer — either an even dim, or a dim with a hole cut around one element */}
      <AnimatePresence>
        {rect ? (
          <motion.div
            key="hole"
            className="fixed pointer-events-none z-40"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1, top: rect.top - 8, left: rect.left - 8, width: rect.width + 16, height: rect.height + 16 }}
            transition={{ duration: reduced ? 0 : 0.42, ease }}
            style={{
              borderRadius: 14,
              boxShadow: "0 0 0 9999px rgba(16,12,26,0.88)",
              border: "1px solid var(--violet-light)",
            }}
          />
        ) : (
          <motion.div
            key="dim"
            className="fixed inset-0 pointer-events-none z-40"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            style={{ background: isRule ? "rgba(16,12,26,0.94)" : "rgba(16,12,26,0.88)" }}
          />
        )}
      </AnimatePresence>

      {/* The card: one line, one button */}
      <div
        className="fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        style={
          rect
            ? (spotlightLow ? { top: 24 } : { top: Math.min(rect.top + rect.height + 22, window.innerHeight - 240) })
            : { top: 0, bottom: 0, alignItems: "center" }
        }
      >
        <motion.div
          key={beat.id}
          className="pointer-events-auto w-full"
          style={{ maxWidth: 440 }}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, ease }}
        >
          <div
            className="rounded-[22px] p-6 sm:p-7"
            style={{
              background: "var(--surface-1)",
              border: `1px solid ${isRule ? "var(--amber-border)" : "var(--violet-border)"}`,
              boxShadow: "0 30px 80px rgba(16,12,26,0.45)",
            }}
          >
            {/* minimal chrome: progress, back, exit */}
            <div className="flex items-center gap-3">
              <button
                onClick={back}
                aria-label={i === 0 ? "Back to dashboard" : "Previous step"}
                className="flex items-center justify-center rounded-full transition-colors hover:bg-[var(--violet-soft)]"
                style={{ width: 28, height: 28, border: "1px solid var(--hairline-strong)" }}
              >
                <ArrowLeft size={13} color="var(--text-3)" />
              </button>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", color: "var(--text-3)" }}>
                {i + 1} / {BEATS.length}
              </span>
              <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "var(--bg-3)" }}>
                <div style={{ height: "100%", width: `${((i + 1) / BEATS.length) * 100}%`, background: "var(--violet)", transition: "width 360ms ease" }} />
              </div>
              <button
                onClick={exit}
                aria-label="Exit the walkthrough"
                className="flex items-center justify-center rounded-full transition-colors hover:bg-[var(--violet-soft)]"
                style={{ width: 28, height: 28, border: "1px solid var(--hairline-strong)" }}
              >
                <X size={13} color="var(--text-3)" />
              </button>
            </div>

            {retest && i === 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
                <ShieldCheck size={12} color="var(--violet)" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", color: "var(--violet)", textTransform: "uppercase" }}>Retest walkthrough</span>
              </div>
            )}

            {/* proctoring beats announce themselves before the line lands */}
            {isRule && (
              <div className="mt-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 30, height: 30, background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
                  {beat.icon ? <beat.icon size={15} color="var(--amber-text)" strokeWidth={2} /> : null}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.09em", color: "var(--amber-text)", textTransform: "uppercase" }}>
                  {beat.label}
                </span>
              </div>
            )}

            {/* buddy + the single line */}
            <div className="mt-5 flex items-start gap-4">
              <div className="shrink-0 -mt-2 -ml-1">
                <Buddy state={buddyState} className="w-[64px] h-[64px]" />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--text-1)" }}>
                {line}
              </p>
            </div>

            {/* the single action */}
            <button
              onClick={busy ? undefined : action}
              disabled={busy}
              className="mt-6 w-full rounded-full inline-flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                height: 50,
                background: busy ? "var(--bg-2)" : "var(--violet)",
                color: busy ? "var(--text-3)" : "var(--on-violet)",
                border: busy ? "1px solid var(--hairline-strong)" : "none",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
                boxShadow: busy ? "none" : "0 8px 28px rgba(94,74,158,0.3)",
                cursor: busy ? "wait" : "pointer",
              }}
            >
              {busy ? (
                <>
                  <motion.span className="rounded-full" animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 13, height: 13, border: "2px solid var(--text-3)", borderTopColor: "transparent" }} />
                  {cta}
                </>
              ) : (
                <>{cta} {beat.kind === "checks" && !checksTouched ? null : <ArrowRight size={16} strokeWidth={2.5} />}</>
              )}
            </button>

            {/* the one escape hatch a failing check needs — deliberately quiet */}
            {beat.kind === "checks" && failed && (
              <button
                onClick={() => {
                  if (failed === "camera") { setCameraWaived(true); write(K_WAIVED, "1"); }
                  else next();
                }}
                className="mt-3 w-full"
                style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                {failed === "camera" ? "Continue without a camera" : "Skip this and sort it out later"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── the checks themselves ───────────────────────── */

const CHECK_META: Record<CheckKey, { icon: any; label: string; fix: string }> = {
  camera: { icon: Camera, label: "Camera", fix: "We can't reach your camera. Allow access from the icon in your address bar, close any app using it, then retry." },
  mic: { icon: Mic, label: "Microphone", fix: "We can't reach your microphone. Allow access from the address bar, check your input device, then retry." },
  connection: { icon: Wifi, label: "Connection", fix: "You appear to be offline. Reconnect, then retry — written answers autosave, so a brief drop is survivable." },
  browser: { icon: Monitor, label: "Browser", fix: "This browser can't record media. Open JREE in Chrome, Edge, or Safari, and avoid private windows." },
};

async function probeMedia(kind: "camera" | "mic"): Promise<CheckResult> {
  const md = navigator.mediaDevices;
  if (!md?.getUserMedia) return { status: "fail", detail: "This browser doesn't expose media devices." };
  try {
    const stream = await md.getUserMedia(kind === "camera" ? { video: true } : { audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return { status: "pass", detail: kind === "camera" ? "Camera detected." : "Microphone detected." };
  } catch (err: any) {
    const name = err?.name || "";
    if (name === "NotAllowedError" || name === "SecurityError") return { status: "fail", detail: "Permission was blocked." };
    if (name === "NotFoundError" || name === "OverconstrainedError") return { status: "fail", detail: "No device found." };
    if (name === "NotReadableError") return { status: "fail", detail: "The device is in use by another app." };
    return { status: "fail", detail: "We couldn't complete this check." };
  }
}

function probeConnection(): CheckResult {
  if (typeof navigator.onLine === "boolean" && !navigator.onLine) {
    return { status: "fail", detail: "You appear to be offline." };
  }
  const t = (navigator as any).connection?.effectiveType;
  if (t === "slow-2g" || t === "2g") {
    return { status: "warn", detail: "Your connection is slow — the interview may stutter." };
  }
  return { status: "pass", detail: "Online and reachable." };
}

function probeBrowser(): CheckResult {
  const supported = !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== "undefined";
  if (!supported) return { status: "fail", detail: "This browser can't record media." };
  return { status: "pass", detail: "Fully supported." };
}

/* ───────────────────────── the exam screen behind the scrim ─────────────────────────
   A faithful, non-interactive preview of the real exam UI. Each element the tour
   points at carries a data-spot hook so the dark layer can cut a hole around it.   */

function ExamMock() {
  return (
    <div className="absolute inset-0 flex flex-col" aria-hidden="true">
      {/* header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 shrink-0" style={{ height: 52, background: "var(--surface-1)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="flex items-end leading-none shrink-0">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--text-1)", letterSpacing: "-0.03em" }}>JREE</span>
          <span className="inline-block rounded-full ml-0.5 mb-0.5" style={{ width: 4, height: 4, background: "var(--violet)" }} />
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <div data-spot="progress" className="flex items-center gap-1 w-full max-w-[280px]">
            {[100, 55, 0, 0, 0].map((w, n) => (
              <div key={n} className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "var(--bg-3)" }}>
                <div style={{ height: "100%", width: `${w}%`, background: "var(--violet)" }} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span data-spot="proctor" className="inline-flex items-center gap-1.5 rounded-full px-2.5" style={{ height: 28, background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
            <span className="rounded-full" style={{ width: 6, height: 6, background: "var(--amber)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--amber-text)", textTransform: "uppercase" }}>Proctored</span>
          </span>
          <span data-spot="timer" className="inline-flex items-center gap-1.5 rounded-full px-2.5" style={{ height: 28, background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
            <Clock size={12} color="var(--violet)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", color: "var(--text-1)" }}>68:14</span>
          </span>
        </div>
      </div>

      {/* question body */}
      <div className="flex-1 overflow-hidden">
        <div data-spot="question" className="max-w-[720px] mx-auto px-5 sm:px-8 py-7">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>
            Layer 2 · Communication · Question 7 of 18
          </span>
          <p className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, lineHeight: 1.35, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            A client emails to say the delivery date you agreed has slipped by a week. What is the strongest opening line for your reply?
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            {[
              ["A", "Apologise, state the new date, and explain what changed.", true],
              ["B", "Explain the internal reasons in full before mentioning the date.", false],
              ["C", "Ask for a call to discuss it before committing to anything.", false],
              ["D", "Confirm the original date and escalate internally first.", false],
            ].map(([k, text, sel]) => (
              <div
                key={k as string}
                className="flex items-center gap-3 rounded-[12px] px-4 py-3.5"
                style={{ background: sel ? "var(--violet-soft)" : "var(--surface-1)", border: `1px solid ${sel ? "var(--violet-border)" : "var(--hairline)"}` }}
              >
                <span className="flex items-center justify-center rounded-full shrink-0" style={{ width: 22, height: 22, border: `1px solid ${sel ? "var(--violet)" : "var(--hairline-strong)"}`, background: sel ? "var(--violet)" : "transparent" }}>
                  {sel ? <Check size={12} color="var(--on-violet)" strokeWidth={3} /> : <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>{k}</span>}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.5, color: "var(--text-1)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="px-4 sm:px-6 py-3.5 flex items-center gap-3 shrink-0 flex-wrap" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--hairline)" }}>
        <span className="inline-flex items-center gap-1.5 rounded-full px-3" style={{ height: 34, border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-body)", fontSize: 13 }}>
          <ChevronLeft size={14} /> Previous
        </span>
        <span data-spot="mark" className="inline-flex items-center gap-1.5 rounded-full px-3" style={{ height: 34, border: "1px solid var(--amber-border)", background: "var(--amber-soft)", color: "var(--amber-text)", fontFamily: "var(--font-body)", fontSize: 13 }}>
          <Bookmark size={13} /> Mark for review
        </span>
        <div data-spot="tracker" className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span key={n} className="rounded-[4px]" style={{ width: 16, height: 16, background: n < 7 ? "var(--violet)" : n === 7 ? "var(--violet-light)" : "var(--bg-3)" }} />
          ))}
        </div>
        <div className="flex-1" />
        <div data-spot="next" className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4" style={{ height: 34, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>
            Next <ChevronRight size={14} strokeWidth={2.5} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3" style={{ height: 34, border: "1px dashed var(--hairline-strong)", color: "var(--text-3)", fontFamily: "var(--font-body)", fontSize: 13 }}>
            <Send size={13} /> Submit
          </span>
        </div>
      </div>
    </div>
  );
}
