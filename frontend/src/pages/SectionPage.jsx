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
import "./SectionPage.css";

const sections = [
  {
    id: "compare",
    title: "Compare Banks",
    description:
      "Understand account fees, eligibility requirements, and banking features side by side.",
    icon: Landmark,
    path: "/compare",
    number: "01",
  },
  {
    id: "finder",
    title: "Find My Bank",
    description:
      "Find banking options based on your student status, priorities, and preferences.",
    icon: Search,
    path: "/find-my-bank",
    number: "02",
  },
  {
    id: "learn",
    title: "Financial Learning",
    description:
      "Break down banking, interest rates, and personal finance into clear lessons.",
    icon: BookOpen,
    path: "/learn",
    number: "03",
  },
  {
    id: "credit",
    title: "Credit Guide",
    description:
      "Learn how U.S. credit works and what matters when you're starting out.",
    icon: GraduationCap,
    path: "/credit-guide",
    number: "04",
  },
  {
    id: "insights",
    title: "Consumer Insights",
    description:
      "Explore public consumer complaint patterns and company response trends.",
    icon: ChartNoAxesCombined,
    path: "/insights",
    number: "05",
  },
  {
    id: "tools",
    title: "Money Tools",
    description:
      "Explore how borrowing costs and savings interest can affect your finances.",
    icon: Wallet,
    path: "/tools",
    number: "06",
  },
];

