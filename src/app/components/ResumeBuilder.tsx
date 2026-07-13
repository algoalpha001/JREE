import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Sparkles, FileText, Upload, ChevronRight, ChevronLeft, 
  Save, Check, MessageSquare, Download, Info, Star,
  Award, Briefcase, GraduationCap, User, Target, Layers, X
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const STEPS: { n: Step; name: string; icon: any }[] = [
  { n: 1, name: "Personal", icon: User },
  { n: 2, name: "Objective", icon: Target },
  { n: 3, name: "Education", icon: GraduationCap },
  { n: 4, name: "Skills", icon: Star },
  { n: 5, name: "Projects", icon: Briefcase },
  { n: 6, name: "Certifications", icon: Award },
  { n: 7, name: "Template", icon: Layers },
  { n: 8, name: "Preview", icon: Check },
];

export function ResumeBuilder() {
  const [entryMode, setEntryScreen] = useState<"choice" | "flow">("choice");
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [objective, setObjective] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // Form Data
  const [personal, setPersonal] = useState({
    name: "KARTIK RITESH KHANDELWAL",
    email: "kartik@college.edu",
    phone: "9579176271",
    stream: "Engineering and IT",
    score: "87"
  });

  const [skills, setSkills] = useState([
    "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Python"
  ]);

  const advance = () => {
    if (step < 8) setStep((s) => (s + 1) as Step);
  };

  const back = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
    else setEntryScreen("choice");
  };

  const handleGenerateAi = () => {
    setIsAiTyping(true);
    setObjective("");
    const text = "Aspiring Software Engineer with a JREE score of 87, specializing in full-stack development and professional job readiness. Committed to building efficient, scalable applications and contributing to India's growing digital economy.";
    let i = 0;
    const interval = setInterval(() => {
      setObjective(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsAiTyping(false);
      }
    }, 20);
  };

  if (entryMode === "choice") {
    return <EntryScreen onChoice={() => setEntryScreen("flow")} />;
  }

  return (
    <div className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      {/* Background radial glow */}
      <div 
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(109,86,164,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Persistent Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10" style={{
        height: 64, background: "rgba(250,247,240,0.94)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderBottom: "1px solid var(--hairline)",
      }}>
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = "dashboard"} className="flex items-end leading-none">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-1)", letterSpacing: "var(--ls-display)" }}>JREE</span>
          </button>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2">
            <Sparkles size={16} color="var(--lime)" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-1)" }}>AI Resume Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[var(--violet-soft)] transition-colors">
            <Save size={14} color="var(--text-3)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.05em" }}>SAVE DRAFT</span>
          </button>
          <button onClick={() => window.location.hash = "dashboard"} className="p-2 rounded-full hover:bg-[var(--violet-soft)] transition-colors">
            <X size={20} color="var(--text-2)" />
          </button>
        </div>
      </header>

      {/* Progress Section */}
      <div className="fixed top-16 left-0 right-0 z-40 px-6 py-4" style={{ background: "var(--bg)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
               <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", fontWeight: 600 }}>
                 STEP {step}/08
               </span>
               <AnimatePresence mode="wait">
                 <motion.span
                   key={step}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                   style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}
                 >
                   {STEPS.find(s => s.n === step)?.name}
                 </motion.span>
               </AnimatePresence>
             </div>
             <div className="flex gap-1.5">
               {STEPS.map(s => (
                 <div key={s.n} className="w-1.5 h-1.5 rounded-full" style={{ background: s.n <= step ? "var(--lime)" : "var(--hairline)" }} />
               ))}
             </div>
          </div>
          <div className="h-1 w-full bg-[var(--violet-soft)] rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${(step / 8) * 100}%` }}
              transition={{ duration: 0.5, ease }}
              className="h-full bg-[var(--lime)]"
              style={{ boxShadow: "0 0 10px rgba(201, 220, 83, 0.4)" }}
            />
          </div>
        </div>
      </div>

      {/* Main Flow Area */}
      <main className="pt-44 pb-32 px-6 overflow-x-hidden">
        <div className="max-w-[800px] mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              {step === 1 && <Step1Personal data={personal} />}
              {step === 2 && <Step2Objective value={objective} onGenerate={handleGenerateAi} isTyping={isAiTyping} onChange={setObjective} />}
              {step === 3 && <Step3Education />}
              {step === 4 && <Step4Skills skills={skills} setSkills={setSkills} />}
              {step === 5 && <Step5Projects />}
              {step === 6 && <Step6Certifications />}
              {step === 7 && <Step7Template selected={selectedTemplate} onSelect={setSelectedTemplate} />}
              {step === 8 && <Step8Preview data={{ ...personal, objective, skills, template: selectedTemplate }} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--hairline)]" style={{ 
        background: "rgba(250,247,240,.94)", backdropFilter: "blur(16px)"
      }}>
        <div className="max-w-[800px] mx-auto px-6 h-20 flex items-center justify-between">
           <button 
             onClick={back}
             className="flex items-center gap-2 px-6 h-12 rounded-full border border-[var(--hairline-strong)] hover:bg-[var(--violet-soft)] transition-all text-sm font-medium text-[var(--text-1)]"
           >
             <ChevronLeft size={18} /> Back
           </button>

           <div className="flex items-center gap-4">
             {step < 8 ? (
               <button 
                 onClick={advance}
                 className="flex items-center gap-2 px-8 h-12 rounded-full bg-[var(--violet)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-bold text-[var(--on-violet)] shadow-[var(--shadow-card)]"
               >
                 Next Section <ChevronRight size={18} />
               </button>
             ) : (
               <button 
                 className="flex items-center gap-2 px-10 h-14 rounded-full bg-[var(--violet)] hover:scale-[1.02] active:scale-[0.98] transition-all text-base font-black text-[var(--on-violet)] shadow-[var(--shadow-card)]"
               >
                 <Download size={20} /> DOWNLOAD VERIFIED PDF
               </button>
             )}
           </div>
        </div>
      </footer>

      {/* Floating help */}
      <button className="fixed bottom-24 right-8 w-14 h-14 rounded-full bg-[var(--surface-3)] border border-[rgba(109,86,164,0.3)] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group z-50">
        <MessageSquare size={24} color="var(--violet)" className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}

