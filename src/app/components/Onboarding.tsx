import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const colleges = ["Amravati Engineering College", "VIT Pune", "BITS Pilani", "NIT Nagpur", "Other — Type your college"];
const degrees = ["B.Tech", "B.E.", "B.Sc", "BBA", "B.Com", "MBA", "MCA", "Other"];
const years = ["2024", "2025", "2026", "2027+"];
const domains = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical / Electronics",
  "Civil Engineering",
  "Commerce & Finance",
  "Design & Media",
  "Pharma & Life Sciences",
  "Other / Undecided",
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  valid,
  error,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  hint?: string;
  valid?: boolean;
  error?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="mb-5">
      <label
        className="block mb-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.03em",
          color: "var(--violet)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <div className="relative">
        <motion.input
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          animate={error ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full outline-none transition-all"
          style={{
            height: 54,
            borderRadius: 8,
            border: `1px solid ${error ? "var(--danger)" : valid ? "var(--lime-border)" : "rgba(240,235,255,0.08)"}`,
            background: "var(--surface-3)",
            padding: "0 18px",
            paddingRight: valid ? 46 : 18,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--text-1)",
          }}
          onFocus={(e) => {
            if (!error && !valid) {
              e.target.style.borderColor = "var(--violet)";
              e.target.style.boxShadow = "0 0 0 3px rgba(109,86,164,0.2)";
            }
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
            if (!error && !valid) e.target.style.borderColor = "rgba(240,235,255,0.08)";
          }}
        />
        {valid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--lime)" }}>
            <Check size={18} strokeWidth={2.5} />
          </span>
        )}
      </div>
      {hint && !error && (
        <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>{hint}</p>
      )}
      {error && (
        <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--danger)" }}>{error}</p>
      )}
    </div>
  );
}

