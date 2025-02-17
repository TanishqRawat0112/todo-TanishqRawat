export default function TaskFilter({ setFilterDate }) {
    return (
      <input 
        type="date" 
        className="border p-2 mt-2 w-full"
        onChange={(e) => setFilterDate(new Date(e.target.value))}
      />
    );
  }
  