import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/react";
import axios from "axios";
import { CheckCircle, AlertCircle, Database, ShieldCheck, Mail, MapPin, Globe } from "lucide-react";

interface DBUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  timezone: string;
  locale: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      
      const response = await axios.get("http://localhost:5001/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDbUser(response.data.user);
    } catch (err: any) {
      console.error("Error fetching user from backend:", err);
      setError(
        err.response?.data?.error || 
        "Failed to connect to the backend server. Make sure your backend app is running at port 5001."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-canvas border border-hairline rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
        <div className="flex items-center gap-4 text-left">
          {clerkUser?.imageUrl ? (
            <img
              src={clerkUser.imageUrl}
              alt="Clerk Profile"
              className="h-16 w-16 rounded-full border border-hairline object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-surface-card flex items-center justify-center font-bold text-xl text-ink">
              {clerkUser?.firstName?.[0] || clerkUser?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-cal-sans text-2xl font-bold text-ink">
              Welcome, {clerkUser?.firstName || "Scheduler"}!
            </h1>
            <p className="text-sm text-muted">
              Configure your events, check availability, and test integrations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Authenticated via Clerk
          </span>
        </div>
      </div>

      {/* Connection & Synchronization State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PostgreSQL Database Sync */}
        <div className="lg:col-span-2 bg-canvas border border-hairline rounded-lg p-6 text-left shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <Database className="h-5 w-5 text-ink" />
                <h3 className="font-cal-sans text-lg font-bold text-ink">
                  PostgreSQL Local Sync
                </h3>
              </div>
              <button
                onClick={fetchUserData}
                className="text-xs text-muted hover:text-ink transition-colors border border-hairline px-3 py-1.5 rounded-md font-semibold"
              >
                Refresh Sync
              </button>
            </div>

            {loading ? (
              <div className="py-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Sync Error</p>
                  <p className="text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            ) : dbUser ? (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-sm">Synchronized Successfully!</p>
                    <p className="text-xs mt-0.5 opacity-90">
                      Your session token was verified, and your profile is saved in our local PostgreSQL database.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-surface-soft border border-hairline rounded-lg">
                    <Database className="h-4 w-4 text-muted" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted">Internal ID</p>
                      <p className="font-semibold text-ink truncate max-w-[180px]">{dbUser.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface-soft border border-hairline rounded-lg">
                    <Mail className="h-4 w-4 text-muted" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted">Primary Email</p>
                      <p className="font-semibold text-ink truncate max-w-[180px]">{dbUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface-soft border border-hairline rounded-lg">
                    <MapPin className="h-4 w-4 text-muted" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted">Timezone</p>
                      <p className="font-semibold text-ink">{dbUser.timezone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface-soft border border-hairline rounded-lg">
                    <Globe className="h-4 w-4 text-muted" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted">Locale</p>
                      <p className="font-semibold text-ink">{dbUser.locale.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 pt-4 border-t border-hairline text-xs text-muted">
            Profile updates made inside Clerk will sync to this database instantly using our Lazy Sync mechanism.
          </div>
        </div>

        {/* Sidebar Info card */}
        <div className="bg-canvas border border-hairline rounded-lg p-6 text-left shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-cal-sans text-lg font-bold text-ink mb-4">
              Avora Quick Links
            </h3>
            <p className="text-sm text-muted mb-6">
              Manage your Clerk settings or view user roles dynamically.
            </p>

            <div className="space-y-3">
              <a
                href="https://dashboard.clerk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center bg-primary hover:bg-primary-active text-white text-sm font-semibold py-2.5 rounded-md transition-all"
              >
                Go to Clerk Dashboard
              </a>
              <a
                href="https://clerk.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center border border-hairline hover:bg-surface-soft text-ink text-sm font-semibold py-2.5 rounded-md transition-all"
              >
                Clerk Documentation
              </a>
            </div>
          </div>

          <div className="text-[11px] text-muted-soft leading-relaxed mt-6">
            Make sure to try signing out, signing in with other email accounts, or using Google Auth to verify synchronization updates.
          </div>
        </div>
      </div>
    </div>
  );
}
