import React, { useState } from "react";

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
export default HeroPhone;
