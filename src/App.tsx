import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { AppRoutes } from "./routes";
import "./index.css";

// Retrieve the Clerk publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || "";

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
