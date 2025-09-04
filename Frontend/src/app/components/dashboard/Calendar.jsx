import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Calendar = ({ tasks = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // ✅ Task dates ko "YYYY-MM-DD" format me store karo
  const taskDays = new Set(
    tasks.map((t) => {
      const d = new Date(t.dueDate);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Calendar View</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-medium text-gray-900">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          if (!day) {
            return (
              <div
                key={i}
                className="relative aspect-square flex items-center justify-center text-sm text-gray-400"
              >
                {""}
              </div>
            );
          }

          const key = `${year}-${month}-${day}`;
          const hasTask = taskDays.has(key);

          return (
            <div
              key={i}
              className={`relative aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors 
                ${
                  hasTask
                    ? "bg-blue-100 text-blue-900 font-medium hover:bg-blue-200"
                    : "text-gray-900 hover:bg-gray-100"
                }
              `}
            >
              {day}
              {hasTask && (
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
