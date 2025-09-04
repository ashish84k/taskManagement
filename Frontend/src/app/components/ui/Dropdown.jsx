import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, options, selectedOption, onSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <button
        onClick={() => setOpen(!open)}
          type="button"  
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
