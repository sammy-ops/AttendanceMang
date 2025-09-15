import React, { useState } from "react";

// Dummy attendance data
const monthlyAttendance = [
  { date: "2025-09-01", status: "Present", checkIn: "09:05 AM", checkOut: "06:10 PM", hours: 8.1 },
  { date: "2025-09-02", status: "Absent" },
  { date: "2025-09-03", status: "Present", checkIn: "09:10 AM", checkOut: "06:00 PM", hours: 7.8 },
  { date: "2025-09-04", status: "Leave", note: "Medical Leave" },
  { date: "2025-09-05", status: "Present", checkIn: "09:00 AM", checkOut: "06:05 PM", hours: 8.1 },
  { date: "2025-09-06", status: "Present", checkIn: "09:15 AM", checkOut: "06:20 PM", hours: 7.9 },
  { date: "2025-09-07", status: "Present", checkIn: "09:05 AM", checkOut: "06:00 PM", hours: 8 },
  // Add rest of month...
];

const statusColor = {
  Present: "bg-green-400",
  Absent: "bg-red-400",
  Leave: "bg-yellow-400",
};

const EmployeeAttendancePanel = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Attendance Panel</h1>

      {/* Calendar */}
      <div className="w-full bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Attendance</h2>
        <div className="grid grid-cols-7 gap-3">
          {monthlyAttendance.map((day) => (
            <div key={day.date} className="flex flex-col items-center">
              <div
                title={`${day.date}: ${day.status}`}
                className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition transform hover:scale-110 ${
                  statusColor[day.status]
                } ${selectedDate === day.date ? "ring-4 ring-indigo-400" : ""}`}
                onClick={() => setSelectedDate(selectedDate === day.date ? null : day.date)}
              >
                {parseInt(day.date.split("-")[2])}
              </div>

              {/* Expanded detail row */}
              {selectedDate === day.date && (
                <div className="mt-2 p-2 bg-white/40 backdrop-blur-md rounded-xl shadow-md w-40 text-center text-gray-800 text-sm">
                  <p><strong>Status:</strong> {day.status}</p>
                  {day.status === "Present" && (
                    <>
                      <p><strong>Check-in:</strong> {day.checkIn}</p>
                      <p><strong>Check-out:</strong> {day.checkOut}</p>
                      <p><strong>Total Hours:</strong> {day.hours}</p>
                    </>
                  )}
                  {day.status === "Leave" && <p><strong>Note:</strong> {day.note}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
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
    </div>
  );
};

export default EmployeeAttendancePanel;
