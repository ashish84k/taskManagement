import {
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Download,
  Eye,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import url from "../../services/url";
import AlertBox from "../ui/AlertBox";
import { useDispatch } from "react-redux";
import {
  updateUserById,
  deleteUserById,
} from "../../state_management/authSlice";
const UserManagement = ({ users, userRole }) => {
  if (userRole === "user") return null;

  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [showAddUser, setShowAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMoreMenu, setOpenMoreMenu] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  const [alert, setAlert] = useState(false);
  const [fullName, setFullName] = useState(editingUser?.fullName || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [role, setRole] = useState(editingUser?.role || "user");

  useEffect(() => {
    if (editingUser) {
      setFullName(editingUser.fullName || "");
      setEmail(editingUser.email || "");
      setRole(editingUser.role || "user");
    }
  }, [editingUser]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${url.localhost}/api/users/${editingUser.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ fullName, email, role }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Updated user:", data);

        dispatch(
          updateUserById({ id: editingUser.id, updatedData: data.user })
        );
        setEditingUser(null);
        setAlert({
          type: "success",
          message: data.message || "User updated successfully!",
        });
      } else {
        setAlert({ type: "error", message: data.message });
      }
    } catch (error) {
      console.error("Server error:", error);

      setAlert({ type: "error", message: data.message || "server error !" });
    }
  };

  const getRolePermissions = () => {
    return userRole === "admin"
      ? [
          "Full System Access",
          "User Management",
          "System Settings",
          "Audit Logs",
        ]
      : [
          "Team Management",
          "Task Assignment",
          "Team Reports",
          "Limited Settings",
        ];
  };

  const filteredUsers = users?.filter(
    (user) =>
      user?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user?.fullName}?`))
      return;

    try {
      const response = await fetch(`${url.localhost}/api/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Deleted user:", data);
        setAlert({
          type: "success",
          message: data.message || "User Deleted successfully!",
        });
        dispatch(deleteUserById(user.id));
        te;
        setSelectedUsers(selectedUsers?.filter((id) => id !== user?.id));
      } else {
        console.error("Delete failed:", data.message);
        setAlert({
          type: "error",
          message: data.message || "Delete failed!",
        });
      }
    } catch (error) {
      console.error("Server error:", error);
      setAlert({
        type: "error",
        message: data.message || "Server error!",
      });
    }
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedUsers?.length} users?`
      )
    ) {
      console.log("Bulk deleted", selectedUsers);
      setSelectedUsers([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {userRole === "admin" ? "Admin Permissions" : "Manager Permissions"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getRolePermissions()?.map((permission, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={16} />
              <span className="text-sm text-gray-600">{permission}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {userRole === "admin" ? "All Users" : "Team Members"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm w-full sm:w-auto"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
              <Download size={16} className="mr-2" /> Export
            </button>
            {/* <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" /> Add {userRole === 'admin' ? 'User' : 'Team Member'}
            </button> */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={
                      selectedUsers?.length === filteredUsers?.length &&
                      filteredUsers?.length > 0
                    }
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedUsers(filteredUsers?.map((u) => u?.id))
                        : setSelectedUsers([])
                    }
                  />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Type
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user?.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedUsers([...selectedUsers, user?.id]);
                        else
                          setSelectedUsers(
                            selectedUsers?.filter((id) => id !== user.id)
                          );
                      }}
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {user?.fullName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    {user?.role}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        user?.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : user?.role === "manager"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user?.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    {user?.tasks}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user?.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>

                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      onClick={() => setViewingUser(user)}
                    >
                      <Eye size={16} />
                    </button>

                    {(userRole === "admin" ||
                      (userRole === "manager" && user?.role === "user")) && (
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        onClick={() => setEditingUser(user)}
                      >
                        <Edit size={16} />
                      </button>
                    )}

                    {(userRole === "admin" ||
                      (userRole === "manager" && user?.role === "user")) && (
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <div className="relative">
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        onClick={() =>
                          setOpenMoreMenu((prev) => ({
                            ...prev,
                            [user.id]: !prev[user.id],
                          }))
                        }
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {openMoreMenu[user.id] && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded z-50">
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() =>
                              setAlert({
                                type: "success",
                                message: `Viewing profile of ${user?.fullName}`,
                              })
                            }
                          >
                            View Profile
                          </button>
                          {(userRole === "admin" ||
                            (userRole === "manager" &&
                              user?.role === "user")) && (
                            <>
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() =>
                                  setAlert({
                                    type: "success",
                                    message: `Reset password for ${user?.fullName}`,
                                  })
                                }
                              >
                                Reset Password
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() =>
                                  setAlert({
                                    type: "success",
                                    message: `Deactivate ${user?.fullName}`,
                                  })
                                }
                              >
                                Deactivate
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUsers?.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {selectedUsers?.length} users selected
          </span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            Bulk Edit
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            onClick={handleBulkDelete}
          >
            Bulk Delete
          </button>
          <button
            onClick={() => setSelectedUsers([])}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add User Modal
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Add {userRole === 'admin' ? 'User' : 'Team Member'}
            </h3>
            <input type="text" placeholder="Full Name" className="w-full mb-3 p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
            <select className="w-full mb-3 p-2 border rounded">
              <option value="user">User</option>
              {userRole === 'admin' && <option value="manager">Manager</option>}
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddUser(false)} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>
        </div>
      )} */}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Edit {editingUser?.fullName}
            </h3>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              View {viewingUser?.fullName}
            </h3>
            <p>
              <strong>Email:</strong> {viewingUser?.email}
            </p>
            <p>
              <strong>Role:</strong> {viewingUser?.role}
            </p>
            <p>
              <strong>Type:</strong> {viewingUser?.role}
            </p>
            <p>
              <strong>Status:</strong> {viewingUser?.status}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewingUser(null)}
                className="px-3 py-1 border rounded"
              >
                Close
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

export default UserManagement;
