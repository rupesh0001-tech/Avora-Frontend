import { Link, Outlet } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";
import { LogoMarkSvg } from "../components/CallyComponents";

export function PublicLayout() {
  const { isSignedIn } = useAuth();

  return (
    <div className="cally-landing-body min-h-screen flex flex-col">
      {/* Cally Header/Navbar */}
      <header className="nav">
        <div className="container nav-inner">
          <div className="logo">
            <div className="logo-mark">
              <LogoMarkSvg />
            </div>
            <div className="logo-text">
              <div className="name">CALLY</div>
              <div className="tag">Scheduling, Simplified</div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="text-sm font-semibold uppercase tracking-wider text-[#171614] hover:opacity-100 opacity-80 transition-opacity">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold uppercase tracking-wider text-[#171614] hover:opacity-100 opacity-80 transition-opacity">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-dark nav-cta">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Cally Footer */}
      <footer>
        <div className="container">
          <div className="footer-top text-left">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-mark">
                  <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                    <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="#171614"/>
                  </svg>
                </div>
                <div className="logo-text">
                  <div className="name">Cally</div>
                </div>
              </div>
              <p>Scheduling infrastructure for everyone.</p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4>Social</h4>
              <ul>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">© {new Date().getFullYear()} Cally. Open scheduling for everyone.</div>
        </div>
      </footer>
    </div>
  );
}
