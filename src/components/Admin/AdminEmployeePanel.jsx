import React, { useState } from "react";

const AdminEmployeePanel = () => {
  const [employees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@abc.com",
      company: "ABC Corp",
      status: "Active",
      phone: "123-456-7890",
      department: "Sales",
      dateJoined: "2025-09-02",
      leaveRequests: 1,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@xyz.com",
      company: "XYZ Ltd",
      status: "Inactive",
      phone: "987-654-3210",
      department: "Marketing",
      dateJoined: "2025-08-20",
      leaveRequests: 0,
    },
    {
      id: 3,
      name: "Carol Lee",
      email: "carol@abc.com",
      company: "ABC Corp",
      status: "Active",
      phone: "555-123-4567",
      department: "HR",
      dateJoined: "2025-09-05",
      leaveRequests: 2,
    },
  ]);

  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Group employees by company
  const companies = [...new Set(employees.map(emp => emp.company))];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Management</h1>

      {/* Search */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Employee..."
          className="px-4 py-2 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee by Company */}
      {companies.map((company) => {
        const companyEmployees = employees
          .filter(emp => emp.company === company)
          .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const activeCount = companyEmployees.filter(emp => emp.status === "Active").length;
        const newJoiners = companyEmployees.filter(emp => new Date(emp.dateJoined).getMonth() === new Date().getMonth()).length;
        const pendingLeaves = companyEmployees.reduce((acc, emp) => acc + emp.leaveRequests, 0);

        return (
          <div key={company} className="mb-8">
            {/* Company Header with Metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
              <div className="flex gap-4 flex-wrap">
                <div className="p-4 bg-blue-200/60 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
                  <p className="text-xl font-bold">{activeCount}</p>
                  <p className="text-gray-700 text-sm">Active Employees</p>
                </div>
                <div className="p-4 bg-green-200/60 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
                  <p className="text-xl font-bold">{newJoiners}</p>
                  <p className="text-gray-700 text-sm">New Joiners</p>
                </div>
                <div className="p-4 bg-red-200/60 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
                  <p className="text-xl font-bold">{pendingLeaves}</p>
                  <p className="text-gray-700 text-sm">Pending Leaves</p>
                </div>
              </div>
            </div>

            {/* Employee Table */}
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
                  {companyEmployees.map((emp, idx) => (
                    <React.Fragment key={emp.id}>
                      <tr
                        className="hover:bg-purple-100/50 cursor-pointer transition-colors duration-200"
                        onClick={() => toggleRow(emp.id)}
                      >
                        <td className="px-4 py-2">{idx + 1}</td>
                        <td className="px-4 py-2">{emp.name}</td>
                        <td className="px-4 py-2">{emp.email}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              emp.status === "Active"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {expandedRow === emp.id && (
                        <tr>
                          <td colSpan={4} className="bg-gray-50/50 border-t">
                            <div className="flex flex-col md:flex-row gap-4 p-3">
                              <div className="space-y-1">
                                <p><span className="font-semibold">Phone:</span> {emp.phone}</p>
                                <p><span className="font-semibold">Department:</span> {emp.department}</p>
                              </div>
                              <div className="space-y-1">
                                <p><span className="font-semibold">Date Joined:</span> {emp.dateJoined}</p>
                                <p><span className="font-semibold">Leave Requests:</span> {emp.leaveRequests}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}

                  {companyEmployees.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminEmployeePanel;
