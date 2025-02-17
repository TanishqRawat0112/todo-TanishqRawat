export default function TaskSearch({ setSearchQuery }) {
    return (
      <input 
        type="text" 
        className="p-2 mt-2 w-full border" 
        placeholder="Search task..." 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    );
  }
  