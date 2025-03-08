import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, CheckCircle, Circle } from 'lucide-react';
import { deleteTask, toggleTask, toggleStarTask } from '../store/slices/tasksSlice';

const TaskList = ({ filter, darkMode }) => {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "today") return task.dueToday;
    if (filter === "important") return task.starred;
    if (filter === "planned") return task.planned;
    if (filter === "assigned") return task.assignedToMe;
    return true;
  });

  const activeTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500"; 
      case "medium":
        return "text-yellow-500"; 
      case "low":
        return "text-green-500"; 
      default:
        return "text-gray-400"; 
    }
  };

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 ? (
        activeTasks.map((task) => (
          <div key={task.id} className={`flex items-center gap-4 p-3 ${!darkMode ? 'hover:bg-[#EEF6EF]' : 'hover:bg-gray-600'} rounded-lg group`}>
            {/* Task Completion Toggle */}
            <button onClick={() => dispatch(toggleTask(task.id))} className="text-gray-400 hover:text-green-600">
              <Circle className="h-5 w-5" />
            </button>
            
            <span className="flex-1">{task.title}</span>
            
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority || "No Priority"}
            </span>

            <button onClick={() => dispatch(toggleStarTask(task.id))}>
              <Star className="h-5 w-5" fill={task.starred ? "#FFDD44" : "transparent"} stroke={task.starred ? "#FFDD44" : "gray"} />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No active tasks.</div>
      )}

      {completedTasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Completed Tasks</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className={`flex items-center gap-4 p-3 ${!darkMode ? 'hover:bg-[#EEF6EF]' : 'hover:bg-gray-600'} rounded-lg group`}>
              <button onClick={() => dispatch(toggleTask(task.id))} className="text-green-600 hover:text-gray-400">
                <CheckCircle className="h-5 w-5" />
              </button>
              
              <span className="flex-1 line-through text-gray-500 dark:text-gray-400">{task.title}</span>

              <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500 hover:text-red-700">
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
