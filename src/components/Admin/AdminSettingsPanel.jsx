import React, { useState } from "react";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const AdminSettingsPanel = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    username: "admin123",
    email: "admin@example.com",
    phone: "123-456-7890",
    password: "adminpass", // current password (for simulation)
  });

  const [tempInputs, setTempInputs] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [expanded, setExpanded] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
    password: false,
  });

  const toggleExpand = (field) => {
    setExpanded((prev) => ({ ...prev, [field]: !prev[field] }));
    // Reset temporary inputs when opening a field
    setTempInputs((prev) => ({ ...prev, [field]: profile[field] || "" }));
  };

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempInputs((prev) => ({ ...prev, [name]: value }));
  };

  const saveField = (field) => {
    // If password required for update
    if (field !== "Password") {
      if (tempInputs.currentPassword !== profile.password) {
        toast.error("Current password is incorrect!");
        return;
      }
    }

    if (field === "Password") {
      if (tempInputs.newPassword !== tempInputs.confirmPassword) {
        toast.error("New passwords do not match!");
        return;
      }
      setProfile((prev) => ({ ...prev, password: tempInputs.newPassword }));
      toast.success("Password updated successfully!");
      setTempInputs((prev) => ({ ...prev, newPassword: "", confirmPassword: "", currentPassword: "" }));
      setExpanded((prev) => ({ ...prev, password: false }));
      return;
    }

    // Save other fields
    setProfile((prev) => ({ ...prev, [field.toLowerCase()]: tempInputs[field.toLowerCase()] }));
    toast.success(`${field} updated successfully!`);
    setTempInputs((prev) => ({ ...prev, currentPassword: "" }));
    setExpanded((prev) => ({ ...prev, [field.toLowerCase()]: false }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Settings</h1>

      {/* Profile Card */}
      <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>

        {["name", "username", "email", "phone"].map((field) => (
          <div key={field} className="border-b border-gray-200 pb-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(field)}
            >
              <span className="capitalize text-gray-700 font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </span>
              <span className="text-indigo-500">{expanded[field] ? "▲" : "▼"}</span>
            </div>

            {expanded[field] && (
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  name={field}
                  value={tempInputs[field]}
                  onChange={handleTempChange}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={tempInputs.currentPassword}
                  onChange={handleTempChange}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
                <button
                  onClick={() => saveField(field.charAt(0).toUpperCase() + field.slice(1))}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition"
                >
                  Save {field}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Change Password */}
        <div className="border-b border-gray-200 pb-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand("password")}
          >
            <span className="text-gray-700 font-medium">Password</span>
            <span className="text-indigo-500">{expanded.password ? "▲" : "▼"}</span>
          </div>
          {expanded.password && (
            <div className="mt-2 flex flex-col gap-2">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={tempInputs.currentPassword}
                onChange={handleTempChange}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={tempInputs.newPassword}
                onChange={handleTempChange}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={tempInputs.confirmPassword}
                onChange={handleTempChange}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <button
                onClick={() => saveField("Password")}
                className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
              >
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPanel;
