import { useState, useEffect } from "react";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import TaskSorter from "../components/TaskSorter";
import { GoKebabHorizontal } from "react-icons/go";
import image from "../assets/image.png";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showOptions, setShowOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Saved Tasks (Before Fix): ", savedTasks);

    // Convert date strings back to Date objects
    const parsedTasks = savedTasks.map(task => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
    }));

    console.log("Parsed Tasks (After Fix): ", parsedTasks);
    setTasks(parsedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) { // Avoid saving empty state on first render
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Updated LocalStorage: ", localStorage.getItem("tasks"));
    }
  }, [tasks]);

  const addTask = (title, dueDate) => {
    const newTask = {
      id: Date.now(),
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks
  .filter(task => {
    if (!filterDate) return true; // No filter applied, return all tasks
    
    const taskDate = task.dueDate ? new Date(task.dueDate) : null;
    if (!taskDate) return false; // If no dueDate, don't include in filtered tasks

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the current week (Saturday)

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of current month

    const startOfYear = new Date(today.getFullYear(), 0, 1); // Start of year
    const endOfYear = new Date(today.getFullYear(), 11, 31); // End of year

    if (filterDate === "thisWeek") {
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    } else if (filterDate === "thisMonth") {
      return taskDate >= startOfMonth && taskDate <= endOfMonth;
    } else if (filterDate === "thisYear") {
      return taskDate >= startOfYear && taskDate <= endOfYear;
    }
    if (filterDate === "today") {
      return taskDate.toDateString() === today.toDateString(); // Compare only the date part
    }

    return taskDate.toDateString() === new Date(filterDate).toDateString(); // Default case: exact date match
  })
  .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) =>
    sortBy === "dueDate"
      ? (a.dueDate ? a.dueDate.getTime() : Infinity) - (b.dueDate ? b.dueDate.getTime() : Infinity)
      : a.title.localeCompare(b.title)
  );


  return (
    <div 
    style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minWidth: "90vw",
        minHeight: "100vh",
    }}
    className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white">My Day</h1>
      <div>
        <GoKebabHorizontal className="text-white text-2xl absolute right-25 top-2" onClick={()=>{
          setShowOptions(!showOptions);
          setShowFilterOptions(false);
        }} />
      </div>
      {showOptions && (
        <div className="bg-white text-black p-2 absolute right-15 top-10 w-1/6 z-2 border-black border-2 rounded">
          <TaskSearch setSearchQuery={setSearchQuery} />
          <div className="border-black border-1 mt-2 p-2" onClick={()=>{
            setShowOptions(false);
            setShowFilterOptions(!showFilterOptions);
          }}>Filter</div>
          <TaskSorter setSortBy={setSortBy} />
        </div>
      )}
      {
        showFilterOptions && (
          <div className="bg-white text-black p-2 absolute right-15 top-10 w-1/6 z-2 border-black border-2 rounded">
            <TaskFilter setFilterDate={setFilterDate} />
            <div className="border-black border-1 mt-2 p-2" onClick={()=>{
              setShowFilterOptions(false);
              setFilterDate("today");
            }}>Today</div>
            <div className="border-black border-1 mt-2 p-2" onClick={()=>{
              setShowFilterOptions(false);
              setFilterDate("thisWeek");
            }}>This Week</div>
            <div className="border-black border-1 mt-2 p-2" onClick={()=>{
              setShowFilterOptions(false);
              setFilterDate("thisMonth");
            }}>This Month</div>
            <div className="border-black border-1 mt-2 p-2" onClick={()=>{
              setShowFilterOptions(false);
              setFilterDate("thisYear");
            }}>This Year</div>
            <div className="border-black border-1 mt-2 p-2" onClick={()=>{
              setShowFilterOptions(false);
              setFilterDate(null);
            }}>All Tasks</div>

          </div>
        )
      }
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <TaskInput addTask={addTask} />
    </div>
  );
}
