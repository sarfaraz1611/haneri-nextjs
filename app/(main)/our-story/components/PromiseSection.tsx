"use client";

export default function PromiseSection() {
  return (
    <section id="promise" className="relative w-full  flex items-center justify-center bg-white/80 backdrop-blur-sm py-8 scroll-mt-20">
      <div className="relative w-full sm:mx-auto overflow-hidden rounded-lg shadow-lg h-[300px] sm:h-[400px] lg:h-[520px]">
        <img
          src="images/about_top_last.png"
          alt="The Haneri Promise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, rgba(17,28,21,.75) 0%, rgba(17,28,21,.5) 50%, rgba(17,28,21,.2) 100%),
              radial-gradient(1000px 100% at 0% 0%, rgba(15,40,25,.4) 0%, rgba(15,40,25,0) 60%)`,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="w-full px-6 sm:px-10 lg:px-12 max-w-xl">
            <h2 className="text-white text-[22px] sm:text-[30px] lg:text-[42px] font-light font-heading mb-2 sm:mb-4">
              THE HANERI PROMISE
            </h2>
            <p className="text-white mb-4 sm:mb-6 text-[12px] sm:text-[14px] lg:text-[16px] leading-6 sm:leading-6">
              Every product we create is a reflection of our passion for design, precision, and purpose. We promise innovation that lasts, experiences that inspire, and quality that defines every space you live in.
            </p>
            <a
              href="shop"
              className="inline-block bg-white text-[#2b2b2b] font-semibold text-[10px] sm:text-xs font-['Open_Sans'] uppercase tracking-[0.4px] py-2 sm:py-2.5 px-3 sm:px-4 no-underline transition-all duration-[0.25s] border-2 border-white hover:bg-[#005d5a] hover:text-white hover:border-white"
            >
              Explore Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
