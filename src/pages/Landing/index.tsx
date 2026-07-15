import React from "react";
import { HeroLaptop, HeroPhone, ChatPhone } from "../../components/CallyComponents";
import { useAuth } from "@clerk/react";
import { Navigate, useNavigate } from "react-router-dom";

function clsx(...args: any[]) {
  return args.filter(Boolean).join(" ");
}



function CallyHero() {
  const { isSignedIn, isLoaded } = useAuth();
const navigate = useNavigate()
  return (
    <section className={clsx('bg-[#F3E75B]', 'relative', 'py-[70px]', 'overflow-hidden')}>
      <div className={clsx('max-w-[820px]', 'mx-auto', 'px-8', 'text-center', 'relative', 'z-2')}>
        <span className={clsx('inline-flex', 'items-center', 'gap-1.5', 'text-[13px]', 'font-bold', 'tracking-wider', 'bg-[#171614]', 'text-[#F3E75B]', 'px-[18px]', 'py-2', 'rounded-full', 'mb-[26px]')}>
          ✦ Scheduling Infrastructure for Everyone
        </span>
        <h1 className={clsx('text-[34px]', 'md:text-[58px]', 'font-bold', 'leading-[1.08]', 'tracking-[-0.01em]', 'uppercase', 'text-[#171614]')}>
          Booking meetings with a <span className={clsx('inline-block', 'bg-[#7CEFC0]', 'text-[#171614]', 'px-[18px]', 'py-1', 'pb-2', 'rounded-xl', 'border-3', 'border-[#171614]', '-rotate-3', 'shadow-[6px_6px_0_#171614]', 'ml-1.5')}>WILD SIDE</span>
        </h1>
        <p className={clsx('mt-[26px]', 'text-[17px]', 'leading-1.6', 'text-[#2B2A27]', 'max-w-[640px]', 'mx-auto')}>
          Meet Cally — the open scheduling tool that ends back-and-forth emails. Share one link, let people book time that works, and get your calendar back.
        </p>

        <div className={clsx('mt-[34px]', 'flex', 'justify-center')}>
          <button 
            onClick={() => { 
              isSignedIn ? navigate('/dashboard') :  navigate('/login')
            } }
            className={clsx('inline-flex', 'items-center', 'gap-2', 'font-bold', 'text-[15px]', 'px-[26px]', 'py-3.5', 'rounded-full', 'border-2', 'border-[#171614]', 'transition-all', 'bg-[#171614]', 'text-[#FDFBF2]', 'shadow-[3px_3px_0_#171614]', 'hover:translate-x-[-2px]', 'hover:translate-y-[-2px]', 'hover:shadow-[5px_5px_0_#171614]')}
          >
            Create Your Link
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={clsx('w-4', 'h-4')}>
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-8')}>
        <div className={clsx('relative', 'max-w-[980px]', 'mx-auto', 'mt-16', 'h-[520px]')}>
          <div className={clsx('absolute', 'w-[90px]', 'h-[90px]', 'bg-[radial-gradient(#171614_1.6px,transparent_1.6px)]', 'bg-[length:12px_12px]', 'opacity-35', 'top-10', 'left-0')}></div>
          <div className={clsx('absolute', 'w-[90px]', 'h-[90px]', 'bg-[radial-gradient(#171614_1.6px,transparent_1.6px)]', 'bg-[length:12px_12px]', 'opacity-35', 'bottom-[70px]', 'right-5')}></div>
          <div className={clsx('absolute', 'w-[34px]', 'h-[34px]', 'border-[5px]', 'border-white', 'rounded-full', 'top-[70px]', 'left-[34%]', 'opacity-90')}></div>
          <div className={clsx('absolute', 'w-[60px]', 'h-[60px]', 'bg-white/35', 'rounded-lg', 'rotate-[18deg]', 'top-[190px]', 'left-[10%]')}></div>

          {/* Laptop Mockup Component */}
          <HeroLaptop activeProfile="priya" />

          {/* Phone Mockup Component */}
          <HeroPhone />
        </div>
      </div>
    </section>
  );
}

