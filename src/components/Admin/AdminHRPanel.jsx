import React, { useState } from "react";

const AdminHRPanel = () => {
  const [hrs] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      status: "Active",
      phone: "123-456-7890",
      department: "Sales",
      dateJoined: "2025-09-01",
      leaveRequests: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      status: "Inactive",
      phone: "987-654-3210",
      department: "Marketing",
      dateJoined: "2025-08-15",
      leaveRequests: 0,
    },
  ]);

  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHrs = hrs.filter(
    (hr) =>
      hr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hr.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Counts
  const activeCount = hrs.filter(hr => hr.status === "Active").length;
  const newJoinersCount = hrs.filter(hr => {
    const joinedMonth = new Date(hr.dateJoined).getMonth();
    return joinedMonth === new Date().getMonth();
  }).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">HR Management</h1>

      {/* Top Row: Cards + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex gap-4 flex-1">
          <div className="p-6 bg-indigo-200/60 rounded-2xl shadow-lg text-center flex-1 hover:scale-105 transition-transform duration-300">
            <p className="text-3xl font-bold text-gray-900">{newJoinersCount}</p>
            <p className="text-gray-700 mt-1 font-medium">New Joiners (This Month)</p>
          </div>
          <div className="p-6 bg-green-200/60 rounded-2xl shadow-lg text-center flex-1 hover:scale-105 transition-transform duration-300">
            <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-gray-700 mt-1 font-medium">Active HRs</p>
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <input
            type="text"
            placeholder="Search HR..."
            className="px-4 py-2 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HR Table */}
      <div className="overflow-hidden rounded-2xl shadow-lg bg-white/60 backdrop-blur-md">
        <table className="w-full text-left">
          <thead className="bg-purple-300/60 text-gray-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredHrs.map((hr, idx) => (
              <React.Fragment key={hr.id}>
                <tr
                  className="hover:bg-purple-100/50 cursor-pointer transition-colors duration-200"
                  onClick={() => toggleRow(hr.id)}
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{hr.name}</td>
                  <td className="px-4 py-2">{hr.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        hr.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {hr.status}
                    </span>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRow === hr.id && (
                  <tr>
                    <td colSpan={4} className="bg-gray-50/50 border-t">
                      <div className="flex flex-col md:flex-row gap-4 p-3">
                        <div className="space-y-1">
                          <p><span className="font-semibold">Phone:</span> {hr.phone}</p>
                          <p><span className="font-semibold">Department:</span> {hr.department}</p>
                        </div>
                        <div className="space-y-1">
                          <p><span className="font-semibold">Date Joined:</span> {hr.dateJoined}</p>
                          <p><span className="font-semibold">Leave Requests:</span> {hr.leaveRequests}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredHrs.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No HRs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHRPanel;
