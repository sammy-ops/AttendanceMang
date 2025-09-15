import React from "react";
import { FaUserTie, FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";
import { MdCheckCircle, MdPendingActions, MdPeople } from "react-icons/md";

const ProfilePanel = () => {
  const hrDetails = {
    name: "John Doe",
    role: "HR Manager",
    department: "Human Resources",
    email: "john.doe@company.com",
    phone: "+91 9876543210",
    company: "TechCorp Pvt Ltd",
  };

  const activities = [
    { id: 1, action: "Approved leave request for Alice Johnson", date: "2025-09-11" },
    { id: 2, action: "Declined leave request for Bob Smith", date: "2025-09-10" },
    { id: 3, action: "Added new employee Charlie Brown", date: "2025-09-08" },
  ];

  const stats = [
    { id: 1, label: "Employees", value: 120, icon: <MdPeople className="text-blue-500 text-2xl" /> },
    { id: 2, label: "Pending Requests", value: 5, icon: <MdPendingActions className="text-yellow-500 text-2xl" /> },
    { id: 3, label: "Approved Leaves", value: 34, icon: <MdCheckCircle className="text-green-500 text-2xl" /> },
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-800">HR Profile</h1>

      {/* Profile Card */}
      <div className="flex items-center p-6 rounded-2xl shadow-md bg-gradient-to-r from-blue-100/60 via-purple-100/50 to-pink-100/60 backdrop-blur-md">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          <FaUserTie />
        </div>
        <div className="ml-6 space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">{hrDetails.name}</h2>
          <p className="text-gray-600">{hrDetails.role} - {hrDetails.department}</p>
          <p className="flex items-center text-gray-700"><FaEnvelope className="mr-2" /> {hrDetails.email}</p>
          <p className="flex items-center text-gray-700"><FaPhoneAlt className="mr-2" /> {hrDetails.phone}</p>
          <p className="flex items-center text-gray-700"><FaBuilding className="mr-2" /> {hrDetails.company}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl bg-white/70 shadow flex items-center justify-between hover:scale-105 transition">
            <div>
              <p className="text-gray-600">{s.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{s.value}</h3>
            </div>
            {s.icon}
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-2xl bg-white/70 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {activities.map((act) => (
            <li key={act.id} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-700">{act.action}</span>
              <span className="text-gray-500 text-sm">{act.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition">
          Update Profile
        </button>
        <button className="px-6 py-2 rounded-xl bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition">
          Change Password
        </button>
      </div>

      {/* Animation */}
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

export default ProfilePanel;
