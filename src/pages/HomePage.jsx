import { useState, useEffect } from "react";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import TaskSorter from "../components/TaskSorter";
import image from "../assets/image.png";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");

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
    .filter(task => !filterDate || task.createdAt.toDateString() === new Date(filterDate).toDateString())
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
        minHeight: "100vh",
    }}
    className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white">My Day</h1>
      <TaskSearch setSearchQuery={setSearchQuery} />
      <TaskFilter setFilterDate={setFilterDate} />
      <TaskSorter setSortBy={setSortBy} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <TaskInput addTask={addTask} />
    </div>
  );
}
