import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index"; // Registration page
import Login from "./components/Login";  // Login page
import Edashboard from "./components/Edashboard"; // HR Dashboard (moved to hr folder if you did so)
import EmployeeDashboard from "./components/employee/EmployeeDashboard"; // Employee Dashboard
import AdminDashboard from "./components/Admin/AdminDashboard"; // ✅ Admin Dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edashboard" element={<Edashboard />} /> {/* HR */}
        <Route path="/employeedashboard" element={<EmployeeDashboard />} /> {/* Employee */}
        <Route path="/admindashboard" element={<AdminDashboard />} /> {/* ✅ Admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
