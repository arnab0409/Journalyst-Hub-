"use client"

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { day: 'Mon', profit: 1200, loss: 400, trades: 12 },
  { day: 'Tue', profit: 1900, loss: 300, trades: 18 },
  { day: 'Wed', profit: 1500, loss: 600, trades: 14 },
  { day: 'Thu', profit: 2200, loss: 200, trades: 20 },
  { day: 'Fri', profit: 1800, loss: 500, trades: 16 },
  { day: 'Sat', profit: 1400, loss: 700, trades: 10 },
  { day: 'Sun', profit: 2100, loss: 400, trades: 19 },
];

const equityCurveData = [
  { date: 'Jan 1', value: 100000 },
  { date: 'Jan 5', value: 105200 },
  { date: 'Jan 10', value: 108900 },
  { date: 'Jan 15', value: 103400 },
  { date: 'Jan 20', value: 112500 },
];

const symbolData = [
  { name: 'AAPL', value: 2450, fill: '#10b981' },
  { name: 'MSFT', value: 1890, fill: '#3b82f6' },
  { name: 'GOOGL', value: 3120, fill: '#f59e0b' },
  { name: 'TSLA', value: 540, fill: '#ef4444' },
];

const winLossData = [
  { name: 'Wins', value: 65, fill: '#10b981' },
  { name: 'Losses', value: 28, fill: '#ef4444' },
  { name: 'Breakeven', value: 7, fill: '#6b7280' },
];

export default function AnalyticsComponent() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Win Rate</p>
          <p className="text-2xl font-semibold text-blue-400">65.4%</p>
          <p className="text-xs text-green-400 mt-2">+2.3% vs last week</p>
        </div>

        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Avg Trade Duration</p>
          <p className="text-2xl font-semibold text-purple-400">2h 34m</p>
          <p className="text-xs text-yellow-400 mt-2">Moderate holding time</p>
        </div>

        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Sharpe Ratio</p>
          <p className="text-2xl font-semibold text-green-400">1.85</p>
          <p className="text-xs text-green-400 mt-2">Good risk-adjusted returns</p>
        </div>

        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Max Drawdown</p>
          <p className="text-2xl font-semibold text-red-400">-12.5%</p>
          <p className="text-xs text-red-400 mt-2">Within acceptable range</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve Chart */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={equityCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c222b" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#11161d', border: '1px solid #1c222b' }}
                labelStyle={{ color: '#d1d5db' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Performance Chart */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Daily P&L</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c222b" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#11161d', border: '1px solid #1c222b' }}
                labelStyle={{ color: '#d1d5db' }}
              />
              <Legend />
              <Bar dataKey="profit" stackId="a" fill="#10b981" />
              <Bar dataKey="loss" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Win/Loss Distribution */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Win/Loss Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#11161d', border: '1px solid #1c222b' }}
                labelStyle={{ color: '#d1d5db' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* P&L by Symbol */}
        <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">P&L by Symbol</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={symbolData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1c222b" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#11161d', border: '1px solid #1c222b' }}
                labelStyle={{ color: '#d1d5db' }}
              />
              <Bar dataKey="value" fill="#3b82f6">
                {symbolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-[#0f141b] border border-[#1c222b] rounded-xl p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Performance by Instrument</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1c222b]">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Symbol</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">P&L</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">Win Rate</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">Trades</th>
            </tr>
          </thead>
          <tbody>
            {[
              { symbol: "AAPL", pl: "$2,450", wr: "68%", trades: 45 },
              { symbol: "MSFT", pl: "$1,890", wr: "62%", trades: 38 },
              { symbol: "GOOGL", pl: "$3,120", wr: "71%", trades: 52 },
              { symbol: "TESLA", pl: "-$540", wr: "45%", trades: 28 },
            ].map((row) => (
              <tr key={row.symbol} className="border-b border-[#1c222b] hover:bg-[#11161d]">
                <td className="py-3 px-4">{row.symbol}</td>
                <td className={`text-right py-3 px-4 ${row.pl.startsWith("-") ? "text-red-400" : "text-green-400"}`}>
                  {row.pl}
                </td>
                <td className="text-right py-3 px-4">{row.wr}</td>
                <td className="text-right py-3 px-4">{row.trades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