/* ───────────────────────── Child Components ───────────────────────── */

function EntryScreen({ onChoice }: { onChoice: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
       <div className="max-w-[900px] w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
             <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: "var(--text-1)", letterSpacing: "-0.03em" }}>
                How do we <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)" }}>start?</span>
             </h1>
             <p className="mt-4 text-[var(--text-3)] text-lg">Choose your building experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
             <ChoiceCard 
               title="Build New Resume"
               desc="Ideal for freshers. We pre-fill from your JREE profile to get you started instantly."
               icon={Sparkles}
               color="var(--lime)"
               onClick={onChoice}
             />
             <ChoiceCard 
               title="Beautify My Resume"
               desc="Upload your existing file. We parse, improve, and add your verified JREE badge."
               icon={Upload}
               color="var(--violet)"
               onClick={onChoice}
             />
          </div>
       </div>
    </div>
  );
}

function ChoiceCard({ title, desc, icon: Icon, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="group relative text-left p-10 rounded-[32px] overflow-hidden grain transition-all duration-500 hover:-translate-y-2"
      style={{ 
        background: "var(--surface-1)",
        border: "1px solid var(--hairline)",
        boxShadow: "var(--shadow-elevated)"
      }}
    >
       <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-12 -translate-y-12">
          <Icon size={192} />
       </div>
       
       <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon size={32} color={color} />
       </div>
       
       <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--text-1)", marginBottom: 12 }}>{title}</h3>
       <p style={{ fontFamily: "var(--font-body)", color: "var(--text-3)", fontSize: 15, lineHeight: 1.6 }}>{desc}</p>
       
       <div className="mt-10 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" style={{ color }}>
          GET STARTED <ChevronRight size={16} />
       </div>
    </button>
  );
}

function Step1Personal({ data }: { data: any }) {
  const [fields, setFields] = useState({ name: false, email: false, stream: false, score: false });
  
  useEffect(() => {
    Object.keys(fields).forEach((key, i) => {
      setTimeout(() => {
        setFields(prev => ({ ...prev, [key]: true }));
      }, (i + 1) * 400);
    });
  }, []);

  return (
    <div className="space-y-8">
       <div className="text-center md:text-left">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Let's start <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>building.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">We've loaded your basic details from your JREE profile.</p>
       </div>

       <div className="p-8 rounded-3xl grain border border-white/5 relative overflow-hidden" style={{ background: "var(--surface-1)" }}>
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-lime-500 uppercase tracking-widest">Profile Linked</span>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <LiveField label="Full Name" value={data.name} active={fields.name} />
             <LiveField label="Email Address" value={data.email} active={fields.email} />
             <LiveField label="Current Stream" value={data.stream} active={fields.stream} />
             <div className="relative">
                <LiveField label="Verified JREE Score" value={data.score} active={fields.score} color="var(--lime)" />
                {fields.score && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-[var(--lime)] flex items-center justify-center shadow-lg"
                  >
                    <Star size={14} color="var(--bg)" fill="var(--bg)" />
                  </motion.div>
                )}
             </div>
          </div>
       </div>
       
       <p className="text-xs text-center text-[var(--text-3)] italic">These fields are pre-filled based on your exam submission and cannot be edited.</p>
    </div>
  );
}

