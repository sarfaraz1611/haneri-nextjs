const features = [
  {
    id: 1,
    image: "/images/why_home_1.png",
    title: "Design\nExcellence",
  },
  {
    id: 2,
    image: "/images/why_home_2.png",
    title: "Technologically\nAdvanced",
  },
  {
    id: 3,
    image: "/images/why_home_3.png",
    title: "Lasting\nQuality",
  },
  {
    id: 4,
    image: "/images/why_home_4.png",
    title: "Inclusive\nPricing",
  },
  {
    id: 5,
    image: "/images/why_home_5.png",
    title: "Enduring\nSustainability",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-6">
      <div className="container">
        <h2 className="heading_1">Why To Choose Haneri Fans?</h2>

        <ul className="flex flex-wrap gap-10 justify-around">
          {features.map((feature) => (
            <li key={feature.id} className="text-center group">
              <div className="w-full h-[100px] flex items-center justify-center">
                <img
                  src={feature.image}
                  alt={feature.title.replace("\n", " ")}
                  className="w-1/2  h-3/4 md:w-full md:h-full object-contain pb-2.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </div>
              <p className="m-0 text-brand font-sans  md:text-xl leading-tight font-medium max-sm:text-lg max-[400px]:text-[17px]">
                {feature.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
