import { useState, useEffect } from "react";

// 🔹 Custom hook: waits before updating
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // set timer
    const handler = setTimeout(() => setDebounced(value), delay);

    // cleanup (if user types fast, cancel old timer)
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function DebouncedSearch() {
  const items = ["React", "Vue", "Angular", "Svelte", "Next.js"];
  const [query, setQuery] = useState(""); // fast-changing input
  const debouncedQuery = useDebounce(query, 500); // slow/stable value

  const filtered = items.filter(item =>
    item.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2 text-green-600">⌛ Debounced Search</h2>
      
      <input
        type="text"
        placeholder="Search frameworks..."
        value={query}
        onChange={e => setQuery(e.target.value)} // updates instantly
        className="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:ring focus:ring-green-400"
      />

      <ul className="list-disc list-inside">
        {filtered.length > 0 ? (
          filtered.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
}
