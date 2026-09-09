import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import {
  WhoFor,
  HowItWorks,
  MeetPriya,
  Stats,
  Testimonials,
  Bands,
  FAQ,
  FinalCTA,
  Footer,
} from "./components/Sections";
import { ForStudents } from "./components/ForStudents";
import { AboutUs } from "./components/AboutUs";
import { AboutUsPage } from "./components/AboutUsPage";
import { ForEmployersPage } from "./components/ForEmployersPage";
import { ForCollegesPage } from "./components/ForCollegesPage";
import { Onboarding } from "./components/Onboarding";
import { Login } from "./components/Login";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { PostSignup, PostRoute } from "./components/PostSignup";
import { StyleGuide } from "./components/StyleGuide";
import { TermsPage } from "./components/TermsPage";
import { SecurityCenterPage } from "./components/SecurityCenterPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { EntryPage } from "./components/EntryPage";
import { ImprovementPlanPage } from "./components/ImprovementPlanPage";

type Route = "landing" | "learn" | "signup" | "login" | "resume-builder" | "styleguide" | "about-us" | "for-students" | "for-employers" | "for-colleges" | "terms" | "security" | "privacy" | PostRoute;
const POST_ROUTES: PostRoute[] = ["dashboard", "exam/tutorial", "exam/check", "exam/active", "exam/transition", "exam/priya", "exam/processing", "results"];

function getRoute(): Route {
  if (typeof window === "undefined") return "landing";
  const h = window.location.hash.replace(/^#/, "");
  if (h === "signup") return "signup";
  if (h === "login") return "login";
  if (h === "resume-builder") return "resume-builder";
  if (h === "styleguide") return "styleguide";
  if (h === "about-us") return "about-us";
  if (h === "for-students" || h === "students") return "for-students";
  if (h === "for-employers" || h === "employers") return "for-employers";
  if (h === "for-colleges" || h === "colleges") return "for-colleges";
  if (h === "terms" || h === "terms-and-conditions") return "terms";
  if (h === "security" || h === "security-center") return "security";
  if (h === "privacy" || h === "privacy-policy") return "privacy";
  if (h === "learn" || h.startsWith("learn/")) return "learn";
  if (h === "results" || h.startsWith("results/")) return "results";
  if ((POST_ROUTES as string[]).includes(h)) return h as PostRoute;
  return "landing";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "signup") {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
        <SignupHeader />
        <Onboarding />
      </div>
    );
  }

  if (route === "login") {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
        <SignupHeader />
        <Login />
      </div>
    );
  }

  if (route === "learn") {
    return <ImprovementPlanPage />;
  }

  if (route === "resume-builder") {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
        <ResumeBuilder />
      </div>
    );
  }

  if (route === "styleguide") {
    return <StyleGuide />;
  }

  if (route === "about-us") {
    return <AboutUsPage />;
  }

  if (route === "for-students") {
    return <StudentPage />;
  }

  if (route === "for-employers") {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)", overflowX: "clip" }}>
        <Nav />
        <ForEmployersPage />
        <Footer />
      </div>
    );
  }

  if (route === "for-colleges") {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)", overflowX: "clip" }}>
        <Nav />
        <ForCollegesPage />
        <Footer />
      </div>
    );
  }

  if (route === "terms") {
    return <TermsPage />;
  }

  if (route === "security") {
    return <SecurityCenterPage />;
  }

  if (route === "privacy") {
    return <PrivacyPolicyPage />;
  }

  if ((POST_ROUTES as string[]).includes(route)) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
        <PostSignup route={route as PostRoute} />
      </div>
    );
  }

  return <EntryPage />;
}

function StudentPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)", overflowX: "clip" }}>
      <Nav />
      <Hero />
      <div id="score"><WhoFor /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="about"><MeetPriya /></div>
      <ForStudents />
      <div id="scoring"><Bands /></div>
      <div id="stats"><Stats /></div>
      <Testimonials />
      <AboutUs />
      <div id="faq"><FAQ /></div>
      <FinalCTA />
      <Footer />
    </div>
  );
}

function SignupLogo() {
  return <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-1)", letterSpacing: "-.03em" }}>JREE</span>;
}

function SignupHeader() {
  const goHome = () => {
    window.location.hash = "";
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-[100]" style={{ background: "rgba(250,247,240,0.94)", backdropFilter: "blur(24px) saturate(1.5)", WebkitBackdropFilter: "blur(24px) saturate(1.5)", borderBottom: "1px solid var(--violet-border)" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-[72px] h-[54px] md:h-[60px] flex items-center justify-between">
        <button onClick={goHome} className="flex flex-col leading-none" aria-label="Back to home">
          <SignupLogo />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>by EduBridge</span>
        </button>
        <button
          onClick={goHome}
          className="rounded-full transition-all hover:bg-[var(--violet-soft)] active:scale-[0.97]"
          style={{
            height: 36,
            padding: "0 16px",
            background: "transparent",
            border: "1px solid var(--violet-border)",
            color: "var(--text-1)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          ← Back to home
        </button>
      </div>
    </header>
  );
}
