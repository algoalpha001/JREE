import { useEffect, useState } from "react";

const VERSION = "Draft v0.1";
const UPDATED = "30 June 2026";

const policies = [
  { id: "preamble", label: "Preamble", title: "Preamble & Updation of Terms" },
  { id: "acceptance", label: "Acceptance", title: "Registered User's Acceptance of Terms" },
  { id: "privacy", label: "Privacy", title: "Privacy Policy" },
  { id: "pricing", label: "Pricing", title: "Pricing & Refund Policy" },
  { id: "fraud", label: "Fraud", title: "Payment Fraud Prevention Policy" },
  { id: "honor-code", label: "Honor Code", title: "Honor Code / Acceptable Use" },
  { id: "ip", label: "IP Rights", title: "Intellectual Property Rights" },
  { id: "third-party", label: "Third Parties", title: "Third-Party Services & Content" },
  { id: "legal", label: "Legal Terms", title: "Limitation, Indemnity & Disputes" },
  { id: "contact", label: "Help Desk", title: "Contact / Help Desk" },
  { id: "excluded", label: "Excluded", title: "Clauses Intentionally Not Ported" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LegalReview({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-[12px] px-4 py-3" style={{ background: "var(--amber-soft)", border: "1px solid var(--amber-border)", color: "var(--text-1)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--amber-text)", textTransform: "uppercase" }}>
        [LEGAL REVIEW] Draft placeholder — do not publish
      </div>
      <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.65, color: "var(--text-2)" }}>{children}</div>
    </div>
  );
}

function MetaLine() {
  return (
    <div className="mt-3 flex flex-wrap gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.03em" }}>
      <span>{VERSION}</span><span>·</span><span>Last updated: {UPDATED}</span>
    </div>
  );
}

