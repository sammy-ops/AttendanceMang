import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data
const weeklyData = [
  { day: "Mon", Present: 90, Absent: 20, Leave: 5 },
  { day: "Tue", Present: 95, Absent: 18, Leave: 7 },
  { day: "Wed", Present: 92, Absent: 25, Leave: 6 },
  { day: "Thu", Present: 97, Absent: 15, Leave: 3 },
  { day: "Fri", Present: 94, Absent: 19, Leave: 4 },
  { day: "Sat", Present: 0, Absent: 0, Leave: 0 },
  { day: "Sun", Present: 0, Absent: 0, Leave: 0 },
];

const monthlyData = [
  { date: "2025-09-06", Present: 88, Absent: 15, Leave: 7 },
  { date: "2025-09-07", Present: 90, Absent: 18, Leave: 6 },
  { date: "2025-09-08", Present: 92, Absent: 20, Leave: 5 },
  { date: "2025-09-09", Present: 94, Absent: 17, Leave: 4 },
  { date: "2025-09-10", Present: 93, Absent: 19, Leave: 5 },
  { date: "2025-09-11", Present: 91, Absent: 16, Leave: 6 },
  { date: "2025-09-12", Present: 95, Absent: 14, Leave: 4 },
];

const holidays = [
  { date: "2025-09-20", name: "Ganesh Chaturthi" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-11-15", name: "Diwali" },
];

const DashboardPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [view, setView] = useState("weekly");
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const displayedMonthlyData = monthlyData.slice(scrollIndex, scrollIndex + 7);

  const cardBgColors = [
    "from-yellow-200/50 to-yellow-400/40",
    "from-green-200/50 to-green-400/40",
    "from-red-200/50 to-red-400/40",
    "from-purple-200/50 to-purple-400/40",
  ];

  const maxAttendance = Math.max(
    ...weeklyData.map((d) => d.Present + d.Absent + d.Leave),
    ...monthlyData.map((d) => d.Present + d.Absent + d.Leave)
  );
  const yAxisMax = Math.ceil(maxAttendance / 5) * 5;

  return (
    <div className="w-full max-w-6xl flex rounded-2xl flex-col items-center space-y-8 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        {["Total Employees", "Present", "Absent", "On Leave"].map(
          (label, idx) => (
            <div
              key={label}
              className={`bg-gradient-to-br ${cardBgColors[idx]} backdrop-blur-md p-6 rounded-2xl shadow-md flex flex-col items-center transform transition hover:scale-105`}
            >
              <h2 className="text-3xl font-bold text-gray-800">
                {label === "Total Employees"
                  ? 120
                  : label === "Present"
                  ? 95
                  : label === "Absent"
                  ? 20
                  : 5}
              </h2>
              <p className="mt-2 text-gray-700 font-medium">{label}</p>
            </div>
          )
        )}
      </div>

      {/* Current Date & Time */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 w-full text-center text-gray-800 shadow-md font-semibold">
        {currentTime.toLocaleString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>

      {/* Chart & Holidays */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Weekly / Monthly Toggle */}
          <div className="flex space-x-4 mb-4">
            {["weekly", "monthly"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-2xl font-semibold ${
                  view === v
                    ? "bg-gradient-to-br from-indigo-400 to-purple-400 text-white shadow-lg"
                    : "bg-white/30 text-gray-800 hover:bg-white/50"
                } transition`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* Attendance Chart */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {view === "weekly" ? "Weekly Attendance" : "Monthly Attendance"}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={view === "weekly" ? weeklyData : displayedMonthlyData}
                barCategoryGap={28}
              >
                <XAxis
                  dataKey={view === "weekly" ? "day" : "date"}
                  stroke="#555"
                  tick={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
                />
                <YAxis
                  stroke="#555"
                  tick={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
                  domain={[0, yAxisMax]}
                  tickCount={Math.ceil(yAxisMax / 5) + 1}
                />
                <Tooltip
                  cursor={false} // removes that border box on hover
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#333",
                    fontWeight: 500,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="Present"
                  fill="#3B82F6"
                  radius={[6, 6, 0, 0]}
                  barSize={16}
                />
                <Bar
                  dataKey="Absent"
                  fill="#F97316"
                  radius={[6, 6, 0, 0]}
                  barSize={16}
                />
                <Bar
                  dataKey="Leave"
                  fill="#9CA3AF"
                  radius={[6, 6, 0, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>

            {/* Monthly Scroll Buttons */}
            {view === "monthly" && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setScrollIndex((prev) => Math.max(prev - 1, 0))
                  }
                  className="px-4 py-2 bg-white/30 backdrop-blur-md rounded-2xl shadow hover:bg-white/50 text-gray-800 transition"
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setScrollIndex((prev) =>
                      Math.min(prev + 1, monthlyData.length - 7)
                    )
                  }
                  className="px-4 py-2 bg-white/30 backdrop-blur-md rounded-2xl shadow hover:bg-white/50 text-gray-800 transition"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="w-full md:w-64">
          <div className="bg-gradient-to-br from-pink-200/40 to-red-300/40 backdrop-blur-md rounded-2xl p-6 shadow-lg h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Upcoming Holidays
            </h2>
            <ul className="space-y-2 text-gray-800 font-medium">
              {holidays.map((h) => (
                <li
                  key={h.date}
                  className="flex justify-between bg-white/20 p-3 rounded-xl hover:bg-white/40 transition"
                >
                  <span>{h.name}</span>
                  <span>{h.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
