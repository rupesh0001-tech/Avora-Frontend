import React from "react";
import { Check } from "lucide-react";

interface AppearanceTabProps {
  appearance: string;
  onSave: (layout: string) => void;
}

export function AppearanceTab({ appearance, onSave }: AppearanceTabProps) {
  return (
    <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
      <div>
        <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Appearance Layouts</h3>
        <p className="text-xs text-[#2B2A27]/60 font-semibold mt-1">Select 3-4 options of the form layout design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Classic Neo-brutalist */}
        <button
          type="button"
          onClick={() => onSave("classic")}
          className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
            appearance === "classic"
              ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
              : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-[#171614]">⚡ Neo-Brutalist Classic</span>
            {appearance === "classic" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
          </div>
          <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Thick black borders, high contrast palettes, and heavy retro shadow effects.</p>
        </button>

        {/* Minimalist Modern */}
        <button
          type="button"
          onClick={() => onSave("minimal")}
          className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
            appearance === "minimal"
              ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
              : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-[#171614]">✨ Modern Minimalist</span>
            {appearance === "minimal" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
          </div>
          <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Subtle grey margins, warm typography, and no block shadows. Pure elegance.</p>
        </button>

        {/* Dark Mode Glass */}
        <button
          type="button"
          onClick={() => onSave("dark")}
          className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
            appearance === "dark"
              ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
              : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-[#171614]">🕶 Dark Mode Glass</span>
            {appearance === "dark" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
          </div>
          <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Translucent dark layout panels, glow effects, and modern workspace gradients.</p>
        </button>

        {/* Sage Cozy */}
        <button
          type="button"
          onClick={() => onSave("sage")}
          className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
            appearance === "sage"
              ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
              : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-[#171614]">🌿 Cozy Sage</span>
            {appearance === "sage" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
          </div>
          <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Soft sage green outlines, organic rounded corners, and pastel background colors.</p>
        </button>
      </div>
    </div>
  );
}

export default AppearanceTab;
