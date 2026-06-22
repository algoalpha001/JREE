import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutUs() {
  const ref = useRef<HTMLElement>(null);

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
          About Us
        </span>

        {/* Team image — top */}
        <figure className="mt-6 md:mt-8">
          <div
            className="relative grain overflow-hidden rounded-[18px]"
            style={{ border: "1px solid var(--hairline-strong)" }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwb2ZmaWNlJTIwY2FuZGlkJTIwbWVldGluZ3xlbnwxfHx8fDE3ODEyMTIwODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="The EduBridge team at work"
              className="w-full object-cover"
              style={{ height: "clamp(200px,30vw,380px)", filter: "grayscale(1) contrast(1.05) brightness(0.66)" }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(36,28,58,0.5)", mixBlendMode: "multiply" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,10,16,0.1) 0%, rgba(12,10,16,0.55) 100%)" }} />
          </div>
          <figcaption
            className="mt-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.02em",
              color: "var(--text-3)",
              textTransform: "uppercase",
            }}
          >
            The team behind JREE — EduBridge, building this for 17 years.
          </figcaption>
        </figure>

        {/* Headline + body */}
        <div
          className="mt-10 md:mt-12 pt-10 md:pt-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-end"
          style={{ borderTop: "1px solid var(--hairline-strong)" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px,4vw,44px)",
              color: "var(--text-1)",
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              maxWidth: "18ch",
            }}
          >
            Built to close India's{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime)", fontWeight: 400 }}>
              employability gap
            </span>
            .
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px,1.6vw,17px)",
              color: "var(--text-2)",
              lineHeight: 1.65,
              maxWidth: "44ch",
            }}
          >
            EduBridge has worked with{" "}
            <span style={{ color: "var(--text-1)" }}>50,000+ graduates across India</span>{" "}
            over 17 years. JREE is our answer to one persistent problem — talented graduates
            go unnoticed because no one has measured them in a way employers trust.
          </p>
        </div>

        {/* Credibility strip + CTA */}
        <div
          className="mt-10 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ borderTop: "1px solid var(--hairline-strong)" }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <CredEntry value="17 years" />
            <CredDot />
            <CredEntry value="50,000+ graduates" />
            <CredDot />
            <CredEntry value="backed by EduBridge" />
          </div>

          <a
            href="#about-us"
            className="inline-flex items-center justify-center rounded-full self-start sm:self-auto transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              height: 48,
              padding: "0 22px",
              background: "transparent",
              border: "1px solid var(--violet)",
              color: "var(--text-1)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Our Story →
          </a>
        </div>

      </div>
    </section>
  );
}

function CredEntry({ value }: { value: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(13px,1.4vw,15px)",
        color: "var(--text-1)",
        letterSpacing: "-0.01em",
      }}
    >
      {value}
    </span>
  );
}

function CredDot() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 3,
        height: 3,
        borderRadius: 999,
        background: "var(--text-3)",
        opacity: 0.6,
        verticalAlign: "middle",
      }}
    />
  );
}
