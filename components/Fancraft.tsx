import Link from "next/link";

export default function Fancraft() {
  return (
    <section className="py-6" aria-label="Fan Craft by Haneri">
      <div className="container">
        <h2 className="heading_1">Fan Craft by Haneri</h2>

        <div className="text-white">
          <figure className="relative rounded-[var(--radius)] overflow-hidden shadow-DEFAULT  m-0">
            <img
              className="block w-full lg:h-auto h-[500px] max-sm:object-cover"
              src="/images/Fancraft.png"
              alt="Haneri Fancraft fan"
            />

            <figcaption className="absolute left-[7.5%] top-[18%] w-[32%] max-w-[560px] font-sans [text-shadow:0_1px_0_rgba(0,0,0,0.18)] max-[900px]:left-[6%] max-[900px]:top-[14%] max-[900px]:w-[60%] max-sm:left-[6%] max-sm:top-[10%] max-sm:w-[82%]">
              <h2
                className="m-0 mb-4 font-ailerons text-[clamp(42px,6.6vw,76px)] tracking-[0.28em] leading-[1.02] text-white max-sm:tracking-[0.22em]"
                aria-label="FANCRAFT"
              >
                FANCRAFT
              </h2>

              <p className=" m-0 mb-[22px] text-base leading-[1.72] text-[#e9e3dc] max-[900px]:text-[15px] max-2xl:text-justify max-2xl:line-clamp-7 max-lg:overflow-hidden max-lg:display-box">
                Fancraft by Haneri is our bespoke design offering — a Fancraft
                by Haneri is our bespoke design offering — a specialised service
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

              <Link
                href="/fancraft"
                className="inline-block bg-[#CA5D27] text-white no-underline font-bold tracking-wide py-3 px-5 rounded-lg shadow-[0_10px_22px_rgba(202,93,39,0.22)] transition-all duration-200 hover:translate-y-[-1px] hover:brightness-[1.06] active:translate-y-0 active:shadow-[0_6px_16px_rgba(202,93,39,0.2)]"
              >
                ENQUIRE NOW
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
