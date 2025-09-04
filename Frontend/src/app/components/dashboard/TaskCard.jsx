import { Calendar, Edit, Trash2, User } from "lucide-react";
import { useState } from "react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onProgressChange,
  userRole,
  currentUser,
  users,
  onChange,
  handleProgressCommit,
}) => {
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const statusColors = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-gray-100 text-gray-800",
  };

  const handleProgressChangeLocal = (e) => {
    const value = Number(e.target.value);
    onProgressChange(task.id, value);
  };
  const handleProgressCommitLocal = (e) => {
    const value = Number(e.target.value);
    handleProgressCommit(task.id, value);
  };

  const canEditDelete = userRole === "admin" || userRole === "manager";
  const canStatusChange =
    canEditDelete ||
    (userRole === "user" && task.assignee === currentUser?.fullName);
  const canProgressChange = canEditDelete;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
          {canEditDelete && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-1" />
            {task.assignee || "Unassigned"}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            {task.dueDate || "No due date"}
          </div>
        </div>

        {canStatusChange ? (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {task.status.replace("-", " ")}
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${task.progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">{task.progress}% Complete</p>

      {(canProgressChange || canStatusChange) && (
        <input
          type="range"
          min="0"
          max="100"
          value={task.progress ?? 0}
          onChange={handleProgressChangeLocal}
          onMouseUp={handleProgressCommitLocal}
          onTouchEnd={handleProgressCommitLocal}
          className="w-full"
        />
      )}
    </div>
  );
};

export default TaskCard;
