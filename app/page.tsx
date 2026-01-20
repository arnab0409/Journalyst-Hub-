"use client"
import { useState } from "react";

// =====================
// Metrics JSON (Editable)
// =====================
export const METRICS_CONFIG = {
  corePerformance: {
    title: "Core Performance Metrics",
    color: "green",
    items: [
      "Total P&L",
      "Net P&L",
      "Gross Profit",
      "Gross Loss",
      "Average Trade P&L",
      "Median Trade P&L",
      "Best Trade P&L",
      "Worst Trade P&L",
      "Total Return (%)",
      "ROI (%)",
      "Annualized Return",
      "Monthly Return",
      "Daily Return",
      "Compounded Return",
      "Equity Growth (%)"
    ]
  },

  winLoss: {
    title: "Win / Loss & Accuracy",
    color: "blue",
    items: [
      "Total Trades",
      "Winning Trades Count",
      "Losing Trades Count",
      "Break-even Trades Count",
      "Win Rate (%)",
      "Loss Rate (%)",
      "Win/Loss Ratio",
      "Average Win",
      "Average Loss",
      "Largest Win",
      "Largest Loss",
      "Smallest Win",
      "Smallest Loss",
      "Consecutive Wins (Max)",
      "Consecutive Losses (Max)",
      "Profit Factor",
      "Expectancy"
    ]
  },

  riskDrawdown: {
    title: "Risk & Drawdown",
    color: "purple",
    items: [
      "Maximum Drawdown (Absolute)",
      "Maximum Drawdown (%)",
      "Current Drawdown",
      "Average Drawdown",
      "Drawdown Duration (Max)",
      "Time to Recovery",
      "Risk per Trade (%)",
      "Average Risk per Trade",
      "R-Multiple (Average)",
      "Best R-Multiple",
      "Worst R-Multiple",
      "Volatility of Returns",
      "Standard Deviation of Returns",
      "Downside Deviation",
      "Ulcer Index"
    ]
  },

  efficiency: {
    title: "Efficiency & Quality",
    color: "yellow",
    items: [
      "Sharpe Ratio",
      "Sortino Ratio",
      "Calmar Ratio",
      "Recovery Factor",
      "Payoff Ratio",
      "Trade Efficiency (%)",
      "Risk-Adjusted Return",
      "Profit per Day",
      "Profit per Trade",
      "Return on Margin",
      "Capital Utilization (%)",
      "Holding Period Return",
      "Slippage Impact",
      "Fee Impact on P&L",
      "Net vs Gross Ratio"
    ]
  },

  timeBased: {
    title: "Time-Based Metrics",
    color: "orange",
    items: [
      "Trades per Day",
      "Trades per Week",
      "Trades per Month",
      "P&L by Day",
      "P&L by Week",
      "P&L by Month",
      "Best Day P&L",
      "Worst Day P&L",
      "Best Month P&L",
      "Worst Month P&L",
      "Average Holding Time",
      "Longest Holding Time",
      "Shortest Holding Time",
      "P&L by Hour of Day",
      "P&L by Day of Week"
    ]
  },

  instrumentMarket: {
    title: "Instrument & Market",
    color: "brown",
    items: [
      "P&L by Symbol",
      "Trades by Symbol",
      "Win Rate by Symbol",
      "Best Symbol",
      "Worst Symbol",
      "P&L by Asset Class",
      "P&L by Market",
      "Volume Traded",
      "Turnover",
      "Average Trade Size",
      "Largest Trade Size",
      "Leverage Used (Avg)",
      "Margin Usage",
      "Fee per Symbol",
      "Avg Commission Per Trade",
      "Total Commission"
    ]
  },

  costExecution: {
    title: "Cost & Execution",
    color: "gray",
    items: [
      "Total Fees Paid",
      "Fees as % of P&L",
      "Average Fee per Trade",
      "Slippage per Trade",
      "Market vs Limit Fill Rate",
      "Partial Fill Rate",
      "Order Rejection Rate",
      "Cancelled Orders Count",
      "Net Execution Quality"
    ]
  }
};

// =====================
// Mock Values Generator
// =====================
const mockValue = (name:string) => {
  if (name.includes("%")) return `${(Math.random() * 20).toFixed(2)} %`;
  if (name.toLowerCase().includes("rate")) return `${(Math.random() * 100).toFixed(2)} %`;
  return (Math.random() * 10000 - 2000).toFixed(2);
};

// =====================
// Main Component
// =====================
export default function HubReports() {
  const allMetricNames = Object.values(METRICS_CONFIG).flatMap((g) => g.items);

  const [selectedMetrics, setSelectedMetrics] = useState(new Set(allMetricNames.slice(0, 8)));
  const [showSelector, setShowSelector] = useState(false);

  const toggleMetric = (metric:string) => {
    const copy = new Set(selectedMetrics);
    if (copy.has(metric)) copy.delete(metric);
    else copy.add(metric);
    setSelectedMetrics(copy);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-gray-200">
      {/* Sidebar + Top Nav Wrapper */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 bg-[#05070a] min-h-screen flex flex-col items-center py-4 gap-6">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">J</div>
          <div className="w-6 h-6 bg-gray-700 rounded" />
          <div className="w-6 h-6 bg-gray-700 rounded" />
          <div className="w-6 h-6 bg-gray-700 rounded" />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-8 py-6">
          {/* Top Navbar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Analytics Hub</h1>
              <p className="text-sm text-gray-400">Reports • Metrics Overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700" />
              <div className="w-8 h-8 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Chips Bar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowSelector(true)}
              className="px-4 py-1.5 rounded-full bg-[#1a1f26] border border-gray-700 text-sm hover:bg-[#232933]"
            >
              + Customize Metrics
            </button>

            {[...selectedMetrics].slice(0, 6).map((m) => (
              <span
                key={m}
                className="px-3 py-1 rounded-full bg-[#11161d] border border-gray-800 text-xs text-gray-300"
              >
                {m}
              </span>
            ))}

            {selectedMetrics.size > 6 && (
              <span className="text-xs text-gray-400">+{selectedMetrics.size - 6} more</span>
            )}
          </div>

          {/* Reports Grid (No Charts, Only Values) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...selectedMetrics].map((metric) => (
              <div
                key={metric}
                className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-4 hover:border-gray-600 transition"
              >
                <p className="text-sm text-gray-400 mb-2">{metric}</p>
                <p className="text-xl font-semibold text-green-400">{mockValue(metric)}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Metric Selector Drawer */}
      {showSelector && (
        <div className="fixed inset-0 bg-black/60 flex justify-end">
          <div className="w-[420px] bg-[#0b0f14] h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Select Metrics</h2>
              <button
                onClick={() => setShowSelector(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {Object.entries(METRICS_CONFIG).map(([key, group]) => (
              <div key={key} className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-xs text-gray-400 bg-[#11161d] border border-[#1c222b] rounded-md px-2 py-1.5 cursor-pointer hover:border-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.has(item)}
                        onChange={() => toggleMetric(item)}
                        className="accent-green-500"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
