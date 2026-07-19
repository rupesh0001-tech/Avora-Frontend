import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/react";
import { Clock, Calendar, LayoutDashboard, Settings } from "lucide-react";
import { Logo } from "../ui/Logo";
import clsx from "clsx";


export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Event Types", path: "/dashboard", icon: Clock },
    { name: "Bookings", path: "/dashboard/bookings", icon: Calendar },
    { name: "Availability", path: "/dashboard/availability", icon: LayoutDashboard },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className={clsx('w-64', 'border-r', 'border-[#E4E1D4]', 'bg-white', 'flex', 'flex-col', 'justify-between')}>
      <div>
        {/* Logo container with thin bottom border */}
        <div className={clsx('h-16', 'border-b', 'border-[#E4E1D4]', 'bg-[#F3E75B]', 'flex', 'items-center', 'px-6')}>
          <Logo />
        </div>
        <nav className={clsx('p-4', 'space-y-2.5')}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  isActive
                    ? "bg-[#7CEFC0] text-[#171614] border-[#171614]/15 translate-x-[-1px] translate-y-[-1px] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                    : "text-[#2B2A27] border-transparent hover:border-[#171614]/15 hover:bg-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                }`}
              >
                <Icon className={clsx('h-4', 'w-4', 'stroke-[2.5]')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer profile container with thin top border */}
      <div className={clsx('p-4', 'border-t', 'border-[#E4E1D4]', 'bg-[#FDFBF2]', 'flex', 'items-center', 'justify-end', 'text-8xl', 'font-semibold')}>
        <div className={clsx('flex', 'items-center', 'gap-2', 'justify-between')}>
          <UserButton showName />
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
