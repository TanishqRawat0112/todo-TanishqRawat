export default function TaskItem({ task, toggleTask, deleteTask }) {
    const date = JSON.stringify(task.dueDate);
    const displayDate = date ? date.slice(1, 11) : "";
    return (
      <li className="flex items-center justify-between bg-white p-3 shadow mb-2">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleTask(task.id)}
          className="mr-2"
        />
        {console.log("DueDate in taskItem : ")}
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
        <span className={task.completed ? "line-through text-gray-400" : "text-blue-500"}>{displayDate}</span>
        <button onClick={() => deleteTask(task.id)} className="text-red-500">🗑</button>
      </li>
    );
  }
  