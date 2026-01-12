import Link from "next/link";

export default function Fancraft() {
  return (
    <section className="py-6 " aria-label="Fan Craft by Haneri">
      <div className="mx-auto mt-15 ">
        <div className="relative overflow-hidden bg-gray-900 px-6 py-32 shadow-xl rounded-xl min-h-[600px] sm:min-h-0 sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
          {/* Mobile image */}
          <img
            alt="Fancraft by Haneri background"
            src="/images/fancraft_mobile.jpg"
            className="absolute inset-0 size-full object-cover sm:hidden"
          />
          {/* Desktop image */}
          <img
            alt="Fancraft by Haneri background"
            src="/images/Fancraft.png"
            className="absolute inset-0 size-full object-cover hidden sm:block"
          />
          <div className="absolute inset-0 " />
      
     
          <div className="absolute bottom-6 left-6 right-6 sm:relative sm:bottom-auto sm:left-auto sm:right-auto mx-auto max-w-2xl lg:mx-0">
            <h2
              className="m-0 mb-6 font-ailerons text-[clamp(42px,6.6vw,76px)] tracking-[0.28em] leading-[1.02] text-white max-sm:tracking-[0.22em]"
              aria-label="FANCRAFT"
            >
              FANCRAFT
            </h2>
            <figure>
              <blockquote className="text-[16px] font-normal text-[#e9e3dc] sm:text-xl/8 line-clamp-6">
                <p>
                  Fancraft by Haneri is our bespoke design offering — a specialised service
                  that allows you to personalise the aesthetic of any Haneri
                  ceiling fan. With complete in-house design and manufacturing
                  capabilities, we customise colours, finishes, textures, and
                  accents to match the exact mood and character of your home.
                  Every Fancraft creation is crafted with the same precision,
                  balance, and quiet performance that define Haneri, but elevated
                  with your personal touch. It transforms the fan from a utility
                  into a curated design statement — exclusive, intentional, and
                  beautifully tailored to your space.
                </p>
              </blockquote>
              <figcaption className="mt-6 text-base text-white">
                <Link
                  href="/fancraft"
                  className="inline-block bg-[#CA5D27] text-white no-underline font-bold tracking-wide py-3 px-6 rounded-lg shadow-[0_10px_22px_rgba(202,93,39,0.22)] transition-all duration-200 hover:translate-y-[-1px] hover:brightness-[1.06] active:translate-y-0 active:shadow-[0_6px_16px_rgba(202,93,39,0.2)]"
                >
                  ENQUIRE NOW
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
