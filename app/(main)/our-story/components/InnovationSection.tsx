"use client";

export default function InnovationSection() {
  return (
    <section id="innovation" className="relative w-full flex items-center justify-center bg-white/80 backdrop-blur-sm py-8 scroll-mt-20">
      <div className="w-full px-4 sm:px-8 lg:px-16 mx-auto">
        <h1 className="text-[24px] font-heading sm:text-[42px] text-[#005d5a] leading-none font-medium text-center mb-5">
          Innovation and Design Philosophy
        </h1>
        <p className="text-base text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[650px] mx-auto mb-8 text-center font-['Open_Sans']">
          Every Haneri product begins with a simple idea — to make technology
          intuitive and design effortless. Our design philosophy combines
          technical precision, aesthetic balance, and human understanding.
        </p>
        <div className="flex justify-around items-center gap-4 flex-wrap md:flex-nowrap">
          <div className="flex-1 text-center min-w-[200px]">
            <div className="overflow-hidden rounded-[10px] mb-4">
              <img
                src="images/about_innovation_1.png"
                alt="Design To Delivery"
                className="w-full  object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
            <span className="text-[18px] sm:text-[20px] text-[#CA5D27] font-heading">
              Design to Delivery
            </span>
          </div>
          <div className="flex-1 text-center min-w-[200px]">
            <div className="overflow-hidden rounded-[10px] mb-4">
              <img
                src="images/about_innovation_2.png"
                alt="20+ Product Prototypes"
                className="w-full  object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
            <span className="text-[18px] sm:text-[20px] text-[#CA5D27] font-heading">
              20+ Product Prototypes
            </span>
          </div>
          <div className="flex-1 text-center min-w-[200px]">
            <div className="overflow-hidden rounded-[10px] mb-4">
              <img
                src="images/about_innovation_3.png"
                alt="100% Quality Tested"
                className="w-full  object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
            <span className="text-[18px] sm:text-[20px] text-[#CA5D27] font-heading">
              100% Quality Tested
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
