import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("hr"); // default HR
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Admin login (works regardless of role selected)
    if (email === "Admin" && password === "Admin") {
      toast.success("Welcome Admin!");
      navigate("/admindashboard"); // Admin Dashboard
      return;
    }

    // ✅ HR login
    if (role === "hr") {
      toast.success("Welcome HR!");
      navigate("/edashboard");
      return;
    }

    // ✅ Employee login
    if (role === "employee") {
      toast.success("Welcome Employee!");
      navigate("/employeedashboard");
      return;
    }

    // Fallback
    toast.error("Invalid credentials!");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-300 overflow-hidden">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
          <h1 className="text-5xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
            Login
          </h1>

          {/* Role Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setRole("hr")}
              className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
                role === "hr"
                  ? "bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white"
                  : "bg-white/60 text-gray-700 hover:bg-white"
              }`}
            >
              Employer
            </button>
            <button
              type="button"
              onClick={() => setRole("employee")}
              className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
                role === "employee"
                  ? "bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white"
                  : "bg-white/60 text-gray-700 hover:bg-white"
              }`}
            >
              Employee
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-white/30 bg-white/50 placeholder-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-white/30 bg-white/50 placeholder-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition"
            >
              Login as{" "}
              {email === "Admin" && password === "Admin"
                ? "Admin"
                : role === "hr"
                ? "HR"
                : "Employee"}
            </button>
          </form>

          <div className="mt-6 text-center text-stone-800 text-sm drop-shadow">
            Don’t have an account?{" "}
            <Link
              to="/"
              className="text-gray-950 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
