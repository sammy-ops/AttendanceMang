import { useState, useEffect, useMemo, useRef, useReducer } from "react";

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload }];
    case "update":
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    case "delete":
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);


const totalTodos = useMemo(() => todos.length, [todos]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (editId) {
      dispatch({ type: "update", payload: { id: editId, text } });
      setEditId(null);
    } else {
      dispatch({ type: "add", payload: text });
    }
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          📝 Todo List (CRUD)
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* List */}
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet</p>
        ) : (
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <span>{todo.text}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setText(todo.text);
                      setEditId(todo.id);
                      inputRef.current.focus();
                    }}
                    className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch({ type: "delete", payload: todo.id })}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Total Tasks: <span className="font-semibold">{totalTodos}</span>
        </p>
      </div>
    </div>
  );
}
