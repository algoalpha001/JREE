import { useEffect, useState } from "react";

const REVIEWED = "30 June 2026";

const sections = [
  { id: "principles", label: "Principles", title: "Our security principles" },
  { id: "data-protection", label: "Data protection", title: "Data protection" },
  { id: "access-sharing", label: "Access & sharing", title: "Access & sharing controls" },
  { id: "privacy-compliance", label: "Privacy", title: "Privacy & compliance" },
  { id: "employers-fraud", label: "Employers", title: "Verified employers & fraud prevention" },
  { id: "ai-integrity", label: "AI integrity", title: "AI & assessment integrity" },
  { id: "certifications", label: "Infrastructure", title: "Certifications & infrastructure" },
  { id: "disclosure", label: "Disclosure", title: "Responsible disclosure" },
  { id: "contact", label: "Contact", title: "Contact" },
];

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Verify({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-[12px] px-4 py-3" style={{ background: "var(--violet-soft)", border: "1px solid var(--violet-border)", color: "var(--text-1)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase" }}>
        [VERIFY] Confirm before publish
      </div>
      <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.65, color: "var(--text-2)" }}>{children}</div>
    </div>
  );
}

function LegalReview({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-[12px] px-4 py-3" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--amber-text)", textTransform: "uppercase" }}>
        [LEGAL REVIEW] Counsel approval required
      </div>
      <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.65, color: "var(--text-2)" }}>{children}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-12" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Security Center</div>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", color: "var(--text-1)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{title}</h2>
      <div className="mt-7 security-copy">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{children}</h3>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 space-y-3" style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</ul>;
}

