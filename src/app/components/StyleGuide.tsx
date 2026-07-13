import { useState } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Shared layout tokens ── */
const CONTAINER = "max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]";
const SECTION_GAP = "mt-20 md:mt-28";

/* ─────────────────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────────────────── */
function Section({ id, label, n, children }: { id: string; label: string; n: string; children: React.ReactNode }) {
  return (
    <section id={id} className={SECTION_GAP}>
      <div className={CONTAINER}>
        <div className="flex items-center gap-4 mb-10 md:mb-14 pb-5" style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--violet)", textTransform: "uppercase" }}>
            {n}
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {label}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   01. TYPOGRAPHY
───────────────────────────────────────────────────────── */

/* Type scale data — desktop / mobile */
const typeScaleDisplay = [
  { role: "Hero H1",       desktop: { px: 88,  rem: "5.5rem",    lh: "1.0"  }, mobile: { px: 40,  rem: "2.5rem",    lh: "1.0"  }, weight: 800, sample: "Know Your Job Readiness." },
  { role: "Display H2",   desktop: { px: 56,  rem: "3.5rem",    lh: "1.05" }, mobile: { px: 32,  rem: "2.0rem",    lh: "1.05" }, weight: 800, sample: "One platform. Three ways in." },
  { role: "About H2",     desktop: { px: 58,  rem: "3.625rem",  lh: "1.04" }, mobile: { px: 34,  rem: "2.125rem",  lh: "1.04" }, weight: 800, sample: "Built to close India's gap." },
  { role: "Section H2",   desktop: { px: 60,  rem: "3.75rem",   lh: "1.02" }, mobile: { px: 34,  rem: "2.125rem",  lh: "1.02" }, weight: 800, sample: "Built differently." },
  { role: "Step H3",      desktop: { px: 36,  rem: "2.25rem",   lh: "1.15" }, mobile: { px: 26,  rem: "1.625rem",  lh: "1.15" }, weight: 700, sample: "You're one OTP away." },
  { role: "Card H3",      desktop: { px: 26,  rem: "1.625rem",  lh: "1.15" }, mobile: { px: 22,  rem: "1.375rem",  lh: "1.15" }, weight: 700, sample: "Know where you stand." },
  { role: "Differentiator H3", desktop: { px: 34, rem: "2.125rem", lh: "1.12" }, mobile: { px: 24, rem: "1.5rem", lh: "1.12" }, weight: 700, sample: "The AI interview counts." },
  { role: "Score Display",desktop: { px: 132, rem: "8.25rem",   lh: "0.85" }, mobile: { px: 80,  rem: "5.0rem",    lh: "0.85" }, weight: 800, sample: "78" },
  { role: "Score Hero",   desktop: { px: 260, rem: "16.25rem",  lh: "0.85" }, mobile: { px: 140, rem: "8.75rem",   lh: "0.85" }, weight: 800, sample: "87" },
  { role: "Counter XL",   desktop: { px: 140, rem: "8.75rem",   lh: "0.9"  }, mobile: { px: 56,  rem: "3.5rem",   lh: "0.9"  }, weight: 800, sample: "60%" },
  { role: "Label / CTA",  desktop: { px: 15,  rem: "0.9375rem", lh: "1.5"  }, mobile: { px: 15,  rem: "0.9375rem", lh: "1.5" }, weight: 700, sample: "Register Free →" },
  { role: "Footer Logo",  desktop: { px: 18,  rem: "1.125rem",  lh: "1.0"  }, mobile: { px: 18,  rem: "1.125rem",  lh: "1.0"  }, weight: 800, sample: "JREE" },
];

const typeScaleSerif = [
  { role: "Large Quote",  desktop: { px: 26,  rem: "1.625rem", lh: "1.4" }, mobile: { px: 20, rem: "1.25rem",   lh: "1.4" }, sample: "One score you actually own." },
  { role: "Section Quote",desktop: { px: 26,  rem: "1.625rem", lh: "1.4" }, mobile: { px: 20, rem: "1.25rem",   lh: "1.4" }, sample: "Five questions. Zero bias." },
  { role: "Subtitle",     desktop: { px: 24,  rem: "1.5rem",   lh: "1.4" }, mobile: { px: 18, rem: "1.125rem",  lh: "1.4" }, sample: "Where you rank nationally — and the one layer to fix next." },
  { role: "Body Serif",   desktop: { px: 22,  rem: "1.375rem", lh: "1.5" }, mobile: { px: 17, rem: "1.0625rem", lh: "1.5" }, sample: "The degrees are there. The proof was missing." },
  { role: "Card Quote",   desktop: { px: 19,  rem: "1.1875rem",lh: "1.4" }, mobile: { px: 17, rem: "1.0625rem", lh: "1.4" }, sample: "Your proof, ready when you are." },
  { role: "Testimonial",  desktop: { px: 17,  rem: "1.0625rem",lh: "1.6" }, mobile: { px: 17, rem: "1.0625rem", lh: "1.6" }, sample: "One week after putting Band A on my profile, I had 3 interviews." },
];

const typeScaleMono = [
  { role: "Eyebrow Large",  desktop: { px: 12, rem: "0.75rem",   lh: "1.0", ls: "0.16em" }, mobile: { px: 12, rem: "0.75rem",   lh: "1.0", ls: "0.16em" }, weight: 500, sample: "01 / WHERE DO YOU FIT" },
  { role: "Eyebrow Small",  desktop: { px: 11, rem: "0.6875rem", lh: "1.0", ls: "0.18em" }, mobile: { px: 11, rem: "0.6875rem", lh: "1.0", ls: "0.18em" }, weight: 500, sample: "FOR STUDENTS" },
  { role: "Caption",        desktop: { px: 12, rem: "0.75rem",   lh: "1.5", ls: "0.14em" }, mobile: { px: 12, rem: "0.75rem",   lh: "1.5", ls: "0.14em" }, weight: 400, sample: "JR-25-K9X8M2" },
  { role: "Micro Label",    desktop: { px: 10, rem: "0.625rem",  lh: "1.0", ls: "0.14em" }, mobile: { px: 10, rem: "0.625rem",  lh: "1.0", ls: "0.14em" }, weight: 400, sample: "NASSCOM 2024" },
  { role: "Score Mono",     desktop: { px: 18, rem: "1.125rem",  lh: "1.0", ls: "0.0em"  }, mobile: { px: 18, rem: "1.125rem",  lh: "1.0", ls: "0.0em"  }, weight: 400, sample: "/100" },
  { role: "Inline Pill",    desktop: { px: 12, rem: "0.75rem",   lh: "1.0", ls: "0.1em"  }, mobile: { px: 12, rem: "0.75rem",   lh: "1.0", ls: "0.1em"  }, weight: 500, sample: "VERIFIED" },
];

const typeScaleBody = [
  { role: "Body XL",   desktop: { px: 17, rem: "1.0625rem", lh: "1.65" }, mobile: { px: 15, rem: "0.9375rem", lh: "1.65" }, weight: 400, sample: "Get your JREE Score, National Rank, Role Readiness Report and AI Interview Feedback — all in one assessment." },
  { role: "Body LG",   desktop: { px: 16, rem: "1.0rem",    lh: "1.6"  }, mobile: { px: 14, rem: "0.875rem",  lh: "1.6"  }, weight: 400, sample: "Students prove it. Colleges benchmark it. Employers hire on it." },
  { role: "Body",      desktop: { px: 15, rem: "0.9375rem", lh: "1.7"  }, mobile: { px: 15, rem: "0.9375rem", lh: "1.7"  }, weight: 400, sample: "Aptitude · English · Domain · Situational Judgement. Auto-saves every 30 seconds." },
  { role: "Body SM",   desktop: { px: 13, rem: "0.8125rem", lh: "1.5"  }, mobile: { px: 13, rem: "0.8125rem", lh: "1.5"  }, weight: 400, sample: "Free for students. Trusted by colleges. Used by employers." },
  { role: "Body XS",   desktop: { px: 12, rem: "0.75rem",   lh: "1.4"  }, mobile: { px: 12, rem: "0.75rem",   lh: "1.4"  }, weight: 400, sample: "Your video here · Camera permission required" },
  { role: "Body Med",  desktop: { px: 14, rem: "0.875rem",  lh: "1.5"  }, mobile: { px: 14, rem: "0.875rem",  lh: "1.5"  }, weight: 500, sample: "Razorpay · Product Analyst" },
];

function TypeRow({ label, deskPx, deskRem, deskLh, mobPx, mobRem, mobLh, extra }: {
  label: string; deskPx: number; deskRem: string; deskLh: string;
  mobPx: number; mobRem: string; mobLh: string; extra?: string;
}) {
  return (
    <tr style={{ borderBottom: "1px solid var(--hairline)" }}>
      <td className="py-3 pr-4" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", whiteSpace: "nowrap" }}>{label}</td>
      <td className="py-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)" }}>{deskPx}px</td>
      <td className="py-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{deskRem}</td>
      <td className="py-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{deskLh}</td>
      <td className="py-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)" }}>{mobPx}px</td>
      <td className="py-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{mobRem}</td>
      <td className="py-3 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{mobLh}</td>
      {extra && <td className="py-3 pl-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>{extra}</td>}
    </tr>
  );
}

