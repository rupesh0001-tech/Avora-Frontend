import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";
import { useEffect } from "react";
import { LayoutDashboard, Calendar, Settings, Clock } from "lucide-react";

export function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-canvas">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
    <div className="flex h-screen bg-surface-soft overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-hairline bg-canvas flex flex-col justify-between">
        <div>
          <div className="h-16 border-b border-hairline flex items-center px-6">
            <Link to="/" className="font-cal-sans text-2xl font-bold tracking-tight text-ink">
              avora<span className="text-brand-accent">.</span>
            </Link>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-surface-card text-ink"
                      : "text-muted hover:text-ink hover:bg-surface-soft"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-hairline flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" showName />
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-hairline bg-canvas flex items-center justify-between px-8">
          <h2 className="font-cal-sans text-xl font-bold text-ink">
            {navItems.find((n) => n.path === location.pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <a
              href="https://dashboard.clerk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-ink transition-colors border border-hairline px-3 py-1.5 rounded-md"
            >
              Clerk Dashboard
            </a>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
