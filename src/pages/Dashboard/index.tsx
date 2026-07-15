import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Clock, Video, MapPin, Copy, ExternalLink, Plus, Search, Check } from "lucide-react";

interface EventType {
  id: string;
  title: string;
  duration: number;
  locationType: "Video" | "In-Person";
  locationDetails: string;
  price: number;
  isActive: boolean;
  slug: string;
}

export default function DashboardPage() {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [eventTypes, setEventTypes] = useState<EventType[]>([
    {
      id: "1",
      title: "15 Minute Discovery Call",
      duration: 15,
      locationType: "Video",
      locationDetails: "Google Meet",
      price: 0,
      isActive: true,
      slug: "15-min",
    },
    {
      id: "2",
      title: "30 Minute Strategy Session",
      duration: 30,
      locationType: "Video",
      locationDetails: "Zoom",
      price: 50,
      isActive: true,
      slug: "30-min",
    },
    {
      id: "3",
      title: "60 Minute Project Consultation",
      duration: 60,
      locationType: "In-Person",
      locationDetails: "Local Coffee Shop",
      price: 120,
      isActive: false,
      slug: "60-min",
    },
  ]);

  const handleToggleActive = (id: string) => {
    setEventTypes(
      eventTypes.map((et) =>
        et.id === id ? { ...et, isActive: !et.isActive } : et
      )
    );
  };

  const handleCopyLink = (id: string, slug: string) => {
    const link = `${window.location.origin}/book/alex-rivera/${slug}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEventTypes = eventTypes.filter((et) =>
    et.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">


      {/* Grid of Event Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEventTypes.map((et) => (
          <div
            key={et.id}
            className={`bg-white border border-[#E4E1D4] rounded-2xl overflow-hidden shadow-[3px_3px_0_rgba(23,22,20,0.08)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_rgba(23,22,20,0.12)] transition-all flex flex-col justify-between ${
              et.isActive ? "" : "opacity-85"
            }`}
          >
            {/* Top Bar with status & action dropdown */}
            <div className="p-6 border-b border-[#E4E1D4] flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#171614] bg-[#F3E75B] px-3 py-1 rounded-xl border border-[#171614]/15">
                  {et.duration} mins
                </span>
                
                {/* Custom Neo-brutalist Toggle Switch */}
                <button
                  onClick={() => handleToggleActive(et.id)}
                  className={`relative w-[44px] h-[26px] rounded-full border border-[#171614]/15 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    et.isActive ? "bg-[#7CEFC0]" : "bg-[#E4E1D4]"
                  }`}
                  aria-label="Toggle Active Status"
                >
                  <div
                    className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full border border-[#171614]/10 bg-white transition-transform duration-200 ${
                      et.isActive ? "translate-x-[18px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Title & Price */}
              <h3 className="font-cal-sans text-lg font-bold text-[#171614] uppercase tracking-wide mb-2 line-clamp-1">
                {et.title}
              </h3>
              
              <div className="mb-4">
                <span className="inline-block text-xs font-extrabold text-[#171614] bg-[#B7ACF7] border border-[#171614]/15 px-2.5 py-0.5 rounded-md">
                  {et.price > 0 ? `$${et.price}.00` : "Free"}
                </span>
              </div>

              {/* Meeting Meta details */}
              <div className="space-y-2.5 text-xs text-[#2B2A27] font-semibold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#171614]" />
                  <span>1-on-1 • {et.duration} min session</span>
                </div>
                <div className="flex items-center gap-2">
                  {et.locationType === "Video" ? (
                    <Video className="w-4 h-4 text-[#171614]" />
                  ) : (
                    <MapPin className="w-4 h-4 text-[#171614]" />
                  )}
                  <span>
                    {et.locationType} ({et.locationDetails})
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#FDFBF2] px-6 py-4 flex items-center justify-between">
              <Link
                to={`/book/alex-rivera/${et.slug}`}
                className="text-xs font-bold text-[#2B2A27] hover:text-[#171614] hover:underline flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Preview page
              </Link>
              <button
                onClick={() => handleCopyLink(et.id, et.slug)}
                className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  copiedId === et.id ? "text-[#58D9A6]" : "text-[#2B2A27] hover:text-[#171614]"
                }`}
              >
                {copiedId === et.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy link
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEventTypes.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#E4E1D4] rounded-2xl shadow-[3px_3px_0_rgba(23,22,20,0.08)]">
          <Search className="w-12 h-12 text-[#171614] mx-auto mb-4 opacity-75" />
          <h3 className="font-cal-sans text-xl font-bold text-[#171614] uppercase tracking-wide mb-2">No event types found</h3>
          <p className="text-[#2B2A27] text-sm max-w-xs mx-auto font-medium">
            Try adjusting your search terms or create a new event type to get started.
          </p>
        </div>
      )}
    </div>
  );
}
