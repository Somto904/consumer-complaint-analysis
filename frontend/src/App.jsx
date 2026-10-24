import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import SiteLayout from "./components/SiteLayout";
import Welcome from "./pages/Welcome";
import SectionPage, { Dashboard } from "./pages/SectionPage";

const VISITED_KEY = "finsight:visited";
const LAST_PAGE_KEY = "finsight:last-page";

function EntryRoute() {
  const visited = localStorage.getItem(VISITED_KEY) === "true";

  if (!visited) {
    return <Welcome />;
  }

  const lastPage = localStorage.getItem(LAST_PAGE_KEY);

  const allowedPages = [
    "/app",
    "/compare",
    "/find-my-bank",
    "/learn",
    "/credit-guide",
    "/insights",
    "/tools",
  ];

  const destination = allowedPages.includes(lastPage)
    ? lastPage
    : "/app";

  return <Navigate to={destination} replace />;
}

function RememberPage() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path !== "/") {
      localStorage.setItem(LAST_PAGE_KEY, path);
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RememberPage />

      <Routes>
        <Route path="/" element={<EntryRoute />} />

        <Route element={<SiteLayout />}>
          <Route path="/app" element={<Dashboard />} />

          <Route
            path="/compare"
            element={
              <SectionPage
                section="compare"
                title="Compare bank accounts"
                description="Find banking options that fit your needs, not just the most popular name."
              />
            }
          />

          <Route
            path="/find-my-bank"
            element={
              <SectionPage
                section="finder"
                title="Find your banking fit"
                description="Answer a few questions about your needs and discover accounts worth considering."
              />
            }
          />

          <Route
            path="/learn"
            element={
              <SectionPage
                section="learn"
                title="Learn finance"
                description="Understand everyday money decisions, one topic at a time."
              />
            }
          />

          <Route
            path="/credit-guide"
            element={
              <SectionPage
                section="credit"
                title="Build your credit knowledge"
                description="Learn how credit works before making important financial decisions."
              />
            }
          />

          <Route
            path="/insights"
            element={
              <SectionPage
                section="insights"
                title="Consumer insights"
                description="Explore trends in real consumer financial complaint data."
              />
            }
          />

          <Route
            path="/tools"
            element={
              <SectionPage
                section="tools"
                title="Money tools"
                description="Understand interest, payment costs, and savings calculations."
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}