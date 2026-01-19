import React from "react";

interface DiscoverHeroProps {
  centered?: boolean;
  className?: string;
  dotted?: boolean;
  style?: React.CSSProperties;
}

export default function DiscoverHero({
  centered = false,
  className = "",
  dotted = false,
  style,
}: DiscoverHeroProps) {
  return (
    <div className={className} style={style}>
      <div
        className={`container mx-auto px-4 ${
          centered
            ? "h-full flex items-center justify-center"
            : "pt-12 md:pt-20"
        }`}
      >
        <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
          <h2 className=" flex justify-center  text-[30px] lg:text-[36px] text-[#315859] font-bold font-['Barlow_Condensed'] uppercase tracking-wider animate-float leading-none">
            Discover
          </h2>
          <div
            className={`flex items-center gap-4  ${
              centered ? "justify-center" : "justify-center "
            }`}
          >
            <div className="h-[2px] w-16 bg-[#CA5D27] animate-expand-right"></div>
            <p className="text-[#CA5D27] text-[16px] md:text-[20px] lg:text-[24px] font-medium animate-pulse-slow uppercase">
              {/* <span className="md:hidden">Trending</span> */}
              <span className="hidden md:inline">Trending Now</span>
            </p>
            <div className="h-[2px] w-16 bg-[#CA5D27] animate-expand-left"></div>
          </div>
          {dotted && (
            <div
              className={`flex gap-2 mt-6 animate-bounce-slow ${
                centered ? "justify-center" : ""
              }`}
            >
              <div
                className="w-2 h-2 rounded-full bg-[#315859] animate-pulse"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-[#315859] animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-[#315859] animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
