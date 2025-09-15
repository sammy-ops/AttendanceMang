import React, { useEffect, useState } from "react";

const AdminDashboardPanel = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample recent activities
  const recentActivities = [
    "HR John approved leave for Employee Sarah",
    "New Employee Michael joined Sales",
    "Company ABC updated profile",
    "HR Anna added new Employee",
    "Employee David requested leave",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Admin Overview</h1>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-purple-200/60 to-purple-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-gray-700 mt-1 font-medium">Companies</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-pink-200/60 to-pink-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-gray-700 mt-1 font-medium">HRs</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-200/60 to-blue-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">150</p>
          <p className="text-gray-700 mt-1 font-medium">Employees</p>
        </div>
      </div>

      {/* Middle Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-green-200/60 to-green-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">10</p>
          <p className="text-gray-700 mt-1 font-medium">Active HRs</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-yellow-200/60 to-yellow-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">120</p>
          <p className="text-gray-700 mt-1 font-medium">Active Employees</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-200/60 to-red-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-gray-700 mt-1 font-medium">Pending Leave Requests</p>
        </div>
      </div>

      {/* Bottom Row: New Joiners & Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-200/60 to-indigo-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-gray-700 mt-1 font-medium">New Joiners This Month</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-teal-200/60 to-teal-400/40 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-gray-900">4</p>
          <p className="text-gray-700 mt-1 font-medium">Departments</p>
        </div>
      </div>

      {/* Date & Time Card */}
      <div className="p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg text-center max-w-xs mx-auto">
        <p className="text-2xl font-semibold text-gray-800">
          {dateTime.toLocaleDateString()}
        </p>
        <p className="text-xl text-gray-600 mt-2">
          {dateTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Recent Activities */}
      <div className="p-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Activities</h3>
        <ul className="text-gray-700 space-y-2 max-h-40 overflow-y-auto">
          {recentActivities.map((activity, idx) => (
            <li
              key={idx}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardPanel;
