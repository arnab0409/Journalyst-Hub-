"use client"

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

const mockValue = (name: string) => {
  if (name.includes("%")) return `${(Math.random() * 20).toFixed(2)} %`;
  if (name.toLowerCase().includes("rate")) return `${(Math.random() * 100).toFixed(2)} %`;
  return (Math.random() * 10000 - 2000).toFixed(2);
};

interface ReportsComponentProps {
  selectedMetrics: Set<string>;
  setShowSelector: (show: boolean) => void;
}

interface MetricsTableProps {
  metrics: string[];
}

const MetricsTable = ({ metrics }: MetricsTableProps) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-[#1c222b]">
        <th className="text-left py-3 px-4 text-gray-300 font-medium">Metric</th>
        <th className="text-right py-3 px-4 text-gray-300 font-medium">Value</th>
      </tr>
    </thead>
    <tbody>
      {metrics.map((metric, idx) => (
        <tr 
          key={metric} 
          className={`border-b border-[#1c222b] hover:bg-[#11161d] transition ${
            idx % 2 === 0 ? 'bg-[#0f141b]' : 'bg-[#0a0d12]'
          }`}
        >
          <td className="py-3 px-4 text-gray-300">{metric}</td>
          <td className="py-3 px-4 text-right font-semibold text-green-400">
            {mockValue(metric)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function ReportsComponent({ 
  selectedMetrics, 
  setShowSelector 
}: ReportsComponentProps) {
  const allMetrics = Object.values(METRICS_CONFIG).flatMap((g) => g.items);
  const metricsToDisplay = selectedMetrics.size > 0 
    ? Array.from(selectedMetrics) 
    : allMetrics;
  
  const midpoint = Math.ceil(metricsToDisplay.length / 2);
  const topTableMetrics = metricsToDisplay.slice(0, midpoint);
  const bottomTableMetrics = metricsToDisplay.slice(midpoint);

  return (
    <div className="space-y-6">
      {/* Customize Metrics Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowSelector(true)}
          className="px-4 py-1.5 rounded-full bg-[#1a1f26] border border-gray-700 text-sm hover:bg-[#232933]"
        >
          + Customize Metrics
        </button>
      </div>

      {/* Two Tables Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Table */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <MetricsTable metrics={topTableMetrics} />
          </div>
        </div>

        {/* Right Table */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <MetricsTable metrics={bottomTableMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