function TableHead({ extras }: { extras?: string[] }) {
  return (
    <thead>
      <tr style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
        <th className="pb-3 pr-4 text-left" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>Role</th>
        <th className="pb-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--lime-text)", textTransform: "uppercase" }}>D·px</th>
        <th className="pb-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>D·rem</th>
        <th className="pb-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>D·lh</th>
        <th className="pb-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase" }}>M·px</th>
        <th className="pb-3 pr-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>M·rem</th>
        <th className="pb-3 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>M·lh</th>
        {extras?.map((e) => (
          <th key={e} className="pb-3 pl-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>{e}</th>
        ))}
      </tr>
    </thead>
  );
}

function TypographyBlock() {
  return (
    <div className="space-y-16 md:space-y-20">

      {/* ── Bricolage Grotesque ── */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--text-1)", letterSpacing: "-0.03em" }}>
            Bricolage Grotesque
          </h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.02em" }}>--font-display</span>
        </div>

        {/* Weight specimens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { w: 400, label: "Regular · 400", sample: "Know your readiness." },
            { w: 500, label: "Medium · 500",  sample: "Know your readiness." },
            { w: 700, label: "Bold · 700",    sample: "Know your readiness." },
            { w: 800, label: "ExtraBold · 800", sample: "Know your readiness." },
          ].map(({ w, label, sample }) => (
            <div key={w} className="p-5 rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: w, fontSize: 32, color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>{sample}</div>
            </div>
          ))}
        </div>

        {/* Live size specimens */}
        <div className="space-y-5 mb-10">
          {typeScaleDisplay.slice(0, 7).map((t) => (
            <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-3 py-4" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: t.weight, fontSize: `clamp(${t.mobile.px}px, 4vw, ${t.desktop.px}px)`, color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: t.desktop.lh, flex: 1, minWidth: 0 }}>
                {t.sample}
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", letterSpacing: "0.04em" }}>{t.desktop.px}px</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>w{t.weight}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>lh {t.desktop.lh}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scale table */}
        <div className="overflow-x-auto rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
          <table className="w-full px-5 py-1" style={{ minWidth: 620, padding: "4px 20px" }}>
            <TableHead />
            <tbody>
              {typeScaleDisplay.map((t) => (
                <TypeRow key={t.role} label={t.role}
                  deskPx={t.desktop.px} deskRem={t.desktop.rem} deskLh={t.desktop.lh}
                  mobPx={t.mobile.px}  mobRem={t.mobile.rem}  mobLh={t.mobile.lh}
                  extra={`w${t.weight}`}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DM Sans — Italic / Editorial ── */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <h3 style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 400, fontSize: 28, color: "var(--text-1)" }}>
            DM Sans — Italic / Editorial
          </h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.02em" }}>--font-serif → --font-body</span>
        </div>

        <div className="space-y-4 mb-10">
          {typeScaleSerif.map((t) => (
            <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-3 py-4" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: `clamp(${t.mobile.px}px, 3vw, ${t.desktop.px}px)`, color: "var(--text-1)", lineHeight: t.desktop.lh, flex: 1, minWidth: 0 }}>
                {t.sample}
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", letterSpacing: "0.04em" }}>{t.desktop.px}px</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>lh {t.desktop.lh}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
          <table className="w-full" style={{ minWidth: 580, padding: "4px 20px" }}>
            <TableHead />
            <tbody>
              {typeScaleSerif.map((t) => (
                <TypeRow key={t.role} label={t.role}
                  deskPx={t.desktop.px} deskRem={t.desktop.rem} deskLh={t.desktop.lh}
                  mobPx={t.mobile.px}  mobRem={t.mobile.rem}  mobLh={t.mobile.lh}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DM Sans — Labels & Captions ── */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 22, color: "var(--text-1)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            DM Sans — Labels & Captions
          </h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.02em" }}>--font-mono → --font-body</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { w: 400, label: "Regular · 400", sample: "JR-25-K9X8M2" },
            { w: 500, label: "Medium · 500",  sample: "VERIFIED" },
            { w: 700, label: "Bold · 700",    sample: "BAND A" },
          ].map(({ w, label, sample }) => (
            <div key={w} className="p-5 rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: w, fontSize: 20, color: "var(--text-1)", letterSpacing: "0.03em" }}>{sample}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-10">
          {typeScaleMono.map((t) => (
            <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-3 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: t.weight, fontSize: t.desktop.px, color: "var(--text-1)", letterSpacing: t.desktop.ls, flex: 1 }}>
                {t.sample}
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)" }}>{t.desktop.px}px</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>ls:{t.desktop.ls}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
          <table className="w-full" style={{ minWidth: 700, padding: "4px 20px" }}>
            <TableHead extras={["Letter Spacing", "Weight"]} />
            <tbody>
              {typeScaleMono.map((t) => (
                <TypeRow key={t.role} label={t.role}
                  deskPx={t.desktop.px} deskRem={`${(t.desktop.px / 16).toFixed(4).replace(/\.?0+$/, "")}rem`} deskLh={t.desktop.lh}
                  mobPx={t.mobile.px}  mobRem={`${(t.mobile.px / 16).toFixed(4).replace(/\.?0+$/, "")}rem`}  mobLh={t.mobile.lh}
                  extra={t.desktop.ls}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DM Sans ── */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 24, color: "var(--text-1)" }}>DM Sans</h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.02em" }}>--font-body</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { w: 400, label: "Regular · 400", sample: "Aptitude · English · Domain · Situational Judgement." },
            { w: 500, label: "Medium · 500",  sample: "Free for students. Trusted by colleges." },
            { w: 600, label: "SemiBold · 600",sample: "India's first AI-powered job readiness assessment." },
            { w: 700, label: "Bold · 700",    sample: "Take Free Assessment →" },
          ].map(({ w, label, sample }) => (
            <div key={w} className="p-5 rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: w, fontSize: 17, color: "var(--text-1)", lineHeight: 1.6 }}>{sample}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-10">
          {typeScaleBody.map((t) => (
            <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-3 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: t.weight, fontSize: t.desktop.px, color: "var(--text-1)", lineHeight: t.desktop.lh, flex: 1, minWidth: 0 }}>
                {t.sample}
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)" }}>{t.desktop.px}px</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>w{t.weight}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)" }}>lh {t.desktop.lh}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-[12px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
          <table className="w-full" style={{ minWidth: 620, padding: "4px 20px" }}>
            <TableHead extras={["Weight"]} />
            <tbody>
              {typeScaleBody.map((t) => (
                <TypeRow key={t.role} label={t.role}
                  deskPx={t.desktop.px} deskRem={t.desktop.rem} deskLh={t.desktop.lh}
                  mobPx={t.mobile.px}  mobRem={t.mobile.rem}  mobLh={t.mobile.lh}
                  extra={`w${t.weight}`}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   02. COLOR PALETTE
───────────────────────────────────────────────────────── */
function Swatch({ token, hex, label, dark = false, wide = false }: {
  token: string; hex: string; label?: string; dark?: boolean; wide?: boolean;
}) {
  return (
    <div className={`rounded-[12px] overflow-hidden ${wide ? "col-span-2" : ""}`} style={{ border: "1px solid var(--hairline-strong)" }}>
      <div style={{ height: 72, background: hex }} />
      <div className="p-3" style={{ background: "var(--surface-1)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)", letterSpacing: "0.04em" }}>{token}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.03em", marginTop: 2 }}>{hex}</div>
        {label && <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{label}</div>}
      </div>
    </div>
  );
}

function AlphaSwatch({ token, rgba, label }: { token: string; rgba: string; label?: string }) {
  return (
    <div className="rounded-[12px] overflow-hidden" style={{ border: "1px solid var(--hairline-strong)" }}>
      <div className="relative" style={{ height: 72 }}>
        {/* checkerboard pattern to show alpha */}
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-conic-gradient(#3a3350 0% 25%, #1a1525 0% 50%)", backgroundSize: "16px 16px" }} />
        <div className="absolute inset-0" style={{ background: rgba }} />
      </div>
      <div className="p-3" style={{ background: "var(--surface-1)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)", letterSpacing: "0.04em" }}>{token}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.03em", marginTop: 2, wordBreak: "break-all" }}>{rgba}</div>
        {label && <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{label}</div>}
      </div>
    </div>
  );
}

function ColorGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.03em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 16 }}>{title}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {children}
      </div>
    </div>
  );
}

function ColorPaletteBlock() {
  return (
    <div className="space-y-12">
      <ColorGroup title="Backgrounds">
        <Swatch token="--bg"    hex="var(--text-1)" label="Page background" />
        <Swatch token="--bg-2"  hex="#0F0C16" label="Section alternate" />
        <Swatch token="--bg-3"  hex="var(--bg-3)" label="Darkest background" />
      </ColorGroup>

      <ColorGroup title="Surfaces">
        <Swatch token="--surface-1" hex="#131018" label="Card surface" />
        <Swatch token="--surface-2" hex="#1D1826" label="Elevated surface" />
        <Swatch token="--surface-3" hex="#241F30" label="Highest surface" />
      </ColorGroup>

      <ColorGroup title="Brand — Violet">
        <Swatch token="--violet" hex="#6D56A4" label="Primary accent" />
        <AlphaSwatch token="--violet-soft"   rgba="rgba(109,86,164,0.15)"  label="Soft fill" />
        <AlphaSwatch token="--violet-border" rgba="rgba(109,86,164,0.22)"  label="Border" />
        <AlphaSwatch token="--violet-border-hover" rgba="rgba(109,86,164,0.40)" label="Border hover" />
      </ColorGroup>

      <ColorGroup title="Brand — Lime (Electric)">
        <Swatch token="--lime" hex="#C9DC53" label="CTA / Highlight" />
        <AlphaSwatch token="--lime-soft"   rgba="rgba(201,220,83,0.14)" label="Soft fill" />
        <AlphaSwatch token="--lime-border" rgba="rgba(201,220,83,0.32)" label="Border" />
        <div className="rounded-[12px] overflow-hidden" style={{ border: "1px solid var(--hairline-strong)" }}>
          <div style={{ height: 72, background: "#C9DC53" }}>
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "#6E7B1F", letterSpacing: "0.02em" }}>LIME TEXT</span>
            </div>
          </div>
          <div className="p-3" style={{ background: "var(--surface-1)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)" }}>--lime-text</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>#C9DC53 / #6E7B1F (light)</div>
          </div>
        </div>
      </ColorGroup>

      <ColorGroup title="Brand — Teal">
        <Swatch token="--teal" hex="#51C1B5" label="Third accent" />
        <AlphaSwatch token="teal-soft"   rgba="rgba(81,193,181,0.14)"  label="Soft fill" />
        <AlphaSwatch token="teal-border" rgba="rgba(81,193,181,0.32)"  label="Border" />
      </ColorGroup>

      <ColorGroup title="Brand — Amber">
        <Swatch token="--amber"        hex="#D97706" label="Warning / Focus" />
        <AlphaSwatch token="--amber-soft"   rgba="rgba(217,119,6,0.14)" label="Soft fill" />
        <AlphaSwatch token="--amber-border" rgba="rgba(217,119,6,0.35)" label="Border" />
      </ColorGroup>

      <ColorGroup title="Semantic">
        <Swatch token="--danger" hex="var(--amber-text)" label="Review / Recording" />
        <AlphaSwatch token="--hairline"        rgba="var(--hairline)" label="Dividers" />
        <AlphaSwatch token="--hairline-strong" rgba="var(--hairline-strong)" label="Borders" />
      </ColorGroup>

      <ColorGroup title="Text">
        <Swatch token="--text-1" hex="#1A1525" label="Primary text" />
        <Swatch token="--text-2" hex="#BFB6D0" label="Secondary text" />
        <Swatch token="--text-3" hex="#948AAB" label="Tertiary / muted" />
      </ColorGroup>

      {/* Light mode note */}
      <div className="p-5 rounded-[14px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.02em", marginBottom: 12 }}>LIGHT-ONLY TOKEN REFERENCE</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { token: "--bg",      hex: "#FAF7F0" }, { token: "--bg-2",     hex: "#F4F0E6" },
            { token: "--bg-3",    hex: "#EFEAE0" }, { token: "--surface-1",hex: "#FFFFFF" },
            { token: "--text-1",  hex: "#1A1525" }, { token: "--text-2",   hex: "#463F54" },
            { token: "--text-3",  hex: "#645C75" }, { token: "--lime-text",hex: "#6E7B1F" },
          ].map((s) => (
            <div key={s.token} className="flex items-center gap-3">
              <div className="rounded-md flex-shrink-0" style={{ width: 32, height: 32, background: s.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-1)" }}>{s.token}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   03. UI ELEMENTS
───────────────────────────────────────────────────────── */

function UIGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.03em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}

function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "Is JREE free for students?", a: "Yes, completely free. Colleges and employers pay for access. Students never pay anything to take the exam or receive their score." },
    { q: "How long does the assessment take?", a: "About 90 minutes for the written exam plus a 20-minute AI video interview." },
    { q: "Can employers trust the score?", a: "Each score is locked at submission time and verified with a QR code on the certificate." },
  ];
  return (
    <div className="max-w-[600px]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid rgba(109,86,164,0.12)" }}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between text-left py-4 gap-5">
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: isOpen ? "var(--lime)" : "var(--text-1)", transition: "color 200ms", lineHeight: 1.35 }}>{it.q}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--violet)", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 200ms", display: "inline-block" }}>+</span>
            </button>
            <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height 300ms ease-out" }}>
              <p className="pb-4 pr-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressBarDemo() {
  return (
    <div className="max-w-[480px] space-y-4">
      {[
        { label: "Aptitude",      pct: 82, color: "linear-gradient(to right, var(--violet), var(--lime))" },
        { label: "English",       pct: 76, color: "linear-gradient(to right, var(--violet), #A78BFA)" },
        { label: "Domain",        pct: 81, color: "linear-gradient(to right, var(--violet), var(--lime))" },
        { label: "Sit. Judgement",pct: 72, color: "linear-gradient(to right, var(--violet), #A78BFA)" },
        { label: "AI Interview",  pct: 79, color: "linear-gradient(to right, var(--violet), #A78BFA)" },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-3">
          <span style={{ width: 110, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)", flexShrink: 0 }}>{l.label}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--hairline)" }}>
            <div className="h-full rounded-full" style={{ width: `${l.pct}%`, background: l.color }} />
          </div>
          <span style={{ width: 28, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-1)", textAlign: "right", flexShrink: 0 }}>{l.pct}</span>
        </div>
      ))}
    </div>
  );
}

function MiniScoreCard() {
  return (
    <div className="rounded-[22px] overflow-hidden" style={{ maxWidth: 340, background: "linear-gradient(165deg,var(--surface-1),var(--bg-2))", border: "1px solid rgba(109,86,164,0.3)", padding: "20px 22px", boxShadow: "var(--shadow-highest)" }}>
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--text-1)", letterSpacing: "-0.03em" }}>JREE<span style={{ display: "inline-block", width: 4, height: 4, background: "var(--lime)", borderRadius: "50%", marginLeft: 2, marginBottom: 3, verticalAlign: "middle" }} /></div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em" }}>OFFICIAL SCORE CARD</div>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 100, border: "1px solid rgba(81,193,181,0.3)", background: "rgba(81,193,181,0.08)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--teal-text)", letterSpacing: "0.04em" }}>✓ VERIFIED</span>
      </div>
      <div className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.03em" }}>CANDIDATE</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.02em", marginTop: 2 }}>Ananya Sharma</div>
      <div className="mt-4 flex items-end gap-3">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 80, color: "var(--text-1)", letterSpacing: "-0.06em", lineHeight: 0.85 }}>78</div>
        <div className="pb-2">
          <span style={{ padding: "4px 10px", borderRadius: 100, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11 }}>BAND A</span>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", marginTop: 6, letterSpacing: "0.02em" }}>91ST PERCENTILE</div>
        </div>
      </div>
    </div>
  );
}

