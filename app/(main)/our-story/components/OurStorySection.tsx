"use client";

import { useEffect } from "react";
import HeroSection from "./HeroSection";
import HeartSection from "./HeartSection";
import SustainabilitySection from "./SustainabilitySection";
import InnovationSection from "./InnovationSection";
import VisionSection from "./VisionSection";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import PromiseSection from "./PromiseSection";

interface OurStorySectionProps {
  onShowFooter?: () => void;
  onHideFooter?: () => void;
}

export default function OurStorySection({
  onHideFooter,
}: OurStorySectionProps) {
  useEffect(() => {
    onHideFooter?.();
  }, [onHideFooter]);

  return (
    <div className="relative w-full" style={{ paddingTop: "80px" }}>
      <HeroSection />
      <HeartSection />
      <SustainabilitySection />
      <InnovationSection />
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <PromiseSection />
    </div>
  );
}
