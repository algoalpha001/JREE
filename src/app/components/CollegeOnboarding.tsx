import { useRef, useState, type Dispatch, type ElementType, type ReactNode, type SetStateAction } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowLeft, Building2, Check, ChevronUp, FileText, Mail, Phone, ShieldCheck, Upload, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const dash = "———";

type FormData = {
  institution: string;
  aishe: string;
  location: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  cohort: string;
  gst: string;
  letter: string;
};

type CheckKey = "aishe" | "gst" | "domain" | "phone" | "cohort" | "letter";

const checks: { key: CheckKey; label: string }[] = [
  { key: "aishe", label: "AISHE" },
  { key: "gst", label: "GST" },
  { key: "domain", label: "Domain" },
  { key: "phone", label: "Phone" },
  { key: "cohort", label: "Cohort" },
  { key: "letter", label: "Letter" },
];

const initialData: FormData = { institution: "", aishe: "", location: "", name: "", role: "", email: "", phone: "", cohort: "", gst: "", letter: "" };

function validGst(value: string) {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value.trim().toUpperCase());
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

function Label({ children }: { children: ReactNode }) {
  return <span className="font-[var(--font-mono)] text-[10px] font-medium uppercase tracking-[.08em] text-[var(--text-3)]">{children}</span>;
}