function UIElementsBlock() {
  return (
    <div>
      {/* Buttons */}
      <UIGroup title="Buttons">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Primary — lime */}
          <button className="rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]" style={{ height: 52, padding: "0 24px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, boxShadow: "var(--shadow-card)", letterSpacing: "-0.01em" }}>
            Take Free Assessment →
          </button>
          {/* Secondary — outline */}
          <button className="rounded-full transition-colors" style={{ height: 52, padding: "0 22px", background: "transparent", border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-body)", fontSize: 14 }}>
            Request Demo
          </button>
          {/* Violet outline */}
          <button className="rounded-full transition-all hover:bg-[var(--hairline)]" style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>
            Login
          </button>
          {/* Violet filled — small */}
          <button className="inline-flex items-center rounded-full" style={{ height: 36, padding: "0 18px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}>
            Register Free →
          </button>
          {/* Violet bordered large */}
          <button className="rounded-full transition-all" style={{ height: 48, padding: "0 22px", background: "transparent", border: "1px solid var(--violet)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14 }}>
            Meet them yourself →
          </button>
          {/* Danger */}
          <button className="inline-flex items-center rounded-full" style={{ height: 34, padding: "0 14px", background: "transparent", border: "1px solid var(--amber-border)", color: "var(--danger)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em" }}>
            End
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          {/* Sizes */}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>SIZES</div>
          {[
            { label: "h-52 · Large CTA",   h: 52, px: "0 24px", fs: 15 },
            { label: "h-48 · Medium",       h: 48, px: "0 20px", fs: 14 },
            { label: "h-36 · Nav",          h: 36, px: "0 16px", fs: 13 },
            { label: "h-34 · Compact",      h: 34, px: "0 14px", fs: 12 },
          ].map((b) => (
            <button key={b.label} className="rounded-full" style={{ height: b.h, padding: b.px, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: b.fs }}>
              {b.label}
            </button>
          ))}
        </div>
      </UIGroup>

      {/* Bands */}
      <UIGroup title="Score Bands">
        <div className="flex flex-wrap gap-3 items-end mb-6">
          {[
            { letter: "A", range: "75–100", color: "var(--lime-text)",   bg: "var(--lime-soft)",              border: "var(--lime-border)"    },
            { letter: "B", range: "55–74",  color: "#B9A4E8",       bg: "rgba(185,164,232,0.15)",        border: "rgba(185,164,232,0.3)" },
            { letter: "C", range: "35–54",  color: "var(--violet)", bg: "var(--violet-soft)",            border: "var(--violet-border)"  },
            { letter: "D", range: "0–34",   color: "var(--text-3)", bg: "rgba(148,138,171,0.12)",        border: "rgba(148,138,171,0.25)" },
          ].map((b) => (
            <div key={b.letter} className="flex flex-col items-center gap-2">
              <span style={{ padding: "5px 11px", borderRadius: 100, background: b.bg, border: `1px solid ${b.border}`, fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: b.color, letterSpacing: "0.03em" }}>
                Band {b.letter} · {b.range}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.04em" }}>{b.letter === "A" ? "Interview-ready" : b.letter === "B" ? "Steady progress" : b.letter === "C" ? "Developing" : "Needs work"}</span>
            </div>
          ))}
        </div>

        {/* Filled band badges as seen on score card */}
        <div className="flex gap-3">
          <span style={{ padding: "5px 11px", borderRadius: 100, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "-0.01em" }}>BAND A</span>
          <span style={{ padding: "5px 11px", borderRadius: 100, background: "rgba(185,164,232,0.25)", color: "#B9A4E8", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>BAND B</span>
          <span style={{ padding: "5px 11px", borderRadius: 100, background: "var(--violet-soft)", color: "var(--violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>BAND C</span>
          <span style={{ padding: "5px 11px", borderRadius: 100, background: "rgba(148,138,171,0.12)", color: "var(--text-3)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>NEEDS SUPPORT</span>
        </div>
      </UIGroup>

      {/* Status Pills */}
      <UIGroup title="Status Pills & Eyebrows">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Verified teal */}
          <span className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 100, border: "1px solid rgba(81,193,181,0.3)", background: "rgba(81,193,181,0.08)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--teal-text)", letterSpacing: "0.04em" }}>
            <span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--teal)" }} />
            VERIFIED
          </span>
          {/* Live lime */}
          <span className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 100, border: "1px solid var(--lime-border)", background: "var(--lime-soft)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.05em" }}>
            <motion.span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
            LIVE
          </span>
          {/* REC danger */}
          <span className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 100, border: "1px solid var(--amber-border)", background: "var(--amber-soft)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--danger)", letterSpacing: "0.05em" }}>
            <motion.span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--danger)" }} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            REC 01:24
          </span>
          {/* Eyebrow — lime accent */}
          <span className="inline-flex items-center gap-2" style={{ padding: "5px 12px", borderRadius: 100, border: "1px solid var(--lime-border)", background: "rgba(201,220,83,0.06)" }}>
            <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--lime-text)" }}>India's first AI-powered job readiness assessment</span>
          </span>
          {/* Stage tag */}
          <span style={{ padding: "4px 10px", borderRadius: 100, background: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)", border: "1px solid var(--hairline-strong)", fontFamily: "var(--font-mono)", fontSize: 10, color: "#B9A4E8", letterSpacing: "0.07em" }}>FOR STUDENTS</span>
          {/* Amber focus */}
          <span style={{ padding: "4px 11px", borderRadius: 100, background: "var(--amber-soft)", border: "1px solid var(--amber-border)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-text)", letterSpacing: "0.03em" }}>NEXT STEP</span>
          {/* Unique badge */}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "3px 9px", borderRadius: 100, background: "transparent", border: "1px solid var(--lime-border)", color: "var(--lime-text)", letterSpacing: "0.02em" }}>★ UNIQUE TO JREE</span>
        </div>
      </UIGroup>

      {/* Cards */}
      <UIGroup title="Card Surfaces">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Surface 1 card */}
          <div className="grain rounded-[18px] p-6" style={{ background: "var(--surface-1)", border: "1px solid rgba(109,86,164,0.18)", boxShadow: "var(--shadow-elevated)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>SURFACE-1 · GRAIN</div>
            <div className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.02em" }}>Default Card</div>
            <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>Used for feature cards, FAQ, testimonials, and most surfaces.</div>
          </div>
          {/* Surface 2 card */}
          <div className="rounded-[18px] p-6" style={{ background: "var(--surface-2)", border: "1px solid rgba(109,86,164,0.22)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>SURFACE-2</div>
            <div className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.02em" }}>Elevated Card</div>
            <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>Floating pills, notification badges, overlays.</div>
          </div>
          {/* Glass card */}
          <div className="rounded-[14px] px-5 py-4" style={{ background: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-elevated)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>GLASS CARD</div>
            <div className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.02em" }}>Frosted Glass</div>
            <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>Artifact overlays, score panels above images.</div>
          </div>
        </div>
      </UIGroup>

      {/* Progress Bars */}
      <UIGroup title="Progress Bars">
        <ProgressBarDemo />
      </UIGroup>

      {/* Accordion */}
      <UIGroup title="Accordion (FAQ)">
        <AccordionDemo />
      </UIGroup>

      {/* Score Card */}
      <UIGroup title="Score Card">
        <MiniScoreCard />
      </UIGroup>

      {/* Dividers */}
      <UIGroup title="Dividers & Hairlines">
        <div className="max-w-[480px] space-y-6">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 8 }}>GRADIENT DIVIDER — section separator</div>
            <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(109,86,164,0.4), transparent)" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 8 }}>HAIRLINE — --hairline-strong</div>
            <div className="h-px" style={{ background: "var(--hairline-strong)" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 8 }}>DASHED — card internals</div>
            <div className="border-t border-dashed" style={{ borderColor: "rgba(109,86,164,0.18)" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: 8 }}>LIME GLOW — score pointer line</div>
            <div className="h-px" style={{ background: "var(--lime)", boxShadow: "none" }} />
          </div>
        </div>
      </UIGroup>

      {/* Live ticker */}
      <UIGroup title="Live Ticker">
        <div className="rounded-[10px] overflow-hidden" style={{ height: 48, background: "rgba(109,86,164,0.08)", border: "1px solid rgba(109,86,164,0.18)" }}>
          <div className="flex items-center h-full whitespace-nowrap" style={{ animation: "ticker 30s linear infinite" }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-6 px-6" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>
                <span className="inline-flex items-center gap-2">
                  <motion.span className="inline-block rounded-full" style={{ width: 8, height: 8, background: "var(--lime)" }} animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.05em" }}>LIVE</span>
                </span>
                <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>12,400</span> scores this month</span>
                <span style={{ color: "var(--violet)" }}>·</span>
                <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>91st</span> percentile avg Band A</span>
                <span style={{ color: "var(--violet)" }}>·</span>
                <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>240+</span> colleges onboarded</span>
                <span style={{ color: "var(--violet)" }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </UIGroup>

      {/* Ghost word */}
      <UIGroup title="Ghost Background Words">
        <div className="relative rounded-[14px] overflow-hidden" style={{ height: 160, background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
          <div className="absolute pointer-events-none select-none" style={{ left: "-2%", top: "-20%", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 160, color: "rgba(94,74,158,.05)", letterSpacing: "-0.06em", lineHeight: 0.85 }}>JREE</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.03em" }}>opacity: 0.025 · Bricolage · 800 · used as background watermark</span>
          </div>
        </div>
      </UIGroup>

      {/* Input / OTP */}
      <UIGroup title="Input Fields">
        <div className="flex flex-wrap gap-4">
          {/* Text input */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em" }}>EMAIL</label>
            <input
              type="email"
              placeholder="ananya@vit.edu.in"
              className="rounded-[10px]"
              style={{ height: 44, padding: "0 14px", background: "var(--surface-2)", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontSize: 14, outline: "none", width: 240 }}
            />
          </div>
          {/* OTP inputs */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em" }}>OTP</label>
            <div className="grid grid-cols-4 gap-2">
              {["3", "9", "4", "1"].map((n, i) => (
                <div key={i} className="rounded-lg flex items-center justify-center" style={{ height: 48, width: 48, background: "var(--surface-2)", border: "1px solid var(--violet-border)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "var(--text-1)" }}>{n}</div>
              ))}
            </div>
          </div>
        </div>
      </UIGroup>

      {/* Radio / Roster picker */}
      <UIGroup title="Roster Picker (AI Interviewers)">
        <div className="rounded-[16px] p-3 grid grid-cols-2 md:grid-cols-4 gap-2" style={{ background: "var(--surface-1)", border: "1px solid var(--violet-border)", maxWidth: 680 }}>
          {[
            { name: "Priya",  tone: "WARM",   accent: "Neutral Indian",  active: true,  color: "var(--lime-text)"   },
            { name: "Arjun",  tone: "CRISP",  accent: "Neutral Indian",  active: false, color: "var(--violet)" },
            { name: "Meera",  tone: "CALM",   accent: "South Indian",    active: false, color: "var(--violet)" },
            { name: "Rohan",  tone: "DIRECT", accent: "North Indian",    active: false, color: "var(--lime-text)"   },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-2.5 rounded-[12px]" style={{ padding: "9px 11px", background: a.active ? "rgba(109,86,164,0.18)" : "transparent", border: `1px solid ${a.active ? a.color : "var(--hairline-strong)"}` }}>
              <span className="block rounded-full flex-shrink-0" style={{ width: 28, height: 28, background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), ${a.color} 40%, #1A0E2E 100%)` }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1 }}>{a.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: a.active ? a.color : "var(--text-3)", letterSpacing: "0.03em", marginTop: 3 }}>{a.tone} · {a.accent.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </UIGroup>

      {/* Notification toast */}
      <UIGroup title="Toast / Notification">
        <div className="flex flex-wrap gap-4">
          <div style={{ padding: "9px 13px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid rgba(201,220,83,0.3)", boxShadow: "var(--shadow-card)", maxWidth: 200 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.02em" }}>↑ NEW</div>
            <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)", lineHeight: 1.35 }}>Razorpay viewed your score</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "8px 14px 8px 10px", background: "var(--surface-1)", border: "1px solid rgba(109,86,164,0.35)", boxShadow: "var(--shadow-card)" }}>
            <span className="inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12 }}>↗</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", letterSpacing: "0.03em" }}>SHARE ON <span style={{ color: "var(--text-1)" }}>LINKEDIN</span></span>
          </div>
        </div>
      </UIGroup>

      {/* Stamp / Seal */}
      <UIGroup title="Verification Stamp">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center justify-center" style={{ width: 78, height: 78, borderRadius: "50%", border: "1.5px dashed var(--lime)", background: "rgba(250,247,240,0.94)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.02em" }}>JREE</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--lime-text)", lineHeight: 1, marginTop: 2 }}>OFFICIAL</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.02em", marginTop: 2 }}>✓ VERIFIED</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", lineHeight: 1.6 }}>
            Dashed lime border<br />
            Bricolage ExtraBold<br />
            Used on score card hero
          </div>
        </div>
      </UIGroup>

      {/* Waveform / Equalizer */}
      <UIGroup title="Waveform / Equalizer">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-[3px]" style={{ height: 22 }}>
            {[8, 14, 10, 18, 12, 22, 14, 10, 16, 8, 20, 12, 16, 10, 14].map((h, i) => (
              <motion.span key={i} className="block" style={{ width: 2, background: "var(--lime)", borderRadius: 2 }} animate={{ height: [h * 0.3, h, h * 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>MIC ON · Real-time waveform</span>
        </div>
      </UIGroup>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SIDEBAR NAV (sticky on desktop)
───────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "typography", label: "Typography" },
  { id: "colors",     label: "Colors" },
  { id: "elements",   label: "UI Elements" },
];

function SideNav() {
  return (
    <nav className="hidden lg:block sticky top-24 self-start" style={{ width: 180, flexShrink: 0 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 14 }}>Contents</div>
      <div className="flex flex-col gap-1">
        {NAV_ITEMS.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="rounded-md transition-colors hover:text-[var(--text-1)]"
            style={{ padding: "6px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}
          >
            {n.label}
          </a>
        ))}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--hairline)" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ""; }} style={{ padding: "6px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.05em", textDecoration: "none", display: "block" }}>
            ← Back to Site
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
export function StyleGuide() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <header style={{ background: "rgba(250,247,240,0.94)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--hairline-strong)", position: "sticky", top: 0, zIndex: 100 }}>
        <div className={`${CONTAINER} h-14 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.03em" }}>
              JREE<span style={{ display: "inline-block", width: 4, height: 4, background: "var(--lime)", borderRadius: "50%", marginLeft: 2, marginBottom: 2, verticalAlign: "middle" }} />
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em" }}>DESIGN SYSTEM</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>v1.0</span>
            <button
              onClick={() => { window.location.hash = ""; }}
              className="rounded-full transition-all hover:bg-[var(--hairline)]"
              style={{ height: 32, padding: "0 14px", background: "transparent", border: "1px solid var(--violet-border)", color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12 }}
            >
              ← Back to site
            </button>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(165deg, var(--bg-2), var(--bg))", borderBottom: "1px solid var(--hairline-strong)" }}>
        <div className="absolute pointer-events-none select-none" style={{ right: "-4vw", top: "-20%", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "min(28vw,360px)", color: "rgba(94,74,158,.04)", letterSpacing: "-0.06em", lineHeight: 0.85 }}>TOKENS</div>
        <div className={`${CONTAINER} py-14 md:py-20`}>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 11, color: "var(--violet)", letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 16 }}>JREE Design System · 2025</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px,7vw,80px)", color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            Style <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime-text)", fontWeight: 400 }}>Guide</span>.
          </h1>
          <p className="mt-5 max-w-[540px]" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-2)", lineHeight: 1.65 }}>
            Typography, color tokens, and all UI components used across the JREE landing page — dark and light mode ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-full transition-all hover:border-[var(--violet)]" style={{ height: 36, padding: "0 16px", display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-body)", fontSize: 13, textDecoration: "none" }}>
                {n.label} →
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Body — sidebar + content */}
      <div className={`${CONTAINER} flex gap-12 xl:gap-16 pt-10 pb-28`}>
        <SideNav />
        <div className="flex-1 min-w-0">

          {/* 01 — Typography */}
          <section id="typography" className="pt-4">
            <div className="flex items-center gap-4 mb-10 pb-5" style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--violet)", textTransform: "uppercase" }}>01</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>Typography</h2>
            </div>
            <TypographyBlock />
          </section>

          {/* 02 — Colors */}
          <section id="colors" className="mt-20 md:mt-28">
            <div className="flex items-center gap-4 mb-10 pb-5" style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--violet)", textTransform: "uppercase" }}>02</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>Color Palette</h2>
            </div>
            <ColorPaletteBlock />
          </section>

          {/* 03 — UI Elements */}
          <section id="elements" className="mt-20 md:mt-28">
            <div className="flex items-center gap-4 mb-10 pb-5" style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--violet)", textTransform: "uppercase" }}>03</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>UI Elements</h2>
            </div>
            <UIElementsBlock />
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "var(--bg-2)", borderTop: "1px solid rgba(109,86,164,0.12)" }} className="py-8">
        <div className={`${CONTAINER} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
            JREE Design System · Built by EduBridge · 2025
          </div>
          <button
            onClick={() => { window.location.hash = ""; }}
            className="rounded-full transition-all hover:scale-[1.02] active:scale-[0.97] self-start md:self-auto"
            style={{ height: 40, padding: "0 20px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 }}
          >
            ← Back to JREE site
          </button>
        </div>
      </footer>

      <style>{`@keyframes ticker { to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