function LiveField({ label, value, active, color }: any) {
  return (
    <div className="space-y-2">
       <span className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-[0.2em]">{label}</span>
       <div className="h-14 flex items-center px-5 rounded-xl border border-white/5 transition-all relative overflow-hidden" style={{ 
         background: active ? "rgba(255,255,255,0.02)" : "transparent",
         borderColor: active ? "var(--hairline-strong)" : "var(--hairline)"
       }}>
          {!active && <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity }} className="h-2 w-32 bg-[var(--violet-soft)] rounded-full" />}
          {active && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: color || "var(--text-1)", fontSize: 16 }}
            >
              {value}
            </motion.span>
          )}
          {active && <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 0.6 }} className="absolute inset-0 bg-[var(--violet-soft)]" />}
       </div>
    </div>
  );
}

function Step2Objective({ value, onGenerate, isTyping, onChange }: any) {
  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Career <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>objective.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">How do you want to present your professional intent?</p>
       </div>

       <div className="relative group">
          <textarea 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your career goals..."
            className="w-full h-64 p-8 rounded-3xl bg-[var(--surface-1)] border border-white/5 outline-none focus:border-[var(--violet)] transition-all resize-none text-lg leading-relaxed text-[var(--text-1)]"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {isTyping && (
             <div className="absolute inset-0 flex items-center justify-center bg-[rgba(94,74,158,0.08)] backdrop-blur-[1px] pointer-events-none rounded-3xl">
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-bounce" />
                   <div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-bounce delay-100" />
                   <div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-bounce delay-200" />
                </div>
             </div>
          )}
       </div>

       <button 
         onClick={onGenerate}
         disabled={isTyping}
         className="relative w-full h-20 rounded-2xl overflow-hidden group border border-white/5 transition-all hover:scale-[1.01] active:scale-[0.99]"
       >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-lime-500/20 to-teal-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 grain opacity-20" />
          
          {/* Shimmer line */}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />

          <div className="relative z-10 flex items-center justify-center gap-3">
             <Sparkles size={24} className="text-[var(--lime)]" />
             <div className="text-left">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)" }}>Generate with Gemini AI</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>PERSONALIZED TO YOUR JREE SCORE</div>
             </div>
          </div>
       </button>
    </div>
  );
}

function Step3Education() {
  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Academic <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>background.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">Your colleges, degrees, and notable achievements.</p>
       </div>

       <div className="space-y-4">
          <EmptyStateCard icon={GraduationCap} label="Add Education" />
          <EmptyStateCard icon={Briefcase} label="Add Internship" />
       </div>
    </div>
  );
}

function EmptyStateCard({ icon: Icon, label }: any) {
  return (
    <button className="w-full p-10 rounded-2xl border-2 border-dashed border-[var(--hairline-strong)] hover:border-[var(--violet)] hover:bg-white/2 transition-all flex flex-col items-center justify-center gap-4 group">
       <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--violet-soft)] text-[var(--text-3)] group-hover:bg-[var(--violet-soft)] group-hover:text-[var(--violet)] transition-colors">
          <Icon size={24} />
       </div>
       <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-2)" }} className="group-hover:text-[var(--text-1)]">
         {label}
       </span>
    </button>
  );
}

function Step4Skills({ skills, setSkills }: any) {
  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Hard & soft <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>skills.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">Skills detected from your JREE assessment are pre-loaded.</p>
       </div>

       <div className="flex flex-wrap gap-3">
          {skills.map((s: string) => (
            <motion.div 
              key={s} layout
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5"
              style={{ background: "rgba(109, 86, 164, 0.15)", borderColor: "rgba(109, 86, 164, 0.3)" }}
            >
               <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text-1)", fontSize: 14 }}>{s}</span>
               <button onClick={() => setSkills(skills.filter((k: string) => k !== s))} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <X size={12} color="var(--text-3)" />
               </button>
            </motion.div>
          ))}
          <button className="px-5 py-2.5 rounded-xl border border-dashed border-white/20 hover:border-[var(--lime)] transition-colors flex items-center gap-2">
             <Plus size={16} color="var(--lime)" />
             <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--lime-text)", fontSize: 14 }}>Add more</span>
          </button>
       </div>

       <div className="p-6 rounded-2xl bg-teal-500/5 border border-teal-500/10 flex items-start gap-4">
          <Info size={18} className="text-teal-500 mt-1" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
            Skills marked with a violet glow were verified through your JREE exam performance and will carry higher weight for recruiters.
          </p>
       </div>
    </div>
  );
}

function Step5Projects() {
  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Notable <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>projects.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">What have you built? Describe your contribution clearly.</p>
       </div>

       <EmptyStateCard icon={Briefcase} label="Add Project" />
    </div>
  );
}

function Step6Certifications() {
  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Credentials & <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>awards.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">External certifications, hackathon wins, or academic honors.</p>
       </div>

       <EmptyStateCard icon={Award} label="Add Certification" />
    </div>
  );
}

