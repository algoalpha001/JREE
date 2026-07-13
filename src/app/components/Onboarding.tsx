import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, Upload, ShieldCheck, Lock, Mail, Phone, Key } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  valid,
  locked,
  error,
  autoFocus,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  hint?: string;
  valid?: boolean;
  locked?: boolean;
  error?: string;
  autoFocus?: boolean;
  icon?: any;
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
        {Icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]">
            <Icon size={18} />
          </span>
        )}
        <motion.input
          type={type}
          value={value}
          readOnly={locked}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          animate={error ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full outline-none transition-all ${locked ? "cursor-not-allowed opacity-80" : ""}`}
          style={{
            height: 54,
            borderRadius: 8,
            border: `1px solid ${error ? "var(--danger)" : (valid || locked) ? "var(--lime-border)" : "var(--hairline-strong)"}`,
            background: locked ? "var(--bg-3)" : "var(--surface-3)",
            padding: `0 18px 0 ${Icon ? 46 : 18}px`,
            paddingRight: (valid || locked) ? 100 : 18,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: locked ? "var(--text-2)" : "var(--text-1)",
          }}
        />
        {(valid || locked) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[rgba(81,193,181,0.08)] border border-[rgba(81,193,181,0.2)]">
            {locked && <Lock size={12} className="text-[var(--amber)]" />}
            <span style={{ color: "var(--teal-text)", fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono)" }}>VERIFIED</span>
          </div>
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

function PrimaryButton({ children, disabled, onClick, loading }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; loading?: boolean }) {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className="w-full rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
      style={{
        height: 54,
        background: "var(--violet)",
        color: "var(--on-violet)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: "-0.01em",
        opacity: disabled || loading ? 0.4 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: "var(--shadow-card)",
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

const streams = [
  {
    label: "Engineering and IT",
    value: "engineering_it",
    tracks: ["Computer Science & IT", "Mechanical", "Electronics", "Electrical", "Civil", "Data Science"],
  },
  {
    label: "Commerce and Management",
    value: "commerce_management",
    tracks: ["Finance", "Marketing", "Human Resources", "Business Analytics", "Accountancy"],
  },
  {
    label: "Science and Humanities",
    value: "science_humanities",
    tracks: ["Physics", "Psychology", "Economics", "Literature", "Biotechnology"],
  },
];

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4].map((n) => {
        const isCurrent = step === n;
        const isDone = step > n;
        const active = isDone || isCurrent;
        const labels = ["Upload", "Confirm", "Info", "Consent"];
        return (
          <div key={n} className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center w-full gap-2">
              <motion.div
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className="rounded-full flex items-center justify-center transition-colors shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: isDone || isCurrent ? "var(--violet)" : "var(--surface-3)",
                  border: active ? "none" : "1px solid var(--hairline-strong)",
                  color: active ? "var(--on-violet)" : "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : n}
              </motion.div>
              {n < 4 && (
                <div
                  className="flex-1 h-px transition-colors"
                  style={{ background: isDone ? "var(--violet)" : "var(--hairline-strong)" }}
                />
              )}
            </div>
            <span style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: 10, 
              color: isCurrent ? "var(--violet)" : "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.02em"
            }}>
              {labels[n-1]}
            </span>
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

  // Form Data
  const [collegeIdFile, setCollegeIdFile] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [stream, setStream] = useState("");
  const [track, setTrack] = useState("");
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [consent, setConsent] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Scanning simulation
  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setName("KARTIK RITESH KHANDELWAL");
      setCollege("Birla Institute of Technology & Science, Pilani Hyderabad Campus");
      setCollegeId("2023B2A41333H");
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const selectedStreamObj = streams.find(s => s.value === stream);

  const step3Valid = email.includes("@") && otpVerified && mobile.length >= 10 && password.length >= 6 && password === confirmPassword;

  const handleVerifyOtp = () => {
    if (otp.some(d => d === "")) return;
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpVerified(true);
    }, 1200);
  };

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
          // canvas-confetti optional
        }
      })();
    }, 1000);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  return (
    <section id="signup" className="relative py-16 md:py-28 px-5 sm:px-8 md:px-12 lg:px-[72px]" style={{ background: "var(--bg)" }}>

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(109,86,164,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      <div className="relative max-w-[1160px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "var(--text-1)",
            letterSpacing: "-0.03em",
          }}>
            Create your JREE account
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-3)", marginTop: 8 }}>
            Start your employability journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start max-w-[1040px] mx-auto">
          {/* Form Card */}
          <div className="grain relative p-7 sm:p-9 rounded-[24px]" style={{
            background: "var(--surface-1)",
            border: "1px solid var(--hairline)",
            boxShadow: "var(--shadow-elevated)"
          }}>
            {done ? (
              <SuccessState />
            ) : (
              <>
                <ProgressDots step={step} />
                
                <div className="mt-10">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)" }}>
                          Upload your College ID or Marks Memo
                        </h3>
                        <p style={{ color: "var(--text-3)", fontSize: 14, marginTop: 4 }}>
                          We will scan your document to verify your identity. The document is not stored.
                        </p>
                        
                        <label className="mt-8 relative block rounded-[16px] border-2 border-dashed border-[var(--hairline-strong)] p-10 text-center cursor-pointer hover:border-[var(--violet)] transition-colors group">
                          <input type="file" className="sr-only" onChange={(e) => setCollegeIdFile(e.target.files?.[0]?.name || null)} />
                          <div className="flex flex-col items-center">
                            <Upload size={32} className="text-violet mb-4 group-hover:scale-110 transition-transform" />
                            <span style={{ fontWeight: 600, color: "var(--text-1)" }}>{collegeIdFile || "Click to upload or drag and drop"}</span>
                            <span style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>JPG, PNG or PDF — max 5MB</span>
                          </div>
                        </label>

                        <div className="mt-8">
                          <PrimaryButton disabled={!collegeIdFile} loading={loading} onClick={handleScan}>
                            Scan Document →
                          </PrimaryButton>
                        </div>
                        <p className="mt-4 text-center" style={{ fontSize: 12, color: "var(--text-3)" }}>
                          Accepted: College ID card or Final year Marks Memo
                        </p>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center justify-between mb-6">
                          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)" }}>
                            Confirm your details
                          </h3>
                          <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors text-xs font-mono uppercase">
                            <ArrowLeft size={14} /> Back
                          </button>
                        </div>
                        <p style={{ color: "var(--text-3)", fontSize: 14, marginTop: -12, marginBottom: 24 }}>
                          These details were read from your document and are locked for security.
                        </p>

                        <Field label="Full Name" value={name} onChange={setName} placeholder="" locked />
                        <Field label="College" value={college} onChange={setCollege} placeholder="" locked />
                        <Field label="College ID" value={collegeId} onChange={setCollegeId} placeholder="" locked />

                        <div className="mb-5">
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)", textTransform: "uppercase" }}>Stream</label>
                          <select 
                            value={stream} 
                            onChange={(e) => { setStream(e.target.value); setTrack(""); }}
                            className="w-full h-[54px] rounded-[8px] px-4 mt-2 bg-[var(--surface-3)] border border-[var(--hairline-strong)] outline-none text-[var(--text-1)]"
                          >
                            <option value="">Select your stream</option>
                            {streams.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        </div>

                        {stream && (
                          <div className="mb-8">
                            <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)", textTransform: "uppercase" }}>Track / Specialization</label>
                            <select 
                              value={track} 
                              onChange={(e) => setTrack(e.target.value)}
                              className="w-full h-[54px] rounded-[8px] px-4 mt-2 bg-[var(--surface-3)] border border-[var(--hairline-strong)] outline-none text-[var(--text-1)]"
                            >
                              <option value="">Select your track</option>
                              {selectedStreamObj?.tracks.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        )}

                        <PrimaryButton disabled={!stream || !track} onClick={advance}>
                          Continue →
                        </PrimaryButton>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center justify-between mb-6">
                          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)" }}>
                            Your Information
                          </h3>
                          <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors text-xs font-mono uppercase">
                            <ArrowLeft size={14} /> Back
                          </button>
                        </div>
                        <p style={{ color: "var(--text-3)", fontSize: 14, marginTop: -12, marginBottom: 24 }}>
                          Secure your JREE account with verified credentials.
                        </p>

                        <div className="relative">
                          <Field label="Email Address" value={email} onChange={setEmail} placeholder="email@example.com" icon={Mail} />
                          {!otpSent ? (
                            <button 
                              onClick={() => setOtpSent(true)}
                              className="absolute right-4 top-[38px] h-[32px] px-3 rounded-md bg-[rgba(109,86,164,0.15)] text-[11px] font-bold text-[var(--violet-strong)] hover:bg-[rgba(109,86,164,0.25)] transition-colors"
                            >
                              SEND OTP
                            </button>
                      ) : (
                        <div className="mb-6">
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)", textTransform: "uppercase" }}>OTP sent to email</label>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="grid grid-cols-6 gap-2 flex-1">
                              {otp.map((d, i) => (
                                <input
                                  key={i}
                                  ref={(el) => { otpRefs.current[i] = el; }}
                                  value={d}
                                  readOnly={otpVerified}
                                  onChange={(e) => handleOtpChange(i, e.target.value.slice(-1))}
                                  className={`w-full h-12 text-center bg-[var(--surface-3)] border rounded-md outline-none text-[var(--text-1)] font-mono text-xl transition-all ${otpVerified ? "border-[var(--lime-border)]" : "border-[var(--hairline-strong)]"}`}
                                />
                              ))}
                            </div>
                            <button
                              onClick={handleVerifyOtp}
                              disabled={otp.some(d => d === "") || otpVerified || otpLoading}
                              className={`h-12 px-4 rounded-md font-bold text-xs transition-all flex items-center justify-center min-w-[80px] ${
                                otpVerified 
                                  ? "bg-[rgba(81,193,181,0.1)] text-[var(--teal)] border border-[rgba(81,193,181,0.3)]" 
                                  : "bg-[var(--violet)] text-[var(--on-violet)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                              }`}
                            >
                              {otpLoading ? (
                                <span className="w-4 h-4 border-2 border-[var(--on-violet)] border-t-transparent rounded-full animate-spin" />
                              ) : otpVerified ? (
                                <Check size={16} strokeWidth={3} />
                              ) : (
                                "VERIFY"
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                        </div>

                        <Field label="Mobile Number" value={mobile} onChange={setMobile} placeholder="9876543210" type="tel" icon={Phone} />
                        <Field label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" icon={Key} />
                        <Field label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" type="password" icon={Key} />

                        <PrimaryButton disabled={!step3Valid} onClick={advance}>
                          Review Details →
                        </PrimaryButton>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center justify-between mb-6">
                          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)" }}>
                            Final Confirmation
                          </h3>
                          <button onClick={() => setStep(3)} className="flex items-center gap-1.5 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors text-xs font-mono uppercase">
                            <ArrowLeft size={14} /> Back
                          </button>
                        </div>
                        <p style={{ color: "var(--text-3)", fontSize: 14, marginTop: -12, marginBottom: 24 }}>
                          Almost there. Review your profile and give consent.
                        </p>

                        <div className="p-5 rounded-xl bg-[var(--surface-3)] border border-[var(--hairline)] mb-8 space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-[var(--text-3)] text-xs font-mono uppercase">Name</span>
                            <span className="font-bold text-[var(--text-1)] text-right">{name}</span>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-[var(--text-3)] text-xs font-mono uppercase">College</span>
                            <span className="font-medium text-[var(--text-1)] text-right text-sm max-w-[240px] leading-snug">{college}</span>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-[var(--text-3)] text-xs font-mono uppercase">Specialization</span>
                            <span className="font-bold text-[var(--text-1)] text-right">{track}</span>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-[var(--text-3)] text-xs font-mono uppercase">Email</span>
                            <span className="font-medium text-[var(--text-1)]">{email}</span>
                          </div>
                        </div>

                        <label className="flex gap-4 items-start mb-10 cursor-pointer group">
                          <div className="relative mt-1">
                            <input 
                              type="checkbox" 
                              checked={consent} 
                              onChange={(e) => setConsent(e.target.checked)} 
                              className="w-5 h-5 rounded border-2 border-[var(--hairline-strong)] bg-transparent appearance-none checked:bg-[var(--violet)] checked:border-[var(--violet)] transition-all cursor-pointer" 
                            />
                            {consent && <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -mt-0.5 text-[var(--on-violet)] pointer-events-none" strokeWidth={4} />}
                          </div>
                          <span className="text-[13px] leading-relaxed text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors">
                            I consent to EduBridge Technologies collecting and processing my personal data for the purpose of employability assessment as per the <span className="text-[var(--violet)] font-bold">DPDP Act 2023</span>. I confirm that all details are accurate.
                          </span>
                        </label>

                        <PrimaryButton disabled={!consent} loading={loading} onClick={submit}>
                          Create Account & Start →
                        </PrimaryButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Syncing Admit Card Side */}
          <div className="lg:sticky lg:top-8">
             <LivePass
               name={name}
               mobile={mobile}
               email={email}
               college={college}
               degree={""}
               year={""}
               domain={track}
               collegeIdName={collegeId}
               step={step}
               verified={done}
             />
             {!done && (
               <div className="mt-8 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>
                 REAL-TIME ADMIT CARD PREVIEW
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LivePass({
  name, mobile, email, college, degree, year, domain, collegeIdName, step, verified,
}: {
  name: string; mobile: string; email: string; college: string; degree: string; year: string; domain: string; collegeIdName: string; step: number; verified: boolean;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const initials = (name.trim() || "").split(/\s+/).map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "—";
  const displayName = name.trim().toUpperCase() || "CANDIDATE NAME";
  const hasCollege = step >= 2 && college.length > 1;
  const hasCollegeID = step >= 2 && !!collegeIdName;
  const hasDomain = step >= 2 && !!domain;
  const hasID = step >= 3 || verified;
  
  const idFromName = (() => {
    if (!name.trim()) return "JR-26-—————";
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    const code = h.toString(36).toUpperCase().padStart(6, "X").slice(0, 6);
    return `JR-26-${code}`;
  })();
  const candidateID = hasID ? idFromName : step >= 2 ? "JR-26-•••••—" : "JR-26-—————";

  const status = verified ? { label: "VERIFIED ✓", color: "var(--teal-text)", bg: "rgba(81,193,181,0.12)", border: "rgba(81,193,181,0.4)" }
    : step === 4 ? { label: "CONSENT PENDING", color: "var(--amber)", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.4)" }
    : { label: "DRAFT PASS", color: "var(--violet)", bg: "var(--violet-soft)", border: "var(--violet-border)" };

  const progress = ((step - 1) + (verified ? 1 : 0)) / 4;
  const ts = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  const date = `2026-07-02`;

  const qrCells = Array.from({ length: 49 }).map((_, i) => {
    const seed = (i * 31 + 7) % 13;
    const corner = (i < 7 && i % 7 < 3) || (i < 7 * 3 && i % 7 >= 4) || (i >= 7 * 4 && i < 7 * 7 && i % 7 < 3);
    const filled = corner || (seed > 5 && i / 49 < progress + 0.15);
    return filled;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="relative grain rounded-[18px] overflow-hidden w-full mx-auto"
      style={{
        maxWidth: 400,
        background: "linear-gradient(180deg,var(--surface-1) 0%,var(--bg-2) 100%)",
        border: "1px solid rgba(109,86,164,0.28)",
        boxShadow: "var(--shadow-elevated)",
        transform: "rotate(0.6deg)",
      }}
    >
      <div className="flex items-center justify-between px-5 pt-3">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block rounded-full" style={{ width: 6, height: 6, background: "var(--hairline)" }} />
        ))}
      </div>

      <div className="px-5 pt-3 pb-4 flex items-center justify-between" style={{ borderBottom: "1px dashed rgba(109,86,164,0.25)" }}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.03em" }}>JREE</span>
          <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} />
          <span className="ml-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>ADMIT CARD</span>
        </div>
        <motion.span
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

      <div className="px-5 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>CARD PRINT</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "var(--hairline)" }}>
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg,var(--violet),var(--lime))" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </div>

      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start gap-3.5">
          <div
            className="rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden"
            style={{
              width: 64, height: 76,
              background: name ? "linear-gradient(135deg,var(--violet),var(--lime))" : "var(--surface-3)",
              border: "1px solid var(--violet-border)",
              fontFamily: "var(--font-display)",
              fontWeight: 800, fontSize: 22,
              color: name ? "var(--bg)" : "var(--text-3)",
            }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>NAME</div>
            <div className="mt-1 truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: name ? "var(--text-1)" : "var(--text-3)", lineHeight: 1.1 }}>
              {displayName}
            </div>
            <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>CONTACT</div>
            <div className="mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)" }}>
              {email || mobile || "—"}
            </div>
          </div>
        </div>

        <PassRow label="INSTITUTION" filled={hasCollege}>{hasCollege ? college : "— — —"}</PassRow>
        <PassRow label="COLLEGE ID" filled={hasCollegeID}>{hasCollegeID ? collegeIdName : "— — —"}</PassRow>
        
        <div className="mt-3.5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>DOMAIN</div>
          <div className="mt-1.5">
            {hasDomain ? (
              <span className="inline-block px-2.5 py-1 rounded bg-[rgba(201,220,83,0.1)] border border-[rgba(201,220,83,0.3)] text-[var(--lime)] font-display font-bold text-[10px] uppercase tracking-wider">
                {domain}
              </span>
            ) : <span className="text-[var(--text-3)] text-xs">— — —</span>}
          </div>
        </div>

        <div className="mt-3.5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>CANDIDATE ID</div>
          <div className="mt-1 font-mono font-bold text-lg text-[var(--text-1)] tracking-widest">{candidateID}</div>
        </div>
      </div>

      <div className="relative px-5 my-1">
        <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full w-3 h-3 bg-[var(--bg-2)] border border-[rgba(109,86,164,0.25)]" />
        <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full w-3 h-3 bg-[var(--bg-2)] border border-[rgba(109,86,164,0.25)]" />
        <div className="h-px bg-dashed bg-[rgba(109,86,164,0.25)]" />
      </div>

      <div className="px-5 pt-4 pb-4 flex gap-4 items-start">
        <div className="rounded-md w-16 h-16 bg-white p-1.5 grid grid-cols-7 gap-0.5 opacity-90">
          {qrCells.map((on, i) => (
            <span key={i} className={`block w-full h-full ${on ? "bg-black" : "bg-transparent"}`} />
          ))}
        </div>
        <div className="flex-1 space-y-1.5 font-mono text-[10px] text-[var(--text-3)]">
          <div>ISSUED: <span className="text-[var(--text-1)]">{date}</span></div>
          <div>STAMP: <span className="text-[var(--lime)]">{ts} IST</span></div>
          <div>VALID: <span className="text-[var(--text-1)]">2 YEARS</span></div>
        </div>
      </div>
    </motion.div>
  );
}

function PassRow({ label, filled, children }: { label: string; filled: boolean; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>{label}</div>
      <div className="mt-1 truncate text-xs text-[var(--text-1)] font-medium leading-relaxed">
        {filled ? children : <span className="text-[var(--text-3)]">— — —</span>}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
      <div className="mx-auto w-16 h-16 rounded-full bg-[var(--teal)] flex items-center justify-center mb-6">
        <Check size={32} className="text-[var(--on-teal)]" strokeWidth={3} />
      </div>
      <h3 className="text-2xl font-display font-extrabold text-[var(--text-1)] mb-2">Registration Complete</h3>
      <p className="text-[var(--text-3)] text-sm mb-8 max-w-[300px] mx-auto">Your JREE account is verified and ready. Start your journey today.</p>
      <PrimaryButton onClick={() => window.location.hash = "dashboard"}>Enter Dashboard →</PrimaryButton>
    </motion.div>
  );
}
