import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, User, Video, MapPin, Copy, ExternalLink, Plus, Search, MoreHorizontal, Check } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-canvas p-4 rounded-xl border border-hairline shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search event types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-hairline rounded-lg text-sm bg-surface-soft focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-active transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Event Type
        </button>
      </div>

      {/* Grid of Event Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEventTypes.map((et) => (
          <div
            key={et.id}
            className={`bg-canvas border rounded-xl overflow-hidden shadow-sm transition-all flex flex-col justify-between ${
              et.isActive ? "border-hairline" : "border-hairline opacity-75"
            }`}
          >
            {/* Top Bar with status & action dropdown */}
            <div className="p-6 border-b border-hairline flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-muted bg-surface-soft px-2.5 py-1 rounded-full border border-hairline">
                  {et.duration} mins
                </span>
                
                {/* Active Toggle Switch */}
                <button
                  onClick={() => handleToggleActive(et.id)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer ${
                    et.isActive ? "bg-brand-accent" : "bg-hairline"
                  }`}
                  aria-label="Toggle Active Status"
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      et.isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Title & Price */}
              <h3 className="font-cal-sans text-lg font-bold text-ink mb-1">
                {et.title}
              </h3>
              <p className="text-sm font-semibold text-brand-accent mb-4">
                {et.price > 0 ? `$${et.price}.00` : "Free"}
              </p>

              {/* Meeting Meta details */}
              <div className="space-y-2 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>1-on-1 • {et.duration} min session</span>
                </div>
                <div className="flex items-center gap-2">
                  {et.locationType === "Video" ? (
                    <Video className="w-3.5 h-3.5" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {et.locationType} ({et.locationDetails})
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-surface-soft/50 border-t border-hairline px-6 py-3.5 flex items-center justify-between">
              <Link
                to={`/book/alex-rivera/${et.slug}`}
                className="text-xs font-semibold text-muted hover:text-ink flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Preview page
              </Link>
              <button
                onClick={() => handleCopyLink(et.id, et.slug)}
                className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  copiedId === et.id ? "text-green-600" : "text-muted hover:text-brand-accent"
                }`}
              >
                {copiedId === et.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
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
        <div className="text-center py-16 bg-canvas border border-hairline rounded-xl shadow-sm">
          <Search className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <h3 className="font-cal-sans text-xl font-bold text-ink mb-2">No event types found</h3>
          <p className="text-muted text-sm max-w-xs mx-auto">
            Try adjusting your search terms or create a new event type to get started.
          </p>
        </div>
      )}
    </div>
  );
}
