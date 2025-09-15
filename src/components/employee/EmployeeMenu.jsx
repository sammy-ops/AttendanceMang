import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "attendance", label: "My Attendance" },
  { id: "leave", label: "Leave Request" },
  { id: "profile", label: "Profile" },
  { id: "logout", label: "Logout" },
];

const EmployeeMenu = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === "logout") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          toast.success("Logout Successfully!");
        }
      });
    } else {
      setActive(id);
    }
  };

  return (
    <div className="w-64 min-h-screen flex flex-col justify-between p-4 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 backdrop-blur-lg shadow-2xl ">
      {/* Top Profile */}
      <div className="border-b border-white/30 pb-4 mb-4 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/80"
          alt="profile pic"
          className="rounded-full mb-2 shadow-lg"
        />
        <div className="text-lg font-semibold text-gray-800">Employee Name</div>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`p-3 rounded-2xl font-medium cursor-pointer text-center transition-all shadow-xl
              ${
                active === item.id
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105"
                  : "bg-white/30 text-gray-800 hover:bg-white/50 hover:shadow-md"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto text-center text-sm py-1 underline cursor-pointer text-gray-700 hover:text-gray-900 transition">
        <p>Support</p>
      </div>
    </div>
  );
};

export default EmployeeMenu;
