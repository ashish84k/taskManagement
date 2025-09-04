import { ArrowUp } from "lucide-react";
import StatsCards from "./StatsCards";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";

const Dashboard = ({ users }) => {
  const auth = useSelector((state) => state.auth);
  const task = useSelector((state) => state.task);

  const recentTasks = task.tasks
    .filter((t) => {
      if (auth.role === "admin") return true;
      if (auth.role === "manager")
        return users?.some((u) => u.na === t.assignee);
      return t.assignee === auth.user?.fullName;
    })
    .slice(0, 10);

  return (
    <div className="space-y-6">

      <div className="pt-10 pb-10 w-full bg-white flex flex-col items-center justify-center text-center px-6">
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 animate-pulse">
    Welcome to Your Dashboard
  </h2>

  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-indigo-600 mb-6 drop-shadow-lg animate-bounce">
    {auth?.user?.fullName || "Guest"}
  </h1>
  Role : {auth?.user?.role || "user"}

  <p className="text-gray-600 text-lg md:text-xl max-w-3xl leading-relaxed animate-fadeIn">
    Explore your tasks, track your progress, and stay productive. Your personalized dashboard gives you a clear view of everything that matters.
  </p>
</div>


      <StatsCards
        userRole={auth.role}
        tasks={task.tasks}
        users={users}
        currentUser={auth.user}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Tasks
              </h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />

                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {task.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {task.assignee} • Due {task.dueDate || "No due date"}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Calendar tasks={recentTasks} />
        </div>
      </div>

      {auth.role === "manager" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance
          </h3>
          <div className="space-y-4">
            {users?.slice(0, 3)?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.tasks} tasks
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp size={12} className="mr-1" />
                    +12%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