export function SecurityCenterPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      <style>{`.security-copy a{color:var(--violet);text-decoration:underline;text-underline-offset:3px}.security-copy li::marker{color:var(--text-3)}@media(max-width:1023px){.security-rail{display:none}}`}</style>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px] pt-10 pb-24">
        <a href="#" className="inline-flex rounded-full px-4 py-2" style={{ border: "1px solid var(--hairline-strong)", color: "var(--text-2)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 12 }}>← Back to JREE</a>

        <header className="pt-12 pb-10 md:pt-16 md:pb-14">
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--violet)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Public trust page</div>
          <h1 className="mt-4 max-w-[820px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(38px,7vw,74px)", color: "var(--text-1)", letterSpacing: "-0.035em", lineHeight: 0.98 }}>How JREE protects your data.</h1>
          <p className="mt-6 max-w-[720px]" style={{ fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "var(--text-2)" }}>The security, privacy, and compliance practices behind every assessment, score, and profile.</p>
          <div className="mt-5 inline-flex rounded-full px-4 py-2" style={{ border: "1px solid var(--hairline-strong)", color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Last reviewed: {REVIEWED}</div>
          <Verify>Confirm review cadence, owner, and whether this date reflects an actual security/privacy review.</Verify>
        </header>

        <div className="lg:hidden mb-8 rounded-[16px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <button className="w-full flex items-center justify-between px-5 py-4" onClick={() => setOpen(!open)} style={{ color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 700 }}>Page contents <span>{open ? "−" : "+"}</span></button>
          {open && <nav className="px-3 pb-3">{sections.map((s) => <button key={s.id} onClick={() => { setOpen(false); jump(s.id); }} className="block w-full text-left rounded-[10px] px-3 py-2" style={{ color: "var(--text-2)", fontSize: 14 }}>{s.label}</button>)}</nav>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,760px)] gap-12 items-start">
          <aside className="security-rail sticky top-8 rounded-[16px] p-4" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Contents</div>
            <nav className="mt-3 space-y-1">{sections.map((s) => <button key={s.id} onClick={() => jump(s.id)} className="block w-full text-left rounded-[10px] px-3 py-2 transition-colors hover:bg-[var(--bg-2)]" style={{ color: "var(--text-2)", fontSize: 13.5 }}>{s.label}</button>)}</nav>
          </aside>

          <article className="max-w-[70ch]">
            <Section id="principles" title="Our security principles">
              <List><li>Data minimisation: JREE collects only the information needed to operate assessments, scores, profiles, college reporting, and employer workflows.</li><li>Encryption by default: JREE protects data in transit and at rest using approved encryption controls.</li><li>Least-privilege access: internal access is limited to people and systems that need it to operate or support JREE.</li><li>Consent-based sharing: candidate profile and assessment data is shared according to the product consent and unlock model.</li></List>
              <Verify>Verify each principle against current engineering, operations, support, and hiring-partner workflows.</Verify>
            </Section>

            <Section id="data-protection" title="Data protection">
              <P>JREE handles candidate PII, assessment responses, scores, AI interview recordings, transcripts, employer accounts, college batch data, payment records, and platform logs.</P>
              <Verify>Confirm TLS version and certificate practices for data in transit.</Verify>
              <Verify>Confirm encryption-at-rest controls for databases, object storage, backups, logs, AI interview recordings, and transcripts.</Verify>
              <Verify>Confirm storage region, data residency, backup retention, tenant isolation, and whether candidate/employer/college data is logically separated.</Verify>
            </Section>

            <Section id="access-sharing" title="Access & sharing controls">
              <P>JREE's marketplace model should make access clear: candidates understand what they share, employers see only what their role permits, and colleges see their own batch context.</P>
              <Verify>Confirm exact employer visibility rules: score bands, full scores, candidate profile fields, contact details, blurred PII before unlock, and candidate consent requirements.</Verify>
              <Verify>Confirm college administrator visibility: only students from their institution/batch, permitted reports, export controls, and role-based access limits.</Verify>
              <Verify>Confirm the statement “JREE does not sell personal data” is true under the final privacy/legal interpretation.</Verify>
            </Section>

            <Section id="privacy-compliance" title="Privacy & compliance">
              <P>Privacy controls should cover consent, access, correction, deletion, retention, purpose limitation, grievance handling, and user communication preferences.</P>
              <LegalReview>Insert DPDP Act, 2023 alignment language, consent basis, notice language, data fiduciary/processor roles, grievance officer details, retention periods, and data-subject rights process.</LegalReview>
              <P>See also <a href="#terms-and-conditions">Terms & Conditions</a> and the Privacy Policy section inside the Terms page.</P>
            </Section>

            <Section id="employers-fraud" title="Verified employers & fraud prevention">
              <P>Trust matters on both sides of the marketplace. Candidate data should be available only to legitimate employer users under defined account, payment, and unlock rules.</P>
              <Verify>Confirm GST verification, company-domain verification, manual review, abuse checks, employer suspension rules, and fake-company prevention workflow.</Verify>
              <Verify>Confirm payment fraud safeguards for unlock credits, subscriptions, invoices, chargebacks, refund abuse, and account takeover signals.</Verify>
            </Section>

            <Section id="ai-integrity" title="AI & assessment integrity">
              <P>JREE uses assessment and interview data to evaluate readiness. Public security language should explain the handling at a high level without exposing anti-cheat internals or security-sensitive details.</P>
              <Verify>Confirm AI/transcription providers, including Gemini and Deepgram if used, processing purpose, storage location, retention, deletion, subprocessor terms, and whether recordings are used beyond assessment or consented purposes.</Verify>
              <Verify>Confirm anti-cheating controls that can be safely disclosed, such as identity checks, session integrity signals, attempt controls, content confidentiality, and review workflows.</Verify>
            </Section>

            <Section id="certifications" title="Certifications & infrastructure">
              <P>Security certifications and infrastructure claims should be listed only when they are currently held and evidence is available.</P>
              <Verify>Confirm whether JREE, EduBridge, cloud providers, or subprocessors hold ISO 27001, SOC 2, penetration-test reports, VAPT summaries, or other certifications. If none are held by JREE, omit badge-style claims.</Verify>
            </Section>

            <Section id="disclosure" title="Responsible disclosure / report a vulnerability">
              <P>If you believe you have found a vulnerability in JREE, report it responsibly. Include a clear description, affected URL or workflow, reproduction steps, impact, and your contact details. Do not access, modify, download, or disclose user data.</P>
              <Verify>Confirm security contact email, expected response time, safe-harbour language, out-of-scope testing, and whether a formal bug bounty exists. Candidate placeholder: security@[domain].</Verify>
            </Section>

            <Section id="contact" title="Contact">
              <P>For security, privacy, or data-protection questions, use the official JREE contact routes.</P>
              <LegalReview>Insert official security email, privacy/grievance contact, postal address, escalation timeline, and links to Privacy Policy and Terms & Conditions.</LegalReview>
            </Section>

            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mt-8 rounded-full px-5 py-3" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-mono)", fontSize: 12 }}>↑ Back to top</button>
          </article>
        </div>
      </div>
    </main>
  );
}