function Field({ label, value, onChange, placeholder, type = "text", error, hint, icon: Icon, onBlur }: {
  label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; error?: string; hint?: string; icon?: ElementType; onBlur?: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-[var(--font-mono)] text-[10px] font-medium uppercase tracking-[.08em] text-[var(--text-3)]">{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-3)]" size={16} />}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="h-12 w-full rounded-[10px] border bg-[var(--bg)] px-3.5 text-sm text-[var(--text-1)] outline-none transition focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet-soft)]"
          style={{ borderColor: error ? "var(--danger)" : "var(--hairline-strong)", paddingLeft: Icon ? 42 : undefined }}
        />
      </div>
      {(error || hint) && <p className="mt-1.5 text-xs leading-snug" style={{ color: error ? "var(--danger)" : "var(--text-3)" }}>{error || hint}</p>}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block font-[var(--font-mono)] text-[10px] font-medium uppercase tracking-[.08em] text-[var(--text-3)]">{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-[10px] border border-[var(--hairline-strong)] bg-[var(--bg)] px-3.5 text-sm text-[var(--text-1)] outline-none transition focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet-soft)]">
        <option value="">Select role</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

function PrimaryButton({ children, disabled, onClick, loading = false }: { children: ReactNode; disabled?: boolean; onClick: () => void; loading?: boolean }) {
  return <button disabled={disabled || loading} onClick={onClick} className="h-[52px] w-full rounded-full bg-[var(--lime)] px-5 font-[var(--font-display)] text-[15px] font-bold text-[#0B090F] transition hover:brightness-105 active:scale-[.98] disabled:cursor-not-allowed disabled:bg-[var(--hairline-strong)] disabled:text-[var(--text-3)]">{loading ? "Working…" : children}</button>;
}

function Back({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[.08em] text-[var(--text-3)] transition hover:text-[var(--text-1)]"><ArrowLeft size={13} /> Back</button>;
}

function Steps({ step }: { step: number }) {
  const labels = ["Institution", "Your details", "Authorisation", "Verify email"];
  return <ol className="flex items-start" aria-label="Registration progress">{labels.map((label, index) => {
    const number = index + 1; const complete = step > number;
    return <li key={label} className="flex min-w-0 flex-1 items-start last:flex-none">
      <div className="flex flex-col items-center"><span className="flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold" style={{ background: complete ? "var(--lime)" : number === step ? "var(--violet)" : "var(--bg)", color: complete ? "#0B090F" : number === step ? "var(--text-1)" : "var(--text-3)", borderColor: complete || number === step ? "transparent" : "var(--hairline-strong)" }}>{complete ? <Check size={13} strokeWidth={3} /> : number}</span><span className="mt-1.5 whitespace-nowrap text-center font-[var(--font-mono)] text-[8px] uppercase tracking-[.06em] text-[var(--text-3)] sm:text-[9px]">{label}</span></div>
      {index < labels.length - 1 && <span className="mx-1 mt-[13px] h-px flex-1" style={{ background: complete ? "var(--lime)" : "var(--hairline-strong)" }} />}
    </li>;
  })}</ol>;
}

function Value({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <motion.div key={String(children)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease }} className={`min-h-[20px] font-[var(--font-body)] text-[13px] text-[var(--text-1)] ${className}`}>{children || dash}</motion.div>;
}

function Seal() {
  return <div aria-label="Partner certificate seal preview" className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border border-[var(--hairline-strong)] text-center"><ShieldCheck size={13} className="text-[var(--text-3)]" /><span className="mt-0.5 font-[var(--font-mono)] text-[5px] font-semibold tracking-[.08em] text-[var(--text-3)]">JREE</span></div>;
}

function Certificate({ data, step, submitted, gstError }: { data: FormData; step: number; submitted: boolean; gstError: boolean }) {
  const readiness: Record<CheckKey, boolean> = {
    aishe: Boolean(data.institution && data.aishe && data.location), gst: validGst(data.gst), domain: validEmail(data.email), phone: validPhone(data.phone), cohort: Boolean(data.cohort), letter: Boolean(data.letter),
  };
  const ready = checks.filter(({ key }) => readiness[key]).length;
  const status = submitted ? ["PENDING VERIFICATION", "var(--amber-soft)", "var(--amber-text)"] : step === 3 && !data.letter ? ["AWAITING LETTER", "var(--amber-soft)", "var(--amber-text)"] : step >= 4 ? ["VERIFYING EMAIL", "var(--violet-soft)", "var(--violet)"] : ["DRAFT", "var(--violet-soft)", "var(--violet)"];
  const contact = [data.name, data.role].filter(Boolean).join(" · ");
  const footerDate = submitted ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()) : dash;
  return <motion.article layout className="grain relative overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[var(--surface-1)] shadow-[var(--shadow-elevated)]">
    <div className="flex items-start justify-between gap-3 border-b border-dashed border-[var(--violet-border)] px-5 py-4">
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: status[2] }} aria-hidden="true" /><Label>JREE · Partner Certificate</Label></div>
      <AnimatePresence mode="wait"><motion.span key={status[0]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-full border px-2.5 py-1 font-[var(--font-mono)] text-[9px] font-medium tracking-[.055em]" style={{ background: status[1], color: status[2], borderColor: status[2] }}>{status[0]}</motion.span></AnimatePresence>
    </div>
    <div className="border-b border-[var(--hairline)] px-5 py-4">
      <Label>Institution name</Label><Value className={`mt-1 font-[var(--font-display)] font-bold leading-tight tracking-[-.02em] ${data.institution ? "text-[20px]" : "text-[18px] text-[var(--text-3)]"}`}>{data.institution || dash}</Value>
      <div className="mt-3 grid grid-cols-2 gap-3"><div><Label>AISHE code</Label><Value>{data.aishe || dash}</Value></div><div><Label>Location</Label><Value>{data.location || dash}</Value></div></div>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-[var(--hairline)] px-5 py-4">
      <div className="col-span-2"><Label>Authorized contact — name · role</Label><Value>{contact || dash}</Value></div>
      <div className="col-span-2"><Label>Official email</Label><Value>{data.email || dash}</Value></div>
      <div><Label>Cohort size</Label><Value>{data.cohort ? `~${data.cohort.replace(/\D/g, "")} students` : dash}</Value></div>
      <div><Label>GST number</Label><div className="mt-0.5 flex items-center gap-1.5"><Value>{data.gst || dash}</Value>{gstError && data.gst && <AlertTriangle size={13} className="shrink-0 text-[var(--amber-text)]" aria-label="GST number needs attention" />}</div></div>
      <div className="col-span-2"><Label>Authorisation</Label><div className="mt-0.5 flex items-center gap-1.5"><FileText size={13} className={data.letter ? "text-[var(--lime-text)]" : "text-[var(--text-3)]"} /><Value>{data.letter || dash}</Value></div></div>
    </div>
    <div className="border-b border-[var(--hairline)] px-5 py-4"><Label>What we'll check</Label><div className="mt-2 grid grid-cols-3 gap-2 lg:grid-cols-6">{checks.map(({ key, label }) => <motion.div key={key} animate={readiness[key] ? { scale: [1, 1.04, 1], boxShadow: ["0 0 0 rgba(201,220,83,0)", "0 0 15px rgba(201,220,83,.45)", "0 0 0 rgba(201,220,83,0)"] } : { scale: 1 }} transition={{ duration: .42 }} className="flex min-h-11 flex-col items-center justify-center rounded-[8px] border" style={{ background: readiness[key] ? "var(--lime-soft)" : "transparent", borderColor: readiness[key] ? "var(--lime-border)" : "var(--hairline-strong)", color: readiness[key] ? "var(--lime-text)" : "var(--text-3)" }}><span className="mb-0.5 flex h-3 w-3 items-center justify-center rounded-full border" style={{ borderColor: "currentColor", background: readiness[key] ? "var(--lime-text)" : "transparent" }}>{readiness[key] && <Check size={8} color="var(--bg)" strokeWidth={4} />}</span><span className="font-[var(--font-mono)] text-[9px] uppercase tracking-[.05em]">{label}</span></motion.div>)}</div><p className="mt-2 font-[var(--font-body)] text-[10px] leading-snug text-[var(--text-3)]">{ready}/6 items supplied — readiness only; automatic checks run after submission.</p></div>
    <div className="flex items-end justify-between gap-3 px-5 py-4"><div className="grid gap-2"><div><Label>Partner ID</Label><Value className="font-[var(--font-mono)] text-[11px] tracking-[.05em]">JR-COL-26-—————</Value></div><div className="flex gap-4"><div><Label>Submitted</Label><Value className="text-[11px]">{footerDate}</Value></div><div><Label>Typical review</Label><Value className="text-[11px]">{submitted ? "1–2 business days" : dash}</Value></div></div></div><Seal /></div>
  </motion.article>;
}

