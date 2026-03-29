"use client";

export default function HeartSection() {
  return (
    <section id="heart" className="relative w-full bg-white md:py-10 lg:py-16 scroll-mt-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full  mx-auto">
        {/* Left column */}
        <div className="w-full lg:w-[38%] flex flex-col leading-10">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] flex gap-2 lg:flex-col tracking-tight font-heading text-[#005d5a] font-medium mb-4">
            The Heart of
            <br className="hidden lg:block" />
            <span className="text-[#CA5D27]">Who We Are</span>
          </h2>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-[#CA5D27] font-['Open_Sans'] mb-4 font-semibold leading-[1.6]">
            Haneri is the culmination of over 75 years of collective expertise
            in design, engineering, and manufacturing.
          </p>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-black leading-6 font-['Open_Sans'] mb-3">
            Born from a deep passion for redefining everyday living, Haneri
            represents a legacy of craftsmanship where technology meets
            timeless aesthetics. Each product is a reflection of our
            commitment to innovation, quality, and purposeful design —
            created to enhance the way people experience their spaces.
          </p>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-black leading-6 font-['Open_Sans'] mb-8">
            From homes and offices to large-scale commercial environments, our
            solutions are thoughtfully engineered to deliver comfort,
            efficiency, and enduring reliability. At Haneri, we believe true
            progress lies in harmony — where intelligent design not only
            performs beautifully but also enriches the way you live and work.
          </p>
          {/* Icons */}
          <div className="flex flex-row  lg:flex-col flex-wrap gap-6">
            <div className="flex flex-col gap-2">
              <img src="/75expertise.svg" alt="75+ Years Expertise" className="w-14 h-14" />
              <span className="text-[20px] lg:text-[24px] font-heading text-[#CA5D27] whitespace-nowrap">75+ Years Expertise</span>
            </div>
            <div className="flex flex-col gap-2">
              <img src="/blub.svg" alt="Design-led Engineering" className="w-14 h-14" />
              <span className="text-[20px] lg:text-[24px] font-heading text-[#CA5D27] whitespace-nowrap">Design-led Engineering</span>
            </div>
            <div className="flex flex-col gap-2">
              <img src="/modernliving.svg" alt="Crafted for Modern Living" className="w-14 h-14" />
              <span className="text-[20px] lg:text-[24px] font-heading text-[#CA5D27] whitespace-nowrap">Crafted for Modern Living</span>
            </div>
          </div>
        </div>

        {/* Right column: 2x2 staggered image grid */}
        <div className="w-full lg:flex-1 grid grid-cols-2 gap-3 lg:gap-4 items-start">
          <div className="flex flex-col gap-3 lg:gap-4">
            <div className="rounded-[10px] overflow-hidden">
              <img src="/(1).svg" alt="img" className="w-full h-[180px] sm:h-[260px] lg:h-[346px] object-cover hover:scale-[1.03] transition-transform duration-300" />
            </div>
            <div className="rounded-[10px] overflow-hidden">
              <img src="/(3).svg" alt="img" className="w-full h-[180px] sm:h-[260px] lg:h-[346px] object-cover hover:scale-[1.03] transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:gap-4 mt-8 sm:mt-12 lg:mt-16">
            <div className="rounded-[10px] overflow-hidden">
              <img src="/(2).svg" alt="img" className="w-full h-[180px] sm:h-[260px] lg:h-[346px] object-cover hover:scale-[1.03] transition-transform duration-300" />
            </div>
            <div className="rounded-[10px] overflow-hidden">
              <img src="/(4).svg" alt="img" className="w-full h-[180px] sm:h-[260px] lg:h-[346px] object-cover hover:scale-[1.03] transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
