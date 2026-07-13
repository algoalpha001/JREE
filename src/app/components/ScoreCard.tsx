import { motion } from "motion/react";

export function MiniScoreRing({ size = 80 }: { size?: number }) {
  const radius = (size - 8) / 2;
  const circ = 2 * Math.PI * radius;
  const progress = 0.78;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`mini-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D56A4" />
            <stop offset="100%" stopColor="#C9DC53" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--hairline-strong)" strokeWidth={4} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#mini-${size})`}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - progress) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", lineHeight: 1 }}>78</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", marginTop: 2 }}>Band A</span>
      </div>
    </div>
  );
}
