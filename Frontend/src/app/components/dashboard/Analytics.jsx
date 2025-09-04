import { useEffect, useState } from "react";
import { Plus, CheckCircle, MessageSquare, FileText } from "lucide-react";
import CountUp from "react-countup";

const Analytics = ({ tasks, recentActivities }) => {
  const [weeklyCompletion, setWeeklyCompletion] = useState(0);
  const [monthlyCompletion, setMonthlyCompletion] = useState(0);
  const [priorityStats, setPriorityStats] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
 
    const completedThisWeek = tasks.filter(
      (task) => task.status === "completed" && new Date(task.dueDate) >= new Date(new Date().setDate(new Date().getDate() - 7))
    ).length;
    const totalThisWeek = tasks.filter(
      (task) => new Date(task.dueDate) >= new Date(new Date().setDate(new Date().getDate() - 7))
    ).length;
    setWeeklyCompletion(totalThisWeek ? Math.round((completedThisWeek / totalThisWeek) * 100) : 0);


    const completedThisMonth = tasks.filter(
      (task) => task.status === "completed" && new Date(task.dueDate).getMonth() === new Date().getMonth()
    ).length;
    const totalThisMonth = tasks.filter(
      (task) => new Date(task.dueDate).getMonth() === new Date().getMonth()
    ).length;
    setMonthlyCompletion(totalThisMonth ? Math.round((completedThisMonth / totalThisMonth) * 100) : 0);


    const high = tasks.filter((t) => t.priority === "high").length;
    const medium = tasks.filter((t) => t.priority === "medium").length;
    const low = tasks.filter((t) => t.priority === "low").length;
    setPriorityStats({ high, medium, low });
  }, [tasks]);

  return (
    <div className="space-y-6">
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Rate</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-gray-900">
                <CountUp end={weeklyCompletion} duration={1.5} />%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${weeklyCompletion}%` }}
              />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-sm font-medium text-gray-900">
                <CountUp end={monthlyCompletion} duration={1.5} />%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${monthlyCompletion}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">High Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                <CountUp end={priorityStats.high} duration={1.5} /> 
                ({tasks.length ? Math.round((priorityStats.high / tasks.length) * 100) : 0}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">Medium Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                <CountUp end={priorityStats.medium} duration={1.5} /> 
                ({tasks.length ? Math.round((priorityStats.medium / tasks.length) * 100) : 0}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                <span className="text-sm text-gray-600">Low Priority</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                <CountUp end={priorityStats.low} duration={1.5} /> 
                ({tasks.length ? Math.round((priorityStats.low / tasks.length) * 100) : 0}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
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

export default Analytics;
