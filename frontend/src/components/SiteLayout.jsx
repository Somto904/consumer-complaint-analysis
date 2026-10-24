import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  ChevronRight,
  Compass,
  GraduationCap,
  Landmark,
  Menu,
  Search,
  Wallet,
  X,
} from "lucide-react";

export const navigation = [
  { label: "Overview", path: "/app", icon: Compass },
  { label: "Compare Banks", path: "/compare", icon: Landmark },
  { label: "Find My Bank", path: "/find-my-bank", icon: Search },
  { label: "Learn", path: "/learn", icon: BookOpen },
  { label: "Credit Guide", path: "/credit-guide", icon: GraduationCap },
  { label: "Insights", path: "/insights", icon: ChartNoAxesCombined },
  { label: "Money Tools", path: "/tools", icon: Wallet },
];

export function Logo({ light = false }) {
  return (
    <Link
      to="/app"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="FinSight overview"
    >
      <span className="brand-symbol">
        <ChartNoAxesCombined size={21} strokeWidth={2.4} />
      </span>

      <span>
        Fin<span className="brand-highlight">Sight</span>
      </span>
    </Link>
  );
}

export function ActionLink({
  to,
  children,
  secondary = false,
  light = false,
}) {
  return (
    <Link
      to={to}
      className={`action-link ${
        secondary ? "action-secondary" : "action-primary"
      } ${light ? "action-light" : ""}`}
    >
      {children}
      {secondary ? (
        <ChevronRight size={17} />
      ) : (
        <ArrowUpRight size={17} />
      )}
    </Link>
  );
}

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "mobile-active" : ""}`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <Logo />
            <p>Financial clarity for your next chapter.</p>
          </div>

          <p className="footer-note">
            FinSight provides financial education and comparison tools.
            It does not provide individualized financial advice.
          </p>

          <span className="footer-copy">
            © {new Date().getFullYear()} FinSight
          </span>
        </div>
      </footer>
    </div>
  );
}