export default function TaskItem({ task, toggleTask, deleteTask }) {
    const date = JSON.stringify(task.dueDate);
    const createdAt = JSON.stringify(task.createdAt);
    const createdAtDate = createdAt? createdAt.slice(1, 11):"";
    const newCreatedAtDate = createdAtDate.split("-").reverse().join("-");
    const displayDate = date ? date.slice(1, 11) : "";
    const newdisplayDate = displayDate.split("-").reverse().join("-");
    return (
      <li className="flex items-center bg-white p-3 shadow mb-2 w-3/4 ml-41">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleTask(task.id)}
          className="mr-2"
        />
        <div className="ml-2">
          <h3 className={task.completed ? "line-through text-gray-400" : ""}>{task.title}</h3>
          <p className={task.completed ? "line-through text-gray-400" : "text-blue-500"}>{newdisplayDate}</p>
          <p className={task.completed ? "line-through text-gray-400" : "text-black-500"}>Created At :{newCreatedAtDate}</p>
        </div>
        <button onClick={() => deleteTask(task.id)} className="text-red-500 absolute right-65">🗑</button>
      </li>
    );
  }
  