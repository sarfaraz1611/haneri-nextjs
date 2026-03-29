"use client";

export default function VisionSection() {
  return (
    <section className="relative w-full bg-white/80 backdrop-blur-sm py-8">
      <div className=" w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 items-start">
        {/* Vision text */}
        <div id="vision" className="flex flex-col gap-3 order-2 lg:order-1 scroll-mt-20">
          <h3 className="text-[40px] sm:text-[42px] font-heading text-[#005d5a] font-medium leading-tight">
            Vision
          </h3>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-['Open_Sans'] leading-6 text-black">
            We will achieve our mission through thoughtful design, lasting
            quality, inclusive pricing, and exceptional customer care—making
            luxury accessible and elevating everyday living for all.
          </p>
        </div>

        {/* Vision image */}
        <div className="rounded-[10px] overflow-hidden order-1 lg:order-2">
          <img
            src="images/section/Haneri_haVision_Image.jpg"
            alt="Vision"
            className="w-full h-[260px] object-cover"
          />
        </div>

        {/* Mission text */}
        <div id="mission" className="flex flex-col gap-3 order-4 lg:order-3 scroll-mt-20">
          <h3 className="text-[40px] sm:text-[42px] font-heading text-[#005d5a] font-medium leading-tight">
            Mission
          </h3>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-['Open_Sans'] leading-6 text-black">
            We focus on human-centric, intuitive design, lasting quality, and
            accessible luxury for all lifestyles. With a commitment to
            transparency, responsiveness, and sustainability, we create
            thoughtful, ethical, and enduring solutions.
          </p>
        </div>

        {/* Mission image */}
        <div className="rounded-[10px] overflow-hidden order-3 lg:order-4">
          <img
            src="images/section/haneri_Mission_Image.jpg"
            alt="Mission"
            className="w-full h-[260px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
