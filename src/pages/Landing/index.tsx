import React from "react";
import { HeroLaptop, HeroPhone, ChatPhone } from "../../components/CallyComponents";

function clsx(...args: any[]) {
  return args.filter(Boolean).join(" ");
}

function CallyHero() {
  return (
    <section className="hero">
      <div className={clsx('container', 'hero-content')}>
        <span className="eyebrow">✦ Scheduling Infrastructure for Everyone</span>
        <h1>Booking meetings with a <span className="wild-side">WILD SIDE</span></h1>
        <p className="sub">Meet Cally — the open scheduling tool that ends back-and-forth emails. Share one link, let people book time that works, and get your calendar back.</p>

        <div className="hero-cta">
          <a href="#cta" className={clsx('btn', 'btn-dark')}>Create Your Link
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>

      <div className="container">
        <div className={clsx('mock-stage', 'hero-stage')}>
          <div className={clsx('deco-dot-grid', 'deco-1')}></div>
          <div className={clsx('deco-dot-grid', 'deco-2')}></div>
          <div className="deco-ring"></div>
          <div className="deco-square"></div>

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
    <section className="features" id="features">
      <div className="container">
        <h2>Features that make booking effortless</h2>
        <p>Cally isn't just another calendar app. It's scheduling infrastructure built for how you actually work.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F3E75B" strokeWidth="2"><path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5"/></svg>
            </div>
            <h3>Smart Booking Links</h3>
            <p>Share one link and let people pick a time that works for both of you. No more email ping-pong.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <h3>Calendar Sync</h3>
            <p>Connect Google, Outlook, or iCloud calendars. Cally keeps your availability accurate, automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#171614" strokeWidth="2"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            </div>
            <h3>Automated Reminders</h3>
            <p>Cut no-shows with email and SMS reminders sent automatically before every meeting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallySocialProof() {
  return (
    <section className="proof">
      <div className="container">
        <h2>50,000+ Teams Already</h2>
        <div className="proof-badge">Book Smarter With Cally</div>
        <p>Join teams saving hours every week with effortless scheduling</p>

        <div className="stat-row">
          <div className={clsx('stat-pill', 'purple')}><div className="num">50K+</div><div className="lbl">Active Teams</div></div>
          <div className="stat-pill"><div className="num">2M+</div><div className="lbl">Meetings Booked</div></div>
          <div className={clsx('stat-pill', 'mint')}><div className="num">4.9★</div><div className="lbl">App Rating</div></div>
          <div className="stat-pill"><div className="num">5hrs+</div><div className="lbl">Saved Weekly</div></div>
        </div>

        <div className="testi-row">
          <div className="testi-card">
            <span className="testi-num">01</span>
            <p className="quote">"Cally killed our scheduling emails overnight. Booking a call now takes 10 seconds! 🚀"</p>
            <div className="testi-person">
              <div className="avatar"></div>
              <div>
                <div className="who">Alex Rivera</div>
                <div className="role">Product Designer</div>
              </div>
            </div>
          </div>
          <div className={clsx('testi-card', 'dark')}>
            <span className="testi-num">02</span>
            <p className="quote">"Best booking tool I've used. Calendar sync just works, every time. 💪"</p>
            <div className="testi-person">
              <div className="avatar"></div>
              <div>
                <div className="who">Sarah Chen</div>
                <div className="role">Freelance Dev</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <span className="testi-num">03</span>
            <p className="quote">"No-shows dropped to almost zero once we turned on reminders. Huge win. 💚"</p>
            <div className="testi-person">
              <div className="avatar"></div>
              <div>
                <div className="who">Maya Johnson</div>
                <div className="role">Content Creator</div>
              </div>
            </div>
          </div>
        </div>
        <p className="proof-foot">Real teams, real time saved, zero scheduling chaos</p>
      </div>
    </section>
  );
}

function CallyHowItWorks() {
  return (
    <section className="how" id="how">
      <div className={clsx('container', 'how-inner')}>
        <div className={clsx('how-text', 'text-left')}>
          <h2>How Cally works?</h2>
          <div className="step">
            <div className="step-num">01</div>
            <div>
              <h3>Share your booking link</h3>
              <p>Send your personal link via email, Slack, or embed it on your own website. No signup required to book.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div>
              <h3>They pick a time</h3>
              <p>Invitees see your real-time availability across all connected calendars and book instantly — no back and forth.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div>
              <h3>It's on every calendar</h3>
              <p>Cally confirms the meeting and syncs it automatically, with reminders sent so nobody forgets.</p>
            </div>
          </div>
        </div>
        <div className="how-mock">
          <div className="deco-ring"></div>
          <div className="deco-dot-grid"></div>

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
    <section className="cta" id="cta">
      <div className="container">
        <h2>
          <span className="ghost">Ready to end scheduling</span>{" "}
          <span className="buddy-badge">Chaos?</span>
        </h2>
        <p className="sub">Join thousands of teams already booking smarter with Cally. Get started free — no credit card required.</p>
        <div className="store-row">
          <a href="#" className={clsx('store-btn', 'text-white')}>Get Started Free</a>
          <a href="#" className={clsx('store-btn', 'outline', 'text-[#171614]')}>▶ Book a Demo</a>
        </div>
        <p className="or-line">Or join the waitlist</p>
        <form className="email-row" onSubmit={(e) => { e.preventDefault(); setNotified(true); }}>
          <input type="email" placeholder="enter your email..." required />
          <button type="submit" className="cursor-pointer">
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
