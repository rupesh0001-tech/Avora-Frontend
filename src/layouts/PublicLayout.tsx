import { Link, Outlet } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";

export function PublicLayout() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-body">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 h-16 border-b border-hairline bg-canvas/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-cal-sans text-2xl font-bold tracking-tight text-ink">
              avora<span className="text-brand-accent">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-sm font-medium hover:text-ink transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-ink transition-colors">
              Pricing
            </Link>
            <Link to="/integrations" className="text-sm font-medium hover:text-ink transition-colors">
              Integrations
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-ink hover:text-primary-active transition-all"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-ink hover:text-primary-active transition-all"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-active transition-all"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Dark Footer */}
      <footer className="bg-surface-dark text-on-dark-soft py-16 px-6 border-t border-surface-dark-elevated">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-cal-sans text-2xl font-bold text-white">
              avora<span className="text-brand-accent">.</span>
            </span>
            <p className="mt-4 text-sm text-on-dark-soft">
              Smarter, simpler scheduling for everyone. Built with design precision.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">For Sales</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">For Recruiting</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">For Education</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-surface-dark-elevated text-xs flex justify-between">
          <p>© {new Date().getFullYear()} Avora Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
