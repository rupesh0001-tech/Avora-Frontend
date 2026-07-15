import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Calendar as CalendarIcon, Clock, Globe, MapPin, Video, CheckCircle2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";

interface HostDetails {
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  username: string;
}

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

interface BookedSlot {
  startTime: string;
  endTime: string;
}

export default function BookingPage() {
  const { username, slug } = useParams<{ username: string; slug: string }>();
  const navigate = useNavigate();

  // Search parameters for deep linking & step routing
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParam = searchParams.get("step");
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");

  // Public data from API
  const [host, setHost] = useState<HostDetails | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Booking Flow States
  const [step, setStep] = useState<"dateTime" | "form" | "success">("dateTime");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // "09:30"
  
  // Month selector calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Form Inputs State
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");
  const [customFieldsData, setCustomFieldsData] = useState<Record<string, string>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  // Load public event details
  useEffect(() => {
    async function loadEventData() {
      try {
        setIsLoading(true);
        setErrorMsg("");
        
        const res = await axios.get(`http://localhost:5001/api/bookings/public/${username}/${slug}`);
        setHost(res.data.host);
        setEventType(res.data.eventType);

        // Load saved form data from localStorage
        const savedName = localStorage.getItem("cally_attendeeName");
        const savedEmail = localStorage.getItem("cally_attendeeEmail");
        const savedPhone = localStorage.getItem("cally_attendeePhone");
        const savedCustom = localStorage.getItem("cally_customFieldsData");

        if (savedName) setAttendeeName(savedName);
        if (savedEmail) setAttendeeEmail(savedEmail);
        if (savedPhone) setAttendeePhone(savedPhone);
        if (savedCustom) {
          try {
            setCustomFieldsData(JSON.parse(savedCustom));
          } catch (e) {
            console.error("Failed to parse custom fields localStorage data", e);
          }
        }

        // Auto-select first available date starting from today so calendar and slots are shown at the same time
        if (!dateParam) {
          const today = new Date();
          let defaultDate = new Date(today);
          let found = false;
          
          for (let offset = 0; offset < 30; offset++) {
            const checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
            const weekdayName = checkDate.toLocaleDateString("en-US", { weekday: "long" });
            const dayConfig = res.data.eventType.availability?.find((a: any) => a.day === weekdayName);
            
            if (dayConfig?.enabled) {
              defaultDate = checkDate;
              found = true;
              break;
            }
          }
          
          if (found) {
            setSelectedDate(defaultDate);
            setCurrentMonth(defaultDate);
          }
        }
      } catch (err: any) {
        console.error("Public event details fetch failed:", err);
        setErrorMsg(err.response?.data?.error || "This booking link seems invalid or expired.");
      } finally {
        setIsLoading(false);
      }
    }
    if (username && slug) loadEventData();
  }, [username, slug]);

  // Sync step and date/time parameters with browser query strings
  useEffect(() => {
    if (eventType) {
      if (stepParam === "2" && dateParam && timeParam) {
        const parsedDate = new Date(dateParam);
        setSelectedDate(parsedDate);
        setCurrentMonth(parsedDate);
        setSelectedTime(timeParam);
        setStep("form");
      } else if (stepParam === "3" || stepParam === "success") {
        setStep("success");
      } else {
        setStep("dateTime");
        // Pre-select first date initially
        if (!selectedDate && eventType.availability) {
          const today = new Date();
          for (let offset = 0; offset < 30; offset++) {
            const checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
            const weekdayName = checkDate.toLocaleDateString("en-US", { weekday: "long" });
            const dayConfig = eventType.availability.find((a) => a.day === weekdayName);
            if (dayConfig?.enabled) {
              setSelectedDate(checkDate);
              setCurrentMonth(checkDate);
              break;
            }
          }
        }
        
        // Push step=1 to query params if not set
        if (!searchParams.get("step")) {
          const params: Record<string, string> = { step: "1" };
          if (selectedDate) {
            params.date = selectedDate.toISOString().split("T")[0];
          }
          setSearchParams(params);
        }
      }
    }
  }, [eventType, stepParam, dateParam, timeParam]);

  // Load booked slots when a date is selected
  useEffect(() => {
    async function loadBookedSlots() {
      if (!username || !slug || !selectedDate) return;
      try {
        const dateStr = selectedDate.toISOString().split("T")[0];
        const res = await axios.get(`http://localhost:5001/api/bookings/public/${username}/${slug}?date=${dateStr}`);
        setBookedSlots(res.data.bookedSlots || []);
      } catch (err) {
        console.error("Failed to load booked slots for date:", err);
      }
    }
    loadBookedSlots();
  }, [selectedDate, username, slug]);

  // Update query parameters when slot selection is updated
  const handleSelectDateTime = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    const dateStr = date.toISOString().split("T")[0];
    setSearchParams({ step: "2", date: dateStr, time });
    setStep("form");
  };

  const handleBackToDateTime = () => {
    setSelectedTime(null);
    const params: Record<string, string> = { step: "1" };
    if (selectedDate) {
      params.date = selectedDate.toISOString().split("T")[0];
    }
    setSearchParams(params);
    setStep("dateTime");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FDFBF2]">
        <div className="w-12 h-12 rounded-full border-4 border-[#171614] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (errorMsg || !eventType || !host) {
    return (
      <div className="min-h-screen bg-[#FDFBF2] flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-white border border-[#E4E1D4] rounded-2xl p-8 max-w-md shadow-lg space-y-4">
          <h3 className="font-cal-sans text-xl font-bold text-[#E5484D]">Link Unavailable</h3>
          <p className="text-sm font-semibold text-[#2B2A27]/70">{errorMsg || "The requested scheduling page is not active."}</p>
          <Button onClick={() => navigate("/")} variant="primary" size="sm">Go Home</Button>
        </div>
      </div>
    );
  }

  // --- CALENDAR GENERATION HELPERS ---
  const getDaysInMonth = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayIndex = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    let idx = new Date(year, month, 1).getDay();
    return idx === 0 ? 6 : idx - 1;
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDaySelectable = (dayNum: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
    if (checkDate < today) return false;

    const weekdayName = checkDate.toLocaleDateString("en-US", { weekday: "long" });
    const dayConfig = eventType.availability?.find((a) => a.day === weekdayName);
    
    return !!dayConfig?.enabled;
  };

  // --- TIME SLOT GENERATION ---
  const generateAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const weekdayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    const dayConfig = eventType.availability?.find((a) => a.day === weekdayName);
    
    if (!dayConfig || !dayConfig.enabled || !dayConfig.slots) return [];

    const slots: string[] = [];
    const dateStr = selectedDate.toISOString().split("T")[0];

    dayConfig.slots.forEach((range) => {
      let currentMinutes = timeToMinutes(range.startTime);
      const endMinutes = timeToMinutes(range.endTime);

      while (currentMinutes + eventType.duration <= endMinutes) {
        const slotTimeStr = minutesToTime(currentMinutes);
        
        const isBusy = bookedSlots.some((booked) => {
          const bStart = new Date(booked.startTime).getTime();
          const bEnd = new Date(booked.endTime).getTime();
          const sStart = new Date(`${dateStr}T${slotTimeStr}:00Z`).getTime();
          const sEnd = sStart + eventType.duration * 60 * 1000;

          return (sStart >= bStart && sStart < bEnd) || (sEnd > bStart && sEnd <= bEnd);
        });

        if (!isBusy) {
          slots.push(slotTimeStr);
        }
        
        currentMinutes += eventType.duration;
      }
    });

    return slots;
  };

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (min: number) => {
    const h = Math.floor(min / 60).toString().padStart(2, "0");
    const m = (min % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const formatTimeSlotLabel = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  // --- APPEARANCE THEMES DESIGN SYSTEM ---
  const getThemeStyles = () => {
    switch (eventType.appearance) {
      case "minimal":
        return {
          wrapper: "bg-[#FAFAFA] min-h-screen text-gray-800 font-sans flex items-center justify-center p-4 md:p-8",
          card: "bg-white border border-gray-200 rounded-xl shadow-sm",
          accentText: "text-blue-600",
          accentBg: "bg-blue-600 hover:bg-blue-700 text-white font-bold",
          buttonSelected: "bg-blue-50 text-blue-600 border-blue-200",
          tagBg: "bg-gray-100 text-gray-700",
          
          textMain: "text-gray-900",
          textMuted: "text-gray-500",
          textFaded: "text-gray-400",
          bgMain: "bg-white",
          bgSub: "bg-gray-55",
          borderMain: "border-gray-200",
          borderSub: "border-gray-100",
          inputBg: "bg-white",
          inputText: "text-gray-800",
          inputPlaceholder: "placeholder:text-gray-400/70",
          dayHover: "hover:bg-gray-50",
          timeSlotBg: "bg-white",
          timeSlotHover: "hover:bg-gray-50 hover:border-gray-300",
          dayBg: "bg-white",
          dayDisabledText: "text-gray-200",
        };
      case "dark":
        return {
          wrapper: "bg-[#09090B] min-h-screen text-[#F4F4F5] font-sans flex items-center justify-center p-4 md:p-8",
          card: "bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl",
          accentText: "text-[#7CEFC0]",
          accentBg: "bg-[#7CEFC0] hover:bg-[#58D9A6] text-[#09090B] font-extrabold shadow-[2px_2px_0_rgba(124,239,192,0.15)]",
          buttonSelected: "bg-[#7CEFC0] text-[#09090B] border-[#7CEFC0] shadow-[2px_2px_0_rgba(124,239,192,0.1)]",
          tagBg: "bg-[#27272A] text-[#E4E4E7] border border-[#3F3F46]",
          
          textMain: "text-[#F4F4F5]",
          textMuted: "text-[#A1A1AA]",
          textFaded: "text-[#71717A]",
          bgMain: "bg-[#18181B]",
          bgSub: "bg-[#27272A]/40",
          borderMain: "border-[#27272A]",
          borderSub: "border-[#27272A]/60",
          inputBg: "bg-[#09090B]",
          inputText: "text-[#F4F4F5]",
          inputPlaceholder: "placeholder:text-[#71717A]/80",
          dayHover: "hover:bg-[#27272A] hover:text-white",
          timeSlotBg: "bg-[#09090B]",
          timeSlotHover: "hover:bg-[#27272A] hover:border-[#3F3F46]",
          dayBg: "bg-[#09090B]",
          dayDisabledText: "text-[#71717A]/25",
        };
      case "sage":
        return {
          wrapper: "bg-[#F4F7F4] min-h-screen text-[#1E2E1F] font-sans flex items-center justify-center p-4 md:p-8",
          card: "bg-white border border-[#E1EDE1] rounded-2xl shadow-md",
          accentText: "text-emerald-800",
          accentBg: "bg-emerald-700 hover:bg-emerald-800 text-white font-bold",
          buttonSelected: "bg-emerald-50 text-emerald-800 border-emerald-200",
          tagBg: "bg-emerald-50 text-emerald-900",
          
          textMain: "text-[#1E2E1F]",
          textMuted: "text-[#3D4F3E]",
          textFaded: "text-[#3D4F3E]/60",
          bgMain: "bg-white",
          bgSub: "bg-[#F4F7F4]/40",
          borderMain: "border-[#E1EDE1]",
          borderSub: "border-[#E1EDE1]/60",
          inputBg: "bg-white",
          inputText: "text-[#1E2E1F]",
          inputPlaceholder: "placeholder:text-[#3D4F3E]/40",
          dayHover: "hover:bg-[#F4F7F4]",
          timeSlotBg: "bg-white",
          timeSlotHover: "hover:bg-[#F4F7F4] hover:border-emerald-200",
          dayBg: "bg-white",
          dayDisabledText: "text-[#3D4F3E]/20",
        };
      case "classic":
      default:
        return {
          wrapper: "bg-[#FDFBF2] bg-[radial-gradient(#E4E1D4_1.5px,transparent_1.5px)] bg-[length:24px_24px] min-h-screen text-[#171614] font-sans flex items-center justify-center p-4 md:p-8",
          card: "bg-white border border-[#E4E1D4] rounded-2xl shadow-[3px_3px_0_rgba(23,22,20,0.08)]",
          accentText: "text-[#171614]",
          accentBg: "bg-[#7CEFC0] hover:bg-[#58D9A6] text-[#171614] border border-[#171614]/15 shadow-[2px_2px_0_rgba(23,22,20,0.15)]",
          buttonSelected: "bg-[#7CEFC0] text-[#171614] border-[#171614]/15 shadow-[2px_2px_0_rgba(23,22,20,0.08)]",
          tagBg: "bg-[#B7ACF7]/25 text-[#171614] border border-[#171614]/10",
          
          textMain: "text-[#171614]",
          textMuted: "text-[#2B2A27]/70",
          textFaded: "text-[#2B2A27]/40",
          bgMain: "bg-white",
          bgSub: "bg-[#FDFBF2]/30",
          borderMain: "border-[#E4E1D4]",
          borderSub: "border-[#E4E1D4]/60",
          inputBg: "bg-white",
          inputText: "text-[#171614]",
          inputPlaceholder: "placeholder:text-[#2B2A27]/35",
          dayHover: "hover:bg-[#FDFBF2]",
          timeSlotBg: "bg-white",
          timeSlotHover: "hover:bg-[#FDFBF2] hover:border-[#171614]/20",
          dayBg: "bg-white",
          dayDisabledText: "text-[#2B2A27]/20",
        };
    }
  };

  const theme = getThemeStyles();
  const availableSlots = generateAvailableTimeSlots();

  // --- SUBMISSION ---
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const dateStr = selectedDate.toISOString().split("T")[0];
    const ISOstartTime = new Date(`${dateStr}T${selectedTime}:00Z`).toISOString();

    try {
      const res = await axios.post("http://localhost:5001/api/bookings", {
        eventTypeId: eventType.id,
        startTime: ISOstartTime,
        attendeeName,
        attendeeEmail,
        attendeePhone: attendeePhone || undefined,
        bookingFieldsData: customFieldsData,
      });

      // Clear local storage on success
      localStorage.removeItem("cally_attendeeName");
      localStorage.removeItem("cally_attendeeEmail");
      localStorage.removeItem("cally_attendeePhone");
      localStorage.removeItem("cally_customFieldsData");

      setSuccessBooking(res.data.booking);
      setSearchParams({ step: "3" });
      setStep("success");
    } catch (err: any) {
      console.error("Booking failed:", err);
      setErrorMsg(err.response?.data?.error || "Booking failed. Please try a different slot.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomFieldChange = (fieldId: string, val: string) => {
    const updated = { ...customFieldsData, [fieldId]: val };
    setCustomFieldsData(updated);
    localStorage.setItem("cally_customFieldsData", JSON.stringify(updated));
  };

  return (
    <div className={theme.wrapper}>
      <div className={`w-full max-w-4xl ${theme.card} flex flex-col md:flex-row overflow-hidden`}>
        
        {/* Left column: Host & Meeting details */}
        <div className={`p-6 md:p-8 border-b md:border-b-0 md:border-r ${theme.borderSub} w-full md:w-80 shrink-0 space-y-5 bg-[#FDFBF2]/20`}>
          {step === "form" && (
            <button
              onClick={handleBackToDateTime}
              className={`mb-4 flex items-center gap-1.5 text-xs font-bold hover:underline ${theme.textMuted} hover:${theme.textMain} cursor-pointer`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {/* Host details */}
          <div className="flex items-center gap-3">
            {host.imageUrl ? (
              <img
                src={host.imageUrl}
                alt={`${host.firstName} avatar`}
                className={`w-11 h-11 rounded-full border ${theme.borderMain} object-cover`}
              />
            ) : (
              <div className={`w-11 h-11 rounded-full bg-[#B7ACF7] border ${theme.borderMain} flex items-center justify-center font-bold text-[#171614]`}>
                {host.firstName?.[0] || host.username[0].toUpperCase()}
              </div>
            )}
            <div className="leading-tight">
              <span className={`text-[10px] font-bold ${theme.textFaded} uppercase tracking-wide`}>Hosted by</span>
              <h4 className={`text-xs font-bold ${theme.textMain}`}>
                {host.firstName} {host.lastName}
              </h4>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className={`font-cal-sans text-xl font-bold uppercase tracking-wider ${theme.textMain}`}>
              {eventType.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md ${theme.tagBg}`}>
                {eventType.price > 0 ? `$${eventType.price}.00` : "Free"}
              </span>
            </div>
          </div>

          <div className={`space-y-3.5 text-xs font-semibold ${theme.textMuted}`}>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4.5 h-4.5 text-current opacity-70" />
              <span>{eventType.duration} Minutes</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              {eventType.locationType === "Video" ? (
                <Video className="w-4.5 h-4.5 text-current opacity-70" />
              ) : (
                <MapPin className="w-4.5 h-4.5 text-current opacity-70" />
              )}
              <span>
                {eventType.locationType} ({eventType.locationDetails})
              </span>
            </div>

            {selectedDate && (
              <div className="flex items-center gap-2.5 text-[#23C585] font-bold animate-in fade-in duration-200">
                <CalendarIcon className="w-4.5 h-4.5 text-[#23C585]" />
                <span>
                  {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  {selectedTime && ` @ ${formatTimeSlotLabel(selectedTime)}`}
                </span>
              </div>
            )}

            <div className={`flex items-center gap-2.5 ${theme.textFaded}`}>
              <Globe className="w-4.5 h-4.5 text-current opacity-70" />
              <span>Coordinated Universal Time (UTC)</span>
            </div>
          </div>
        </div>

        {/* Right column: Step content */}
        <div className={`flex-1 ${theme.bgMain} flex flex-col md:flex-row min-h-[420px]`}>
          
          {/* STEP 1: Date & Time Picker */}
          {step === "dateTime" && (
            <>
              {/* Calendar pane */}
              <div className="flex-1 p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className={`font-cal-sans text-sm font-bold ${theme.textMain} uppercase tracking-wider`}>
                    Select Date & Time
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMonth}
                      className={`p-1.5 border ${theme.borderMain} hover:${theme.dayHover} rounded-lg cursor-pointer ${theme.textMuted}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className={`p-1.5 border ${theme.borderMain} hover:${theme.dayHover} rounded-lg cursor-pointer ${theme.textMuted}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid Header */}
                <div className={`text-center font-bold text-xs ${theme.textMain} mb-2 uppercase tracking-wide`}>
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>

                {/* Week Day Labels */}
                <div className={`grid grid-cols-7 gap-1 text-center font-bold text-[10px] ${theme.textFaded} uppercase`}>
                  {daysOfWeek.map((day) => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>

                {/* Month Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty offsets for start of month */}
                  {Array.from({ length: getFirstDayIndex(currentMonth) }).map((_, i) => (
                    <div key={`offset-${i}`} className="py-2" />
                  ))}

                  {/* Day Buttons */}
                  {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                    const dayNum = i + 1;
                    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                    const isSelectable = isDaySelectable(dayNum);
                    const isSelected = selectedDate?.getDate() === dayNum &&
                                       selectedDate?.getMonth() === currentMonth.getMonth() &&
                                       selectedDate?.getFullYear() === currentMonth.getFullYear();

                    return (
                      <button
                        type="button"
                        key={dayNum}
                        disabled={!isSelectable}
                        onClick={() => {
                          setSelectedDate(checkDate);
                          setSelectedTime(null);
                          // Sync param without switching step
                          const dateStr = checkDate.toISOString().split("T")[0];
                          setSearchParams({ step: "1", date: dateStr });
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? theme.buttonSelected
                            : isSelectable
                            ? `${theme.dayBg} ${theme.borderMain} ${theme.textMain} ${theme.dayHover}`
                            : `bg-transparent border-transparent cursor-not-allowed select-none ${theme.dayDisabledText}`
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Side Pane (Always visible side-by-side) */}
              <div className={`w-full md:w-56 p-6 md:p-8 md:border-l ${theme.borderSub} ${theme.bgSub} flex flex-col`}>
                <div className={`text-xs font-bold ${theme.textMain} uppercase mb-4 tracking-wider text-center md:text-left`}>
                  Available Slots
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[300px]">
                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      availableSlots.map((slot) => {
                        const isTimeSelected = selectedTime === slot;
                        return (
                          <div key={slot} className="space-y-1.5 animate-in fade-in duration-150">
                            <button
                              type="button"
                              onClick={() => handleSelectDateTime(selectedDate, slot)}
                              className={`w-full py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                                isTimeSelected
                                  ? theme.buttonSelected
                                  : `${theme.timeSlotBg} ${theme.borderMain} ${theme.textMain} ${theme.timeSlotHover} shadow-sm`
                              }`}
                            >
                              {formatTimeSlotLabel(slot)}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className={`text-center py-10 text-xs font-semibold ${theme.textFaded} italic`}>
                        No slots available.
                      </div>
                    )
                  ) : (
                    <div className={`text-center py-10 text-xs font-semibold ${theme.textFaded} italic`}>
                      Select a date.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Booking Form */}
          {step === "form" && (
            <form onSubmit={handleBookingSubmit} className={`flex-1 p-6 md:p-8 space-y-5 ${theme.bgMain}`}>
              <h3 className={`font-cal-sans text-sm font-bold ${theme.textMain} uppercase tracking-wider pb-3 border-b ${theme.borderSub}`}>
                Attendee Details
              </h3>

              {errorMsg && (
                <div className="p-3 bg-[#E5484D]/10 border border-[#E5484D]/30 text-[#E5484D] text-xs font-bold rounded-xl">
                  ✕ {errorMsg}
                </div>
              )}

              {/* Dynamic form questionnaire matching default/custom bookingFields */}
              <div className="space-y-4">
                {eventType.bookingFields?.map((field) => {
                  if (field.status === "Hidden") return null;
                  const isRequired = field.status === "Required";
                  
                  // Map "name" ID to attendeeName
                  if (field.id === "name") {
                    return (
                      <div key={field.id} className="space-y-1.5">
                        <label className={`block text-xs font-bold ${theme.textMain} uppercase tracking-wider`}>
                          {field.label} {isRequired && <span className="text-[#E5484D]">*</span>}
                        </label>
                        <input
                          type="text"
                          required={isRequired}
                          value={attendeeName}
                          onChange={(e) => {
                            setAttendeeName(e.target.value);
                            localStorage.setItem("cally_attendeeName", e.target.value);
                          }}
                          placeholder="e.g. Alex Rivera"
                          className={`w-full px-4 py-2.5 border ${theme.borderMain} rounded-xl text-xs ${theme.inputBg} font-semibold ${theme.inputText} ${theme.inputPlaceholder} focus:outline-none focus:border-[#B7ACF7] transition-all`}
                        />
                      </div>
                    );
                  }

                  // Map "email" ID to attendeeEmail
                  if (field.id === "email") {
                    return (
                      <div key={field.id} className="space-y-1.5">
                        <label className={`block text-xs font-bold ${theme.textMain} uppercase tracking-wider`}>
                          {field.label} {isRequired && <span className="text-[#E5484D]">*</span>}
                        </label>
                        <input
                          type="email"
                          required={isRequired}
                          value={attendeeEmail}
                          onChange={(e) => {
                            setAttendeeEmail(e.target.value);
                            localStorage.setItem("cally_attendeeEmail", e.target.value);
                          }}
                          placeholder="alex@example.com"
                          className={`w-full px-4 py-2.5 border ${theme.borderMain} rounded-xl text-xs ${theme.inputBg} font-semibold ${theme.inputText} ${theme.inputPlaceholder} focus:outline-none focus:border-[#B7ACF7] transition-all`}
                        />
                      </div>
                    );
                  }

                  // Map "phone" ID to attendeePhone
                  if (field.id === "phone" || field.type === "Phone") {
                    return (
                      <div key={field.id} className="space-y-1.5">
                        <label className={`block text-xs font-bold ${theme.textMain} uppercase tracking-wider`}>
                          {field.label} {isRequired && <span className="text-[#E5484D]">*</span>}
                        </label>
                        <input
                          type="tel"
                          required={isRequired}
                          value={attendeePhone}
                          onChange={(e) => {
                            setAttendeePhone(e.target.value);
                            localStorage.setItem("cally_attendeePhone", e.target.value);
                          }}
                          placeholder="e.g. +1 (555) 019-2834"
                          className={`w-full px-4 py-2.5 border ${theme.borderMain} rounded-xl text-xs ${theme.inputBg} font-semibold ${theme.inputText} ${theme.inputPlaceholder} focus:outline-none focus:border-[#B7ACF7] transition-all`}
                        />
                      </div>
                    );
                  }

                  // Render long text questions (e.g. Additional details) with text-xs class for typing text
                  if (field.type === "Long Text" || field.id === "notes") {
                    return (
                      <div key={field.id} className="space-y-1.5">
                        <label className={`block text-xs font-bold ${theme.textMain} uppercase tracking-wider`}>
                          {field.label} {isRequired && <span className="text-[#E5484D]">*</span>}
                        </label>
                        <textarea
                          required={isRequired}
                          rows={3}
                          value={customFieldsData[field.id] || ""}
                          onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                          placeholder="Please share details..."
                          className={`w-full px-4 py-2.5 border ${theme.borderMain} rounded-xl text-xs ${theme.inputBg} font-semibold ${theme.inputText} ${theme.inputPlaceholder} focus:outline-none focus:border-[#B7ACF7] transition-all`}
                        />
                      </div>
                    );
                  }

                  // Render standard fields
                  return (
                    <div key={field.id} className="space-y-1.5">
                      <label className={`block text-xs font-bold ${theme.textMain} uppercase tracking-wider`}>
                        {field.label} {isRequired && <span className="text-[#E5484D]">*</span>}
                      </label>
                      <input
                        type="text"
                        required={isRequired}
                        value={customFieldsData[field.id] || ""}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        placeholder="Your answer..."
                        className={`w-full px-4 py-2.5 border ${theme.borderMain} rounded-xl text-xs ${theme.inputBg} font-semibold ${theme.inputText} ${theme.inputPlaceholder} focus:outline-none focus:border-[#B7ACF7] transition-all`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className={`pt-4 border-t ${theme.borderSub} flex justify-end`}>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rounded="xl"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Event"}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Booking Success */}
          {step === "success" && successBooking && (
            <div className={`flex-1 p-6 md:p-10 flex flex-col justify-center items-center text-center space-y-5 ${theme.bgMain}`}>
              <CheckCircle2 className="w-16 h-16 text-[#23C585]" />
              
              <div className="space-y-2">
                <h2 className={`font-cal-sans text-xl font-bold uppercase tracking-wider ${theme.textMain}`}>
                  Booking Confirmed!
                </h2>
                <p className={`text-sm font-semibold ${theme.textMuted} max-w-sm`}>
                  A calendar invite has been sent to your email. We look forward to meeting you!
                </p>
              </div>

              <div className={`p-5 border ${theme.borderMain} rounded-2xl ${theme.bgSub} w-full max-w-sm space-y-3.5 text-xs text-left font-bold ${theme.textMain}`}>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase ${theme.textFaded} block`}>Topic</span>
                  <span>{eventType.title}</span>
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase ${theme.textFaded} block`}>Guest details</span>
                  <span>{attendeeName} ({attendeeEmail})</span>
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase ${theme.textFaded} block`}>Scheduled Time</span>
                  <span>
                    {new Date(successBooking.startTime).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    {" @ "}
                    {formatTimeSlotLabel(selectedTime || "")} (UTC)
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
