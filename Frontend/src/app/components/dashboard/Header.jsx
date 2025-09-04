import { Search, Bell, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = ({ setIsOpen }) => {
  const auth = useSelector((state) => state.auth);

  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("http://localhost:5000/api/notifications", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Notification fetch error:", error);

        // Fallback demo notifications
        setNotifications([
          { id: 1, message: "New task assigned to you", time: "2m ago" },
          { id: 2, message: "Task deadline is tomorrow", time: "1h ago" },
          { id: 3, message: "Your task was marked as completed", time: "3h ago" },
        ]);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sm:px-6 relative">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center">
          {/* Sidebar Toggle (only mobile) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden mr-3 text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Dashboard
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search (hidden on mobile, toggle button) */}
          <div className="hidden sm:block relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-52 sm:w-64"
            />
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b font-semibold text-gray-700">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <p>{notif.message}</p>
                        <span className="text-xs text-gray-400">
                          {notif.time}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {auth?.user?.fullName?.toUpperCase().charAt(0)}
            </div>
            {/* Hide name on small screens */}
            <span className="hidden sm:inline text-sm font-medium text-gray-700 capitalize">
              {auth?.user?.fullName}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="sm:hidden mt-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
