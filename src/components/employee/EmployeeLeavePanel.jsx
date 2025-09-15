import React, { useState } from "react";
import RequestLeavePanel from "./RequestLeavePanel"; // new component

// Initial leave data
const initialLeaveData = [
  { id: 1, from: "2025-09-05", to: "2025-09-05", type: "Sick Leave", status: "Approved", reason: "Fever" },
  { id: 2, from: "2025-09-10", to: "2025-09-11", type: "Casual Leave", status: "Pending", reason: "Personal work" },
  { id: 3, from: "2025-09-15", to: "2025-09-15", type: "Sick Leave", status: "Rejected", reason: "Incomplete application" },
  { id: 4, from: "2025-09-20", to: "2025-09-22", type: "Vacation", status: "Approved", reason: "Family trip" },
];

const statusColor = {
  Approved: "bg-green-400",
  Pending: "bg-yellow-400",
  Rejected: "bg-red-400",
};

const EmployeeLeavePanel = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [leaveData, setLeaveData] = useState(initialLeaveData); // use state to allow updates

  // Delete a pending leave
  const handleDelete = (id) => {
    setLeaveData((prev) => prev.filter((leave) => leave.id !== id));
  };

  // Summary counts
  const totalLeaves = leaveData.length;
  const approved = leaveData.filter((l) => l.status === "Approved").length;
  const pending = leaveData.filter((l) => l.status === "Pending").length;
  const rejected = leaveData.filter((l) => l.status === "Rejected").length;

  if (showRequestForm) {
    return (
      <RequestLeavePanel
        setShowRequestForm={setShowRequestForm}
        leaveData={leaveData}
        setLeaveData={setLeaveData}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-6 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Leave Panel</h1>

      <button
        onClick={() => setShowRequestForm(true)}
        className="self-end mb-4 px-4 py-2 rounded-2xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
      >
        Apply for Leave
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        {[
          { label: "Total Leaves", value: totalLeaves, gradient: "from-purple-200/50 to-purple-400/40" },
          { label: "Approved", value: approved, gradient: "from-green-200/50 to-green-400/40" },
          { label: "Pending", value: pending, gradient: "from-yellow-200/50 to-yellow-400/40" },
          { label: "Rejected", value: rejected, gradient: "from-red-200/50 to-red-400/40" },
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

      {/* Leave Table */}
      <div className="w-full bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-white/40">
                <th className="px-4 py-2 text-gray-800 font-semibold">From</th>
                <th className="px-4 py-2 text-gray-800 font-semibold">To</th>
                <th className="px-4 py-2 text-gray-800 font-semibold">Type</th>
                <th className="px-4 py-2 text-gray-800 font-semibold">Status</th>
                <th className="px-4 py-2 text-gray-800 font-semibold">Reason</th>
                <th className="px-4 py-2 text-gray-800 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave) => (
                <tr key={leave.id} className="hover:bg-white/40 transition cursor-pointer rounded-xl">
                  <td className="px-4 py-2">{leave.from}</td>
                  <td className="px-4 py-2">{leave.to}</td>
                  <td className="px-4 py-2">{leave.type}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-xl text-white font-semibold ${statusColor[leave.status]}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{leave.reason}</td>
                  <td className="px-4 py-2">
                    {leave.status === "Pending" && (
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="px-3 py-1 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeavePanel;
