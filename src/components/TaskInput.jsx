import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    addTask(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="px-4 py-2 pb-3 bottom-1 left-1/2 transform -translate-x-1/2 fixed w-full sm:w-[90%] md:w-3/4 lg:w-3/4 bg-gray-700 text-white"> 
        <form onSubmit={handleSubmit} className="flex  gap-2 mt-2 items-center flex-wrap ">
            
            <input 
                type="text" 
                className=" p-2 w-4/5 sm:w-4/5 " 
                placeholder="Add a task..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
                type="date" 
                className=" p-2 cursor-pointer w-auto sm:w-auto absolute right-15" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            <button type="submit" className="text-white px-2  cursor-pointer w-full sm:w-auto absolute right-3 border-white border-2 text-3xl">+</button>
    </form>
    </div>
  );
}
