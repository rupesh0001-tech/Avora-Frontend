import React from "react";

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
          {(Object.keys(profile.days) as Array<keyof typeof profile.days>).map((day) => (
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
export default HeroLaptop;
