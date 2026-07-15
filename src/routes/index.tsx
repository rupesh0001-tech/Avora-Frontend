import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

// Lazy-loaded or directly imported pages
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import DashboardPage from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFound";

// Dummy pages for empty routes to maintain UX integrity
function BookingsPage() {
  return (
    <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 text-left shadow-[3px_3px_0_rgba(23,22,20,0.08)]">
      <h3 className="font-cal-sans text-xl font-bold text-[#171614] uppercase tracking-wide mb-4">Bookings</h3>
      <p className="text-sm text-[#2B2A27] font-semibold">No appointments scheduled yet.</p>
    </div>
  );
}

function AvailabilityPage() {
  return (
    <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 text-left shadow-[3px_3px_0_rgba(23,22,20,0.08)]">
      <h3 className="font-cal-sans text-xl font-bold text-[#171614] uppercase tracking-wide mb-4">Availability Schedule</h3>
      <p className="text-sm text-[#2B2A27] font-semibold">Configure your working hours and date overrides.</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 text-left shadow-[3px_3px_0_rgba(23,22,20,0.08)]">
      <h3 className="font-cal-sans text-xl font-bold text-[#171614] uppercase tracking-wide mb-4">Account Settings</h3>
      <p className="text-sm text-[#2B2A27] font-semibold">Manage your notification preferences, profile details, and timezone.</p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<div className="py-20 text-center text-ink font-bold">Features (Coming Soon)</div>} />
        <Route path="/pricing" element={<div className="py-20 text-center text-ink font-bold">Pricing (Coming Soon)</div>} />
        <Route path="/integrations" element={<div className="py-20 text-center text-ink font-bold">Integrations (Coming Soon)</div>} />
      </Route>

      {/* Auth Pages (Clerk redirects will handle these paths) */}
      <Route element={<AuthLayout />}>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
      </Route>

      {/* Protected Dashboard Pages */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/bookings" element={<BookingsPage />} />
        <Route path="/dashboard/availability" element={<AvailabilityPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
