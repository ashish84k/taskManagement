import React, { useState } from "react";
import url from "../../services/url";
import AlertBox from "../ui/AlertBox";
import ButtonLoader from "../ui/ButtonLoader";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

   
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };


  const validate = () => {
    const errs = {};
    if (!formData.oldPassword) errs.oldPassword = "Old password is required";
    if (!formData.newPassword) errs.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      errs.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setAlert(null);

 
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({ type: "error", message: "Please fix the errors below" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${url.localhost}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: data.message || "Password changed successfully!" });
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach((err) => {
            if (err.field) serverErrors[err.field] = err.message;
          });
          setErrors(serverErrors);
        }
        setAlert({ type: "error", message: data.message || "Failed to change password" });
      }
    } catch (err) {
      setAlert({ type: "error", message: "Network error. Try again!" });
    } finally {
      setLoading(false);
    }
  };

 
  const getClass = (field) =>
    `w-full pl-10 pr-10 py-3 rounded-xl border ${
      errors[field] ? "shake border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
    } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Change Password</h2>

         
          <div className="mb-5 relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              type={showOld ? "text" : "password"}
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              className={getClass("oldPassword")}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className={`fas ${showOld ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
            {errors.oldPassword && <p className="text-red-500 text-sm mt-1 ml-1">{errors.oldPassword}</p>}
          </div>

      
          <div className="mb-5 relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              type={showNew ? "text" : "password"}
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className={getClass("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className={`fas ${showNew ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1 ml-1">{errors.newPassword}</p>}
          </div>

     
          <div className="mb-6 relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className={getClass("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg disabled:from-blue-400 disabled:to-indigo-400 transition-all"
          >
            {loading && <ButtonLoader size="sm" color="white" />}
            <span>{loading ? "Changing..." : "Change Password"}</span>
          </button>
        </form>
      </div>

      {alert && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} duration={4000} />
      )}
    </div>
  );
}

export default ChangePassword;
