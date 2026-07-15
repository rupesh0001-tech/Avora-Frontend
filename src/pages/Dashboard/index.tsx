import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { EventType, EventTypeCard } from "./components/EventTypeCard";
import { EmptyState } from "./components/EmptyState";
import { useApi } from "../../lib/api";

export default function DashboardPage() {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [username, setUsername] = useState("user");
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        // Load user info
        const meRes = await api.get("/auth/me");
        setUsername(meRes.data.user?.username || "user");

        // Load events
        const eventsRes = await api.get("/events");
        setEventTypes(eventsRes.data.events || []);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleToggleActive = async (id: string) => {
    const target = eventTypes.find((et) => et.id === id);
    if (!target) return;

    try {
      const nextActive = !target.isActive;
      // Optimistic update
      setEventTypes(eventTypes.map((et) => et.id === id ? { ...et, isActive: nextActive } : et));
      
      const res = await api.put(`/events/${id}`, { isActive: nextActive });
      // Update with server state
      setEventTypes(eventTypes.map((et) => et.id === id ? res.data.event : et));
    } catch (err) {
      console.error("Failed to toggle active status:", err);
      // Revert status on failure
      setEventTypes(eventTypes.map((et) => et.id === id ? { ...et, isActive: target.isActive } : et));
    }
  };

  const handleCopyLink = (id: string, slug: string) => {
    const link = `${window.location.origin}/book/${username}/${slug}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEventTypes = eventTypes.filter((et) =>
    et.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-10 h-10 rounded-full border-4 border-[#171614] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid of Event Types */}
      {filteredEventTypes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEventTypes.map((et) => (
            <EventTypeCard
              key={et.id}
              et={et}
              username={username}
              onToggleActive={handleToggleActive}
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
