import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import avatarImg from "../../imports/image-6.png";

const ease = [0.16, 1, 0.3, 1] as const;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.hash = "dashboard";
      }, 1000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        
        {/* MOBILE TEASER STRIP */}
        <div className="lg:hidden w-full px-6 py-4 flex items-center justify-between border-b border-[var(--hairline)]" style={{ background: "var(--surface-1)" }}>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border-2 border-[var(--lime)] flex items-center justify-center text-[10px] font-bold text-[var(--lime)]">87</div>
             <div>
               <div className="flex gap-1">
                 <span className="px-1.5 py-0.5 rounded-sm bg-[var(--lime)] text-[var(--bg)] text-[8px] font-bold">BAND A</span>
                 <span className="text-[10px] text-[var(--text-3)] font-mono">98th %ILE</span>
               </div>
             </div>
          </div>
          <span className="text-[10px] text-[var(--text-3)] font-mono uppercase tracking-widest">Your Results</span>
        </div>

        {/* LEFT SIDE — THE HOOK (Product Preview) */}
        <div className="hidden lg:flex flex-1 relative flex-col items-center justify-center px-12 overflow-hidden border-r border-[var(--hairline)]">
          {/* RADIAL GLOW */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 800,
              height: 800,
              background: "radial-gradient(circle, rgba(109,86,164,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* LIVING BACKGROUND ELEMENTS */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-20 w-96 h-96 rounded-full border border-[var(--lime)] pointer-events-none"
          />

          <div className="relative z-10 max-w-[500px] w-full text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="mb-6"
             >

                <h2 style={{ 
                  fontFamily: "var(--font-display)", 
                  fontWeight: 800,
                  color: "var(--text-1)", 
                  fontSize: "clamp(32px, 4vw, 44px)", 
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  marginTop: 80
                }}>
                  Step into your{" "}
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)", fontWeight: 400 }}>
                    next
                  </span>{" "}
                  chapter.
                </h2>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4, ease }}
               className="relative py-12 flex items-center justify-center"
             >
                {/* 3D AVATAR IMAGE CONTAINER */}
                <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[40px] overflow-hidden flex items-center justify-center grain group"
                     style={{ 
                       background: "var(--surface-1)", 
                       border: "1px solid rgba(109,86,164,0.3)",
                       boxShadow: "var(--shadow-highest)" 
                     }}>
                   
                   {/* Background Glow within frame */}
                   <div className="absolute inset-0 pointer-events-none opacity-40">
                      <div className="absolute top-0 left-0 w-full h-full" style={{ background: "radial-gradient(circle at 20% 20%, var(--violet) 0%, transparent 50%)" }} />
                      <div className="absolute bottom-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 80% 80%, var(--lime) 0%, transparent 50%)" }} />
                   </div>

                   {/* THE IMAGE */}
                   <motion.div
                     animate={{ y: [0, -12, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="relative z-10 w-full h-full flex items-center justify-center p-4"
                   >
                     <ImageWithFallback 
                       src={avatarImg} 
                       alt="Professional 3D Avatar" 
                       className="w-full h-full object-contain drop-shadow-[0_16px_40px_rgba(26,21,37,0.10)]"
                     />
                   </motion.div>

                   {/* Orbiting Elements */}
                   <div className="absolute inset-0 pointer-events-none">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-dashed border-[var(--hairline)]"
                      />
                   </div>
                </div>

                {/* Floating "Live" Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-6 top-1/3 px-4 py-2 rounded-2xl border border-[var(--hairline-strong)] backdrop-blur-xl flex items-center gap-3"
                  style={{ background: "rgba(255,255,255,0.92)", boxShadow: "var(--shadow-elevated)" }}
                >
                   <div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse " />
                   <div className="text-left">
                      <div className="text-[9px] font-mono text-[var(--text-3)] uppercase tracking-[0.15em]">Live Pulse</div>
                      <div className="text-xs font-bold text-[var(--text-1)]">EMPLOYER VIEW ACTIVE</div>
                   </div>
                </motion.div>

                {/* Floating Score Chip */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -left-6 bottom-1/4 px-4 py-3 rounded-2xl border border-[var(--hairline-strong)] backdrop-blur-xl"
                  style={{ background: "rgba(255,255,255,0.92)", boxShadow: "var(--shadow-elevated)" }}
                >
                   <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-wider mb-1 text-left">Your Score</div>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-display font-black text-[var(--lime-text)]">87</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--lime)] text-[var(--on-lime)]">BAND A</span>
                   </div>
                </motion.div>
             </motion.div>

             <p className="mt-4 text-[var(--text-3)] text-sm max-w-[400px] mx-auto leading-relaxed">
               You are logging into your professional identity. Your scores, certificates, and employer visibility are one click away.
             </p>
          </div>
        </div>

        {/* RIGHT SIDE — THE FORM */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 relative z-20">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, ease }}
             className="w-full max-w-[400px]"
           >
              {/* Security badge */}
              <div className="inline-flex items-center gap-2 mb-8 px-2.5 py-1.5 rounded-md bg-[rgba(109,86,164,0.08)] border border-[rgba(109,86,164,0.15)]">
                <ShieldCheck size={12} className="text-[var(--violet)]" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--text-2)", textTransform: "uppercase" }}>
                  Secure Candidate Portal
                </span>
              </div>

              <h1 className="mb-2" style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 42,
                color: "var(--text-1)",
                letterSpacing: "-0.03em",
                lineHeight: 1
              }}>
                Welcome back.
              </h1>
              <p className="mb-10 text-[var(--text-3)] text-sm leading-relaxed max-w-[320px]">
                Access your JREE profile and exam results.
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[9px] font-mono font-bold text-[var(--violet)] uppercase tracking-[0.1em]">
                      Email Address
                    </label>
                  </div>
                  <div className="group relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)] group-focus-within:text-[var(--violet)] transition-colors" />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@college.edu"
                      className={`w-full h-[56px] pl-12 pr-4 bg-[var(--surface-3)] border border-[var(--hairline-strong)] rounded-xl outline-none text-[var(--text-1)] text-sm transition-all focus:border-[var(--violet)] focus:ring-4 focus:ring-[rgba(109,86,164,0.1)] ${error && !email ? "border-[var(--danger)] bg-[var(--amber-soft)]" : ""}`}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[9px] font-mono font-bold text-[var(--violet)] uppercase tracking-[0.1em]">
                      Password
                    </label>
                    <button type="button" className="text-[9px] font-bold text-[var(--violet)] hover:text-[var(--text-1)] uppercase tracking-[0.1em] transition-colors">
                      Forgot?
                    </button>
                  </div>
                  <div className="group relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)] group-focus-within:text-[var(--violet)] transition-colors" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full h-[56px] pl-12 pr-12 bg-[var(--surface-3)] border border-[var(--hairline-strong)] rounded-xl outline-none text-[var(--text-1)] text-sm transition-all focus:border-[var(--violet)] focus:ring-4 focus:ring-[rgba(109,86,164,0.1)] ${error && !password ? "border-[var(--danger)] bg-[var(--amber-soft)]" : ""}`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={loading || success}
                  animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
                  className={`w-full h-[60px] rounded-full font-display font-extrabold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] relative overflow-hidden ${
                    success 
                      ? "bg-[var(--teal)] text-[var(--on-teal)]" 
                      : "bg-[var(--violet)] text-[var(--on-violet)]"
                  }`}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-3 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />
                  ) : success ? (
                    <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Check size={20} strokeWidth={3} /> Success
                    </motion.span>
                  ) : (
                    <>Sign In <ArrowRight size={18} /></>
                  )}
                </motion.button>
              </form>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 text-center"
                  >
                    <span className="text-xs font-medium text-[var(--danger)]">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--hairline)]" />
                <span className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">or</span>
                <div className="h-px flex-1 bg-[var(--hairline)]" />
              </div>

              {/* Google Button */}
              <button 
                type="button"
                className="w-full h-[56px] rounded-full border border-[var(--hairline-strong)] flex items-center justify-center gap-3 hover:bg-[var(--hairline)] transition-all text-[var(--text-2)] text-sm font-medium"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--text-3)]">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => window.location.hash = "signup"}
                    className="font-bold text-[var(--violet)] hover:underline ml-1"
                  >
                    Register Free
                  </button>
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                 <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(148,138,171,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Secured by EduBridge Auth
                 </span>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
