"use client"
import { useState } from "react";
import ReportsComponent, { METRICS_CONFIG } from "./components/ReportsComponent";
import AnalyticsComponent from "./components/AnalyticsComponent";
import ReviewComponent from "./components/ReviewComponent";

// =====================
// Main Component
// =====================
type TabType = "reports" | "analytics" | "review";

export default function HubReports() {
  const allMetricNames = Object.values(METRICS_CONFIG).flatMap((g) => g.items);
  
  const [activeTab, setActiveTab] = useState<TabType>("reports");
  const [selectedMetrics, setSelectedMetrics] = useState(new Set(allMetricNames.slice(0, 8)));
  const [showSelector, setShowSelector] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: "reports", label: "Reports" },
    { id: "analytics", label: "Analytics" },
    { id: "review", label: "Review" }
  ];

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

          {/* Tab Navigation Chips */}
          <div className="flex items-center gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border border-blue-500"
                    : "bg-[#1a1f26] border border-gray-700 text-gray-300 hover:bg-[#232933]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Container */}
          <div>
            {activeTab === "reports" && (
              <ReportsComponent 
                selectedMetrics={selectedMetrics}
                setShowSelector={setShowSelector}
              />
            )}
            {activeTab === "analytics" && <AnalyticsComponent />}
            {activeTab === "review" && <ReviewComponent />}
          </div>
        </main>
      </div>

      {/* Metric Selector Drawer */}
      {showSelector && (
        <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
          <div className="w-105 bg-[#0b0f14] h-full p-6 overflow-y-auto">
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
                  {group.items.map((item) => {
                    const toggleMetric = (metric: string) => {
                      const copy = new Set(selectedMetrics);
                      if (copy.has(metric)) copy.delete(metric);
                      else copy.add(metric);
                      setSelectedMetrics(copy);
                    };
                    return (
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
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
