import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BullPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <Outlet />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center w-80 transform transition-all duration-500 scale-95 animate-fadeIn">
         
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              👋 Welcome!
            </h2>
            <p className="mb-6 text-gray-600 text-sm">
              Please login to unlock full features.  
              Without login, limited access is available.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md hover:scale-105 transition-transform"
              >
                Login
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-transform"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BullPopup;
