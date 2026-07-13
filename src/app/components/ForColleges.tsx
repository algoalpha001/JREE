import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Cohort spread — must sum to 100. Order: A (best) → D. */
const BANDS = [
  { key: "A", label: "Band A", count: 142, pct: 22, color: "var(--lime-text)" },
  { key: "B", label: "Band B", count: 246, pct: 38, color: "var(--teal-text)" },
  { key: "C", label: "Band C", count: 181, pct: 28, color: "var(--violet)" },
  { key: "D", label: "Needs Support", count: 77, pct: 12, color: "var(--amber-text)" },
] as const;

const TOTAL = BANDS.reduce((s, b) => s + b.count, 0);
const COHORT_AVG = 71; // college's median
const NATIONAL_AVG = 62; // national benchmark

export function ForColleges() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

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
          For Colleges
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
                maxWidth: "18ch",
              }}
            >
              Know your batch{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)", fontWeight: 400 }}>
                before recruiters
              </span>{" "}
              do.
            </h2>

            <p
              className="mt-4 md:mt-5"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px,2.4vw,24px)",
                color: "var(--text-2)",
                lineHeight: 1.4,
                maxWidth: "42ch",
              }}
            >
              Placement readiness for the whole cohort — by department, by stream, against India.
            </p>

            {/* Cohort distribution */}
            <div className="mt-10 md:mt-14 max-w-[640px]">
              {/* top labels */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.07em",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    Batch · CSE '26
                  </span>
                  <span
                    className="ml-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.02em",
                      color: "var(--text-3)",
                    }}
                  >
                    {TOTAL} students
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.07em",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    Median
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 22,
                      color: "var(--text-1)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {COHORT_AVG}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.02em",
                      color: "var(--text-3)",
                    }}
                  >
                    /100
                  </span>
                </div>
              </div>

              {/* the bar */}
              <div className="relative mt-5">
                {/* segments */}
                <div
                  className="relative w-full overflow-hidden rounded-[3px] flex"
                  style={{
                    height: 32,
                    background: "var(--hairline)",
                    border: "1px solid var(--hairline-strong)",
                  }}
                >
                  {BANDS.map((b, i) => (
                    <motion.div
                      key={b.key}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.pct}%` } : {}}
                      transition={{ duration: 0.9, ease, delay: 0.08 * i }}
                      style={{
                        background: b.color,
                        opacity: 0.88,
                        borderRight:
                          i < BANDS.length - 1 ? "1px solid var(--bg)" : "none",
                      }}
                    />
                  ))}
                </div>

                {/* national average marker — drops in last */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease, delay: 1.2 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${NATIONAL_AVG}%`,
                    top: -10,
                    bottom: -10,
                    width: 0,
                  }}
                >
                  <div
                    style={{
                      width: 1,
                      height: "100%",
                      background: "var(--text-1)",
                      marginLeft: -0.5,
                    }}
                  />
                </motion.div>

                {/* marker label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.45, ease, delay: 1.35 }}
                  className="absolute"
                  style={{
                    left: `${NATIONAL_AVG}%`,
                    top: -28,
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.07em",
                      color: "var(--text-1)",
                      textTransform: "uppercase",
                    }}
                  >
                    National avg · {NATIONAL_AVG}
                  </span>
                </motion.div>
              </div>

              {/* tick scale */}
              <div className="relative mt-3 h-3">
                {[0, 25, 50, 75, 100].map((n) => (
                  <div
                    key={n}
                    className="absolute top-0"
                    style={{
                      left: `${n}%`,
                      transform: n === 0 ? "none" : n === 100 ? "translateX(-100%)" : "translateX(-50%)",
                    }}
                  >
                    <div style={{ width: 1, height: 4, background: "var(--hairline-strong)" }} />
                    <span
                      className="block mt-1"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.02em",
                        color: "var(--text-3)",
                      }}
                    >
                      {100 - n}
                    </span>
                  </div>
                ))}
              </div>

              {/* legend */}
              <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                {BANDS.map((b) => (
                  <div key={b.key} className="flex items-baseline gap-2">
                    <span
                      className="inline-block"
                      style={{
                        width: 8,
                        height: 8,
                        background: b.color,
                        opacity: 0.88,
                        transform: "translateY(-1px)",
                      }}
                    />
                    <div className="flex flex-col">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.07em",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {b.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          color: "var(--text-1)",
                          fontVariantNumeric: "tabular-nums",
                          marginTop: 2,
                        }}
                      >
                        {b.count}{" "}
                        <span style={{ color: "var(--text-3)" }}>· {b.pct}%</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — 1/3 readouts */}
          <div className="md:col-span-4 md:pt-3">
            <Readout
              label="Batch view"
              line="Every student's readiness, filterable in one screen."
              first
            />
            <Readout
              label="Gap by dept."
              line={<>Which layer to fix <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text-1)" }}>before</em> placement season.</>}
            />
            <Readout
              label="Benchmark"
              line="Above or below the national line, no guessing."
            />
            <Readout
              label="Tracking"
              line="Measurable improvement, year on year."
              last
            />
          </div>
        </div>

        {/* footer line + CTA */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(14px,1.6vw,17px)",
                color: "var(--text-2)",
                lineHeight: 1.4,
                maxWidth: "50ch",
              }}
            >
              Targeted support. Measurable outcomes. Proof your accreditation bodies will accept.
            </p>

            <a
              href="#for-colleges"
              className="inline-flex items-center justify-center rounded-full self-start md:self-auto transition-transform active:scale-[0.98] hover:brightness-[1.04]"
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
              }}
            >
              Onboard Your College →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
