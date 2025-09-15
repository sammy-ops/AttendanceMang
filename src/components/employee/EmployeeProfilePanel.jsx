import React from "react";

// Dummy employee data
const employee = {
  name: "John Doe",
  profilePic: "https://via.placeholder.com/100",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  designation: "Software Engineer",
  department: "IT",
  joiningDate: "2023-01-15",
  address: "123, Green Street, Mumbai, India",
  stats: {
    totalLeaves: 12,
    daysPresent: 150,
    absentDays: 8,
  },
};

const EmployeeProfilePanel = () => {
  const cardBgColors = [
    "from-green-200/50 to-green-400/40",
    "from-yellow-200/50 to-yellow-400/40",
    "from-red-200/50 to-red-400/40",
  ];

  const statLabels = ["Days Present", "Leaves Taken", "Absent Days"];
  const statValues = [
    employee.stats.daysPresent,
    employee.stats.totalLeaves,
    employee.stats.absentDays,
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col items-center space-y-8 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center w-full bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={employee.profilePic}
          alt={employee.name}
          className="w-28 h-28 rounded-full shadow-lg"
        />
        <div className="flex-1 flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
          <p className="text-gray-700 font-medium">{employee.designation}</p>
          <p className="text-gray-600 text-sm">{employee.department}</p>
          <p className="text-gray-600 text-sm">Joined: {employee.joiningDate}</p>
        </div>
      </div>

      {/* Contact & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Info</h2>
          <p className="text-gray-700 font-medium mb-2">
            <span className="font-semibold">Email:</span> {employee.email}
          </p>
          <p className="text-gray-700 font-medium mb-2">
            <span className="font-semibold">Phone:</span> {employee.phone}
          </p>
        </div>
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
          <p className="text-gray-700 font-medium">{employee.address}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {statLabels.map((label, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${cardBgColors[idx]} backdrop-blur-md p-6 rounded-2xl shadow-md flex flex-col items-center transform transition hover:scale-105`}
          >
            <h2 className="text-3xl font-bold text-gray-800">{statValues[idx]}</h2>
            <p className="mt-2 text-gray-700 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeProfilePanel;
