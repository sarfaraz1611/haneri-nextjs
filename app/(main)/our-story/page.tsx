import HeroSection from "./components/HeroSection";
import HeartSection from "./components/HeartSection";
import SustainabilitySection from "./components/SustainabilitySection";
import InnovationSection from "./components/InnovationSection";
import VisionSection from "./components/VisionSection";
import ValuesSection from "./components/ValuesSection";
import PromiseSection from "./components/PromiseSection";

export default function OurStoryPage() {
  return (
    <main className="main about bg-white">
      <div className="relative w-full" style={{ paddingTop: "80px" }}>
        <HeroSection />
        <HeartSection />
        <SustainabilitySection />
        <InnovationSection />
        <VisionSection />
        <ValuesSection />
        <PromiseSection />
      </div>
    </main>
  );
}
