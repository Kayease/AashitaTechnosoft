"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowDown01Icon, CheckmarkCircle01Icon } from "@hugeicons/react";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  border?: string; // Optional border color class for the left border (e.g. border-l-blue-400)
}

interface AdminDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
}

export default function AdminDropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
}: AdminDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 rounded-xl text-sm flex justify-between items-center
        bg-[#F6FAFF] border border-[#4DA3FF]/10 
        hover:border-[#4DA3FF]/30 transition-all duration-200 text-[#1E2A3A] font-medium focus:outline-none focus:border-[#4DA3FF] min-h-[46px]"
      >
        <div className="flex items-center gap-2 truncate text-left">
          {selectedOption?.icon}
          <span className="truncate block">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ArrowDown01Icon
          size={18}
          className={`transition-transform duration-300 text-[#6B7A90] ml-2 flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute mt-2 w-full bg-white rounded-2xl shadow-xl
        border border-[#4DA3FF]/10 transition-all duration-200 origin-top z-50 overflow-hidden
        ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer
                border-l-4 ${option.border || "border-transparent"}
                ${value === option.value ? "bg-[#F2F8FF]" : "hover:bg-[#F2F8FF]"}
                transition-all duration-150`}
            >
              <div className="flex items-center gap-2 text-[#1E2A3A] font-medium">
                {option.icon}
                {option.label}
              </div>

              {value === option.value && (
                <CheckmarkCircle01Icon size={16} className="text-[#4DA3FF]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