function Step7Template({ selected, onSelect }: any) {
  const templates = [
    { id: "classic", name: "Classic", desc: "Safest for ATS systems", layout: "left" },
    { id: "modern", name: "Modern", desc: "Stands out visually", layout: "center" },
    { id: "premium", name: "Premium", desc: "Best with strong portfolio", layout: "right" },
  ];

  return (
    <div className="space-y-8">
       <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            Visual <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>identity.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)]">Choose a layout that best represents your professional style.</p>
       </div>

       <div className="grid md:grid-cols-3 gap-6">
          {templates.map(t => (
            <button 
              key={t.id}
              onClick={() => onSelect(t.id)}
              className="group text-left"
            >
               <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-300" style={{ 
                 borderColor: selected === t.id ? "var(--lime)" : "var(--hairline)",
                 background: "var(--surface-3)",
                 boxShadow: selected === t.id ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 4px rgba(201, 220, 83, 0.1)" : "none",
                 transform: selected === t.id ? "scale(1.02)" : "scale(1)"
               }}>
                  {/* Template preview lines */}
                  <div className="p-6 space-y-4">
                     <div className={`h-4 w-1/2 bg-white/10 rounded ${t.layout === 'center' ? 'mx-auto' : ''}`} />
                     <div className="space-y-2">
                        <div className="h-1.5 w-full bg-[var(--violet-soft)] rounded" />
                        <div className="h-1.5 w-full bg-[var(--violet-soft)] rounded" />
                        <div className="h-1.5 w-3/4 bg-[var(--violet-soft)] rounded" />
                     </div>
                     <div className="pt-4 grid grid-cols-2 gap-2">
                        <div className="h-10 bg-[var(--violet-soft)] rounded-lg" />
                        <div className="h-10 bg-[var(--violet-soft)] rounded-lg" />
                     </div>
                  </div>
                  
                  {selected === t.id && (
                    <div className="absolute inset-0 bg-[var(--lime)]/5 pointer-events-none" />
                  )}
               </div>
               <div className="mt-4">
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: selected === t.id ? "var(--lime)" : "var(--text-1)" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>{t.desc}</div>
               </div>
            </button>
          ))}
       </div>
    </div>
  );
}

function Step8Preview({ data }: { data: any }) {
  return (
    <div className="space-y-8">
       <div className="text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-lime-500/10 flex items-center justify-center mx-auto mb-6 border border-lime-500/20"
          >
             <Check size={32} color="var(--lime)" strokeWidth={3} />
          </motion.div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-1)" }}>
            The finish <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)" }}>line.</span>
          </h2>
          <p className="mt-2 text-[var(--text-3)] max-w-[400px] mx-auto">Your verified JREE resume is ready. Review and download your PDF.</p>
       </div>

       {/* Coaching Feedback */}
       <div className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[rgba(109,86,164,0.3)] flex items-start gap-4">
          <Sparkles size={20} className="text-[var(--violet)] mt-1 shrink-0" />
          <div className="space-y-2">
             <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-1)" }}>AI Improvement Tips</div>
             <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>
               Your objective section is strong. We recommend adding one more academic project to fully balance the Modern template layout. Your JREE badge is verified.
             </p>
          </div>
       </div>

       {/* Physical Artifact Preview */}
       <div className="relative mx-auto max-w-[500px]">
          <div className="absolute inset-0 bg-[rgba(94,74,158,0.12)] blur-3xl -z-10 translate-y-8" />
          <div 
            className="bg-white rounded-sm overflow-hidden p-12 shadow-2xl"
            style={{ aspectRatio: "1 / 1.414" }}
          >
             {/* Abstract Resume Layout */}
             <div className="space-y-8">
                <div className="flex justify-between items-start">
                   <div className="space-y-2">
                      <div className="h-6 w-48 bg-gray-900 rounded" />
                      <div className="h-3 w-32 bg-gray-200 rounded" />
                   </div>
                   <div className="w-12 h-12 bg-[var(--violet)] rounded flex items-center justify-center">
                      <span className="text-[var(--on-violet)] text-[8px] font-black leading-none text-center">JREE<br/>87</span>
                   </div>
                </div>
                
                <div className="space-y-3">
                   <div className="h-4 w-1/4 bg-gray-100 rounded" />
                   <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-50 rounded" />
                      <div className="h-2 w-full bg-gray-50 rounded" />
                      <div className="h-2 w-3/4 bg-gray-50 rounded" />
                   </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                   {[0, 1].map(i => (
                     <div key={i} className="space-y-3">
                        <div className="h-4 w-1/3 bg-gray-100 rounded" />
                        <div className="flex gap-2">
                           <div className="h-3 w-24 bg-gray-50 rounded" />
                           <div className="h-3 w-16 bg-gray-50 rounded" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
