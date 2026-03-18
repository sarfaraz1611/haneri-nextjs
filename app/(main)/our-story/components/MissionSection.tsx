"use client";

export default function MissionSection() {
  return (
    <section id="mission" className="relative w-full bg-white/80 backdrop-blur-sm py-8">
      <div className="px-4 sm:px-8 lg:px-16 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        {/* Mission image - first on mobile */}
        <div className="rounded-[10px] overflow-hidden order-1 lg:order-2">
          <img
            src="images/section/haneri_Mission_Image.jpg"
            alt="Mission"
            className="w-full h-[260px] object-cover"
          />
        </div>
        {/* Mission text */}
        <div className="flex flex-col gap-3 order-2 lg:order-1">
          <h3 className="text-[40px] sm:text-[48px] font-heading text-[#005d5a] font-semibold leading-tight">
            Mission
          </h3>
          <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
            We focus on human-centric, intuitive design, lasting quality, and
            accessible luxury for all lifestyles. With a commitment to
            transparency, responsiveness, and sustainability, we create
            thoughtful, ethical, and enduring solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
