// src/components/AttendancePanel.jsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const employees = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Software Engineer",
    company: "TechCorp",
    joiningDate: "2022-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    position: "UI/UX Designer",
    company: "Designify",
    joiningDate: "2021-07-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Charlie Brown",
    position: "HR Manager",
    company: "PeopleFirst",
    joiningDate: "2019-03-20",
    status: "On Leave",
  },
];

const AttendancePanel = ({ setSelectedEmployee }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Attendance</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />

      {/* Employee List */}
      <div className="space-y-4">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-4 transition hover:scale-[1.01]"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(emp.id)}
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {emp.name}
                </h2>
                <p className="text-sm text-gray-600">{emp.position}</p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {emp.status}
              </span>
            </div>

            {/* Expanded Details */}
            {expandedId === emp.id && (
              <div className="mt-4 pl-2 border-l-2 border-pink-400 animate-[fadeIn_0.4s_ease]">
                <p className="text-gray-700">
                  <strong>Company:</strong> {emp.company}
                </p>
                <p className="text-gray-700">
                  <strong>Joining Date:</strong> {emp.joiningDate}
                </p>
                <button
                  onClick={() => setSelectedEmployee(emp)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white rounded-xl shadow hover:scale-105 transition"
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Employee Button */}
      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium shadow-lg hover:scale-105 transition">
          <FiPlus /> Add Employee
        </button>
      </div>
    </div>
  );
};

export default AttendancePanel;