function Policy({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-12" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
        JREE Terms & Conditions
      </div>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", color: "var(--text-1)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
        {title}
      </h2>
      <MetaLine />
      <div className="mt-7 legal-copy">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</p>;
}

function OL({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-5 space-y-3" style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</ol>;
}

export function TermsPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      <style>{`.legal-copy a{color:var(--violet);text-decoration:underline;text-underline-offset:3px}.legal-copy li::marker{color:var(--text-3)} @media(max-width:1023px){.terms-rail{display:none}}`}</style>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px] pt-10 pb-24">
        <a href="#" className="inline-flex rounded-full px-4 py-2" style={{ border: "1px solid var(--hairline-strong)", color: "var(--text-2)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 12 }}>
          ← Back to JREE
        </a>

        <header className="pt-12 pb-10 md:pt-16 md:pb-14">
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--violet)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Legal document</div>
          <h1 className="mt-4 max-w-[860px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(38px,7vw,76px)", color: "var(--text-1)", letterSpacing: "-0.035em", lineHeight: 0.98 }}>
            Terms & Conditions for JREE.
          </h1>
          <p className="mt-6 max-w-[720px]" style={{ fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "var(--text-2)" }}>
            This draft organises JREE's website, assessment, AI interview, employer access, college billing, and unlock-credit terms into one navigable policy page. Highlighted blocks require counsel-approved language before publication.
          </p>
          <MetaLine />
        </header>

        <div className="lg:hidden mb-8 rounded-[16px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <button className="w-full flex items-center justify-between px-5 py-4" onClick={() => setOpen(!open)} style={{ color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Page contents <span>{open ? "−" : "+"}</span>
          </button>
          {open && <nav className="px-3 pb-3">{policies.map((p) => <button key={p.id} onClick={() => { setOpen(false); scrollToId(p.id); }} className="block w-full text-left rounded-[10px] px-3 py-2" style={{ color: "var(--text-2)", fontSize: 14 }}>{p.label}</button>)}</nav>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,760px)] gap-12 items-start">
          <aside className="terms-rail sticky top-8 rounded-[16px] p-4" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Contents</div>
            <nav className="mt-3 space-y-1">{policies.map((p) => <button key={p.id} onClick={() => scrollToId(p.id)} className="block w-full text-left rounded-[10px] px-3 py-2 transition-colors hover:bg-[var(--bg-2)]" style={{ color: "var(--text-2)", fontSize: 13.5 }}>{p.label}</button>)}</nav>
          </aside>

          <article className="max-w-[75ch]">
            <Policy id="preamble" title="Preamble & Updation of Terms">
              <P>These Terms & Conditions govern access to and use of JREE, an EduBridge initiative, including JREE websites, assessments, score reports, AI interview experiences, dashboards, employer candidate access, college interfaces, support channels, and related services.</P>
              <OL><li>JREE may update these Terms from time to time by posting a revised version with a new version and date stamp.</li><li>Continued access to or use of JREE after an update constitutes consent to the revised Terms.</li><li>If you do not agree to these Terms, you should not access or use JREE.</li></OL>
              <LegalReview>Confirm contracting entity name, registered address, publication mechanics, required notice period, and whether separate B2B order forms override these Terms.</LegalReview>
            </Policy>

            <Policy id="acceptance" title="Registered User's Acceptance of Terms">
              <H3>1. Eligibility and permitted use</H3><P>JREE may be used by candidates, students, college administrators, employer users, and authorised representatives who register or are invited to use the platform. Users must provide accurate information and keep account credentials secure.</P>
              <H3>2. Limited licence</H3><P>Subject to these Terms, JREE grants registered users a limited, revocable, non-exclusive, non-transferable licence to access the platform for its intended assessment, learning, placement, hiring, or administrative purposes.</P>
              <H3>3. One-account rule</H3><OL><li>Candidates may maintain only one JREE account unless JREE expressly permits otherwise.</li><li>Accounts, scores, assessment attempts, unlock credits, subscriptions, or institutional access may not be sold, transferred, sublicensed, or shared.</li></OL>
            </Policy>

            <Policy id="privacy" title="Privacy Policy">
              <H3>1. Registration</H3><P>JREE may collect registration information such as name, phone number, email address, education details, location, role preferences, institutional affiliation, employer affiliation, and account authentication data.</P>
              <H3>2. Collection & retention</H3><P>JREE may collect information generated through assessments, score reports, skill diagnostics, profile updates, support interactions, device logs, and platform usage. Retention periods should be tied to lawful business, compliance, audit, dispute-resolution, and user-service purposes.</P>
              <LegalReview>Define exact retention periods for raw assessment responses, scores, AI interview audio/video/transcripts, employer unlock history, support records, and inactive accounts.</LegalReview>
              <H3>3. Usage & disclosure</H3><P>JREE may use user information to administer assessments, generate scores, provide dashboards, improve platform reliability, prevent fraud, support candidates, enable college reporting, and facilitate hiring workflows.</P>
              <LegalReview>Insert counsel-approved language for employer access to candidate scores, candidate contact details, shortlists, profile data, hiring-partner sharing, and whether sharing is opt-in, consent-based, contract-based, or otherwise lawful under applicable Indian privacy law including DPDP Act, 2023.</LegalReview>
              <H3>4. Data ownership</H3><P>Users retain ownership of their submitted profile information and responses, subject to licences needed by JREE to operate and improve the platform. JREE owns platform-generated scoring logic, analytics, reports, benchmarks, derived insights, and aggregated/de-identified data, subject to applicable law.</P>
              <LegalReview>Confirm ownership/licence treatment for AI interview recordings, transcripts, scoring derivatives, model-evaluation data, anonymised benchmarks, and employer-visible reports.</LegalReview>
              <H3>5. Cookies and passive data collection</H3><P>JREE may use cookies, pixels, local storage, analytics logs, and similar technologies to remember preferences, secure sessions, analyse usage, improve performance, and detect abuse. Users may control certain cookies through browser settings, although disabling them may affect platform functionality.</P>
              <H3>6. Consent to communication</H3><P>By registering, users consent to receive service messages, transactional alerts, assessment updates, account notices, hiring opportunity communications, and support responses through email, phone, SMS, WhatsApp, or in-product messages, subject to applicable law and opt-out rights.</P>
              <H3>7. Suspension, termination, data on termination, and inactive accounts</H3><OL><li>JREE may suspend or terminate accounts for fraud, misuse, security risk, non-payment, assessment misconduct, or violation of these Terms.</li><li>On termination, access may cease, but JREE may retain records required for legal, compliance, fraud-prevention, audit, dispute-resolution, or legitimate business purposes.</li><li>Inactive accounts may be archived, restricted, or deleted according to JREE's retention policy.</li></OL>
              <H3>8. Age restrictions</H3><P>JREE is intended for users who are legally able to consent to these Terms or who use the platform with appropriate parent, guardian, institutional, or authorised consent where required.</P>
              <LegalReview>Confirm minimum age, minor-consent flow, and institutional consent treatment.</LegalReview>
              <H3>9. Contact</H3><P>Privacy questions and rights requests should be directed to the JREE Help Desk listed at the end of these Terms.</P>
            </Policy>

            <Policy id="pricing" title="Pricing & Refund Policy">
              <P>JREE may offer free and paid services, including candidate assessments, employer access plans, contact-unlock credits, subscription tiers, college per-student billing, and other paid platform features.</P>
              <LegalReview>Insert final pricing rules for contact-unlock credits, expiry, recharge, refundability, employer subscription tiers, trial plans, college per-student billing, taxes, invoicing, payment failure, plan downgrades, and no-refund-on-unlock policy.</LegalReview>
              <OL><li>Fees, features, limits, and taxes may vary by plan, order form, promotional offer, institution, or employer agreement.</li><li>Unless expressly stated in an applicable order form, paid access is personal or organisation-specific and may not be transferred.</li><li>Any refund, credit, or adjustment must be handled according to JREE's published or contractually agreed refund policy.</li></OL>
            </Policy>

            <Policy id="fraud" title="Payment Fraud Prevention Policy">
              <OL><li>Users must use only lawful payment instruments and accurate billing information.</li><li>JREE may verify payments, withhold access, reverse credits, suspend accounts, or request additional information where payment fraud, chargeback risk, suspicious transaction patterns, or unauthorised use is suspected.</li><li>Users should report unauthorised payment activity promptly to the Help Desk.</li><li>JREE may cooperate with banks, payment gateways, law-enforcement agencies, and regulators where required.</li></OL>
            </Policy>

            <Policy id="honor-code" title="Honor Code / Acceptable Use">
              <H3>Assessment integrity</H3><OL><li>Users must complete assessments and AI interviews honestly, independently, and using their own identity.</li><li>Users must not impersonate another person, use multiple accounts, submit another person's work, manipulate device/session controls, or attempt to influence scoring unfairly.</li><li>Users must not copy, record, publish, sell, share, or distribute assessment questions, prompts, scoring rubrics, interview scripts, or confidential platform content.</li></OL>
              <H3>Prohibited content and conduct</H3><OL><li>No unlawful, abusive, harassing, defamatory, hateful, discriminatory, pornographic, violent, exploitative, fraudulent, misleading, or infringing content.</li><li>No malware, scraping, unauthorised automation, reverse engineering, credential sharing, security probing, model abuse, or platform interference.</li><li>No attempts to bypass payment, unlock, subscription, identity, or eligibility controls.</li></OL>
            </Policy>

            <Policy id="ip" title="Intellectual Property Rights">
              <P>JREE and its licensors own the platform, brand, assessment framework, scoring engine, questions, prompts, interfaces, reports, visual design, databases, software, documentation, and related intellectual property.</P>
              <P>Users own their submitted profile information and responses, while granting JREE the rights necessary to host, process, score, analyse, display, share where permitted, and improve the services.</P>
              <LegalReview>Confirm scope of user content licence, use for product improvement, AI evaluation, de-identification, and employer/report sharing.</LegalReview>
            </Policy>

            <Policy id="third-party" title="Third-Party Services & Content">
              <P>JREE may interoperate with third-party infrastructure, analytics, communication, payment, video, transcription, AI, employer, job-marketplace, and EduBridge/BridgeBeyond services. Third-party services may be governed by their own terms and privacy notices.</P>
              <LegalReview>Insert approved disclosures for Gemini, Deepgram, employer platforms, BridgeBeyond, payment gateways, cloud hosting, analytics, subprocessors, data transfer locations, and fallback responsibilities.</LegalReview>
            </Policy>

            <Policy id="legal" title="Limitation of Liability · Indemnification · Force Majeure · Governing Law / Jurisdiction · Arbitration · Severability">
              <H3>1. Limitation of liability</H3><P>To the maximum extent permitted by law, JREE will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profit, data, goodwill, opportunity, employment, admission, business, or reputation arising from use of the platform.</P><LegalReview>Insert liability cap figure and confirm exclusions that cannot be capped under Indian law.</LegalReview>
              <H3>2. Indemnification</H3><P>Users agree to indemnify and hold harmless JREE, EduBridge, and their officers, employees, affiliates, and partners from claims arising from misuse of the platform, violation of these Terms, infringement, fraud, unlawful conduct, or assessment misconduct.</P>
              <H3>3. Force majeure</H3><P>JREE will not be responsible for delay or failure caused by events beyond reasonable control, including network outages, payment gateway failures, cloud provider outages, cyber incidents, regulatory actions, natural disasters, labour disruptions, war, epidemic, or governmental restrictions.</P>
              <H3>4. Governing law, jurisdiction, and arbitration</H3><LegalReview>Confirm governing law, seat, venue, court jurisdiction, arbitration rules, arbitrator count, language, and whether the source's Kolkata jurisdiction applies to JREE.</LegalReview>
              <H3>5. Severability</H3><P>If any provision of these Terms is held invalid or unenforceable, the remaining provisions will continue in effect, and the invalid provision will be replaced or interpreted to best reflect the original intent where permitted by law.</P>
            </Policy>

            <Policy id="contact" title="Contact / Help Desk">
              <P>For account support, assessment access, billing questions, privacy requests, payment fraud reports, or escalation, contact the JREE Help Desk.</P>
              <LegalReview>Insert official JREE support email, postal address, grievance officer details if required, escalation timeline, and privacy contact.</LegalReview>
            </Policy>

            <Policy id="excluded" title="Clauses Intentionally Not Ported">
              <P>The following source-policy themes are intentionally omitted or marked not applicable to JREE unless legal confirms otherwise:</P>
              <OL><li>NSDC partnership — N/A pending legal confirmation.</li><li>EMI provider relationship — N/A pending legal confirmation.</li><li>Job/interview guarantee voiding — N/A; JREE should not imply employment guarantees unless separately approved.</li><li>Educational Partners & Accreditation — N/A pending product/legal confirmation.</li><li>Secure-Your-Salary insurance — N/A.</li><li>ELC Referral Club tiers — N/A.</li><li>Refer & Earn — N/A unless JREE launches a referral programme.</li></OL>
            </Policy>

            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mt-8 rounded-full px-5 py-3" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              ↑ Back to top
            </button>
          </article>
        </div>
      </div>
    </main>
  );
}
