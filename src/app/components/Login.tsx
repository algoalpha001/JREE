import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      window.location.hash = "#dashboard";
    }, 1500);
  };

  return (
    <section id="login" className="relative min-h-[90vh] flex items-center justify-center py-16 px-5 sm:px-8 md:px-12" style={{ background: "var(--bg-2)" }}>
      {/* Background Decor */}
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
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          background: "radial-gradient(circle, rgba(109,86,164,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 w-full max-w-[440px]"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[var(--surface-3)] border border-[rgba(109,86,164,0.2)]">
            <ShieldCheck size={14} className="text-[var(--violet)]" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--text-2)", textTransform: "uppercase" }}>
              Secure Candidate Portal
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 42px)",
            color: "var(--text-1)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1
          }}>
            Welcome back.
          </h1>
          <p className="mt-3" style={{ fontFamily: "var(--font-body)", color: "var(--text-3)", fontSize: 15 }}>
            Access your JREE profile and exam results.
          </p>
        </div>

        {/* Login Card */}
        <div className="grain relative p-8 sm:p-10 rounded-[28px]" style={{
          background: "var(--surface-1)",
          border: "1px solid rgba(240,235,255,0.06)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)"
        }}>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full h-[54px] pl-12 pr-4 bg-[var(--surface-3)] border border-[rgba(240,235,255,0.08)] rounded-xl outline-none text-[var(--text-1)] focus:border-[var(--violet)] focus:ring-4 focus:ring-[rgba(109,86,164,0.15)] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Password
                </label>
                <button type="button" className="text-[11px] font-bold text-[var(--violet-strong)] hover:text-[var(--violet)] transition-colors">
                  FORGOT?
                </button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[54px] pl-12 pr-12 bg-[var(--surface-3)] border border-[rgba(240,235,255,0.08)] rounded-xl outline-none text-[var(--text-1)] focus:border-[var(--violet)] focus:ring-4 focus:ring-[rgba(109,86,164,0.15)] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[var(--danger)] font-medium">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] rounded-full bg-[var(--violet)] text-white font-display font-bold text-base flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{ boxShadow: "0 12px 24px rgba(109,86,164,0.2)" }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[rgba(240,235,255,0.06)] text-center">
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text-3)", fontSize: 14 }}>
              Don't have an account?{" "}
              <button 
                onClick={() => window.location.hash = "#signup"}
                className="font-bold text-[var(--violet-strong)] hover:underline"
              >
                Register Free
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center space-y-4">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Secured by EduBridge Auth
          </p>
        </div>
      </motion.div>
    </section>
  );
}
