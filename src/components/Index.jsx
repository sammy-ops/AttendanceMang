import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

export default function Registration() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employee"); // "employee" | "employer"

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    company: "",
    designation: "", // for employee
    department: "", // for employer
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let requiredFields =
      role === "employee"
        ? ["fname", "email", "phone", "password", "confirmpassword", "company", "designation"]
        : ["fname", "email", "phone", "password", "confirmpassword", "company", "department"];

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = true;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special char!"
      );
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }

    Swal.fire("Success!", `${role} Registration Completed!`, "success");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen w-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-300 overflow-hidden">
        
        {/* Left Side Heading */}
        <div className="hidden md:flex flex-col justify-center flex-1 px-16">
          <h1 className="text-7xl font-extrabold text-white opacity-0 animate-fadeIn mb-4 drop-shadow-lg">
            Registration
          </h1>
          <p className="text-3xl text-white opacity-0 animate-fadeIn delay-200 drop-shadow">
            {role === "employee" ? "for Employee" : "for Employer (HR)"}
          </p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-0">
          <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:mr-12 md:my-12 border border-white/30">

            {/* Role Switch */}
            <div className="flex mb-6 bg-white/40 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setRole("employee")}
                className={`flex-1 py-2 rounded-xl font-semibold transition ${
                  role === "employee"
                    ? "bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white shadow"
                    : "text-gray-700 hover:bg-white/70"
                }`}
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`flex-1 py-2 rounded-xl font-semibold transition ${
                  role === "employer"
                    ? "bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white shadow"
                    : "text-gray-700 hover:bg-white/70"
                }`}
              >
                Employer
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  className={`w-1/2 px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                    errors.fname ? "border-red-500" : "border-white/30"
                  }`}
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-1/2 px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>

              {/* Common Fields */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                  errors.email ? "border-red-500" : "border-white/30"
                }`}
              />

              <input
                type="tel"
                name="phone"
                maxLength={10}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({ ...prev, phone: digits }));
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                  errors.phone ? "border-red-500" : "border-white/30"
                }`}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                  errors.password ? "border-red-500" : "border-white/30"
                }`}
              />

              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                  errors.confirmpassword ? "border-red-500" : "border-white/30"
                }`}
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                  errors.company ? "border-red-500" : "border-white/30"
                }`}
              />

              {/* Role-Specific Fields */}
              {role === "employee" && (
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                    errors.designation ? "border-red-500" : "border-white/30"
                  }`}
                />
              )}

              {role === "employer" && (
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-xl border-2 text-sm bg-white/50 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition ${
                    errors.department ? "border-red-500" : "border-white/30"
                  }`}
                />
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="w-1/2 mr-2 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition"
                >
                  Sign Up
                </button>
                <button
                  type="reset"
                  className="w-1/2 ml-2 bg-white/50 text-gray-800 py-2 rounded-xl font-semibold shadow-lg hover:bg-white/70 transition"
                  onClick={() =>
                    setFormData({
                      fname: "",
                      lname: "",
                      email: "",
                      phone: "",
                      password: "",
                      confirmpassword: "",
                      company: "",
                      designation: "",
                      department: "",
                    })
                  }
                >
                  Reset
                </button>
              </div>

              <div className="text-center text-stone-800 mt-3 text-sm pt-3 drop-shadow">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-gray-950 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }
          .delay-200 { animation-delay: 0.25s; }
        `}
      </style>
    </>
  );
}
