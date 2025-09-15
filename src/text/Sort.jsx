import { useState } from "react";

export default function SortingExample() {
  const [items, setItems] = useState([5, 3, 8, 1, 4]);

  const sortAsc = () => setItems([...items].sort((a, b) => a - b));
  const sortDesc = () => setItems([...items].sort((a, b) => b - a));

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2 text-purple-600">↕️ Sorting</h2>
      <div className="flex gap-2 mb-3">
        <button
          onClick={sortAsc}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Sort Asc
        </button>
        <button
          onClick={sortDesc}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Sort Desc
        </button>
      </div>
      <ul className="flex gap-2">
        {items.map((num, i) => (
          <li
            key={i}
            className="px-3 py-1 bg-gray-200 rounded text-gray-700 font-semibold"
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
