import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-soft">
      {/* Mini Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-hairline bg-canvas">
        <Link to="/" className="font-cal-sans text-2xl font-bold tracking-tight text-ink">
          avora<span className="text-brand-accent">.</span>
        </Link>
        <Link to="/" className="text-sm font-medium hover:text-ink transition-colors">
          Back to Home
        </Link>
      </header>

      {/* Auth container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