function PrimaryButton({ children, disabled, onClick, loading, accent = "violet" }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; loading?: boolean; accent?: "violet" | "lime" }) {
  const isLime = accent === "lime";
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className="w-full rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
      style={{
        height: 54,
        background: isLime ? "var(--lime)" : "var(--violet)",
        color: isLime ? "var(--on-lime)" : "var(--text-1)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: "-0.01em",
        opacity: disabled || loading ? 0.4 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: isLime ? "0 8px 32px rgba(201,220,83,0.22)" : "none",
      }}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          Just a sec…
        </span>
      ) : (
        children
      )}
    </button>
  );
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4].map((n) => {
        const isCurrent = step === n;
        const isDone = step > n;
        const active = isDone || isCurrent;
        return (
          <div key={n} className="flex items-center gap-3 flex-1 last:flex-none">
            <motion.div
              animate={{ scale: isCurrent ? 1.15 : 1 }}
              className="rounded-full flex items-center justify-center transition-colors"
              style={{
                width: 26,
                height: 26,
                background: isDone ? "var(--lime)" : isCurrent ? "var(--violet)" : "transparent",
                border: active ? "none" : "1px solid var(--text-3)",
                color: isDone ? "var(--on-lime)" : isCurrent ? "var(--text-1)" : "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              {isDone ? <Check size={13} strokeWidth={3} /> : n}
            </motion.div>
            {n < 4 && (
              <div
                className="flex-1 h-px transition-colors"
                style={{ background: isDone ? "var(--lime)" : "rgba(240,235,255,0.08)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [collegeQuery, setCollegeQuery] = useState("");
  const [collegeOpen, setCollegeOpen] = useState(false);
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  const [domain, setDomain] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resend, setResend] = useState(30);
  const [editingPhone, setEditingPhone] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== 4) return;
    setResend(30);
    const i = setInterval(() => setResend((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, [step]);

  const nameValid = name.trim().length >= 2;
  const mobileValid = /^\+?\d{10,13}$/.test(mobile.replace(/\s/g, ""));
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const step1Valid = nameValid && mobileValid && emailValid;
  const step2Valid = collegeQuery.length > 1 && degree && year;
  const step3Valid = !!domain;
  const otpValid = otp.every((d) => d !== "");

  const advance = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((s) => s + 1);
    }, 450);
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      const dur = 1400;
      const end = Date.now() + dur;
      const colors = ["#6D56A4", "#C9DC53", "#51C1B5", "#F0EBFF"];
      (async () => {
        try {
          const mod = await import("canvas-confetti");
          const confetti = mod.default;
          (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        } catch {
          // canvas-confetti optional; silently skip if unavailable
        }
      })();
    }, 700);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const filteredColleges = colleges.filter((c) => c.toLowerCase().includes(collegeQuery.toLowerCase()));

  const stepLabel = ["YOUR NAME", "YOUR COLLEGE", "YOUR DOMAIN", "VERIFY"][step - 1];

  return (
    <section id="signup" className="relative py-16 md:py-28 px-5 sm:px-8 md:px-12 lg:px-[72px]" style={{ background: "var(--bg-2)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(240,235,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-200px",
          top: "20%",
          width: 700,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(109,86,164,0.18), transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-[1160px] mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-10 md:mb-14">
          <div>
            <div
              className="inline-block mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.24em",
                color: "var(--violet)",
                textTransform: "uppercase",
              }}
            >
              09 / Sign up
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px, 7vw, 72px)",
                color: "var(--text-1)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              Print your{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--lime)",
                }}
              >
                admit card.
              </span>
            </h2>
            <p
              className="mt-5 max-w-[520px]"
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.8vw,16px)", color: "var(--text-2)", lineHeight: 1.6 }}
            >
              Four fields. Watch your JREE candidate pass print itself, line by line — name, college, domain, OTP. The same card every employer in India will verify.
            </p>
          </div>
          {/* Live counter pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-3 rounded-full self-start md:self-end"
            style={{
              padding: "8px 14px",
              background: "var(--surface-1)",
              border: "1px solid var(--lime-border)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
            }}
          >
            <motion.span
              className="block rounded-full"
              style={{ width: 6, height: 6, background: "var(--lime)" }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>PRINTED THIS MONTH</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "var(--text-1)" }}>
              12,<span style={{ color: "var(--lime)" }}>407</span>
            </span>
          </motion.div>
        </div>

        {/* 2-col: form + live admit card */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] gap-8 lg:gap-10 items-start max-w-[1040px] mx-auto">
        {/* Form card */}
        <div className="relative w-full" style={{ maxWidth: 600 }}>
          <div
            className="grain relative overflow-hidden p-7 sm:p-9 md:p-10"
            style={{
              background: "var(--surface-1)",
              border: "1px solid rgba(240,235,255,0.06)",
              borderRadius: 24,
            }}
          >
            {/* Ghost step number */}
            {!done && (
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  top: 18,
                  right: 22,
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(64px, 12vw, 84px)",
                  lineHeight: 0.85,
                  color: "rgba(240,235,255,0.04)",
                  letterSpacing: "-0.06em",
                }}
              >
                0{step}
              </div>
            )}

            {done ? (
              <SuccessState />
            ) : (
              <div className="relative">
                <ProgressDots step={step} />
                <div className="mt-4 flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      letterSpacing: "0.03em",
                      color: "var(--text-3)",
                    }}
                  >
                    STEP {String(step).padStart(2, "0")} / 04 · {stepLabel}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -24, opacity: 0 }}
                    transition={{ duration: 0.32, ease }}
                    className="mt-8"
                  >
                    {step === 1 && (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(24px, 5vw, 32px)",
                            color: "var(--text-1)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          Let's make this{" "}
                          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>
                            personalized.
                          </span>
                        </h3>
                        <p className="mt-3 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
                          Your score card carries your name. Make it count.
                        </p>
                        <Field label="Full name" value={name} onChange={setName} placeholder="Aarav Sharma" valid={nameValid} autoFocus />
                        <Field
                          label="Mobile number"
                          value={mobile}
                          onChange={setMobile}
                          placeholder="+91 98765 43210"
                          type="tel"
                          hint="OTP only. Nothing else."
                          valid={mobileValid}
                        />
                        <Field
                          label="Email"
                          value={email}
                          onChange={setEmail}
                          placeholder="aarav@college.edu"
                          type="email"
                          valid={emailValid}
                        />
                        <div className="mt-8">
                          <PrimaryButton disabled={!step1Valid} loading={loading} onClick={advance}>
                            Continue →
                          </PrimaryButton>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(24px, 5vw, 32px)",
                            color: "var(--text-1)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          Where are you{" "}
                          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>
                            studying?
                          </span>
                        </h3>
                        <p className="mt-3 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
                          We benchmark you against your college and India at large.
                        </p>

                        <div className="mb-5 relative">
                          <label
                            className="block mb-2"
                            style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em", color: "var(--violet)", textTransform: "uppercase" }}
                          >
                            College name
                          </label>
                          <input
                            value={collegeQuery}
                            onChange={(e) => { setCollegeQuery(e.target.value); setCollegeOpen(true); }}
                            onFocus={() => setCollegeOpen(true)}
                            onBlur={() => setTimeout(() => setCollegeOpen(false), 150)}
                            placeholder="Search your college"
                            className="w-full outline-none"
                            style={{
                              height: 54,
                              borderRadius: 8,
                              border: "1px solid rgba(240,235,255,0.08)",
                              background: "var(--surface-3)",
                              padding: "0 18px",
                              fontFamily: "var(--font-body)",
                              fontSize: 15,
                              color: "var(--text-1)",
                            }}
                          />
                          {collegeOpen && filteredColleges.length > 0 && (
                            <div
                              className="absolute left-0 right-0 mt-2 rounded-xl z-10 overflow-hidden"
                              style={{ background: "var(--surface-2)", border: "1px solid rgba(109,86,164,0.18)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
                            >
                              {filteredColleges.map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onMouseDown={() => { setCollegeQuery(c); setCollegeOpen(false); }}
                                  className="w-full text-left px-4 hover:bg-[rgba(109,86,164,0.12)] transition-colors"
                                  style={{ height: 44, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)" }}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mb-5">
                          <label className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em", color: "var(--violet)", textTransform: "uppercase" }}>
                            Degree
                          </label>
                          <select
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            className="w-full outline-none"
                            style={{
                              height: 54,
                              borderRadius: 8,
                              border: "1px solid rgba(240,235,255,0.08)",
                              background: "var(--surface-3)",
                              padding: "0 18px",
                              fontFamily: "var(--font-body)",
                              fontSize: 15,
                              color: degree ? "var(--text-1)" : "var(--text-3)",
                              appearance: "none",
                            }}
                          >
                            <option value="">Select degree</option>
                            {degrees.map((d) => (
                              <option key={d} value={d} style={{ background: "var(--surface-2)", color: "var(--text-1)" }}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-8">
                          <label className="block mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em", color: "var(--violet)", textTransform: "uppercase" }}>
                            Graduation year
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {years.map((y) => (
                              <button
                                key={y}
                                type="button"
                                onClick={() => setYear(y)}
                                className="rounded-full transition-all"
                                style={{
                                  height: 46,
                                  background: year === y ? "var(--violet)" : "transparent",
                                  border: `1px solid ${year === y ? "var(--violet)" : "rgba(240,235,255,0.12)"}`,
                                  color: year === y ? "var(--text-1)" : "var(--text-2)",
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 13,
                                }}
                              >
                                {y}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => setStep(1)}
                            className="inline-flex items-center gap-1.5 hover:text-[var(--text-1)] transition-colors"
                            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <div className="flex-1">
                            <PrimaryButton disabled={!step2Valid} loading={loading} onClick={advance}>
                              Next →
                            </PrimaryButton>
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(24px, 5vw, 32px)",
                            color: "var(--text-1)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          Pick your{" "}
                          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>
                            domain.
                          </span>
                        </h3>
                        <p className="mt-3 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
                          The domain section is tailored to your field.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {domains.map((d) => {
                            const selected = domain === d;
                            return (
                              <motion.button
                                key={d}
                                type="button"
                                onClick={() => setDomain(d)}
                                whileTap={{ scale: 0.96 }}
                                className="rounded-full transition-colors"
                                style={{
                                  padding: "11px 18px",
                                  background: selected ? "var(--violet)" : "transparent",
                                  border: `1px solid ${selected ? "var(--violet)" : "rgba(240,235,255,0.12)"}`,
                                  color: selected ? "var(--text-1)" : "var(--text-2)",
                                  fontFamily: "var(--font-body)",
                                  fontSize: 13,
                                }}
                              >
                                {selected && <Check size={13} className="inline mr-1.5 -mt-0.5" strokeWidth={2.5} />}
                                {d}
                              </motion.button>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="inline-flex items-center gap-1.5 hover:text-[var(--text-1)] transition-colors"
                            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <div className="flex-1">
                            <PrimaryButton disabled={!step3Valid} loading={loading} onClick={advance}>
                              Let's go →
                            </PrimaryButton>
                          </div>
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(24px, 5vw, 32px)",
                            color: "var(--text-1)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          One last{" "}
                          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>
                            check.
                          </span>
                        </h3>
                        <p className="mt-3 mb-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
                          6-digit code sent to{" "}
                          {editingPhone ? (
                            <input
                              autoFocus
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              onBlur={() => setEditingPhone(false)}
                              className="inline-block outline-none border-b bg-transparent"
                              style={{ borderColor: "var(--violet)", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-1)", width: 140 }}
                            />
                          ) : (
                            <button
                              onClick={() => setEditingPhone(true)}
                              className="inline-block px-2 py-0.5 rounded-md transition-colors hover:bg-[rgba(109,86,164,0.16)]"
                              style={{ background: "var(--surface-3)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-1)" }}
                            >
                              {mobile || "+91 9876543210"}
                            </button>
                          )}
                          . Tap to change.
                        </p>

                        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 my-8">
                          {otp.map((d, i) => (
                            <input
                              key={i}
                              ref={(el) => { otpRefs.current[i] = el; }}
                              value={d}
                              onChange={(e) => handleOtpChange(i, e.target.value.slice(-1))}
                              onKeyDown={(e) => handleOtpKey(i, e)}
                              inputMode="numeric"
                              maxLength={1}
                              className="text-center outline-none transition-all w-full"
                              style={{
                                height: 56,
                                border: `1px solid ${d ? "var(--lime-border)" : "rgba(240,235,255,0.08)"}`,
                                background: d ? "rgba(201,220,83,0.08)" : "var(--surface-3)",
                                borderRadius: 10,
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                fontSize: 22,
                                color: d ? "var(--lime-text)" : "var(--text-1)",
                              }}
                            />
                          ))}
                        </div>

                        <div className="mb-6">
                          {resend > 0 ? (
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
                              Resend in <span style={{ color: "var(--text-2)" }}>{String(resend).padStart(2, "0")}s</span>
                            </span>
                          ) : (
                            <button onClick={() => setResend(30)} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)" }}>
                              Resend OTP
                            </button>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => setStep(3)}
                            className="inline-flex items-center gap-1.5 hover:text-[var(--text-1)] transition-colors"
                            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <div className="flex-1">
                            <PrimaryButton disabled={!otpValid} loading={loading} onClick={submit} accent="lime">
                              Verify & start my exam →
                            </PrimaryButton>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Trust line under card */}
          {!done && (
            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}
            >
              <span>FREE</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span>NO APP</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span>60-SEC SETUP</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span>12,400 SCORED THIS MONTH</span>
            </div>
          )}
        </div>

        {/* Live admit card */}
        <LivePass
          name={name}
          mobile={mobile}
          email={email}
          college={collegeQuery}
          degree={degree}
          year={year}
          domain={domain}
          step={step}
          verified={done}
        />
        </div>
      </div>
    </section>
  );
}

function LivePass({
  name, mobile, email, college, degree, year, domain, step, verified,
}: {
  name: string; mobile: string; email: string; college: string; degree: string; year: string; domain: string; step: number; verified: boolean;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const initials = (name.trim() || "").split(/\s+/).map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "—";
  const displayName = name.trim().toUpperCase() || "CANDIDATE NAME";
  const hasCollege = step >= 2 && college.length > 1;
  const hasDomain = step >= 3 && !!domain;
  const hasID = step >= 4 || verified;
  // Deterministic candidate ID from name
  const idFromName = (() => {
    if (!name.trim()) return "JR-25-—————";
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    const code = h.toString(36).toUpperCase().padStart(6, "X").slice(0, 6);
    return `JR-25-${code}`;
  })();
  const candidateID = hasID ? idFromName : step >= 2 ? "JR-25-•••••—" : "JR-25-—————";

  const status = verified ? { label: "VERIFIED ✓", color: "var(--teal)", bg: "rgba(81,193,181,0.12)", border: "rgba(81,193,181,0.4)" }
    : step === 4 ? { label: "PENDING OTP", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.4)" }
    : { label: "DRAFT", color: "var(--violet)", bg: "var(--violet-soft)", border: "var(--violet-border)" };

  // Progress for fill bars at top
  const progress = ((step - 1) + (verified ? 1 : 0)) / 4;

  const ts = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  const date = `2026-05-21`;

  // QR pseudo-pattern (7x7), more dots fill as progress increases
  const qrCells = Array.from({ length: 49 }).map((_, i) => {
    const seed = (i * 31 + 7) % 13;
    const corner = (i < 7 && i % 7 < 3) || (i < 7 * 3 && i % 7 >= 4) || (i >= 7 * 4 && i < 7 * 7 && i % 7 < 3);
    const filled = corner || (seed > 5 && i / 49 < progress + 0.15);
    return filled;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative grain rounded-[18px] overflow-hidden w-full mx-auto lg:sticky lg:top-8"
      style={{
        maxWidth: 400,
        background: "linear-gradient(180deg,#15101F 0%,#0E0B17 100%)",
        border: "1px solid rgba(109,86,164,0.28)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: "rotate(0.6deg)",
      }}
    >
      {/* Top punch holes */}
      <div className="flex items-center justify-between px-5 pt-3">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block rounded-full" style={{ width: 6, height: 6, background: "rgba(240,235,255,0.06)" }} />
        ))}
      </div>

      {/* Header strip */}
      <div className="px-5 pt-3 pb-4 flex items-center justify-between" style={{ borderBottom: "1px dashed rgba(109,86,164,0.25)" }}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.03em" }}>JREE</span>
          <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} />
          <span className="ml-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
            ADMIT CARD
          </span>
        </div>
        <motion.span
          key={status.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-1.5 rounded-full"
          style={{
            padding: "3px 9px",
            background: status.bg,
            border: `1px solid ${status.border}`,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: status.color,
            letterSpacing: "0.02em",
          }}
        >
          <motion.span
            className="block rounded-full"
            style={{ width: 5, height: 5, background: status.color }}
            animate={verified ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          {status.label}
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>CARD PRINT</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(240,235,255,0.05)" }}>
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg,var(--violet),var(--lime))" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-5 pb-4">
        {/* Photo + name */}
        <div className="flex items-start gap-3.5">
          <div
            className="rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden"
            style={{
              width: 64,
              height: 76,
              background: name ? "linear-gradient(135deg,var(--violet),var(--lime))" : "var(--surface-3)",
              border: "1px solid var(--violet-border)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 22,
              color: name ? "var(--on-lime)" : "var(--text-3)",
              letterSpacing: "-0.02em",
            }}
          >
            {initials}
            <span className="absolute bottom-0.5 right-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 6, color: "rgba(255,255,255,0.6)" }}>
              25
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>NAME</div>
            <div className="mt-1 truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: name ? "var(--text-1)" : "var(--text-3)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {displayName}
            </div>
            <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>CONTACT</div>
            <div className="mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
              {mobile || email || "—"}
            </div>
          </div>
        </div>

        {/* College row */}
        <PassRow label="INSTITUTION" filled={hasCollege}>
          {hasCollege ? (
            <span>
              {college}
              {(degree || year) && <span style={{ color: "var(--text-3)" }}> · </span>}
              {degree && <span style={{ fontFamily: "var(--font-mono)" }}>{degree}</span>}
              {degree && year && <span style={{ color: "var(--text-3)" }}> · </span>}
              {year && <span style={{ fontFamily: "var(--font-mono)" }}>{year}</span>}
            </span>
          ) : "— — —"}
        </PassRow>

        {/* Domain row */}
        <div className="mt-3.5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>DOMAIN</div>
          <div className="mt-1.5">
            {hasDomain ? (
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block"
                style={{
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: "1.5px solid var(--lime)",
                  color: "var(--lime-text)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  transform: "rotate(-2deg)",
                  background: "rgba(201,220,83,0.06)",
                }}
              >
                {domain.toUpperCase()}
              </motion.span>
            ) : (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>— — —</span>
            )}
          </div>
        </div>

        {/* Candidate ID */}
        <div className="mt-3.5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>CANDIDATE ID</div>
          <div
            className="mt-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 16,
              background: hasID ? "linear-gradient(135deg,var(--violet),var(--lime))" : "none",
              backgroundClip: hasID ? "text" : "border-box",
              WebkitBackgroundClip: hasID ? "text" : "border-box",
              WebkitTextFillColor: hasID ? "transparent" : (step >= 2 ? "var(--text-2)" : "var(--text-3)"),
              letterSpacing: "0.04em",
            }}
          >
            {candidateID}
          </div>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="relative px-5 my-1">
        <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full" style={{ width: 14, height: 14, background: "var(--bg-2)", border: "1px solid rgba(109,86,164,0.25)" }} />
        <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full" style={{ width: 14, height: 14, background: "var(--bg-2)", border: "1px solid rgba(109,86,164,0.25)" }} />
        <div className="h-px" style={{ background: "repeating-linear-gradient(to right, rgba(109,86,164,0.35) 0 4px, transparent 4px 8px)" }} />
      </div>

      {/* Footer: QR + meta */}
      <div className="px-5 pt-4 pb-3 flex gap-4 items-start">
        <div
          className="rounded-md flex-shrink-0 grid grid-cols-7 gap-[2px] p-1.5"
          style={{
            width: 72, height: 72,
            background: "#F0EBFF",
            opacity: progress > 0.1 ? 1 : 0.2,
            transition: "opacity 400ms",
          }}
        >
          {qrCells.map((on, i) => (
            <span key={i} className="block" style={{ background: on ? "var(--bg)" : "transparent" }} />
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>ISSUED</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-1)" }}>{date}</div>
          <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>STAMP</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)" }}>{ts} IST</div>
          <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>VALID</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>2 years</div>
        </div>
      </div>

      {/* Barcode strip */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-[2px]" style={{ height: 28 }}>
          {Array.from({ length: 56 }).map((_, i) => {
            const w = ((i * 7 + 11) % 5) + 1;
            const isThick = w > 3;
            return (
              <span
                key={i}
                className="block"
                style={{
                  width: isThick ? 2 : 1,
                  height: "100%",
                  background: ((i * 5 + 3) % 4) === 0 ? "transparent" : "var(--text-1)",
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>
        <div className="mt-1.5 flex items-center justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
          <span>{candidateID.replace(/—/g, "X")}</span>
          <span>भारत · INDIA</span>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: 10, top: 130,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 92,
          color: "rgba(109,86,164,0.04)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          transform: "rotate(-12deg)",
        }}
      >
        OFFICIAL
      </div>
    </motion.div>
  );
}

function PassRow({ label, filled, children }: { label: string; filled: boolean; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>{label}</div>
      <motion.div
        key={String(filled)}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-1 truncate"
        style={{ fontFamily: "var(--font-body)", fontSize: 13, color: filled ? "var(--text-1)" : "var(--text-3)", lineHeight: 1.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto rounded-full flex items-center justify-center mb-7"
        style={{ width: 72, height: 72, background: "var(--teal)" }}
      >
        <Check size={36} color="var(--on-lime)" strokeWidth={3} />
      </motion.div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.24em",
          color: "var(--teal)",
          textTransform: "uppercase",
        }}
        className="mb-3"
      >
        Registered
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(28px, 6vw, 40px)",
          color: "var(--text-1)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        You're in.{" "}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
          Now prove it.
        </span>
      </h3>
      <p className="mt-4 mb-8 mx-auto max-w-[360px]" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)" }}>
        Your exam is ready. You have <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>7 days</span> to complete it.
      </p>
      <button
        onClick={() => { window.location.hash = "#dashboard"; }}
        className="w-full rounded-full mb-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          height: 54,
          background: "var(--lime)",
          color: "var(--on-lime)",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 15,
          boxShadow: "0 8px 32px rgba(201,220,83,0.25)",
        }}
      >
        Start my JREE now →
      </button>
      <button
        className="mt-1"
        style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}
      >
        I'll do it later · save my link
      </button>
      <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(240,235,255,0.08)" }}>
        <p className="mb-4" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em", color: "var(--text-3)", textTransform: "uppercase" }}>
          Tell your friends →
        </p>
        <div className="flex gap-2">
          {["WhatsApp", "LinkedIn", "Copy link"].map((s) => (
            <button
              key={s}
              className="flex-1 rounded-full transition-colors hover:border-[var(--violet)]"
              style={{
                height: 42,
                border: "1px solid rgba(240,235,255,0.12)",
                color: "var(--text-2)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                background: "transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
