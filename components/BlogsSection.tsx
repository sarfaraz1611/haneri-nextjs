import Link from "next/link";

const blogs = [
  {
    id: 1,
    image: "/images/blog.jpg",
    title: "Why BLDC Fans Are the Future of Energy-Efficient Cooling",
    content:
      "In today's world, where energy efficiency and sustainable living are becoming top priorities, every appliance in our homes is undergoing a transformation - and the humble ceiling fan is no exception. Leading the change is the BLDC fan, a cutting-edge innovation redefining the role of fans in modern spaces.",
    link: "/blog/bldc-fans-future",
  },
  {
    id: 2,
    image: "/images/blog.jpg",
    title: "BLDC vs Traditional Ceiling Fans: Which One Should You Choose?",
    content:
      "Understanding the Basics: Electric Fans vs. BLDC Fans As energy efficiency and smart technology take center stage in modern homes, the humble ceiling fan is undergoing a remarkable transformation. Today, homeowners are increasingly choosing BLDC fans over traditional electric fans for their performance, savings, and smart features.",
    link: "/blog/bldc-vs-traditional",
  },
  {
    id: 3,
    image: "/images/blog.jpg",
    title: "How Smart Fans Are Revolutionizing Home Comfort",
    content:
      "In today's fast-evolving world of home automation, the humble ceiling fan is undergoing a dramatic transformation. No longer just a basic cooling device, the modern smart fan is becoming a vital part of intelligent living spaces. Brands like Haneri Fan are leading the way with cutting-edge BLDC fan technology.",
    link: "/blog/smart-fans-revolution",
  },
];

function truncateContent(content: string, limit: number = 200): string {
  if (content.length <= limit) return content;

  const truncated = content.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > limit * 0.7) {
    return truncated.slice(0, lastSpace) + "..";
  }

  return truncated + "..";
}

export default function BlogsSection() {
  return (
    <section
      className="py-[clamp(16px,3vw,36px)] bg-white text-[#1b1e24]"
      aria-label="Latest articles"
    >
      <div className="container">
        <div className="w-full mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 items-stretch justify-items-stretch">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex border border-[#ececec] rounded-[14px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[180ms] min-w-0 w-auto max-w-none flex-1 min-h-auto hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
            >
              <div className="grid grid-rows-[auto_1fr_auto] w-full min-h-full min-w-0">
                <div className="relative w-full aspect-video overflow-hidden bg-neutral-50">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover block"
                  />
                </div>
                <div className="pt-[14px] px-[14px] grid gap-2 max-sm:pt-3 max-sm:px-3">
                  <h3 className="font-heading font-medium text-[clamp(18px,2.2vw,22px)] leading-[1.15] text-[#2a5b57] m-0 text-left line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="m-0 p-[5px] text-[#4a505e] text-sm leading-[1.55] font-normal font-sans line-clamp-5">
                    {truncateContent(blog.content, 200)}
                  </p>
                </div>
                <Link
                  href={blog.link}
                  className="my-3 mx-[14px] inline-flex items-center justify-center py-2.5 px-[14px] rounded-button border border-[#e5eceb] bg-[#f4faf9] text-[#075E5E] font-semibold text-[13px] leading-none font-sans no-underline whitespace-nowrap transition-all hover:bg-[#e9f4f2] active:translate-y-px max-sm:my-2.5 max-sm:mx-3"
                  aria-label={`Read more: ${blog.title}`}
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
