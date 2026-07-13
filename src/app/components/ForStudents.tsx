import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const SCORE = 87;

const SKILLS = [
  { label: "Aptitude", score: 91, note: "Strongest — hold it.", startHere: false },
  { label: "Domain Knowledge", score: 78, note: "Close gap with 2 focused modules.", startHere: false },
  { label: "Verbal Reasoning", score: 64, note: "Two practice sets away from Band B.", startHere: false },
  { label: "Communication", score: 52, note: "Biggest lift, fastest win.", startHere: true },
];

export function ForStudents() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toString());
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, SCORE, {
      duration: 1.4,
      ease,
      onComplete: () => setBarsVisible(true),
    });
    return () => controls.stop();
  }, [inView, count]);

  return (
    <section
      ref={ref}
      className="py-16 md:py-28"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]">

        {/* Eyebrow */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.07em",
          color: "var(--violet)",
          textTransform: "uppercase",
        }}>
          For Students
        </span>

        {/* Section label */}
        <h2
          className="mt-4 md:mt-5"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(28px,4.4vw,48px)",
            color: "var(--text-1)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: "28ch",
          }}
        >
          Where you stand.{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)", fontWeight: 400 }}>
            What to do next.
          </span>
        </h2>

        {/* Two-column body */}
        <div
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ borderTop: "1px solid var(--hairline-strong)" }}
        >
          {/* LEFT — Where you stand */}
          <div
            className="py-10 md:py-12 md:pr-12 lg:pr-16"
            style={{ borderBottom: "1px solid var(--hairline-strong)" }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.07em",
              color: "var(--text-3)",
              textTransform: "uppercase",
            }}>
              Where you stand
            </span>

            {/* Score */}
            <div className="mt-6 flex items-end gap-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.35, ease }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(72px,11vw,120px)",
                  color: "var(--text-1)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.88,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <motion.span>{display}</motion.span>
              </motion.span>
              <div className="flex flex-col gap-1 mb-2">
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--text-3)",
                  letterSpacing: "0.02em",
                }}>/ 100</span>
                <span
                  className="inline-block px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.05em",
                    background: "var(--lime)",
                    color: "var(--lime-text)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Band A
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px" style={{ background: "var(--hairline-strong)" }} />

            {/* Readouts */}
            <div className="mt-6 flex flex-col gap-5">
              <ReadoutRow label="Score" value="One number, not just marks." />
              <ReadoutRow label="Rank" value="#2,140 — across India and your stream." />
              <ReadoutRow label="Role-Fit" value="Ready for 6 real job profiles." />
            </div>

            {/* Closing line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={barsVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.6 }}
              className="mt-10"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(15px,1.8vw,18px)",
                color: "var(--text-2)",
                lineHeight: 1.5,
                maxWidth: "30ch",
              }}
            >
              A score to share, and a clear next move.
            </motion.p>

            <a
              href="#signup"
              className="inline-flex items-center justify-center rounded-full mt-7 transition-transform active:scale-[0.97] hover:scale-[1.03]"
              style={{
                height: 52,
                padding: "0 24px",
                background: "var(--violet)",
                color: "var(--on-violet)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.01em",
                boxShadow: "var(--shadow-card)",
                textDecoration: "none",
              }}
            >
              Register Free →
            </a>
          </div>


          {/* RIGHT — What to improve */}
          <div
            className="py-10 md:py-12 md:pl-12 lg:pl-16"
            style={{
              borderTop: "1px solid var(--hairline-strong)",
              borderBottom: "1px solid var(--hairline-strong)",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.07em",
              color: "var(--text-3)",
              textTransform: "uppercase",
            }}>
              Your next move
            </span>

            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px,1.5vw,16px)",
                color: "var(--text-2)",
                lineHeight: 1.5,
              }}
            >
              Four skill layers, ranked by where you are today.
            </p>

            {/* Skill bars */}
            <div className="mt-8 flex flex-col gap-6">
              {SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.label}
                  {...skill}
                  visible={barsVisible}
                  delay={i * 0.12}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.07em",
        color: "var(--text-3)",
        textTransform: "uppercase",
        flexShrink: 0,
        minWidth: 52,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: "clamp(13px,1.4vw,15px)",
        color: "var(--text-1)",
        lineHeight: 1.4,
      }}>
        {value}
      </span>
    </div>
  );
}

function SkillBar({
  label,
  score,
  note,
  startHere,
  visible,
  delay,
}: {
  label: string;
  score: number;
  note: string;
  startHere: boolean;
  visible: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: startHere ? "var(--text-1)" : "var(--text-2)",
            textTransform: "uppercase",
            fontWeight: startHere ? 600 : 400,
          }}>
            {label}
          </span>
          {startHere && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: delay + 0.3 }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.05em",
                color: "var(--text-2)",
                background: "var(--surface-2)",
                border: "1px solid var(--hairline-strong)",
                textTransform: "uppercase",
              }}
            >
              ← start here
            </motion.span>
          )}
        </div>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.02em",
          color: startHere ? "var(--text-2)" : "var(--text-3)",
        }}>
          {score}
        </span>
      </div>

      {/* Track */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{ height: 4, background: "var(--hairline-strong)" }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          initial={{ width: 0 }}
          animate={visible ? { width: `${score}%` } : {}}
          transition={{ duration: 0.7, ease, delay }}
          style={{
            background: startHere
              ? "var(--text-3)"
              : score >= 80
              ? "var(--lime)"
              : "var(--violet)",
          }}
        />
      </div>

      {/* Action note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease, delay: delay + 0.2 }}
        className="mt-1.5"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-3)",
          lineHeight: 1.4,
        }}
      >
        {note}
      </motion.p>
    </div>
  );
}
