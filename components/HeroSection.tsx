"use client";

import BlowupShotClean from "./BlowupShotClean";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFFDF7] via-[#FDF8F0] to-[#F5EBE0]">
      {/* Background effects */}
      {/* <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #315859 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#315859]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-[#CA5D27]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#315859]/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div> */}

      <BlowupShotClean />
    </section>
  );
};

export default HeroSection;
