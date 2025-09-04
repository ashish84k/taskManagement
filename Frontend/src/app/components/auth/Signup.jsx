import React, { useState, useRef } from "react";
import url from "../../services/url";
import AlertBox from "../ui/AlertBox";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../ui/ButtonLoader";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    setErrors({});
    setAlert(null);
    
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({ type: "error", message: "Please fix the errors below" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${url.localhost}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: "success", message: data.message || "Account created successfully!" });
        setFormData(initialForm);
        
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach((err) => {
            serverErrors[err.field] = err.message;
          });
          setErrors(serverErrors);
        }
        
        console.log(data);
        
        setAlert({ 
          type: "error", 
          message: data.message || "Registration failed. Please try again." 
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({ 
        type: "error", 
        message: "Network error. Please check your connection and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200";
    const errorClass = errors[fieldName] ? "shake border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  const getPasswordInputClassName = (fieldName) => {
    const baseClass = "w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200";
    const errorClass = errors[fieldName] ? "shake border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <form onSubmit={handleSubmit} noValidate>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Sign up to get started. It's quick and easy!
            </p>
          </div>

          
          <div className="mb-5">
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className={getInputClassName("name")}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
            )}
          </div>

    
          <div className="mb-5">
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className={getInputClassName("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
            )}
          </div>

  
            <div className="flex gap-5">

          <div className="mb-5">
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className={getPasswordInputClassName("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
                className={getPasswordInputClassName("confirmPassword")}
                />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</p>
            )}
          </div>
            </div>
        
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <label htmlFor="terms" className="ml-3 text-gray-600 text-sm leading-relaxed">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline font-medium">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

    
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg bg-blue-500 text-white"
          >
            {loading && <ButtonLoader size="sm" color="white" />}
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
          </button>

      
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>

      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={5000}
        />
      )}
    </div>
  );
}

export default Signup;