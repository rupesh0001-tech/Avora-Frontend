import { Link, Outlet } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";
import { LogoMarkSvg } from "../components/CallyComponents";

export function PublicLayout() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF2]">
      {/* Cally Header/Navbar */}
      <header className="bg-[#F3E75B] py-5 px-2.5 border-b-2 border-[#171614]">
        <div className="max-w-[1180px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] bg-[#171614] rounded-xl flex items-center justify-center shrink-0">
              <LogoMarkSvg />
            </div>
            <div className="leading-[1.15]">
              <div className="font-cal-sans font-bold text-[19px] tracking-wide text-[#171614]">CALLY</div>
              <div className="text-[12px] font-medium text-[#2B2A27]/75">Scheduling, Simplified</div>
            </div>
          </div>
          <nav className="flex items-center gap-9 font-semibold text-[15px] text-[#171614]">
            <a href="#features" className="opacity-85 hover:opacity-100 transition-opacity">Features</a>
            <a href="#how" className="opacity-85 hover:opacity-100 transition-opacity">How It Works</a>
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="text-sm font-bold uppercase tracking-wider text-[#171614] hover:opacity-100 opacity-85 transition-opacity">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold uppercase tracking-wider text-[#171614] hover:opacity-100 opacity-85 transition-opacity">
                  Sign in
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full border-2 border-[#171614] bg-[#171614] text-[#FDFBF2] shadow-[3px_3px_0_#171614] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#171614] transition-all">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 bg-[#FDFBF2] bg-[radial-gradient(#E4E1D4_1.5px,transparent_1.5px)] bg-[length:24px_24px]">
        <Outlet />
      </main>

      {/* Cally Footer */}
      <footer className="bg-[#171614] text-[#FDFBF2] py-16 px-0 pb-7">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-[30px] text-left">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] bg-[#7CEFC0] rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                    <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="none" stroke="#171614" strokeWidth="2" />
                  </svg>
                </div>
                <div className="leading-[1.15]">
                  <div className="font-cal-sans font-bold text-[19px] tracking-wide text-white">Cally</div>
                </div>
              </div>
              <p className="mt-3 text-[13.5px] opacity-60 max-w-[220px] leading-1.6 text-[#FDFBF2]">Scheduling infrastructure for everyone.</p>
            </div>
            <div>
              <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Product</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2.5 text-sm opacity-85"><a href="#features" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Features</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Integrations</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Company</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">About</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Blog</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Social</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2.5 text-sm opacity-85"><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">Twitter</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">GitHub</a></li>
                <li className="mb-2.5 text-sm opacity-85"><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2] no-underline">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-white/12 text-center text-[12.5px] opacity-50">© {new Date().getFullYear()} Cally. Open scheduling for everyone.</div>
        </div>
      </footer>
    </div>
  );
}
