import React, { useState, useRef } from "react";
import url from "../../services/url";
import AlertBox from "../ui/AlertBox";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../ui/ButtonLoader";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    password: "",
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
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const response = await fetch(`${url.localhost}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role:'user',
          rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: "success", message: data.message || "Login successful!" });
        setFormData(initialForm);
        

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        

        setTimeout(() => {
          navigate(data.redirectTo || "/");
        }, 1500);
      } else {

        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach((err) => {
            serverErrors[err.field] = err.message;
          });
          setErrors(serverErrors);
        }
        setAlert({ 
          type: "error", 
          message: data.message || "Invalid credentials. Please try again." 
        });
      }
    } catch (error) {
      console.error("Login error:", error);
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
    const errorClass = errors[fieldName] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  const getPasswordInputClassName = (fieldName) => {
    const baseClass = "w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200";
    const errorClass = errors[fieldName] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };




  const GoogleLogin = () => {
   setAlert({ type: "error", message: "This feature is not implemented yet." });
  }
  const GithupLogin = () => {
   setAlert({ type: "error", message: "This feature is not implemented yet." });
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <form onSubmit={handleSubmit}  noValidate>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500">
              Login to continue to your account
            </p>
          </div>

       
          <div className="mb-5">
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className={getInputClassName("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          
          <div className="mb-6">
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className={getPasswordInputClassName("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-600 text-sm">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Forgot password?
            </button>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg bg-blue-500 text-white"
          >
            {loading && <ButtonLoader size="sm" color="white" />}
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>

         
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

         
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={GoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <i className="fab fa-google text-red-500"></i>
              Continue with Google
            </button>
            
            <button
              type="button"
              onClick={GithupLogin}
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <i className="fab fa-github text-gray-800"></i>
              Continue with GitHub
            </button>
          </div>

        
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignupRedirect}
              className="text-blue-600 hover:underline font-medium"
            >
              Create Account
            </button>
          </p>
        </form>
      </div>

    
      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}
    </div>
  );
}

export default Login;