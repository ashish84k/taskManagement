import { Clock, CheckCircle, AlertCircle, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const incrementTime = (duration * 1000) / (end || 1);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.span
      key={count}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="text-3xl font-bold text-gray-900"
    >
      {count}
    </motion.span>
  );
}

const StatsCards = ({ userRole, tasks, users, currentUser }) => {
  
  let filteredTasks = tasks;
  if (userRole === "manager") {
    filteredTasks = tasks?.filter(
      (task) => users?.find((u) => u.name === task.assignee)?.managerId === currentUser.id
    );
  } else 
    if (userRole === "user") {
      
      filteredTasks = tasks.filter((task) => task.assignee === currentUser?.fullName);
    }
    
    console.log(filteredTasks);
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in-progress").length;
  const pendingTasks = filteredTasks.filter((t) => t.status === "pending").length;

  const stats = [
    { title: "Total Tasks", value: totalTasks, icon: FolderOpen, color: "bg-blue-500"},
    { title: "Completed", value: completedTasks, icon: CheckCircle, color: "bg-green-500"},
    { title: "In Progress", value: inProgressTasks, icon: Clock, color: "bg-yellow-500"},
    { title: "Pending", value: pendingTasks, icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6
                       hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
  
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <AnimatedCounter value={stat.value} duration={2} />

              </div>


              <div className={`${stat.color} rounded-lg p-3`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
