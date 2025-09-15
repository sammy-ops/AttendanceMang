import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    name: "Alice Johnson",
    reason: "Medical Leave",
    from: "2025-09-15",
    to: "2025-09-18",
    status: "pending",
  },
  {
    id: 2,
    name: "Bob Smith",
    reason: "Vacation",
    from: "2025-09-20",
    to: "2025-09-25",
    status: "pending",
  },
  {
    id: 3,
    name: "Charlie Brown",
    reason: "Family Emergency",
    from: "2025-09-22",
    to: "2025-09-24",
    status: "pending",
  },
];

const LeaveRequestPanel = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl flex flex-col items-center space-y-6 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-800">Leave Requests</h1>

      {/* Search Bar */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-2xl border-2 border-white/40 bg-white/60 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
      </div>

      {/* Requests List */}
      <div className="w-full space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className={`p-6 rounded-2xl shadow-md bg-gradient-to-r from-purple-100/60 via-pink-100/50 to-blue-100/60 backdrop-blur-md transition transform hover:scale-[1.02] ${
              req.status === "approved"
                ? "border-l-8 border-green-500"
                : req.status === "declined"
                ? "border-l-8 border-red-500"
                : "border-l-8 border-yellow-400"
            }`}
          >
            <div className="flex justify-between items-center">
              {/* Employee Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {req.name}
                </h2>
                <p className="text-gray-600">
                  {req.reason} ({req.from} → {req.to})
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    req.status === "approved"
                      ? "text-green-600"
                      : req.status === "declined"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </p>
              </div>

              {/* Action Buttons */}
              {req.status === "pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleAction(req.id, "approved")}
                    className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "declined")}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <p className="text-gray-500 text-center">No leave requests found.</p>
        )}
      </div>

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
        `}
      </style>
    </div>
  );
};

export default LeaveRequestPanel;