// Illustrations drawn directly with SVG.
// No external image files are needed.
function FeatureArt({ type }) {
  return (
    <svg viewBox="0 0 220 140" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fsBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#65c6fc" />
          <stop offset="1" stopColor="#336cde" />
        </linearGradient>
        <linearGradient id="fsGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6de4c4" />
          <stop offset="1" stopColor="#15846f" />
        </linearGradient>
        <linearGradient id="fsGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe788" />
          <stop offset="1" stopColor="#ffad31" />
        </linearGradient>
        <linearGradient id="fsPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc4d6" />
          <stop offset="1" stopColor="#f47ea5" />
        </linearGradient>
      </defs>

      {/* COMPARE BANKS */}
      {type === "compare" && (
        <g>
          <circle cx="58" cy="62" r="46" fill="#c7f0e2" />

          <path
            d="M15 69 L67 27 L119 69 Z"
            fill="#e9fbf4"
            stroke="#1f9277"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <rect x="21" y="72" width="92" height="9" rx="3" fill="#2da68a" />

          {[33, 58, 83].map((x) => (
            <rect
              key={x}
              x={x}
              y="80"
              width="15"
              height="37"
              rx="3"
              fill="#fff"
              stroke="#6bbfa5"
              strokeWidth="2"
            />
          ))}

          <rect x="17" y="116" width="102" height="9" rx="4" fill="#23876d" />

          <rect
            x="118"
            y="25"
            width="86"
            height="53"
            rx="10"
            fill="url(#fsGreen)"
            transform="rotate(9 161 51)"
          />

          <rect
            x="128"
            y="51"
            width="82"
            height="52"
            rx="10"
            fill="url(#fsBlue)"
            transform="rotate(-6 169 77)"
          />

          <rect
            x="117"
            y="83"
            width="93"
            height="48"
            rx="10"
            fill="url(#fsGold)"
          />

          <rect
            x="129"
            y="95"
            width="17"
            height="11"
            rx="3"
            fill="#ffe7ab"
            stroke="#dd9f34"
          />

          <path
            d="M154 114 h38"
            stroke="#fff0bf"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* FIND MY BANK */}
      {type === "finder" && (
        <g>
          <path
            d="M25 53 L82 36 L139 52 L196 35 L196 110 L139 125 L82 109 L25 125 Z"
            fill="#f7fffb"
            stroke="#abd7c5"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M82 36 V109 M139 52 V125"
            fill="none"
            stroke="#cde9dd"
            strokeWidth="3"
          />

          <path
            d="M39 100 Q85 67 120 99 T187 76"
            fill="none"
            stroke="#75c7dc"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <path
            d="M118 84 C118 62 151 62 151 84 C151 100 135 116 135 116 C135 116 118 100 118 84"
            fill="#ff7f8d"
          />

          <circle cx="135" cy="83" r="7" fill="white" />

          <circle
            cx="76"
            cy="63"
            r="32"
            fill="#d7f8f1"
            stroke="#147d8b"
            strokeWidth="9"
          />

          <path
            d="M53 86 L33 108"
            stroke="#147d8b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d="M67 65 L77 54 L87 65 M70 66 V77 M77 66 V77 M84 66 V77"
            fill="none"
            stroke="#178c73"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="187" cy="40" r="14" fill="url(#fsGold)" />

          <path
            d="M181 40 L185 44 L193 35"
            fill="none"
            stroke="#996311"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* FINANCIAL LEARNING */}
      {type === "learn" && (
        <g>
          <path
            d="M110 120 C85 105 59 104 24 112 V33 C61 22 88 27 110 42 Z"
            fill="#fffdf3"
            stroke="#208b7c"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d="M110 120 C135 105 161 104 196 112 V33 C159 22 132 27 110 42 Z"
            fill="#f0fcff"
            stroke="#208b7c"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path d="M110 43 V120" stroke="#4aa68c" strokeWidth="3" />

          <path
            d="M40 54 H86 M40 65 H81 M40 77 H90"
            stroke="#aadbd0"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <rect
            x="130"
            y="49"
            width="47"
            height="34"
            rx="8"
            fill="#c3e3ff"
          />

          <path
            d="M143 73 L151 61 L158 68 L165 54"
            fill="none"
            stroke="#3483ca"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M130 95 H174"
            stroke="#aadbd0"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle
            cx="35"
            cy="107"
            r="19"
            fill="url(#fsGold)"
            stroke="#eb9e21"
            strokeWidth="3"
          />

          <text
            x="35"
            y="115"
            fontSize="23"
            fontWeight="800"
            fill="#b9780a"
            textAnchor="middle"
          >
            $
          </text>

          <path
            d="M163 18 L167 26 L176 30 L167 34 L163 42 L159 34 L150 30 L159 26 Z"
            fill="#ffc64e"
          />
        </g>
      )}

      {/* CREDIT GUIDE */}
      {type === "credit" && (
        <g>
          <rect
            x="38"
            y="31"
            width="151"
            height="93"
            rx="17"
            fill="url(#fsBlue)"
            transform="rotate(-7 114 77)"
          />

          <path
            d="M42 86 Q104 49 185 103"
            fill="none"
            stroke="#74dce9"
            strokeWidth="19"
            opacity="0.43"
          />

          <rect
            x="57"
            y="56"
            width="30"
            height="23"
            rx="5"
            fill="url(#fsGold)"
            stroke="#eab147"
            strokeWidth="2"
          />

          <path
            d="M73 56 V79 M57 68 H87"
            stroke="#e8a631"
            strokeWidth="2"
          />

          <path
            d="M56 101 H92 M100 101 H126"
            stroke="#d7edff"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <circle
            cx="169"
            cy="108"
            r="24"
            fill="url(#fsGold)"
            stroke="#ffbd36"
            strokeWidth="3"
          />

          <path
            d="M158 108 L166 116 L180 99"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M139 17 L150 26 L161 9"
            fill="none"
            stroke="#36bca8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* CONSUMER INSIGHTS */}
      {type === "insights" && (
        <g>
          <rect
            x="37"
            y="16"
            width="154"
            height="111"
            rx="15"
            fill="#fff"
            stroke="#bde0dd"
            strokeWidth="3"
          />

          <path d="M59 103 H173" stroke="#e6eeeb" strokeWidth="3" />

          <rect x="65" y="78" width="17" height="25" rx="5" fill="#60d4c5" />
          <rect x="91" y="61" width="17" height="42" rx="5" fill="#68b4fc" />
          <rect x="117" y="46" width="17" height="57" rx="5" fill="#b49af6" />
          <rect
            x="143"
            y="33"
            width="17"
            height="70"
            rx="5"
            fill="url(#fsGold)"
          />

          <path
            d="M63 57 L94 42 L121 50 L155 24"
            fill="none"
            stroke="#189c88"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="76"
            cy="90"
            r="27"
            fill="#e0fbf4"
            fillOpacity="0.8"
            stroke="#158d93"
            strokeWidth="8"
          />

          <path
            d="M56 109 L39 128"
            stroke="#158d93"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <circle cx="186" cy="23" r="8" fill="#ffbb65" />
        </g>
      )}

      {/* MONEY TOOLS - PINK PIGGY BANK */}
      {type === "tools" && (
        <g>
          <path
            d="M169 82 Q203 57 198 88 Q192 98 186 84"
            fill="none"
            stroke="#ef79a4"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M58 66 L52 38 Q72 37 82 56"
            fill="url(#fsPink)"
            stroke="#ed7ca6"
            strokeWidth="3"
          />

          <path
            d="M125 54 L140 30 Q158 41 159 63"
            fill="url(#fsPink)"
            stroke="#ed7ca6"
            strokeWidth="3"
          />

          <circle
            cx="115"
            cy="36"
            r="27"
            fill="url(#fsGold)"
            stroke="#eba52b"
            strokeWidth="4"
          />

          <text
            x="115"
            y="47"
            fontSize="32"
            fontWeight="800"
            fill="#cc800b"
            textAnchor="middle"
          >
            $
          </text>

          <rect x="57" y="105" width="25" height="23" rx="9" fill="#e97a9d" />
          <rect x="140" y="105" width="25" height="23" rx="9" fill="#e97a9d" />

          <ellipse
            cx="112"
            cy="86"
            rx="81"
            ry="45"
            fill="url(#fsPink)"
            stroke="#ee88aa"
            strokeWidth="3"
          />

          <ellipse cx="59" cy="95" rx="27" ry="24" fill="#fb9fbb" />
          <ellipse cx="53" cy="94" rx="4" ry="6" fill="#bd527d" />
          <ellipse cx="66" cy="94" rx="4" ry="6" fill="#bd527d" />

          <path
            d="M97 74 Q103 65 109 74 M137 74 Q143 65 149 74"
            fill="none"
            stroke="#503f58"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M108 48 H133"
            stroke="#b55679"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M178 28 L190 16 M190 39 L204 35"
            stroke="#269e92"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

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
            <span className="section-kicker">
              EXPLORE FINSIGHT
            </span>

            <h2>What would you like to do today?</h2>
          </div>

          <p>Everything you need to get started, in one place.</p>
        </div>

        <div className="explore-grid">
          {sections.map(
            ({ id, title, description, path, number }) => (
              <Link
                to={path}
                className={`explore-card explore-card--${id}`}
                key={id}
              >
                <div className="explore-card-top">
                  <span className="explore-card-art">
                    <FeatureArt type={id} />
                  </span>

                  <span className="explore-number">
                    {number}
                  </span>
                </div>

                <h3>{title}</h3>
                <p>{description}</p>

                <span className="explore-card-action">
                  Explore
                  <ArrowRight size={17} />
                </span>
              </Link>
            )
          )}
        </div>

        <div className="info-banner">
          <ShieldCheck size={23} />

          <p>
            FinSight is an educational platform.
            We believe in clear explanations, transparent data,
            and helping you make your own informed choices.
          </p>
        </div>
      </section>
    </>
  );
}

export default function SectionPage({
  section,
  title,
  description,
}) {
  const selected = sections.find(
    (item) => item.id === section
  );

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

        <span className="section-kicker">
          FINSIGHT FEATURE
        </span>

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