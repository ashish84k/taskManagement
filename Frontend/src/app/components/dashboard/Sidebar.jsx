import {
  Calendar,
  Users,
  Settings,
  X,
  Home,
  BarChart3,
  FolderOpen,
  UserCheck,
  FileText,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../state_management/authSlice";
import { useNavigate } from "react-router-dom";
import url from "../../services/url";

const Sidebar = ({ activeTab, setActiveTab, userRole, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [logoutOpen, setLogoutOpen] = useState(false);
  const toggleSubmenu = (id) =>
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));

  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "tasks", label: "Tasks", icon: FolderOpen },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "calendar", label: "Calendar", icon: Calendar },
    ];

    if (userRole === "admin") {
      return [
        ...baseItems,
        { id: "users", label: "User Management", icon: Users },
        {
          id: "reports",
          label: "Reports",
          icon: FileText,
          children: [
            { id: "daily", label: "Daily Report" },
            { id: "weekly", label: "Weekly Report" },
            { id: "monthly", label: "Monthly Report" },
          ],
        },
        { id: "system", label: "System Settings", icon: Settings },
        { id: "settings", label: "Account Settings", icon: UserCheck },
      ];
    } else if (userRole === "manager") {
      return [
        ...baseItems,
        { id: "users", label: "Team Management", icon: Users },
        {
          id: "reports",
          label: "Team Reports",
          icon: FileText,
          children: [
            { id: "overview", label: "Overview" },
            { id: "performance", label: "Performance" },
          ],
        },
        { id: "settings", label: "Settings", icon: Settings },
      ];
    } else {
      return [
        ...baseItems,
        { id: "mytasks", label: "My Tasks", icon: UserCheck },
        { id: "settings", label: "Settings", icon: Settings },
      ];
    }
  };

  const menuItems = getMenuItems();

  const Logout = async () => {
    try {
      const res = await fetch(`${url.localhost}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      
      if (res.ok) {
        
        dispatch(logout());

        alert("Logged out successfully!");

        navigate("/login");
        return;
      }

      const errorData = await res.json().catch(() => ({}));
      alert(errorData.message || "Logout failed. Please try again.");
    } catch (error) {
      console.error("Network or unexpected error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:sticky lg:z-auto flex flex-col justify-between`}
      >
      
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskMaster Pro
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

      
        <nav className="mt-6 flex-1 overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 transition-all duration-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasChildren = !!item.children;
            const isOpenSubmenu = openSubmenus[item.id] || false;

            return (
              <div key={item.id}>
                <button
                  onClick={() =>
                    hasChildren ? toggleSubmenu(item.id) : setActiveTab(item.id)
                  }
                  className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors ${
                    isActive
                      ? "bg-slate-700 border-r-4 border-blue-400"
                      : "hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        isActive ? "text-blue-400" : "text-gray-300"
                      }`}
                    />
                    <span
                      className={isActive ? "font-semibold text-blue-400" : ""}
                    >
                      {item.label}
                    </span>
                  </div>
                  {hasChildren &&
                    (isOpenSubmenu ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    ))}
                </button>

                {hasChildren && (
                  <div
                    className={`ml-12 overflow-hidden transition-all duration-300 ${
                      isOpenSubmenu ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveTab(child.id)}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                          activeTab === child.id
                            ? "bg-slate-700 text-blue-400"
                            : "text-gray-300 hover:bg-slate-700"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-700 relative">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setLogoutOpen(!logoutOpen)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-sm font-semibold">
                {auth.user?.fullName.toUpperCase().charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{auth.user?.fullName}</p>
                <p className="text-xs text-gray-400 capitalize">{auth.role}</p>
              </div>
            </div>
            <LogOut size={20} className="text-gray-400" />
          </div>

        
          {logoutOpen && (
            <button
              className="mt-2 w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              onClick={()=>Logout()}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
