import { useState } from "react";

export default function NormalSearch() {
  const items = ["Apple", "Banana", "Orange", "Grapes", "Mango"];
  const [query, setQuery] = useState("");

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2 text-blue-600">🔍 Normal Search</h2>
      <input
        type="text"
        placeholder="Search fruits..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:ring focus:ring-blue-400"
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
