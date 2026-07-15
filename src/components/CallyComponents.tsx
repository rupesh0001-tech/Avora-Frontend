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
          <a href="#cta" className="btn btn-dark nav-cta">Get Started</a>
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
    <div className="laptop">
      <div className="laptop-screen">
        <div className="browser-bar">
          <span className="dots"><span></span><span></span><span></span></span>
          <span className="url">{profile.url}</span>
        </div>
        <div className="cal-head">
          <h4>Your Week</h4>
          <span>Jul 13 – Jul 17</span>
        </div>
        <div className="cal-grid">
          {(Object.keys(profile.days) as Array<keyof typeof profile.days>).map((day, index) => (
            <div key={day} className="cal-col">
              <div className="day-lbl">{day}</div>
              {profile.days[day].map((ev, i) => (
                <div key={i} className={`cal-event ${ev.type}`}>
                  {ev.time}
                  <br />
                  {ev.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="laptop-base-shape"></div>
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
    <div className="phone phone-center">
      <div className="phone-status">
        <span>9:41</span>
        <span className="dots"><span></span><span></span><span></span></span>
      </div>
      <div className="center-inner">
        <h4>This Week's Bookings</h4>
        <div className="progress-card">
          <div className="pct">{pct}%</div>
          <div className="lbl">Week Booked</div>
          <div className="progress-bar">
            <i style={{ width: `${pct}%`, transition: "width 0.4s ease" }}></i>
          </div>
          <div className="progress-foot">
            <span>{tasks.length - completedCount} slots left</span>
            <span>✦</span>
          </div>
        </div>
        <div className="stat-pair">
          <div className="stat-box">
            <div className="num">12</div>
            <div className="lbl">Meetings</div>
          </div>
          <div className="stat-box">
            <div className="num">0</div>
            <div className="lbl">No-Shows</div>
          </div>
        </div>
        <div className="today">
          Next Up (Click to toggle)
          <div className="space-y-1.5 mt-2">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className="task-row w-full text-left bg-[#232220] border border-[#3a3835] text-white p-2.5 rounded-xl flex items-center gap-3 transition-colors cursor-pointer hover:border-cally-mint/30"
                style={{ fontFamily: "inherit" }}
              >
                <span className={`task-check flex-shrink-0 ${t.completed ? "on" : ""}`}></span>
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
    <div className="phone phone-center">
      <div className="phone-status" style={{ color: "#fff" }}>
        <span>9:41</span>
        <span className="dots"><span></span><span></span><span></span></span>
      </div>
      <div className="center-inner" style={{ textAlign: "left" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", color: "#fff", marginBottom: "8px" }}>
          ✦ Pick a time that works for you. Priya is available:
        </p>
        <div className="chip-row">
          <button
            onClick={() => selectSlot("9:00 AM")}
            disabled={isTyping}
            className={`chip cursor-pointer transition-all ${selectedTime === "9:00 AM" ? "violet text-white" : "text-white"}`}
          >
            🕐 9:00 AM
          </button>
          <button
            onClick={() => selectSlot("11:30 AM")}
            disabled={isTyping}
            className={`chip cursor-pointer transition-all ${selectedTime === "11:30 AM" ? "violet text-white" : "text-white"}`}
          >
            🕐 11:30 AM
          </button>
        </div>
        <div className="chip-row">
          <button
            onClick={() => selectSlot("2:00 PM")}
            disabled={isTyping}
            className={`chip cursor-pointer transition-all ${selectedTime === "2:00 PM" ? "violet text-white" : "text-white"}`}
          >
            🕐 2:00 PM
          </button>
          <button
            onClick={() => selectSlot("4:30 PM")}
            disabled={isTyping}
            className={`chip cursor-pointer transition-all ${selectedTime === "4:30 PM" ? "violet text-white" : "text-white"}`}
          >
            🕐 4:30 PM
          </button>
        </div>

        <div className="msg-you" style={{ color: "#fff" }}>
          Booking a 30-min product demo — do you have anything free tomorrow morning?
        </div>

        {selectedTime && (
          <div className="msg-you" style={{ color: "#fff" }}>
            {selectedTime} works great for me, let's lock that in.
          </div>
        )}

        {isTyping ? (
          <div className="msg-buddy flex gap-1 items-center bg-cally-mint text-cally-ink" style={{ display: "inline-flex" }}>
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#171614] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        ) : (
          selectedTime && (
            <>
              <div className="msg-buddy">
                Done! Confirmed for {selectedTime} and added to both calendars automatically.
              </div>
              <div className="msg-plan text-white">
                <span className="dot"></span> Product Demo · {selectedTime}
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
  );
}
