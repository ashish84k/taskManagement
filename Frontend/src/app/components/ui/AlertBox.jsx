import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AlertBox({ type = "info", message, onClose, duration = 5000 }) {
  const alertStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      style={{ zIndex: "1000" }}
      className={`fixed top-5 right-5 w-80 p-4 border-l-4 rounded-lg shadow-lg 
      transform transition-all duration-500 ease-in-out animate-slide-in
      ${alertStyles[type]}`}
    >
      <div className="flex items-center">
        <i className={`${icons[type]} text-xl mr-3 animate-bounce`}></i>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-3 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default AlertBox;
