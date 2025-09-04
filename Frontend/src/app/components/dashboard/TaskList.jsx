import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTask,
  addTask,
  deleteTask,
} from "../../state_management/taskSlice";
import url from "../../services/url";
import Loader2 from "../ui/Loader2";
import AlertBox from "../ui/AlertBox";

const TaskList = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.auth.users);
  const tasks = useSelector((state) => state.task.tasks);
  const userRole = auth.role;

  const currentUser = useSelector((state) => state.auth.user);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    id: null,
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`${url.localhost}/api/task/${taskId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(deleteTask(taskId));

          setAlert({ type: "success", message: data.message });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Error deleting task",
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        setAlert({ type: "error", message: data.message });
      }
    }
  };

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
    console.log(taskId, value);
    const cureentTask = tasks.find((task, index) => task.id == taskId);
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

  const handleEdit = (task) => {
    setCurrentTask({
      id: task.id || null,
      title: task.title || "",
      description: task.description || "",
      assignee: task.assignee || "",
      priority: task.priority || "medium",
      status: task.status || "pending",
      dueDate: task.dueDate || "",
      category: task.category || "",
      progress: task.progress ?? 0,
    });
    setShowEditTask(true);
  };

  const tempTask = {
    title: "",
    description: "",
    assignee: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    category: "",
    progress: 0,
    id: null,
  };

  const validateTask = (task) => {
    const errors = {};

    if (!task.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!task.description?.trim()) {
      errors.description = "Description is required";
    }

    if (!task.assignee?.trim()) {
      errors.assignee = "Please assign the task";
    }

    return errors;
  };

  const handleAddTask = async () => {
    try {
      setLoading(true);

      const errors = validateTask(currentTask);
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        setAlert({ type: "error", message: firstError });
        return;
      }

      const res = await fetch(`${url.localhost}/api/task/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(currentTask),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const savedTask = await res.json();

      dispatch(addTask(savedTask.data));
      setShowAddTask(false);
      setCurrentTask(tempTask);
      setAlert({ type: "success", message: "Task added successfully!" });
    } catch (err) {
      console.error("Error:", err);
      setAlert({ type: "error", message: "Failed to add task. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);

      const errors = validateTask(currentTask);
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        setAlert({ type: "error", message: firstError });
        return;
      }

      const res = await fetch(
        `${url.localhost}/api/task/update/${currentTask.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTask),
        }
      );

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();

      dispatch(
        updateTask({ id: updatedTask.task.id, updates: updatedTask.task })
      );

      setShowEditTask(false);
      setCurrentTask(tempTask);

      setAlert({ type: "success", message: "Task updated successfully!" });
    } catch (error) {
      console.error("Error updating task:", error);
      setAlert({
        type: "error",
        message: "Failed to update task. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader2 />
  ) : (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {(userRole === "admin" || userRole === "manager") && (
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" />
              New Task
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onProgressChange={handleProgressChange}
            userRole={userRole}
            onChange={(e) => handleProgressChange}
            handleProgressCommit={handleProgressCommit}
            currentUser={currentUser}
            cureent_task = {()=>setCurrentTask(task)}
            users={users}
          />
        ))}
      </div>

  
      {showAddTask && (
        <div className="fixed overflow-auto inset-0 bg-neutral-100 z-50 flex  justify-center p-4">
          <div className="bg-white h-fit rounded-2xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">
            <h3 className="text-xl font-bold mb-5 text-gray-800">
              ➕ Add New Task
            </h3>

            <input
              type="text"
              placeholder="Task Title"
              value={currentTask.title || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              placeholder="Task Description"
              value={currentTask.description || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              rows={3}
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={currentTask.assignee || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, assignee: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Assign To</option>
              {users.map((u) => (
                <option key={u?.id} value={u?.fullName}>
                  {u?.fullName} ({u?.role})
                </option>
              ))}
            </select>

            <select
              value={currentTask.priority || "medium"}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, priority: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={currentTask.status || "pending"}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, status: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              value={currentTask.dueDate || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, dueDate: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={currentTask.category || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, category: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Progress: {currentTask.progress || 0}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentTask.progress || 0}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, progress: e.target.value })
                }
                className="w-full accent-blue-600"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditTask && (
        <div className="fixed overflow-auto inset-0 bg-neutral-100 z-50 flex justify-center p-4">
          <div className="bg-white rounded-2xl h-fit shadow-lg p-6 w-full max-w-lg animate-fadeIn">
            <h3 className="text-xl font-bold mb-5 text-gray-800">
              ✏️ Edit Task
            </h3>

            <input
              type="text"
              placeholder="Task Title"
              value={currentTask.title}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              placeholder="Task Description"
              value={currentTask.description}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              rows={3}
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={currentTask.assignee}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, assignee: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Assign To</option>
              {users.map((u) => (
                <option key={u?.id} value={u?.fullName}>
                  {u?.fullName} ({u?.role})
                </option>
              ))}
            </select>

            <select
              value={currentTask.priority}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, priority: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={currentTask.status || "pending"}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, status: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              value={currentTask.dueDate || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, dueDate: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={currentTask.category || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, category: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Progress: {currentTask.progress || 0}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentTask.progress || 0}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, progress: e.target.value })
                }
                className="w-full accent-blue-600"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => setShowEditTask(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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

export default TaskList;
