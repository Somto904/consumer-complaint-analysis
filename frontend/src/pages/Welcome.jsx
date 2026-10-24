import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  LockKeyhole,
  X,
} from "lucide-react";
import "./Welcome.css";

const benefits = [
  {
    number: "01",
    title: "Banking that makes sense",
    description:
      "Understand your options and compare account features with student life in mind.",
  },
  {
    number: "02",
    title: "Learn at your own pace",
    description:
      "Explore financial basics without complicated language or assumptions.",
  },
  {
    number: "03",
    title: "Start with confidence",
    description:
      "Build your knowledge of credit, saving, and managing money in the U.S.",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    if (!authMode) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") setAuthMode(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [authMode]);

  function getStarted(path = "/app") {
    localStorage.setItem("finsight:visited", "true");
    localStorage.setItem("finsight:last-page", path);
    navigate(path);
  }

  return (
    <div className="fn-welcome">
      <header className="fn-header fn-container">
        <a className="fn-logo" href="/" aria-label="FinSight homepage">
          <span className="fn-logo-icon">
            <ChartNoAxesCombined size={21} strokeWidth={2.4} />
          </span>
          FinSight
        </a>

        <div className="fn-header-actions">
          <button
            type="button"
            className="fn-header-signin"
            onClick={() => setAuthMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className="fn-header-create"
            onClick={() => setAuthMode("create")}
          >
            Create account <ArrowUpRight size={16} />
          </button>
        </div>
      </header>

      <main>
        <section className="fn-hero fn-container">
          <div className="fn-hero-copy">
            <div className="fn-eyebrow">
              <span className="fn-eyebrow-dot" aria-hidden="true" />
              A BETTER START WITH MONEY
            </div>

            <h1>
              Hey students,
              <br />
              let's be wise.
              <br />
              <span>Own your finances.</span>
            </h1>

            <p className="fn-hero-description">
              Figuring out money shouldn't feel overwhelming. FinSight helps
              college students explore banking and understand financial basics.
            </p>

            <div className="fn-hero-actions">
              <button
                type="button"
                className="fn-primary-btn"
                onClick={() => getStarted("/find-my-bank")}
              >
                Find my banking fit <ArrowUpRight size={18} />
              </button>
              <button
                type="button"
                className="fn-secondary-btn"
                onClick={() => getStarted("/app")}
              >
                Explore FinSight <ArrowRight size={18} />
              </button>
            </div>

            <div className="fn-trust-note">
              <span><Check size={15} /> Free to explore</span>
              <span><Check size={15} /> No account required</span>
            </div>
          </div>

          <figure className="fn-hero-figure">
            <div className="fn-photo-frame">
              <img
                src="/students-hero.jpg"
                alt="Students walking and chatting outdoors on a leafy college campus"
                className="fn-hero-photo"
              />
            </div>
            <figcaption className="fn-photo-caption">
              <span className="fn-caption-line" aria-hidden="true" />
              <span>MADE FOR REAL STUDENT LIFE</span>
              <span className="fn-caption-star" aria-hidden="true">✳</span>
            </figcaption>
          </figure>
        </section>

        <section id="why-finsight" className="fn-benefits">
          <div className="fn-container">
            <div className="fn-benefits-header">
              <div>
                <p className="fn-section-label">THE FINSIGHT APPROACH</p>
                <h2>Financial confidence starts with understanding.</h2>
              </div>
              <p className="fn-benefits-intro">
                Whether you're new to U.S. banking or simply want to understand
                your choices, start here and learn at your own pace.
              </p>
            </div>

            <div className="fn-benefit-grid">
              {benefits.map((benefit) => (
                <article className="fn-benefit" key={benefit.number}>
                  <span className="fn-benefit-number">{benefit.number} / 03</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>

            <div className="fn-cta-row">
              <div>
                <p className="fn-section-label">YOUR NEXT CHAPTER</p>
                <h2>Start with a little clarity.</h2>
              </div>
              <button
                type="button"
                className="fn-primary-btn"
                onClick={() => getStarted()}
              >
                Get started <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="fn-footer fn-container">
        <span>© {new Date().getFullYear()} FinSight</span>
        <span>Built for students navigating their financial future.</span>
      </footer>

      {authMode && (
        <div
          className="fn-dialog-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAuthMode(null);
          }}
        >
          <div
            className="fn-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fn-dialog-title"
          >
            <button
              type="button"
              className="fn-dialog-close"
              onClick={() => setAuthMode(null)}
              aria-label="Close account dialog"
            >
              <X size={20} />
            </button>
            <span className="fn-dialog-icon"><LockKeyhole size={21} /></span>
            <h2 id="fn-dialog-title">
              {authMode === "signin" ? "Welcome back" : "Join FinSight"}
            </h2>
            <p className="fn-dialog-copy">
              Account features are coming soon. You can explore FinSight without
              creating an account right now.
            </p>
            <div className="fn-auth-tabs">
              <button
                type="button"
                className={authMode === "signin" ? "active" : ""}
                onClick={() => setAuthMode("signin")}
              >Sign in</button>
              <button
                type="button"
                className={authMode === "create" ? "active" : ""}
                onClick={() => setAuthMode("create")}
              >Create account</button>
            </div>
            <form className="fn-auth-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                Email address
                <input type="email" placeholder="you@example.com" autoComplete="email" disabled />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                  disabled
                />
              </label>
              {authMode === "create" && (
                <label>
                  Confirm password
                  <input type="password" placeholder="Confirm password" autoComplete="new-password" disabled />
                </label>
              )}
              <button type="submit" className="fn-auth-disabled" disabled>
                {authMode === "signin" ? "Sign in" : "Create account"} — coming soon
              </button>
            </form>
            <button
              className="fn-guest-btn"
              type="button"
              onClick={() => getStarted()}
            >
              Continue as guest <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
