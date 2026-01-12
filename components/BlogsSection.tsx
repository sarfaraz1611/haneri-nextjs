import Link from "next/link";

const blogs = [
  {
    id: 1,
    imageUrl: "/images/Blog1.png",
    title: "Why BLDC Fans Are the Future of Energy-Efficient Cooling",
    description:
      "Why BLDC Fans Are Becoming the Industry Standard In today's world, where energy efficiency and sustainable living are becoming top priorities, every appliance in our homes is undergoing a transformation - and the humble ceiling fan is no exception.",
    href: "/single-blog?key=bldc-fans-future",
  },
  {
    id: 2,
    imageUrl: "/images/Blog2.png",
    title: "BLDC vs Traditional Ceiling Fans: Which One Should You Choose?",
    description:
      "As energy efficiency and smart technology take center stage, the humble ceiling fan is undergoing a remarkable transformation. Today, homeowners are increasingly choosing BLDC fans over traditional electric fans for their performance.",
    href: "/single-blog?key=bldc-vs-traditional",
  },
  {
    id: 3,
    imageUrl: "/images/Blog3.png",
    title: "How Smart Fans Are Revolutionizing Home Comfort",
    description:
      "In today's fast-evolving world of home automation, the humble ceiling fan is undergoing a dramatic transformation. No longer just a basic cooling device, the modern smart fan is becoming a vital part of intelligent living spaces.",
    href: "/single-blog?key=smart-fans-revolution",
  },
];

export default function BlogsSection() {
  return (
    <section
      className="py-[clamp(16px,3vw,36px)] bg-white  text-[#1b1e24]"
      aria-label="Latest articles"
    >
      <div className="">
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="flex border border-[#ececec] rounded-[14px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] no-underline"
            >
              <article className="grid grid-rows-[auto_1fr_auto] w-full min-h-full">
                <div className="relative w-full aspect-video overflow-hidden bg-[#f7f7f7]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5  grid gap-2 pb-4">
                  <h3 className="font-barlow font-medium text-[clamp(18px,2.2vw,22px)] leading-[1.15] text-[#2a5b57] m-0 text-left line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="m-0 text-[#4a505e] text-sm leading-[1.55] font-normal line-clamp-5 p-1.5">
                    {post.description}
                  </p>
                </div>
                {/* <span
                  className="mx-3.5 mb-3.5 mt-3 inline-flex items-center justify-center py-2.5 px-3.5 rounded-[10px] border border-[#e5eceb] bg-[#f4faf9] text-[#075E5E] font-semibold text-[13px] leading-none whitespace-nowrap transition-all group-hover:bg-[#e9f4f2]"
                  aria-hidden="true"
                >
                  Read More
                </span> */}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
