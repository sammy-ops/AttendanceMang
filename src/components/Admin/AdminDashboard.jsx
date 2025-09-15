import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import AdminDashboardPanel from "./AdminDashboardPanel";
import AdminHRPanel from "./AdminHrPanel";   
import AdminEmployeePanel from "./AdminEmployeePanel";
import AdminSettingsPanel from "./AdminSettingsPanel"; 

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard"); // default view

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <AdminDashboardPanel />;
      case "hr":
        return <AdminHRPanel />;
      case "employee":
        return <AdminEmployeePanel />;
      case "settings":
        return <AdminSettingsPanel />;
      default:
        return <AdminDashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
      {/* Sidebar */}
      <AdminMenu active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
