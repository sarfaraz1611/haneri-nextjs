import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import InnovationsSection from "@/components/InnovationsSection";
import SteelFanSlider from "@/components/SteelFanSlider";
import WhyChoose from "@/components/WhyChoose";
import Fancraft from "@/components/Fancraft";
import BlogsSection from "@/components/BlogsSection";

export default function Home() {
  return (
    <main className="main">
      <HeroSlider />

      <div className="container">
        <FeaturedProducts />
        <InnovationsSection />

        <SteelFanSlider />
        <WhyChoose />
        <Fancraft />

        <BlogsSection />
      </div>
    </main>
  );
}
