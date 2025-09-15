// src/components/DetailPanel.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const COLORS = ["#22C55E", "#EF4444", "#EAB308"]; // green, red, yellow

const DetailPanel = ({ employee }) => {
  if (!employee) return null;

  // Dummy attendance stats
  const attendanceData = [
    { name: "Present", value: 20 },
    { name: "Absent", value: 5 },
    { name: "Leave", value: 3 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto animate-[fadeIn_0.6s_ease]">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {employee.name} - Details
      </h1>

      {/* Profile Info */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
        <p className="text-gray-700">
          <strong>Employee ID:</strong> {employee.id}
        </p>
        <p className="text-gray-700">
          <strong>Position:</strong> {employee.position}
        </p>
        <p className="text-gray-700">
          <strong>Company:</strong> {employee.company}
        </p>
        <p className="text-gray-700">
          <strong>Joining Date:</strong> {employee.joiningDate}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong> {employee.status}
        </p>
      </div>

      {/* Attendance Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Attendance Calendar
          </h2>
          <Calendar className="rounded-xl border border-gray-200 shadow-sm" />
        </div>

        {/* Pie Chart */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Attendance Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
