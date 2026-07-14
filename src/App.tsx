import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { AppRoutes } from "./routes";
import "./index.css";

// Retrieve the Clerk publishable key from environment variables safely
const CLERK_PUBLISHABLE_KEY =
  (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY ||
  (typeof window !== "undefined" && (window as any).process?.env?.VITE_CLERK_PUBLISHABLE_KEY) ||
  "";

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️ Warning: VITE_CLERK_PUBLISHABLE_KEY is not defined in environment variables.");
}

export function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
