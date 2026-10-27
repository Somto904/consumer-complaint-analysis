
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import ReactECharts from "echarts-for-react";
import {
  ArrowLeft,
  Database,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import "./ConsumerInsights.css";

const API = "/api";

const endpoints = {
  summary: `${API}/dashboard/summary`,
  products: `${API}/complaints/by-product`,
  years: `${API}/complaints/by-year`,
  companies: `${API}/complaints/top-companies`,
};

const number = (value) =>
  new Intl.NumberFormat("en-US").format(value ?? 0);

function objectToEntries(data) {
  return Object.entries(data ?? {})
    .filter(([, count]) => Number.isFinite(Number(count)))
    .map(([name, count]) => ({
      name,
      value: Number(count),
    }));
}

function shorten(text, length = 28) {
  return text.length > length
    ? `${text.slice(0, length - 1)}…`
    : text;
}

async function getJSON(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

const tooltipStyle = {
  backgroundColor: "#183b32",
  borderWidth: 0,
  textStyle: { color: "#ffffff" },
  extraCssText: "border-radius: 12px;",
};

function StatCard({ label, value, detail, accent }) {
  return (
    <article className={`ci-stat ci-stat--${accent}`}>
      <span className="ci-stat-label">{label}</span>
      <strong className="ci-stat-value">{value}</strong>
      <span className="ci-stat-detail">{detail}</span>
    </article>
  );
}

export default function ConsumerInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [summary, products, years, companies] =
        await Promise.all([
          getJSON(endpoints.summary),
          getJSON(endpoints.products),
          getJSON(endpoints.years),
          getJSON(endpoints.companies),
        ]);

      setData({ summary, products, years, companies });
    } catch (err) {
      setError(err.message || "Unable to load complaint data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const productEntries = useMemo(
    () =>
      objectToEntries(data?.products).sort(
        (a, b) => b.value - a.value
      ),
    [data]
  );

  const companyEntries = useMemo(
    () =>
      objectToEntries(data?.companies)
        .sort((a, b) => b.value - a.value)
        .slice(0, 8),
    [data]
  );

  const yearEntries = useMemo(
    () =>
      objectToEntries(data?.years).sort(
        (a, b) => Number(a.name) - Number(b.name)
      ),
    [data]
  );

  const productOptions = useMemo(
    () => ({
      color: [
        "#26866a",
        "#438fdf",
        "#efb44b",
        "#b18bea",
        "#e88ca5",
        "#79c9bd",
        "#758ec6",
        "#bdac71",
        "#9fbe97",
        "#df9872",
        "#a5a5b9",
      ],
      tooltip: {
        trigger: "item",
        backgroundColor: tooltipStyle.backgroundColor,
        borderWidth: 0,
        textStyle: tooltipStyle.textStyle,
        formatter: (params) =>
          `${params.name}<br/><b>${number(params.value)} complaints</b> (${params.percent}%)`,
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: "Complaints by product",
          type: "pie",
          radius: ["48%", "75%"],
          center: ["50%", "50%"],
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 3,
            borderRadius: 7,
          },
          label: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 7,
          },
          data: productEntries,
        },
      ],
    }),
    [productEntries]
  );

  const companyOptions = useMemo(() => {
    const reversed = [...companyEntries].reverse();

    return {
      color: ["#328d73"],
      grid: {
        left: 10,
        right: 70,
        top: 10,
        bottom: 12,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        ...tooltipStyle,
        formatter: (params) => {
          const item = params[0];
          return `${reversed[item.dataIndex].name}<br/><b>${number(item.value)} complaints</b>`;
        },
      },
      xAxis: {
        type: "value",
        axisLabel: { color: "#87978d" },
        splitLine: {
          lineStyle: { color: "#edf1ed" },
        },
      },
      yAxis: {
        type: "category",
        data: reversed.map((item) =>
          shorten(item.name, 23)
        ),
        axisLabel: {
          color: "#43594e",
          width: 165,
          overflow: "truncate",
          fontSize: 11,
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: "bar",
          data: reversed.map((item) => item.value),
          barWidth: 15,
          itemStyle: {
            borderRadius: [0, 7, 7, 0],
          },
          label: {
            show: true,
            position: "right",
            color: "#345c48",
            formatter: ({ value }) => number(value),
          },
        },
      ],
    };
  }, [companyEntries]);

  const yearOptions = useMemo(
    () => ({
      color: ["#548fd5"],
      grid: {
        top: 30,
        right: 25,
        bottom: 30,
        left: 15,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        ...tooltipStyle,
      },
      xAxis: {
        type: "category",
        data: yearEntries.map((entry) => entry.name),
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: "#dce6de" },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: { color: "#edf1ed" },
        },
      },
      series: [
        {
          name: "Complaints",
          type: "bar",
          barMaxWidth: 85,
          data: yearEntries.map((entry) => entry.value),
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
          },
          label: {
            show: true,
            position: "top",
            formatter: ({ value }) => number(value),
          },
        },
      ],
    }),
    [yearEntries]
  );

  return (
    <div className="ci-page">
      <div className="container ci-container">
        <Link to="/app" className="ci-back">
          <ArrowLeft size={17} />
          Back to overview
        </Link>

        <header className="ci-heading">
          <div>
            <span className="ci-eyebrow">
              FINSIGHT / CONSUMER INSIGHTS
            </span>
            <h1>Explore the data behind the decisions.</h1>
            <p>
              A closer look at public consumer financial
              complaints, powered by real CFPB records.
            </p>
          </div>

          <button
            className="ci-refresh"
            onClick={loadData}
            disabled={loading}
            type="button"
          >
            <RefreshCw
              size={16}
              className={loading ? "ci-spin" : ""}
            />
            Refresh data
          </button>
        </header>

        <div className="ci-source-note">
          <Database size={18} />
          <span>
            Showing an imported CFPB complaint sample,
            not all complaints nationwide. These results
            should not be interpreted as bank rankings.
          </span>
        </div>

        {loading && !data && (
          <div className="ci-message">
            Loading complaint statistics from FinSight...
          </div>
        )}

        {error && (
          <div className="ci-error" role="alert">
            <AlertCircle size={21} />
            <div>
              <strong>Couldn't connect to the backend.</strong>
              <p>
                The analytics API may be offline. If you're
                testing locally, make sure Spring Boot is
                running on port 8080.
              </p>
              <small>{error}</small>
            </div>
          </div>
        )}

        {data && (
          <>
            <section className="ci-stats">
              <StatCard
                label="Complaint records"
                value={number(data.summary.totalComplaints)}
                detail="Records in the local dataset"
                accent="green"
              />

              <StatCard
                label="Timely responses"
                value={`${Number(
                  data.summary.timelyResponseRate ?? 0
                ).toFixed(2)}%`}
                detail="Reported timely response rate"
                accent="blue"
              />

              <StatCard
                label="Product categories"
                value={number(productEntries.length)}
                detail="Categories represented in the sample"
                accent="purple"
              />
            </section>

            <section className="ci-charts">
              <article className="ci-panel">
                <div className="ci-panel-heading">
                  <span className="ci-panel-tag">PRODUCTS</span>
                  <h2>Where complaints are concentrated</h2>
                  <p>
                    Hover over each segment to see the
                    number of complaints.
                  </p>
                </div>

                <ReactECharts
                  option={productOptions}
                  notMerge
                  lazyUpdate
                  style={{ height: 310, width: "100%" }}
                />
                <div className="ci-chart-foot">
                  {productEntries.length} product categories
                  in this imported sample
                </div>
              </article>

              <article className="ci-panel">
                <div className="ci-panel-heading">
                  <span className="ci-panel-tag">COMPANIES</span>
                  <h2>Companies with the most records</h2>
                  <p>
                    Top eight companies by complaint count
                    in this sample.
                  </p>
                </div>

                <ReactECharts
                  option={companyOptions}
                  notMerge
                  lazyUpdate
                  style={{ height: 340, width: "100%" }}
                />
              </article>

              <article className="ci-panel ci-panel--wide">
                <div className="ci-panel-heading">
                  <span className="ci-panel-tag">TIME</span>
                  <h2>Complaints by year</h2>
                  <p>
                    Distribution of records currently stored
                    in the database.
                  </p>
                </div>

                <ReactECharts
                  option={yearOptions}
                  notMerge
                  lazyUpdate
                  style={{ height: 245, width: "100%" }}
                />

                {yearEntries.length === 1 && (
                  <div className="ci-chart-foot">
                    Only {yearEntries[0].name} is represented
                    in this sample. More years are needed
                    to analyze trends over time.
                  </div>
                )}
              </article>
            </section>

            <section className="ci-highlights">
              <h2>What stands out in this dataset?</h2>

              <div className="ci-highlight-grid">
                <article>
                  <TrendingUp size={22} />
                  <span>Most represented company</span>
                  <strong>{data.summary.topCompany}</strong>
                </article>

                <article>
                  <Database size={22} />
                  <span>Most represented product</span>
                  <strong>{data.summary.topProduct}</strong>
                </article>

                <article>
                  <ShieldCheck size={22} />
                  <span>Most reported issue</span>
                  <strong>{data.summary.topIssue}</strong>
                </article>
              </div>
            </section>

            <p className="ci-disclaimer">
              Source: CFPB Consumer Complaint Database,
              imported into FinSight. Complaints are not
              independently verified by FinSight. Complaint
              counts alone do not measure an institution's
              overall quality or customer satisfaction.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
