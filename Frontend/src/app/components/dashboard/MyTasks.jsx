import {
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  MessageSquare,
  FileText,
} from "lucide-react";

import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../state_management/taskSlice";
import url from "../../services/url";
import AlertBox from "../ui/AlertBox";
import { useState } from "react";

const MyTasks = ({ tasks, userRole, currentUser }) => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  

    const handleStatusChange = async (taskId, newStatus) => {
      try {
        const response = await fetch(`${url.localhost}/api/task/${taskId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Status updated:", data);
  
          dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
  
          setAlert({
            type: "success",
            message: data.message || "status update successfully!",
          });
        } else {
          console.error("Error updating status:", data.error);
          setAlert({ type: "error", message: data.message });
        }
      } catch (error) {
        console.error("Server error:", error);
  
        setAlert({ type: "error", message: data.message });
      }
    };
  

  const handleProgressChange = (taskId, value) => {
    dispatch(updateTask({ id: taskId, updates: { progress: value } }));
  };

  const handleProgressCommit = async (taskId, value) => {
    const cureentTask = tasks.find((task, index) => task.id == taskId);
    // console.log( tasks, cureentTask);
    try {
      const response = await fetch(`${url.localhost}/api/task/${taskId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: cureentTask.status, progress: value }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Progress updated:", data);
        setAlert({
          type: "success",
          message: data.message || "Progress updated successfully!",
        });
      } else {
        console.error("Error updating progress:", data.error);
        setAlert({ type: "error", message: data.message });
      }
    } catch (error) {
      console.error("Server error:", error);
      setAlert({ type: "error", message: "Server error while updating" });
    }
  };

  if (userRole !== "user") return null;

  const myTasks = tasks.filter(
    (task) => task.assignee === currentUser?.fullName
  );

  const todaysTasks = myTasks.filter((task) => {
    const today = new Date().toDateString();
    return new Date(task.dueDate).toDateString() === today;
  }).length;

  const inProgressTasks = myTasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedTasks = myTasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          My Tasks Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Today's Tasks
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {todaysTasks}
                </p>
              </div>
              <Clock className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {inProgressTasks}
                </p>
              </div>
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-900">
                  {completedTasks}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myTasks.slice(0, 4).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            userRole={userRole}
            onStatusChange={handleStatusChange}
            onChange={(e) => handleProgressChange}
            handleProgressCommit={handleProgressCommit}
            onProgressChange={handleProgressChange}
            currentUser={currentUser}
          />
        ))}
      </div>
      
      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={3000}
        />
      )}
    </div>
  );
};

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Completion Rate
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "85%" }}
              />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "92%" }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Priority Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">High Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">Medium Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">Low Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "Task completed",
              user: "John Doe",
              time: "2 hours ago",
              icon: CheckCircle,
              color: "text-green-500",
            },
            {
              action: "New task assigned",
              user: "Jane Smith",
              time: "4 hours ago",
              icon: Plus,
              color: "text-blue-500",
            },
            {
              action: "Comment added",
              user: "Mike Johnson",
              time: "6 hours ago",
              icon: MessageSquare,
              color: "text-purple-500",
            },
            {
              action: "File uploaded",
              user: "Sarah Wilson",
              time: "1 day ago",
              icon: FileText,
              color: "text-orange-500",
            },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <Icon className={activity.color} size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
