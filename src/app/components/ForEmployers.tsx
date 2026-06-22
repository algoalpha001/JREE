import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  { label: "Aptitude", score: 92 },
  { label: "Communication", score: 88 },
  { label: "Domain · CS", score: 90 },
  { label: "Quant", score: 84 },
  { label: "Interview", score: 89 },
] as const;

export function ForEmployers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  // verdict resolves after the card settles
  const [verdict, setVerdict] = useState<"deciding" | "ready">("deciding");
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setVerdict("ready"), 1100);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="py-16 md:py-28"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]">
        {/* eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.07em",
            color: "var(--violet)",
            textTransform: "uppercase",
          }}
        >
          For Employers
        </div>

        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-x-10 lg:gap-x-16 gap-y-12 md:gap-y-16">
          {/* LEFT — 2/3 */}
          <div className="md:col-span-8">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px,6.4vw,64px)",
                color: "var(--text-1)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                maxWidth: "17ch",
              }}
            >
              Shortlists that{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime)", fontWeight: 400 }}>
                screen themselves
              </span>
              .
            </h2>

            <p
              className="mt-4 md:mt-5"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px,2.4vw,24px)",
                color: "var(--text-2)",
                lineHeight: 1.4,
                maxWidth: "40ch",
              }}
            >
              Verified, ranked candidates — role-fit decided before you open the profile.
            </p>

            {/* Candidate card + faint stack */}
            <div className="mt-10 md:mt-14 max-w-[600px] relative">
              {/* stack edges behind */}
              <div
                aria-hidden
                className="absolute"
                style={{
                  inset: 0,
                  transform: "translate(14px, 14px)",
                  border: "1px solid var(--hairline-strong)",
                  background: "var(--bg)",
                  borderRadius: 6,
                  opacity: 0.55,
                }}
              />
              <div
                aria-hidden
                className="absolute"
                style={{
                  inset: 0,
                  transform: "translate(7px, 7px)",
                  border: "1px solid var(--hairline-strong)",
                  background: "var(--bg)",
                  borderRadius: 6,
                  opacity: 0.8,
                }}
              />

              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease }}
                className="relative"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--hairline-strong)",
                  borderRadius: 6,
                }}
              >
                {/* card header */}
                <div
                  className="flex items-center justify-between px-5 md:px-6 py-3"
                  style={{ borderBottom: "1px solid var(--hairline-strong)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.07em",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    Candidate · JR-91-0427-IN
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.07em",
                      color: "var(--lime-text)",
                      textTransform: "uppercase",
                    }}
                  >
                    <CheckIcon /> Verified at source
                  </span>
                </div>

                {/* body */}
                <div className="px-5 md:px-6 pt-5 pb-6">
                  {/* PII row — blurred until unlock */}
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "clamp(20px,2.4vw,26px)",
                          color: "var(--text-1)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                          filter: "blur(6px)",
                          userSelect: "none",
                        }}
                        aria-label="Candidate name hidden"
                      >
                        Shreya Kulkarni
                      </div>
                      <div
                        className="mt-1.5"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "var(--text-2)",
                        }}
                      >
                        B.Tech CSE · Class of '26
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.07em",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        JREE Score
                      </div>
                      <div
                        className="mt-0.5 flex items-baseline gap-1 justify-end"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          color: "var(--text-1)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <span style={{ fontSize: 34 }}>91</span>
                        <span style={{ fontSize: 13, color: "var(--text-3)" }}>/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Role-fit verdict — the loudest element */}
                  <div
                    className="mt-5 md:mt-6 rounded-[4px] px-4 py-4 flex items-center justify-between gap-4"
                    style={{
                      background:
                        verdict === "ready" ? "var(--lime-soft)" : "rgba(240,235,255,0.04)",
                      border: `1px solid ${
                        verdict === "ready"
                          ? "var(--lime-border)"
                          : "var(--hairline-strong)"
                      }`,
                      transition: "background 380ms ease, border-color 380ms ease",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.03em",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        Role-fit · Software Engineer
                      </div>
                      <div
                        className="mt-1.5 flex items-center gap-2"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "clamp(22px,3vw,30px)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                          color:
                            verdict === "ready" ? "var(--lime-text)" : "var(--text-2)",
                          transition: "color 380ms ease",
                        }}
                      >
                        {verdict === "ready" ? (
                          <>
                            Ready
                            <CheckIcon size={18} />
                          </>
                        ) : (
                          <DecidingText />
                        )}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.07em",
                        color:
                          verdict === "ready" ? "var(--lime-text)" : "var(--text-3)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {verdict === "ready" ? "Top 4% nat." : "—"}
                    </span>
                  </div>

                  {/* layer chips */}
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
                    {LAYERS.map((l) => (
                      <div key={l.label} className="flex items-baseline gap-1.5">
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            letterSpacing: "0.02em",
                            color: "var(--text-3)",
                            textTransform: "uppercase",
                          }}
                        >
                          {l.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 13,
                            color: "var(--text-1)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {l.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* card footer — gated reveal */}
                <div
                  className="flex items-center justify-between px-5 md:px-6 py-3"
                  style={{ borderTop: "1px solid var(--hairline-strong)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.07em",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    Contact unlocked on shortlist
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.02em",
                      color: "var(--text-3)",
                    }}
                  >
                    <LockIcon />
                    s••••••@•••••.in
                  </span>
                </div>
              </motion.article>

              {/* stack count label */}
              <div
                className="absolute"
                style={{
                  top: "calc(100% + 18px)",
                  right: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.07em",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                }}
              >
                + 247 ranked behind this one
              </div>
            </div>
          </div>

          {/* RIGHT — 1/3 readouts */}
          <div className="md:col-span-4 md:pt-3">
            <Readout
              label="Role-fit upfront"
              line={<>Ready or not for the role, <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text-1)" }}>on</em> the card.</>}
              first
            />
            <Readout
              label="Verified"
              line="Scores you can trust, not self-reported."
            />
            <Readout
              label="Pre-ranked"
              line="Only job-ready candidates surface."
            />
            <Readout
              label="Output"
              line="The result, never the résumé pile."
              last
            />
          </div>
        </div>

        {/* footer line + CTA */}
        <div className="mt-20 md:mt-28 pt-8 md:pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px,2.2vw,22px)",
                color: "var(--text-2)",
                lineHeight: 1.4,
                maxWidth: "52ch",
              }}
            >
              Less screening. Better fits. Every candidate already proven against a national standard.
            </p>

            <a
              href="#for-employers"
              className="inline-flex items-center justify-center rounded-full self-start md:self-auto transition-transform active:scale-[0.98] hover:brightness-[1.04]"
              style={{
                height: 52,
                padding: "0 24px",
                background: "var(--lime)",
                color: "var(--bg)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.01em",
                boxShadow: "0 8px 32px rgba(201,220,83,0.25)",
              }}
            >
              Start Hiring →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- bits ---------------- */

function Readout({
  label,
  line,
  first = false,
  last = false,
}: {
  label: string;
  line: React.ReactNode;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="py-5"
      style={{
        borderTop: first ? "1px solid var(--hairline-strong)" : "none",
        borderBottom: "1px solid var(--hairline-strong)",
      }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.03em",
            color: "var(--text-3)",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px,1.5vw,16px)",
            color: "var(--text-1)",
            lineHeight: 1.4,
            textAlign: "right",
          }}
        >
          {line}
        </span>
      </div>
      {last && null}
    </div>
  );
}

function DecidingText() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const id = window.setInterval(() => setDots((d) => (d % 3) + 1), 280);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: "var(--font-display)" }}>
      Deciding{".".repeat(dots)}
    </span>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.5L5 9L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden>
      <rect
        x="0.75"
        y="4.75"
        width="8.5"
        height="5.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M2.5 4.75V3.25a2.5 2.5 0 015 0v1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
