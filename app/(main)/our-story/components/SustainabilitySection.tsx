"use client";

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="relative  w-full py-8 scroll-mt-20">
      <div className="relative w-full flex items-center justify-center">
        <div className="flex items-stretch w-full lg:max-h-[440px] flex-col md:flex-row overflow-hidden rounded-lg shadow-lg">
          <div className="w-full md:w-3/4">
            <img
              src="images/about_sustainability.png"
              alt="Sustainability"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 bg-[#005d5a] p-8 sm:p-[40px_36px] flex flex-col justify-center">
            <h2 className="text-white text-[18px] sm:text-[28px] font-heading mb-5">
              SUSTAINABILITY & RESPONSIBILITY
            </h2>
            <p className="text-white mb-5 text-[12px] sm:text-[14px] sm:leading-6">
              We believe true innovation is sustainable.
            </p>
            <p className="text-white text-[12px] sm:text-[14px] lg:text-[16px]  sm:leading-6">
              From energy-efficient technology to recyclable packaging and
              ethically driven manufacturing practices, every Haneri process
              embodies our unwavering commitment to a cleaner, smarter, and
              more responsible tomorrow. We continuously strive to reduce our
              environmental footprint by innovating with sustainable materials,
              optimizing energy consumption, and ensuring that every stage of
              production — from design to delivery — upholds the principles of
              quality, responsibility, and care for the planet we all share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
