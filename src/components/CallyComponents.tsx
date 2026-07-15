import React, { useState } from "react";

// Logo SVG component
export function LogoMarkSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
      <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="#F3E75B" />
    </svg>
  );
}

// ----------------- NAVBAR -----------------
export function CallyNavbar() {
  return (
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
          <a href="#cta" className="inline-flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full border-2 border-[#171614] bg-[#171614] text-[#FDFBF2] shadow-[3px_3px_0_#171614] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#171614] transition-all">
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

// ----------------- HERO MOCKUPS & DATA -----------------
export interface Event {
  time: string;
  title: string;
  type: "mint" | "violet" | "ghost";
}

export const PROFILE_SCHEDULES: Record<string, { url: string; title: string; days: Record<string, Event[]> }> = {
  priya: {
    url: "cally.so/priya-shah",
    title: "Priya Shah",
    days: {
      MON: [
        { time: "9:00 AM", title: "Product Demo", type: "mint" },
        { time: "11:30 AM", title: "1:1 Sarah", type: "ghost" }
      ],
      TUE: [
        { time: "10:00 AM", title: "Design Review", type: "violet" },
        { time: "2:00 PM", title: "Client Call", type: "ghost" }
      ],
      WED: [
        { time: "9:30 AM", title: "Team Sync", type: "ghost" },
        { time: "1:00 PM", title: "Onboarding", type: "mint" }
      ],
      THU: [
        { time: "11:00 AM", title: "Investor Call", type: "violet" }
      ],
      FRI: [
        { time: "9:00 AM", title: "Standup", type: "ghost" },
        { time: "3:00 PM", title: "Demo", type: "mint" }
      ]
    }
  },
  alex: {
    url: "cally.so/alex-rivera",
    title: "Alex Rivera",
    days: {
      MON: [
        { time: "10:00 AM", title: "Design Critique", type: "violet" },
        { time: "4:00 PM", title: "Dev Handover", type: "mint" }
      ],
      TUE: [
        { time: "9:00 AM", title: "Client Kickoff", type: "mint" },
        { time: "1:30 PM", title: "1:1 Tech Lead", type: "ghost" }
      ],
      WED: [
        { time: "11:00 AM", title: "Review Board", type: "violet" }
      ],
      THU: [
        { time: "10:30 AM", title: "Planning Sync", type: "ghost" },
        { time: "3:00 PM", title: "Design Session", type: "violet" }
      ],
      FRI: [
        { time: "10:00 AM", title: "All-Hands", type: "ghost" },
        { time: "2:30 PM", title: "Portfolio Prep", type: "mint" }
      ]
    }
  },
  sarah: {
    url: "cally.so/sarah-chen",
    title: "Sarah Chen",
    days: {
      MON: [
        { time: "9:30 AM", title: "Standup Sync", type: "ghost" }
      ],
      TUE: [
        { time: "11:00 AM", title: "API Refactoring", type: "violet" },
        { time: "3:00 PM", title: "PR Reviews", type: "mint" }
      ],
      WED: [
        { time: "10:00 AM", title: "Database Migration", type: "mint" },
        { time: "4:00 PM", title: "System Audit", type: "ghost" }
      ],
      THU: [
        { time: "9:00 AM", title: "Architect Align", type: "violet" }
      ],
      FRI: [
        { time: "11:30 AM", title: "Retrospective", type: "ghost" },
        { time: "4:00 PM", title: "Feature Deploy", type: "mint" }
      ]
    }
  }
};

export function HeroLaptop({ activeProfile }: { activeProfile: string }) {
  const profile = PROFILE_SCHEDULES[activeProfile] || PROFILE_SCHEDULES.priya;

  return (
    <div className="absolute left-0 top-[70px] w-full md:w-[640px] max-w-full md:max-w-[64%] z-2">
      <div className="bg-[#141311] border-[7px] border-[#171614] rounded-t-[18px] rounded-b-[4px] px-3.5 md:px-[18px] py-4 h-[370px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] flex flex-col">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex gap-1.25">
            <span className="w-2 h-2 rounded-full bg-[#3a3835]"></span>
            <span className="w-2 h-2 rounded-full bg-[#3a3835]"></span>
            <span className="w-2 h-2 rounded-full bg-[#3a3835]"></span>
          </div>
          <span className="flex-1 bg-[#232220] rounded-lg px-3.5 py-1.5 text-[10.5px] text-[#9a9686] font-semibold">{profile.url}</span>
        </div>
        <div className="flex justify-between items-baseline mb-3">
          <h4 className="text-white text-[15px] font-semibold">Your Week</h4>
          <span className="text-[#7a766a] text-[11px] font-semibold">Jul 13 – Jul 17</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-2.5 overflow-y-auto flex-1">
          {(Object.keys(profile.days) as Array<keyof typeof profile.days>).map((day, index) => (
            <div key={day} className="bg-[#1c1b19] rounded-xl px-1.5 md:px-1.75 py-2.25 flex flex-col gap-1.75 min-h-[230px]">
              <div className="text-[10.5px] font-bold text-[#cfcabb] text-center mb-0.5">{day}</div>
              {profile.days[day].map((ev, i) => (
                <div 
                  key={i} 
                  className={`rounded-[7px] px-1.5 py-1.75 text-[9.5px] font-bold leading-[1.35] ${
                    ev.type === "mint"
                      ? "bg-[#7CEFC0] text-[#171614]"
                      : ev.type === "violet"
                      ? "bg-[#8C7CF0] text-white"
                      : "bg-[#2a2926] text-[#cfcabb] font-semibold"
                  }`}
                >
                  {ev.time}
                  <br />
                  {ev.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[114%] ml-[-7%] h-3.5 bg-[#171614] [clip-path:polygon(3%_0,97%_0,100%_100%,0_100%)]"></div>
    </div>
  );
}

export function HeroPhone() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Product Demo", time: "9:00 AM", completed: true },
    { id: 2, text: "Design Review", time: "11:30 AM", completed: false },
    { id: 3, text: "Client Call", time: "2:00 PM", completed: false }
  ]);

  const completedCount = tasks.filter(t => t.completed).length;
  const pct = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="absolute rounded-[34px] border-[6px] border-[#171614] bg-[#2B2A27] shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden right-[1%] bottom-0 w-[280px] h-[440px] z-4 left-auto top-auto transform-none">
      <div className="flex items-center justify-between px-4.5 pt-3.5 text-[11px] font-bold text-white">
        <span>9:41</span>
        <div className="flex gap-1.25">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
        </div>
      </div>
      <div className="px-4.5 pt-5 text-white">
        <h4 className="text-xl leading-1.2 font-semibold text-white">This Week's Bookings</h4>
        <div className="mt-4 bg-[#7CEFC0] text-[#171614] rounded-2xl px-4 py-3.5">
          <div className="text-[26px] font-bold font-cal-sans">{pct}%</div>
          <div className="text-[10px] font-semibold opacity-75">Week Booked</div>
          <div className="h-1.5 bg-[#171614]/20 rounded-md mt-2.5 overflow-hidden">
            <i className="block h-full bg-[#171614] rounded-md" style={{ width: `${pct}%`, transition: "width 0.4s ease" }}></i>
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] font-bold">
            <span>{tasks.length - completedCount} slots left</span>
            <span>✦</span>
          </div>
        </div>
        <div className="flex gap-2.5 mt-3.5">
          <div className="flex-1 bg-[#232220] rounded-[14px] px-3 py-2.5">
            <div className="text-xl font-bold font-cal-sans text-white">12</div>
            <div className="text-[9px] opacity-65 mt-0.5">Meetings</div>
          </div>
          <div className="flex-1 bg-[#232220] rounded-[14px] px-3 py-2.5">
            <div className="text-xl font-bold font-cal-sans text-white">0</div>
            <div className="text-[9px] opacity-65 mt-0.5">No-Shows</div>
          </div>
        </div>
        <div className="mt-4 text-xs font-bold text-white/80">
          Next Up (Click to toggle)
          <div className="space-y-1.5 mt-2">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className="flex items-center gap-3 w-full text-left bg-[#232220] border border-[#3a3835] hover:border-[#7CEFC0]/30 text-white px-3 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <span className={`w-4 h-4 rounded-[5px] border-2 border-white shrink-0 flex items-center justify-center ${t.completed ? "bg-[#7CEFC0] border-[#171614]" : "bg-transparent"}`}>
                  {t.completed && <span className="text-[10px] font-black text-[#171614]">✓</span>}
                </span>
                <span className={t.completed ? "line-through opacity-55" : ""}>
                  {t.text} · {t.time}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatPhone() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const selectSlot = (time: string) => {
    if (isTyping) return;
    setSelectedTime(time);
    setIsTyping(true);

    // Simulate typing dynamic delay
    setTimeout(() => {
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="absolute left-[50%] top-0 -translate-x-1/2 w-[300px] h-[500px] bg-gradient-to-br from-[#232220] to-[#0b0b0a] border-[6px] border-[#3a3835] rounded-[34px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="flex items-center justify-between px-4.5 pt-3.5 text-[11px] font-bold text-white">
        <span>9:41</span>
        <div className="flex gap-1.25">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
        </div>
      </div>
      <div className="px-4.5 pt-5 text-left text-white">
        <p className="text-[12px] font-semibold text-white mb-2">
          ✦ Pick a time that works for you. Priya is available:
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={() => selectSlot("9:00 AM")}
            disabled={isTyping}
            className={`text-[10px] font-bold bg-[#2a2926] px-3 py-1.75 rounded-full flex items-center gap-1.25 border-none cursor-pointer transition-all ${
              selectedTime === "9:00 AM" ? "bg-[#8C7CF0] text-white" : "text-white"
            }`}
          >
            🕐 9:00 AM
          </button>
          <button
            onClick={() => selectSlot("11:30 AM")}
            disabled={isTyping}
            className={`text-[10px] font-bold bg-[#2a2926] px-3 py-1.75 rounded-full flex items-center gap-1.25 border-none cursor-pointer transition-all ${
              selectedTime === "11:30 AM" ? "bg-[#8C7CF0] text-white" : "text-white"
            }`}
          >
            🕐 11:30 AM
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={() => selectSlot("2:00 PM")}
            disabled={isTyping}
            className={`text-[10px] font-bold bg-[#2a2926] px-3 py-1.75 rounded-full flex items-center gap-1.25 border-none cursor-pointer transition-all ${
              selectedTime === "2:00 PM" ? "bg-[#8C7CF0] text-white" : "text-white"
            }`}
          >
            🕐 2:00 PM
          </button>
          <button
            onClick={() => selectSlot("4:30 PM")}
            disabled={isTyping}
            className={`text-[10px] font-bold bg-[#2a2926] px-3 py-1.75 rounded-full flex items-center gap-1.25 border-none cursor-pointer transition-all ${
              selectedTime === "4:30 PM" ? "bg-[#8C7CF0] text-white" : "text-white"
            }`}
          >
            🕐 4:30 PM
          </button>
        </div>

        <div className="mt-3 bg-[#2a2926] rounded-t-xl rounded-bl-xl rounded-br-[2px] px-3 py-2.25 text-[11px] ml-[30%] text-white">
          Booking a 30-min product demo — do you have anything free tomorrow morning?
        </div>

        {selectedTime && (
          <div className="mt-3 bg-[#2a2926] rounded-t-xl rounded-bl-xl rounded-br-[2px] px-3 py-2.25 text-[11px] ml-[30%] text-white">
            {selectedTime} works great for me, let's lock that in.
          </div>
        )}

        {isTyping ? (
          <div className="mt-2.5 bg-[#7CEFC0] text-[#171614] rounded-t-xl rounded-br-xl rounded-bl-[2px] px-3 py-2.25 text-[11px] inline-flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        ) : (
          selectedTime && (
            <>
              <div className="mt-2.5 bg-[#7CEFC0] text-[#171614] rounded-t-xl rounded-br-xl rounded-bl-[2px] px-3 py-2.25 text-[11px] max-w-[80%]">
                Done! Confirmed for {selectedTime} and added to both calendars automatically.
              </div>
              <div className="mt-3 bg-[#2a2926] rounded-xl px-3 py-2 text-[10.5px] font-bold flex items-center gap-2 text-white">
                <span className="w-4 h-4 rounded-full bg-[#7CEFC0] shrink-0"></span> Product Demo · {selectedTime}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

// ----------------- FOOTER -----------------
export function CallyFooter() {
  return (
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
            <p className="mt-3 text-[13.5px] opacity-60 max-w-[220px] leading-1.6">Scheduling infrastructure for everyone.</p>
          </div>
          <div>
            <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Product</h4>
            <ul className="list-none p-0">
              <li className="mb-2.5 text-sm opacity-85"><a href="#features" className="hover:opacity-65 transition-all text-[#FDFBF2]">Features</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2]">Integrations</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2]">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Company</h4>
            <ul className="list-none p-0">
              <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2]">About</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2]">Blog</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="#" className="hover:opacity-65 transition-all text-[#FDFBF2]">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] uppercase tracking-wider opacity-55 mb-4 font-bold text-white/70">Social</h4>
            <ul className="list-none p-0">
              <li className="mb-2.5 text-sm opacity-85"><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2]">Twitter</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2]">GitHub</a></li>
              <li className="mb-2.5 text-sm opacity-85"><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-65 transition-all text-[#FDFBF2]">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/12 text-center text-[12.5px] opacity-50">© {new Date().getFullYear()} Cally. Open scheduling for everyone.</div>
      </div>
    </footer>
  );
}
