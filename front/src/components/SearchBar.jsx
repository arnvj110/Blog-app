import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  return (
    <input
      type="text"
      className="w-full p-2 border rounded"
      placeholder="Search posts..."
      value={q}
      onChange={(e) => {
        setQ(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
