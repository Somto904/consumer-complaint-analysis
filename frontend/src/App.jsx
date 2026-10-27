
import ConsumerInsights from "./pages/ConsumerInsights";
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

const LAST_PAGE_KEY = "finsight:last-page";

function RememberPage() {
  const location = useLocation();

  useEffect(() => {
    // Save the last application section visited,
    // but never redirect visitors away from the homepage.
    if (location.pathname !== "/") {
      localStorage.setItem(
        LAST_PAGE_KEY,
        location.pathname
      );
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RememberPage />

      <Routes>
        {/* Always display Welcome at the homepage URL */}
        <Route path="/" element={<Welcome />} />

        {/* Main application */}
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
            element={<ConsumerInsights />}
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
