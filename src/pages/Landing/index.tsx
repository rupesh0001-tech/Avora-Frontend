import { Link } from "react-router-dom";
import { Clock, Calendar, CheckCircle2, Shield, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-canvas min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft border border-hairline text-xs font-semibold text-muted mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Introducing Avora Scheduling
        </div>
        <h1 className="font-cal-sans text-5xl md:text-7xl font-extrabold text-ink tracking-tight max-w-4xl mx-auto leading-tight mb-8">
          Smarter scheduling for <span className="text-brand-accent">modern</span> professionals.
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Avora helps you automate your availability, eliminate back-and-forth emails, and delight your clients with seamless booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-active transition-all shadow-sm hover:shadow-md text-base"
          >
            Get started free
          </Link>
          <Link
            to="/pricing"
            className="w-full sm:w-auto bg-canvas border border-hairline text-ink font-semibold px-8 py-4 rounded-xl hover:bg-surface-soft transition-all text-base"
          >
            View pricing
          </Link>
        </div>

        {/* Mock Scheduling UI Widget */}
        <div className="max-w-4xl mx-auto bg-canvas border border-hairline rounded-2xl shadow-xl overflow-hidden mt-6 text-left">
          <div className="border-b border-hairline px-6 py-4 bg-surface-soft flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-medium text-muted font-mono">avora.co/alex-rivera/30-min</span>
            <div className="w-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {/* Host Details */}
            <div className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Alex Rivera</span>
              <h2 className="font-cal-sans text-2xl font-bold text-ink mt-2">Discovery Call</h2>
              <div className="flex items-center gap-2 mt-4 text-muted text-sm">
                <Clock className="w-4 h-4" />
                <span>30 Min</span>
              </div>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                Let's discuss your project goals, scope, timeline, and how we can work together to achieve them.
              </p>
            </div>
            {/* Calendar Mock */}
            <div className="p-8">
              <h3 className="font-semibold text-ink text-sm mb-4">Select Date</h3>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d} className="font-bold text-muted uppercase text-[10px]">{d}</span>
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isAvailable = day > 10 && day < 25;
                  return (
                    <button
                      key={i}
                      disabled={!isAvailable}
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-medium transition-all ${
                        isAvailable
                          ? "bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-white cursor-pointer"
                          : "text-muted opacity-30 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Time Slot Mock */}
            <div className="p-8 bg-surface-soft/50">
              <h3 className="font-semibold text-ink text-sm mb-4">Select Time</h3>
              <div className="space-y-2">
                {["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"].map((t, idx) => (
                  <button
                    key={t}
                    className={`w-full py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                      idx === 1
                        ? "bg-brand-accent border-brand-accent text-white"
                        : "bg-canvas border-hairline text-ink hover:border-brand-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-surface-soft border-t border-b border-hairline py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-cal-sans text-3xl md:text-4xl font-bold text-ink mb-4">
              Built for speed. Optimized for conversion.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              No complex setup guides or clunky user interfaces. Avora is built with minimal design and maximal speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-canvas p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-cal-sans text-lg font-bold text-ink mb-2">Instant Availability</h3>
              <p className="text-muted text-sm leading-relaxed">
                Connects directly to your calendars. We query slot calculations on-the-fly to guarantee absolute zero double bookings.
              </p>
            </div>
            <div className="bg-canvas p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-cal-sans text-lg font-bold text-ink mb-2">Smart Timezone Detection</h3>
              <p className="text-muted text-sm leading-relaxed">
                Automatic detection of your invitees' timezones so there are no scheduling calculations or math mistakes.
              </p>
            </div>
            <div className="bg-canvas p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-cal-sans text-lg font-bold text-ink mb-2">Secure Integrations</h3>
              <p className="text-muted text-sm leading-relaxed">
                Sign in with Google or your work credentials. We keep your credentials safe using industry-standard OAuth procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="font-cal-sans text-3xl md:text-4xl font-bold text-ink mb-4">
          Ready to experience frictionless scheduling?
        </h2>
        <p className="text-muted text-base max-w-md mx-auto mb-8">
          Join thousands of professionals using Avora to regain their productivity.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-active transition-all shadow-sm"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}
