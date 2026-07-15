import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF2] bg-[radial-gradient(#E4E1D4_1.5px,transparent_1.5px)] bg-[length:24px_24px]">
      {/* Mini Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b-2 border-[#171614] bg-white">
        <Link to="/" className="flex items-center gap-3 font-cal-sans text-2xl font-bold tracking-tight text-[#171614]">
          <div className="w-[34px] h-[34px] bg-[#171614] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
              <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="#F3E75B" />
            </svg>
          </div>
          <span className="logo-text font-cal-sans text-lg font-bold tracking-wide text-[#171614]">
            CALLY
          </span>
        </Link>
        <Link 
          to="/" 
          className="text-xs font-bold text-[#171614] bg-white hover:bg-[#F3E75B] transition-all border-2 border-[#171614] px-4 py-2 rounded-xl shadow-[2px_2px_0_#171614] hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          Back to Home
        </Link>
      </header>

      {/* Auth container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="bg-white border-2 border-[#171614] rounded-2xl p-4 shadow-[6px_6px_0_#171614] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#171614] transition-all">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
