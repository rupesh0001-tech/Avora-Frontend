import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { ArrowRight, ChevronRight, Calendar, Clock, MapPin, Globe, Check, Settings, Shield, Laptop } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="bg-canvas">
      {/* SECTION 1: HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-soft border border-hairline px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink mb-6 cursor-pointer hover:bg-surface-card transition-colors">
            <span className="bg-brand-accent h-1.5 w-1.5 rounded-full"></span>
            Avora launches v1.0
            <ChevronRight className="h-3 w-3 text-muted" />
          </div>
          
          {/* Main Headline */}
          <h1 className="font-cal-sans text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight text-ink leading-[1.02] mb-6">
            The better way to schedule your meetings
          </h1>
          
          {/* Subtext */}
          <p className="text-md md:text-lg text-muted max-w-xl mb-8 leading-relaxed font-normal">
            A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-sm mb-4">
            {isSignedIn ? (
              <Link
                to="/dashboard"
                className="bg-primary hover:bg-primary-active text-white font-semibold text-sm h-12 px-6 rounded-md transition-all flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                {/* Sign up with Google */}
                <Link
                  to="/register"
                  className="bg-[#1a1a1a] hover:bg-[#282828] text-white font-semibold text-sm h-12 px-6 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.75 21.57,11.4 21.35,11.1z" fill="#4285F4" />
                      <path d="M12,20.8c2.38,0 4.38,-0.78 5.84,-2.12l-3.3,-2.58c-0.9,0.6 -2.06,0.97 -3.3,0.97c-2.54,0 -4.7,-1.72 -5.46,-4.02H2.38v2.66C3.9,17.74 7.72,20.8 12,20.8z" fill="#34A853" />
                      <path d="M6.54,13.06c-0.2,-0.6 -0.3,-1.23 -0.3,-1.88c0,-0.65 0.1,-1.28 0.3,-1.88V6.64H2.38C1.56,8.28 1.1,10.1 1.1,12c0,1.9 0.46,3.72 1.28,5.36L6.54,13.06z" fill="#FBBC05" />
                      <path d="M12,5.92c1.3,0 2.47,0.45 3.39,1.32l2.54,-2.54C16.38,3.25 14.38,2.3 12,2.3c-4.28,0 -8.1,3.06 -9.62,7.18l4.16,3.24C7.3,8.42 9.46,5.92 12,5.92z" fill="#EA4335" />
                    </g>
                  </svg>
                  Sign up with Google
                </Link>
                
                {/* Sign up with email */}
                <Link
                  to="/register"
                  className="bg-[#f3f4f6] hover:bg-[#e5e7eb] text-ink font-semibold text-sm h-12 px-6 rounded-md transition-all flex items-center justify-center gap-1.5"
                >
                  Sign up with email
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
          
          <p className="text-xs text-muted">No credit card required</p>
        </div>

        {/* Right Column: Sleek Mockup Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Card Frame */}
          <div className="w-full max-w-md bg-canvas border border-hairline rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-left h-[380px]">
            {/* Left Pane: Host & Event Info */}
            <div className="w-1/2 p-5 border-r border-hairline bg-canvas flex flex-col justify-between">
              <div>
                {/* Host Image / Initials */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-surface-card border border-hairline flex items-center justify-center font-bold text-xs text-ink overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                      alt="Host Avatar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-ink leading-tight">Isabella Valce</h5>
                    <p className="text-[10px] text-muted">Host</p>
                  </div>
                </div>
                
                <h3 className="font-cal-sans text-xl font-bold text-ink leading-snug mb-2">
                  Photoshoot
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  Capture your special moments with our professional photography services today.
                </p>
              </div>

              <div className="space-y-3">
                {/* Service duration selector pills */}
                <div className="flex flex-wrap gap-1">
                  {["15m", "30m", "45m", "1h"].map((time) => (
                    <span
                      key={time}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                        time === "1h"
                          ? "bg-primary text-white border-primary"
                          : "border-hairline bg-surface-soft text-muted"
                      }`}
                    >
                      {time}
                    </span>
                  ))}
                </div>

                {/* Details list */}
                <div className="space-y-1.5 text-[11px] text-muted">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">Rock Wall Woods</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">South America/Rio de Janeiro</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pane: Date Picker */}
            <div className="w-1/2 p-5 bg-canvas flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="font-cal-sans text-sm font-bold text-ink">May 2025</span>
                <div className="flex gap-1">
                  <button className="p-1 rounded hover:bg-surface-soft text-muted hover:text-ink"><ChevronRight className="h-3 w-3 rotate-180" /></button>
                  <button className="p-1 rounded hover:bg-surface-soft text-muted hover:text-ink"><ChevronRight className="h-3 w-3" /></button>
                </div>
              </div>

              {/* Days label header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-muted mb-2">
                <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
              </div>

              {/* Days grid calendar */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs flex-1">
                {/* Empty days */}
                <span></span><span></span><span></span><span></span>
                {/* Available Days */}
                <span className="relative flex items-center justify-center p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">1<span className="absolute bottom-0.5 h-1 w-1 bg-muted rounded-full"></span></span>
                <span className="p-1 text-muted opacity-30">2</span>
                <span className="p-1 text-muted opacity-30">3</span>
                <span className="p-1 text-muted opacity-30">4</span>
                <span className="p-1 text-muted opacity-30">5</span>
                
                {/* Selected Date */}
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">6</span>
                <span className="p-1 bg-[#2b3544] text-white font-bold rounded-md cursor-pointer">7</span>
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">8</span>
                <span className="relative flex items-center justify-center p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">9<span className="absolute bottom-0.5 h-1 w-1 bg-muted rounded-full"></span></span>
                
                {["10", "11", "12", "13", "14", "15"].map((day) => (
                  <span key={day} className="p-1 text-muted opacity-30">{day}</span>
                ))}
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">16</span>
                {["17", "18", "19", "20"].map((day) => (
                  <span key={day} className="p-1 text-muted opacity-30">{day}</span>
                ))}
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">21</span>
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">22</span>
                <span className="p-1 text-muted opacity-30">23</span>
                <span className="p-1 text-muted opacity-30">24</span>
                <span className="p-1 text-muted opacity-30">25</span>
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">27</span>
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">28</span>
                <span className="p-1 font-semibold text-muted hover:bg-surface-soft rounded-md cursor-pointer">29</span>
                <span className="p-1 text-muted opacity-30">30</span>
              </div>
            </div>
          </div>

          {/* Social Proof Badges */}
          <div className="flex gap-6 mt-8 items-center justify-center flex-wrap">
            {/* Trustpilot */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="h-4 w-4 bg-[#00b67a] flex items-center justify-center text-white text-[10px] font-bold">★</span>
                ))}
              </div>
              <span className="text-[10px] font-bold text-ink">Trustpilot</span>
            </div>

            {/* Product Hunt */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5 text-amber-500 text-xs">
                {"★★★★★"}
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3.5 w-3.5 rounded-full bg-[#da552f] text-white flex items-center justify-center text-[8px] font-extrabold">P</span>
                <span className="text-[10px] font-bold text-ink">Product Hunt</span>
              </div>
            </div>

            {/* G2 */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5 text-red-500 text-xs">
                {"★★★★★"}
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff0000] text-white flex items-center justify-center text-[8px] font-extrabold">G</span>
                <span className="text-[10px] font-bold text-ink">G2 Crowd</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="bg-surface-soft border-y border-hairline py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center bg-canvas border border-hairline px-3 py-1 rounded-full text-xs font-semibold text-ink mb-6">
            💼 How it works
          </span>
          <h2 className="font-cal-sans text-4xl md:text-[44px] font-bold tracking-tight text-ink mb-4 leading-tight">
            With us, appointment scheduling is easy
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 font-normal leading-relaxed text-sm md:text-base">
            Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.
          </p>

          <div className="flex justify-center gap-3 mb-16">
            <Link to="/register" className="bg-primary hover:bg-primary-active text-white text-sm font-semibold h-10 px-5 rounded-md flex items-center justify-center gap-1">
              Get started <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="bg-canvas border border-hairline hover:bg-surface-soft text-ink text-sm font-semibold h-10 px-5 rounded-md flex items-center justify-center">
              Book a demo
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-canvas border border-hairline rounded-lg p-8 text-left flex flex-col justify-between h-[340px]">
              <div>
                <span className="text-xs font-bold text-muted bg-surface-soft px-2 py-1 rounded-md">01</span>
                <h3 className="font-cal-sans text-lg font-bold text-ink mt-4 mb-2">Connect your calendar</h3>
                <p className="text-xs text-muted leading-relaxed">
                  We'll handle all the cross-referencing, so you don't have to worry about double bookings.
                </p>
              </div>
              {/* Circular mockup */}
              <div className="flex justify-center py-4 relative h-28">
                <div className="h-20 w-20 rounded-full border border-hairline bg-canvas flex items-center justify-center relative">
                  <span className="font-cal-sans text-[10px] font-bold text-ink">avora.</span>
                  
                  {/* Google Calendar Logo Float */}
                  <div className="absolute -top-1 -left-1 h-6 w-6 rounded-md bg-canvas border border-hairline flex items-center justify-center shadow-sm">
                    <svg className="h-3 w-3" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.5c0-1.99 4-3 6-3s6 1.01 6 3V18z" fill="#4285F4"/></svg>
                  </div>

                  {/* Outlook Float */}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-md bg-canvas border border-hairline flex items-center justify-center shadow-sm">
                    <svg className="h-3 w-3" viewBox="0 0 24 24"><path d="M16.24 7.76A5.974 5.974 0 0 0 12 6v6l-4.24 4.24A5.97 5.97 0 0 0 12 18c3.31 0 6-2.69 6-6a5.974 5.974 0 0 0-1.76-4.24z" fill="#0078d4"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-canvas border border-hairline rounded-lg p-8 text-left flex flex-col justify-between h-[340px]">
              <div>
                <span className="text-xs font-bold text-muted bg-surface-soft px-2 py-1 rounded-md">02</span>
                <h3 className="font-cal-sans text-lg font-bold text-ink mt-4 mb-2">Set your availability</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Want to block off weekends? Set up any buffers? We make that easy.
                </p>
              </div>
              {/* Availability mockup */}
              <div className="space-y-2 border border-hairline p-3 rounded-lg bg-surface-soft flex-1 mt-4 max-h-[140px] overflow-hidden text-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded border-hairline" />
                    <span className="font-semibold">Mon</span>
                  </div>
                  <span className="text-muted">8:30 am - 5:00 pm</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded border-hairline" />
                    <span className="font-semibold">Tue</span>
                  </div>
                  <span className="text-muted">9:00 am - 6:30 pm</span>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-1.5">
                    <input type="checkbox" className="rounded border-hairline" />
                    <span className="font-semibold">Wed</span>
                  </div>
                  <span className="text-muted">10:00 am - 7:00 pm</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-canvas border border-hairline rounded-lg p-8 text-left flex flex-col justify-between h-[340px]">
              <div>
                <span className="text-xs font-bold text-muted bg-surface-soft px-2 py-1 rounded-md">03</span>
                <h3 className="font-cal-sans text-lg font-bold text-ink mt-4 mb-2">Choose how to meet</h3>
                <p className="text-xs text-muted leading-relaxed">
                  It could be a video chat, phone call, or a walk in the park!
                </p>
              </div>
              {/* User meeting mockup */}
              <div className="flex justify-center items-center gap-6 py-4 flex-1">
                <div className="h-10 w-10 rounded-full bg-surface-soft flex items-center justify-center font-bold text-xs">U1</div>
                <div className="flex flex-col gap-1.5 items-center justify-center bg-surface-card border border-hairline p-2 rounded-lg">
                  <div className="flex gap-2">
                    <span className="h-5 w-5 bg-primary text-white rounded flex items-center justify-center text-[8px]">📹</span>
                    <span className="h-5 w-5 bg-surface-soft rounded flex items-center justify-center text-[8px]">🎙️</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-surface-soft flex items-center justify-center font-bold text-xs">U2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ALL PURPOSE SCHEDULING APP */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center bg-surface-soft border border-hairline px-3 py-1 rounded-full text-xs font-semibold text-ink mb-6">
            🛠️ Benefits
          </span>
          <h2 className="font-cal-sans text-4xl md:text-[44px] font-bold tracking-tight text-ink mb-4 leading-tight">
            Your all-purpose scheduling app
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 font-normal leading-relaxed text-sm md:text-base">
            Discover a variety of our advanced features. Unlimited and free for individuals.
          </p>

          <div className="flex justify-center gap-3 mb-16">
            <Link to="/register" className="bg-primary hover:bg-primary-active text-white text-sm font-semibold h-10 px-5 rounded-md flex items-center justify-center gap-1">
              Get started <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="bg-canvas border border-hairline hover:bg-surface-soft text-ink text-sm font-semibold h-10 px-5 rounded-md flex items-center justify-center">
              Book a demo
            </Link>
          </div>

          {/* 2 Wide Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Left Card: Overload Control */}
            <div className="bg-canvas border border-hairline rounded-lg p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-cal-sans text-xl font-bold text-ink mb-2">Avoid meeting overload</h3>
                <p className="text-xs text-muted leading-relaxed mb-6">
                  Only get booked when you want to. Set daily, weekly or monthly limits and add buffers around your events to allow you to focus or take a break.
                </p>
              </div>

              {/* Mockup notice and buffers config widget */}
              <div className="border border-hairline rounded-lg p-4 bg-surface-soft space-y-3 text-xs">
                <span className="font-bold text-ink">Notice and buffers</span>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-canvas p-2 border border-hairline rounded-md">
                    <span className="text-muted">Minimum notice</span>
                    <span className="font-semibold text-ink">3 hours ▾</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between bg-canvas p-2 border border-hairline rounded-md">
                      <span className="text-muted">Buffer before</span>
                      <span className="font-semibold text-ink">15 mins ▾</span>
                    </div>
                    <div className="flex items-center justify-between bg-canvas p-2 border border-hairline rounded-md">
                      <span className="text-muted">Buffer after</span>
                      <span className="font-semibold text-ink">15 mins ▾</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-canvas p-2 border border-hairline rounded-md">
                    <span className="text-muted">Time-slot intervals</span>
                    <span className="font-semibold text-ink">15 mins ▾</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Custom Booking Link */}
            <div className="bg-canvas border border-hairline rounded-lg p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-cal-sans text-xl font-bold text-ink mb-2">Stand out with a custom booking link</h3>
                <p className="text-xs text-muted leading-relaxed mb-6">
                  Customize your booking link so it's short and easy to remember for your bookers. No more long, complicated links one can easily forget.
                </p>
              </div>

              {/* Mockup Event Booking Page */}
              <div className="relative">
                {/* Floating link bubble */}
                <div className="absolute -top-4 left-6 bg-[#2b3544] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                  avora.com/ewa
                </div>

                <div className="border border-hairline rounded-lg p-4 pt-6 bg-canvas space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-surface-card border border-hairline flex items-center justify-center font-bold text-xs text-ink overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                        alt="Ewa Avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-ink leading-tight">Ewa Michalak</h4>
                      <p className="text-[10px] text-muted">Marketing Strategy Session</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted leading-relaxed">
                    Let's collaborate on campaigns, co-marketing opportunities, and learn how Avora is approaching growth and brand.
                  </p>

                  <div className="flex gap-1.5 text-[9px] text-muted">
                    <span className="border border-hairline px-2 py-0.5 rounded">15m</span>
                    <span className="bg-primary text-white font-bold px-2 py-0.5 rounded">30m</span>
                    <span className="border border-hairline px-2 py-0.5 rounded">45m</span>
                    <span className="border border-hairline px-2 py-0.5 rounded">1h</span>
                  </div>

                  <div className="border-t border-hairline pt-2 flex items-center justify-between text-[9px] text-muted">
                    <span className="flex items-center gap-1">🌐 Google Meet</span>
                    <span>Europe/Warsaw ▾</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRE-FOOTER CTA CARD */}
      <section className="max-w-5xl mx-auto my-20 px-6">
        <div className="bg-surface-card border border-hairline rounded-xl py-16 px-8 md:p-20 text-center">
          <h2 className="font-cal-sans text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">
            Smarter, simpler scheduling.
          </h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto mb-8">
            Create your account today. Connect all your calendars and start sharing your link instantly.
          </p>
          <Link
            to="/register"
            className="inline-flex bg-primary hover:bg-primary-active text-white font-semibold text-sm h-12 px-6 rounded-md transition-all items-center gap-2"
          >
            Create Your Free Link <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
