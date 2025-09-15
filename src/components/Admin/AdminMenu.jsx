import React, { useState } from "react";
import { Home, Users, Briefcase, Settings, LogOut } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminMenu = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { key: "hr", label: "HR. Mgmt", icon: <Briefcase size={20} /> },
    { key: "employee", label: "Emp. Mgmt", icon: <Users size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of Admin Dashboard!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Logged out successfully!");
        navigate("/login"); // redirect to login
      }
    });
  };

  return (
    <div className="w-64 bg-white/20 backdrop-blur-lg shadow-lg p-6 flex flex-col border-r border-white/30">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Admin</h2>
      <nav className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`flex items-center w-full px-4 py-2 rounded-xl transition font-semibold ${
              active === item.key
                ? "bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white shadow-md"
                : "text-gray-700 hover:bg-white/40"
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 mt-6 rounded-xl text-red-600 font-semibold hover:bg-red-100 transition"
      >
        <LogOut size={20} />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
};

export default AdminMenu;
