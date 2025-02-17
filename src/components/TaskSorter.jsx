export default function TaskSorter({ setSortBy }) {
    return (
      <select className="border p-2 mt-2 w-full" onChange={(e) => setSortBy(e.target.value)}>
        <option value="dueDate">Sort by Due Date</option>
        <option value="title">Sort by Title</option>
      </select>
    );
  }
  