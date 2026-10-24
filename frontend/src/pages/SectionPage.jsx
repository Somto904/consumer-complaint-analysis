import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  GraduationCap,
  Landmark,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { ActionLink } from "../components/SiteLayout";

const sections = [
  {
    id: "compare",
    title: "Compare Banks",
    description:
      "Understand account fees, eligibility requirements, and banking features side by side.",
    icon: Landmark,
    path: "/compare",
    label: "Compare accounts",
    number: "01",
  },
  {
    id: "finder",
    title: "Find My Bank",
    description:
      "Find banking options based on your student status, priorities, and preferences.",
    icon: Search,
    path: "/find-my-bank",
    label: "Explore Bank Finder",
    number: "02",
  },
  {
    id: "learn",
    title: "Financial Learning",
    description:
      "Break down banking, interest rates, and personal finance into clear lessons.",
    icon: BookOpen,
    path: "/learn",
    label: "Browse lessons",
    number: "03",
  },
  {
    id: "credit",
    title: "Credit Guide",
    description:
      "Learn how U.S. credit works and what matters when you're starting out.",
    icon: GraduationCap,
    path: "/credit-guide",
    label: "Understand credit",
    number: "04",
  },
  {
    id: "insights",
    title: "Consumer Insights",
    description:
      "Explore public consumer complaint patterns and company response trends.",
    icon: ChartNoAxesCombined,
    path: "/insights",
    label: "Explore insights",
    number: "05",
  },
  {
    id: "tools",
    title: "Money Tools",
    description:
      "Explore how borrowing costs and savings interest can affect your finances.",
    icon: Wallet,
    path: "/tools",
    label: "Explore tools",
    number: "06",
  },
];

export function Dashboard() {
  return (
    <>
      <section className="dashboard-hero">
        <div className="container dashboard-hero-inner">
          <div className="dashboard-hero-copy">
            <span className="dashboard-eyebrow">
              YOUR FINANCIAL STARTING POINT
            </span>

            <h1>
              A little clarity goes
              <br />
              a long way.
            </h1>

            <p>
              Explore banking options, understand the details,
              and build financial knowledge at your own pace.
            </p>

            <ActionLink to="/find-my-bank" light>
              Find your banking fit
            </ActionLink>
          </div>

          <div className="dashboard-hero-mark">
            <ChartNoAxesCombined size={124} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section className="container explore-section">
        <div className="explore-heading">
          <div>
            <span className="section-kicker">EXPLORE FINSIGHT</span>
            <h2>What would you like to do today?</h2>
          </div>
          <p>Everything you need to get started, in one place.</p>
        </div>

        <div className="explore-grid">
          {sections.map(
            ({ id, icon: Icon, title, description, path, number }) => (
              <Link to={path} className="explore-card" key={id}>
                <div className="explore-card-top">
                  <span className="explore-card-icon">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="explore-number">{number}</span>
                </div>

                <h3>{title}</h3>
                <p>{description}</p>

                <span className="explore-card-action">
                  Explore <ArrowRight size={17} />
                </span>
              </Link>
            )
          )}
        </div>

        <div className="info-banner">
          <ShieldCheck size={23} />
          <p>
            FinSight is an educational platform. We believe in
            clear explanations, transparent data, and helping
            you make your own informed choices.
          </p>
        </div>
      </section>
    </>
  );
}

export default function SectionPage({ section, title, description }) {
  const selected = sections.find((item) => item.id === section);
  const Icon = selected?.icon || BookOpen;

  return (
    <section className="container feature-page">
      <Link to="/app" className="back-link">
        <ArrowRight size={16} className="reverse-arrow" />
        Back to overview
      </Link>

      <div className="feature-panel">
        <span className="feature-icon">
          <Icon size={30} strokeWidth={1.8} />
        </span>

        <span className="section-kicker">FINSIGHT FEATURE</span>

        <h1>{title}</h1>
        <p>{description}</p>

        <div className="feature-status">
          <span className="status-dot" />
          Feature in development
        </div>

        <p className="feature-description">
          This section is part of the FinSight roadmap.
          Its dedicated functionality will be added during
          the next development milestones.
        </p>

        <ActionLink to="/app" secondary>
          Explore other sections
        </ActionLink>
      </div>
    </section>
  );
}