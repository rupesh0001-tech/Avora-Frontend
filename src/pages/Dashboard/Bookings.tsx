import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Calendar, Clock, User, Mail, Phone, MapPin, Video, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useApi } from "../../lib/api";

interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string | null;
  bookingFieldsData: Record<string, any> | null;
  eventType: {
    title: string;
    duration: number;
    locationType: string;
    locationDetails: string;
  };
}

export default function BookingsPage() {
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await api.get("/bookings");
      setBookings(res.data.bookings || []);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setErrorMsg("Failed to load your scheduled bookings list.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleExpand = (id: string) => {
    if (expandedBookingId === id) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(id);
    }
  };

  const formatTimeSlotLabel = (timeISO: string) => {
    const d = new Date(timeISO);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  const formatBookingDate = (timeISO: string) => {
    const d = new Date(timeISO);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  if (isLoading) {
    return (
      <div className={clsx('flex', 'items-center', 'justify-center', 'p-20')}>
        <div className={clsx('w-10', 'h-10', 'rounded-full', 'border-4', 'border-[#171614]', 'border-t-transparent', 'animate-spin')}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className={clsx('flex', 'justify-between', 'items-center', 'bg-white', 'border', 'border-[#E4E1D4]', 'rounded-2xl', 'p-6', 'shadow-[3px_3px_0_rgba(23,22,20,0.08)]')}>
        <div>
          <h3 className={clsx('font-cal-sans', 'text-xl', 'font-bold', 'text-[#171614]', 'uppercase', 'tracking-wide')}>
            Bookings List
          </h3>
          <p className={clsx('text-xs', 'font-semibold', 'text-[#2B2A27]/60', 'mt-1')}>
            View all appointments booked by guests on your scheduling links.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className={clsx('p-2', 'border', 'border-[#E4E1D4]', 'rounded-xl', 'hover:border-[#171614]', 'hover:bg-[#FDFBF2]', 'transition-all', 'cursor-pointer')}
          title="Refresh"
        >
          <RefreshCw className={clsx('w-4', 'h-4', 'text-[#171614]')} />
        </button>
      </div>

      {errorMsg && (
        <div className={clsx('p-4', 'bg-[#E5484D]/10', 'border', 'border-[#E5484D]/30', 'text-[#E5484D]', 'text-xs', 'font-bold', 'rounded-2xl')}>
          ✕ {errorMsg}
        </div>
      )}

      {/* Bookings cards/rows */}
      {bookings.length === 0 ? (
        <div className={clsx('bg-white', 'border', 'border-[#E4E1D4]', 'rounded-2xl', 'p-12', 'text-center', 'shadow-[3px_3px_0_rgba(23,22,20,0.08)]', 'space-y-3')}>
          <Calendar className={clsx('w-10', 'h-10', 'text-[#171614]', 'opacity-50', 'mx-auto')} />
          <h4 className={clsx('font-cal-sans', 'text-sm', 'font-bold', 'uppercase', 'tracking-wider', 'text-[#171614]')}>
            No Bookings Found
          </h4>
          <p className={clsx('text-xs', 'font-semibold', 'text-[#2B2A27]/60', 'max-w-xs', 'mx-auto')}>
            Once invitees schedule meetings on your public links, they will be listed here.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {bookings.map((booking) => {
            const isExpanded = expandedBookingId === booking.id;
            const hasCustomFields = booking.bookingFieldsData && Object.keys(booking.bookingFieldsData).length > 0;

            return (
              <div
                key={booking.id}
                className={clsx('bg-white', 'border', 'border-[#E4E1D4]', 'rounded-2xl', 'shadow-[3px_3px_0_rgba(23,22,20,0.06)]', 'hover:shadow-[3px_3px_0_rgba(23,22,20,0.1)]', 'hover:border-[#171614]/30', 'transition-all', 'overflow-hidden')}
              >
                {/* Summary View header */}
                <div
                  onClick={() => toggleExpand(booking.id)}
                  className={clsx('p-5', 'flex', 'flex-col', 'md:flex-row', 'md:items-center', 'justify-between', 'gap-4', 'cursor-pointer', 'select-none')}
                >
                  {/* Left Column: Date & time details */}
                  <div className={clsx('flex', 'items-start', 'gap-4')}>
                    <div className={clsx('p-3', 'bg-[#7CEFC0]/20', 'border', 'border-[#7CEFC0]/40', 'rounded-xl', 'text-center', 'min-w-[100px]')}>
                      <span className={clsx('text-[10px]', 'font-extrabold', 'uppercase', 'text-[#171614]', 'block', 'tracking-wide')}>
                        {new Date(booking.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className={clsx('text-[11px]', 'font-bold', 'text-[#2B2A27]/85', 'block', 'mt-0.5')}>
                        {formatTimeSlotLabel(booking.startTime)}
                      </span>
                    </div>

                    <div>
                      <h4 className={clsx('font-cal-sans', 'text-sm', 'font-bold', 'text-[#171614]', 'uppercase', 'tracking-wide')}>
                        {booking.eventType.title}
                      </h4>
                      <p className={clsx('text-xs', 'text-[#2B2A27]/70', 'font-semibold', 'flex', 'items-center', 'gap-1.5', 'mt-1')}>
                        <User className={clsx('w-3.5', 'h-3.5')} />
                        <span>{booking.attendeeName} ({booking.attendeeEmail})</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: meeting details & expand toggle */}
                  <div className={clsx('flex', 'items-center', 'justify-between', 'md:justify-end', 'gap-6', 'border-t', 'md:border-t-0', 'pt-3', 'md:pt-0', 'border-[#E4E1D4]/40')}>
                    <div className={clsx('flex', 'items-center', 'gap-4', 'text-xs', 'font-semibold', 'text-[#2B2A27]/80')}>
                      <div className={clsx('flex', 'items-center', 'gap-1.5')}>
                        <Clock className={clsx('w-3.5', 'h-3.5', 'text-[#171614]/60')} />
                        <span>{booking.eventType.duration} min</span>
                      </div>
                      
                      <div className={clsx('flex', 'items-center', 'gap-1.5')}>
                        {booking.eventType.locationType === "Video" ? (
                          <Video className={clsx('w-3.5', 'h-3.5', 'text-[#171614]/60')} />
                        ) : (
                          <MapPin className={clsx('w-3.5', 'h-3.5', 'text-[#171614]/60')} />
                        )}
                        <span>{booking.eventType.locationDetails}</span>
                      </div>
                    </div>

                    <button className={clsx('p-1', 'border', 'border-[#E4E1D4]/80', 'rounded-lg', 'hover:border-[#171614]', 'transition-all')}>
                      {isExpanded ? (
                        <ChevronUp className={clsx('w-4', 'h-4', 'text-[#171614]')} />
                      ) : (
                        <ChevronDown className={clsx('w-4', 'h-4', 'text-[#171614]')} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Questionnaire Answers view */}
                {isExpanded && (
                  <div className={clsx('px-5', 'pb-5', 'border-t', 'border-[#E4E1D4]/40', 'bg-[#FDFBF2]/20', 'space-y-4', 'pt-4', 'animate-in', 'fade-in', 'duration-200')}>
                    <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'text-xs', 'font-semibold', 'text-[#171614]')}>
                      
                      {/* Guest Contacts */}
                      <div className="space-y-2">
                        <h5 className={clsx('text-[10px]', 'font-extrabold', 'uppercase', 'text-[#2B2A27]/50', 'tracking-wider')}>
                          Guest Contact Info
                        </h5>
                        <div className="space-y-1.5">
                          <div className={clsx('flex', 'items-center', 'gap-2')}>
                            <Mail className={clsx('w-3.5', 'h-3.5', 'text-[#2B2A27]/40')} />
                            <a href={`mailto:${booking.attendeeEmail}`} className="hover:underline">
                              {booking.attendeeEmail}
                            </a>
                          </div>
                          {booking.attendeePhone && (
                            <div className={clsx('flex', 'items-center', 'gap-2')}>
                              <Phone className={clsx('w-3.5', 'h-3.5', 'text-[#2B2A27]/40')} />
                              <span>{booking.attendeePhone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Scheduled Time Frame */}
                      <div className="space-y-2">
                        <h5 className={clsx('text-[10px]', 'font-extrabold', 'uppercase', 'text-[#2B2A27]/50', 'tracking-wider')}>
                          Meeting Time frame
                        </h5>
                        <div className={clsx('space-y-1.5', 'text-[#2B2A27]/85')}>
                          <div>
                            Date: <span className={clsx('font-bold', 'text-[#171614]')}>{formatBookingDate(booking.startTime)}</span>
                          </div>
                          <div>
                            Time: <span className={clsx('font-bold', 'text-[#171614]')}>{formatTimeSlotLabel(booking.startTime)} - {formatTimeSlotLabel(booking.endTime)}</span> (UTC)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Custom Question Responses */}
                    {hasCustomFields && (
                      <div className={clsx('pt-3', 'border-t', 'border-[#E4E1D4]/30', 'space-y-2')}>
                        <h5 className={clsx('text-[10px]', 'font-extrabold', 'uppercase', 'text-[#2B2A27]/50', 'tracking-wider')}>
                          Responses to Custom Questions
                        </h5>
                        <div className={clsx('grid', 'grid-cols-1', 'gap-2.5', 'text-xs')}>
                          {Object.entries(booking.bookingFieldsData || {}).map(([key, val]) => (
                            <div key={key} className={clsx('bg-white', 'border', 'border-[#E4E1D4]/70', 'p-2.5', 'rounded-xl')}>
                              <span className={clsx('text-[10px]', 'font-bold', 'text-[#2B2A27]/60', 'block', 'mb-0.5')}>
                                {key.replace(/_/g, " ")}
                              </span>
                              <span className={clsx('font-semibold', 'text-[#171614]', 'whitespace-pre-wrap')}>
                                {String(val)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
