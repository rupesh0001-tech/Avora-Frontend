import { SignIn } from "@clerk/react";

export default function LoginPage() {
  return (
    <SignIn
      routing="path"
      path="/login"
      signUpUrl="/register"
      forceRedirectUrl="/dashboard"
      appearance={{
        elements: {
          rootBox: "w-full flex justify-center",
          cardBox: "shadow-sm border border-hairline rounded-lg w-full max-w-md bg-canvas",
          headerTitle: "font-cal-sans text-2xl text-ink font-bold",
          headerSubtitle: "text-muted text-sm",
          formButtonPrimary: "bg-primary hover:bg-primary-active text-white text-sm font-semibold h-10 rounded-md transition-all",
          socialButtonsBlockButton: "border border-hairline hover:bg-surface-soft transition-all text-ink text-sm font-semibold rounded-md",
          dividerLine: "bg-hairline",
          dividerText: "text-muted text-xs",
          formFieldLabel: "text-ink text-sm font-semibold mb-1",
          formFieldInput: "border border-hairline rounded-md h-10 px-3 text-sm focus:border-ink outline-none transition-all",
          footerActionLink: "text-brand-accent hover:underline",
        },
      }}
    />
  );
}
