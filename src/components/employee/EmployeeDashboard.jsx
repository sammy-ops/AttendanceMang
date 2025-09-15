import React, { useState } from "react";
import EmployeeMenu from "./EmployeeMenu";
import EmployeeDashboardPanel from "./EmployeeDashboardPanel";
import EmployeeAttendancePanel from "./EmployeeAttendancePanel";
import EmployeeLeavePanel from "./EmployeeLeavePanel";
import EmployeeProfilePanel from "./EmployeeProfilePanel";

const EmployeeDashboard = () => {
  const [active, setActive] = useState("dashboard"); // default is dashboard

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <EmployeeDashboardPanel />;
      case "attendance":
        return <EmployeeAttendancePanel />;
      case "leave":
        return <EmployeeLeavePanel />;
      case "profile":
        return <EmployeeProfilePanel />;
      default:
        return <EmployeeDashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 overflow-hidden">
      {/* Sidebar */}
      <EmployeeMenu active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">{renderContent()}</div>
    </div>
  );
};

export default EmployeeDashboard;
