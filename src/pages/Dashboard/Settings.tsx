import React, { useState, useEffect } from "react";
import { Save, CheckCircle, AlertCircle } from "lucide-react";
import { useApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import clsx from "clsx";

const TIMEZONE_OPTIONS = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "Asia/Kolkata", label: "Asia/Kolkata (Indian Standard Time)" },
  { value: "America/New_York", label: "America/New_York (Eastern Time)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (Pacific Time)" },
  { value: "Europe/London", label: "Europe/London (Greenwich Mean Time)" },
  { value: "Europe/Paris", label: "Europe/Paris (Central European Time)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (Japan Standard Time)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (Eastern Daylight Time)" },
];

const LOCALE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español (Spanish)" },
  { value: "fr", label: "Français (French)" },
  { value: "de", label: "Deutsch (German)" },
];

export default function SettingsPage() {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [locale, setLocale] = useState("en");
  const [imageUrl, setImageUrl] = useState("");

  // States for verification
  const [initialUsername, setInitialUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Calendar Integration States
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isConnectingCalendar, setIsConnectingCalendar] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        const res = await api.get("/auth/me");
        const user = res.data.user;
        if (user) {
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setEmail(user.email || "");
          setUsername(user.username || "");
          setInitialUsername(user.username || "");
          setTimezone(user.timezone || "UTC");
          setLocale(user.locale || "en");
          setImageUrl(user.imageUrl || "");
        }

        // Fetch Google calendar connection status
        const statusRes = await api.get("/auth/google/status");
        setIsCalendarConnected(statusRes.data.connected);
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Check query params for calendar callbacks
    const params = new URLSearchParams(window.location.search);
    const googleConnected = params.get("google_connected");
    if (googleConnected === "success") {
      setMessage({ type: "success", text: "Successfully connected to Google Calendar! ✓" });
      setTimeout(() => setMessage(null), 5000);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (googleConnected === "error") {
      setMessage({ type: "error", text: "Failed to connect to Google Calendar." });
      setTimeout(() => setMessage(null), 5000);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    loadProfile();
  }, []);

  const handleConnectCalendar = async () => {
    if (isConnectingCalendar) return;
    setIsConnectingCalendar(true);
    setMessage(null);
    try {
      const res = await api.get("/auth/google/connect");
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        setMessage({ type: "error", text: "Could not generate authorization redirect link." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to connect to Google Calendar." });
    } finally {
      setIsConnectingCalendar(false);
    }
  };

  const handleDisconnectCalendar = async () => {
    if (isConnectingCalendar) return;
    setIsConnectingCalendar(true);
    setMessage(null);
    try {
      await api.delete("/auth/google/disconnect");
      setIsCalendarConnected(false);
      setMessage({ type: "success", text: "Google Calendar connection revoked successfully." });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to disconnect Google Calendar." });
    } finally {
      setIsConnectingCalendar(false);
    }
  };

  // Username validation helper
  const checkUsernameAvailability = async (val: string) => {
    const cleanVal = val.trim().toLowerCase();
    if (!cleanVal || cleanVal === initialUsername) {
      setUsernameAvailable(null);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    if (!usernameRegex.test(cleanVal)) {
      setUsernameAvailable(false);
      return;
    }

    setCheckingUsername(true);
    try {
      const res = await api.get(`/users/username/check?username=${cleanVal}`);
      setUsernameAvailable(res.data.available);
    } catch (err) {
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Debounce username availability checking
  useEffect(() => {
    if (!username) return;
    const timer = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setMessage(null);

    try {
      // 1. If username changed, update username first
      if (username.trim().toLowerCase() !== initialUsername) {
        await api.put("/users/username", { username: username.trim().toLowerCase() });
      }

      // 2. Update profile details
      await api.put("/users/profile", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        timezone,
        locale,
      });

      setInitialUsername(username.trim().toLowerCase());
      setUsernameAvailable(null);
      setMessage({ type: "success", text: "Account settings saved successfully! ✓" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to update account settings.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-[#171614] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white border border-[#E4E1D4] rounded-2xl p-6 shadow-[3px_3px_0_rgba(23,22,20,0.08)]">
        <div>
          <h3 className="font-cal-sans text-xl font-bold text-[#171614] uppercase tracking-wide">
            Account Settings
          </h3>
          <p className="text-xs font-semibold text-[#2B2A27]/60 mt-1">
            Manage your public calendar profile details, timezone, and booking slug settings.
          </p>
        </div>

        {message && (
          <div className={`text-xs font-bold px-4 py-2 border rounded-xl shadow-[2px_2px_0_rgba(23,22,20,0.08)] ${
            message.type === "success" ? "bg-[#7CEFC0] border-[#171614]/15" : "bg-[#E5484D]/10 border-[#E5484D]/30 text-[#E5484D]"
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main form columns */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full h-9 px-3 border border-[#E4E1D4] rounded-xl text-xs font-semibold text-[#171614] bg-white focus:outline-none focus:border-[#171614] transition-all"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full h-9 px-3 border border-[#E4E1D4] rounded-xl text-xs font-semibold text-[#171614] bg-white focus:outline-none focus:border-[#171614] transition-all"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email (Readonly) */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full h-9 px-3 border border-[#E4E1D4] rounded-xl text-xs font-semibold text-[#2B2A27]/40 bg-gray-50 cursor-not-allowed"
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                  Booking Slug / Username
                </label>
                {checkingUsername && (
                  <span className="text-[9px] font-bold text-[#2B2A27]/40 animate-pulse">Checking...</span>
                )}
                {!checkingUsername && usernameAvailable === true && (
                  <span className="text-[9px] font-bold text-[#58D9A6] flex items-center gap-0.5"><CheckCircle className="w-3 h-3" /> Available</span>
                )}
                {!checkingUsername && usernameAvailable === false && (
                  <span className="text-[9px] font-bold text-[#E5484D] flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> Unavailable</span>
                )}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full h-9 px-3 border border-[#E4E1D4] rounded-xl text-xs font-semibold text-[#171614] bg-white focus:outline-none focus:border-[#171614] transition-all"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                Default Timezone
              </label>
              <Select
                value={timezone}
                onChange={(val) => setTimezone(val)}
                options={TIMEZONE_OPTIONS}
                size="sm"
                className="h-9"
              />
            </div>

            {/* Locale */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-[#2B2A27]/55 tracking-wider">
                Language / Locale
              </label>
              <Select
                value={locale}
                onChange={(val) => setLocale(val)}
                options={LOCALE_OPTIONS}
                size="sm"
                className="h-9"
              />
            </div>

          </div>

          <div className="pt-6 border-t border-[#E4E1D4] flex justify-end">
            <Button type="submit" variant="primary" size="sm" rounded="xl" shadow="sm" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Account Settings
            </Button>
          </div>
        </form>

        {/* Right side widgets */}
        <div className="space-y-6">
          {/* Avatar widget */}
          <div className="bg-white border border-[#E4E1D4] rounded-2xl p-6 shadow-[3px_3px_0_rgba(23,22,20,0.08)] flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border border-[#171614]/15 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#B7ACF7]/25 flex items-center justify-center text-xl font-extrabold text-[#171614]">
                  {firstName?.[0] || ""}{lastName?.[0] || ""}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-cal-sans text-sm font-bold text-[#171614] uppercase tracking-wider">
                {firstName} {lastName}
              </h4>
              <p className="text-xs font-semibold text-[#2B2A27]/60 mt-0.5">{email}</p>
            </div>
          </div>

          {/* Integrations Widget */}
          <div className="bg-white border border-[#E4E1D4] rounded-2xl p-6 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-4">
            <h4 className="font-cal-sans text-xs font-bold text-[#171614] uppercase tracking-wider">
              Calendar Integrations
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-sm font-extrabold text-red-600">
                G
              </div>
              <div className="flex-1 truncate">
                <span className="text-xs font-bold text-[#171614] block">Google Calendar</span>
                <span className="text-[10px] font-semibold text-[#2B2A27]/50 block">
                  {isCalendarConnected ? "Syncs bookings automatically" : "Not connected"}
                </span>
              </div>
            </div>

            {isCalendarConnected ? (
              <Button
                onClick={handleDisconnectCalendar}
                variant="secondary"
                size="sm"
                rounded="xl"
                className="w-full text-[#E5484D] hover:bg-[#E5484D]/5 border-[#E5484D]/30"
                disabled={isConnectingCalendar}
              >
                Disconnect Calendar
              </Button>
            ) : (
              <Button
                onClick={handleConnectCalendar}
                variant="primary"
                size="sm"
                rounded="xl"
                className="w-full bg-[#171614] text-white"
                disabled={isConnectingCalendar}
              >
                Connect Calendar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