function CallyFeatures() {
  return (
    <section className={clsx('bg-[#FDFBF2]', 'py-28', 'px-0', 'text-center')} id="features">
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-8')}>
        <h2 className={clsx('text-[26px]', 'md:text-[38px]', 'font-bold', 'uppercase', 'tracking-[-0.01em]', 'text-[#171614]')}>
          Features that make booking effortless
        </h2>
        <p className={clsx('mt-3.5', 'text-[#2B2A27]', 'text-base')}>
          Cally isn't just another calendar app. It's scheduling infrastructure built for how you actually work.
        </p>
        <div className={clsx('mt-14', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6.5', 'text-left')}>
          <div className={clsx('bg-white', 'border-2', 'border-[#171614]', 'rounded-[20px]', 'px-6.5', 'py-[30px]', 'shadow-[5px_5px_0_#171614]', 'hover:translate-x-[-3px]', 'hover:translate-y-[-3px]', 'hover:shadow-[8px_8px_0_#171614]', 'transition-all')}>
            <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-[#171614]', 'flex', 'items-center', 'justify-center', 'mb-5')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F3E75B" strokeWidth="2" className={clsx('w-[22px]', 'h-[22px]')}>
                <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5"/>
              </svg>
            </div>
            <h3 className={clsx('text-[17px]', 'font-bold', 'mb-3', 'uppercase', 'tracking-wider', 'text-[#171614]')}>Smart Booking Links</h3>
            <p className={clsx('text-[14.5px]', 'leading-[1.65]', 'text-[#2B2A27]')}>Share one link and let people pick a time that works for both of you. No more email ping-pong.</p>
          </div>
          <div className={clsx('bg-white', 'border-2', 'border-[#171614]', 'rounded-[20px]', 'px-6.5', 'py-[30px]', 'shadow-[5px_5px_0_#171614]', 'hover:translate-x-[-3px]', 'hover:translate-y-[-3px]', 'hover:shadow-[8px_8px_0_#171614]', 'transition-all')}>
            <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-[#8C7CF0]', 'flex', 'items-center', 'justify-center', 'mb-5')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" className={clsx('w-[22px]', 'h-[22px]')}>
                <rect x="3" y="4" width="18" height="18" rx="3"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <h3 className={clsx('text-[17px]', 'font-bold', 'mb-3', 'uppercase', 'tracking-wider', 'text-[#171614]')}>Calendar Sync</h3>
            <p className={clsx('text-[14.5px]', 'leading-[1.65]', 'text-[#2B2A27]')}>Connect Google, Outlook, or iCloud calendars. Cally keeps your availability accurate, automatically.</p>
          </div>
          <div className={clsx('bg-white', 'border-2', 'border-[#171614]', 'rounded-[20px]', 'px-6.5', 'py-[30px]', 'shadow-[5px_5px_0_#171614]', 'hover:translate-x-[-3px]', 'hover:translate-y-[-3px]', 'hover:shadow-[8px_8px_0_#171614]', 'transition-all')}>
            <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-[#7CEFC0]', 'flex', 'items-center', 'justify-center', 'mb-5')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#171614" strokeWidth="2" className={clsx('w-[22px]', 'h-[22px]')}>
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </div>
            <h3 className={clsx('text-[17px]', 'font-bold', 'mb-3', 'uppercase', 'tracking-wider', 'text-[#171614]')}>Automated Reminders</h3>
            <p className={clsx('text-[14.5px]', 'leading-[1.65]', 'text-[#2B2A27]')}>Cut no-shows with email and SMS reminders sent automatically before every meeting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallySocialProof() {
  return (
    <section className={clsx('bg-[#F3E75B]', 'py-28', 'px-0', 'text-center')}>
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-8')}>
        <h2 className={clsx('text-[28px]', 'md:text-[44px]', 'font-bold', 'text-[#171614]')}>50,000+ Teams Already</h2>
        <div className={clsx('inline-block', 'bg-[#171614]', 'text-[#FDFBF2]', 'text-[28px]', 'md:text-[52px]', 'font-bold', 'font-cal-sans', 'uppercase', 'px-[30px]', 'pt-2', 'pb-[14px]', 'rounded-2xl', 'my-3', 'mb-[18px]')}>
          Book Smarter With Cally
        </div>
        <p className={clsx('text-base', 'text-[#2B2A27]')}>Join teams saving hours every week with effortless scheduling</p>

        <div className={clsx('flex', 'justify-center', 'gap-5', 'flex-wrap', 'mt-12')}>
          <div className={clsx('border-2', 'border-[#171614]', 'rounded-[20px]', 'px-[30px]', 'py-5', 'min-w-[150px]', 'shadow-[3px_3px_0_#171614]', 'bg-[#8C7CF0]', 'text-white')}>
            <div className={clsx('font-cal-sans', 'text-[26px]', 'font-bold')}>50K+</div>
            <div className={clsx('text-[11px]', 'font-bold', 'tracking-wider', 'uppercase', 'mt-1', 'opacity-80')}>Active Teams</div>
          </div>
          <div className={clsx('border-2', 'border-[#171614]', 'rounded-[20px]', 'px-[30px]', 'py-5', 'min-w-[150px]', 'shadow-[3px_3px_0_#171614]', 'bg-white', 'text-[#171614]')}>
            <div className={clsx('font-cal-sans', 'text-[26px]', 'font-bold')}>2M+</div>
            <div className={clsx('text-[11px]', 'font-bold', 'tracking-wider', 'uppercase', 'mt-1', 'opacity-80')}>Meetings Booked</div>
          </div>
          <div className={clsx('border-2', 'border-[#171614]', 'rounded-[20px]', 'px-[30px]', 'py-5', 'min-w-[150px]', 'shadow-[3px_3px_0_#171614]', 'bg-[#7CEFC0]', 'text-[#171614]')}>
            <div className={clsx('font-cal-sans', 'text-[26px]', 'font-bold')}>4.9★</div>
            <div className={clsx('text-[11px]', 'font-bold', 'tracking-wider', 'uppercase', 'mt-1', 'opacity-80')}>App Rating</div>
          </div>
          <div className={clsx('border-2', 'border-[#171614]', 'rounded-[20px]', 'px-[30px]', 'py-5', 'min-w-[150px]', 'shadow-[3px_3px_0_#171614]', 'bg-white', 'text-[#171614]')}>
            <div className={clsx('font-cal-sans', 'text-[26px]', 'font-bold')}>5hrs+</div>
            <div className={clsx('text-[11px]', 'font-bold', 'tracking-wider', 'uppercase', 'mt-1', 'opacity-80')}>Saved Weekly</div>
          </div>
        </div>

        <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6', 'mt-14', 'text-left')}>
          <div className={clsx('rounded-[20px]', 'border-2', 'border-[#171614]', 'px-[24px]', 'py-[26px]', 'shadow-[3px_3px_0_#171614]', 'bg-white', 'text-[#171614]', 'relative')}>
            <span className={clsx('absolute', '-top-3.5', 'left-[22px]', 'bg-[#8C7CF0]', 'text-white', 'text-[12px]', 'font-bold', 'px-3', 'py-1', 'rounded-full', 'border-2', 'border-[#171614]')}>01</span>
            <p className={clsx('text-[15px]', 'leading-1.6', 'mt-3', 'font-medium')}>"Cally killed our scheduling emails overnight. Booking a call now takes 10 seconds! 🚀"</p>
            <div className={clsx('flex', 'items-center', 'gap-2.5', 'mt-[22px]')}>
              <div className={clsx('w-[34px]', 'h-[34px]', 'rounded-full', 'bg-[#B7ACF7]', 'shrink-0')}></div>
              <div>
                <div className={clsx('text-[13px]', 'font-bold')}>Alex Rivera</div>
                <div className={clsx('text-[11px]', 'opacity-65')}>Product Designer</div>
              </div>
            </div>
          </div>
          <div className={clsx('rounded-[20px]', 'border-2', 'border-[#171614]', 'px-[24px]', 'py-[26px]', 'shadow-[3px_3px_0_#171614]', 'bg-[#171614]', 'text-[#FDFBF2]', 'relative')}>
            <span className={clsx('absolute', '-top-3.5', 'left-[22px]', 'bg-[#F3E75B]', 'text-[#171614]', 'text-[12px]', 'font-bold', 'px-3', 'py-1', 'rounded-full', 'border-2', 'border-[#171614]')}>02</span>
            <p className={clsx('text-[15px]', 'leading-1.6', 'mt-3', 'font-medium')}>"Best booking tool I've used. Calendar sync just works, every time. 💪"</p>
            <div className={clsx('flex', 'items-center', 'gap-2.5', 'mt-[22px]')}>
              <div className={clsx('w-[34px]', 'h-[34px]', 'rounded-full', 'bg-[#B7ACF7]', 'shrink-0')}></div>
              <div>
                <div className={clsx('text-[13px]', 'font-bold', 'text-white')}>Sarah Chen</div>
                <div className={clsx('text-[11px]', 'opacity-65', 'text-white/80')}>Freelance Dev</div>
              </div>
            </div>
          </div>
          <div className={clsx('rounded-[20px]', 'border-2', 'border-[#171614]', 'px-[24px]', 'py-[26px]', 'shadow-[3px_3px_0_#171614]', 'bg-white', 'text-[#171614]', 'relative')}>
            <span className={clsx('absolute', '-top-3.5', 'left-[22px]', 'bg-[#8C7CF0]', 'text-white', 'text-[12px]', 'font-bold', 'px-3', 'py-1', 'rounded-full', 'border-2', 'border-[#171614]')}>03</span>
            <p className={clsx('text-[15px]', 'leading-1.6', 'mt-3', 'font-medium')}>"No-shows dropped to almost zero once we turned on reminders. Huge win. 💚"</p>
            <div className={clsx('flex', 'items-center', 'gap-2.5', 'mt-[22px]')}>
              <div className={clsx('w-[34px]', 'h-[34px]', 'rounded-full', 'bg-[#B7ACF7]', 'shrink-0')}></div>
              <div>
                <div className={clsx('text-[13px]', 'font-bold')}>Maya Johnson</div>
                <div className={clsx('text-[11px]', 'opacity-65')}>Content Creator</div>
              </div>
            </div>
          </div>
        </div>
        <p className={clsx('mt-[34px]', 'text-[13px]', 'text-[#2B2A27]')}>Real teams, real time saved, zero scheduling chaos</p>
      </div>
    </section>
  );
}

function CallyHowItWorks() {
  return (
    <section className={clsx('bg-[#171614]', 'text-[#FDFBF2]', 'py-28')} id="how">
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-8', 'grid', 'grid-cols-1', 'md:grid-cols-[0.95fr_1.05fr]', 'gap-[60px]', 'items-center')}>
        <div className="text-left">
          <h2 className={clsx('text-[26px]', 'md:text-[38px]', 'font-bold', 'uppercase', 'mb-[44px]', 'text-white')}>How Cally works?</h2>
          <div className={clsx('flex', 'gap-5', 'mb-[34px]')}>
            <div className={clsx('w-[42px]', 'h-[42px]', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'font-bold', 'font-cal-sans', 'text-[15px]', 'shrink-0', 'bg-[#8C7CF0]', 'border-2', 'border-[#8C7CF0]', 'text-white')}>01</div>
            <div>
              <h3 className={clsx('text-base', 'font-bold', 'uppercase', 'mb-2', 'tracking-wide', 'text-white')}>Share your booking link</h3>
              <p className={clsx('text-sm', 'leading-1.6', 'opacity-70', 'max-w-[360px]')}>Send your personal link via email, Slack, or embed it on your own website. No signup required to book.</p>
            </div>
          </div>
          <div className={clsx('flex', 'gap-5', 'mb-[34px]')}>
            <div className={clsx('w-[42px]', 'h-[42px]', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'font-bold', 'font-cal-sans', 'text-[15px]', 'shrink-0', 'bg-[#FDFBF2]', 'text-[#171614]', 'border-2', 'border-[#FDFBF2]')}>02</div>
            <div>
              <h3 className={clsx('text-base', 'font-bold', 'uppercase', 'mb-2', 'tracking-wide', 'text-white')}>They pick a time</h3>
              <p className={clsx('text-sm', 'leading-1.6', 'opacity-70', 'max-w-[360px]')}>Invitees see your real-time availability across all connected calendars and book instantly — no back and forth.</p>
            </div>
          </div>
          <div className={clsx('flex', 'gap-5', 'mb-[34px]')}>
            <div className={clsx('w-[42px]', 'h-[42px]', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'font-bold', 'font-cal-sans', 'text-[15px]', 'shrink-0', 'bg-[#8C7CF0]', 'border-2', 'border-[#8C7CF0]', 'text-white')}>03</div>
            <div>
              <h3 className={clsx('text-base', 'font-bold', 'uppercase', 'mb-2', 'tracking-wide', 'text-white')}>It's on every calendar</h3>
              <p className={clsx('text-sm', 'leading-1.6', 'opacity-70', 'max-w-[360px]')}>Cally confirms the meeting and syncs it automatically, with reminders sent so nobody forgets.</p>
            </div>
          </div>
        </div>
        <div className={clsx('relative', 'h-[520px]', 'mt-10', 'md:mt-0', 'md:block', 'hidden')}>
          <div className={clsx('absolute', 'w-[34px]', 'h-[34px]', 'border-[5px]', 'border-[#8C7CF0]', 'rounded-full', 'top-5', 'right-[6%]', 'opacity-90')}></div>
          <div className={clsx('absolute', 'w-[90px]', 'h-[90px]', 'bg-[radial-gradient(#FDFBF2_1.6px,transparent_1.6px)]', 'bg-[length:12px_12px]', 'opacity-50', 'bottom-2.5', 'right-0')}></div>

          {/* Interactive Chat Phone Component */}
          <ChatPhone />
        </div>
      </div>
    </section>
  );
}

function CallyCTA() {
  const [notified, setNotified] = React.useState(false);

  return (
    <section className={clsx('bg-[#FDFBF2]', 'text-center', 'py-[120px]', 'px-0', 'pb-[90px]')} id="cta">
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-8')}>
        <h2 className={clsx('text-[28px]', 'md:text-[50px]', 'font-bold', 'uppercase', 'leading-1.15', 'text-[#171614]')}>
          <span className={clsx('text-transparent', '[webkit-text-stroke:1.5px_#E4E1D4]')}>Ready to end scheduling</span>{" "}
          <span className={clsx('inline-block', 'bg-[#7CEFC0]', 'border-3', 'border-[#171614]', 'rounded-[14px]', 'px-5', 'pt-0.5', 'pb-2', 'shadow-[6px_6px_0_#171614]', 'rotate-2', 'ml-2')}>Chaos?</span>
        </h2>
        <p className={clsx('mt-[22px]', 'text-[#2B2A27]', 'text-base', 'leading-1.6', 'max-w-[520px]', 'mx-auto')}>Join thousands of teams already booking smarter with Cally. Get started free — no credit card required.</p>
        <div className={clsx('mt-[38px]', 'flex', 'gap-4', 'justify-center', 'flex-wrap')}>
          <a href="#" className={clsx('flex', 'items-center', 'gap-2.5', 'bg-[#171614]', 'text-[#FDFBF2]', 'px-[26px]', 'py-[13px]', 'rounded-[14px]', 'font-bold', 'text-sm', 'border-2', 'border-[#171614]')}>Get Started Free</a>
          <a href="#" className={clsx('flex', 'items-center', 'gap-2.5', 'bg-white', 'text-[#171614]', 'hover:bg-[#F3E75B]', 'px-[26px]', 'py-[13px]', 'rounded-[14px]', 'font-bold', 'text-sm', 'border-2', 'border-[#171614]', 'transition-all')}>▶ Book a Demo</a>
        </div>
        <p className={clsx('mt-9', 'text-xs', 'font-bold', 'text-[#2B2A27]')}>Or join the waitlist</p>
        <form className={clsx('mt-4', 'flex', 'justify-center', 'gap-2.5', 'flex-wrap')} onSubmit={(e) => { e.preventDefault(); setNotified(true); }}>
          <input 
            type="email" 
            placeholder="enter your email..." 
            required 
            className={clsx('font-inherit', 'text-sm', 'px-5', 'py-3.5', 'rounded-full', 'border-2', 'border-[#171614]', 'w-[280px]', 'max-w-[80vw]', 'bg-white', 'text-[#171614]', 'focus:outline-none', 'focus:ring-3', 'focus:ring-[#B7ACF7]', 'transition-all', 'font-semibold')}
          />
          <button 
            type="submit" 
            className={clsx('font-bold', 'text-sm', 'px-[26px]', 'py-3.5', 'rounded-full', 'border-2', 'border-[#171614]', 'bg-[#171614]', 'text-[#FDFBF2]', 'shadow-[3px_3px_0_#171614]', 'hover:translate-x-[-2px]', 'hover:translate-y-[-2px]', 'hover:shadow-[5px_5px_0_#171614]', 'transition-all', 'cursor-pointer')}
          >
            {notified ? "Notified ✓" : "Notify Me"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <CallyHero />
      <CallyFeatures />
      <CallySocialProof />
      <CallyHowItWorks />
      <CallyCTA />
    </>
  );
}
