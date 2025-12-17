import Link from "next/link";

const blogs = [
  {
    id: 1,
    imageUrl: "/images/blog.jpg",
    title: "Why BLDC Fans Are the Future of Energy-Efficient Cooling",
    description:
      "In today's world, where energy efficiency and sustainable living are becoming top priorities, every appliance in our homes is undergoing a transformation - and the humble ceiling fan is no exception. Leading the change is the BLDC fan, a cutting-edge innovation redefining the role of fans in modern spaces.",
    href: "/blog/bldc-fans-future",
    date: "Mar 16, 2024",
    datetime: "2024-03-16",
    category: { title: "Technology", href: "#" },
    author: {
      name: "Haneri Team",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "/images/author-placeholder.jpg",
    },
  },
  {
    id: 2,
    imageUrl: "/images/blog.jpg",
    title: "BLDC vs Traditional Ceiling Fans: Which One Should You Choose?",
    description:
      "Understanding the Basics: Electric Fans vs. BLDC Fans As energy efficiency and smart technology take center stage in modern homes, the humble ceiling fan is undergoing a remarkable transformation. Today, homeowners are increasingly choosing BLDC fans over traditional electric fans for their performance, savings, and smart features.",
    href: "/blog/bldc-vs-traditional",
    date: "Mar 10, 2024",
    datetime: "2024-03-10",
    category: { title: "Comparison", href: "#" },
    author: {
      name: "Haneri Team",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "/images/author-placeholder.jpg",
    },
  },
  {
    id: 3,
    imageUrl: "/images/blog.jpg",
    title: "How Smart Fans Are Revolutionizing Home Comfort",
    description:
      "In today's fast-evolving world of home automation, the humble ceiling fan is undergoing a dramatic transformation. No longer just a basic cooling device, the modern smart fan is becoming a vital part of intelligent living spaces. Brands like Haneri Fan are leading the way with cutting-edge BLDC fan technology.",
    href: "/blog/smart-fans-revolution",
    date: "Feb 12, 2024",
    datetime: "2024-02-12",
    category: { title: "Innovation", href: "#" },
    author: {
      name: "Haneri Team",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "/images/author-placeholder.jpg",
    },
  },
];

export default function BlogsSection() {
  return (
    <section
      className="py-[clamp(16px,3vw,36px)] bg-white text-[#1b1e24]"
      aria-label="Latest articles"
    >
      <div className="container">
        <div className="w-full mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 items-stretch justify-items-stretch">
          {blogs.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                />
                <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
              </div>
              <div className="flex max-w-xl grow flex-col justify-between">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                </div>
                {/* <Link
                  href={post.href}
                  className="mt-8 inline-flex items-center justify-center py-2.5 px-3.5 rounded-full border border-gray-200 bg-gray-50 text-gray-900 font-semibold text-sm leading-none no-underline whitespace-nowrap transition-all hover:bg-gray-100 active:translate-y-px"
                  aria-label={`Read more: ${post.title}`}
                >
                  Read More
                </Link> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