function StepOne({ data, setData, next }: { data: FormData; setData: Dispatch<SetStateAction<FormData>>; next: () => void }) {
  const selected = data.institution.trim().length > 2;
  return <motion.div key="one" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}><h2 className="font-[var(--font-display)] text-[25px] font-bold tracking-[-.02em]">Find your institution</h2><p className="mt-1 text-sm text-[var(--text-3)]">Search the AISHE register to start your partner certificate.</p><div className="mt-7 grid gap-5"><Field label="Institution search" value={data.institution} onChange={(institution) => setData((old) => ({ ...old, institution, aishe: institution.trim().length > 2 ? "S-11234" : "", location: institution.trim().length > 2 ? "Pune, Maharashtra" : "" }))} placeholder="Start typing your college name" icon={Building2} />{selected && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="rounded-[10px] border border-[var(--lime-border)] bg-[var(--lime-soft)] p-3.5"><div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-1)]"><Check size={15} className="text-[var(--lime-text)]" />AISHE register match selected</div><p className="mt-1 pl-6 text-xs text-[var(--text-3)]">{data.aishe} · {data.location}</p></motion.div>}<Field label="AISHE code" value={data.aishe} onChange={(aishe) => setData((old) => ({ ...old, aishe }))} placeholder="e.g. S-11234" /><Field label="Location" value={data.location} onChange={(location) => setData((old) => ({ ...old, location }))} placeholder="City, State" /><PrimaryButton disabled={!data.institution || !data.aishe || !data.location} onClick={next}>Continue →</PrimaryButton></div></motion.div>;
}

