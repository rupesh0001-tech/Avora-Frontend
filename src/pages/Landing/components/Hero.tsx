import React from "react";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { HeroLaptop } from "./HeroLaptop";
import { HeroPhone } from "./HeroPhone";

export function Hero() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleCreateLink = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-[#F3E75B] relative py-[70px] overflow-hidden">
      <div className="max-w-[820px] mx-auto px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-wider bg-[#171614] text-[#F3E75B] px-[18px] py-2 rounded-full mb-[26px]">
          ✦ Scheduling Infrastructure for Everyone
        </span>
        <h1 className="text-[34px] md:text-[58px] font-bold leading-[1.08] tracking-[-0.01em] uppercase text-[#171614]">
          Booking meetings with a{" "}
          <span className="inline-block bg-[#7CEFC0] text-[#171614] px-[18px] py-1 pb-2 rounded-xl border-3 border-[#171614] -rotate-3 shadow-[6px_6px_0_#171614] ml-1.5">
            WILD SIDE
          </span>
        </h1>
        <p className="mt-[26px] text-[17px] leading-1.6 text-[#2B2A27] max-w-[640px] mx-auto">
          Meet Cally — the open scheduling tool that ends back-and-forth emails. Share one link, let people book time that works, and get your calendar back.
        </p>

        <div className="mt-[34px] flex justify-center">
          <Button
            onClick={handleCreateLink}
            variant="primary"
            size="lg"
            rounded="full"
          >
            Create Your Link
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 ml-2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-8">
        <div className="relative max-w-[980px] mx-auto mt-16 h-[520px]">
          <div className="absolute w-[90px] h-[90px] bg-[radial-gradient(#171614_1.6px,transparent_1.6px)] bg-[length:12px_12px] opacity-35 top-10 left-0"></div>
          <div className="absolute w-[90px] h-[90px] bg-[radial-gradient(#171614_1.6px,transparent_1.6px)] bg-[length:12px_12px] opacity-35 bottom-[70px] right-5"></div>
          <div className="absolute w-[34px] h-[34px] border-[5px] border-white rounded-full top-[70px] left-[34%] opacity-90"></div>
          <div className="absolute w-[60px] h-[60px] bg-white/35 rounded-lg rotate-[18deg] top-[190px] left-[10%]"></div>

          {/* Laptop Mockup Component */}
          <HeroLaptop activeProfile="priya" />

          {/* Phone Mockup Component */}
          <HeroPhone />
        </div>
      </div>
    </section>
  );
}
export default Hero;
