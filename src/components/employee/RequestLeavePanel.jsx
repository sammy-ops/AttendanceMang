import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const RequestLeavePanel = ({ setShowRequestForm, leaveData, setLeaveData }) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [formData, setFormData] = useState({
    from: today,
    to: today,
    type: "Casual Leave",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If changing "from", update "to" if it's earlier
    if (name === "from" && value > formData.to) {
      setFormData({ ...formData, from: value, to: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) newErrors[key] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all fields!");
      return;
    }

    // Confirmation
    Swal.fire({
      title: "Submit Leave Request?",
      text: `Are you sure you want to submit your ${formData.type}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add to leave data
        const newLeave = {
          id: leaveData.length + 1,
          from: formData.from,
          to: formData.to,
          type: formData.type,
          reason: formData.reason,
          status: "Pending",
        };
        setLeaveData([...leaveData, newLeave]);

        Swal.fire({
          icon: "success",
          title: "Leave Request Submitted",
          text: `Your ${formData.type} request has been submitted!`,
          confirmButtonText: "OK",
        });

        setShowRequestForm(false);
      }
    });
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg flex flex-col space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Apply for Leave</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex flex-col flex-1">
            From Date
            <input
              type="date"
              name="from"
              value={formData.from}
              min={today}
              onChange={handleChange}
              className={`mt-1 p-2 rounded-xl border focus:outline-none focus:ring-2 ${
                errors.from ? "border-red-500 ring-red-400" : "border-gray-300 ring-indigo-400"
              }`}
            />
          </label>
          <label className="flex flex-col flex-1">
            To Date
            <input
              type="date"
              name="to"
              value={formData.to}
              min={formData.from} // cannot select before "from"
              onChange={handleChange}
              className={`mt-1 p-2 rounded-xl border focus:outline-none focus:ring-2 ${
                errors.to ? "border-red-500 ring-red-400" : "border-gray-300 ring-indigo-400"
              }`}
            />
          </label>
        </div>

        <label className="flex flex-col">
          Leave Type
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`mt-1 p-2 rounded-xl border focus:outline-none focus:ring-2 ${
              errors.type ? "border-red-500 ring-red-400" : "border-gray-300 ring-indigo-400"
            }`}
          >
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Vacation</option>
            <option>Other</option>
          </select>
        </label>

        <label className="flex flex-col">
          Reason
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className={`mt-1 p-2 rounded-xl border focus:outline-none focus:ring-2 ${
              errors.reason ? "border-red-500 ring-red-400" : "border-gray-300 ring-indigo-400"
            }`}
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setShowRequestForm(false)}
            className="px-4 py-2 rounded-2xl bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestLeavePanel;
