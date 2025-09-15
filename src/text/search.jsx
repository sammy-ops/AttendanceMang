// src/App.jsx (Final Step 6)
import React, { useEffect, useMemo, useState } from 'react'

// Our dataset
const items = [
  { name: 'Apple', id: 1, color: 'Red' },
  { name: 'Banana', id: 2, color: 'Yellow' },
  { name: 'Mango', id: 3, color: 'Orange' },
  { name: 'Blueberry', id: 4, color: 'Blue' },
  { name: 'Blackberry', id: 5, color: 'Black' }
]

// Escape RegExp special characters (so user input doesn’t break regex)
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Highlight query matches in text
function highlight(text, q) {
  if (!q) return text
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="bg-yellow-100 rounded px-0.5">{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

// Check if query matches ANY field of an item
function itemMatches(item, q) {
  return Object.values(item).join(' ').toLowerCase().includes(q)
}

export default function App() {
  const [query, setQuery] = useState('')             // user input
  const [debouncedQuery, setDebouncedQuery] = useState('') // delayed input

  // Debounce effect — wait 250ms after typing
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 250)
    return () => clearTimeout(id) // cleanup when query changes
  }, [query])

  // Only recalc results when debouncedQuery changes
  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    if (!q) return items
    return items.filter(item => itemMatches(item, q))
  }, [debouncedQuery])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Search demo (Final)</h1>

        {/* Search input with clear (×) button */}
        <label className="relative block mb-4">
          <input
            aria-label="Search items"
            className="w-full p-3 pr-10 border rounded"
            placeholder="Search name, id, color..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600"
            >
              ×
            </button>
          )}
        </label>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">Showing {results.length} result(s)</div>
          <div className="text-xs text-gray-400">(search is debounced)</div>
        </div>

        {/* Results list */}
        <ul className="space-y-2">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-gray-600">No results</li>
          ) : (
            results.map(item => (
              <li key={item.id} className="p-3 border rounded">
                <div className="font-medium">{highlight(item.name, debouncedQuery)}</div>
                <div className="text-sm text-gray-500">id: {item.id} • {item.color}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
