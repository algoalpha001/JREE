import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import svgPaths from "../imports/JreeLogoWhite1/svg-kcurjyxm17";
import { Hero } from "./components/Hero";
import {
  StakeholderCards,
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
import { ForColleges } from "./components/ForColleges";
import { ForEmployers } from "./components/ForEmployers";
import { AboutUs } from "./components/AboutUs";
import { AboutUsPage } from "./components/AboutUsPage";
import { ForEmployersPage } from "./components/ForEmployersPage";
import { ForCollegesPage } from "./components/ForCollegesPage";
import { FinalCTACards } from "./components/FinalCTACards";
import { Onboarding } from "./components/Onboarding";
import { Login } from "./components/Login";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { PostSignup, PostRoute } from "./components/PostSignup";
import { StyleGuide } from "./components/StyleGuide";
import { TermsPage } from "./components/TermsPage";
import { SecurityCenterPage } from "./components/SecurityCenterPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";

type Route = "landing" | "signup" | "login" | "resume-builder" | "styleguide" | "about-us" | "for-employers" | "for-colleges" | "terms" | "security" | "privacy" | PostRoute;
const POST_ROUTES: PostRoute[] = ["dashboard", "exam/check", "exam/active", "exam/transition", "exam/priya", "exam/processing", "results"];

function getRoute(): Route {
  if (typeof window === "undefined") return "landing";
  const h = window.location.hash.replace(/^#/, "");
  if (h === "signup") return "signup";
  if (h === "login") return "login";
  if (h === "resume-builder") return "resume-builder";
  if (h === "styleguide") return "styleguide";
  if (h === "about-us") return "about-us";
  if (h === "for-employers") return "for-employers";
  if (h === "for-colleges") return "for-colleges";
  if (h === "terms" || h === "terms-and-conditions") return "terms";
  if (h === "security" || h === "security-center") return "security";
  if (h === "privacy" || h === "privacy-policy") return "privacy";
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

  if (route === "for-employers") {
    return <ForEmployersPage />;
  }

  if (route === "for-colleges") {
    return <ForCollegesPage />;
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

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)", overflowX: "clip" }}>
      <Nav />
      <Hero />
      <StakeholderCards />
      <div id="colleges"><WhoFor /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="about"><MeetPriya /></div>
      <ForStudents />
      <div id="scoring"><Bands /></div>
      <ForColleges />
      <ForEmployers />
      <div id="employers"><Stats /></div>
      <Testimonials />
      <AboutUs />
      <FinalCTACards />
      <div id="faq"><FAQ /></div>
      <FinalCTA />
      <Footer />
    </div>
  );
}

function SignupLogo({ height = 22 }: { height?: number }) {
  const aspect = 585.6 / 174.705;
  return (
    <svg
      viewBox="0 0 585.6 174.705"
      style={{ height, width: height * aspect, display: "block" }}
      aria-label="JREE"
      fill="var(--text-1)"
    >
      <path d={svgPaths.p3c094f00} />
      <path d={svgPaths.p2839a8f2} />
      <g>
        <path d="M429.6 0H304.37V30H429.6V0Z" />
        <path d={svgPaths.p15664e00} />
        <path d={svgPaths.p36d6e000} />
        <path d={svgPaths.p7cc7500} />
      </g>
      <g>
        <path d="M585.6 0H460.37V30H585.6V0Z" />
        <path d={svgPaths.p3eea8080} />
        <path d={svgPaths.p10577800} />
        <path d={svgPaths.p4fbda30} />
      </g>
    </svg>
  );
}

function SignupHeader() {
  const goHome = () => {
    window.location.hash = "";
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-[100]" style={{ background: "rgba(11,9,15,0.75)", backdropFilter: "blur(24px) saturate(1.5)", WebkitBackdropFilter: "blur(24px) saturate(1.5)", borderBottom: "1px solid var(--violet-border)" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-[72px] h-[54px] md:h-[60px] flex items-center justify-between">
        <button onClick={goHome} className="flex flex-col leading-none" aria-label="Back to home">
          <SignupLogo />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>by EduBridge</span>
        </button>
        <button
          onClick={goHome}
          className="rounded-full transition-all hover:bg-[rgba(240,235,255,0.06)] active:scale-[0.97]"
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
