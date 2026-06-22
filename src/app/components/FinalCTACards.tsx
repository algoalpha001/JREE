import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.16, 1, 0.3, 1] as const;
const SECTION = "py-12 md:py-28";
const CONTAINER = "max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]";

const panels = [
  {
    key: "students",
    tag: "FOR STUDENTS",
    headline: "Get your score. Own your narrative.",
    support: "Take the free 90-minute assessment, earn a verified JREE score, and walk into every interview knowing exactly where you stand.",
    cta: "Register Free",
    href: "#signup",
    accent: "var(--lime)",
    accentText: "var(--lime)",
    ctaBg: "var(--lime)",
    ctaColor: "var(--bg)",
    img: "https://images.unsplash.com/photo-1585661417298-8236a5f449aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzaW5nbGUlMjBmb2N1c2VkJTIwc3R1ZGVudCUyMHN0dWR5aW5nJTIwY29uY2VudHJhdGlvbnxlbnwxfHx8fDE3ODEyMTE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A focused student preparing for their assessment",
  },
  {
    key: "colleges",
    tag: "FOR COLLEGES",
    headline: "Know your batch before placement season.",
    support: "Benchmark every student against the national pool. Identify gaps early, show accreditation bodies real data, and place more graduates.",
    cta: "Onboard Your College",
    href: "#for-colleges",
    accent: "var(--violet)",
    accentText: "#B9A4E8",
    ctaBg: "transparent",
    ctaColor: "#B9A4E8",
    img: "https://images.unsplash.com/photo-1702952058716-1496a3c1e7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwY29ycmlkb3IlMjBwbGFjZW1lbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzgxMjExNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A university campus corridor",
  },
  {
    key: "employers",
    tag: "FOR EMPLOYERS",
    headline: "Stop screening. Start hiring.",
    support: "Every candidate arrives pre-assessed. Filter by JREE score, domain strength, and role-fit — and call only the ones who are ready.",
    cta: "Access Talent Pool",
    href: "#for-employers",
    accent: "#51C1B5",
    accentText: "#51C1B5",
    ctaBg: "transparent",
    ctaColor: "#51C1B5",
    img: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcnZpZXclMjBoaXJpbmclMjBkZXNrJTIwb2ZmaWNlJTIwbWVldGluZyUyMHJvb218ZW58MXx8fHwxNzgxMjExNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A hiring desk in a modern office",
  },
] as const;

export function FinalCTACards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className={`relative ${SECTION}`} style={{ background: "var(--bg-2)" }}>
      <div className={CONTAINER}>
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.07em",
            color: "var(--violet)",
            textTransform: "uppercase",
          }}>
            Get Started
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px,6vw,56px)",
              color: "var(--text-1)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Your move.{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime)", fontWeight: 400 }}>
              Right now.
            </span>
          </h2>
          <p
            className="mt-4 max-w-[480px]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px,1.7vw,16px)",
              color: "var(--text-2)",
              lineHeight: 1.6,
            }}
          >
            Students prove it. Colleges benchmark it. Employers hire on it.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {panels.map((p, i) => (
            <ConvertPanel key={p.key} panel={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConvertPanel({ panel, index, inView }: { panel: typeof panels[number]; index: number; inView: boolean }) {
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = panel.href.replace(/^#/, "");
    window.location.hash = target;
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="grain rounded-[18px] overflow-hidden flex flex-col"
      style={{
        background: "var(--surface-1)",
        border: "1px solid rgba(109,86,164,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)",
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <ImageWithFallback
          src={panel.img}
          alt={panel.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.05) brightness(0.55)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(36,28,58,0.55)", mixBlendMode: "multiply" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,10,16,0.1) 0%, rgba(12,10,16,0.5) 100%)" }} />

        {/* Audience tag */}
        <span
          className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full"
          style={{
            padding: "4px 10px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${panel.accent}44`,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: panel.accentText,
            letterSpacing: "0.07em",
          }}
        >
          {panel.tag}
        </span>

        {/* Accent bar at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 2, background: `linear-gradient(90deg, ${panel.accent}, transparent)` }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 pt-6 pb-7">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(20px,2.4vw,24px)",
            color: "var(--text-1)",
            letterSpacing: "-0.02em",
            lineHeight: 1.18,
          }}
        >
          {panel.headline}
        </h3>

        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px,1.5vw,15px)",
            color: "var(--text-2)",
            lineHeight: 1.65,
            flexGrow: 1,
          }}
        >
          {panel.support}
        </p>

        {/* CTA */}
        <a
          href={panel.href}
          onClick={go}
          className="mt-7 inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
          style={{
            height: 48,
            padding: "0 22px",
            background: panel.ctaBg,
            color: panel.ctaColor,
            border: panel.ctaBg === "transparent" ? `1px solid ${panel.accent}` : "none",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "-0.01em",
            boxShadow: panel.ctaBg !== "transparent" ? "0 8px 28px rgba(201,220,83,0.25)" : "none",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {panel.cta} →
        </a>
      </div>
    </motion.div>
  );
}