function StepTwo({ data, setData, back, next, gstTouched, setGstTouched }: { data: FormData; setData: Dispatch<SetStateAction<FormData>>; back: () => void; next: () => void; gstTouched: boolean; setGstTouched: (value: boolean) => void }) {
  const gstError = gstTouched && Boolean(data.gst) && !validGst(data.gst);
  const valid = data.name.trim().length > 2 && data.role && validEmail(data.email) && validPhone(data.phone) && Boolean(data.cohort);
  return <motion.div key="two" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}><div className="flex items-start justify-between gap-4"><div><h2 className="font-[var(--font-display)] text-[25px] font-bold tracking-[-.02em]">Your details</h2><p className="mt-1 text-sm text-[var(--text-3)]">The authorized contact for this partnership.</p></div><Back onClick={back} /></div><div className="mt-7 grid gap-5"><Field label="Your name" value={data.name} onChange={(name) => setData((old) => ({ ...old, name }))} placeholder="e.g. Dr. Ananya Shah" /><Select label="Your role" value={data.role} onChange={(role) => setData((old) => ({ ...old, role }))} options={["Training & Placement Officer", "Principal", "Dean", "Registrar", "Director"]} /><Field label="Official email" value={data.email} onChange={(email) => setData((old) => ({ ...old, email }))} placeholder="you@college.edu.in" type="email" icon={Mail} /><Field label="Phone" value={data.phone} onChange={(phone) => setData((old) => ({ ...old, phone }))} placeholder="+91 98765 43210" type="tel" icon={Phone} /><Field label="Students, roughly" value={data.cohort} onChange={(cohort) => setData((old) => ({ ...old, cohort }))} placeholder="e.g. 240" type="number" /><Field label="GST number" value={data.gst} onChange={(gst) => setData((old) => ({ ...old, gst: gst.toUpperCase() }))} onBlur={() => setGstTouched(true)} placeholder="22AAAAA0000A1Z5" error={gstError ? "Not a valid GST number" : undefined} hint="Optional — required for invoicing." /><PrimaryButton disabled={!valid} onClick={next}>Continue →</PrimaryButton></div></motion.div>;
}

function StepThree({ data, setData, back, next }: { data: FormData; setData: Dispatch<SetStateAction<FormData>>; back: () => void; next: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return <motion.div key="three" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}><div className="flex items-start justify-between gap-4"><div><h2 className="font-[var(--font-display)] text-[25px] font-bold tracking-[-.02em]">Authorisation</h2><p className="mt-1 text-sm text-[var(--text-3)]">A signed letter confirms you can register your college.</p></div><Back onClick={back} /></div><div className="mt-7"><input ref={fileRef} className="sr-only" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => { const file = event.target.files?.[0]; if (file) setData((old) => ({ ...old, letter: file.name })); }} /><button onClick={() => fileRef.current?.click()} className="flex min-h-44 w-full flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[var(--hairline-strong)] bg-[var(--bg-2)] px-5 text-center transition hover:border-[var(--violet-border)]" style={{ borderColor: data.letter ? "var(--lime-border)" : undefined }}>{data.letter ? <><Check size={22} className="text-[var(--lime-text)]" /><span className="mt-2 text-sm font-semibold">{data.letter}</span><span className="mt-1 text-xs text-[var(--text-3)]">Letter received — choose another file to replace it.</span></> : <><Upload size={22} className="text-[var(--violet)]" /><span className="mt-2 text-sm font-semibold">Upload authorisation letter</span><span className="mt-1 text-xs text-[var(--text-3)]">Signed by the Principal, Registrar, or VC · PDF, JPG, PNG</span></>}</button><label className="mt-5 flex gap-3 text-sm leading-relaxed text-[var(--text-2)]"><input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--violet)]" />I confirm I am authorized to register this institution as a JREE partner.</label><div className="mt-7"><PrimaryButton disabled={!data.letter} onClick={next}>Continue →</PrimaryButton></div></div></motion.div>;
}

function StepFour({ data, back, submit }: { data: FormData; back: () => void; submit: () => void }) {
  const [sent, setSent] = useState(false); const [code, setCode] = useState(""); const [verified, setVerified] = useState(false);
  return <motion.div key="four" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}><div className="flex items-start justify-between gap-4"><div><h2 className="font-[var(--font-display)] text-[25px] font-bold tracking-[-.02em]">Verify email</h2><p className="mt-1 text-sm text-[var(--text-3)]">Confirm your institutional address before submission.</p></div><Back onClick={back} /></div><div className="mt-7 rounded-[12px] border border-[var(--hairline-strong)] bg-[var(--bg-2)] p-4"><Label>Sending code to</Label><p className="mt-1 text-sm font-medium">{data.email}</p></div>{!sent ? <button onClick={() => setSent(true)} className="mt-5 h-11 w-full rounded-full border border-[var(--violet-border)] text-xs font-semibold uppercase tracking-[.06em] text-[var(--violet)]">Send OTP</button> : <div className="mt-5"><Field label="6-digit OTP" value={code} onChange={(value) => { const next = value.replace(/\D/g, "").slice(0, 6); setCode(next); if (next.length === 6) setVerified(true); }} placeholder="Enter code" /><p className="mt-2 text-xs text-[var(--text-3)]">Demo: any six digits verifies this address.</p></div>}<div className="mt-7"><PrimaryButton disabled={!verified} onClick={submit}>Submit application →</PrimaryButton></div></motion.div>;
}

