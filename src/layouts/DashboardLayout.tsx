import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";
import { LayoutDashboard, Calendar, Settings, Clock, Search, Plus } from "lucide-react";
import { LogoMarkSvg } from "../components/CallyComponents";

function clsx(...args: any[]) {
  return args.filter(Boolean).join(" ");
}

export function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className={clsx('flex', 'h-screen', 'w-screen', 'items-center', 'justify-center', 'bg-[#FDFBF2]', 'bg-[radial-gradient(#E4E1D4_1.5px,transparent_1.5px)]', 'bg-[length:24px_24px]')}>
        <div className={clsx('w-12', 'h-12', 'rounded-full', 'border-4', 'border-[#171614]', 'border-t-transparent', 'animate-spin')}></div>
      </div>
    );
  }

  const navItems = [
    { name: "Event Types", path: "/dashboard", icon: Clock },
    { name: "Bookings", path: "/dashboard/bookings", icon: Calendar },
    { name: "Availability", path: "/dashboard/availability", icon: LayoutDashboard },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className={clsx('flex', 'h-screen', 'bg-[#FDFBF2]', 'bg-[radial-gradient(#E4E1D4_1.5px,transparent_1.5px)]', 'bg-[length:24px_24px]', 'overflow-hidden')}>
      {/* Sidebar with thin right border */}
      <aside className={clsx('w-64', 'border-r', 'border-[#E4E1D4]', 'bg-white', 'flex', 'flex-col', 'justify-between')}>
        <div>
          {/* Logo container with thin bottom border */}
          <div className={clsx('h-16', 'border-b', 'border-[#E4E1D4]', 'bg-[#F3E75B]', 'flex', 'items-center', 'px-6')}>
            <Link to="/" className={clsx('flex', 'items-center', 'gap-3', 'font-cal-sans', 'text-2xl', 'font-bold', 'tracking-tight', 'text-[#171614]')}>
              <div className={clsx('w-[34px]', 'h-[34px]', 'bg-[#171614]', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'flex-shrink-0')}>
                <LogoMarkSvg />
              </div>
              <span className={clsx('logo-text', 'font-cal-sans', 'text-lg', 'font-bold', 'tracking-wide', 'text-[#171614]')}>
                CALLY
              </span>
            </Link>
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
        <div className={clsx('p-4', 'border-t', 'border-[#E4E1D4]', 'bg-[#FDFBF2]', 'flex', 'items-center', 'justify-between')}>
          <div className={clsx('flex', 'items-center', 'gap-3')}>
            <UserButton showName />
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className={clsx('flex-1', 'flex', 'flex-col', 'overflow-hidden')}>
        {/* Top Header with thin bottom border */}
        <header className={clsx('h-16', 'border-b', 'border-[#E4E1D4]', 'bg-white', 'flex', 'items-center', 'justify-between', 'px-8')}>
          <h2 className={clsx('font-cal-sans', 'text-lg', 'font-bold', 'text-[#171614]', 'uppercase', 'tracking-wider')}>
            {navItems.find((n) => n.path === location.pathname)?.name || "Dashboard"}
          </h2>
          {location.pathname === "/dashboard" && (
            <div className={clsx('flex', 'items-center', 'gap-4')}>
              <div className={clsx('relative', 'w-64')}>
                <Search className={clsx('absolute', 'left-3', 'top-1/2', '-translate-y-1/2', 'w-4', 'h-5', 'text-[#171614]', 'opacity-70')} />
                <input
                  type="text"
                  placeholder="Search event types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={clsx('w-full', 'pl-9', 'pr-4', 'py-2', 'border', 'border-[#E4E1D4]', 'rounded-xl', 'text-xs', 'bg-white', 'focus:outline-none', 'focus:border-[#B7ACF7]', 'transition-all', 'font-semibold', 'text-[#171614]', 'placeholder-[#2B2A27]/60')}
                />
              </div>
              <button className={clsx('flex', 'items-center', 'justify-center', 'gap-1.5', 'bg-[#171614]', 'text-[#FDFBF2]', 'text-xs', 'font-bold', 'px-4', 'py-2', 'rounded-xl', 'border', 'border-[#171614]', 'shadow-[2px_2px_0_rgba(23,22,20,0.15)]', 'hover:translate-x-[-1px]', 'hover:translate-y-[-1px]', 'hover:shadow-[3px_3px_0_rgba(23,22,20,0.2)]', 'transition-all', 'cursor-pointer')}>
                <Plus className={clsx('w-3.5', 'h-3.5', 'stroke-[3]')} />
                Create Event Type
              </button>
            </div>
          )}
        </header>
        <main className={clsx('flex-1', 'overflow-y-auto', 'p-8')}>
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </main>
      </div>
    </div>
  );
}
