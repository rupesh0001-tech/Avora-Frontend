import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: any;
  label: string;
}

export interface SelectProps {
  value: any;
  onChange: (val: any) => void;
  options: SelectOption[];
  className?: string;
  size?: "sm" | "md";
}

export function Select({ value, onChange, options, className = "", size = "md" }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-full h-full border border-[#E4E1D4] rounded-xl bg-white font-bold text-[#171614] text-left flex justify-between items-center hover:bg-[#FDFBF2] transition-all cursor-pointer ${
          size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
        }`}
      >
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <ChevronDown className={`text-[#2B2A27]/60 shrink-0 ${size === "sm" ? "w-3.5 h-3.5 ml-1" : "w-4 h-4 ml-2"}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E1D4] rounded-xl shadow-lg z-30 py-1 font-semibold text-[#171614] max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left hover:bg-[#7CEFC0]/20 hover:text-[#171614] transition-colors cursor-pointer ${
                size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