export function CollegeOnboarding() {
  const [data, setData] = useState<FormData>(initialData); const [step, setStep] = useState(1); const [submitted, setSubmitted] = useState(false); const [sheetOpen, setSheetOpen] = useState(false); const [gstTouched, setGstTouched] = useState(false);
  const gstError = gstTouched && Boolean(data.gst) && !validGst(data.gst);
  const cert = <Certificate data={data} step={step} submitted={submitted} gstError={gstError} />;
  return <section className="relative px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-32"><div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(94,74,158,.1),transparent_68%)] blur-2xl" /><div className="relative mx-auto max-w-[1160px]"><header className="mb-8 text-center md:mb-10"><Label>College Partner Registration</Label><h1 className="mt-3 font-[var(--font-display)] text-[clamp(30px,4vw,45px)] font-extrabold tracking-[-.03em] text-[var(--text-1)]">Build your <span className="font-normal italic text-[var(--violet)]">partner record.</span></h1><p className="mt-2 text-sm text-[var(--text-3)]">Your certificate is prepared alongside your application.</p></header>
    <button onClick={() => setSheetOpen(true)} className="mb-4 flex w-full items-center justify-between rounded-[12px] border border-[var(--violet-border)] bg-[var(--surface-1)] px-4 py-3 text-left shadow-[var(--shadow-card)] md:hidden" aria-haspopup="dialog"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--violet)]" /><span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[.07em]">Partner Certificate</span></span><span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[.06em] text-[var(--violet)]">View <ChevronUp size={13} /></span></button>
    <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.22fr)_minmax(360px,.98fr)]"><main className="grain relative rounded-[22px] border border-[var(--hairline)] bg-[var(--surface-1)] p-6 shadow-[var(--shadow-elevated)] sm:p-9">{submitted ? <div className="py-5 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--violet-soft)]"><Check className="text-[var(--violet)]" /></div><h2 className="mt-5 font-[var(--font-display)] text-[28px] font-bold tracking-[-.02em]">Application submitted</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-3)]">Your Partner Certificate is now pending verification. We’ll review it in 1–2 business days.</p><button onClick={() => { window.location.hash = "for-colleges"; }} className="mt-7 h-11 rounded-full bg-[var(--violet)] px-6 text-sm font-semibold text-white">Back to colleges</button></div> : <><Steps step={step} /><div className="mt-8"><AnimatePresence mode="wait">{step === 1 && <StepOne data={data} setData={setData} next={() => setStep(2)} />}{step === 2 && <StepTwo data={data} setData={setData} back={() => setStep(1)} next={() => setStep(3)} gstTouched={gstTouched} setGstTouched={setGstTouched} />}{step === 3 && <StepThree data={data} setData={setData} back={() => setStep(2)} next={() => setStep(4)} />}{step === 4 && <StepFour data={data} back={() => setStep(3)} submit={() => setSubmitted(true)} />}</AnimatePresence></div></>}</main><aside className="sticky top-20 hidden md:block">{cert}<p className="mt-3 text-center font-[var(--font-mono)] text-[9px] uppercase tracking-[.07em] text-[var(--text-3)]">Live Partner Certificate</p></aside></div>
    <AnimatePresence>{sheetOpen && <><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(false)} className="fixed inset-0 z-[200] bg-[#1A1525]/55 backdrop-blur-sm md:hidden" /><motion.section role="dialog" aria-modal="true" aria-label="Partner Certificate" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: .35, ease }} className="fixed inset-x-0 bottom-0 z-[201] max-h-[90vh] overflow-y-auto rounded-t-[24px] bg-[var(--bg)] pb-8 md:hidden"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--bg)] px-5 py-4"><Label>Partner Certificate</Label><button onClick={() => setSheetOpen(false)} className="rounded-full p-1 text-[var(--text-3)]" aria-label="Close certificate"><X size={20} /></button></div><div className="p-5">{cert}</div></motion.section></>}</AnimatePresence>
  </div></section>;
}
