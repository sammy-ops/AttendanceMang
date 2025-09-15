import React, { useState } from "react";
import Menu from "./hr/Menu";
import DashboardPanel from "./hr/Dashboardpanel";
import AttendancePanel from "./hr/AttendancePanel";
import CalendarPanel from "./hr/CalendarPanel";
import LeaveRequestPanel from "./hr/LeaveRequestPanel";
import ProfilePanel from "./hr/ProfilePanel";
import DetailPanel from "./hr/DetailPanel"; // import the details panel

const Edashboard = () => {
  const [active, setActive] = useState("dashboard"); // Default is Dashboard
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track employee for details

  const renderContent = () => {
    // If an employee is selected, show DetailPanel instead of normal panels
    if (selectedEmployee) {
      return (
        <DetailPanel
          employee={selectedEmployee}
          // Add a back button inside DetailPanel if you want
        />
      );
    }

    switch (active) {
      case "dashboard":
        return <DashboardPanel />;
      case "attendance":
        return <AttendancePanel setSelectedEmployee={setSelectedEmployee} />;
      case "calendar":
        return <CalendarPanel />;
      case "leave-request":
        return <LeaveRequestPanel />;
      case "profile":
        return <ProfilePanel />;
      default:
        return <DashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-purple-300 via-pink-200 to-blue-200 overflow-hidden">
      {/* Sidebar */}
      <Menu active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">{renderContent()}</div>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }
        `}
      </style>
    </div>
  );
};

export default Edashboard;
