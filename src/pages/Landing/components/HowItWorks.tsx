import React from "react";
import { ChatPhone } from "./ChatPhone";

export function HowItWorks() {
  return (
    <section className="bg-[#171614] text-[#FDFBF2] py-28" id="how">
      <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-[60px] items-center">
        <div className="text-left">
          <h2 className="text-[26px] md:text-[38px] font-bold uppercase mb-[44px] text-white">How Cally works?</h2>
          <div className="flex gap-5 mb-[34px]">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center font-bold font-cal-sans text-[15px] shrink-0 bg-[#8C7CF0] border-2 border-[#8C7CF0] text-white">01</div>
            <div>
              <h3 className="text-base font-bold uppercase mb-2 tracking-wide text-white">Share your booking link</h3>
              <p className="text-sm leading-1.6 opacity-70 max-w-[360px]">Send your personal link via email, Slack, or embed it on your own website. No signup required to book.</p>
            </div>
          </div>
          <div className="flex gap-5 mb-[34px]">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center font-bold font-cal-sans text-[15px] shrink-0 bg-[#FDFBF2] text-[#171614] border-2 border-[#FDFBF2]">02</div>
            <div>
              <h3 className="text-base font-bold uppercase mb-2 tracking-wide text-white">They pick a time</h3>
              <p className="text-sm leading-1.6 opacity-70 max-w-[360px]">Invitees see your real-time availability across all connected calendars and book instantly — no back and forth.</p>
            </div>
          </div>
          <div className="flex gap-5 mb-[34px]">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center font-bold font-cal-sans text-[15px] shrink-0 bg-[#8C7CF0] border-2 border-[#8C7CF0] text-white">03</div>
            <div>
              <h3 className="text-base font-bold uppercase mb-2 tracking-wide text-white">It's on every calendar</h3>
              <p className="text-sm leading-1.6 opacity-70 max-w-[360px]">Cally confirms the meeting and syncs it automatically, with reminders sent so nobody forgets.</p>
            </div>
          </div>
        </div>
        <div className="relative h-[520px] mt-10 md:mt-0 md:block hidden">
          <div className="absolute w-[34px] h-[34px] border-[5px] border-[#8C7CF0] rounded-full top-5 right-[6%] opacity-90"></div>
          <div className="absolute w-[90px] h-[90px] bg-[radial-gradient(#FDFBF2_1.6px,transparent_1.6px)] bg-[length:12px_12px] opacity-50 bottom-2.5 right-0"></div>

          {/* Interactive Chat Phone Component */}
          <ChatPhone />
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
