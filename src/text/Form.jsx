import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Form() {
  const STORAGE_KEY = "registrationForm";

  const empty = {
    fname: "",
    lname: "",
    phnumber: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  };

  const [formData, setFormData] = useState(empty);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setRecords(saved);
  }, []);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phnumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: digitsOnly,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.fname.trim()) newErrors.fname = "Please enter first name";
    if (!formData.lname.trim()) newErrors.lname = "Please enter last name";
    if (!formData.phnumber.trim()) {
      newErrors.phnumber = "Please enter phone number";
    } else if (!/^[0-9]{10}$/.test(formData.phnumber)) {
      newErrors.phnumber = "Phone number must be 10 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.age.trim()) newErrors.age = "Please select age";
    if (!formData.gender.trim()) newErrors.gender = "Please select gender";
    if (!formData.password.trim()) newErrors.password = "Please enter password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors!");
      return;
    }

    Swal.fire({
      title: "Confirm Submission",
      text: "Do you want to save this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setTimeout(() => {
          let updated;
          if (editIndex !== null) {
            updated = [...records];
            updated[editIndex] = formData;
            setEditIndex(null);
          } else {
            updated = [...records, formData];
          }
          setRecords(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          setFormData(empty);
          setErrors({});
          setLoading(false);

          Swal.fire("Saved!", "Record has been saved.", "success");
          toast.success("Form submitted successfully!");
        }, 300);
      }
    });
  };

  const handleReset = () => {
    setFormData(empty);
    setErrors({});
    setEditIndex(null);
  };

  // delete record
  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setTimeout(() => {
          const updated = records.filter((_, i) => i !== index);
          setRecords(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          setLoading(false);

          Swal.fire("Deleted!", "The record has been removed.", "success");
          toast.success("Record deleted!");
        }, 300);
      }
    });
  };

  // edit record
  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-8">
      {/* form */}
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="grid grid-cols-2 gap-x-2 gap-y-3 px-4 bg-blue-100 p-6 rounded-md w-[600px]"
      >
        <label htmlFor="fname">First Name :</label>
        <div>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
        </div>

        <label htmlFor="lname">Last Name :</label>
        <div>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
        </div>

        <label htmlFor="phnumber">Phone No. :</label>
        <div>
          <input
            type="tel"
            id="phnumber"
            name="phnumber"
            value={formData.phnumber}
            onChange={handleChange}
            maxLength="10"
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.phnumber && <p className="text-red-500 text-sm">{errors.phnumber}</p>}
        </div>

        <label htmlFor="email">E-mail :</label>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="new-email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <label htmlFor="age">Age :</label>
        <div>
          <input
            type="date"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <label>Gender :</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          <label htmlFor="male" className="mr-2">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
          <label htmlFor="female" className="mr-2">Female</label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="Other"
            checked={formData.gender === "Other"}
            onChange={handleChange}
          />
          <label htmlFor="other">Other</label>

          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <label htmlFor="password">Password :</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-blue-400 p-1"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="col-span-2 flex justify-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editIndex !== null ? "Save" : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* table */}
      {records.length > 0 && (
        <div className="min-w-[800px]">
          <h2 className="text-xl font-semibold mb-2">Saved Records</h2>
          <table className="w-full border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Password</th>
                <th className="border p-2 w-40">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index}>
                  <td className="border p-2">{rec.fname}</td>
                  <td className="border p-2">{rec.lname}</td>
                  <td className="border p-2">{rec.phnumber}</td>
                  <td className="border p-2">{rec.email}</td>
                  <td className="border p-2">{rec.age}</td>
                  <td className="border p-2">{rec.gender}</td>
                  <td className="border p-2">{rec.password}</td>
                  <td className="border p-2 flex gap-4 justify-center ">
                    {editIndex === index ? (
                      <span className="text-gray-500">Editing...</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* loading spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
