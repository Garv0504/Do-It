import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LogOut,
  ListTodo,
  Calendar,
  Star,
  Map,
  Users,
  Moon,
  Sun,
  List,
  X,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { logout } from "./store/slices/authSlice";
import Login from "./components/Login";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();


  const [user, setUser] = useState(null);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for sidebar


  

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);


 

  if (!isAuthenticated) {
    return <Login />;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const incompleteTasks = tasks.length - completedTasks;

  const data = [
    { name: "Completed", value: completedTasks, color: "#1B5E20" },
    { name: "Incomplete", value: incompleteTasks, color: "#43A047" },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      } min-h-screen`}
    >
      <nav
        className={`p-4 flex justify-between items-center ${
          darkMode ? "bg-gray-800 text-green-600" : "bg-white text-green-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`block md:hidden p-2 rounded-lg bg-gray-200 ${
              !darkMode ? "bg-[#eef6ef6e]" : "bg-gray-700"
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>

          <h1 className="text-xl font-bold">DoIt</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg bg-gray-200 ${
              darkMode ? "bg-gray-700 text-white" : "bg-[#eef6ef6e] text-black"
            } transition`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 transition text-white"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="flex h-screen">
        <div
          ref={menuRef}
          className={`fixed md:static top-0 left-0 w-64 h-full ${
            !darkMode ? "bg-white" : "bg-gray-800"
          } md:p-6 p-2 flex flex-col transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 md:relative z-50`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 md:hidden text-gray-600 dark:text-gray-300"
          >
            <X size={24} />
          </button>

          <div className="mb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4"><img src="/logo.png"/></div>
            <h2 className="text-lg font-semibold">Hey, {username}</h2>
          </div>

          <div className={`p-2 ${!darkMode ? "bg-[#EEF6EF]" : "bg-gray-900"}`}>
            <nav className="space-y-2">
              {[
                { label: "All Tasks", icon: <ListTodo size={20} />, key: "all" },
                { label: "Today", icon: <Calendar size={20} />, key: "today" },
                {
                  label: "Important",
                  icon: <Star size={20} />,
                  key: "important",
                },
                { label: "Planned", icon: <Map size={20} />, key: "planned" },
                {
                  label: "Assigned to Me",
                  icon: <Users size={20} />,
                  key: "assigned",
                },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                    filter === item.key
                      ? "bg-green-50 dark:bg-green-600 text-gray-800 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-green-600"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center mb-2">
                Task Progress
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-2xl font-semibold">To-Do</h1>

          <div className="max-w-3xl">
            <TaskInput darkMode={darkMode} />
            <TaskList filter={filter} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
