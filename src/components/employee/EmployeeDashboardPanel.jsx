import React, { useState, useEffect } from "react";

// Dummy monthly attendance data
const monthlyAttendance = [
  { date: "2025-09-01", status: "Present" },
  { date: "2025-09-02", status: "Absent" },
  { date: "2025-09-03", status: "Present" },
  { date: "2025-09-04", status: "Present" },
  { date: "2025-09-05", status: "Leave" },
  { date: "2025-09-06", status: "Present" },
  { date: "2025-09-07", status: "Present" },
  { date: "2025-09-08", status: "Present" },
  { date: "2025-09-09", status: "Absent" },
  { date: "2025-09-10", status: "Present" },
  { date: "2025-09-11", status: "Present" },
  { date: "2025-09-12", status: "Leave" },
  { date: "2025-09-13", status: "Present" },
  { date: "2025-09-14", status: "Present" },
  { date: "2025-09-15", status: "Absent" },
  { date: "2025-09-16", status: "Present" },
  { date: "2025-09-17", status: "Present" },
  { date: "2025-09-18", status: "Leave" },
  { date: "2025-09-19", status: "Present" },
  { date: "2025-09-20", status: "Present" },
  { date: "2025-09-21", status: "Absent" },
  { date: "2025-09-22", status: "Present" },
  { date: "2025-09-23", status: "Present" },
  { date: "2025-09-24", status: "Present" },
  { date: "2025-09-25", status: "Leave" },
  { date: "2025-09-26", status: "Present" },
  { date: "2025-09-27", status: "Present" },
  { date: "2025-09-28", status: "Present" },
  { date: "2025-09-29", status: "Absent" },
  { date: "2025-09-30", status: "Present" },
];

// Upcoming holidays / company events
const upcomingEvents = [
  { date: "2025-09-20", name: "Ganesh Chaturthi" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-11-15", name: "Diwali" },
];

// Color mapping
const statusColor = {
  Present: "bg-green-400",
  Absent: "bg-red-400",
  Leave: "bg-yellow-400",
};

const EmployeeDashboardPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col items-center space-y-8 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        {[
          {
            label: "Days Present",
            value: monthlyAttendance.filter((d) => d.status === "Present").length,
            gradient: "from-green-200/50 to-green-400/40",
          },
          {
            label: "Leaves Taken",
            value: monthlyAttendance.filter((d) => d.status === "Leave").length,
            gradient: "from-yellow-200/50 to-yellow-400/40",
          },
          {
            label: "Absent Days",
            value: monthlyAttendance.filter((d) => d.status === "Absent").length,
            gradient: "from-red-200/50 to-red-400/40",
          },
          {
            label: "Upcoming Holidays",
            value: upcomingEvents.length,
            gradient: "from-purple-200/50 to-purple-400/40",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.gradient} backdrop-blur-md p-6 rounded-2xl shadow-md flex flex-col items-center transform transition hover:scale-105`}
          >
            <h2 className="text-3xl font-bold text-gray-800">{card.value}</h2>
            <p className="mt-2 text-gray-700 font-medium">{card.label}</p>
          </div>
        ))}
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

      {/* Main Row: Calendar + Holidays */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Attendance Calendar */}
        <div className="flex-1 bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Attendance</h2>
          <div className="grid grid-cols-7 gap-3">
            {monthlyAttendance.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.status}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition transform hover:scale-110 ${statusColor[day.status]}`}
              >
                {parseInt(day.date.split("-")[2])}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-700 flex justify-around">
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-full bg-green-400"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-full bg-red-400"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
              <span>Leave</span>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays / Events */}
        <div className="w-full md:w-64">
          <div className="bg-gradient-to-br from-pink-200/40 to-red-300/40 backdrop-blur-md rounded-2xl p-6 shadow-lg h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Holidays</h2>
            <ul className="space-y-2 text-gray-800 font-medium">
              {upcomingEvents.map((event) => (
                <li
                  key={event.date}
                  className="flex justify-between bg-white/20 p-3 rounded-xl hover:bg-white/40 transition"
                >
                  <span>{event.name}</span>
                  <span>{event.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPanel;
