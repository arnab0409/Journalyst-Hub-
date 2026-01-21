"use client"

export default function ReviewComponent() {
  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Trade Review Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-2">Total Trades Reviewed</p>
            <p className="text-3xl font-semibold text-blue-400">324</p>
            <p className="text-xs text-gray-400 mt-2">Last 30 days</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Average Trade Quality Score</p>
            <p className="text-3xl font-semibold text-green-400">7.8/10</p>
            <p className="text-xs text-green-400 mt-2">+0.5 improvement this month</p>
          </div>
        </div>
      </div>

      {/* Key Issues & Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Common Issues</h3>
          <div className="space-y-3">
            {[
              { issue: "Entered too early", count: 24, severity: "high" },
              { issue: "Held too long", count: 18, severity: "medium" },
              { issue: "Missed profit targets", count: 15, severity: "medium" },
              { issue: "Poor position sizing", count: 12, severity: "low" },
            ].map((item) => (
              <div key={item.issue} className="flex items-center justify-between p-2 bg-[#11161d] rounded">
                <span className="text-sm">{item.issue}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.severity === "high" ? "bg-red-500/20 text-red-400" :
                    item.severity === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Improvement Areas</h3>
          <div className="space-y-3">
            {[
              { area: "Entry Precision", current: 65, target: 85 },
              { area: "Risk Management", current: 72, target: 90 },
              { area: "Trade Duration", current: 58, target: 75 },
              { area: "Profit Realization", current: 81, target: 95 },
            ].map((item) => (
              <div key={item.area}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300">{item.area}</span>
                  <span className="text-xs text-gray-400">{item.current}% → {item.target}%</span>
                </div>
                <div className="w-full bg-[#11161d] rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trade Reviews */}
      <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Trade Reviews</h3>
        <div className="space-y-3">
          {[
            { date: "Jan 21, 2024", symbol: "AAPL", verdict: "Good", comment: "Excellent entry point with proper risk/reward" },
            { date: "Jan 20, 2024", symbol: "MSFT", verdict: "Needs Improvement", comment: "Held too long, missed exit signal" },
            { date: "Jan 19, 2024", symbol: "GOOGL", verdict: "Excellent", comment: "Perfect execution on all parameters" },
            { date: "Jan 18, 2024", symbol: "TSLA", verdict: "Poor", comment: "Entered without confirmation, cut losses early" },
          ].map((review, idx) => (
            <div key={idx} className="border-b border-[#1c222b] pb-3 last:border-0">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-medium text-sm">{review.symbol} Trade</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.verdict === "Good" ? "bg-green-500/20 text-green-400" :
                  review.verdict === "Excellent" ? "bg-blue-500/20 text-blue-400" :
                  review.verdict === "Needs Improvement" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {review.verdict}
                </span>
              </div>
              <p className="text-sm text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
