import { useEffect, useState } from "react";

const VERSION = "Draft v0.1";
const UPDATED = "30 June 2026";

const sections = [
  { id: "preamble", label: "Preamble", title: "Preamble" },
  { id: "registration", label: "Registration", title: "Registration of Account" },
  { id: "collection", label: "Collection", title: "Collection & Retention of Information" },
  { id: "usage", label: "Usage", title: "Usage & Disclosure of Information" },
  { id: "ownership", label: "Ownership", title: "Data Ownership" },
  { id: "cookies", label: "Cookies", title: "Cookies & Passive Data Collection" },
  { id: "communication", label: "Communication", title: "Consent to Communication" },
  { id: "termination", label: "Termination", title: "Suspension, Termination & Data Handling" },
  { id: "age", label: "Age", title: "Age Restrictions" },
  { id: "dpdp", label: "DPDP rights", title: "DPDP Act, 2023 Rights" },
  { id: "security", label: "Security", title: "Security" },
  { id: "changes", label: "Changes", title: "Changes to this Policy + Contact" },
  { id: "excluded", label: "Excluded", title: "Clauses Intentionally Not Ported" },
];

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Placeholder({ type, children }: { type: "LEGAL REVIEW" | "VERIFY"; children: React.ReactNode }) {
  const legal = type === "LEGAL REVIEW";
  return (
    <div className="my-4 rounded-[12px] px-4 py-3" style={{ background: legal ? "var(--amber-soft)" : "var(--violet-soft)", border: `1px solid ${legal ? "var(--amber-border)" : "var(--violet-border)"}` }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: legal ? "var(--amber-text)" : "var(--violet)", textTransform: "uppercase" }}>
        [{type}] {legal ? "Counsel approval required" : "Confirm before publish"}
      </div>
      <div className="mt-2" style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--text-2)" }}>{children}</div>
    </div>
  );
}

