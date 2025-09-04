
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import url from "../../services/url";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import TaskList from "./TaskList";
import Analytics from "./Analytics";
import MyTasks from "./MyTasks";
import Settings from "./Settings";
import Calendar from "./Calendar";
import UserManagement from "./UserManagement";

import { fetchTasks } from "../../state_management/taskSlice";
import { fetchUsers } from "../../state_management/authSlice";
import { CheckCircle , Plus} from "lucide-react";

const TaskManagerDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const auth = useSelector((state) => state.auth);
  const task = useSelector((state) => state.task);
  

  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    async function taskFetch() {
      try {
        const res = await fetch(`${url.localhost}/api/task`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        dispatch(fetchTasks(data.data));
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
      }
    }



    async function usersFetch() {
      try {
        const res = await fetch(`${url.localhost}/api/users`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        dispatch(fetchUsers(data.data));
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    }
    
    taskFetch();
    usersFetch();
    setUserRole(auth.role);
  }, [auth.role, dispatch]);
  

  const formatTimeAgo = (dateString) => {
    const diff = new Date() - new Date(dateString);
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };


  const generateRecentActivities = (tasks) => {
    const activities = [];
    const tasksCopy = [...tasks];

    tasksCopy
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 10) 
      .forEach((task) => {
        if (task.status === "completed") {
          activities.push({
            action: `Task completed: ${task.title}`,
            user: task.assignee || "Unassigned",
            time: formatTimeAgo(task.updatedAt),
            icon: CheckCircle,
            color: "text-green-500",
          });
        } else if (task.status === "pending" && task.createdAt === task.updatedAt) {
          activities.push({
            action: `New task assigned: ${task.title}`,
            user: task.assignee || "Unassigned",
            time: formatTimeAgo(task.createdAt),
            icon: Plus,
            color: "text-blue-500",
          });
        }
      
      });

    return activities;
  };

  
  
  const recentTasks = task?.tasks
    .filter((t) => {
      if (auth.role === 'admin') return true;
      if (auth.role === 'manager') return users?.some(u => u.na === t.assignee);
      return t.assignee === auth.user?.fullName; 
    })
    .slice(0, 3); 

  const recentActivities = generateRecentActivities(task.tasks);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard tasks={task.tasks} users={users} userRole={userRole} />;
      case "tasks":
        return <TaskList />;
      case "analytics":
        return <Analytics tasks={task.tasks} recentActivities={recentActivities}/>;
      case "users":
        return <UserManagement users={users} userRole={userRole} />;
      case "mytasks":
        return <MyTasks tasks={task.tasks} userRole={userRole} currentUser = {auth.user}/>;
      case "calendar":
        return <Calendar tasks ={recentTasks} />;
      case "settings":
        return <Settings userRole={userRole} />;
      default:
        return <Dashboard users={users}  />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      {auth.role !== "user" && (
        <div className="fixed top-13 right-4 z-50 p-2">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="admin">Admin View</option>
            <option value="manager">Manager View</option>
            <option value="user">User View</option>
          </select>
        </div>
      )}

      <div className="flex">
      
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1">
     
          <Header setIsOpen={setSidebarOpen} userRole={userRole} />

          
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerDashboard;
