import React from "react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { SocialProof } from "./components/SocialProof";
import { HowItWorks } from "./components/HowItWorks";
import { CTA } from "./components/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <SocialProof />
      <HowItWorks />
      <CTA />
    </>
  );
}