function Meta() {
  return <div className="mt-3 flex flex-wrap gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.03em" }}><span>{VERSION}</span><span>·</span><span>Last updated: {UPDATED}</span></div>;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-12" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Privacy Policy</div>
      <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", color: "var(--text-1)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{title}</h2>
      <Meta />
      <div className="mt-7 privacy-copy">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4" style={{ fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</p>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{children}</h3>;
}
function OL({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-5 space-y-3" style={{ fontSize: 15.5, lineHeight: 1.72, color: "var(--text-2)" }}>{children}</ol>;
}

export function PrivacyPolicyPage() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      <style>{`.privacy-copy a{color:var(--violet);text-decoration:underline;text-underline-offset:3px}.privacy-copy li::marker{color:var(--text-3)}@media(max-width:1023px){.privacy-rail{display:none}}`}</style>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px] pt-10 pb-24">
        <a href="#" className="inline-flex rounded-full px-4 py-2" style={{ border: "1px solid var(--hairline-strong)", color: "var(--text-2)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 12 }}>← Back to JREE</a>

        <header className="pt-12 pb-10 md:pt-16 md:pb-14">
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--violet)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Legal document</div>
          <h1 className="mt-4 max-w-[840px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(38px,7vw,74px)", color: "var(--text-1)", letterSpacing: "-0.035em", lineHeight: 0.98 }}>Privacy Policy for JREE.</h1>
          <p className="mt-6 max-w-[720px]" style={{ fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "var(--text-2)" }}>How JREE collects, uses, stores, and shares data across assessments, scores, AI interviews, college dashboards, and employer candidate access.</p>
          <Meta />
        </header>

        <div className="lg:hidden mb-8 rounded-[16px]" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
          <button className="w-full flex items-center justify-between px-5 py-4" onClick={() => setOpen(!open)} style={{ color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 700 }}>Page contents <span>{open ? "−" : "+"}</span></button>
          {open && <nav className="px-3 pb-3">{sections.map((s) => <button key={s.id} onClick={() => { setOpen(false); jump(s.id); }} className="block w-full text-left rounded-[10px] px-3 py-2" style={{ color: "var(--text-2)", fontSize: 14 }}>{s.label}</button>)}</nav>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,760px)] gap-12 items-start">
          <aside className="privacy-rail sticky top-8 rounded-[16px] p-4" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Contents</div>
            <nav className="mt-3 space-y-1">{sections.map((s) => <button key={s.id} onClick={() => jump(s.id)} className="block w-full text-left rounded-[10px] px-3 py-2 transition-colors hover:bg-[var(--bg-2)]" style={{ color: "var(--text-2)", fontSize: 13.5 }}>{s.label}</button>)}</nav>
          </aside>

          <article className="max-w-[75ch]">
            <Section id="preamble" title="Preamble">
              <P>This Privacy Policy applies to JREE, an EduBridge initiative, including the JREE website, candidate assessment platform, AI interview experience, score reports, employer access tools, college dashboards, support channels, and related services.</P>
              <OL><li>By accessing or using JREE, you consent to the collection, use, disclosure, retention, and handling of information described in this Policy.</li><li>If you do not agree with this Policy, you should not use JREE.</li><li>This Policy should be read with the JREE Terms & Conditions and Security Center.</li></OL>
              <Placeholder type="LEGAL REVIEW">Confirm entity name, data fiduciary role, consent language, scope, incorporated documents, and whether separate B2B agreements override this Policy.</Placeholder>
            </Section>

            <Section id="registration" title="Registration of Account">
              <P>When a candidate, college user, or employer user registers, JREE may collect account and identity information needed to create, secure, and operate the account.</P>
              <OL><li>Candidate registration data may include name, email, phone number, location, education details, institution, graduation year, stream, role preferences, profile details, and authentication data.</li><li>Employer and college registration data may include organisation name, GST or business identifiers, official email, phone number, designation, authorised-user details, billing details, and account credentials.</li><li>Users must provide accurate information, keep credentials confidential, and promptly update incorrect or outdated account information.</li></OL>
              <Placeholder type="LEGAL REVIEW">Confirm exact fields collected at sign-up, mandatory/optional classification, KYC/GST fields, SSO data, and identity verification practices.</Placeholder>
            </Section>

            <Section id="collection" title="Collection & Retention of Information">
              <P>JREE may collect information directly from users, automatically through platform usage, from colleges or employers, and from service providers that help operate the platform.</P>
              <H3>Categories of information</H3>
              <OL><li>Candidate personal information, profile information, education details, contact details, preferences, and support communications.</li><li>Assessment responses, scores, ranks, bands, skill diagnostics, role-fit outputs, certificates, reports, and attempt metadata.</li><li>AI interview data, which may include audio, video, transcripts, prompts, answers, analysis outputs, proctoring/session signals, and processing logs.</li><li>Employer and college account data, permissions, billing records, unlock-credit usage, exports, reports, and activity logs.</li><li>Device, browser, IP address, cookies, session, analytics, error, and security logs.</li></OL>
              <Placeholder type="LEGAL REVIEW">Insert retention periods for each category, deletion/archive rules, backup retention, legal hold, inactive accounts, and whether AI recordings/transcripts have shorter retention.</Placeholder>
            </Section>

            <Section id="usage" title="Usage & Disclosure of Information">
              <P>JREE uses information to provide assessments, generate scores, maintain profiles, run AI interviews, provide college dashboards, operate employer candidate access, prevent fraud, provide support, and improve reliability.</P>
              <Placeholder type="LEGAL REVIEW">Insert counsel-approved disclosure for scores/profiles shown to verified employers, which fields are visible before unlock, which fields are released only after unlock and/or candidate consent, and how contact details are handled.</Placeholder>
              <Placeholder type="LEGAL REVIEW">Insert counsel-approved disclosure for batch data shared with the student's college, administrator access, exports, and institutional reporting.</Placeholder>
              <Placeholder type="LEGAL REVIEW">Insert AI-provider disclosures for Gemini, Deepgram, or any other processors/subprocessors, including purpose, processing location, retention, model-training restrictions, and deletion rights.</Placeholder>
              <Placeholder type="LEGAL REVIEW">Insert BridgeBeyond role in enrolment, payment, SSO, support, or shared infrastructure, if applicable.</Placeholder>
              <Placeholder type="LEGAL REVIEW">Confirm and insert statement that JREE does not sell candidate personal data. Define “sell” and any permitted service-provider/hiring-partner disclosures under applicable law.</Placeholder>
            </Section>

            <Section id="ownership" title="Data Ownership">
              <P>Candidates own their submitted profile information, assessment responses, and interview answers, subject to the permissions JREE needs to operate the service.</P>
              <OL><li>JREE needs a limited licence to host, process, analyse, score, display, share where permitted, secure, and support user-submitted information.</li><li>JREE owns the platform, assessment framework, scoring models, derived analytics, aggregated/de-identified insights, reports, interfaces, and intellectual property, subject to applicable law.</li></OL>
              <Placeholder type="LEGAL REVIEW">Confirm ownership/licence for AI interview recordings, transcripts, scoring derivatives, benchmark data, de-identified data, and employer-visible reports.</Placeholder>
            </Section>

            <Section id="cookies" title="Cookies & Passive Data Collection">
              <P>JREE may use cookies, pixels, local storage, analytics tools, and log files to operate sessions, remember preferences, secure accounts, analyse usage, detect abuse, debug errors, and improve platform performance.</P>
              <OL><li>Passive data may include IP address, device type, browser, operating system, referring pages, pages viewed, events, timestamps, approximate location, and session identifiers.</li><li>Users may control some cookies through browser settings. Disabling cookies may affect login, assessment, payment, or dashboard functionality.</li></OL>
              <Placeholder type="LEGAL REVIEW">Confirm cookie categories, analytics providers, consent banner requirements, opt-out mechanisms, and whether any advertising/remarketing cookies are used.</Placeholder>
            </Section>

            <Section id="communication" title="Consent to Communication">
              <P>JREE may send transactional and service communications needed to operate the platform, such as OTPs, account alerts, assessment reminders, score/report notices, employer interest alerts, billing notices, policy updates, and support messages.</P>
              <OL><li>Marketing or promotional messages, if used, should be distinguishable from service communications.</li><li>Opting out of marketing communications may not stop service, security, assessment, account, or legal notices.</li></OL>
              <Placeholder type="LEGAL REVIEW">Confirm channels: email, phone, SMS, WhatsApp, in-product messages; opt-out method; DND/telecom compliance; and consent language.</Placeholder>
            </Section>

            <Section id="termination" title="Suspension, Termination & Data Handling on Termination">
              <P>JREE may suspend or terminate access for account misuse, fraud, assessment misconduct, payment issues, legal risk, security risk, or violation of the Terms.</P>
              <Placeholder type="LEGAL REVIEW">Insert what happens to scores, ranks, certificates, employer-visible profiles, AI recordings, transcripts, college records, unlock history, invoices, and support logs after account closure or deletion request.</Placeholder>
            </Section>

            <Section id="age" title="Age Restrictions">
              <P>JREE is intended for users who can lawfully consent to this Policy and the Terms, or who use the platform with valid guardian, institutional, or authorised consent where required.</P>
              <Placeholder type="LEGAL REVIEW">Critical: confirm whether any test-takers may be under 18. If yes, insert DPDP minor-consent handling, verifiable parental/guardian consent process, school/college authorisation, and deletion/escalation workflow.</Placeholder>
            </Section>

            <Section id="dpdp" title="DPDP Act, 2023 Rights">
              <P>Indian privacy law may provide data principals with rights relating to access, correction, completion, updating, erasure, grievance redressal, nomination, and withdrawal of consent, subject to applicable limits.</P>
              <Placeholder type="LEGAL REVIEW">Insert final DPDP Act, 2023 rights language, request process, authentication steps, response timelines, grievance officer or data protection contact, appeal/escalation route, and exceptions.</Placeholder>
            </Section>

            <Section id="security" title="Security">
              <P>JREE uses technical and organisational controls intended to protect assessment data, scores, profiles, AI interview recordings, employer accounts, and college dashboards.</P>
              <Placeholder type="VERIFY">Confirm security controls before stating them: TLS, encryption at rest, access controls, audit logs, backups, monitoring, incident response, cloud region, and provider commitments.</Placeholder>
              <P>For more detail, see the <a href="#security-center">Security Center</a>.</P>
            </Section>

            <Section id="changes" title="Changes to this Policy + Contact">
              <P>JREE may update this Policy from time to time. The updated version will show a new version and last-updated date. Continued use after an update indicates consent where legally permitted.</P>
              <Placeholder type="LEGAL REVIEW">Insert official privacy/grievance email, Data Protection or Grievance Officer name/title if required, postal address, response timelines, escalation method, and update-notice requirements.</Placeholder>
            </Section>

            <Section id="excluded" title="Clauses Intentionally Not Ported">
              <P>The following source-policy topics are intentionally not carried into this JREE Privacy Policy unless legal confirms otherwise:</P>
              <OL><li>NSDC enrolment data sharing — omitted pending legal confirmation.</li><li>Recruitment-agency disclosure clauses — omitted because JREE uses verified employer access and unlock workflows instead.</li><li>Alumni or WhatsApp networking disclosures — omitted unless such community features are launched.</li><li>Refer-and-earn data processing — omitted unless JREE launches referrals.</li><li>Insurance-related data sharing — omitted as not applicable to current JREE flows.</li></OL>
            </Section>

            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mt-8 rounded-full px-5 py-3" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", color: "var(--text-2)", fontFamily: "var(--font-mono)", fontSize: 12 }}>↑ Back to top</button>
          </article>
        </div>
      </div>
    </main>
  );
}
