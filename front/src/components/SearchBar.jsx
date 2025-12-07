import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, delay = 500 }) {
  const [q, setQ] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(q);
    }, delay);

    return () => clearTimeout(timer);
  }, [q, delay]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative w-full flex justify-center mb-8 ">
      <div
        className="
          relative w-[50%] group
          transition-all duration-300
          shadow-lg backdrop-blur-sm
          group-focus-within:w-[70%]
        "
      >
        {/* Search Icon */}
        <Search
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-gray-400 
            group-focus-within:text-blue-400
            transition-colors duration-300
            
          "
          size={20}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search posts..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="
            w-full pl-10 pr-4 py-3 rounded-xl
            bg-transparent
            border border-gray-700 
            text-gray-200 placeholder-gray-400

            

            hover:border-blue-500/40 
            hover:shadow-blue-500/10

            focus:outline-none
            focus:ring-2 focus:ring-blue-500/40
            focus:border-blue-400
            focus:shadow-blue-500/20

            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}
