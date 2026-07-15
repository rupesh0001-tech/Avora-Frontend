import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Check, Save, Sparkles, MessageSquare, Shield, HelpCircle, Plus, Edit2, Trash2, ChevronDown } from "lucide-react";
import { useApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";

interface EventType {
  id: string;
  title: string;
  slug: string;
  duration: number;
  price: number;
  isActive: boolean;
  locationType: string;
  locationDetails: string;
  availability: Array<{ day: string; enabled: boolean; slots: Array<{ startTime: string; endTime: string }> }>;
  bookingFields: Array<{ id: string; label: string; type: string; status: "Hidden" | "Optional" | "Required"; editable: boolean }>;
  appearance: string;
}

// Helper to generate 30-min time interval options
const TIME_OPTIONS = (() => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min of ["00", "30"]) {
      const hh = hour.toString().padStart(2, "0");
      const val = `${hh}:${min}`;
      
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${displayHour}:${min} ${ampm}`;
      
      options.push({ val, label });
    }
  }
  return options;
})();

// Reusable custom modern dropdown select component
interface CustomSelectProps {
  value: any;
  onChange: (val: any) => void;
  options: Array<{ value: any; label: string }>;
  className?: string;
  size?: "sm" | "md";
}

function CustomSelect({ value, onChange, options, className = "", size = "md" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-full border border-[#E4E1D4] rounded-xl bg-white font-bold text-[#171614] text-left flex justify-between items-center hover:bg-[#FDFBF2] transition-all cursor-pointer ${
          size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
        }`}
      >
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <ChevronDown className={`text-[#2B2A27]/60 shrink-0 ${size === "sm" ? "w-3.5 h-3.5 ml-1" : "w-4 h-4 ml-2"}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E1D4] rounded-xl shadow-lg z-30 py-1 font-semibold text-[#171614] max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left hover:bg-[#7CEFC0]/20 hover:text-[#171614] transition-colors cursor-pointer ${
                size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApi();

  const [username, setUsername] = useState("");
  const [event, setEvent] = useState<EventType | null>(null);
  const [activeTab, setActiveTab] = useState("basics");
  
  // Loading & statuses
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Basics Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState("Video");
  const [locationDetails, setLocationDetails] = useState("Google Meet");

  // Availability State
  const [availability, setAvailability] = useState<EventType["availability"]>([]);
  // Track open time-slot picker overlay
  const [activeDropdown, setActiveDropdown] = useState<{ dayIdx: number; slotIdx: number; type: "start" | "end" } | null>(null);

  // Booking Form State
  const [bookingFields, setBookingFields] = useState<EventType["bookingFields"]>([]);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");

  // Add Question State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("Short Text");
  const [newFieldStatus, setNewFieldStatus] = useState<"Required" | "Optional" | "Hidden">("Optional");

  // Appearance State
  const [appearance, setAppearance] = useState("classic");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        // Load User info
        const meRes = await api.get("/auth/me");
        setUsername(meRes.data.user?.username || "user");

        // Load Event Details
        const eventRes = await api.get(`/events/${id}`);
        const ev = eventRes.data.event;
        setEvent(ev);

        // Populate state
        setTitle(ev.title);
        setSlug(ev.slug);
        setDuration(ev.duration);
        setLocationType(ev.locationType || "Video");
        setLocationDetails(ev.locationDetails || "Google Meet");
        setAvailability(ev.availability || []);
        setBookingFields(ev.bookingFields || []);
        setAppearance(ev.appearance || "classic");
      } catch (err: any) {
        console.error("Error loading event edit page data:", err);
        setMessage({ type: "error", text: "Failed to load event type details." });
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadData();
  }, [id]);

  // Click outside to close custom time slot popover
  useEffect(() => {
    const handleClose = () => setActiveDropdown(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  const handleSaveBasics = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdate({
      title,
      slug,
      duration: Number(duration),
      locationType,
      locationDetails,
    });
  };

  const handleSaveAvailability = async () => {
    await handleUpdate({ availability });
  };

  const handleSaveBookingForm = async () => {
    await handleUpdate({ bookingFields });
  };

  const handleSaveAppearance = async (selectedLayout: string) => {
    setAppearance(selectedLayout);
    await handleUpdate({ appearance: selectedLayout });
  };

  const handleUpdate = async (updatedFields: Partial<EventType>) => {
    if (isSaving) return;
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await api.put(`/events/${id}`, updatedFields);
      setEvent(res.data.event);
      setMessage({ type: "success", text: "Changes saved successfully! ✓" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to update event type." });
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle availability day status
  const handleToggleDay = (dayIndex: number) => {
    const updated = [...availability];
    updated[dayIndex].enabled = !updated[dayIndex].enabled;
    if (updated[dayIndex].enabled && updated[dayIndex].slots.length === 0) {
      updated[dayIndex].slots = [{ startTime: "09:00", endTime: "17:00" }];
    }
    setAvailability(updated);
  };

  // Update specific day slot times
  const handleSlotTimeChange = (dayIndex: number, slotIndex: number, key: "startTime" | "endTime", value: string) => {
    const updated = [...availability];
    updated[dayIndex].slots[slotIndex][key] = value;
    setAvailability(updated);
  };

  // Booking questions edits
  const handleFieldStatusChange = (fieldId: string, status: "Hidden" | "Optional" | "Required") => {
    const updated = bookingFields.map(f => f.id === fieldId ? { ...f, status } : f);
    setBookingFields(updated);
  };

  const startEditField = (fieldId: string, currentLabel: string) => {
    setEditingFieldId(fieldId);
    setEditingLabel(currentLabel);
  };

  const saveFieldLabel = (fieldId: string) => {
    if (!editingLabel.trim()) return;
    const updated = bookingFields.map(f => f.id === fieldId ? { ...f, label: editingLabel.trim() } : f);
    setBookingFields(updated);
    setEditingFieldId(null);
  };

  const handleDeleteField = (fieldId: string) => {
    const updated = bookingFields.filter(f => f.id !== fieldId);
    setBookingFields(updated);
  };

  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    const newField = {
      id: `custom_${Date.now()}`,
      label: newFieldLabel.trim(),
      type: newFieldType,
      status: newFieldStatus,
      editable: true
    };
    setBookingFields([...bookingFields, newField]);
    setNewFieldLabel("");
    setShowAddForm(false);
  };

  // Convert "09:00" to "9:00 AM" for selector button
  const formatTime24to12 = (time24: string) => {
    const match = TIME_OPTIONS.find(o => o.val === time24);
    return match ? match.label : time24;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FDFBF2]">
        <div className="w-12 h-12 rounded-full border-4 border-[#171614] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20 bg-[#FDFBF2] h-screen flex flex-col justify-center items-center">
        <h3 className="font-cal-sans text-2xl font-bold mb-4">Event Type Not Found</h3>
        <Button to="/dashboard" variant="primary" size="md">Back to Dashboard</Button>
      </div>
    );
  }

  const sidebarTabs = [
    { id: "basics", name: "Basics", icon: Clock },
    { id: "availability", name: "Availability", icon: Calendar },
    { id: "bookingForm", name: "Booking Form", icon: MessageSquare },
    { id: "appearance", name: "Appearance", icon: Sparkles },
    { id: "payments", name: "Payment & Seats", icon: Shield, comingSoon: true },
    { id: "limits", name: "Limits & Buffers", icon: Clock, comingSoon: true },
    { id: "reschedule", name: "Reschedule & Cancel", icon: Clock, comingSoon: true },
    { id: "webhooks", name: "Webhooks", icon: HelpCircle, comingSoon: true },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF2] flex flex-col">
      {/* Edit Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-[#E4E1D4] bg-white">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 border border-transparent hover:border-[#171614]/15 hover:bg-[#FDFBF2] rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4 text-[#171614]" />
          </Link>
          <div className="leading-tight">
            <h1 className="font-cal-sans text-md font-bold text-[#171614] uppercase tracking-wider">{event.title}</h1>
            <p className="text-xs font-semibold text-[#2B2A27]/60">{window.location.host}/{username}/{event.slug}</p>
          </div>
        </div>

        {message && (
          <div className={`text-xs font-bold px-4 py-2 border rounded-xl shadow-[2px_2px_0_rgba(23,22,20,0.08)] ${
            message.type === "success" ? "bg-[#7CEFC0] border-[#171614]/15" : "bg-[#E5484D]/10 border-[#E5484D]/30 text-[#E5484D]"
          }`}>
            {message.text}
          </div>
        )}

        <div className="text-xs font-bold text-[#2B2A27]/60">
          Auto-saves layouts
        </div>
      </header>

      {/* Main composition container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left inner sidebar */}
        <aside className="w-64 border-r border-[#E4E1D4] bg-white p-4 space-y-1.5 overflow-y-auto">
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#7CEFC0] text-[#171614] border-[#171614]/15 translate-x-[-1px] translate-y-[-1px] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                    : "text-[#2B2A27] border-transparent hover:border-[#171614]/15 hover:bg-[#FDFBF2]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-[#171614]" />
                  {tab.name}
                </span>
                {tab.comingSoon && (
                  <span className="text-[9px] bg-[#E4E1D4]/60 border border-[#171614]/10 text-[#171614]/70 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider scale-95">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right workspace panels */}
        <main className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto">
          
          {/* BASICS PANEL */}
          {activeTab === "basics" && (
            <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
              <div>
                <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Basics</h3>
                <p className="text-xs text-[#2B2A27]/60 font-semibold mt-1">Configure meeting link, titles, durations, and locations.</p>
              </div>

              <form onSubmit={handleSaveBasics} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E4E1D4] rounded-xl text-sm bg-white font-semibold text-[#171614] focus:outline-none focus:border-[#B7ACF7] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">URL Slug</label>
                  <div className="flex items-center border border-[#E4E1D4] rounded-xl bg-white px-3 py-2.5 focus-within:border-[#B7ACF7] transition-all font-semibold">
                    <span className="text-sm font-bold text-[#2B2A27]/50 select-none shrink-0 mr-1.5">
                      {window.location.host}/{username}/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                      className="w-full bg-transparent focus:outline-none text-sm text-[#171614] font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">Duration (Minutes)</label>
                  <CustomSelect
                    value={duration}
                    onChange={(val) => setDuration(Number(val))}
                    options={[
                      { value: 15, label: "15 Minutes" },
                      { value: 30, label: "30 Minutes" },
                      { value: 45, label: "45 Minutes" },
                      { value: 60, label: "60 Minutes" },
                    ]}
                  />
                </div>

                {/* Location Configuration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">Location Type</label>
                  <CustomSelect
                    value={locationType === "Video" ? locationDetails : locationType}
                    onChange={(val) => {
                      if (val === "Google Meet" || val === "Zoom") {
                        setLocationType("Video");
                        setLocationDetails(val);
                      } else {
                        setLocationType(val);
                        setLocationDetails("");
                      }
                    }}
                    options={[
                      { value: "Google Meet", label: "Google Meet (Video)" },
                      { value: "Zoom", label: "Zoom (Video)" },
                      { value: "Phone", label: "Phone Call" },
                      { value: "In-Person", label: "In-Person Meeting" },
                    ]}
                  />
                </div>

                {locationType === "Phone" && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1.5 duration-150">
                    <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +1 234 567 890"
                      value={locationDetails}
                      onChange={(e) => setLocationDetails(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#E4E1D4] rounded-xl text-sm bg-white font-semibold text-[#171614] focus:outline-none focus:border-[#B7ACF7] transition-all"
                    />
                  </div>
                )}

                {locationType === "In-Person" && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1.5 duration-150">
                    <label className="block text-xs font-bold text-[#171614] uppercase tracking-wider">Address / Location Details</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Starbucks, 5th Avenue"
                      value={locationDetails}
                      onChange={(e) => setLocationDetails(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#E4E1D4] rounded-xl text-sm bg-white font-semibold text-[#171614] focus:outline-none focus:border-[#B7ACF7] transition-all"
                    />
                  </div>
                )}

                <div className="pt-4 border-t border-[#E4E1D4] flex justify-end">
                  <Button type="submit" variant="primary" size="sm" rounded="xl" shadow="sm" disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Basics
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* AVAILABILITY PANEL */}
          {activeTab === "availability" && (
            <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
              <div>
                <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Availability</h3>
                <p className="text-xs text-[#2B2A27]/60 font-semibold mt-1">Select days and time slots when you're open for bookings.</p>
              </div>

              <div className="space-y-4">
                {availability.map((dayConfig, dayIdx) => (
                  <div key={dayConfig.day} className="flex items-center gap-4 py-3 border-b border-[#E4E1D4]/60 last:border-b-0">
                    <label className="flex items-center gap-3 w-32 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dayConfig.enabled}
                        onChange={() => handleToggleDay(dayIdx)}
                        className="w-4.5 h-4.5 rounded border border-[#E4E1D4] accent-[#7CEFC0] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-[#171614]">{dayConfig.day}</span>
                    </label>

                    {dayConfig.enabled ? (
                      <div className="flex-1 flex items-center gap-2">
                        {dayConfig.slots.map((slot, slotIdx) => {
                          const isStartOpen = activeDropdown?.dayIdx === dayIdx && activeDropdown?.slotIdx === slotIdx && activeDropdown?.type === "start";
                          const isEndOpen = activeDropdown?.dayIdx === dayIdx && activeDropdown?.slotIdx === slotIdx && activeDropdown?.type === "end";

                          return (
                            <div key={slotIdx} className="flex items-center gap-2.5">
                              {/* Custom Time slot Start Trigger */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isStartOpen) {
                                      setActiveDropdown(null);
                                    } else {
                                      setActiveDropdown({ dayIdx, slotIdx, type: "start" });
                                    }
                                  }}
                                  className="px-3.5 py-2 border border-[#E4E1D4] rounded-xl text-xs font-bold text-[#171614] bg-white hover:bg-[#FDFBF2] transition-all flex items-center gap-2 cursor-pointer min-w-[110px] justify-between shadow-sm focus:outline-none focus:border-[#B7ACF7]"
                                >
                                  <span>{formatTime24to12(slot.startTime)}</span>
                                  <ChevronDown className="w-4.5 h-4.5 text-[#2B2A27]/50" />
                                </button>
                                
                                {isStartOpen && (
                                  <div className="absolute top-full left-0 mt-1.5 w-36 max-h-48 overflow-y-auto bg-white border border-[#E4E1D4] rounded-xl shadow-lg z-30 py-1 font-semibold text-xs text-[#171614] animate-in fade-in zoom-in-95 duration-100">
                                    {TIME_OPTIONS.map((opt) => (
                                      <button
                                        type="button"
                                        key={opt.val}
                                        onClick={() => {
                                          handleSlotTimeChange(dayIdx, slotIdx, "startTime", opt.val);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full text-left px-3 py-1.5 hover:bg-[#7CEFC0]/20 hover:text-[#171614] transition-colors cursor-pointer"
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <span className="text-xs font-bold text-[#2B2A27]/60">to</span>

                              {/* Custom Time slot End Trigger */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isEndOpen) {
                                      setActiveDropdown(null);
                                    } else {
                                      setActiveDropdown({ dayIdx, slotIdx, type: "end" });
                                    }
                                  }}
                                  className="px-3.5 py-2 border border-[#E4E1D4] rounded-xl text-xs font-bold text-[#171614] bg-white hover:bg-[#FDFBF2] transition-all flex items-center gap-2 cursor-pointer min-w-[110px] justify-between shadow-sm focus:outline-none focus:border-[#B7ACF7]"
                                >
                                  <span>{formatTime24to12(slot.endTime)}</span>
                                  <ChevronDown className="w-4.5 h-4.5 text-[#2B2A27]/50" />
                                </button>
                                
                                {isEndOpen && (
                                  <div className="absolute top-full left-0 mt-1.5 w-36 max-h-48 overflow-y-auto bg-white border border-[#E4E1D4] rounded-xl shadow-lg z-30 py-1 font-semibold text-xs text-[#171614] animate-in fade-in zoom-in-95 duration-100">
                                    {TIME_OPTIONS.map((opt) => (
                                      <button
                                        type="button"
                                        key={opt.val}
                                        onClick={() => {
                                          handleSlotTimeChange(dayIdx, slotIdx, "endTime", opt.val);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full text-left px-3 py-1.5 hover:bg-[#7CEFC0]/20 hover:text-[#171614] transition-colors cursor-pointer"
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-[#2B2A27]/40 italic">Unavailable</span>
                    )}
                  </div>
                ))}

                <div className="pt-6 border-t border-[#E4E1D4] flex justify-end">
                  <Button onClick={handleSaveAvailability} variant="primary" size="sm" rounded="xl" shadow="sm" disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Availability
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* BOOKING FORM CONFIGURATION PANEL */}
          {activeTab === "bookingForm" && (
            <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Booking Questions</h3>
                  <p className="text-xs text-[#2B2A27]/60 font-semibold mt-1">Configure and edit custom questions shown to your invitees.</p>
                </div>
                {!showAddForm && (
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="secondary"
                    size="sm"
                    rounded="xl"
                    shadow="sm"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />
                    Add Question
                  </Button>
                )}
              </div>

              {/* Add Custom Question Inline Form */}
              {showAddForm && (
                <div className="p-5 border border-[#E4E1D4] rounded-2xl bg-[#F3E75B]/5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E4E1D4]">
                    <h4 className="text-xs font-extrabold uppercase text-[#171614] tracking-wider">New Booking Question</h4>
                    <button onClick={() => setShowAddForm(false)} className="text-xs font-bold text-[#2B2A27] hover:underline">
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#171614]">Question Label</label>
                      <input
                        type="text"
                        value={newFieldLabel}
                        onChange={(e) => setNewFieldLabel(e.target.value)}
                        placeholder="e.g. What is your company size?"
                        className="w-full px-3 py-2 border border-[#E4E1D4] rounded-lg text-xs bg-white font-semibold text-[#171614] focus:outline-none focus:border-[#B7ACF7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#171614]">Input Type</label>
                      <CustomSelect
                        value={newFieldType}
                        onChange={(val) => setNewFieldType(val)}
                        options={[
                          { value: "Short Text", label: "Short Text" },
                          { value: "Long Text", label: "Long Text" },
                          { value: "Phone", label: "Phone" },
                          { value: "Multiple Emails", label: "Multiple Emails" },
                        ]}
                        size="sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#171614]">Status</label>
                      <CustomSelect
                        value={newFieldStatus}
                        onChange={(val) => setNewFieldStatus(val as any)}
                        options={[
                          { value: "Required", label: "Required" },
                          { value: "Optional", label: "Optional" },
                          { value: "Hidden", label: "Hidden" },
                        ]}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={handleAddField} variant="primary" size="sm" rounded="xl" disabled={!newFieldLabel.trim()}>
                      Add to Form
                    </Button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-3.5">
                {bookingFields.map((field) => (
                  <div key={field.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-[#E4E1D4] rounded-xl bg-[#FDFBF2]/20 hover:bg-[#FDFBF2]/40 transition-all gap-4">
                    
                    {/* Left details (with edit mode support) */}
                    <div className="flex-1">
                      {editingFieldId === field.id ? (
                        <div className="flex items-center gap-2 max-w-md">
                          <input
                            type="text"
                            value={editingLabel}
                            onChange={(e) => setEditingLabel(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-[#E4E1D4] rounded-lg text-xs bg-white font-semibold text-[#171614] focus:outline-none focus:border-[#B7ACF7]"
                          />
                          <button
                            onClick={() => saveFieldLabel(field.id)}
                            className="p-1.5 bg-[#7CEFC0]/20 hover:bg-[#7CEFC0] border border-[#171614]/15 rounded-lg text-[#171614] transition-all"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#171614]">{field.label}</h4>
                          <span className="text-[9px] bg-[#B7ACF7]/20 border border-[#B7ACF7]/40 px-1.5 py-0.5 rounded font-extrabold text-[#171614]/85 uppercase tracking-wide">
                            {field.type}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right actions (Status & Edit options) */}
                    <div className="flex items-center gap-3 shrink-0">
                      {field.editable ? (
                        <>
                          <CustomSelect
                            value={field.status}
                            onChange={(val) => handleFieldStatusChange(field.id, val as any)}
                            options={[
                              { value: "Required", label: "Required" },
                              { value: "Optional", label: "Optional" },
                              { value: "Hidden", label: "Hidden" },
                            ]}
                            size="sm"
                            className="w-28"
                          />

                          {editingFieldId !== field.id && (
                            <button
                              onClick={() => startEditField(field.id, field.label)}
                              className="p-1.5 border border-[#E4E1D4] rounded-lg hover:border-[#171614] hover:bg-white text-[#2B2A27] transition-all cursor-pointer"
                              title="Edit Label"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteField(field.id)}
                            className="p-1.5 border border-transparent hover:border-[#E5484D]/35 hover:bg-[#E5484D]/10 rounded-lg text-[#E5484D] transition-all cursor-pointer"
                            title="Delete Field"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-[#23C585] bg-[#23C585]/10 border border-[#23C585]/20 px-3 py-1.5 rounded-lg select-none">
                          Required (System)
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-[#E4E1D4] flex justify-end">
                  <Button onClick={handleSaveBookingForm} variant="primary" size="sm" rounded="xl" shadow="sm" disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Questions
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE PANEL */}
          {activeTab === "appearance" && (
            <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-6">
              <div>
                <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Appearance Layouts</h3>
                <p className="text-xs text-[#2B2A27]/60 font-semibold mt-1">Select 3-4 options of the form layout design.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Classic Neo-brutalist */}
                <button
                  type="button"
                  onClick={() => handleSaveAppearance("classic")}
                  className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
                    appearance === "classic"
                      ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                      : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#171614]">⚡ Neo-Brutalist Classic</span>
                    {appearance === "classic" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Thick black borders, high contrast palettes, and heavy retro shadow effects.</p>
                </button>

                {/* Minimalist Modern */}
                <button
                  type="button"
                  onClick={() => handleSaveAppearance("minimal")}
                  className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
                    appearance === "minimal"
                      ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                      : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#171614]">✨ Modern Minimalist</span>
                    {appearance === "minimal" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Subtle grey margins, warm typography, and no block shadows. Pure elegance.</p>
                </button>

                {/* Dark Mode Glass */}
                <button
                  type="button"
                  onClick={() => handleSaveAppearance("dark")}
                  className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
                    appearance === "dark"
                      ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                      : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#171614]">🕶 Dark Mode Glass</span>
                    {appearance === "dark" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Translucent dark layout panels, glow effects, and modern workspace gradients.</p>
                </button>

                {/* Sage Cozy */}
                <button
                  type="button"
                  onClick={() => handleSaveAppearance("sage")}
                  className={`border rounded-2xl p-5 text-left transition-all cursor-pointer ${
                    appearance === "sage"
                      ? "bg-[#F3E75B]/20 border-[#171614] shadow-[2px_2px_0_rgba(23,22,20,0.08)]"
                      : "bg-white hover:bg-[#FDFBF2] border-[#E4E1D4] shadow-[2px_2px_0_rgba(23,22,20,0.04)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#171614]">🌿 Cozy Sage</span>
                    {appearance === "sage" && <Check className="w-4 h-4 text-[#171614] stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-[#2B2A27]/70 font-semibold">Soft sage green outlines, organic rounded corners, and pastel background colors.</p>
                </button>
              </div>
            </div>
          )}

          {/* DUMMY/COMING SOON PANELS */}
          {["payments", "limits", "reschedule", "webhooks"].includes(activeTab) && (
            <div className="bg-white border border-[#E4E1D4] rounded-2xl p-12 text-center shadow-[3px_3px_0_rgba(23,22,20,0.08)] space-y-4">
              <Sparkles className="w-12 h-12 text-[#171614] mx-auto opacity-75" />
              <h3 className="font-cal-sans text-xl font-bold uppercase tracking-wider text-[#171614]">Coming Soon!</h3>
              <p className="text-[#2B2A27]/70 text-sm max-w-sm mx-auto font-semibold">
                We are building the rest of the layout configurations very soon. Stay tuned!
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
export default EventEditPage;
