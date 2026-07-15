import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  title: string;
  showActions?: boolean;
  searchQuery?: string;
  onSearchQueryChange?: (val: string) => void;
  onCreateClick?: () => void;
}

export function Header({
  title,
  showActions = false,
  searchQuery = "",
  onSearchQueryChange,
  onCreateClick,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-[#E4E1D4] bg-white flex items-center justify-between px-8">
      <h2 className="font-cal-sans text-lg font-bold text-[#171614] uppercase tracking-wider">
        {title}
      </h2>
      {showActions && (
        <div className="flex items-center gap-4">
          {onSearchQueryChange && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-5 text-[#171614] opacity-70" />
              <input
                type="text"
                placeholder="Search event types..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#E4E1D4] rounded-xl text-xs bg-white focus:outline-none focus:border-[#B7ACF7] transition-all font-semibold text-[#171614] placeholder-[#2B2A27]/60"
              />
            </div>
          )}
          <Button
            variant="primary"
            size="sm"
            rounded="xl"
            shadow="sm"
            onClick={onCreateClick}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3] mr-1.5" />
            Create Event Type
          </Button>
        </div>
      )}
    </header>
  );
}
export default Header;
